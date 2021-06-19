<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pilota extends Model {

    protected $table = 'pilota';

    protected $fillable = [
        'id_pilota','nome','id_team','punti'
    ];

    public function Team() {
        return $this->belongsTo('App\Models\Dati_teams');
    }
}
?>