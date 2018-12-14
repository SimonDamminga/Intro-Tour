<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    public $successStatus = 200;
    /**
     * login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login(){
        $data = request()->all();

        if(Auth::attempt(['email' => $data["email"], 'password' => $data["password"]])){
            $user = Auth::user();
            $success['token'] =  $user->createToken('auth')-> accessToken;
            return response()->json(['success' => $success], $this-> successStatus);
        }
        else{
            return response()->json(['error'=>'Unauthorised', 'data'=>$data], 401);
        }
    }

    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
    public function register()
    {
        $request = request()->all();

        $validator = Validator::make($request, [
            'username' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'cPassword' => 'required|same:password',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }
        $input = $request;
        $input['password'] = bcrypt($input['password']);
        $input['name'] = $input['username'];
        $user = User::create($input);
        $success['token'] =  $user->createToken('auth')-> accessToken;
        $success['name'] =  $user->name;

        return response()->json(['success'=>$success], $this-> successStatus);
    }
    /**
     * details api
     *
     * @return \Illuminate\Http\Response
     */
    public function details()
    {
        $user = Auth::user();
        return response()->json(['success' => $user], $this-> successStatus);
    }
}
