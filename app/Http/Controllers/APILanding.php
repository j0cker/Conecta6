<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Lang;
use App;
use Config;
use App\Library\VO\ResponseJSON;
use App\Library\DAO\Trabajadores;
use App\Library\DAO\Admin;
use App\Library\DAO\Permisos_inter;
use Auth;
use carbon\Carbon;
use Illuminate\Support\Facades\Log;
use JWTAuth;
use JWTFactory;
use Tymon\JWTAuth\PayloadFactory;
use Tymon\JWTAuth\Exceptions\JWTException;
use Session;

class APILanding extends Controller
{

    public function Landing(Request $request){
        
        Log::info('[Landing]');

        Log::info("[Landing] Método Recibido: ". $request->getMethod());

        if($request->isMethod('GET')) {

            return view('landing.inicio');


        } else {

        abort(404);

        }


    }
}

?>