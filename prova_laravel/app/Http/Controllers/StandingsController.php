<?php

use Illuminate\Routing\Controller;
use App\Models\User;
use App\Models\FavouriteTeams;
use App\Models\Dati_teams;
use App\Models\Pilota;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class StandingsController extends Controller {

    public function index() {
        $session_id = session('user_id');
        $user = User::find($session_id);
        if (!isset($user))
            return view('login');
        
        return view("standings")->with("user", $user);
    }

    public function getTeamPreferitiArray()
    {
        $session_id = session('user_id');
        $data=FavouriteTeams::select("id_team","id_user")
                            ->where("id_user",$session_id)->get();

        $num_rows=$data->count();
        if($num_rows==0)
            return json_encode(null);
        else return json_encode($data);
    }

    public function getDataRiders()
    {
        $piloti=Pilota::select("nome","id_team","punti")->get();
        
        foreach($piloti as $pilota)
        {
            $pilotaData=$pilota->toArray();
            $id_team=$pilota->id_team;
            $nome_team=Dati_teams::select("nome")->where("id_team",$id_team)->first();
            $pilotaData['nome_team']=$nome_team->nome;
            $arr[]=$pilotaData;
        }
        return json_encode($arr);
    }
}
?>