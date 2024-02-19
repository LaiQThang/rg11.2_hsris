<?php

namespace App\Http\Middleware\V1;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Authentication
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $checkMail = $request->email;   
        // dd($checkMail);
        $validate = explode("@", $checkMail)[1];
        if($validate == 'hou.edu.vn'){
            app('App\Http\Controllers\Authentication\V1\AuthController')->middleware('auth:apiTeacher', ['except' => ['login']]);
            return $next($request);
        }else if($validate == 'students.hou.edu.vn'){
            app('App\Http\Controllers\Authentication\V1\AuthController')->middleware('auth:apiStudent', ['except' => ['login']]);
            return $next($request);
        }
        else{
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // return $next($request);
    }
}
