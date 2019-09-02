<?php

namespace App\Library\DAO;
use Config;
use App;
use Log;
use Illuminate\Database\Eloquent\Model;

/*

update and insert doesnt need get->()


*/

class Entradas extends Model
{
    public $table = 'entradas';
    public $timestamps = true;
    //protected $dateFormat = 'U';
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';
    //public $attributes;


    public function scopeAddRegistroEntrada($query, $id_trabajadores, $comentarios, $date)
    {

        Log::info("[Entradas][scopeAddRegistroEntrada]");


        
        $entradas = new Entradas;

        $entradas->id_trabajadores = $id_trabajadores;
        $entradas->tipo = "entrada";
        $entradas->fecha = $date;
        $entradas->comentarios = $comentarios;

        $obj = Array();
        $obj[0] = new \stdClass();
        $obj[0]->save = $entradas->save(); //return true in the other one return 1
        $obj[0]->id = $entradas->id;

        return $obj;


    }
}
?>
