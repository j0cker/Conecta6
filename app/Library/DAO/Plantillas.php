<?php

namespace App\Library\DAO;
use Config;
use App;
use Log;
use Illuminate\Database\Eloquent\Model;

/*

update and insert doesnt need get->()


*/

class Plantillas extends Model
{
    public $table = 'plantillas';
    public $timestamps = true;
    //protected $dateFormat = 'U';
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';
    //public $attributes;


    //obtiene plantilla por id_plantilla
    public function scopeGetByIdPlantillas($query, $id_plantillas)
    {   
        Log::info("[Plantillas][scopeGetByIdPlantillas]");

        Log::info("[Plantillas][scopeGetByIdPlantillas] id_plantillas: ". $id_plantillas);

        return $query->where([
          ['id_plantillas', '=', $id_plantillas],
        ]);
    }

    //delPlantillaByIdPlantilla
    public function scopeDelPlantillaByIdPlantilla($query, $id_plantillas){

      Log::info("[Plantillas][delPlantillaByIdPlantilla]");

      return $query->where([
          ['id_plantillas', '=', $id_plantillas]
      ])->delete(); //return true in the other one return 1

      
    }

    //obtiene plantilla por empresa
    public function scopeGetByIdEmpresas($query, $id_empresas)
    {   
        Log::info("[Plantillas][scopeGetByIdEmpresas]");

        Log::info("[Plantillas][scopeGetByIdEmpresas] id_empresas: ". $id_empresas);

        return $query->where([
          ['id_empresas', '=', $id_empresas],
        ]);
    }

    //agrega plantilla
    public function scopeAddPlantilla($query, $nombrePlantilla, $id_empresas, 
    $lunesActivated, $de1Lunes, $a1Lunes, $de2Lunes, $a2Lunes, 
    $martesActivated, $de1Martes, $a1Martes, $de2Martes, $a2Martes, 
    $miercolesActivated, $de1Miercoles, $a1Miercoles, $de2Miercoles, $a2Miercoles, 
    $juevesActivated, $de1Jueves, $a1Jueves, $de2Jueves, $a2Jueves, 
    $viernesActivated, $de1Viernes, $a1Viernes, $de2Viernes, $a2Viernes, 
    $sabadoActivated, $de1Sabado, $a1Sabado, $de2Sabado, $a2Sabado, 
    $domingoActivated, $de1Domingo, $a1Domingo, $de2Domingo, $a2Domingo)
    {
        

        Log::info("[plantillas][scopeAddPlantilla]");


        $plantillas = new Plantillas;

        $plantillas->nombrePlantilla = $nombrePlantilla;

        $plantillas->id_empresas = $id_empresas;

        $plantillas->lunesActivated = $lunesActivated;
        $plantillas->de1Lunes = $de1Lunes;
        $plantillas->a1Lunes = $a1Lunes;
        $plantillas->de2Lunes = $de2Lunes;
        $plantillas->a2Lunes = $a2Lunes;

        $plantillas->martesActivated = $martesActivated;
        $plantillas->de1Martes = $de1Martes;
        $plantillas->a1Martes = $a1Martes;
        $plantillas->de2Martes = $de2Martes;
        $plantillas->a2Martes = $a2Martes;

        $plantillas->miercolesActivated = $miercolesActivated;
        $plantillas->de1Miercoles = $de1Miercoles;
        $plantillas->a1Miercoles = $a1Miercoles;
        $plantillas->de2Miercoles = $de2Miercoles;
        $plantillas->a2Miercoles = $a2Miercoles;

        $plantillas->juevesActivated = $juevesActivated;
        $plantillas->de1Jueves = $de1Jueves;
        $plantillas->a1Jueves = $a1Jueves;
        $plantillas->de2Jueves = $de2Jueves;
        $plantillas->a2Jueves = $a2Jueves;

        $plantillas->viernesActivated = $viernesActivated;
        $plantillas->de1Viernes = $de1Viernes;
        $plantillas->a1Viernes = $a1Viernes;
        $plantillas->de2Viernes = $de2Viernes;
        $plantillas->a2Viernes = $a2Viernes;

        $plantillas->sabadoActivated = $sabadoActivated;
        $plantillas->de1Sabado = $de1Sabado;
        $plantillas->a1Sabado = $a1Sabado;
        $plantillas->de2Sabado = $de2Sabado;
        $plantillas->a2Sabado = $a2Sabado;

        $plantillas->domingoActivated = $domingoActivated;
        $plantillas->de1Domingo = $de1Domingo;
        $plantillas->a1Domingo = $a1Domingo;
        $plantillas->de2Domingo = $de2Domingo;
        $plantillas->a2Domingo = $a2Domingo;

        $obj = Array();
        $obj[0] = new \stdClass();
        $obj[0]->save = $plantillas->save(); //return true in the other one return 1
        $obj[0]->id = $plantillas->id;

        return $obj;

    }

}