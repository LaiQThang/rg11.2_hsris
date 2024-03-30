<?php

namespace App\Http\Controllers\Authentication\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\UpdateProfileRequest;
use App\Http\Resources\V1\GiangVienClientResource;
use App\Http\Resources\V1\SinhVienResource;
use App\Models\Api\V1\AccountModel;
use App\Models\giangvien;
use App\Models\sinhvien;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{

    private $model;
    public function __construct(Request $request)
    {
        // $this->middleware('authClassify');

        // dd($request);
        $this->model = new AccountModel();
        $check = $this->validatePerson($request);
        if($check == 'hou.edu.vn'){
            $this->middleware('auth:apiTeacher', ['except' => ['login']]);
        }else if($check == 'students.hou.edu.vn'){
            $this->middleware('auth:apiStudent', ['except' => ['login']]);
        }
        else{
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    public function login()
    {
        // // dd($request);

        $credentials = request(['email', 'password']);
        // dd(request(['email', 'password']));
        // $tokenDetails = auth('apiTeacher');
        // dd(auth('apiTeacher'));

        // dd(auth('apiTeacher')->attempt($credentials));
        // dd(auth('apiStudent')->attempt($credentials));
        $tokenTeacher = auth('apiTeacher')->attempt($credentials);
        $tokenStudent = auth('apiStudent')->attempt($credentials);

        if ( $tokenTeacher == false  && $tokenStudent == false ) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        if($tokenTeacher == false){
           
            $permission = $this->tokenPermission(auth('apiStudent')->user()->permissionId);
            
            return $this->respondWithToken($tokenStudent, $permission);
        }
        else{

            $permission = $this->tokenPermission(auth('apiTeacher')->user()->permissionId);

            return $this->respondWithToken($tokenTeacher, $permission);
        }

    }
 
    private function tokenPermission($permissionId){
        $data = [
            'permissionId' => Hash::make($permissionId),
            'exp' => time() + config('jwt.ttl')
        ];
        $permission = JWTAuth::getJWTProvider()->encode($data);
        return $permission;
    }

    public function profile()
    {
        $check = $this->validatePerson(request());
        if($check == 'hou.edu.vn'){
            return response()->json(new GiangVienClientResource(auth('apiTeacher')->user()));
        }else if($check == 'students.hou.edu.vn'){
            // dd(new SinhVienResource(auth('apiStudent')->user()));
            // dd(123);
            return response()->json(new SinhVienResource(auth('apiStudent')->user()));
        }
        else{
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    public function updateProfile(UpdateProfileRequest $request)
    {
        // dd(123);
        $check = $this->validatePerson($request);
        if($check == 'hou.edu.vn'){
            try{
                if($this->model->updateInfoStudent($request))
                {
                    return response()->json(['Message' => 'Success'], 200);
                }
                return response()->json(['Message' => 'Error'], 404);
            }
            catch(QueryException $e){
                return response()->json(['Message' => 'Error'], 404);
            }
        }else if($check == 'students.hou.edu.vn'){
            try{
                if($this->model->updateInfoStudent($request))
                {
                    return response()->json(['Message' => 'Success'], 200);
                }
                return response()->json(['Message' => 'Error'], 404);
            }
            catch(QueryException $e){
                return response()->json(['Message' => 'Error'], 404);
            }
        }
        else{
            return response()->json(['Message' => 'Error'], 401);
        }
    }

    public function logout()
    {
        $check = $this->validatePerson(request());
        if($check == 'hou.edu.vn'){
            auth('apiTeacher')->logout();
        }else if($check == 'students.hou.edu.vn'){
            auth('apiStudent')->logout();
        }
        else{
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh()
    {
        // return $this->respondWithToken(auth()->refresh());
    }

    protected function respondWithToken($token, $permission)
    {
        $check = $this->validatePerson(request());

        if($check == 'hou.edu.vn'){
            return response()->json([
                'access_token' => $token,
                'access_permission_token' => $permission,
                'token_type' => 'bearer',
                'expires_in' => auth('apiTeacher')->factory()->getTTL() * 60
            ]);
        }else if($check == 'students.hou.edu.vn'){
            return response()->json([
                'access_token' => $token,
                'access_permission_token' => $permission,
                'token_type' => 'bearer',
                'expires_in' => auth('apiStudent')->factory()->getTTL() * 60
            ]);
        }
        else{
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        
    }

    protected function validatePerson($request){
        $email = $request->email;
        $validate = explode("@", $email)[1];
        return $validate;
    }
}
