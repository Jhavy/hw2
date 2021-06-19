<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class News extends Model {

    protected $table = 'notizie';

    protected $fillable = [
        'id', 'titolo','descrizione','percorso_foto'
    ];


    public function likedNews() {
        return $this->hasMany('App\Models\likedNews');
    }

}


?>