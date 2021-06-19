<?php

use Illuminate\Routing\Controller;
use App\Models\User;
use App\Models\News;
use App\Models\likedNews;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

class HomeController extends Controller {

    public function index() {
        $session_id = session('user_id');
        $user = User::find($session_id);
        if (!isset($user))
            return view('login');
        
        return view("home")->with("user", $user);
    }

    public function getNews($id)
    {
        $data=News::where('id',$id)->first();
        return $data;
    }

    public function checkLike($id_notizia)
    {
        $session_id = session('user_id');
        $result=likedNews::select('id_notizia','id_user')
                        ->where("id_notizia",$id_notizia)
                        ->where("id_user",$session_id)->get();
        
        $num_rows=$result->count();
                        
        if($num_rows>0)
            {
                $data=array("id_notizia"=>$id_notizia, "id_user"=>$session_id);
                return $data;
            }
        else return $id_notizia;
    }

    public function addLike($id_notizia){
        $session_id = session('user_id');
        $newRow=DB::insert("INSERT INTO likes(id_user,id_notizia) values (?,?)",[$session_id,$id_notizia]);
 
    }

    public function removeLike($id_notizia){
        $session_id = session('user_id');
        $row=likedNews::where("id_user",$session_id)
                        ->where("id_notizia",$id_notizia)->delete();
    }

    public function loadLikes($id_notizia){
        $session_id = session('user_id');
        
        $result=likedNews::select('id_notizia')
                            ->where('id_notizia',$id_notizia)->get();
        $num_rows=$result->count();

        $data = array("id_notizia"=>$id_notizia, "conto"=>$num_rows);
        return $data;
    }
}
?>