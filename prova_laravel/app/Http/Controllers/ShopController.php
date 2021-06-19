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

class ShopController extends Controller {

    public function index() {
        $session_id = session('user_id');
        $user = User::find($session_id);
        if (!isset($user))
            return view('login');
        
        return view("shop")->with("user", $user);
    }

    public function acquista()
    {
        $session_id = session('user_id');
        $user = User::find($session_id);

        $request=request();
        $array_id = $request['id_prodotto'];
        $array_nome = $request['nome_prodotto'];
        $array_qta = $request['qta_prodotto'];

        $qta_tot=0;
        foreach($array_qta as $qta_articolo)
        {
            $qta_tot=$qta_tot + ((int) $qta_articolo);
        }

        //Inserire dati nella tabella ORDINE: id=codice dell'insert, id_user prende la var di sessione, e qta_acquistati dipende 
        //dalla lunghezza degli array arrivati in POST

        $result=Ordine::select()->get();
        $id_ordine=$result->count();

        Ordine::insert(
            array('id_ordine' => $id_ordine, 'id_user' => $session_id,'qta_prodotti' => $qta_tot)
        );

        //Adesso inseriamo i dati nella tabella subOrdine
            
        $i=0;
        foreach($array_id as $articolo)
        {
            
            $id_articolo=(int)$array_id[$i];
            $nome_articolo=$array_nome[$i];
            //$nome_articolo=mysqli_real_escape_string($conn, $nome_articolo);
            $qta_articolo=(int)$array_qta[$i]; 
            
            Subordine::insert(
                array('id_ordine' => $id_ordine, 'id_prodotto' => $id_articolo,'nome_prodotto' => $nome_articolo,
                'qta_prodotto' => $qta_articolo)
            );   
            $i++;
        } 

        return redirect()->route("ordini")->with("user", $user);
    }

    public function getGPdati()
    {
        $data=Prodotto::select()->get();
        return json_encode($data);       
    }
}
?>