<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Lang;
use App;
use Config;
use App\Library\VO\ResponseJSON;
use App\Library\DAO\Trabajadores;
use App\Library\DAO\Permisos_inter;
use App\Library\DAO\Empresas;
use App\Library\DAO\Plantillas;
use App\Library\DAO\Colores;
use App\Library\DAO\Salidas;
use App\Library\UTIL\Functions;
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

class APIEmpresas extends Controller
{

  public function SignInPersonalizado(Request $request){
  
    Log::info('[SignInPersonalizado]');

    Log::info("[SignInPersonalizado] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      $path = explode("/", $request->path());

      $subdominio = Empresas::lookForBySubdominio($path[0])->get();

      if(count($subdominio)>0){  
        $subdominio->first()->foto_base64 = "";
      }
    
      Log::info('[SignInPersonalizado] subdominio size: ' . count($subdominio));

      Log::info($subdominio);

      if(count($subdominio)>0){

        $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDData'), count($subdominio));
        $responseJSON->data = [];
        
        $colores = Colores::lookForById($subdominio->first()->color)->get();

        Log::info($subdominio->first()->color);
        Log::info($colores->first()->hex);
  
        return view('empresas.login',["title" => config('app.name'), 
                                  "lang" => "es", 
                                  "color" => $subdominio->first()->color, 
                                  "colorHex" => $colores->first()->hex, 
                                  "subdominio" => $request->path(), 
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
    
    Log::info('[APIEmpresas][ingresar]');

    Log::info("[APIEmpresas][ingresar] Método Recibido: ". $request->getMethod());


    if($request->isMethod('GET')) {
      
      $correo = $request->input('correo');
      $contPass = $request->input('contPass');
      $color = $request->input('color');
      $colorHex = $request->input('colorHex');
      $subdominio = $request->input('subdominio');

      Log::info("[APIEmpresas][ingresar] correo: ". $correo);
      Log::info("[APIEmpresas][ingresar] contPass: ". $contPass);
      Log::info("[APIEmpresas][ingresar] color: ". $color);
      Log::info("[APIEmpresas][ingresar] colorHex: ". $colorHex);
      Log::info("[APIEmpresas][ingresar] subdominio: ". $subdominio);

      $empresa = Empresas::lookForByEmailAndPass($correo, $contPass)->get();
      
      if(count($empresa)>0){  
        $empresa->first()->foto_base64 = "";
      }

      Log::info($empresa);
      
      if(count($empresa)>0){

        $permisos_inter_object = Permisos_inter::lookForByIdEmpresas($empresa->first()->id_empresas)->get();
        $permisos_inter = array();
        foreach($permisos_inter_object as $permiso){
          $permisos_inter[] = $permiso["id_permisos"];
        }

        $jwt_token = null;

        //limpiamos imágen para que no truene el JWT Token
        if(count($empresa)>0){  
          $empresa->first()->foto_base64 = "";
        }

        $factory = JWTFactory::customClaims([
          'sub'   => $empresa->first()->id_empresas, //id a conciliar del usuario
          'iss'   => config('app.name'),
          'iat'   => Carbon::now()->timestamp,
          'exp'   => Carbon::tomorrow()->timestamp,
          'nbf'   => Carbon::now()->timestamp,
          'jti'   => uniqid(),
          'usr'   => $empresa->first(),
          'permisos' => $permisos_inter,
          'color' => $color,
          'colorHex' => $colorHex,
          'permisos' => $permisos_inter,
          "subdominio" => $subdominio,
        ]);
        
        $payload = $factory->make();
        
        $jwt_token = JWTAuth::encode($payload);
        Log::info("[APIEmpresas][ingresar] new token: ". $jwt_token->get());
        Log::info("[APIEmpresas][ingresar] Permisos: ");
        Log::info($permisos_inter);

        $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDdata'), count($empresa));
        $responseJSON->data = $empresa;
        $responseJSON->token = $jwt_token->get();
        return json_encode($responseJSON);

        

      } else {
        $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBDFail'), count($empresa));
        $responseJSON->data = $empresa;
        return json_encode($responseJSON);

      }

      return "";
      
    } else {
      abort(404);
    }
  }

  public function GetByIdPlantillas(Request $request){
    
    Log::info('[APIEmpresas][GetByIdPlantillas]');

    Log::info("[APIEmpresas][GetByIdPlantillas] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APIEmpresas][GetByIdPlantillas] Token: ". $token);


      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        if(in_array(2, $token_decrypt["permisos"]) || in_array(3, $token_decrypt["permisos"])){

          Log::info("[APIEmpresas][GetByIdPlantillas] Permiso Existente");

          $this->validate($request, [
            'id_plantillas' => 'required'
          ]);
            
          $id_plantillas = $request->input('id_plantillas');
          
          $Plantillas = Plantillas::getByIdPlantillas($id_plantillas)->get();

          if(count($Plantillas)>0){

            $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), count($Plantillas));
            $responseJSON->data = $Plantillas;
            return json_encode($responseJSON);

          } else {

            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), count($Plantillas));
            $responseJSON->data = "";
            return json_encode($responseJSON);

          }
          
        }

        return redirect('/');


      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APIEmpresas][GetByIdPlantillas] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIEmpresas][GetByIdPlantillas] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIEmpresas][GetByIdPlantillas] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APIEmpresas][GetByIdPlantillas] ' . $e);

        return redirect('/');

      }



    } else {
      abort(404);
    }


  }

  public function Inicio(Request $request){
    
    Log::info('[APIEmpresas][Inicio]');

    Log::info("[APIEmpresas][Inicio] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APIEmpresas][Inicio] Token: ". $token);


      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        if(in_array(2, $token_decrypt["permisos"])){

          Log::info("[APIEmpresas][Inicio] Permiso Existente");
          
          return view('system.inicioEmpresa',["title" => config('app.name'), 
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
    
        Log::info('[APIEmpresas][Inicio] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIEmpresas][Inicio] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIEmpresas][Inicio] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APIEmpresas][Inicio] ' . $e);

        return redirect('/');

      }



    } else {
      abort(404);
    }

  }

  public function GetProfileImage(Request $request){
  
    Log::info('[APIEmpresas][GetProfileImage]');

    Log::info("[APIEmpresas][GetProfileImage] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      //no token is required

      $this->validate($request, [
        'id_empresas' => 'required'
      ]);
        
      $token = $request->input('token');
        
      $id_empresas = $request->input('id_empresas');

      Log::info("[APIEmpresas][GetProfileImage] Token: ". $token);

      Log::info("[APIEmpresas][GetProfileImage] id_empresas: ". $id_empresas);



      //print_r($token_decrypt["id"]);

      //print_r($token_decrypt);

      $image = Empresas::getImage($id_empresas)->get();

      //$image->first()->foto_base64 = "";

      if(count($image)>0){

        $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), count($image));
        $responseJSON->data = $image->first()->foto_base64;
        return json_encode($responseJSON);

      } else {

        $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), count($image));
        $responseJSON->data = "";
        return json_encode($responseJSON);

      }




    } else {
      abort(404);
    }

  }

  public function PerfilEditar(Request $request)
  {
    Log::info('[APIEmpresas][PerfilEditar]');

    Log::info("[APIEmpresas][PerfilEditar] Método Recibido: ". $request->getMethod());

    if($request->isMethod('POST')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APIEmpresas][PerfilEditar] Token: ". $token);

      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        if(in_array(2, $token_decrypt["permisos"])){

          Validator::make($request->all(), [
            'nombre_empresa' => 'required',
            'correo' => 'required',
            'telefono_fijo' => 'required',
            'celular' => 'required'
          ])->validate();
          
          $nombre_empresa = $request->input('nombre_empresa');
          $correo = $request->input('correo');
          $telefono_fijo = $request->input('telefono_fijo');
          $celular = $request->input('celular');

          //print_r($token_decrypt["id"]);

          //print_r($token_decrypt);


          $Empresas = Empresas::updateProfile($token_decrypt['usr']->id_empresas, $nombre_empresa, $correo, $telefono_fijo, $celular);
        
          if($Empresas[0]->save==1){

            $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), count($Empresas));
            $responseJSON->data = $Empresas;
            return json_encode($responseJSON);

          } else {

            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), count($Empresas));
            $responseJSON->data = [];
            return json_encode($responseJSON);

          }
        } 

        return redirect('/');


      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APIEmpresas][PerfilEditar] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIEmpresas][PerfilEditar] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIEmpresas][PerfilEditar] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APIEmpresas][PerfilEditar] ' . $e);

        return redirect('/');

      }



    } else {
      abort(404);
    }

  }

  public function UpdateProfilePicture(Request $request)
  {
    Log::info('[APIEmpresas][UpdateProfilePicture]');

    Log::info("[APIEmpresas][UpdateProfilePicture] Método Recibido: ". $request->getMethod());

    if($request->isMethod('POST')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APIEmpresas][UpdateProfilePicture] Token: ". $token);

      try {

        Validator::make($request->all(), [
          'profileimg' => 'required|image|dimensions:min_width=50,min_height=50|mimes:png,jpeg,jpg',
        ])->validate();

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);
        

        try {

            $profileImg = base64_encode(file_get_contents($request->file('profileimg')));

            $image = Empresas::updateImage($token_decrypt['usr']->id_empresas, $profileImg);

        } catch (Exception $exception) {
    
          Log::info('[APIEmpresas][UpdateProfilePicture] error: '. $exception);
  
          return redirect('/');
        }

        if($image[0]->save==1){

          return redirect(url()->previous());

        } else {

          return "ERROR Por favor contacte al administrador";

        }


      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APIEmpresas][UpdateProfilePicture] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIEmpresas][UpdateProfilePicture] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIEmpresas][UpdateProfilePicture] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APIEmpresas][UpdateProfilePicture] ' . $e);

        return redirect('/');

      }



    } else {
      abort(404);
    }

  }

  public function ChangePerfilPass(Request $request)
  {
    Log::info('[APIEmpresas][ChangePerfilPass]');

    Log::info("[APIEmpresas][ChangePerfilPass] Método Recibido: ". $request->getMethod());

    if($request->isMethod('POST')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APIEmpresas][ChangePerfilPass] Token: ". $token);


      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        if(in_array(1, $token_decrypt["permisos"]) || in_array(2, $token_decrypt["permisos"])){

          Log::info("[APIEmpresas][ChangePerfilPass] Permiso Existente");
          

          Validator::make($request->all(), [
            'id_empresas' => 'required',
            'cont' => 'required',
          ])->validate();
          
          $id_empresas = $request->input('id_empresas');
          $cont = $request->input('cont');

          //print_r($token_decrypt["id"]);

          //print_r($token_decrypt);

          $Empresas = Empresas::modPass($id_empresas, $cont);


          if($Empresas==1){

            $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), 0);
            $responseJSON->data = $Empresas;
            return json_encode($responseJSON);

          } else {

            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), 0);
            $responseJSON->data = [];
            return json_encode($responseJSON);

          }

        }

        return redirect('/');



      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APIEmpresas][ChangePerfilPass] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIEmpresas][ChangePerfilPass] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIEmpresas][ChangePerfilPass] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APIEmpresas][ChangePerfilPass] ' . $e);

        return redirect('/');

      }



    } else {
      abort(404);
    }

  }

  public function GetZonasHorarias(Request $request)
  {
    Log::info('[APIEmpresas][GetZonasHorarias]');

    Log::info("[APIEmpresas][GetZonasHorarias] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APIEmpresas][GetZonasHorarias] Token: ". $token);


      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        if(in_array(1, $token_decrypt["permisos"]) || in_array(2, $token_decrypt["permisos"]) || in_array(3, $token_decrypt["permisos"])){

          Log::info("[APIEmpresas][GetZonasHorarias] Permiso Existente");
          

          Validator::make($request->all(), [
            'id_empresas' => 'required'
          ])->validate();
          
          $id_empresas = $request->input('id_empresas');

          //print_r($token_decrypt["id"]);

          //print_r($token_decrypt);

          $Empresas = Empresas::getTimeZone($id_empresas)->get();


          if(count($Empresas)>0){

            $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), count($Empresas));
            $responseJSON->data = $Empresas;
            return json_encode($responseJSON);

          } else {

            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), count($Empresas));
            $responseJSON->data = [];
            return json_encode($responseJSON);

          }

        }

        return redirect('/');



      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APIEmpresas][GetZonasHorarias] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIEmpresas][GetZonasHorarias] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIEmpresas][GetZonasHorarias] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APIEmpresas][GetZonasHorarias] ' . $e);

        return redirect('/');

      }



    } else {
      abort(404);
    }

  }

  public function Trabajadores(Request $request){
    
    Log::info('[APIEmpresas][Trabajadores]');

    Log::info("[APIEmpresas][Trabajadores] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APIEmpresas][Trabajadores] Token: ". $token);


      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        if(in_array(2, $token_decrypt["permisos"])){

          Log::info("[APIEmpresas][Trabajadores] Permiso Existente");
          
          return view('system.trabajadores',["title" => config('app.name'), 
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
    
        Log::info('[APIEmpresas][Trabajadores] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIEmpresas][Trabajadores] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIEmpresas][Trabajadores] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APIEmpresas][Trabajadores] ' . $e);

        return redirect('/');

      }



    } else {
      abort(404);
    }

  }

  public function EliminarTrabajadores(Request $request){
    
    Log::info('[APIEmpresas][EliminarTrabajadores]');

    Log::info("[APIEmpresas][EliminarTrabajadores] Método Recibido: ". $request->getMethod());

    if($request->isMethod('POST')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APIEmpresas][EliminarTrabajadores] Token: ". $token);


      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        if(in_array(2, $token_decrypt["permisos"])){

          Log::info("[APIEmpresas][EliminarTrabajadores] Permiso Existente");

          $this->validate($request, [
            'id_trabajadores' => 'required',
            'id_empresas' => 'required'
          ]);
            
          $id_trabajadores = $request->input('id_trabajadores');
          $id_empresas = $request->input('id_empresas');

          $permisos_inter = Permisos_inter::delByIdTrabajadores($id_trabajadores, "3");
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
    
        Log::info('[APIEmpresas][EliminarTrabajadores] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIEmpresas][EliminarTrabajadores] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIEmpresas][EliminarTrabajadores] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APIEmpresas][EliminarTrabajadores] ' . $e);

        return redirect('/');

      }

  
  
    } else {
      abort(404);
    }

  }

  public function AgregarIdioma(Request $request){
    
    Log::info('[APIEmpresas][AgregarIdioma]');

    Log::info("[APIEmpresas][AgregarIdioma] Método Recibido: ". $request->getMethod());

    if($request->isMethod('POST')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required',
        'nombre' => 'required'
      ]);
        
      $token = $request->input('token');
      $nombre = $request->input('nombre');

      Log::info("[APIEmpresas][AgregarIdioma] Token: ". $token);
      Log::info("[APIEmpresas][AgregarIdioma] nombre: ". $nombre);


      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        if(in_array(2, $token_decrypt["permisos"])){

          Log::info("[APIEmpresas][AgregarIdioma] Permiso Existente");

          $Idiomas = Idiomas::addIdioma($nombre);
        
          Log::info($Idiomas);
          
          if(count($Idiomas)>0){

            $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), count($Idiomas));
            $responseJSON->data = $Idiomas;
            return json_encode($responseJSON);
            

          } else {

            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), count($Idiomas));
            $responseJSON->data = [];
            return json_encode($responseJSON);

          }
          
        }

        return redirect('/');


      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APIEmpresas][AgregarIdioma] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIEmpresas][AgregarIdioma] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIEmpresas][AgregarIdioma] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APIEmpresas][AgregarIdioma] ' . $e);

        return redirect('/');

      }



    } else {
      abort(404);
    }

  }
  
  public function AltaTrabajador(Request $request){
    
    Log::info('[APIEmpresas][AltaTrabajador]');

    Log::info("[APIEmpresas][AltaTrabajador] Método Recibido: ". $request->getMethod());

    if($request->isMethod('POST')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APIEmpresas][AltaTrabajador] Token: ". $token);


      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        if(in_array(2, $token_decrypt["permisos"])){

          Log::info("[APIEmpresas][AltaTrabajador] Permiso Existente");
          
          $this->validate($request, [
            'id_empresas' => 'required',
            'nombre' => 'required',
            'apellido' => 'required',
            'correo' => 'required',
            'tel' => 'required',
            'cel' => 'required',
            'cargo' => 'required',
            'numDNI' => 'required',
            'numSS' => 'required',
            'plantilla' => 'required',
            'geoActivated' => 'required',
            //'address' => 'required',
            //'metros' => 'required',
            //'registroApp' => 'required',
            //'ipActivated' => 'required',
            //'ipAddress' => 'required',
            'pcActivated' => 'required',
            'tabletasActivated' => 'required',
            'movilesActivated' => 'required',
            'pass' => 'required'
          ]);
            
          $id_empresas = $request->input('id_empresas');
          $nombre = $request->input('nombre');
          $apellido = $request->input('apellido');
          $correo = $request->input('correo');
          $tel = $request->input('tel');
          $cel = $request->input('cel');
          $cargo = $request->input('cargo');
          $numDNI = $request->input('numDNI');
          $numSS = $request->input('numSS');
          $plantilla = $request->input('plantilla');
          $geoActivated = $request->input('geoActivated');
          $address = $request->input('address');
          $latitud = $request->input('latitud');
          $longitud = $request->input('longitud');
          $metros = $request->input('metros');
          $registroApp = $request->input('registroApp');
          $ipActivated = $request->input('ipActivated');
          $ipAddress = $request->input('ipAddress');
          $pcActivated = $request->input('pcActivated');
          $tabletasActivated = $request->input('tabletasActivated');
          $movilesActivated = $request->input('movilesActivated');
          $pass = $request->input('pass');

          Log::info("[agregarNuevoTrabajadorClick] id_empresas: " . $id_empresas);
          Log::info("[agregarNuevoTrabajadorClick] nombre: " . $nombre);
          Log::info("[agregarNuevoTrabajadorClick] apellido: " . $apellido);
          Log::info("[agregarNuevoTrabajadorClick] correo: " . $correo);
          Log::info("[agregarNuevoTrabajadorClick] tel: " . $tel);
          Log::info("[agregarNuevoTrabajadorClick] cel: " . $cel);
          Log::info("[agregarNuevoTrabajadorClick] cargo: " . $cargo);
          Log::info("[agregarNuevoTrabajadorClick] numDNI: " . $numDNI);
          Log::info("[agregarNuevoTrabajadorClick] numSS: " . $numSS);
          Log::info("[agregarNuevoTrabajadorClick] plantilla: " . $plantilla);
          Log::info("[agregarNuevoTrabajadorClick] geoActivated: " . $geoActivated);
          Log::info("[agregarNuevoTrabajadorClick] latitud: " . $latitud);
          Log::info("[agregarNuevoTrabajadorClick] longitud: " . $longitud);
          Log::info("[agregarNuevoTrabajadorClick] address: " . $address);
          Log::info("[agregarNuevoTrabajadorClick] metros: " . $metros);
          Log::info("[agregarNuevoTrabajadorClick] registroApp: " . $registroApp);
          Log::info("[agregarNuevoTrabajadorClick] ipActivated: " . $ipActivated);
          Log::info("[agregarNuevoTrabajadorClick] ipAddress: " . $ipAddress);
          Log::info("[agregarNuevoTrabajadorClick] pcActivated: " . $pcActivated);
          Log::info("[agregarNuevoTrabajadorClick] tabletasActivated: " . $tabletasActivated);
          Log::info("[agregarNuevoTrabajadorClick] movilesActivated: " . $movilesActivated);
          Log::info("[agregarNuevoTrabajadorClick] pass: " . $pass);

          $trabajadores = Trabajadores::addTrabajador($id_empresas, $nombre, $apellido, $correo, $tel, $cel, $cargo, $numDNI, $numSS,
          $plantilla, $geoActivated, $latitud, $longitud, $address, $metros, $registroApp, $ipActivated, $ipAddress, $pcActivated, 
          $tabletasActivated, $movilesActivated, $pass);
        
          Log::info($trabajadores);
          
          if($trabajadores[0]->save==1){

            $Permisos_inter = Permisos_inter::addNewTrabajador($trabajadores[0]->id);

            if($Permisos_inter[0]->save==1){
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
    
        Log::info('[APIEmpresas][AltaTrabajador] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIEmpresas][AltaTrabajador] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIEmpresas][AltaTrabajador] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APIEmpresas][AltaTrabajador] ' . $e);

        return redirect('/');

      }



    } else {
      abort(404);
    }

  }

  public function  ModTrabajador(Request $request){
    
    Log::info('[APIEmpresas][ModTrabajador]');

    Log::info("[APIEmpresas][ModTrabajador] Método Recibido: ". $request->getMethod());

    if($request->isMethod('POST')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APIEmpresas][ModTrabajador] Token: ". $token);


      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        if(in_array(2, $token_decrypt["permisos"])){

          Log::info("[APIEmpresas][ModTrabajador] Permiso Existente");
          
          $this->validate($request, [
            'id_trabajadores' => 'required',
            'id_empresas' => 'required',
            'nombre' => 'required',
            'apellido' => 'required',
            'correo' => 'required',
            'tel' => 'required',
            'cel' => 'required',
            'cargo' => 'required',
            'numDNI' => 'required',
            'numSS' => 'required',
            'plantilla' => 'required',
            'geoActivated' => 'required',
            //'address' => 'required',
            //'metros' => 'required',
            //'registroApp' => 'required',
            //'ipActivated' => 'required',
            //'ipAddress' => 'required',
            'pcActivated' => 'required',
            'tabletasActivated' => 'required',
            'movilesActivated' => 'required',
            'pass' => 'required',
            'tmpPass' => 'required'
          ]);
            
          $id_trabajadores = $request->input('id_trabajadores');
          $id_empresas = $request->input('id_empresas');
          $nombre = $request->input('nombre');
          $apellido = $request->input('apellido');
          $correo = $request->input('correo');
          $tel = $request->input('tel');
          $cel = $request->input('cel');
          $cargo = $request->input('cargo');
          $numDNI = $request->input('numDNI');
          $numSS = $request->input('numSS');
          $plantilla = $request->input('plantilla');
          $geoActivated = $request->input('geoActivated');
          $address = $request->input('address');
          $latitud = $request->input('latitud');
          $longitud = $request->input('longitud');
          $metros = $request->input('metros');
          $registroApp = $request->input('registroApp');
          $ipActivated = $request->input('ipActivated');
          $ipAddress = $request->input('ipAddress');
          $pcActivated = $request->input('pcActivated');
          $tabletasActivated = $request->input('tabletasActivated');
          $movilesActivated = $request->input('movilesActivated');
          $pass = $request->input('pass');
          $tmpPass = $request->input('tmpPass');

          Log::info("[ModTrabajador] id_trabajadores: " . $id_trabajadores);
          Log::info("[ModTrabajador] id_empresas: " . $id_empresas);
          Log::info("[ModTrabajador] nombre: " . $nombre);
          Log::info("[ModTrabajador] apellido: " . $apellido);
          Log::info("[ModTrabajador] correo: " . $correo);
          Log::info("[ModTrabajador] tel: " . $tel);
          Log::info("[ModTrabajador] cel: " . $cel);
          Log::info("[ModTrabajador] cargo: " . $cargo);
          Log::info("[ModTrabajador] numDNI: " . $numDNI);
          Log::info("[ModTrabajador] numSS: " . $numSS);
          Log::info("[ModTrabajador] plantilla: " . $plantilla);
          Log::info("[ModTrabajador] geoActivated: " . $geoActivated);
          Log::info("[ModTrabajador] latitud: " . $latitud);
          Log::info("[ModTrabajador] longitud: " . $longitud);
          Log::info("[ModTrabajador] address: " . $address);
          Log::info("[ModTrabajador] metros: " . $metros);
          Log::info("[ModTrabajador] registroApp: " . $registroApp);
          Log::info("[ModTrabajador] ipActivated: " . $ipActivated);
          Log::info("[ModTrabajador] ipAddress: " . $ipAddress);
          Log::info("[ModTrabajador] pcActivated: " . $pcActivated);
          Log::info("[ModTrabajador] tabletasActivated: " . $tabletasActivated);
          Log::info("[ModTrabajador] movilesActivated: " . $movilesActivated);
          Log::info("[ModTrabajador] pass: " . $pass);
          Log::info("[ModTrabajador] tmpPass: " . $tmpPass);

          $trabajadores = Trabajadores::modTrabajador($id_trabajadores, $id_empresas, $nombre, $apellido, $correo, $tel, $cel, $cargo, $numDNI, $numSS,
          $plantilla, $geoActivated, $latitud, $longitud, $address, $metros, $registroApp, $ipActivated, $ipAddress, $pcActivated, 
          $tabletasActivated, $movilesActivated);

            
          $passC = 1;
          if($pass != $tmpPass){
            
            Log::info("[ModTrabajador] cambiar pass");
            $passC = Trabajadores::modPass($id_trabajadores, $pass);
          }
        
          Log::info($trabajadores);
          
          if($trabajadores[0]->save==1 && $passC==1){

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
    
        Log::info('[APIEmpresas][ModTrabajador] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIEmpresas][ModTrabajador] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIEmpresas][ModTrabajador] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APIEmpresas][ModTrabajador] ' . $e);

        return redirect('/');

      }



    } else {
      abort(404);
    }

  }
  
  public function ZonasHorarias(Request $request){
    
    Log::info('[APIEmpresas][ZonasHorarias]');

    Log::info("[APIEmpresas][ZonasHorarias] Método Recibido: ". $request->getMethod());

    if($request->isMethod('POST')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APIEmpresas][ZonasHorarias] Token: ". $token);


      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        if(in_array(2, $token_decrypt["permisos"])){

          Log::info("[APIEmpresas][ZonasHorarias] Permiso Existente");

          
          $this->validate($request, [
            'id_zona_horaria' => 'required'
          ]);
            
          $id_zona_horaria = $request->input('id_zona_horaria');
          
          Log::info("[APIEmpresas][ZonasHorarias] id_zona_horaria: " . $id_zona_horaria);

          $Empresas = Empresas::modZonaHoraria($token_decrypt['usr']->id_empresas, $id_zona_horaria);
        
          Log::info($Empresas);
          
          if($Empresas==1){

            $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), 0);
            $responseJSON->data = $Empresas;
            return json_encode($responseJSON);

          } else {

            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), 0);
            $responseJSON->data = [];
            return json_encode($responseJSON);

          }
          
        }

        return redirect('/');


      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APIEmpresas][ZonasHorarias] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIEmpresas][ZonasHorarias] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIEmpresas][ZonasHorarias] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APIEmpresas][ZonasHorarias] ' . $e);

        return redirect('/');

      }



    } else {
      abort(404);
    }

  }

  public function NuevoTrabajadores(Request $request){
    
    Log::info('[APIEmpresas][NuevoTrabajadores]');

    Log::info("[APIEmpresas][NuevoTrabajadores] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APIEmpresas][NuevoTrabajadores] Token: ". $token);


      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        if(in_array(2, $token_decrypt["permisos"])){

          Log::info("[APIEmpresas][NuevoTrabajadores] Permiso Existente");
          
          return view('system.nuevotrabajador',["title" => config('app.name'), 
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
    
        Log::info('[APIEmpresas][NuevoTrabajadores] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIEmpresas][NuevoTrabajadores] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIEmpresas][NuevoTrabajadores] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APIEmpresas][NuevoTrabajadores] ' . $e);

        return redirect('/');

      }



    } else {
      abort(404);
    }

  }

  public function ModTrabajadores(Request $request){
    
    Log::info('[APIEmpresas][ModTrabajadores]');

    Log::info("[APIEmpresas][ModTrabajadores] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APIEmpresas][ModTrabajadores] Token: ". $token);


      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        if(in_array(2, $token_decrypt["permisos"])){

          Log::info("[APIEmpresas][NuevoTrabajadores] Permiso Existente");
        
          $this->validate($request, [
          'id_trabajadores' => 'required'
          ]);
            
          $id_trabajadores = $request->input('id_trabajadores');

          Log::info("[APIEmpresas][NuevoTrabajadores] id_trabajadores: " .$id_trabajadores);
          
          return view('system.modtrabajador',["title" => config('app.name'), 
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
    
        Log::info('[APIEmpresas][NuevoTrabajadores] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIEmpresas][NuevoTrabajadores] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIEmpresas][NuevoTrabajadores] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APIEmpresas][NuevoTrabajadores] ' . $e);

        return redirect('/');

      }



    } else {
      abort(404);
    }

  }

  public function Informes(Request $request){
    
    Log::info('[APIEmpresas][Informes]');

    Log::info("[APIEmpresas][Informes] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APIEmpresas][Informes] Token: ". $token);


      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        if(in_array(2, $token_decrypt["permisos"])){

          Log::info("[APIEmpresas][Informes] Permiso Existente");
          
          return view('system.informes',["title" => config('app.name'), 
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
    
        Log::info('[APIEmpresas][Informes] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIEmpresas][Informes] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIEmpresas][Informes] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APIEmpresas][Informes] ' . $e);

        return redirect('/');

      }



    } else {
      abort(404);
    }

  }

  public function SalidasModificar(Request $request){
    
    Log::info('[APIEmpresas][SalidasModificar]');

    Log::info("[APIEmpresas][SalidasModificar] Método Recibido: ". $request->getMethod());

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

        if(in_array(2, $token_decrypt["permisos"])){

          return view('system.modsalida',["title" => config('app.name'), 
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
    
        Log::info('[APIEmpresas][SalidasModificar] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIEmpresas][SalidasModificar] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIEmpresas][SalidasModificar] Token error: token_absent');

        return redirect('/');
  
      }

    } else {
      abort(404);
    }

  
  }

  public function PostPlantillaEliminar(Request $request){

    Log::info('[APIEmpresas][PostPlantillaEliminar]');

    Log::info("[APIEmpresas][PostPlantillaEliminar] Método Recibido: ". $request->getMethod());

    if($request->isMethod('POST')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APIEmpresas][PostPlantillaEliminar] Token: ". $token);

      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        if(in_array(2, $token_decrypt["permisos"])){
          
          Log::info("[APIEmpresas][PostPlantillaEliminar] Permiso Existente");
          
          $this->validate($request, [
            'id_plantillas' => 'required',
          ]);
          
          $id_plantillas = $request->input('id_plantillas');
          
          Log::info("[PostPlantillaEliminar] id_plantillas: " . $id_plantillas);
          
          $Plantillas = Plantillas::delPlantillaByIdPlantilla($id_plantillas);
          
          Log::info($Plantillas);
          
          if($Plantillas==1){
          
            $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), 0);
            $responseJSON->data = $Plantillas;
            return json_encode($responseJSON);


          } else {

            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), 0);
            $responseJSON->data = [];
            return json_encode($responseJSON);

          }
          
        }

        return redirect('/');


      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APIEmpresas][PostPlantillaEliminar] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIEmpresas][PostPlantillaEliminar] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIEmpresas][PostPlantillaEliminar] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APIEmpresas][PostPlantillaEliminar] ' . $e);

        return redirect('/');

      }

    } else {
      abort(404);
    }
  }

  public function DelSalidas(Request $request){

    Log::info('[APIEmpresas][DelSalidas]');

    Log::info("[APIEmpresas][DelSalidas] Método Recibido: ". $request->getMethod());

    if($request->isMethod('POST')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APIEmpresas][DelSalidas] Token: ". $token);


      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        if(in_array(2, $token_decrypt["permisos"])){

          Log::info("[APIEmpresas][DelSalidas] Permiso Existente");
          
          $this->validate($request, [
            'id_empresas' => 'required',
            'id_salidas' => 'required'
          ]);
            
          $id_empresas = $request->input('id_empresas');
          $id_salidas = $request->input('id_salidas');

          Log::info("[DelSalidas] id_empresas: " . $id_empresas);
          Log::info("[DelSalidas] id_salidas: " . $id_salidas);

          $Salidas = Salidas::delByIdEmpresas($id_empresas, $id_salidas);
        
          Log::info($Salidas);
          
          if($Salidas==1){

            $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), 0);
            $responseJSON->data = $Salidas;
            return json_encode($responseJSON);


          } else {

            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), 0);
            $responseJSON->data = [];
            return json_encode($responseJSON);

          }
          
        }

        return redirect('/');


      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APIEmpresas][DelSalidas] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIEmpresas][DelSalidas] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIEmpresas][DelSalidas] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APIEmpresas][DelSalidas] ' . $e);

        return redirect('/');

      }



    } else {
      abort(404);
    }
  }
  

  public function ModSalidas(Request $request){

    Log::info('[APIEmpresas][ModSalidas]');

    Log::info("[APIEmpresas][ModSalidas] Método Recibido: ". $request->getMethod());

    if($request->isMethod('POST')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APIEmpresas][ModSalidas] Token: ". $token);


      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        if(in_array(2, $token_decrypt["permisos"])){

          Log::info("[APIEmpresas][ModSalidas] Permiso Existente");
          
          $this->validate($request, [
            'id_empresas' => 'required',
            'id_salidas' => 'required',
            'nombre' => 'required',
            'computable' => 'required'
          ]);
            
          $id_empresas = $request->input('id_empresas');
          $id_salidas = $request->input('id_salidas');
          $nombre = $request->input('nombre');
          $computable = $request->input('computable');

          Log::info("[ModSalidas] id_empresas: " . $id_empresas);
          Log::info("[ModSalidas] id_salidas: " . $id_salidas);
          Log::info("[ModSalidas] nombre: " . $nombre);
          Log::info("[ModSalidas] computable: " . $computable);

          $Salidas = Salidas::modSalidas($id_empresas, $id_salidas, $nombre, $computable);
        
          Log::info($Salidas);
          
          if($Salidas[0]->save==1){

            $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), count($Salidas));
            $responseJSON->data = $Salidas;
            return json_encode($responseJSON);


          } else {

            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), count($Salidas));
            $responseJSON->data = [];
            return json_encode($responseJSON);

          }
          
        }

        return redirect('/');


      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APIEmpresas][ModSalidas] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIEmpresas][ModSalidas] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIEmpresas][ModSalidas] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APIEmpresas][ModSalidas] ' . $e);

        return redirect('/');

      }



    } else {
      abort(404);
    }
  }
  
  public function AltaSalidas(Request $request){
    
    Log::info('[APIEmpresas][AltaSalidas]');

    Log::info("[APIEmpresas][AltaSalidas] Método Recibido: ". $request->getMethod());

    if($request->isMethod('POST')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APIEmpresas][AltaSalidas] Token: ". $token);


      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        if(in_array(2, $token_decrypt["permisos"])){

          Log::info("[APIEmpresas][AltaSalidas] Permiso Existente");

          $this->validate($request, [
            'id_empresas' => 'required',
            'nombre' => 'required',
            'computable' => 'required'
          ]);

          $id_empresas = $request->input('id_empresas');
          $nombre = $request->input('nombre');
          $computable = $request->input('computable');

          Log::info("[APIEmpresas][AltaSalidas] id_empresas: " . $id_empresas);
          Log::info("[APIEmpresas][AltaSalidas] nombre: " . $nombre);
          Log::info("[APIEmpresas][AltaSalidas] computable: " . $computable);

          $Salidas = Salidas::addSalidas($id_empresas, $nombre, $computable);
        
          Log::info($Salidas);
          
          if($Salidas[0]->save==1){

            $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), count($Salidas));
            $responseJSON->data = $Salidas;
            return json_encode($responseJSON);

          } else {

            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), count($Salidas));
            $responseJSON->data = [];
            return json_encode($responseJSON);

          }
          
        }

        return redirect('/');


      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APIEmpresas][AltaSalidas] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIEmpresas][AltaSalidas] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIEmpresas][AltaSalidas] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APIEmpresas][AltaSalidas] ' . $e);

        return redirect('/');

      }


    } else {
      abort(404);
    }
  }

  public function AltaPlantilla(Request $request){
    
    Log::info('[APIEmpresas][AltaPlantilla]');

    Log::info("[APIEmpresas][AltaPlantilla] Método Recibido: ". $request->getMethod());

    if($request->isMethod('POST')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APIEmpresas][AltaPlantilla] Token: ". $token);


      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        if(in_array(2, $token_decrypt["permisos"])){

          Log::info("[APIEmpresas][AltaPlantilla] Permiso Existente");

          $nombrePlantilla = ($request->input('nombrePlantilla')=="")? '' : $request->input('nombrePlantilla');

          $id_empresas = ($token_decrypt['usr']->id_empresas=="")? '' : $token_decrypt['usr']->id_empresas;

          $lunesActivated = ($request->input('lunesActivated') == 1)? 1 : 0 ; 
          $de1Lunes = ($request->input('de1Lunes') == "")? '' : $request->input('de1Lunes');
          $a1Lunes = ($request->input('a1Lunes') == "")? '' : $request->input('a1Lunes');
          $de2Lunes = ($request->input('de2Lunes') == "")? '' : $request->input('de2Lunes');
          $a2Lunes = ($request->input('a2Lunes') == "")? '' : $request->input('a2Lunes');
          $turnoLunes = ($request->input('turnoLunes') == "")? '' : $request->input('turnoLunes');

          $martesActivated = ($request->input('martesActivated') == 1)? 1 : 0 ; 
          $de1Martes = ($request->input('de1Martes') == "")? '' : $request->input('de1Martes');
          $a1Martes = ($request->input('a1Martes') == "")? '' : $request->input('a1Martes');
          $de2Martes = ($request->input('de2Martes') == "")? '' : $request->input('de2Martes');
          $a2Martes = ($request->input('a2Martes') == "")? '' : $request->input('a2Martes');
          $turnoMartes = ($request->input('turnoMartes') == "")? '' : $request->input('turnoMartes');

          $miercolesActivated = ($request->input('miercolesActivated') == 1)? 1 : 0 ; 
          $de1Miercoles = ($request->input('de1Miercoles') == "")? '' : $request->input('de1Miercoles');
          $a1Miercoles = ($request->input('a1Miercoles') == "")? '' : $request->input('a1Miercoles');
          $de2Miercoles = ($request->input('de2Miercoles') == "")? '' : $request->input('de2Miercoles');
          $a2Miercoles = ($request->input('a2Miercoles') == "")? '' : $request->input('a2Miercoles');
          $turnoMiercoles = ($request->input('turnoMiercoles') == "")? '' : $request->input('turnoMiercoles');

          $juevesActivated = ($request->input('juevesActivated') == 1)? 1 : 0 ; 
          $de1Jueves = ($request->input('de1Jueves') == "")? '' : $request->input('de1Jueves');
          $a1Jueves = ($request->input('a1Jueves') == "")? '' : $request->input('a1Jueves');
          $de2Jueves = ($request->input('de2Jueves') == "")? '' : $request->input('de2Jueves');
          $a2Jueves = ($request->input('a2Jueves') == "")? '' : $request->input('a2Jueves');
          $turnoJueves = ($request->input('turnoJueves') == "")? '' : $request->input('turnoJueves');

          $viernesActivated = ($request->input('viernesActivated') == 1)? 1 : 0 ; 
          $de1Viernes = ($request->input('de1Viernes') == "")? '' : $request->input('de1Viernes');
          $a1Viernes = ($request->input('a1Viernes') == "")? '' : $request->input('a1Viernes');
          $de2Viernes = ($request->input('de2Viernes') == "")? '' : $request->input('de2Viernes');
          $a2Viernes = ($request->input('a2Viernes') == "")? '' : $request->input('a2Viernes');
          $turnoViernes = ($request->input('turnoViernes') == "")? '' : $request->input('turnoViernes');

          $sabadoActivated = ($request->input('sabadoActivated') == 1)? 1 : 0 ; 
          $de1Sabado = ($request->input('de1Sabado') == "")? '' : $request->input('de1Sabado');
          $a1Sabado = ($request->input('a1Sabado') == "")? '' : $request->input('a1Sabado');
          $de2Sabado = ($request->input('de2Sabado') == "")? '' : $request->input('de2Sabado');
          $a2Sabado = ($request->input('a2Sabado') == "")? '' : $request->input('a2Sabado');
          $turnoSabado = ($request->input('turnoSabado') == "")? '' : $request->input('turnoSabado');

          $domingoActivated = ($request->input('domingoActivated') == 1)? 1 : 0 ; 
          $de1Domingo = ($request->input('de1Domingo') == "")? '' : $request->input('de1Domingo');
          $a1Domingo = ($request->input('a1Domingo') == "")? '' : $request->input('a1Domingo');
          $de2Domingo = ($request->input('de2Domingo') == "")? '' : $request->input('de2Domingo');
          $a2Domingo = ($request->input('a2Domingo') == "")? '' : $request->input('a2Domingo');
          $turnoDomingo = ($request->input('turnoDomingo') == "")? '' : $request->input('turnoDomingo');

          Log::info("[APIEmpresas][AltaPlantilla] nombrePlantilla: " . $nombrePlantilla);

          Log::info("[APIEmpresas][AltaPlantilla] id_empresas: " . $id_empresas);
          
          Log::info("[APIEmpresas][AltaPlantilla] lunesActivated: " . $lunesActivated);
          Log::info("[APIEmpresas][AltaPlantilla] de1Lunes: " . $de1Lunes);
          Log::info("[APIEmpresas][AltaPlantilla] a1Lunes: " . $a1Lunes);
          Log::info("[APIEmpresas][AltaPlantilla] de2Lunes: " . $de2Lunes);
          Log::info("[APIEmpresas][AltaPlantilla] a2Lunes: " . $a2Lunes);
          Log::info("[APIEmpresas][AltaPlantilla] lunesTurno: " . $turnoLunes);
          
          Log::info("[APIEmpresas][AltaPlantilla] martesActivated: " . $martesActivated);
          Log::info("[APIEmpresas][AltaPlantilla] de1Martes: " . $de1Martes);
          Log::info("[APIEmpresas][AltaPlantilla] a1Martes: " . $a1Martes);
          Log::info("[APIEmpresas][AltaPlantilla] de2Martes: " . $de2Martes);
          Log::info("[APIEmpresas][AltaPlantilla] a2Martes: " . $a2Martes);
          Log::info("[APIEmpresas][AltaPlantilla] martesTurno: " . $turnoMartes);
          
          Log::info("[APIEmpresas][AltaPlantilla] miercolesActivated: " . $miercolesActivated);
          Log::info("[APIEmpresas][AltaPlantilla] de1Miercoles: " . $de1Miercoles);
          Log::info("[APIEmpresas][AltaPlantilla] a1Miercoles: " . $a1Miercoles);
          Log::info("[APIEmpresas][AltaPlantilla] de2Miercoles: " . $de2Miercoles);
          Log::info("[APIEmpresas][AltaPlantilla] a2Miercoles: " . $a2Miercoles);
          Log::info("[APIEmpresas][AltaPlantilla] miercolesTurno: " . $turnoMiercoles);
          
          Log::info("[APIEmpresas][AltaPlantilla] juevesActivated: " . $juevesActivated);
          Log::info("[APIEmpresas][AltaPlantilla] de1Jueves: " . $de1Jueves);
          Log::info("[APIEmpresas][AltaPlantilla] a1Jueves: " . $a1Jueves);
          Log::info("[APIEmpresas][AltaPlantilla] de2Jueves: " . $de2Jueves);
          Log::info("[APIEmpresas][AltaPlantilla] a2Jueves: " . $a2Jueves);
          Log::info("[APIEmpresas][AltaPlantilla] juevesTurno: " . $turnoJueves);
          
          Log::info("[APIEmpresas][AltaPlantilla] viernesActivated: " . $viernesActivated);
          Log::info("[APIEmpresas][AltaPlantilla] de1Viernes: " . $de1Viernes);
          Log::info("[APIEmpresas][AltaPlantilla] a1Viernes: " . $a1Viernes);
          Log::info("[APIEmpresas][AltaPlantilla] de2Viernes: " . $de2Viernes);
          Log::info("[APIEmpresas][AltaPlantilla] a2Viernes: " . $a2Viernes);
          Log::info("[APIEmpresas][AltaPlantilla] viernesTurno: " . $turnoViernes);
          
          Log::info("[APIEmpresas][AltaPlantilla] sabadoActivated: " . $sabadoActivated);
          Log::info("[APIEmpresas][AltaPlantilla] de1Sabado: " . $de1Sabado);
          Log::info("[APIEmpresas][AltaPlantilla] a1Sabado: " . $a1Sabado);
          Log::info("[APIEmpresas][AltaPlantilla] de2Sabado: " . $de2Sabado);
          Log::info("[APIEmpresas][AltaPlantilla] a2Sabado: " . $a2Sabado);
          Log::info("[APIEmpresas][AltaPlantilla] sabadoTurno: " . $turnoSabado);
          
          Log::info("[APIEmpresas][AltaPlantilla] domingoActivated: " . $domingoActivated);
          Log::info("[APIEmpresas][AltaPlantilla] de1Domingo: " . $de1Domingo);
          Log::info("[APIEmpresas][AltaPlantilla] a1Domingo: " . $a1Domingo);
          Log::info("[APIEmpresas][AltaPlantilla] de2Domingo: " . $de2Domingo);
          Log::info("[APIEmpresas][AltaPlantilla] a2Domingo: " . $a2Domingo);
          Log::info("[APIEmpresas][AltaPlantilla] domingoTurno: " . $turnoDomingo);

          $plantillas = Plantillas::addPlantilla($nombrePlantilla, $id_empresas,
          $lunesActivated, $de1Lunes, $a1Lunes, $de2Lunes, $a2Lunes, $turnoLunes,
          $martesActivated, $de1Martes, $a1Martes, $de2Martes, $a2Martes, $turnoMartes,
          $miercolesActivated, $de1Miercoles, $a1Miercoles, $de2Miercoles, $a2Miercoles, $turnoMiercoles,
          $juevesActivated, $de1Jueves, $a1Jueves, $de2Jueves, $a2Jueves, $turnoJueves,
          $viernesActivated, $de1Viernes, $a1Viernes, $de2Viernes, $a2Viernes, $turnoViernes,
          $sabadoActivated, $de1Sabado, $a1Sabado, $de2Sabado, $a2Sabado, $turnoSabado,
          $domingoActivated, $de1Domingo, $a1Domingo, $de2Domingo, $a2Domingo, $turnoDomingo);
        
          Log::info($plantillas);
          
          if($plantillas[0]->save==1){

            $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), count($plantillas));
            $responseJSON->data = $plantillas;
            return json_encode($responseJSON);

          } else {

            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), count($plantillas));
            $responseJSON->data = [];
            return json_encode($responseJSON);

          }
          
        }

        return redirect('/');


      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APIEmpresas][AltaPlantilla] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIEmpresas][AltaPlantilla] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIEmpresas][AltaPlantilla] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APIEmpresas][AltaPlantilla] ' . $e);

        return redirect('/');

      }



    } else {
      abort(404);
    }

  }

  public function ModPlantilla(Request $request){
    
    Log::info('[APIEmpresas][ModPlantilla]');

    Log::info("[APIEmpresas][ModPlantilla] Método Recibido: ". $request->getMethod());

    if($request->isMethod('POST')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APIEmpresas][ModPlantilla] Token: ". $token);


      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        if(in_array(2, $token_decrypt["permisos"])){

          Log::info("[APIEmpresas][ModPlantilla] Permiso Existente");

          $idPlantilla = ($request->input('id_plantilla')=="")? '' : $request->input('id_plantilla');

          $nombrePlantilla = ($request->input('nombrePlantilla')=="")? '' : $request->input('nombrePlantilla');

          $id_empresas = ($token_decrypt['usr']->id_empresas=="")? '' : $token_decrypt['usr']->id_empresas;

          $lunesActivated = ($request->input('lunesActivated') == 1)? 1 : 0 ; 
          $de1Lunes = ($request->input('de1Lunes') == "")? '' : $request->input('de1Lunes');
          $a1Lunes = ($request->input('a1Lunes') == "")? '' : $request->input('a1Lunes');
          $de2Lunes = ($request->input('de2Lunes') == "")? '' : $request->input('de2Lunes');
          $a2Lunes = ($request->input('a2Lunes') == "")? '' : $request->input('a2Lunes');
          $turnoLunes = ($request->input('turnoLunes') == "")? '' : $request->input('turnoLunes');

          $martesActivated = ($request->input('martesActivated') == 1)? 1 : 0 ; 
          $de1Martes = ($request->input('de1Martes') == "")? '' : $request->input('de1Martes');
          $a1Martes = ($request->input('a1Martes') == "")? '' : $request->input('a1Martes');
          $de2Martes = ($request->input('de2Martes') == "")? '' : $request->input('de2Martes');
          $a2Martes = ($request->input('a2Martes') == "")? '' : $request->input('a2Martes');
          $turnoMartes = ($request->input('turnoMartes') == "")? '' : $request->input('turnoMartes');

          $miercolesActivated = ($request->input('miercolesActivated') == 1)? 1 : 0 ; 
          $de1Miercoles = ($request->input('de1Miercoles') == "")? '' : $request->input('de1Miercoles');
          $a1Miercoles = ($request->input('a1Miercoles') == "")? '' : $request->input('a1Miercoles');
          $de2Miercoles = ($request->input('de2Miercoles') == "")? '' : $request->input('de2Miercoles');
          $a2Miercoles = ($request->input('a2Miercoles') == "")? '' : $request->input('a2Miercoles');
          $turnoMiercoles = ($request->input('turnoMiercoles') == "")? '' : $request->input('turnoMiercoles');

          $juevesActivated = ($request->input('juevesActivated') == 1)? 1 : 0 ; 
          $de1Jueves = ($request->input('de1Jueves') == "")? '' : $request->input('de1Jueves');
          $a1Jueves = ($request->input('a1Jueves') == "")? '' : $request->input('a1Jueves');
          $de2Jueves = ($request->input('de2Jueves') == "")? '' : $request->input('de2Jueves');
          $a2Jueves = ($request->input('a2Jueves') == "")? '' : $request->input('a2Jueves');
          $turnoJueves = ($request->input('turnoJueves') == "")? '' : $request->input('turnoJueves');

          $viernesActivated = ($request->input('viernesActivated') == 1)? 1 : 0 ; 
          $de1Viernes = ($request->input('de1Viernes') == "")? '' : $request->input('de1Viernes');
          $a1Viernes = ($request->input('a1Viernes') == "")? '' : $request->input('a1Viernes');
          $de2Viernes = ($request->input('de2Viernes') == "")? '' : $request->input('de2Viernes');
          $a2Viernes = ($request->input('a2Viernes') == "")? '' : $request->input('a2Viernes');
          $turnoViernes = ($request->input('turnoViernes') == "")? '' : $request->input('turnoViernes');

          $sabadoActivated = ($request->input('sabadoActivated') == 1)? 1 : 0 ; 
          $de1Sabado = ($request->input('de1Sabado') == "")? '' : $request->input('de1Sabado');
          $a1Sabado = ($request->input('a1Sabado') == "")? '' : $request->input('a1Sabado');
          $de2Sabado = ($request->input('de2Sabado') == "")? '' : $request->input('de2Sabado');
          $a2Sabado = ($request->input('a2Sabado') == "")? '' : $request->input('a2Sabado');
          $turnoSabado = ($request->input('turnoSabado') == "")? '' : $request->input('turnoSabado');

          $domingoActivated = ($request->input('domingoActivated') == 1)? 1 : 0 ; 
          $de1Domingo = ($request->input('de1Domingo') == "")? '' : $request->input('de1Domingo');
          $a1Domingo = ($request->input('a1Domingo') == "")? '' : $request->input('a1Domingo');
          $de2Domingo = ($request->input('de2Domingo') == "")? '' : $request->input('de2Domingo');
          $a2Domingo = ($request->input('a2Domingo') == "")? '' : $request->input('a2Domingo');
          $turnoDomingo = ($request->input('turnoDomingo') == "")? '' : $request->input('turnoDomingo');

          Log::info("[APIEmpresas][ModPlantilla] idPlantilla: " . $idPlantilla);

          Log::info("[APIEmpresas][ModPlantilla] nombrePlantilla: " . $nombrePlantilla);

          Log::info("[APIEmpresas][ModPlantilla] id_empresas: " . $id_empresas);
          
          Log::info("[APIEmpresas][ModPlantilla] lunesActivated: " . $lunesActivated);
          Log::info("[APIEmpresas][ModPlantilla] de1Lunes: " . $de1Lunes);
          Log::info("[APIEmpresas][ModPlantilla] a1Lunes: " . $a1Lunes);
          Log::info("[APIEmpresas][ModPlantilla] de2Lunes: " . $de2Lunes);
          Log::info("[APIEmpresas][ModPlantilla] a2Lunes: " . $a2Lunes);
          Log::info("[APIEmpresas][ModPlantilla] lunesTurno: " . $turnoLunes);
          
          Log::info("[APIEmpresas][ModPlantilla] martesActivated: " . $martesActivated);
          Log::info("[APIEmpresas][ModPlantilla] de1Martes: " . $de1Martes);
          Log::info("[APIEmpresas][ModPlantilla] a1Martes: " . $a1Martes);
          Log::info("[APIEmpresas][ModPlantilla] de2Martes: " . $de2Martes);
          Log::info("[APIEmpresas][ModPlantilla] a2Martes: " . $a2Martes);
          Log::info("[APIEmpresas][ModPlantilla] martesTurno: " . $turnoMartes);
          
          Log::info("[APIEmpresas][ModPlantilla] miercolesActivated: " . $miercolesActivated);
          Log::info("[APIEmpresas][ModPlantilla] de1Miercoles: " . $de1Miercoles);
          Log::info("[APIEmpresas][ModPlantilla] a1Miercoles: " . $a1Miercoles);
          Log::info("[APIEmpresas][ModPlantilla] de2Miercoles: " . $de2Miercoles);
          Log::info("[APIEmpresas][ModPlantilla] a2Miercoles: " . $a2Miercoles);
          Log::info("[APIEmpresas][ModPlantilla] miercolesTurno: " . $turnoMiercoles);
          
          Log::info("[APIEmpresas][ModPlantilla] juevesActivated: " . $juevesActivated);
          Log::info("[APIEmpresas][ModPlantilla] de1Jueves: " . $de1Jueves);
          Log::info("[APIEmpresas][ModPlantilla] a1Jueves: " . $a1Jueves);
          Log::info("[APIEmpresas][ModPlantilla] de2Jueves: " . $de2Jueves);
          Log::info("[APIEmpresas][ModPlantilla] a2Jueves: " . $a2Jueves);
          Log::info("[APIEmpresas][ModPlantilla] juevesTurno: " . $turnoJueves);
          
          Log::info("[APIEmpresas][ModPlantilla] viernesActivated: " . $viernesActivated);
          Log::info("[APIEmpresas][ModPlantilla] de1Viernes: " . $de1Viernes);
          Log::info("[APIEmpresas][ModPlantilla] a1Viernes: " . $a1Viernes);
          Log::info("[APIEmpresas][ModPlantilla] de2Viernes: " . $de2Viernes);
          Log::info("[APIEmpresas][ModPlantilla] a2Viernes: " . $a2Viernes);
          Log::info("[APIEmpresas][ModPlantilla] viernesTurno: " . $turnoViernes);
          
          Log::info("[APIEmpresas][ModPlantilla] sabadoActivated: " . $sabadoActivated);
          Log::info("[APIEmpresas][ModPlantilla] de1Sabado: " . $de1Sabado);
          Log::info("[APIEmpresas][ModPlantilla] a1Sabado: " . $a1Sabado);
          Log::info("[APIEmpresas][ModPlantilla] de2Sabado: " . $de2Sabado);
          Log::info("[APIEmpresas][ModPlantilla] a2Sabado: " . $a2Sabado);
          Log::info("[APIEmpresas][ModPlantilla] sabadoTurno: " . $turnoSabado);
          
          Log::info("[APIEmpresas][ModPlantilla] domingoActivated: " . $domingoActivated);
          Log::info("[APIEmpresas][ModPlantilla] de1Domingo: " . $de1Domingo);
          Log::info("[APIEmpresas][ModPlantilla] a1Domingo: " . $a1Domingo);
          Log::info("[APIEmpresas][ModPlantilla] de2Domingo: " . $de2Domingo);
          Log::info("[APIEmpresas][ModPlantilla] a2Domingo: " . $a2Domingo);
          Log::info("[APIEmpresas][ModPlantilla] domingoTurno: " . $turnoDomingo);

          $plantillas = Plantillas::modPlantilla($idPlantilla, $nombrePlantilla, $id_empresas,
          $lunesActivated, $de1Lunes, $a1Lunes, $de2Lunes, $a2Lunes, $turnoLunes,
          $martesActivated, $de1Martes, $a1Martes, $de2Martes, $a2Martes, $turnoMartes,
          $miercolesActivated, $de1Miercoles, $a1Miercoles, $de2Miercoles, $a2Miercoles, $turnoMiercoles,
          $juevesActivated, $de1Jueves, $a1Jueves, $de2Jueves, $a2Jueves, $turnoJueves,
          $viernesActivated, $de1Viernes, $a1Viernes, $de2Viernes, $a2Viernes, $turnoViernes,
          $sabadoActivated, $de1Sabado, $a1Sabado, $de2Sabado, $a2Sabado, $turnoSabado,
          $domingoActivated, $de1Domingo, $a1Domingo, $de2Domingo, $a2Domingo, $turnoDomingo);
        
          Log::info($plantillas);
          
          if($plantillas[0]->save==1){

            $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), count($plantillas));
            $responseJSON->data = $plantillas;
            return json_encode($responseJSON);

          } else {

            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), count($plantillas));
            $responseJSON->data = [];
            return json_encode($responseJSON);

          }
          
        }

        return redirect('/');


      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APIEmpresas][ModPlantilla] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIEmpresas][ModPlantilla] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIEmpresas][ModPlantilla] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APIEmpresas][ModPlantilla] ' . $e);

        return redirect('/');

      }



    } else {
      abort(404);
    }

  }

  public function GetAllEmpresas(Request $request){
    
    Log::info('[APIEmpresas][GetAllEmpresas]');

    Log::info("[APIEmpresas][GetAllEmpresas] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APIEmpresas][GetAllEmpresas] Token: ". $token);


      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        if(in_array(1, $token_decrypt["permisos"])){

          Log::info("[APIEmpresas][GetAllEmpresas] Permiso Existente");

          $Empresas = Empresas::all();
        
          Log::info($Empresas);
          
          if(count($Empresas)>0){

            $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), count($Empresas));
            $responseJSON->data = $Empresas;
            return json_encode($responseJSON);

          } else {

            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), count($Empresas));
            $responseJSON->data = [];
            return json_encode($responseJSON);

          }
          
        }

        return redirect('/');


      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APIEmpresas][GetAllEmpresas] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIEmpresas][GetAllEmpresas] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIEmpresas][GetAllEmpresas] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APIEmpresas][GetAllEmpresas] ' . $e);

        return redirect('/');

      }



    } else {
      abort(404);
    }

  }

  public function GetSalidas(Request $request){
    
    Log::info('[APIEmpresas][GetSalidas]');

    Log::info("[APIEmpresas][GetSalidas] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APIEmpresas][GetSalidas] Token: ". $token);


      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        if(in_array(3, $token_decrypt["permisos"]) || in_array(2, $token_decrypt["permisos"])){

          Log::info("[APIEmpresas][GetEmpresa] Permiso Existente");

          $this->validate($request, [
            'id_empresas' => 'required'
          ]);
            
          $id_empresas = $request->input('id_empresas');
          
          $salidas = Salidas::getSalidasByIdEmpresas($id_empresas)->get();
          
          Log::info($salidas);
          
          if(count($salidas)>0){

            $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), count($salidas));
            $responseJSON->data = $salidas;
            return json_encode($responseJSON);

          } else {

            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), count($salidas));
            $responseJSON->data = [];
            return json_encode($responseJSON);

          }
          
        }

        return redirect('/');


      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APIEmpresas][GetSalidas] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIEmpresas][GetSalidas] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIEmpresas][GetSalidas] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APIEmpresas][GetSalidas] ' . $e);

        return redirect('/');

      }



    } else {
      abort(404);
    }

  }

  public function GetSalidaId(Request $request){
    
    Log::info('[APIEmpresas][GetSalidaId]');

    Log::info("[APIEmpresas][GetSalidaId] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APIEmpresas][GetSalidaId] Token: ". $token);


      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        if(in_array(2, $token_decrypt["permisos"])){

          Log::info("[APIEmpresas][GetSalidaId] Permiso Existente");

          $this->validate($request, [
            'id_salidas' => 'required'
          ]);
            
          $id_salidas = $request->input('id_salidas');

          $salidas = Salidas::getSalidaByIdSalidaAndByIdEmpresa($id_salidas, $token_decrypt['usr']->id_empresas)->get();
        
          Log::info($salidas);
          
          if(count($salidas)>0){

            $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), count($salidas));
            $responseJSON->data = $salidas;
            return json_encode($responseJSON);

          } else {

            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), count($salidas));
            $responseJSON->data = [];
            return json_encode($responseJSON);

          }
          
        }

        return redirect('/');


      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APIEmpresas][GetSalidaId] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIEmpresas][GetSalidaId] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIEmpresas][GetSalidaId] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APIEmpresas][GetSalidaId] ' . $e);

        return redirect('/');

      }



    } else {
      abort(404);
    }

  }

  public function GetEmpresa(Request $request){
    
    Log::info('[APIEmpresas][GetEmpresa]');

    Log::info("[APIEmpresas][GetEmpresa] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APIEmpresas][GetEmpresa] Token: ". $token);


      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        if(in_array(1, $token_decrypt["permisos"]) || in_array(2, $token_decrypt["permisos"])){

          Log::info("[APIEmpresas][GetEmpresa] Permiso Existente");
          
          $this->validate($request, [
            'id_empresas' => 'required'
          ]);
            
          $id_empresas = $request->input('id_empresas');

          $empresas = Empresas::getByIdEmpresas($id_empresas)->get();
        
          Log::info($empresas);
          
          if(count($empresas)>0){

            $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), count($empresas));
            $responseJSON->data = $empresas;
            return json_encode($responseJSON);

          } else {

            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), count($empresas));
            $responseJSON->data = [];
            return json_encode($responseJSON);

          }
          
        }

        return redirect('/');


      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APIEmpresas][GetEmpresa] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIEmpresas][GetEmpresa] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIEmpresas][GetEmpresa] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APIEmpresas][GetEmpresa] ' . $e);

        return redirect('/');

      }



    } else {
      abort(404);
    }

  }

  
  public function HistorialEntradasEmpresa(Request $request){
    
    Log::info('[APIEmpresas][HistorialEntradasEmpresa]');

    Log::info("[APIEmpresas][HistorialEntradasEmpresa] Método Recibido: ". $request->getMethod());

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
            
          return view('system.historialEntradasEmpresa',["title" => config('app.name'), 
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
    
        Log::info('[APIEmpresas][HistorialEntradasEmpresa] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIEmpresas][HistorialEntradasEmpresa] Token error: token_invalid');

        return redirect('/');
                                    
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIEmpresas][HistorialEntradasEmpresa] Token error: token_absent');

        return redirect('/');
  
      }

    } else {
      abort(404);
    }

  }


  public function GetPlantillas(Request $request){
    
    Log::info('[APIEmpresas][GetPlantillas]');

    Log::info("[APIEmpresas][GetPlantillas] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APIEmpresas][GetPlantillas] Token: ". $token);


      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        if(in_array(2, $token_decrypt["permisos"])){

          Log::info("[APIEmpresas][GetPlantillas] Permiso Existente");

          $plantillas = Plantillas::getByIdEmpresas($token_decrypt['usr']->id_empresas)->orderBy('id_plantillas', 'asc')->get();
        
          Log::info($plantillas);
          
          if(count($plantillas)>0){

            $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), count($plantillas));
            $responseJSON->data = $plantillas;
            return json_encode($responseJSON);

          } else {

            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), count($plantillas));
            $responseJSON->data = [];
            return json_encode($responseJSON);

          }
          
        }

        return redirect('/');


      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APIEmpresas][AltaPlantilla] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIEmpresas][AltaPlantilla] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIEmpresas][AltaPlantilla] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APIEmpresas][AltaPlantilla] ' . $e);

        return redirect('/');

      }



    } else {
      abort(404);
    }

  }

  public function Perfil(Request $request){
    
    Log::info('[APIEmpresas][Perfil]');

    Log::info("[APIEmpresas][Perfil] Método Recibido: ". $request->getMethod());

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

        

        if(in_array(2, $token_decrypt["permisos"])){

          return view('system.perfilEmpresas',["title" => config('app.name'), 
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
    
        Log::info('[APIEmpresas][Perfil] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIEmpresas][Perfil] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIEmpresas][Perfil] Token error: token_absent');

        return redirect('/');
  
      }

    } else {
      abort(404);
    }

  }

  public function PerfilPass(Request $request){
    
    Log::info('[APIEmpresas][PerfilPass]');

    Log::info("[APIEmpresas][PerfilPass] Método Recibido: ". $request->getMethod());

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

        

        if(in_array(2, $token_decrypt["permisos"])){

          return view('system.perfilEmpresasPass',["title" => config('app.name'), 
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
    
        Log::info('[APIEmpresas][PerfilPass] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIEmpresas][PerfilPass] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIEmpresas][PerfilPass] Token error: token_absent');

        return redirect('/');
  
      }

    } else {
      abort(404);
    }

  }

  public function Configuraciones(Request $request){
    
    Log::info('[APIEmpresas][Configuraciones]');

    Log::info("[APIEmpresas][Configuraciones] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APIEmpresas][Configuraciones] Token: ". $token);


      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        if(in_array(2, $token_decrypt["permisos"])){

          Log::info("[APIEmpresas][Configuraciones] Permiso Existente");
          
          return view('system.configuraciones',["title" => config('app.name'), 
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
    
        Log::info('[APIEmpresas][Configuraciones] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIEmpresas][Configuraciones] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIEmpresas][Configuraciones] Token error: token_absent');

        return redirect('/');
  
      } catch(Exception $e) {

        //Errores
    
        Log::info('[APIEmpresas][Configuraciones] ' . $e);

        return redirect('/');

      }



    } else {
      abort(404);
    }

  }

  public function GetIdiomaObtener(Request $request){
  
    Log::info('[APIEmpresas][GetIdiomaObtener]');

    Log::info("[APIEmpresas][GetIdiomaObtener] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      
      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required',
        'id_empresas' => 'required'
      ]);
        
      $token = $request->input('token');
      $id_empresas = $request->input('id_empresas');

      Log::info("[APIEmpresas][GetIdiomaObtener] Token: ". $token);
      Log::info("[APIEmpresas][GetIdiomaObtener] id_empresas: ". $id_empresas);

      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        $Idiomas = Idiomas::addNewEnterprise($id_empresas);
        
        Log::info($Idiomas);

        if(count($Idiomas)>0){
          
          $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), count($Idiomas));
          $responseJSON->data = $Idiomas;
          return json_encode($responseJSON);

        } else {

          $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), count($Idiomas));
          $responseJSON->data = [];
          return json_encode($responseJSON);

        }


      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APIEmpresas][GetIdiomaObtener] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIEmpresas][GetIdiomaObtener] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIEmpresas][GetIdiomaObtener] Token error: token_absent');

        return redirect('/');
  
      }


    } else {
      abort(404);
    }

  }

  public function AltaEmpresa(Request $request){
  
    Log::info('[APIEmpresas][AltaEmpresa]');

    Log::info("[APIEmpresas][AltaEmpresa] Método Recibido: ". $request->getMethod());

    if($request->isMethod('POST')) {

      
      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APIEmpresas][GetIdiomaObtener] Token: ". $token);

      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        
        $nombreEmpresa = $request->input('nombreEmpresa');
        $nombreSolicitante = $request->input('nombreSolicitante');
        $correoElectronico = $request->input('correoElectronico');
        $telefonoFijo = $request->input('telefonoFijo');
        $celular = $request->input('celular');
        $datepicker = $request->input('datepicker');
        $empleadosPermitidos = $request->input('empleadosPermitidos');
        $activa = $request->input('activa');
        $dominio = $request->input('dominio');
        $subdominio = $request->input('subdominio');
        $contrasena = $request->input('contrasena');
        $color = $request->input('color');

        Log::info("[APIEmpresas][AltaEmpresa] nombreEmpresa: " .$nombreEmpresa);
        Log::info("[APIEmpresas][AltaEmpresa] nombreSolicitante: " .$nombreSolicitante);
        Log::info("[APIEmpresas][AltaEmpresa] correoElectronico: " .$correoElectronico);
        Log::info("[APIEmpresas][AltaEmpresa] telefonoFijo: " .$telefonoFijo);
        Log::info("[APIEmpresas][AltaEmpresa] celular: " .$celular);
        Log::info("[APIEmpresas][AltaEmpresa] datepicker: " .$datepicker);
        Log::info("[APIEmpresas][AltaEmpresa] empleadosPermitidos: " .$empleadosPermitidos);
        Log::info("[APIEmpresas][AltaEmpresa] activa: " .$activa);
        Log::info("[APIEmpresas][AltaEmpresa] dominio: " .$dominio);
        Log::info("[APIEmpresas][AltaEmpresa] subdominio: " .$subdominio);
        Log::info("[APIEmpresas][AltaEmpresa] contrasena: " .$contrasena);
        Log::info("[APIEmpresas][AltaEmpresa] color: " .$color);

        $empresas = Empresas::addNewEnterprise($nombreEmpresa, $nombreSolicitante, $correoElectronico, $telefonoFijo, $celular, $datepicker, $empleadosPermitidos, $activa, $dominio, $subdominio, $contrasena, $color);
        
        Log::info($empresas);

        $Permisos_inter = Permisos_inter::addNewEmpresa($empresas[0]->id);

        if($empresas[0]->save==1 && $Permisos_inter[0]->save==1){
          
          /*Cpanel is disable
          $result = Functions::cPanelAddSubdomain(env('CPANEL_USERNAME'), env('CPANEL_PASSWORD'), $subdominio, env('CPANEL_DOMAIN'));
          
          Log::info("[APIEmpresas][AltaEmpresa] Cpanel API");
          Log::info($result);
          */

          $body = "<?PHP
                     header('Location: ".env('APP_URL')."/".$subdominio."');
                   ?>";

          $result_folder = Functions::createFolder(dirname(__FILE__).'/../../../../'.$subdominio, $body);

          $result_archive = Functions::createArchive(dirname(__FILE__).'/../../../../'.$subdominio.'/index.php', $body);

          if($result_archive==1 && $result_folder==1){

            $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), count($empresas));
            $responseJSON->data = $empresas;
            return json_encode($responseJSON);

          } else {

            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), count($empresas));
            $responseJSON->data = [];
            return json_encode($responseJSON);

          }

        } else {

          $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), count($empresas));
          $responseJSON->data = [];
          return json_encode($responseJSON);

        }


      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APIEmpresas][AltaEmpresa] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIEmpresas][AltaEmpresa] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIEmpresas][AltaEmpresa] Token error: token_absent');

        return redirect('/');
  
      }


    } else {
      abort(404);
    }

  }

  public function DeleteEmpresa(Request $request){
  
    Log::info('[APIEmpresas][DeleteEmpresa]');

    Log::info("[APIEmpresas][DeleteEmpresa] Método Recibido: ". $request->getMethod());

    if($request->isMethod('POST')) {

      
      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required',
        'id_empresa' => 'required'
      ]);
        
      $token = $request->input('token');
      $id_empresa = $request->input('id_empresa');

      Log::info("[APIEmpresas][DeleteEmpresa] Token: ". $token);
      Log::info("[APIEmpresas][DeleteEmpresa] id_empresa: ". $id_empresa);

      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        $Empresas = Empresas::delByIdEmpresas($id_empresa);
        
        Log::info($Empresas);

        if($Empresas==1){

          $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), 0);
          $responseJSON->data = $Empresas;
          return json_encode($responseJSON);

        } else {

          $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), 0);
          $responseJSON->data = [];
          return json_encode($responseJSON);

        }


      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APIEmpresas][DeleteEmpresa] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIEmpresas][DeleteEmpresa] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIEmpresas][DeleteEmpresa] Token error: token_absent');

        return redirect('/');
  
      }


    } else {
      abort(404);
    }



  }

  public function ModEmpresa(Request $request){
  
    Log::info('[APIEmpresas][ModEmpresa]');

    Log::info("[APIEmpresas][ModEmpresa] Método Recibido: ". $request->getMethod());

    if($request->isMethod('POST')) {

      
      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APIEmpresas][GetIdiomaObtener] Token: ". $token);

      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        
        $nombreEmpresa = $request->input('nombreEmpresa');
        $nombreSolicitante = $request->input('nombreSolicitante');
        $correoElectronico = $request->input('correoElectronico');
        $telefonoFijo = $request->input('telefonoFijo');
        $celular = $request->input('celular');
        $datepicker = $request->input('datepicker');
        $empleadosPermitidos = $request->input('empleadosPermitidos');
        $activa = $request->input('activa');
        $dominio = $request->input('dominio');
        $subdominio = $request->input('subdominio');
        $contrasena = $request->input('contrasena');
        $color = $request->input('color');

        Log::info("[APIEmpresas][ModEmpresa] nombreEmpresa: " .$nombreEmpresa);
        Log::info("[APIEmpresas][ModEmpresa] nombreSolicitante: " .$nombreSolicitante);
        Log::info("[APIEmpresas][ModEmpresa] correoElectronico: " .$correoElectronico);
        Log::info("[APIEmpresas][ModEmpresa] telefonoFijo: " .$telefonoFijo);
        Log::info("[APIEmpresas][ModEmpresa] celular: " .$celular);
        Log::info("[APIEmpresas][ModEmpresa] datepicker: " .$datepicker);
        Log::info("[APIEmpresas][ModEmpresa] empleadosPermitidos: " .$empleadosPermitidos);
        Log::info("[APIEmpresas][ModEmpresa] activa: " .$activa);
        Log::info("[APIEmpresas][ModEmpresa] dominio: " .$dominio);
        Log::info("[APIEmpresas][ModEmpresa] subdominio: " .$subdominio);
        Log::info("[APIEmpresas][ModEmpresa] contrasena: " .$contrasena);
        Log::info("[APIEmpresas][ModEmpresa] color: " .$color);

        $empresas = Empresas::addNewEnterprise($nombreEmpresa, $nombreSolicitante, $correoElectronico, $telefonoFijo, $celular, $datepicker, $empleadosPermitidos, $activa, $dominio, $subdominio, $contrasena, $color);
        
        Log::info($empresas);

        $Permisos_inter = Permisos_inter::addNewEmpresa($empresas[0]->id);

        if($empresas[0]->save==1 && $Permisos_inter[0]->save==1){
          
          /*cpanel is disabled
          $result = Functions::cPanelAddSubdomain(env('CPANEL_USERNAME'), env('CPANEL_PASSWORD'), $subdominio, env('CPANEL_DOMAIN'));
          Log::info("[APIEmpresas][ModEmpresa] Cpanel API");
          Log::info($result);
          */

          $body = "<?PHP
                     header('Location: ".env('APP_URL')."/".$subdominio."');
                   ?>";

          $result_archive = Functions::createArchive(dirname(__FILE__).'/../../../../'.$subdominio.'/index.php', $body);

          if($result_archive==1){

            $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), count($empresas));
            $responseJSON->data = $empresas;
            return json_encode($responseJSON);

          } else {

            $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), count($empresas));
            $responseJSON->data = [];
            return json_encode($responseJSON);

          }

        } else {

          $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), count($empresas));
          $responseJSON->data = [];
          return json_encode($responseJSON);

        }


      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APIEmpresas][ModEmpresa] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIEmpresas][ModEmpresa] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIEmpresas][ModEmpresa] Token error: token_absent');

        return redirect('/');
  
      }


    } else {
      abort(404);
    }


  }

  public function NuevaPlantilla(Request $request){
    
    Log::info('[APIEmpresas][NuevaPlantilla]');

    Log::info("[APIEmpresas][NuevaPlantilla] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      
      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APIEmpresas][NuevaPlantilla] Token: ". $token);

      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        if(in_array(2, $token_decrypt["permisos"])){

          return view('system.nuevaplantilla',["title" => config('app.name'), 
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
    
        Log::info('[APIEmpresas][NuevaPlantilla] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIEmpresas][NuevaPlantilla] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIEmpresas][NuevaPlantilla] Token error: token_absent');

        return redirect('/');
  
      }


    } else {
      abort(404);
    }

  }

  public function RecuperarPass(Request $request){
    
    Log::info('[APIEmpresas][RecuperarPass]');

    Log::info("[APIEmpresas][RecuperarPass] Método Recibido: ". $request->getMethod());

    if($request->isMethod('POST')) {
    
      $this->validate($request, [
        'correo' => 'required'
      ]);

      $correo = $request->input('correo');
      $pass = Functions::generacion_contrasenas_aleatorias(8);

      $empresas = Empresas::cambioContrasena($correo, $pass);

      if($empresas==1){

        $empresas = Empresas::lookForByEmailAndPass($correo, $pass)->get();

        $data["name"] = $empresas[0]->nombre;
        //Send to queue email list of administrator mail
        $data["user_id"] = $empresas[0]->id_empresas;
        $data["tipo"] = "Trabajador";
        $data['email'] = $correo;
        $data['password'] = $pass;
        //$data['body'] = "".Lang::get('messages.emailSubscribeBody')."".$email."";
        //$data['subject'] = Lang::get('messages.emailSubscribeSubject');
        //$data['name'] = Config::get('mail.from.name');
        //$data['priority'] = 1;

        $mail = new QueueMails($data);
        $mail->newPassword();

        $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.SentEmail'), count($empresas));
        $responseJSON->data = $empresas;
        return json_encode($responseJSON);

      } else {

        $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.NotFoundMail'), count($empresas));
        $responseJSON->data = [];
        return json_encode($responseJSON);

      }

    } else {
      abort(404);
    }

  }

  public function Recuperar(Request $request){
    
    Log::info('[APIEmpresas][Recuperar]');

    Log::info("[APIEmpresas][Recuperar] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {
      
      $path = explode("/", $request->path());

      $subdominio = Empresas::lookForBySubdominio($path[0])->get();
    
      Log::info('[APIEmpresas][Recuperar] subdominio size: ' . count($subdominio));

      Log::info($subdominio);

      if(count($subdominio)>0){

        $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDData'), count($subdominio));
        $responseJSON->data = [];
        
        $colores = Colores::lookForById($subdominio->first()->color)->get();

        Log::info($subdominio->first()->color);
        Log::info($colores->first()->hex);

        return view('empresas.recuperar',["title" => config('app.name'), 
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

  public function ModificarPlantilla(Request $request){
    
    Log::info('[APIEmpresas][ModificarPlantilla]');

    Log::info("[APIEmpresas][ModificarPlantilla] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      
      $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);

      $this->validate($request, [
        'token' => 'required'
      ]);
        
      $token = $request->input('token');

      Log::info("[APIEmpresas][ModificarPlantilla] Token: ". $token);

      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        if(in_array(2, $token_decrypt["permisos"])){

          return view('system.modplantilla',["title" => config('app.name'), 
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
    
        Log::info('[APIEmpresas][ModificarPlantilla] Token error: token_expired');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APIEmpresas][ModificarPlantilla] Token error: token_invalid');

        return redirect('/');
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APIEmpresas][ModificarPlantilla] Token error: token_absent');

        return redirect('/');
  
      }


    } else {
      abort(404);
    }

  }
  

  public function SubdominioValidar(Request $request){
  
    Log::info('[APIEmpresas][SubdominioValidar]');

    Log::info("[APIEmpresas][SubdominioValidar] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {
      
      $subdominio = $request->input('subdominio');
  
      Log::info('[APIEmpresas][SubdominioValidar] subdominio: ' . $subdominio);

      $subdominios_array = Empresas::lookForBySubdominio($subdominio)->get();

      if(count($subdominios_array)>0){  
        $subdominios_array->first()->foto_base64 = "";
      }
  
      Log::info('[APIEmpresas][SubdominioValidar] subdominio size: ' . count($subdominios_array));

      Log::info($subdominios_array);

      if(count($subdominios_array)>0){

          $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.BDdata'), count($subdominios_array));
          $responseJSON->data = $subdominios_array;
          return json_encode($responseJSON);

      } else {

          $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDnoData'), count($subdominios_array));
          $responseJSON->data = [];
          return json_encode($responseJSON);

      }

    } else {
      abort(404);
    }

  }
}

?>