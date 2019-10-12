<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Lang;
use App;
use Config;
use App\Library\VO\ResponseJSON;
use App\Library\DAO\Trabajadores;
use App\Library\DAO\Permisos_inter;
use App\Library\DAO\Colores;
use App\Library\DAO\Empresas;
use App\Library\DAO\Registros;
use App\Library\UTIL\Functions;
use Browser;
use Auth;
use carbon\Carbon;
use Illuminate\Support\Facades\Log;
use JWTAuth;
use JWTFactory;
use Tymon\JWTAuth\PayloadFactory;
use Tymon\JWTAuth\Exceptions\JWTException;
use Session;
use Validator;
use App\Library\CLASSES\QueueMails;

class APITrabajadores extends Controller
{

  public function SignIn(Request $request){
  
    Log::info('[APITrabajadores][SignIn]');

    Log::info("[APITrabajadores][SignIn] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      $path = $request->path();

      $subdominio = Empresas::lookForBySubdominio($path)->get();
    
      Log::info('[APITrabajadores][SignIn] subdominio size: ' . count($subdominio));

      Log::info($subdominio);

      if(count($subdominio)>0){

        $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDData'), count($subdominio));
        $responseJSON->data = [];
        
        $colores = Colores::lookForById($subdominio->first()->color)->get();

        Log::info($subdominio->first()->color);
        Log::info($colores->first()->hex);

        return view('trabajadores.login',["title" => config('app.name'), 
                                        "lang" => "es", 
                                        "color" => $subdominio->first()->color, 
                                        "colorHex" => $colores->first()->hex, 
                                        "subdominio" => $subdominio->first()->subdominio, 
                                        "id_empresas" => $subdominio->first()->id_empresas, 
                                        "nombre" => $subdominio->first()->nombre_empresa
                                        ]
                                    );

      } else {

        abort(404);

      }
        
      return ;

    } else {

      abort(404);
    
    }

  }

  public function Ingresar(Request $request){
    
    Log::info('[APITrabajadores][ingresar]');

    Log::info("[APITrabajadores][ingresar] Método Recibido: ". $request->getMethod());


    if($request->isMethod('GET')) {
      
      $correo = $request->input('correo');
      $contPass = $request->input('contPass');
      $color = $request->input('color');
      $colorHex = $request->input('colorHex');
      $subdominio = $request->input('subdominio');
      

      Log::info("[APITrabajadores][ingresar] correo: ". $correo);
      Log::info("[APITrabajadores][ingresar] contPass: ". $contPass);
      Log::info("[APITrabajadores][ingresar] color: ". $color);
      Log::info("[APITrabajadores][ingresar] colorHex: ". $colorHex);
      Log::info("[APITrabajadores][ingresar] subdominio: ". $subdominio);

      $empresa = Empresas::lookForBySubdominio($subdominio)->get();

      $trabajador = Trabajadores::lookForByEmailAndPassAndIdEmpresa($correo, $contPass, $empresa->first()->id_empresas)->get();
      

      if(count($trabajador)>0){

        $permisos_inter_object = Permisos_inter::lookForByIdTrabajadores($trabajador->first()->id_trabajadores)->get();
        $permisos_inter = array();
        foreach($permisos_inter_object as $permiso){
          $permisos_inter[] = $permiso["id_permisos"];
        }

        $jwt_token = null;

        $factory = JWTFactory::customClaims([
          'sub'   => $trabajador->first()->id_trabajadores, //id a conciliar del usuario
          'iss'   => config('app.name'),
          'iat'   => Carbon::now()->timestamp,
          'exp'   => Carbon::tomorrow()->timestamp,
          'nbf'   => Carbon::now()->timestamp,
          'jti'   => uniqid(),
          'usr'   => $trabajador->first(),
          'color' => $color,
          'colorHex' => $colorHex,
          'permisos' => $permisos_inter,
          "subdominio" => $subdominio,
        ]);
        
        $payload = $factory->make();
        
        $jwt_token = JWTAuth::encode($payload);
        Log::info("[APITrabajadores][ingresar] new token: ". $jwt_token->get());
        Log::info("[APIAdmin][ingresar] Permisos: ");
        Log::info($permisos_inter);

        $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDdata'), count($trabajador));
        $responseJSON->data = $trabajador;
        $responseJSON->token = $jwt_token->get();
        return json_encode($responseJSON);

        

      } else {
        $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBDFail'), count($trabajador));
        $responseJSON->data = $trabajador;
        return json_encode($responseJSON);

      }

      return "";
      
    } else {
      abort(404);
    }
  }

  public function Inicio(Request $request){
    
    Log::info('[APITrabajadores][Inicio]');

    Log::info("[APITrabajadores][Inicio] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APITrabajadores][Inicio] Token: ". $token);


      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        if(in_array(3, $token_decrypt["permisos"])){

          Log::info("[APITrabajadores][Inicio] Permiso Existente");
          
          return view('system.inicio',["title" => config('app.name'), 
                                            "lang" => "es", 
                                            "user" => $token_decrypt, 
                                            "color" => $token_decrypt['color'], 
                                            "colorHex" => $token_decrypt['colorHex'],
                                            "subdominio" => $token_decrypt['subdominio']
                                          ]
          );
          
        }

        return redirect('/');


      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APITrabajadores][Inicio] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APITrabajadores][Inicio] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APITrabajadores][Inicio] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APITrabajadores][Inicio] ' . $e);

        return redirect('/');

      }



    } else {
      abort(404);
    }

  }

  public function Registros(Request $request){
    
    Log::info('[APITrabajadores][Registros]');

    Log::info("[APITrabajadores][Registros] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        return view('system.registros',["title" => config('app.name'), 
                                        "lang" => "es", 
                                        "user" => $token_decrypt, 
                                        "color" => $token_decrypt['color'], 
                                        "colorHex" => $token_decrypt['colorHex'],
                                        "subdominio" => $token_decrypt['subdominio'],
                                      ]
                                );

      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APITrabajadores][Registros] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APITrabajadores][Registros] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APITrabajadores][Registros] Token error: token_absent');

        return redirect('/');
  
      }



    } else {
      abort(404);
    }

  }

  public function Perfil(Request $request){
    
    Log::info('[APITrabajadores][Perfil]');

    Log::info("[APITrabajadores][Perfil] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);



        return view('system.perfilTrabajadores',["title" => config('app.name'), 
                                      "lang" => "es", 
                                      "user" => $token_decrypt, 
                                      "color" => $token_decrypt['color'], 
                                      "colorHex" => $token_decrypt['colorHex'],
                                      "subdominio" => $token_decrypt['subdominio'],
                                    ]
                              );

      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APITrabajadores][Perfil] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APITrabajadores][Perfil] Token error: token_invalid');

        return redirect('/');
                                    
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APITrabajadores][Perfil] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e){
        
        //other errors
    
        Log::info('[APITrabajadores][Perfil]');

        return redirect('/');

                                  
      }

    } else {
      abort(404);
    }

  }

  public function PerfilPass(Request $request){
    
    Log::info('[APITrabajadores][PerfilPass]');

    Log::info("[APITrabajadores][PerfilPass] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        

        if(in_array(3, $token_decrypt["permisos"])){

          return view('system.perfilTrabajadoresPass',["title" => config('app.name'), 
                                        "lang" => "es", 
                                        "user" => $token_decrypt, 
                                        "color" => $token_decrypt['color'], 
                                        "colorHex" => $token_decrypt['colorHex'],
                                        "subdominio" => $token_decrypt['subdominio'],
                                      ]
                              );

          }

      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APITrabajadores][PerfilPass] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APITrabajadores][PerfilPass] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APITrabajadores][PerfilPass] Token error: token_absent');

        return redirect('/');
  
      }

    } else {
      abort(404);
    }

  }

  public function GetAllTrabajadores(Request $request){
    
    Log::info('[APITrabajadores][GetAllTrabajadores]');

    Log::info("[APITrabajadores][GetAllTrabajadores] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APITrabajadores][GetAllTrabajadores] Token: ". $token);


      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        if(in_array(1, $token_decrypt["permisos"])){

          Log::info("[APITrabajadores][GetAllTrabajadores] Permiso Existente");
          
          $trabajadores = Trabajadores::all();

          Log::info($trabajadores);

          if(count($trabajadores)>0){

            $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), count($trabajadores));
            $responseJSON->data = $trabajadores;
            return json_encode($responseJSON);

          } else {

            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), count($trabajadores));
            $responseJSON->data = [];
            return json_encode($responseJSON);

          }

        }

        return redirect('/');

      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APITrabajadores][GetAllTrabajadores] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APITrabajadores][GetAllTrabajadores] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APITrabajadores][GetAllTrabajadores] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APITrabajadores][GetAllTrabajadores] ' . $e);

        return redirect('/');

      }

  
  
    } else {
      abort(404);
    }

  }

  
  public function GetTrabajadoresIdTrabajadores(Request $request){
    
    Log::info('[APITrabajadores][GetTrabajadoresIdTrabajadores]');

    Log::info("[APITrabajadores][GetTrabajadoresIdTrabajadores] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APITrabajadores][GetTrabajadoresIdTrabajadores] Token: ". $token);


      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        if(in_array(2, $token_decrypt["permisos"])  || in_array(3, $token_decrypt["permisos"])){

          Log::info("[APITrabajadores][GetTrabajadoresIdTrabajadores] Permiso Existente");

          $this->validate($request, [
            'id_trabajadores' => 'required'
          ]);
            
          $id_trabajadores = $request->input('id_trabajadores');
          
          $trabajadores = Trabajadores::getByIdTrabajadores($id_trabajadores)->get();

          Log::info($trabajadores);

          if(count($trabajadores)>0){

            $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), count($trabajadores));
            $responseJSON->data = $trabajadores;
            return json_encode($responseJSON);

          } else {

            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), count($trabajadores));
            $responseJSON->data = [];
            return json_encode($responseJSON);

          }

        }

        return redirect('/');

      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APITrabajadores][GetTrabajadoresIdTrabajadores] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APITrabajadores][GetTrabajadoresIdTrabajadores] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APITrabajadores][GetTrabajadoresIdTrabajadores] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APITrabajadores][GetTrabajadoresIdTrabajadores] ' . $e);

        return redirect('/');

      }

  
  
    } else {
      abort(404);
    }

  }
  
  public function GetTrabajadores(Request $request){
    
    Log::info('[APITrabajadores][GetTrabajadores]');

    Log::info("[APITrabajadores][GetTrabajadores] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APITrabajadores][GetTrabajadores] Token: ". $token);


      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        if(in_array(2, $token_decrypt["permisos"])){

          Log::info("[APITrabajadores][GetTrabajadores] Permiso Existente");
          
          $trabajadores = Trabajadores::getByIdEmpresas($token_decrypt['usr']->id_empresas)->get();

          Log::info($trabajadores);

          if(count($trabajadores)>0){

            $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), count($trabajadores));
            $responseJSON->data = $trabajadores;
            return json_encode($responseJSON);

          } else {

            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), count($trabajadores));
            $responseJSON->data = [];
            return json_encode($responseJSON);

          }

        }

        return redirect('/');

      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APITrabajadores][GetTrabajadores] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APITrabajadores][GetTrabajadores] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APITrabajadores][GetTrabajadores] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APITrabajadores][GetTrabajadores] ' . $e);

        return redirect('/');

      }

  
  
    } else {
      abort(404);
    }

  }

  public function ChangePerfilPass(Request $request)
  {
    Log::info('[APITrabajadores][ChangePerfilPass]');

    Log::info("[APITrabajadores][ChangePerfilPass] Método Recibido: ". $request->getMethod());

    if($request->isMethod('POST')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APITrabajadores][ChangePerfilPass] Token: ". $token);


      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        if(in_array(3, $token_decrypt["permisos"])){

          Log::info("[APITrabajadores][ChangePerfilPass] Permiso Existente");
          

          Validator::make($request->all(), [
            'id_trabajadores' => 'required',
            'cont' => 'required',
          ])->validate();
          
          $id_trabajadores = $request->input('id_trabajadores');
          $cont = $request->input('cont');

          //print_r($token_decrypt["id"]);

          //print_r($token_decrypt);

          $Trabajadores = Trabajadores::modPass($id_trabajadores, $cont);


          if($Trabajadores==1){

            $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), count($Trabajadores));
            $responseJSON->data = $Trabajadores;
            return json_encode($responseJSON);

          } else {

            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), count($Trabajadores));
            $responseJSON->data = [];
            return json_encode($responseJSON);

          }

        }

        return redirect('/');



      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APITrabajadores][ChangePerfilPass] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APITrabajadores][ChangePerfilPass] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APITrabajadores][ChangePerfilPass] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APITrabajadores][ChangePerfilPass] ' . $e);

        return redirect('/');

      }



    } else {
      abort(404);
    }

  }

  public function PerfilEditar(Request $request)
  {
    Log::info('[APITrabajadores][PerfilEditar]');

    Log::info("[APITrabajadores][PerfilEditar] Método Recibido: ". $request->getMethod());

    if($request->isMethod('POST')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APITrabajadores][PerfilEditar] Token: ". $token);

      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        if(in_array(3, $token_decrypt["permisos"])){

          Validator::make($request->all(), [
            'correo' => 'required',
            'telefono_fijo' => 'required',
            'celular' => 'required'
          ])->validate();
          
          $correo = $request->input('correo');
          $telefono_fijo = $request->input('telefono_fijo');
          $celular = $request->input('celular');

          //print_r($token_decrypt["id"]);

          //print_r($token_decrypt);

          $Trabajadores = Trabajadores::updateProfile($token_decrypt['usr']->id_trabajadores, $correo, $telefono_fijo, $celular);
        
          if($Trabajadores==1){

            $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), count($Trabajadores));
            $responseJSON->data = $Trabajadores;
            return json_encode($responseJSON);

          } else {

            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), count($Trabajadores));
            $responseJSON->data = [];
            return json_encode($responseJSON);

          }
        } 

        return redirect('/');


      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APITrabajadores][PerfilEditar] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APITrabajadores][PerfilEditar] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APITrabajadores][PerfilEditar] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APITrabajadores][PerfilEditar] ' . $e);

        return redirect('/');

      }



    } else {
      abort(404);
    }

  }

  public function GetAllEntradasSalidasByEmpresas(Request $request){
    
    Log::info('[APITrabajadores][GetAllEntradasSalidasByEmpresas]');

    Log::info("[APITrabajadores][GetAllEntradasSalidasByEmpresas] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        if(in_array("3", $token_decrypt["permisos"])==1 || in_array("2", $token_decrypt["permisos"])==1){

          $this->validate($request, [
            'id_empresas' => 'required'
          ]);
            
          $id_empresas = $request->input('id_empresas');
            
          //print_r($token_decrypt["id"]);

          //print_r($token_decrypt);

          $Entradas = Registros::getAllEntradasByEmpresas($id_empresas)->get();
          
          Log::info($Entradas);

          $Salidas = Registros::getAllSalidasByEmpresas($id_empresas)->get();
    
          Log::info($Salidas);
        
          if(true){

            $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), count($Entradas));
            $responseJSON->data = [];
            $responseJSON->entradas = $Entradas;
            $responseJSON->salidas = $Salidas;
            return json_encode($responseJSON);

          } else {

            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), count($Entradas));
            $responseJSON->data = [];
            return json_encode($responseJSON);

          }

        } else {
          
          return redirect('/');
          
        }

      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APITrabajadores][GetAllEntradasSalidasByEmpresas] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APITrabajadores][GetAllEntradasSalidasByEmpresas] Token error: token_invalid');

        return redirect('/');
                                    
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APITrabajadores][GetAllEntradasSalidasByEmpresas] Token error: token_absent');

        return redirect('/');
  
      }

    } else {
      abort(404);
    }

  }

  public function GetAllEntradasSalidas(Request $request){
    
    Log::info('[APITrabajadores][GetAllEntradasSalidas]');

    Log::info("[APITrabajadores][GetAllEntradasSalidas] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        if(in_array("3", $token_decrypt["permisos"])==1){

          $this->validate($request, [
            'id_trabajadores' => 'required'
          ]);
            
          $id_trabajadores = $request->input('id_trabajadores');
            
          //print_r($token_decrypt["id"]);

          //print_r($token_decrypt);

          $Entradas = Registros::getAllEntradas($id_trabajadores)->count();
          
          Log::info($Entradas);

          $Salidas = Registros::getAllSalidas($id_trabajadores)->count();
    
          Log::info($Salidas);
        
          if(true){

            $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), count($Entradas));
            $responseJSON->data = [];
            $responseJSON->entradas = $Entradas;
            $responseJSON->salidas = $Salidas;
            return json_encode($responseJSON);

          } else {

            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), count($Entradas));
            $responseJSON->data = [];
            return json_encode($responseJSON);

          }

        } else {
          
          return redirect('/');
          
        }

      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APITrabajadores][GetAllEntradasSalidas] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APITrabajadores][GetAllEntradasSalidas] Token error: token_invalid');

        return redirect('/');
                                    
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APITrabajadores][GetAllEntradasSalidas] Token error: token_absent');

        return redirect('/');
  
      }

    } else {
      abort(404);
    }

  }

  public function PostSalidas(Request $request){
    
    Log::info('[APITrabajadores][PostSalidas]');

    Log::info("[APITrabajadores][PostSalidas] Método Recibido: ". $request->getMethod());

    if($request->isMethod('POST')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        if(in_array("3", $token_decrypt["permisos"])==1){
            
          Validator::make($request->all(), [
            'id_trabajadores' => 'required',
            'date' => 'required',
            'id_salidas' => 'required',
            'geoLocation' => 'required'
          ])->validate();

          $functions = new functions();
          
          $id_trabajadores = $request->input('id_trabajadores');
          $comentarios = $request->input('comentarios');
          $date = $request->input('date');
          $id_salidas = $request->input('id_salidas');
          $geoLocation = $request->input('geoLocation');

          Log::info("Request IP: " .request()->ip());
          Log::info("Empresa IP: " .$token_decrypt["usr"]->ip);
          Log::info("Geolocation: " .$geoLocation);
          Log::info("platformFamily: " .Browser::platformFamily());
          Log::info("isMobile: " .Browser::isMobile());
          Log::info("isTablet: " .Browser::isTablet());
          Log::info("isDesktop: " .Browser::isDesktop());
          Log::info("Date: " . functions::dateNowCarbonTimezone('America/Mexico_City'));
          Log::info("PC Activated: " .$token_decrypt["usr"]->pc_activated);
          Log::info("Tablet Activated: " .$token_decrypt["usr"]->tablet_activated);
          Log::info("Mobile Activated: " .$token_decrypt["usr"]->mobile_activated);
          Log::info("Geo Activated: " .$token_decrypt["usr"]->geo_activated);
          Log::info("Geo Metro: " . $token_decrypt["usr"]->metros);

          //restricción por dispositivo
          $pc=-1; $tablet=-1; $mobile=-1;
          if($token_decrypt["usr"]->pc_activated==1 && Browser::isDesktop()==1){
            $pc=1;
          }
          if($token_decrypt["usr"]->tablet_activated==1 && Browser::isTablet()==1){
            $tablet=1;
          }
          if($token_decrypt["usr"]->mobile_activated==1 && Browser::isMobile()==1){
            $mobile=1;
          }
          if($token_decrypt["usr"]->pc_activated==0 && $token_decrypt["usr"]->tablet_activated==0 && $token_decrypt["usr"]->mobile_activated==0){
            $pc=1; $tablet=1; $mobile=1;
          }
          if($pc==-1 && $tablet==-1 && $mobile==-1){
            Log::info(Lang::get('messages.devicenotavailable'));
            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.devicenotavailable'), 0);
            $responseJSON->data = [];
            return json_encode($responseJSON);
          }
          
          //restricción por IP
          if($token_decrypt["usr"]->ip_activated==1 && ($token_decrypt["usr"]->ip=="" || $token_decrypt["usr"]->ip!=request()->ip())){

            Log::info(Lang::get('messages.ipnocoincide'));
            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.ipnocoincide'), 0);
            $responseJSON->data = [];
            return json_encode($responseJSON);

          }
          
          //restricción por Geolocation
          $geoArray = explode(",", $geoLocation);
          if($token_decrypt["usr"]->geo_activated=="1" && $token_decrypt["usr"]->metros<abs($functions->distanceCalculation($geoArray[0], $geoArray[1], $token_decrypt["usr"]->latitud, $token_decrypt["usr"]->longitud))){

            Log::info(Lang::get('messages.geonocoincide'));
            Log::info("Latitud: " . $token_decrypt["usr"]->latitud." Longitud: ".$token_decrypt["usr"]->longitud);
            Log::info("Geolocation: ".$token_decrypt["usr"]->metros."<" .abs($functions->distanceCalculation($geoArray[0], $geoArray[1], $token_decrypt["usr"]->latitud, $token_decrypt["usr"]->longitud))." Cumple Entonces Error");
            Log::info("Geolocation: ".$token_decrypt["usr"]->metros."<" .abs($functions->calculaDistancia($geoArray[0], $geoArray[1], $token_decrypt["usr"]->latitud, $token_decrypt["usr"]->longitud))." Cumple Entonces Error");

            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.geonocoincide'), 0);
            $responseJSON->data = [];
            return json_encode($responseJSON);

          } else if($token_decrypt["usr"]->geo_activated==1 && $geoLocation=="-1"){

            Log::info("Geolocalización: " .$geoLocation);
            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.geonohabilitado'), 0);
            $responseJSON->data = [];
            return json_encode($responseJSON);

          } else if($token_decrypt["usr"]->geo_activated==1) {

            Log::info("GEO está activado, y se cumplieron las condicionantes para registrar entrada/salida");
            Log::info("Latitud: " . $token_decrypt["usr"]->latitud." Longitud: ".$token_decrypt["usr"]->longitud);
            Log::info("Geolocation: ".$token_decrypt["usr"]->metros."<" .abs($functions->distanceCalculation($geoArray[0], $geoArray[1], $token_decrypt["usr"]->latitud, $token_decrypt["usr"]->longitud))." Cumple Entonces Error");
            Log::info("Geolocation: ".$token_decrypt["usr"]->metros."<" .abs($functions->calculaDistancia($geoArray[0], $geoArray[1], $token_decrypt["usr"]->latitud, $token_decrypt["usr"]->longitud))." Cumple Entonces Error");

          }


          //print_r($token_decrypt["id"]);

          //print_r($token_decrypt);

          Log::info("Request IP: " .request()->ip());

          $last_register = Registros::GetLastRegistro($id_trabajadores, $date)->get();

          //si el arreglo no está vacío y la úlimo registro de entradas fue una del tipo entrada.
          //mensaje: una entrada no puede ir seguida de una entrada
          if(count($last_register)==0){
            
            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.salidaComoPrimero'), count($last_register));
            $responseJSON->data = [];
            return json_encode($responseJSON);

          }
          if($last_register[0]->tipo=="salida"){
            
              $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.salidaseguidaDeSalida'), count($last_register));
              $responseJSON->data = [];
              return json_encode($responseJSON);
              
          }

          $Registros = Registros::addRegistroSalida($id_trabajadores, $comentarios, $date, $id_salidas);
        
          if($Registros[0]->save==1){

            $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), count($Registros));
            $responseJSON->data = $Registros;
            return json_encode($responseJSON);

          } else {

            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), count($Registros));
            $responseJSON->data = [];
            return json_encode($responseJSON);

          }

        } else {
          
          return redirect('/');
          
        }

      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APITrabajadores][PostSalidas] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APITrabajadores][PostSalidas] Token error: token_invalid');

        return redirect('/');
                                    
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APITrabajadores][PostSalidas] Token error: token_absent');

        return redirect('/');
  
      }

    } else {
      abort(404);
    }


  }

  public function PostEntradas(Request $request){
    
    Log::info('[APITrabajadores][PostEntradas]');

    Log::info("[APITrabajadores][PostEntradas] Método Recibido: ". $request->getMethod());

    if($request->isMethod('POST')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        if(in_array("3", $token_decrypt["permisos"])==1){
            
          Validator::make($request->all(), [
            'id_trabajadores' => 'required',
            'date' => 'required',
            'geoLocation' => 'required'
          ])->validate();

          $functions = new functions();
          
          $id_trabajadores = $request->input('id_trabajadores');
          $comentarios = $request->input('comentarios');
          $date = $request->input('date');
          $geoLocation = $request->input('geoLocation');

          Log::info("Request IP: " .request()->ip());
          Log::info("Empresa IP: " .$token_decrypt["usr"]->ip);
          Log::info("Geolocation: " .$geoLocation);
          Log::info("platformFamily: " .Browser::platformFamily());
          Log::info("isMobile: " .Browser::isMobile());
          Log::info("isTablet: " .Browser::isTablet());
          Log::info("isDesktop: " .Browser::isDesktop());
          Log::info("PC Activated: " .$token_decrypt["usr"]->pc_activated);
          Log::info("Tablet Activated: " .$token_decrypt["usr"]->tablet_activated);
          Log::info("Mobile Activated: " .$token_decrypt["usr"]->mobile_activated);
          Log::info("Geo Activated: " .$token_decrypt["usr"]->geo_activated);
          Log::info("Geo Metro: " . $token_decrypt["usr"]->metros);

          //restricción por dispositivo
          $pc=-1; $tablet=-1; $mobile=-1;
          if($token_decrypt["usr"]->pc_activated==1 && Browser::isDesktop()==1){
            $pc=1;
          }
          if($token_decrypt["usr"]->tablet_activated==1 && Browser::isTablet()==1){
            $tablet=1;
          }
          if($token_decrypt["usr"]->mobile_activated==1 && Browser::isMobile()==1){
            $mobile=1;
          }
          if($token_decrypt["usr"]->pc_activated==0 && $token_decrypt["usr"]->tablet_activated==0 && $token_decrypt["usr"]->mobile_activated==0){
            $pc=1; $tablet=1; $mobile=1;
          }
          if($pc==-1 && $tablet==-1 && $mobile==-1){
            Log::info(Lang::get('messages.devicenotavailable'));
            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.devicenotavailable'), 0);
            $responseJSON->data = [];
            return json_encode($responseJSON);
          }

          //restricción por IP
          if($token_decrypt["usr"]->ip_activated==1 && ($token_decrypt["usr"]->ip=="" || $token_decrypt["usr"]->ip!=request()->ip())){

            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.ipnocoincide'), 0);
            $responseJSON->data = [];
            return json_encode($responseJSON);

          }
          
          //restricción por Geolocation
          $geoArray = explode(",", $geoLocation);
          if($token_decrypt["usr"]->geo_activated=="1" && $token_decrypt["usr"]->metros<abs($functions->distanceCalculation($geoArray[0], $geoArray[1], $token_decrypt["usr"]->latitud, $token_decrypt["usr"]->longitud))){

            Log::info(Lang::get('messages.geonocoincide'));
            Log::info("Latitud: " . $token_decrypt["usr"]->latitud." Longitud: ".$token_decrypt["usr"]->longitud);
            Log::info("Geolocation: ".$token_decrypt["usr"]->metros."<" .abs($functions->distanceCalculation($geoArray[0], $geoArray[1], $token_decrypt["usr"]->latitud, $token_decrypt["usr"]->longitud))." Cumple Entonces Error");
            Log::info("Geolocation: ".$token_decrypt["usr"]->metros."<" .abs($functions->calculaDistancia($geoArray[0], $geoArray[1], $token_decrypt["usr"]->latitud, $token_decrypt["usr"]->longitud))." Cumple Entonces Error");

            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.geonocoincide'), 0);
            $responseJSON->data = [];
            return json_encode($responseJSON);

          } else if($token_decrypt["usr"]->geo_activated==1 && $geoLocation=="-1"){

            Log::info("Geolocalización: " .$geoLocation);
            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.geonohabilitado'), 0);
            $responseJSON->data = [];
            return json_encode($responseJSON);

          } else if($token_decrypt["usr"]->geo_activated==1) {

            Log::info("GEO está activado, y se cumplieron las condicionantes para registrar entrada/salida");
            Log::info("Latitud: " . $token_decrypt["usr"]->latitud." Longitud: ".$token_decrypt["usr"]->longitud);
            Log::info("Geolocation: ".$token_decrypt["usr"]->metros."<" .abs($functions->distanceCalculation($geoArray[0], $geoArray[1], $token_decrypt["usr"]->latitud, $token_decrypt["usr"]->longitud))." Cumple Entonces Error");
            Log::info("Geolocation: ".$token_decrypt["usr"]->metros."<" .abs($functions->calculaDistancia($geoArray[0], $geoArray[1], $token_decrypt["usr"]->latitud, $token_decrypt["usr"]->longitud))." Cumple Entonces Error");

          }

          //print_r($token_decrypt["id"]);

          //print_r($token_decrypt);

          $last_register = Registros::GetLastRegistro($id_trabajadores, $date)->get();

          //si el arreglo no está vacío y la úlimo registro de entradas fue una del tipo entrada.
          //mensaje: una entrada no puede ir seguida de una entrada
          if(count($last_register)!=0 && $last_register[0]->tipo=="entrada"){
            
              $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.entradaSeguidaDeEntrada'), count($last_register));
              $responseJSON->data = [];
              return json_encode($responseJSON);
              
          }

          $Registros = Registros::addRegistroEntrada($id_trabajadores, $comentarios, $date);
        
          if($Registros[0]->save==1){

            $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), count($Registros));
            $responseJSON->data = $Registros;
            return json_encode($responseJSON);

          } else {

            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), count($Registros));
            $responseJSON->data = [];
            return json_encode($responseJSON);

          }

        

        } else {
          
          return redirect('/');
          
        }

      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APITrabajadores][PostEntradas] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APITrabajadores][PostEntradas] Token error: token_invalid');

        return redirect('/');
                                    
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APITrabajadores][PostEntradas] Token error: token_absent');

        return redirect('/');
  
      }

    } else {
      abort(404);
    }


  }

  public function GetAllHistorialByIdEmpresas(Request $request){
    
    Log::info('[APITrabajadores][GetAllHistorialByIdEMpresas]');

    Log::info("[APITrabajadores][GetAllHistorialByIdEMpresas] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        if(in_array("2", $token_decrypt["permisos"])==1){
            
          Validator::make($request->all(), [
            'id_empresas' => 'required',
            'start' => 'required',
            'end' => 'required'
          ])->validate();
          
          $id_empresas = $request->input('id_empresas');
          $start = $request->input('start');
          $end = $request->input('end');

          //print_r($token_decrypt["id"]);

          //print_r($token_decrypt);

          $Registros = Registros::getAllHistorialByIdEmpresas($id_empresas, $start, $end)->get();
        
          if(count($Registros)>0){

            $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), count($Registros));
            $responseJSON->data = $Registros;
            return json_encode($responseJSON);

          } else {

            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), count($Registros));
            $responseJSON->data = [];
            return json_encode($responseJSON);

          }

        } else {
          
          return redirect('/');
          
        }

      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APITrabajadores][GetAllHistorialByIdEMpresas] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APITrabajadores][GetAllHistorialByIdEMpresas] Token error: token_invalid');

        return redirect('/');
                                    
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APITrabajadores][GetAllHistorialByIdEMpresas] Token error: token_absent');

        return redirect('/');
  
      }

    } else {
      abort(404);
    }


  }

  public function GetAllHistorial(Request $request){
    
    Log::info('[APITrabajadores][GetAllHistorial]');

    Log::info("[APITrabajadores][GetAllHistorial] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        if(in_array("3", $token_decrypt["permisos"])==1 || in_array("2", $token_decrypt["permisos"])==1){
            
          Validator::make($request->all(), [
            'id_trabajadores' => 'required',
            'start' => 'required',
            'end' => 'required'
          ])->validate();
          
          $id_trabajadores = $request->input('id_trabajadores');
          $start = $request->input('start');
          $end = $request->input('end');

          //print_r($token_decrypt["id"]);

          //print_r($token_decrypt);

          $Registros = Registros::getAllHistorial($id_trabajadores, $start, $end)->get();
        
          if(count($Registros)>0){

            $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), count($Registros));
            $responseJSON->data = $Registros;
            return json_encode($responseJSON);

          } else {

            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), count($Registros));
            $responseJSON->data = [];
            return json_encode($responseJSON);

          }

        } else {
          
          return redirect('/');
          
        }

      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APITrabajadores][GetAllHistorial] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APITrabajadores][GetAllHistorial] Token error: token_invalid');

        return redirect('/');
                                    
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APITrabajadores][GetAllHistorial] Token error: token_absent');

        return redirect('/');
  
      }

    } else {
      abort(404);
    }


  }



  public function Historial(Request $request){
    
    Log::info('[APITrabajadores][Historial]');

    Log::info("[APITrabajadores][Historial] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        if(in_array("3", $token_decrypt["permisos"])==1){
            
          return view('system.historial',["title" => config('app.name'), 
                                          "lang" => "es", 
                                          "user" => $token_decrypt, 
                                          "color" => $token_decrypt['color'], 
                                          "colorHex" => $token_decrypt['colorHex'],
                                          "subdominio" => $token_decrypt['subdominio'],
                                        ]
                                );

        } else {
          
          return redirect('/');
          
        }

      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APITrabajadores][Historial] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APITrabajadores][Historial] Token error: token_invalid');

        return redirect('/');
                                    
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APITrabajadores][Historial] Token error: token_absent');

        return redirect('/');
  
      }

    } else {
      abort(404);
    }

  }

  public function Logout(Request $request){
    
    Log::info('[APITrabajadores][Logout]');

    Log::info("[APITrabajadores][Logout] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        // attempt to verify the credentials and create a token for the user
        JWTAuth::parseToken()->invalidate();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),"Token Invalidado Exitosamente", 0);
        $responseJSON->subdominio = $token_decrypt['subdominio'];
        return json_encode($responseJSON);


      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APITrabajadores][Logout] Token error: token_expired');

        $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),"Token Expirado", 0);
        return json_encode($responseJSON);
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APITrabajadores][Logout] Token error: token_invalid');

        $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),"Token Inválido", 0);
        return json_encode($responseJSON);
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APITrabajadores][Logout] Token error: token_absent');

        $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),"Token Ausente", 0);
        return json_encode($responseJSON);
  
      }



    } else {
      abort(404);
    }

  }

  public function RecuperarPass(Request $request){
    
    Log::info('[APITrabajadores][RecuperarPass]');

    Log::info("[APITrabajadores][RecuperarPass] Método Recibido: ". $request->getMethod());

    if($request->isMethod('POST')) {
    
      $this->validate($request, [
        'correo' => 'required'
      ]);

      $correo = $request->input('correo');
      $pass = Functions::generacion_contrasenas_aleatorias(8);

      $trabajadores = Trabajadores::cambioContrasena($correo, $pass);

      if($trabajadores==1){

        $trabajadores = Trabajadores::lookForByEmailAndPass($correo, $pass)->get();

        $data["name"] = $trabajadores[0]->nombre;
        //Send to queue email list of administrator mail
        $data["user_id"] = $trabajadores[0]->id_trabajadores;
        $data["tipo"] = "Trabajador";
        $data['email'] = $correo;
        $data['password'] = $pass;
        //$data['body'] = "".Lang::get('messages.emailSubscribeBody')."".$email."";
        //$data['subject'] = Lang::get('messages.emailSubscribeSubject');
        //$data['name'] = Config::get('mail.from.name');
        //$data['priority'] = 1;

        $mail = new QueueMails($data);
        $mail->newPassword();

        $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.SentEmail'), count($trabajadores));
        $responseJSON->data = $trabajadores;
        return json_encode($responseJSON);

      } else {

        $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.NotFoundMail'), count($trabajadores));
        $responseJSON->data = [];
        return json_encode($responseJSON);

      }

    } else {
      abort(404);
    }

  }

  public function Recuperar(Request $request){
    
    Log::info('[APITrabajadores][Recuperar]');

    Log::info("[APITrabajadores][Recuperar] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {
      
      $path = explode("/", $request->path());

      $subdominio = Empresas::lookForBySubdominio($path[0])->get();
    
      Log::info('[APITrabajadores][Recuperar] subdominio size: ' . count($subdominio));

      Log::info($subdominio);

      if(count($subdominio)>0){

        $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDData'), count($subdominio));
        $responseJSON->data = [];
        
        $colores = Colores::lookForById($subdominio->first()->color)->get();

        Log::info($subdominio->first()->color);
        Log::info($colores->first()->hex);

        return view('trabajadores.recuperar',["title" => config('app.name'), 
                                        "lang" => "es", 
                                        "color" => $subdominio->first()->color, 
                                        "colorHex" => $colores->first()->hex, 
                                        "subdominio" => $subdominio->first()->subdominio, 
                                        "id_empresas" => $subdominio->first()->id_empresas, 
                                        "nombre" => $subdominio->first()->nombre_empresa
                                        ]
                                    );

      } else {

        abort(404);

      }
        
      return ;


    } else {
      abort(404);
    }

  }
  
}