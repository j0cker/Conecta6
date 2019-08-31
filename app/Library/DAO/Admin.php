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

    //delete admin
    public function scopeDeleteAdmin($query, $id_administradores){

      Log::info("[Empresas][scopeDeleteAdmin]");

      return $query->where([
          ['id_administradores', '=', $id_administradores],
        ])->delete(); //return true in the other one return 1

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

      Log::info("[Trabajadores][scopeUpdateProfile]");

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
