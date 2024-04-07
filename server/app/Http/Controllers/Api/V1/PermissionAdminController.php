<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\PermissionCollection;
use App\Http\Resources\V1\PermissionListCollection;
use App\Models\permission;
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
        dd(123);
    }
}
