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

    //obtener todos los registros (entradas y salidas)
    public function scopeGetAllHistorialEYS($query)
    {

        Log::info("[Registros][GetAllHistorialEYS]");
        
        return $query->select('trabajadores.*', 'registros.*')
        ->leftJoin('trabajadores', 'trabajadores.id_trabajadores', '=', 'registros.id_trabajadores')
        ->where([
        ])->orderBy('fecha', 'desc');

    }

    //obten todas las entradas
    public function scopeGetAllHistorialEntradas($query)
    {

        Log::info("[Registros][scopeGetAllEntradas]");
        
        return $query->where([
            ['tipo', '=', 'entrada'],
        ])->orderBy('id_registros', 'desc');

    }

    //obten todas las salidas
    public function scopeGetAllHistorialSalidas($query)
    {

        Log::info("[Registros][scopeGetAllHistorialSalidas]");
        
        
        return $query->where([
            ['tipo', '=', 'salida'],
        ])->orderBy('id_registros', 'desc');

    }

    //obten todas las entradas por id trabajadores
    public function scopeGetAllEntradas($query, $id_trabajadores)
    {

        Log::info("[Registros][scopeGetAllEntradas]");
        Log::info("[Registros][scopeGetAllEntradas] id_trabajadores: " . $id_trabajadores);
        
        
        return $query->where([
            ['id_trabajadores', '=', $id_trabajadores],
            ['tipo', '=', 'entrada'],
        ]);

    }
    
    //obten todas las salidas por id trabajadores
    public function scopeGetAllSalidas($query, $id_trabajadores)
    {

        Log::info("[Registros][scopeGetAllSalidas]");
        
        return $query->where([
            ['id_trabajadores', '=', $id_trabajadores],
            ['tipo', '=', 'salida'],
        ]);

    }
    
    //obten todas las entradas por id trabajadores
    public function scopeGetAllEntradasByEmpresas($query, $id_empresas)
    {

        Log::info("[Registros][scopeGetAllEntradasByEmpresas]");
        Log::info("[Registros][scopeGetAllEntradasByEmpresas] id_empresas: " . $id_empresas);
        
        

        return $query->leftJoin('trabajadores', 'trabajadores.id_trabajadores', '=', 'registros.id_trabajadores')
        ->where([
            ['id_empresas', '=', $id_empresas],
            ['tipo', '=', 'entrada'],
        ]);

    }
    
    //obten todas las salidas por id trabajadores
    public function scopeGetAllSalidasByEmpresas($query, $id_empresas)
    {

        Log::info("[Registros][scopeGetAllSalidasByEmpresas]");
        
        return $query->leftJoin('trabajadores', 'trabajadores.id_trabajadores', '=', 'registros.id_trabajadores')
        ->where([
            ['id_empresas', '=', $id_empresas],
            ['tipo', '=', 'salida'],
        ]);

    }

    //obtener último registro del día
    public function scopeGetLastRegistro($query, $id_trabajadores, $date){
        
        Log::info("[Registros][scopeGetLastRegistro]");
        Log::info("[Registros][scopeGetLastRegistro] date: " . substr($date, 0, 10));
        
        return $query->where([
            ['id_trabajadores', '=', $id_trabajadores],
            ['fecha', 'like', '%'.substr($date, 0, 10).'%']
        ])
        ->orderBy('id_registros', 'desc')
        ->limit(1);
    }

    //obten el historial desde una fecha inicio a una fecha final por id_empresas
    public function ScopeGetAllHistorialByIdEmpresas($query, $id_empresas, $start, $end)
    {

        Log::info("[Registros][ScopeGetAllHistorialByIdEmpresas]");

        Log::info("[Registros][ScopeGetAllHistorialByIdEmpresas] inicio: ". $start);

        Log::info("[Registros][ScopeGetAllHistorialByIdEmpresas] fin: " . $end);
        
        return $query->select('salidas.nombre as nombreSalida', 'salidas.*', 'trabajadores.*', 'registros.*')
        ->leftJoin('salidas', 'salidas.id_salidas', '=', 'registros.id_salidas')
        ->leftJoin('trabajadores', 'trabajadores.id_trabajadores', '=', 'registros.id_trabajadores')
        ->where([
            ['fecha', '>=', $start],
            ['fecha', '<=', $end],
        ])->orderBy('fecha', 'asc');

    }

    //obten el historial desde una fecha inicio a una fecha final por id_trabajadores
    public function scopeGetAllHistorial($query, $id_trabajadores, $start, $end)
    {

        Log::info("[Entradas][scopeGetAllHistorial]");
        
        return $query->leftJoin('salidas', 'salidas.id_salidas', '=', 'registros.id_salidas')
        ->where([
            ['id_trabajadores', '=', $id_trabajadores],
            ['fecha', '>=', $start],
            ['fecha', '<=', $end],
        ])->orderBy('fecha', 'asc');

    }

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
