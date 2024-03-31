<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\V1\HuongNghienCuuCollection;
use App\Models\ct_detai;
use App\Models\ct_hnc;
use App\Models\huongnghiencuu;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\giangvien;

class ValidateViewController extends Controller
{
    public function RegisterTopic()
    {
        $idSV = $this->getidSV();
        $cthnc = ct_hnc::where('idSV', $idSV)->whereYear('dateCreate', date('Y'))->get()->toArray();
        if(!empty($cthnc))
        {
            return true;
        }
        return false;
    }

    public function RegisterResearch()
    {
        $idSV = $this->getidSV();
        $detai = ct_detai::where('idSV', $idSV)->whereYear('dateCreate', date('Y'))->get()->toArray();
        if(!empty($detai))
        {
            return true;
        }
        return false;
    }

    public function Research()
    {
        $idGV = $this->getidGV();
        $gv = giangvien::find($idGV);
        $hnc = $gv->giangVien_CTHNCGV()->whereYear('ngayTao', date('Y'))->get();
        if(!empty($hnc->toArray()))
        {
            return new HuongNghienCuuCollection($hnc);
        }
        return false;
    }
}
