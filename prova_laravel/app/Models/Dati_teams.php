<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Dati_teams extends Model {

    protected $table = 'dati_teams';

    protected $fillable = [
        'id_team','nome','logo','piloti'
    ];

    public function Piloti() {
        return $this->hasMany('App\Models\Pilota');
    }
}
?>