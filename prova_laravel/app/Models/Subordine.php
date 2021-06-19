<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subordine extends Model {

    protected $table = 'subordine';

    protected $fillable = [
        'id_ordine','id_prodotto','nome_prodotto','qta_prodotto'
    ];

    public function Ordine() {
        return $this->belongsTo('App\Models\Ordine');
    }
    public function Utente() {
        return $this->belongsTo('App\Models\Prodotto');
    }
}
?>