<?php

namespace App\Library\DAO;
use Config;
use App;
use Log;
use Illuminate\Database\Eloquent\Model;

/*

update and insert doesnt need get->()


*/

class Registros extends Model
{
    public $table = 'registros';
    public $timestamps = true;
    //protected $dateFormat = 'U';
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';
    //public $attributes;

    public function scopeAddRegistroSalida($query, $id_trabajadores, $comentarios, $date, $id_salidas)
    {

        Log::info("[Entradas][scopeAddRegistroSalida]");

        $registros = new Registros;

        $registros->id_trabajadores = $id_trabajadores;
        $registros->tipo = "salida";
        $registros->fecha = $date;
        $registros->comentarios = $comentarios;
        $registros->id_salidas = $id_salidas;

        $obj = Array();
        $obj[0] = new \stdClass();
        $obj[0]->save = $registros->save(); //return true in the other one return 1
        $obj[0]->id = $registros->id;

        return $obj;


    }

    public function scopeAddRegistroEntrada($query, $id_trabajadores, $comentarios, $date)
    {

        Log::info("[Entradas][scopeAddRegistroEntrada]");


        
        $registros = new Registros;

        $registros->id_trabajadores = $id_trabajadores;
        $registros->tipo = "entrada";
        $registros->fecha = $date;
        $registros->comentarios = $comentarios;

        $obj = Array();
        $obj[0] = new \stdClass();
        $obj[0]->save = $registros->save(); //return true in the other one return 1
        $obj[0]->id = $registros->id;

        return $obj;


    }
}
?>
