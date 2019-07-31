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
use Auth;
use carbon\Carbon;
use Illuminate\Support\Facades\Log;
use JWTAuth;
use JWTFactory;
use Tymon\JWTAuth\PayloadFactory;
use Tymon\JWTAuth\Exceptions\JWTException;
use Session;

class APIEmpresas extends Controller
{

    public function SubdominioValidar(Request $request){
    
      Log::info('[SubdominioValidar]');
  
      Log::info("[SubdominioValidar] Método Recibido: ". $request->getMethod());

      if($request->isMethod('GET')) {
        
        $subdominio = $request->input('subdominio');
    
        Log::info('[SubdominioValidar] subdominio: ' . $subdominio);

        $subdominios_array = Empresas::lookForBySubdominio($subdominio)->get();
    
        Log::info('[SubdominioValidar] subdominio size: ' . count($subdominios_array));

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