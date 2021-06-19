<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ordine extends Model {

    protected $table = 'ordine';

    protected $fillable = [
        'id_ordine','id_user','qta_prodotti'
    ];

    public function Subordine() {
        return $this->hasMany('App\Models\Subordine');
    }
    public function Utente() {
        return $this->belongsTo('App\Models\User');
    }
}
?>