<?php

namespace App\Library\DAO;
use Config;
use App;
use Log;
use DB;
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


    //cambio contraseña
    public function scopeCambioContrasena($query, $correo, $pass){

      Log::info("[Trabajadores][scopeCambioContrasena]");

      $pass = hash("sha256", $pass);

      return $query->where([['correo', '=', $correo],
                           ])->update(['pass' => $pass]); //return true in the other one return 1

    }

    //Modificar perfiles 
    public function scopeUpdateProfile($query, $id_trabajadores, $correo, $telefono_fijo, $celular){

      Log::info("[Trabajadores][scopeUpdateProfile]");

      return $query->where([['id_trabajadores', '=', $id_trabajadores],
                           ])->update(['correo' => $correo,
                                       'telefono_fijo' => $telefono_fijo,
                                       'celular' => $celular]); //return true in the other one return 1

    }

    //modificar contraseña en el perfil de los trabajadores
    public function scopeModPass($query, $id_trabajadores, $pass){

      Log::info("[Trabajadores][scopeModPass]");

      $pass = hash("sha256", $pass);

      return $query->where([['id_trabajadores', '=', $id_trabajadores],
                           ])->update(['pass' => $pass]); //return true in the other one return 1

    }

    //borrar trabajador by id trabajador y id empresas
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
        Log::info("[Trabajadores][scopeGetByIdEmpresas]");

        Log::info("[Trabajadores][scopeGetByIdEmpresas] id_empresas: ". $id_empresas);

        return $query->where([
          ['id_empresas', '=', $id_empresas],
        ]);
    }


    //buscar trabajadores por id_trabajadore
    public function scopeGetByIdTrabajadores($query, $id_trabajadores)
    {   
        Log::info("[Trabajadores][scopeGetByIdEmpresas]");

        Log::info("[Trabajadores][scopeGetByIdEmpresas] id_trabajadores: ". $id_trabajadores);

        return $query->where([
          ['id_trabajadores', '=', $id_trabajadores],
        ]);
    }

    //modificar plantilla
    public function scopeModTrabajador($query, $id_trabajadores, $id_empresas, $nombre, $apellido, $correo, $tel, $cel, $cargo, $numDNI, $numSS,
    $plantilla, $geoActivated, $latitud, $longitud, $address, $metros, $registroApp, $ipActivated, $ipAddress, $pcActivated, 
    $tabletasActivated, $movilesActivated/*, $pass*/)
    {
        

        Log::info("[Trabajadores][scopeModTrabajador]");

        $obj = array();
        $obj[0] = new \stdClass();
        $obj[0]->save = $query->where([['id_trabajadores', $id_trabajadores],
                                       ['id_empresas', $id_empresas]
                                      ])->update(['nombre' => $nombre,
                                                  'apellido' => $apellido,
                                                  'correo' => $correo,
                                                  'telefono_fijo' => $tel,
                                                  'celular' => $cel,
                                                  'cargo' => $cargo,
                                                  'dni_num' => $numDNI,
                                                  'seguro_social' => $numSS,
                                                  'id_plantillas' => $plantilla,
                                                  'geo_activated' => $geoActivated,
                                                  'latitud' => $latitud,
                                                  'longitud' => $longitud,
                                                  'direccion' => $address,
                                                  'metros' => $metros,
                                                  'app_geo_activated' => $registroApp,
                                                  'ip_activated' => $ipActivated,
                                                  'ip' => $ipAddress,
                                                  'pc_activated' => $pcActivated,
                                                  'tablet_activated' => $tabletasActivated,
                                                  'mobile_activated' => $movilesActivated
                                                 ]); //return true in the other one return 1
        $obj[0]->id = $id_empresas;


        return $obj;

    }

    //agrega plantilla
    public function scopeAddTrabajador($query, $id_empresas, $nombre, $apellido, $correo, $tel, $cel, $cargo, $numDNI, $numSS,
    $plantilla, $geoActivated, $latitud, $longitud, $address, $metros, $registroApp, $ipActivated, $ipAddress, $pcActivated, 
    $tabletasActivated, $movilesActivated, $pass)
    {
        

        Log::info("[Trabajadores][scopeAddTrabajador]");


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

        Log::info("[Trabajadores][scopeLookForByEmailAndPassAndIdEmpresa]");

        $pass = hash("sha256", $pass);

        Log::info("[Trabajadores][scopeLookForByEmailAndPassAndIdEmpresa] email: ". $email);

        Log::info("[Trabajadores][scopeLookForByEmailAndPassAndIdEmpresa] pass: ". $pass);

        Log::info("[Trabajadores][scopeLookForByEmailAndPassAndIdEmpresa] id_empresas: ". $id_empresas);

        return $query->where([
          ['correo', '=', $email],
          ['pass', '=', $pass],
          ['id_empresas', '=', $id_empresas],
        ]);

    }
}
?>
