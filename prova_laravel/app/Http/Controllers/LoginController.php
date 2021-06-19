<?php

use Illuminate\Routing\Controller;
use App\Models\User;
use App\Models\Login_spoiler;
use App\Models\Loghi_team_ufficiali;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

class LoginController extends Controller{

    public function login()
    {
        //verifica se esiste una sessione attiva

        if(session('user_id')!=null)
        {
            return redirect("home");
        }

        else{
            return view('login')
            ->with('csrf_token', csrf_token());
        }
    }

    public function checkLogin()
    {
        //verifica i dati del login
        $user=User::where('username',request('username'))
            //->where('password',request('password'))
            ->first();

        if($user!=null)
        {
            if(Hash::check(request('password'), $user->password))
            {
                //login ok
                Session::put('user_id',$user->id);
                Session::put('username',$user->username);
                return redirect("home");
            }
            else{
                //user esiste ma pw sbagliata
                return redirect("login")->withInput();
            }
        }
        
        else
        {
            //credenziali non valide
            return redirect("login")->withInput();
        }
    }


    public function logout()
    {
        Session::flush();
        return redirect("login");
    }


    public function getData()
    {
        $data=Login_spoiler::select('id','titolo','paragrafo')->get();
        return $data;
    }

    public function getLoghi()
    {
        $data=Loghi_team_ufficiali::select('id','logo')->get();
        return $data;
    }
}
?>