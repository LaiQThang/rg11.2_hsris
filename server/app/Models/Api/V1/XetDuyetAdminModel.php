<?php

namespace App\Models\Api\V1;

use App\Models\detai;
use App\Models\huongnghiencuu;
use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class XetDuyetAdminModel extends Model
{
    use HasFactory;
    public function list()
    {
        try{
            if($id = request()->i)
            {
                $res = huongnghiencuu::with(['deTai' => function ($query)  {
                    $query->where('trangThaiGV', '=', '1')->whereNotNull('idBB');
                }])->whereYear('ngayTao', request()->y)->where('idHNC', $id)->has('deTai')->get();
            }
            else
            {
                $res = huongnghiencuu::with(['deTai' => function ($query)  {
                    $query->where('trangThaiGV', '=', '1')->whereNotNull('idBB');
                }])->whereYear('ngayTao', request()->y)->has('deTai')->get();
            }
            return $res;
        }
        catch(Exception $e){
            return $e;
        }
    }
}
