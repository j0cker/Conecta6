<?php

namespace App\Library\DAO;
use Config;
use App;
use Log;
use Illuminate\Database\Eloquent\Model;

/*

update and insert doesnt need get->()


*/

class Empresas extends Model
{
    public $table = 'empresas';
    public $timestamps = true;
    //protected $dateFormat = 'U';
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';
    //public $attributes;

    //cambio contraseña
    public function scopeCambioContrasena($query, $correo, $pass){

      Log::info("[Empresas][scopeCambioContrasena]");

      $pass = hash("sha256", $pass);

      return $query->where([['correo', '=', $correo],
                           ])->update(['pass' => $pass]); //return true in the other one return 1

    }

    //get timezone
    public function scopeGetTimeZone($query, $id_empresas){

      Log::info("[Empresas][scopeGetTimeZone] id_empresas: ". $id_empresas);

      return $query->join('zonas_horarias', 'empresas.id_zona_horaria', '=', 'zonas_horarias.id_zonas_horarias')
                    ->select('zonas_horarias.utc','zonas_horarias.id_zonas_horarias','zonas_horarias.nombre')
                    ->where('empresas.id_empresas', '=' , $id_empresas);


    }

    public function scopeUpdateActive($query, $id_empresas, $active){

      Log::info("[Empresas][scopeUpdateActive]");

      return $query->where([['id_empresas', '=', $id_empresas],
                           ])->update(['activo' => $active]); //return true in the other one return 1

    }

    public function scopeGetSalidasByIdEmpresas($query, $id_empresas){

      Log::info("[Empresas][scopeGetSalidasByIdEmpresas]");

      return $query->where([
        ['id_empresas', '=', $id_empresas],
      ]);

    }

    //modificar contraseña en el perfil de la empresa
    public function scopeModPass($query, $id_empresas, $pass){

      Log::info("[Empresas][scopeModPass]");

      $pass = hash("sha256", $pass);

      return $query->where([['id_empresas', '=', $id_empresas],
                           ])->update(['pass' => $pass]); //return true in the other one return 1

    }

    //modificar zona horaria en el perfil de la empresa
    public function scopeModZonaHoraria($query, $id_empresas, $id_zona_horaria){

      Log::info("[Empresas][scopeDelByIdEmpresas]");

      return $query->where([['id_empresas', '=', $id_empresas],
                           ])->update(['id_zona_horaria' => $id_zona_horaria]); //return true in the other one return 1

    }

    public function scopeDelByIdEmpresas($query, $id_empresas){

      Log::info("[Empresas][scopeDelByIdEmpresas]");

      return $query->where([
          ['id_empresas', '=', $id_empresas],
        ])->delete(); //return true in the other one return 1

  }

    //agrega nueva empresa
    public function scopeAddNewEnterprise($query, $nombreEmpresa, $nombreSolicitante, $correoElectronico, $telefonoFijo, $celular, $datepicker, $empleadosPermitidos, $activa, $dominio, $subdominio, $contrasena, $color)
    {

        Log::info("[Empresas][scopeAddNewEnterprise]");

        $empresas = new Empresas;
        $empresas->nombre_empresa = $nombreEmpresa;
        $empresas->nombre_solicitante = $nombreSolicitante;
        $empresas->correo = $correoElectronico;
        $empresas->telefono_fijo = $telefonoFijo;
        $empresas->celular = $celular;
        $empresas->vigencia = $datepicker;
        $empresas->empleados_permitidos = $empleadosPermitidos;
        $empresas->activo = $activa;
        $empresas->dominio = $dominio;
        $empresas->subdominio = $subdominio;
        $empresas->pass = hash("sha256", $contrasena);
        $empresas->color = $color;

        $obj = array();
        $obj[0] = new \stdClass();
        $obj[0]->save = $empresas->save(); //return true in the other one return 1
        $obj[0]->id = $empresas->id;
        
        return $obj;

    }

    

    //get enterprise
    public function scopeGetByIdEmpresas($query, $id_empresas){

      Log::info("[Empresas][scopeGetByIdEmpresas] id_empresas: ". $id_empresas);

      return $query->where([
        ['id_empresas', '=', $id_empresas],
      ]);


    }

    //get enterprise image
    public function scopeGetImage($query, $id_empresas){

      Log::info("[Empresas][scopegGetImage] id_empresas: ". $id_empresas);

      return $query->where([
        ['id_empresas', '=', $id_empresas],
      ]);


    }

    //post update enterprise image
    public function scopeUpdateImage($query, $id_empresas, $profileImg){

      Log::info("[Empresas][scopeUpdateImage] id_empresas: ". $id_empresas);

      $obj = array();
      $obj[0] = new \stdClass();
      $obj[0]->save = $query->where('id_empresas', $id_empresas)->update(['foto_base64' => $profileImg]); //return true in the other one return 1
      $obj[0]->id = $id_empresas;
      
      return $obj;


    }

    //post update enterprise profile
    public function scopeUpdateProfile($query, $id_empresas, $nombre_empresa, $correo, $telefono_fijo, $celular){

      Log::info("[Empresas][scopeUpdateImage]");

      $obj = array();
      $obj[0] = new \stdClass();
      $obj[0]->save = $query->where('id_empresas', $id_empresas)
                            ->update(['nombre_empresa' => $nombre_empresa,
                                      'correo' => $correo,
                                      'telefono_fijo' => $telefono_fijo,
                                      'celular' => $celular
                                      ]); //return true in the other one return 1
      $obj[0]->id = $id_empresas;
      
      return $obj;


    }

    //login
    public function scopeLookForByEmailAndPass($query, $email, $pass)
    {

        Log::info("[Empresas][scopeLookForByEmailAndPass]");

        $pass = hash("sha256", $pass);

        Log::info("[Empresas][scopeLookForByEmailAndPass] email: ". $email);

        Log::info("[Empresas][scopeLookForByEmailAndPass] pass: ". $pass);

        return $query->where([
          ['correo', '=', $email],
          ['pass', '=', $pass],
          ['activo', '=', 1],
        ]);

    }
    
    //busca si existe subdominio
    public function scopeLookForBySubdominio($query, $subdominio)
    {

        Log::info("[Empresas][scopeLookForBySubdominio]");

        Log::info("[Empresas][scopeLookForBySubdominio] subdominio: ". $subdominio);

        return $query->where([
          ['subdominio', '=', $subdominio],
        ]);

    }
}
?>
