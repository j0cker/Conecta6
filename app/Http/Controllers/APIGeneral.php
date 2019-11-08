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
use App\Library\DAO\ZonasHorarias;
use App\Library\DAO\Plantillas;
use App\Library\DAO\Colores;
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

class APIGeneral extends Controller
{

    public function ipPublica(Request $request){

      Log::info('[APITrabajadores][ipPublica]');

      Log::info("[APITrabajadores][ipPublica] Método Recibido: ". $request->getMethod());
  
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
  
          if(in_array("1", $token_decrypt["permisos"])==1 || in_array("2", $token_decrypt["permisos"])==1){
            
            //print_r($token_decrypt["id"]);
  
            //print_r($token_decrypt);

            $functions = new functions();
  
            $ip = $functions::getServerIp();
            
            if($ip!=""){
  
              $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), 1);
              $responseJSON->ip = $ip;
              return json_encode($responseJSON);
  
            } else {
  
              $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), 0);
              $responseJSON->data = [];
              return json_encode($responseJSON);
  
            }
  
          } else {
            
            return redirect('/');
            
          }
  
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
  
          //token_expired
      
          Log::info('[APITrabajadores][ipPublica] Token error: token_expired');
  
          return redirect('/');
    
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
  
          //token_invalid
      
          Log::info('[APITrabajadores][ipPublica] Token error: token_invalid');
  
          return redirect('/');
                                      
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
  
          //token_absent
      
          Log::info('[APITrabajadores][ipPublica] Token error: token_absent');
  
          return redirect('/');
    
        }
  
      } else {
        abort(404);
      }
    }

    public function ZonasHorarias(Request $request){
    
      Log::info('[ZonasHorarias]');
  
      Log::info("[ZonasHorarias] Método Recibido: ". $request->getMethod());
  
      if($request->isMethod('GET')) {
  

        $zonasHorarias = ZonasHorarias::all();

        //$image->first()->foto_base64 = "";
  
        if(count($zonasHorarias)>0){
  
          $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), count($zonasHorarias));
          $responseJSON->data = $zonasHorarias;
          return json_encode($responseJSON);
  
        } else {
  
          $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), count($zonasHorarias));
          $responseJSON->data = "";
          return json_encode($responseJSON);
  
        }
      } else {
  
        abort(404);
      
      }
  
    }
}

?>