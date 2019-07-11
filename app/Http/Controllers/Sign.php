<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Lang;
use App;
use Config;
use Auth;
use DB;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class Sign extends Controller
{

    public function SignIn(Request $request){
  
        Log::info('[SignIn]');
  
        Log::info("[SignIn] Método Recibido: ". $request->getMethod());

        return view('sign.login',["title" => "Pedidos de Cargamentos Ligeros", "lang" => "es"]);


    }

}