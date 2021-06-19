<?php

use Illuminate\Routing\Controller;
use App\Models\User;
use App\Models\FavouriteTeams;
use App\Models\Dati_teams;
use App\Models\Pilota;
use App\Models\Prodotto;
use App\Models\Ordine;
use App\Models\Subordine;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class OrdersController extends Controller {

    public function index() {
        $session_id = session('user_id');
        $user = User::find($session_id);
        if (!isset($user))
            return view('login');
        
        return view("ordini")->with("user", $user);
    }

    public function getOrdini()
    {
        $session_id = session('user_id');

        $data=Ordine::select("id_ordine")->where("id_user",$session_id)
                                    ->orderBy("id_ordine","desc")->get();

        $num_rows=$data->count();
        if($num_rows==0)
            return json_encode(null);
        else
            return json_encode($data);
    }

    public function getSubOrdini($id_ordine)
    {
        $data=Subordine::select("id_ordine","nome_prodotto","qta_prodotto")
                        ->where("id_ordine",$id_ordine)->get();

        $num_rows=$data->count();
        if($num_rows==0)
            return json_encode(null);
        else
            return json_encode($data);
    }
}
?>