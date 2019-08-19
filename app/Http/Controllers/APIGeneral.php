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