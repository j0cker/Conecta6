<?php

namespace App\Library\DAO;
use Config;
use App;
use DB;
use Log;
use Illuminate\Database\Eloquent\Model;

/*

update and insert doesnt need get->()


*/

class Idiomas extends Model
{
    public $table = 'idiomas';
    public $timestamps = true;
    //protected $dateFormat = 'U';
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';
    //public $attributes;

    //Get Idiomas By IdEmpresas
    public function scopeGetIdiomaByIdEmpresas($query, $id_empresas){

      Log::info("[Idiomas][scopeGetIdiomaByIdEmpresas]");

      //activar log query
      DB::connection()->enableQueryLog();

      $sql =  $query->where('id_empresas', '=', $id_empresas)->get();
        
      //return true in the other one return 1

      //log query
      $queries = DB::getQueryLog();
      $last_query = end($queries);
      Log::info($last_query);

      return $sql;

    }

    //Get All Idiomas
    public function scopeGetAllIdiomas($query){

      Log::info("[Idiomas][scopeGetIdiomaByIdEmpresas]");

      //activar log query
      DB::connection()->enableQueryLog();

      $sql =  $query->get();
        
      //return true in the other one return 1

      //log query
      $queries = DB::getQueryLog();
      $last_query = end($queries);
      Log::info($last_query);

      return $sql;

    }
}
?>
