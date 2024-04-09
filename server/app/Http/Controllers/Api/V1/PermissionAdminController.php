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
        $id = request()->id;
        return new PermissionCollection(permission::with('permissionList')->where('id', $id)->get());
    }

    public function editPermission(Request $request)
    {
        try{
            $id = request()->id;
            $permission = permission::find($id);
            $postDataArr = $request->permissionDetail;
            if(!empty($permission))
            {
                $permission->update([
                    'ghiChu' => $request->note
                ]);
                $permissionDetail = permission_detail::where('permission_id', $id)->get('id');
                if(!empty($permissionDetail))
                {
                    $arrayDetail = $permissionDetail->toArray();
                }
                foreach($postDataArr as $value)
                {
                    permission_detail::create([
                        'permission_id' => $id,
                        'permission_list_id' => $value,
                    ]);
                }
                foreach($arrayDetail as $value)
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
