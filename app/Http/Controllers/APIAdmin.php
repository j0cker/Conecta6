<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Lang;
use App;
use Config;
use App\Library\VO\ResponseJSON;
use App\Library\DAO\Trabajadores;
use App\Library\DAO\Admin;
use Auth;
use carbon\Carbon;
use Illuminate\Support\Facades\Log;
use JWTAuth;
use JWTFactory;
use Tymon\JWTAuth\PayloadFactory;
use Tymon\JWTAuth\Exceptions\JWTException;
use Session;

class APIAdmin extends Controller
{

    public function SignIn(Request $request){
    
      Log::info('[SignIn]');
  
      Log::info("[SignIn] Método Recibido: ". $request->getMethod());
  
      return view('admin.login',["title" => config('app.name'), "lang" => "es"]);
  
  
    }

    public function Ingresar(Request $request){
      
      Log::info('[APIAdmin][ingresar]');
  
      Log::info("[APIAdmin][ingresar] Método Recibido: ". $request->getMethod());
  
  
      if($request->isMethod('GET')) {
        
        $correo = $request->input('correo');
        $contPass = $request->input('contPass');
  
        Log::info("[APIAdmin][ingresar] correo: ". $correo);
        Log::info("[APIAdmin][ingresar] contPass: ". $contPass);
  
        $trabajador = Admin::lookForByEmailAndPass($correo, $contPass)->get();
  
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
          Log::info("[APIAdmin][ingresar] new token: ". $jwt_token->get());
  
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
      
      Log::info('[APIAdmin][Inicio]');
  
      Log::info("[APIAdmin][Inicio] Método Recibido: ". $request->getMethod());
  
      if($request->isMethod('GET')) {
  
        $request->merge(['token' => isset($_COOKIE["token"])? $_COOKIE["token"] : 'FALSE']);
  
        $this->validate($request, [
          'token' => 'required'
        ]);
          
        $token = $request->input('token');
  
        Log::info("[APIAdmin][Inicio] Token: ". $token);
  
        try {
  
          // attempt to verify the credentials and create a token for the user
          $token = JWTAuth::getToken();
          $token_decrypt = JWTAuth::getPayload($token)->toArray();
  
          //print_r($token_decrypt["id"]);
  
          //print_r($token_decrypt);
  
          return view('system.inicio',["title" => config('app.name'), "lang" => "es", "user" => $token_decrypt]);
  
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
  
          //token_expired
      
          Log::info('[APIAdmin][Inicio] Token error: token_expired');
    
          return view('admin.login',["title" => config('app.name'), "lang" => "es"]);
    
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
  
          //token_invalid
      
          Log::info('[APIAdmin][Inicio] Token error: token_invalid');
    
          return view('admin.login',["title" => config('app.name'), "lang" => "es"]);
    
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
  
          //token_absent
      
          Log::info('[APIAdmin][Inicio] Token error: token_absent');
    
          return view('admin.login',["title" => config('app.name'), "lang" => "es"]);
    
        }
  
  
  
      } else {
        abort(404);
      }
  
    }
}

?>