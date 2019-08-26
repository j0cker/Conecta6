<?php

namespace App\Library\DAO;
use Config;
use App;
use Log;
use Illuminate\Database\Eloquent\Model;

/*

update and insert doesnt need get->()


*/

class Salidas extends Model
{
    public $table = 'salidas';
    public $timestamps = true;
    //protected $dateFormat = 'U';
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';
    //public $attributes;

    //borrar salidas by id salidas y id empresas
    public function scopeDelByIdEmpresas($query, $id_empresas, $id_salidas){

        Log::info("[Salidas][scopeDelByIdEmpresas]");

        return $query->where([
            ['id_salidas', '=', $id_salidas],
            ['id_empresas', '=', $id_empresas]
        ])->delete(); //return true in the other one return 1

    }
  
    //mod by id salidas y id empresas
    public function scopeModSalidas($query, $id_empresas, $id_salidas, $nombre, $computable){

        Log::info("[Salidas][scopeModSalidas]");

        
        $obj = array();
        $obj[0] = new \stdClass();
        $obj[0]->save = $query->where([['id_salidas', $id_salidas],
                                        ['id_empresas', $id_empresas]
                                        ])->update(['nombre' => $nombre,
                                                    'computable' => $computable
                                                    ]); //return true in the other one return 1
        $obj[0]->id = $id_salidas;

        return $obj;

    }

    
    //borrar salidas by id salidas y id empresas
    public function scopeGetSalidaByIdSalidaAndByIdEmpresa($query, $id_salidas, $id_empresas){

        Log::info("[Salidas][scopeGetSalidaByIdSalidaAndByIdEmpresa]");
  
        return $query->where([
          ['id_salidas', '=', $id_salidas],
          ['id_empresas', '=', $id_empresas],
        ]);
  
      }

    //obtener todas las salidas por id empresas
    public function scopeGetSalidasByIdEmpresas($query, $id_empresas){

      Log::info("[Salidas][scopeGetSalidasByIdEmpresas]");

      return $query->where([
        ['id_empresas', '=', $id_empresas],
      ]);

    }

    //agregar salida
    public function scopeAddSalidas($query, $id_empresas, $nombre, $computable){

        Log::info("[Salidas][scopeAddSalidas]");
  
        $salidas = new Salidas;
        $salidas->id_empresas = $id_empresas;
        $salidas->nombre = $nombre;
        $salidas->computable = $computable;

        $obj = array();
        $obj[0] = new \stdClass();
        $obj[0]->save = $salidas->save(); //return true in the other one return 1
        $obj[0]->id = $salidas->id;
        
        return $obj;
  
      }
}
?>
