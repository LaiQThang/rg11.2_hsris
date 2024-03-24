<?php

namespace App\Models\Api\V1;

use App\Models\detai;
use App\Models\huongnghiencuu;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class XetDuyetAdminModel extends Model
{
    use HasFactory;
    public function list()
    {
        // try{}
        $res = huongnghiencuu::with(['deTai' => function ($query)  {
            $query->where('trangThaiGV', '=', '1');
        }])->whereYear('ngayTao', request()->y)->get();
        dd($res->toArray());
    }
}
