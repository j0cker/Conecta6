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

class APITest extends Controller
{   
    public function Test(Request $request){
  
        Log::info('[Test]');

        $body = "<?PHP
                    header('".env('APP_URL')."/cocacola/index.php');
                 ?>";

        Functions::createArchive(dirname(__FILE__).'/../../../../public_html/cocacola/index.php', $body);

    }
}

?>