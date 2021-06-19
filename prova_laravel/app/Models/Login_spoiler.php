<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Login_spoiler extends Model {

    protected $table = 'login_spoiler';

    protected $fillable = [
        'id', 'titolo','paragrafo'
    ];

}


?>