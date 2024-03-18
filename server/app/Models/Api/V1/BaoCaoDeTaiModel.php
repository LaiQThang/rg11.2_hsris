<?php

namespace App\Models\Api\V1;

use App\Models\Api\ApiModel;
use App\Models\ct_baocaodetai;
use App\Models\detai;
use App\Models\sinhvien;
use Exception;
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

    public function getAllTienDo($year)
    {
        try{
            $idGV = $this->getidGV();
            if($idGV){
                $detai = detai::where('idGV',$idGV)->whereYear('ngayLap', $year)->select('idDT', 'tenDT')->get();
                return $detai;
            }
            return false;
        }catch(Exception $e){
            return false;
        }
    }

    public function getTienDo($idDT)
    {
        try{
            $bc = ct_baocaodetai::where('idDT',$idDT)->with('oldBaoCao')->get()->toArray();
            return $bc;
        }catch(Exception $e){
            return false;
        }
    }

    public function addTienDo($request)
    {
        dd($request->all());
    }
}
