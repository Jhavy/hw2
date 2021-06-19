<?php

use Illuminate\Routing\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Http\Request;


class RegisterController extends Controller{

    public function index()
    {
        return view("signup");
    }

    public function checkUsername($query) {
        $exist = User::where('username', $query)->exists();
        return ['exists' => $exist];
    }

    public function create()
    {
        $request=request(); //legge tutti i dati trasmessi dal form


        if($this->countErrors($request) === 0) {
            $newUser =  User::create([
            'username' => $request['username'],
            //'password' => $request['password']
            'password' => Hash::make($request->password)
            ]);
            if ($newUser) {
                Session::put('user_id', $newUser->id);
                return redirect('home');
            } 
            else {
                return redirect('signup')->withInput();
            }
        }
        else 
            return redirect('signup')->withInput();
            //return redirect('home');
            
    }


    private function countErrors($data)
    {

        $error = array();
        # USERNAME
        if(!preg_match('/^[a-zA-Z0-9_]{4,15}$/', $data['username'])) {
            $error[] = "Username non valido";
        } else {
            $username = User::where('username', $data['username'])->first();
            if ($username !== null) {
                $error[] = "Username già utilizzato";
            }
        }
        # PASSWORD
        if (strlen($data["password"]) < 6) {
            $error[] = "Caratteri password insufficienti";
        } 
        # CONFERMA PASSWORD
        if (strcmp($data["password"], $data["password_confirm"]) != 0) {
            $error[] = "Le password non coincidono";
        }

        return count($error);
    }

}
?>