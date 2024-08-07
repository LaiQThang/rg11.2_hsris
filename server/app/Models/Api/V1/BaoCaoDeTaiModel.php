<?php

namespace App\Models\Api\V1;

use Exception;
use App\Models\detai;
use App\Models\sinhvien;
use App\Models\baocaodetai;
use App\Models\Api\ApiModel;
use App\Models\ct_baocaodetai;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class BaoCaoDeTaiModel extends ApiModel
{
    use HasFactory;

    public function getAllBaoCaoSV($idUser, $year) : array
    {
        $sinhvien = sinhvien::find($idUser);
        $detai = $sinhvien->detailsDeTai()->whereYear('ngayLap', $year)->first();
        if(isset($detai))
        {
            $idDT = $detai->idDT;
            $dtfind = detai::find($idDT);
            $baocao = $dtfind->detailsBaoCao()->get()->toArray();
            return $baocao;
        }
        return [];
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

    public function store($request)
    {
        try{
            $idDT = $request->idDT;
            $idGV = $this->getidGV();
            $timeArray = $request->timeArray;
            $arr = [
                'tinhTrang' => 0,
                'idGV' => $idGV
            ];

            foreach($timeArray as $value)
            {
                $query = array_merge($arr, $value);
                //Nếu ko có $idDT thì lưu fail
                $result = baocaodetai::create($query);
                ct_baocaodetai::create([
                    'idDT' => $idDT,
                    'idBC' => $result->idBC
                ]);
            }
            return true;
        }
        catch(Exception $e){
            return $e;
        }
    }
}
