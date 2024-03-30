<?php

namespace App\Models\Api\V1;

use Exception;
use App\Models\detai;
use App\Models\Api\ApiModel;
use Illuminate\Database\Eloquent\Model;
use App\Http\Resources\V1\DeTaiCollection;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DeTaiGiangVienModel extends ApiModel
{
    use HasFactory;

    public function store($request)
    {
        try{
            $detai = detai::create([
                'tenDT' => $request->name,
                'tomTat' => $request->summary,
                'mucTieu' => $request->target,
                'phamVi' => $request->limit,
                'nhanXet' => $request->comment,
                'ngayLap' => now()->format('Y-m-d'),
                'trangThaiGV' => 1,
                'idGV' => $this->getidGV(),
                'idHNC' => $request->idHNC,
            ]);
            if($detai){
                return true;
            }
            return false;
        }catch(Exception $e){
            return false;
        }
    }

    public function listDeTaiXD()
    {
        try{
           return detai::with('HNC')->where([['idGV', $this->getidGV()], ['trangthaiGV', 0]])->whereYear('ngayLap', request()->year)->get();
        }
        catch(Exception $e){
            return false;
        }
    }
}
