<?php

namespace App\Http\Controllers\Authentication\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:apiTeacher', ['except' => ['login']]);
    }

    public function login()
    {
        // // dd($request);

        $credentials = request(['maGV', 'password']);
        // dd(request(['email', 'password']));
        // $tokenDetails = auth('apiTeacher');
        // dd(auth('apiTeacher'));

        // dd(auth('apiTeacher')->attempt($credentials));

        if (! $token = auth('apiTeacher')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function profile()
    {
        return response()->json(auth('apiTeacher')->user());
    }

    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('apiTeacher')->factory()->getTTL() * 60
        ]);
    }
}
