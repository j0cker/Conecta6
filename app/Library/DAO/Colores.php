<?php

namespace App\Library\DAO;
use Config;
use App;
use Log;
use Illuminate\Database\Eloquent\Model;

/*

update and insert doesnt need get->()


*/

class Colores extends Model
{
    public $table = 'colores';
    //public $timestamps = true;
    //protected $dateFormat = 'U';
    //const CREATED_AT = 'created_at';
    //const UPDATED_AT = 'updated_at';
    //public $attributes;


    public function scopeLookForById($query, $id)
    {

        Log::info("[Colores][scopeLookForById]");

        return $query->where([
          ['id', '=', $id]
        ]);

    }
}
?>
