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

    //eliminar idioma
    public function scopeEliminarIdioma($query, $id){

      Log::info("[Idiomas][scopeAddIdioma]");

      //activar log query
      DB::connection()->enableQueryLog();

      $sql = $query->where([
        ['id_idiomas', '=', $id]
      ])->delete(); //return true in the other one return 1

      //log query
      $queries = DB::getQueryLog();
      $last_query = end($queries);
      Log::info($last_query);

      return $sql;

    }

    //Modificar Idioma
    public function scopeModificarIdioma($query, $id, $nombreIdioma, $contenido){

      Log::info("[Idiomas][ModificarIdioma]");

      return $query->where([['id_idiomas', '=', $id],
                           ])->update(
                             ['nombre' => $nombreIdioma]
                           ); //return true in the other one return 1

    }

    //Agregar un Idioma
    public function scopeAddIdioma($query, $codigo, $nombre){

      Log::info("[Idiomas][scopeAddIdioma]");

      //activar log query
      DB::connection()->enableQueryLog();

      $idiomas = new Idiomas;
      $idiomas->nombre = $nombre;
      $idiomas->code = $codigo;

      $obj = array();
      $obj[0] = new \stdClass();
      $obj[0]->save = $idiomas->save(); //return true in the other one return 1
      $obj[0]->id = $idiomas->id;
      
      //return true in the other one return 1

      //log query
      $queries = DB::getQueryLog();
      $last_query = end($queries);
      Log::info($last_query);

      return $obj;

    }

    //Find idioma by id
    public function scopeGetIdiomasById($query, $id){

      Log::info("[Idiomas][scopeGetIdiomasById]");

      //activar log query
      DB::connection()->enableQueryLog();

      $sql =  $query->where([['id_idiomas', '=', $id]
                            ])->get();
        
      //return true in the other one return 1

      //log query
      $queries = DB::getQueryLog();
      $last_query = end($queries);
      Log::info($last_query);

      return $sql;

    }

    //Find idioma by code
    public function scopeGetIdiomaByCode($query, $code){

      Log::info("[Idiomas][scopeGetIdiomaByCode]");

      //activar log query
      DB::connection()->enableQueryLog();

      $sql =  $query->where([['code', '=', $code]
                            ])->get();
        
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
