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


    public function scopeLookForByEmailAndPass($query, $email, $pass)
    {

        Log::info("[Clientes][scopeLookForByEmailAndPass]");

        $pass = hash("sha256", $pass);

        Log::info("[Clientes][scopeLookForByEmailAndPass] pass: ". $pass);

        return $query->where([
          ['correo', '=', $email],
          ['pass', '=', $pass],
        ]);

    }
}
?>
