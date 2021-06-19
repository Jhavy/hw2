<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FavouriteTeams extends Model {

    protected $table = 'favouriteTeams';

    protected $fillable = [
        'id_user', 'id_team'
    ];


    public function User() {
        return $this->belongsTo('App\Models\likedNews');
    }

}


?>