<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class likedNews extends Model {

    protected $table = 'likes';

    protected $fillable = [
        'id_user', 'id_notizia'
    ];


    public function user() {
        return $this->belongsTo("App\Models\User");
    }

    public function news() {
        return $this->belongsTo('App\Models\News');
    }

}


?>