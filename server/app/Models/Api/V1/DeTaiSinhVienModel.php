<?php

namespace App\Models\Api\V1;

use DateTime;
use Exception;
use App\Models\detai;
use App\Models\ct_detai;
use App\Models\ct_hncgv;
use App\Models\sinhvien;
use App\Models\Api\ApiModel;
use App\Http\Resources\V1\DeTaiResource;
use App\Http\Resources\V1\DeTaiCollection;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DeTaiSinhVienModel extends ApiModel
{
    use HasFactory;
    public function getAllDeTai($idUser, $request)
    {
        $idHNC = $this->getIdHNC($idUser, $request->year);
        return new DeTaiCollection(detai::where([['idHNC', $idHNC], ['trangThaiGV', 1]])->paginate(5)->appends($request->query()));
    }

    public function getDeTai($id)
    {

        $result = detai::find($id);
        // dd($result);
        if($result != null)
        {
            return DeTaiResource::make(detai::find($id));
        }

        return false;
    }

    public function addDeTaiSinhVien($idUser, $request) :bool
    {
        try{
            $idHNC = $this->getIdHNC($idUser, (new DateTime())->format('Y'));
            if($idHNC == false)
            {
                return false;
            }
            $idGV = ct_hncgv::where('idHNC',$idHNC)->first()->toArray()['idGV'];
            $detai = detai::create([
                'tenDT' => $request->name,
                'tomTat' => $request->summary,
                'mucTieu' => $request->target,
                'phamVi' => $request->limit,
                'nhanXet' => $request->comment,
                'ngayLap' => now()->format('Y-m-d'),
                'trangThaiGV' => 0,
                'idGV' => $idGV,
                'idHNC' => $idHNC,
            ]);
            if($detai){
                ct_detai::create([
                    'idDT' => $detai->idDT,
                    'idSV' => $idUser,
                ]);
            }
            else{
                return false;
            }
            return true;
        }catch(Exception $e){
            return false;
        }
    }

    private function getIdHNC($idUser, $year) : string
    {
        try{
            $sinhvien = sinhvien::find($idUser);
            $hnc = $sinhvien->historyResearchStudent()->whereYear('ngayTao', $year)->first();
            $idHNC = $hnc->toArray()['idHNC'];
            return $idHNC;
        } catch(Exception $e){
            return false;
        }
    }
}
