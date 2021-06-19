<?php

use Illuminate\Routing\Controller;
use App\Models\User;
use App\Models\News;
use App\Models\likedNews;
use App\Models\FavouriteTeams;
use App\Models\Dati_teams;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

class TeamsController extends Controller {

    public function index() {
        $session_id = session('user_id');
        $user = User::find($session_id);
        if (!isset($user))
            return view('login');
        
        return view("teams")->with("user", $user);
    }

    public function checkFavouriteTeamsOnLoading($id_team)
    {
        $session_id = session('user_id');
        $result=FavouriteTeams::select('id_team','id_user')
                                ->where('id_team',$id_team)
                                ->where('id_user',$session_id)->get();

        $num_rows=$result->count();
        if($num_rows==0)
            return $id_team;
        
        else return array('id_team' => $id_team,'id_user' => $session_id); 
    }

    public function getDataTeams($id_team)
    {
        $result=Dati_teams::select("id_team","nome","logo","piloti")
                            ->where("id_team",$id_team)->first();

        $data=$result;
        return $data;
    }

    public function addTeamFavourite($id_team)
    {
        $session_id = session('user_id');
        DB::table('favouriteTeams')->insert(
            array('id_user' => $session_id, 'id_team' => $id_team)
        );
    }

    public function removeTeamFavourite($id_team)
    {
        $session_id = session('user_id');
        $val=FavouriteTeams::where("id_user",$session_id)
                        ->where("id_team",$id_team)->delete();
    }

}
?>