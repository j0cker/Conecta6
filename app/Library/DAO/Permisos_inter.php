<?php

namespace App\Library\DAO;
use Config;
use App;
use Log;
use Illuminate\Database\Eloquent\Model;

/*

update and insert doesnt need get->()


*/

class Permisos_inter extends Model
{
    public $table = 'permisos_inter';
    public $timestamps = true;
    //protected $dateFormat = 'U';
    const CREATED_AT = 'created_at';
    //const UPDATED_AT = 'updated_at';
    //public $attributes;

    public function scopeAddNewEmpresa($query, $idEmpresa)
    {

        Log::info("[Permisos_inter][scopeAddNewEmpresa] idEmpresa: ". $idEmpresa);

        $permisos_inter = new Permisos_inter;
        $permisos_inter->id_empresas = $idEmpresa;
        $permisos_inter->id_permisos = 2;

        $obj = array();
        $obj[0] = new \stdClass();
        $obj[0]->save = $permisos_inter->save(); //return true in the other one return 1
        $obj[0]->id = $permisos_inter->id;

        return $obj;

    }

    public function scopeLookForByIdTrabajadores($query, $idTrabajadores)
    {

        Log::info("[Permisos_inter][scopeLookForByIdTrabajadores] idTrabajadores: ". $idTrabajadores);

        return $query->select('id_permisos')->where([
          ['id_trabajadores', '=', $idTrabajadores],
        ]);

    }

    public function scopeLookForByIdEmpresas($query, $idEmpresas)
    {

        Log::info("[Permisos_inter][scopeLookForByIdTrabajadores] idEmpresas: ". $idEmpresas);

        return $query->select('id_permisos')->where([
          ['id_empresas', '=', $idEmpresas],
        ]);

    }

    public function scopeLookForByIdAdministradores($query, $idAdministradores)
    {

        Log::info("[Permisos_inter][scopeLookForByIdAdministradores] idAdministradores: ". $idAdministradores);

        return $query->select('id_permisos')
                     ->where([
                                ['id_administradores', '=', $idAdministradores],
                            ]);

    }
}
?>
