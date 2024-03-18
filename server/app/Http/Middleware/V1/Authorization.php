<?php

namespace App\Http\Middleware\V1;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class Authorization
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // dd($request->bearerToken());

        // $token = JWTAuth::parseToken();
        // $payload = $token->payload();
        // dd($payload);


        // $token = $request->bearerToken();
        // if(!$request->bearerToken()){
        //     return response()->json(['error' => 'Unauthorized'], 401);
        // }
        try{
            // $user2 = $request->bearerToken();
            // $decode = JWTAuth::getJWTProvider()->decode($user2);
            // dd($decode);
            $user = JWTAuth::parseToken()->getPayload();
            if($user){
                return $next($request);
            }
        }
        catch(TokenExpiredException $e){
            if($e){
                return response()->json(['error' => 'Token has expired'], 401);
            }
        }
        catch(TokenInvalidException $e){
            if($e){
                return response()->json(['error' => 'Token error'], 401);
            }
        }

        
    }
}
