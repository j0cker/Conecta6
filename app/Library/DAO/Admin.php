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
