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
use App\Models\bienbanphancong;
use App\Models\ct_bienban;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DeTaiSinhVienModel extends ApiModel
{
    use HasFactory;
    public function getAllDeTai($idUser, $request)
    {
        $idHNC = $this->getIdHNC($idUser, $request->year);
        if($idHNC == null) 
        {
            return response()->json($this->ApiResponse([]));
        }
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
            if($idHNC == false || $idHNC == null)
            {
                return false;
            }
            $idGV = ct_hncgv::where('idHNC',$idHNC)->first()->toArray()['idGV'];
            $bienban = ct_bienban::where('idSV', $idUser)->first();
            $idBB = $bienban->idBB;
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
                'idBB' => $idBB
            ]);

            if($detai){
                $list = ct_bienban::where('idBB', $idBB)->get()->toArray();
                foreach($list as $val)
                {
                    ct_detai::create([
                        'idSV' => $val['idSV'],
                        'idDT' => $detai->idDT,
                        'dateCreate' => now()->format('Y-m-d')
                    ]);
                }
            }
            else{
                return false;
            }
            return true;
        }catch(Exception $e){
            return false;
        }
    }

    private function getIdHNC($idUser, $year)
    {
        try{
            $sinhvien = sinhvien::find($idUser);
            $hnc = $sinhvien->historyResearchStudent()->whereYear('ngayTao', $year)->first();
            if(isset($hnc))
            {
                $idHNC = $hnc->toArray()['idHNC'];
                return $idHNC;
            }
            return null;
        } catch(Exception $e){
            return false;
        }
    }
}
