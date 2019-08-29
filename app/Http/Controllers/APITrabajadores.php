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
use Auth;
use carbon\Carbon;
use Illuminate\Support\Facades\Log;
use JWTAuth;
use JWTFactory;
use Tymon\JWTAuth\PayloadFactory;
use Tymon\JWTAuth\Exceptions\JWTException;
use Session;
use Validator;

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
                                        "id_empresas" => $subdominio->first()->id_empresas
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

  public function EliminarTrabajadores(Request $request){
    
    Log::info('[APITrabajadores][EliminarTrabajadores]');

    Log::info("[APITrabajadores][EliminarTrabajadores] Método Recibido: ". $request->getMethod());

    if($request->isMethod('POST')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APITrabajadores][EliminarTrabajadores] Token: ". $token);


      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        if(in_array(2, $token_decrypt["permisos"]) || in_array(3, $token_decrypt["permisos"])){

          Log::info("[APITrabajadores][EliminarTrabajadores] Permiso Existente");

          $this->validate($request, [
            'id_trabajadores' => 'required',
            'id_empresas' => 'required'
          ]);
            
          $id_trabajadores = $request->input('id_trabajadores');
          $id_empresas = $request->input('id_empresas');

          $permisos_inter = Permisos_inter::delByIdEmpresas($id_trabajadores, "3");
          $trabajadores = Trabajadores::delByIdEmpresas($id_trabajadores, $token_decrypt['usr']->id_empresas);
          
          if($permisos_inter == 1 && $trabajadores==1){

          
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

          } else {

            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), count($trabajadores));
            $responseJSON->data = [];
            return json_encode($responseJSON);

          }


        }

        return redirect('/');

      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APITrabajadores][EliminarTrabajadores] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APITrabajadores][EliminarTrabajadores] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APITrabajadores][EliminarTrabajadores] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APITrabajadores][EliminarTrabajadores] ' . $e);

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
  
}