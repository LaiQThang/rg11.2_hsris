<?php

namespace App\Models\Api\V1;

use App\Models\Api\ApiModel;
use App\Models\detai;
use App\Models\sinhvien;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class BaoCaoDeTaiModel extends ApiModel
{
    use HasFactory;

    public function getAllBaoCaoSV($idUser, $year) : array
    {
        $sinhvien = sinhvien::find($idUser);
        $detai = $sinhvien->detailsDeTai()->whereYear('ngayLap', $year)->first();
        $idDT = $detai->idDT;
        $dtfind = detai::find($idDT);
        $baocao = $dtfind->detailsBaoCao()->get()->toArray();
        // dd($baocao);
        return $baocao;
    }
}
