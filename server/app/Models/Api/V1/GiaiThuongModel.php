<?php

namespace App\Models\Api\V1;

use App\Http\Resources\V1\DeTaiResource;
use App\Models\Api\ApiModel;
use App\Models\sinhvien;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class GiaiThuongModel extends ApiModel
{
    use HasFactory;

    public function getGiaiThuongSV()
    {
        if($idUser = $this->getidSV()){
            $user = sinhvien::find($idUser);
            $arr = DeTaiResource::collection($user->detailsDeTai()->with(['giaiThuong', 'giangVien'])->get());
            return $arr;
        }
        return false;
    }
}
