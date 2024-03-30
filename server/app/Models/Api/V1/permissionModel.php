<?php

namespace App\Models\Api\V1;

use App\Models\permission;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Exception;

class permissionModel extends Model
{
    use HasFactory;

    public function getPermission($id)
    {
        try{
            $res = permission::find($id)->tenQuyen;
            if($res == null){
                return false;
            }
            return $res;
        }
        catch(Exception $e){
            return false;
        }
    }
}
