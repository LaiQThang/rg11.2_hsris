<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\PermissionCollection;
use App\Http\Resources\V1\PermissionListCollection;
use App\Models\permission;
use App\Models\permission_detail;
use App\Models\permission_list;
use Google\Service\Drive\PermissionList;
use Illuminate\Http\Request;

class PermissionAdminController extends Controller
{
    public function permission()
    {
        return new PermissionCollection(permission::all());
    }

    public function permissionList()
    {
        return new PermissionListCollection(permission_list::all());
    }

    public function permissionDetail()
    {
        return new PermissionCollection(permission::with('permissionList')->get());
    }

    public function editPermission()
    {
        try{
            $permissionArr = request()->all();
            $arrDelete = [];
            foreach($permissionArr as $key => $permission)
            {
                $response = permission_detail::where('permission_id', $key)->get();
                if($response)
                {
                    $arrDelete[] = $response->toArray();
                }
                foreach($permission as $value)
                {
                    permission_detail::create([
                        'permission_id' => $key,
                        'permission_list_id' => $value
                    ]);
                }
            }
            foreach($arrDelete as $delete)
            {
                foreach($delete as $value)
                {
                    permission_detail::destroy($value['id']);
                }
            }
            return response()->json(["Message" => "OK"], 200);
        } catch(\Exception $e){
            return response()->json(["Message" => $e->getMessage()], 500);
        }
        
    }
}
