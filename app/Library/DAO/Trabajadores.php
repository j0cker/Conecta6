<?php

namespace App\Library\DAO;
use Config;
use App;
use Log;
use Illuminate\Database\Eloquent\Model;

/*

update and insert doesnt need get->()


*/

class Trabajadores extends Model
{
    public $table = 'trabajadores';
    public $timestamps = true;
    //protected $dateFormat = 'U';
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';
    //public $attributes;

    public function scopeDelByIdEmpresas($query, $id_trabajadores, $id_empresas){

      Log::info("[Trabajadores][scopeDelByIdEmpresas]");

      return $query->where([
          ['id_trabajadores', '=', $id_trabajadores],
          ['id_empresas', '=', $id_empresas],
        ])->delete(); //return true in the other one return 1

  }


    //buscar trabajadores por empess
    public function scopeGetByIdEmpresas($query, $id_empresas)
    {   
        Log::info("[Empresas][scopeGetByIdEmpresas]");

        Log::info("[Empresas][scopeGetByIdEmpresas] id_empresas: ". $id_empresas);

        return $query->where([
          ['id_empresas', '=', $id_empresas],
        ]);
    }

    //agrega plantilla
    public function scopeAddTrabajador($query, $id_empresas, $nombre, $apellido, $correo, $tel, $cel, $cargo, $numDNI, $numSS,
    $plantilla, $geoActivated, $latitud, $longitud, $address, $metros, $registroApp, $ipActivated, $ipAddress, $pcActivated, 
    $tabletasActivated, $movilesActivated, $pass)
    {
        

        Log::info("[plantillas][scopeAddTrabajador]");


        $trabajador = new Trabajadores;

        $trabajador->id_empresas = $id_empresas;
        $trabajador->nombre = $nombre;
        $trabajador->apellido = $apellido;
        $trabajador->correo = $correo;
        $trabajador->telefono_fijo = $tel;
        $trabajador->celular = $cel;
        $trabajador->cargo = $cargo;
        $trabajador->dni_num = $numDNI;
        $trabajador->seguro_social = $numSS;
        $trabajador->id_plantillas = $plantilla;
        $trabajador->geo_activated = $geoActivated;
        $trabajador->latitud = $latitud;
        $trabajador->longitud = $longitud;
        $trabajador->direccion = $address;
        $trabajador->metros = $metros;
        $trabajador->app_geo_activated = $registroApp;
        $trabajador->ip_activated = $ipActivated;
        $trabajador->ip = $ipAddress;
        $trabajador->pc_activated = $pcActivated;
        $trabajador->tablet_activated = $tabletasActivated;
        $trabajador->mobile_activated = $movilesActivated;

        $pass = hash("sha256", $pass);
        $trabajador->pass = $pass;

        $obj = Array();
        $obj[0] = new \stdClass();
        $obj[0]->save = $trabajador->save(); //return true in the other one return 1
        $obj[0]->id = $trabajador->id;

        return $obj;

    }

    public function scopeLookForByEmailAndPass($query, $email, $pass)
    {

        Log::info("[Trabajadores][scopeLookForByEmailAndPass]");

        $pass = hash("sha256", $pass);

        Log::info("[Trabajadores][scopeLookForByEmailAndPass] pass: ". $pass);

        return $query->where([
          ['correo', '=', $email],
          ['pass', '=', $pass],
        ]);

    }

    //login
    public function scopeLookForByEmailAndPassAndIdEmpresa($query, $email, $pass, $id_empresas)
    {

        Log::info("[Empresas][scopeLookForByEmailAndPassAndIdEmpresa]");

        $pass = hash("sha256", $pass);

        Log::info("[Empresas][scopeLookForByEmailAndPassAndIdEmpresa] email: ". $email);

        Log::info("[Empresas][scopeLookForByEmailAndPassAndIdEmpresa] pass: ". $pass);

        Log::info("[Empresas][scopeLookForByEmailAndPassAndIdEmpresa] id_empresas: ". $id_empresas);

        return $query->where([
          ['correo', '=', $email],
          ['pass', '=', $pass],
          ['id_empresas', '=', $id_empresas],
        ]);

    }
}
?>
