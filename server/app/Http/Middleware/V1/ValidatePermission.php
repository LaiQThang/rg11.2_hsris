<?php

namespace App\Http\Middleware\V1;

use Closure;
use App\Models\permission;
use Illuminate\Http\Request;
use App\Models\permission_list;
use App\Models\permission_detail;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class ValidatePermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        //Viết logic validate api
        // dd($request->p, $request->u);
        try{
            $decode = JWTAuth::getJWTProvider()->decode($request->p);
        $input = $decode['permissionId'];
        $permissionId = '';

        $db = permission_detail::all();
        foreach($db as $val){
            if(Hash::check($val->permission_id, $input)){
                $permissionId = $val->permission_id;
                break;
            }
        }

        $permisson = permission::find($permissionId);
        $permissionList = $permisson->permissionList()->wherePivot('permission_id', '=', $permissionId)->get();

        // $res = permission::with(['permissionList' => function($query) use ($permissionId) {
        //     $query->wherePivot('permission_id', '=', $permissionId);
        // }])->get();

        // $permissionInput = $request->u;
        foreach($permissionList as $val){
            if($val->tokenBase == '$2y$12$wZT/l86iOWc1SsOrBy/kcOnADLOSUwwezNaVBIsVob8vgW./1RwYK'){
                // dd($val->tokenBase);
                return $next($request);
            }
        }
        return response()->json(['Error' => 'Unauthorized'], 500);
        }catch(TokenInvalidException $e){
            if($e){
                return response()->json(['Error' => 'Token not found'], 404);
            }
        }
        
        // dd($permissionList->toArray());
    }
}
