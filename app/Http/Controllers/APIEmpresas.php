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

class APIEmpresas extends Controller
{

  public function SignInPersonalizado(Request $request){
  
    Log::info('[SignInPersonalizado]');

    Log::info("[SignInPersonalizado] Método Recibido: ". $request->getMethod());

    if($request->isMethod('GET')) {

      $path = $request->path();

      $subdominio = Empresas::lookForBySubdominio($path)->get();
    
      Log::info('[SignInPersonalizado] subdominio size: ' . count($subdominio));

      Log::info($subdominio);

      if(count($subdominio)>0){

        $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDData'), count($subdominio));
        $responseJSON->data = [];
        
        $colores = Colores::lookForById($subdominio->first()->color)->get();

        Log::info($subdominio->first()->color);
        Log::info($colores->first()->hex);
  
        return view('sign.login',["title" => config('app.name'), "lang" => "es", "color" => $subdominio->first()->color, "colorHex" => $colores->first()->hex]);

      } else {

        abort(404);

      }
        
      return ;

    } else {

      abort(404);
    
    }

  }

  public function AltaEmpresa(Request $request){
  
    Log::info('[AltaEmpresa]');

    Log::info("[AltaEmpresa] Método Recibido: ". $request->getMethod());

    if($request->isMethod('POST')) {

      
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

        
        $nombreEmpresa = $request->input('nombreEmpresa');
        $nombreSolicitante = $request->input('nombreSolicitante');
        $correoElectronico = $request->input('correoElectronico');
        $telefonoFijo = $request->input('telefonoFijo');
        $celular = $request->input('celular');
        $datepicker = $request->input('datepicker');
        $empleadosPermitidos = $request->input('empleadosPermitidos');
        $activa = $request->input('activa');
        $subdominio = $request->input('subdominio');
        $contrasena = $request->input('contrasena');
        $color = $request->input('color');

        Log::info("[AltaEmpresa] nombreEmpresa: " .$nombreEmpresa);
        Log::info("[AltaEmpresa] nombreSolicitante: " .$nombreSolicitante);
        Log::info("[AltaEmpresa] correoElectronico: " .$correoElectronico);
        Log::info("[AltaEmpresa] telefonoFijo: " .$telefonoFijo);
        Log::info("[AltaEmpresa] celular: " .$celular);
        Log::info("[AltaEmpresa] datepicker: " .$datepicker);
        Log::info("[AltaEmpresa] empleadosPermitidos: " .$empleadosPermitidos);
        Log::info("[AltaEmpresa] activa: " .$activa);
        Log::info("[AltaEmpresa] subdominio: " .$subdominio);
        Log::info("[AltaEmpresa] contrasena: " .$contrasena);
        Log::info("[AltaEmpresa] color: " .$color);

        $empresas = Empresas::addNewEnterprise($nombreEmpresa, $nombreSolicitante, $correoElectronico, $telefonoFijo, $celular, $datepicker, $empleadosPermitidos, $activa, $subdominio, $contrasena, $color);
        
        if($empresas==1){
          
          $result = Functions::cPanelAddSubdomain(env('CPANEL_USERNAME'), env('CPANEL_PASSWORD'), $subdominio, env('CPANEL_DOMAIN'));

          Log::info("[AltaEmpresa] Cpanel API");
          Log::info($result);

          $responseJSON = new ResponseJSON(Lang::get('messages.successTrue'),Lang::get('messages.BDsuccess'), count($empresas));
          $responseJSON->data = $empresas;
          return json_encode($responseJSON);

        } else {

          $responseJSON = new ResponseJSON(Lang::get('messages.successFalse'),Lang::get('messages.errorsBD'), count($empresas));
          $responseJSON->data = [];
          return json_encode($responseJSON);

        }


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