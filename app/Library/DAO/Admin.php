<?php

namespace App\Library\DAO;
use Config;
use App;
use Log;
use Illuminate\Database\Eloquent\Model;

/*

update and insert doesnt need get->()


*/

class Admin extends Model
{
    public $table = 'administradores';
    public $timestamps = true;
    //protected $dateFormat = 'U';
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';
    //public $attributes;

    //cambio contraseña
    public function scopeCambioContrasena($query, $correo, $pass){

      Log::info("[Admin][scopeCambioContrasena]");

      $pass = hash("sha256", $pass);

      return $query->where([['correo', '=', $correo],
                           ])->update(['pass' => $pass]); //return true in the other one return 1

    }

    //delete admin
    public function scopeDeleteAdmin($query, $id_administradores){

      Log::info("[Admin][scopeDeleteAdmin]");

      return $query->where([
          ['id_administradores', '=', $id_administradores],
        ])->delete(); //return true in the other one return 1

    }

    //modificar zona horaria en el perfil de la empresa
    public function scopeModZonaHoraria($query, $id_administradores, $id_zona_horaria){

      Log::info("[Admin][scopeModZonaHoraria]");

      return $query->where([['id_administradores', '=', $id_administradores],
                           ])->update(['id_zona_horaria' => $id_zona_horaria]); //return true in the other one return 1

    }
  
    //Modificar Perfile
    public function scopeModAdmin($query, $id_administradores, $nombre, $apellido, $correoElectronico, $telefonoFijo, $celular){

      Log::info("[Admin][scopeModAdmin]");

      return $query->where([['id_administradores', '=', $id_administradores],
                           ])->update(['nombre' => $nombre,
                                       'apellido' => $apellido,
                                       'correo' => $correoElectronico,
                                       'telefono_fijo' => $telefonoFijo,
                                       'celular' => $celular]); //return true in the other one return 1

    }

    //get timezone
    public function scopeGetTimeZone($query, $id_administradores){

      Log::info("[Empresas][scopeGetTimeZone] id_administradores: ". $id_administradores);

      return $query->join('zonas_horarias', 'administradores.id_zona_horaria', '=', 'zonas_horarias.id_zonas_horarias')
                    ->select('zonas_horarias.utc','zonas_horarias.id_zonas_horarias','zonas_horarias.nombre')
                    ->where('administradores.id_administradores', '=' , $id_administradores);


    }

    //alta admin
    public function scopeAltaAdmin($query, $nombre, $apellido, $correoElectronico, $telefonoFijo, $celular, $contrasena){


      Log::info("[Admin][altaAdmin]");

      $admin = new Admin;
      $admin->nombre = $nombre;
      $admin->apellido = $apellido;
      $admin->correo = $correoElectronico;
      $admin->telefono_fijo = $telefonoFijo;
      $admin->cargo = "Administrador";
      $admin->celular = $celular;
      $admin->pass = hash("sha256", $contrasena);

      $obj = array();
      $obj[0] = new \stdClass();
      $obj[0]->save = $admin->save(); //return true in the other one return 1
      $obj[0]->id = $admin->id;
      
      return $obj;

    }

    //Modificar Perfile
    public function scopeUpdateProfile($query, $id_administradores, $correo, $telefono_fijo, $celular){

      Log::info("[Admin][scopeUpdateProfile]");

      return $query->where([['id_administradores', '=', $id_administradores],
                           ])->update(['correo' => $correo,
                                       'telefono_fijo' => $telefono_fijo,
                                       'celular' => $celular]); //return true in the other one return 1

    }

    public function scopeLookByIdAdmin($query, $id_administradores){

      Log::info("[Admin][scopeLookByIdAdmin]");

      return $query->where([
        ['id_administradores', '=', $id_administradores],
      ]);

    }

    //modificar contraseña en el perfil de los administradores
    public function scopeModPass($query, $id_administradores, $pass){

      Log::info("[Admin][scopeModPass]");

      $pass = hash("sha256", $pass);

      return $query->where([['id_administradores', '=', $id_administradores],
                           ])->update(['pass' => $pass]); //return true in the other one return 1

    }


    public function scopeLookForByEmailAndPass($query, $email, $pass)
    {

        Log::info("[Admin][scopeLookForByEmailAndPass]");

        $pass = hash("sha256", $pass);

        Log::info("[Admin][scopeLookForByEmailAndPass] pass: ". $pass);

        return $query->where([
          ['correo', '=', $email],
          ['pass', '=', $pass],
        ]);

    }
}
?>
