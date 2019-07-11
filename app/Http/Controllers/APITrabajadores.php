<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Lang;
use App;
use Config;
use App\Library\VO\ResponseJSON;
use App\Library\DAO\Trabajadores;
use Auth;
use carbon\Carbon;
use Illuminate\Support\Facades\Log;
use JWTAuth;
use JWTFactory;
use Tymon\JWTAuth\PayloadFactory;
use Tymon\JWTAuth\Exceptions\JWTException;

class APITrabajadores extends Controller
{

  public function SignIn(Request $request){
  
    Log::info('[SignIn]');

    Log::info("[SignIn] Método Recibido: ". $request->getMethod());

    return view('sign.login',["title" => config('app.name'), "lang" => "es"]);


  }

  public function Ingresar(Request $request){
    
    Log::info('[APITrabajadores][ingresar]');

    Log::info("[APITrabajadores][ingresar] Método Recibido: ". $request->getMethod());


    if($request->isMethod('GET')) {
      
      $correo = $request->input('correo');
      $contPass = $request->input('contPass');

      Log::info("[APITrabajadores][ingresar] correo: ". $correo);
      Log::info("[APITrabajadores][ingresar] contPass: ". $contPass);

      $trabajador = Trabajadores::lookForByEmailAndPass($correo, $contPass)->get();

      if(count($trabajador)>0){

        $jwt_token = null;

        $factory = JWTFactory::customClaims([
          'sub'   => $trabajador->first()->id_trabajadores, //id a conciliar del usuario
          'iss'   => config('app.name'),
          'iat'   => Carbon::now()->timestamp,
          'exp'   => Carbon::tomorrow()->timestamp,
          'nbf'   => Carbon::now()->timestamp,
          'jti'   => uniqid(),
          'usr'   => $trabajador->first()
        ]);
        
        $payload = $factory->make();
        
        $jwt_token = JWTAuth::encode($payload);

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

      try {

        // attempt to verify the credentials and create a token for the user
        $token = JWTAuth::getToken();
        $token_decrypt = JWTAuth::getPayload($token)->toArray();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        return view('system.inicio',["title" => config('app.name'), "lang" => "es"]);

      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APITrabajadores][Inicio] Token error: token_expired');
  
        return view('sign.login',["title" => config('app.name'), "lang" => "es"]);
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APITrabajadores][Inicio] Token error: token_invalid');
  
        return view('sign.login',["title" => config('app.name'), "lang" => "es"]);
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APITrabajadores][Inicio] Token error: token_absent');
  
        return view('sign.login',["title" => config('app.name'), "lang" => "es"]);
  
      }



    } else {
      abort(404);
    }

  }

  public function Marketing(Request $request){
    
    Log::info('[APITrabajadores][Marketing]');

    Log::info("[APITrabajadores][Marketing] Método Recibido: ". $request->getMethod());

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

        return view('system.marketing',["title" => config('app.name'), "lang" => "es"]);

      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APITrabajadores][Inicio] Token error: token_expired');
  
        return view('sign.login',["title" => config('app.name'), "lang" => "es"]);
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APITrabajadores][Inicio] Token error: token_invalid');
  
        return view('sign.login',["title" => config('app.name'), "lang" => "es"]);
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APITrabajadores][Inicio] Token error: token_absent');
  
        return view('sign.login',["title" => config('app.name'), "lang" => "es"]);
  
      }



    } else {
      abort(404);
    }

  }

  public function Introduction(Request $request){
    
    Log::info('[APITrabajadores][Introduction]');

    Log::info("[APITrabajadores][Introduction] Método Recibido: ". $request->getMethod());

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

        return view('system.introduction',["title" => config('app.name'), "lang" => "es"]);

      } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

        //token_expired
    
        Log::info('[APITrabajadores][Introduction] Token error: token_expired');
  
        return view('sign.login',["title" => config('app.name'), "lang" => "es"]);
  
      } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        //token_invalid
    
        Log::info('[APITrabajadores][Introduction] Token error: token_invalid');
  
        return view('sign.login',["title" => config('app.name'), "lang" => "es"]);
  
      } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

        //token_absent
    
        Log::info('[APITrabajadores][Introduction] Token error: token_absent');
  
        return view('sign.login',["title" => config('app.name'), "lang" => "es"]);
  
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
        JWTAuth::parseToken()->invalidate();

        //print_r($token_decrypt["id"]);

        //print_r($token_decrypt);

        $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),"Token Invalidado Exitosamente", 0);
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