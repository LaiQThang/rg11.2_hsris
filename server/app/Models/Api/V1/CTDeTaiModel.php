<?php

namespace App\Models\Api\V1;

use Exception;
use App\Models\ct_detai;
use App\Models\sinhvien;
use App\Models\Api\ApiModel;
use App\Models\ct_bienban;
use App\Models\detai;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CTDeTaiModel extends ApiModel
{
    use HasFactory;

    public function addCTDeTai($idUser, $idDT) : bool
    {
        try{
            $bienban = ct_bienban::where('idSV', $idUser)->first();
            $idBB = $bienban->idBB;
            $detai = detai::find($idDT);
            $detai->update([
                'idBB' => $idBB
            ]);
            ct_detai::create([
                'idSV' => $idUser,
                'idDT' => $idDT
            ]);
            return true;
        }
        catch(Exception $e){
            return false;
        }
    }
    public function deleteCTDeTai($idUser, $id) : bool
    {
        try{
            $res = ct_detai::find($id, ['idSV']);
            if($res->idSV != null && $res->idSV == $idUser){
                ct_detai::destroy($id);
                return true;
            }
            return false;
        }
        catch(Exception $e){
            return false;
        }
    }

    public function getHistory($y)
    {
        $idSV = $this->getidSV();
        if( $idSV != null && $y != null){
            $user = sinhvien::find($idSV);
            $history = $user->detailsDeTai()->whereYear('ngayLap', $y)->get()->toArray();
            return $history;
        }
        return null;
    }

    public function getFinally()
    {
        if($idSV = $this->getidSV()){
            $user = sinhvien::find($idSV);
            $history = $user->detailsDeTai()->get()->toArray();
            return $history;
        }
        return null;
    }
}
