<?php

namespace App\Http\Middleware\V1;

use App\Models\giangvien;
use App\Models\permission;
use App\Models\sinhvien;
use Closure;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Authentication
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        try{
            $teacher = auth('apiTeacher')->user();
            $student = auth('apiStudent')->user();
            if($teacher === null && $student === null)
            {
                return response()->json(['error' => 'Login is continued'], 401);
            }

            if(isset($teacher))
            {
                $person =  giangvien::find($teacher->idGV);
            }
            else
            {
                $person =  sinhvien::find($student->idSV);

            }
            $permission = $person->permissionId()->with('permissionList')->first();
            $listPermission = [];
            if(isset($permission))
            {
                $permission = $permission->toArray();
                $listPermission = $permission['permission_list'];
            }
            foreach($listPermission as $permission)
            {
                if($permission['tokenBase'] == $roles[0])
                {
                    return $next($request);
                }
            }

            return response()->json(['Message' => 'Unauthorized'], 402);
        }catch(Exception $e){
            return response()->json(['error' => $e->getMessage()], 404);
        }
    }
}
