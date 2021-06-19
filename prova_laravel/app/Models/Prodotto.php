<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Prodotto extends Model {

    protected $table = 'gran_premio';

    protected $fillable = [
        'id','nome','circuito','data_gara','foto'
    ];

    public function Subordine() {
        return $this->hasMany('App\Models\Subordine');
    }
}
?>