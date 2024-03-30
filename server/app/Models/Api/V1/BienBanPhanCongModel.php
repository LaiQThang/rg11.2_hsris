<?php

namespace App\Models\Api\V1;

use App\Http\Resources\V1\BienBanPhanCongResource;
use App\Models\Api\ApiModel;
use App\Models\bienbanphancong;
use App\Models\ct_bienban;
use App\Models\ct_hnc;
use App\Models\detai;
use App\Models\giangvien;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\QueryException;

class BienBanPhanCongModel extends ApiModel
{
    use HasFactory;

    public function addBB($request)
    {
        try{
            $idGV = $this->getidGV();
            $idHNC = $request->HNC;
            if($idGV != null && $idHNC != null )
            {
                $students = $request->students;
                foreach($students as $student)
                {
                    $check = ct_hnc::where([['idHNC', '=', $idHNC], 
                                            ['idGV', '=', $idGV], 
                                            ['idSV', '=', $student]])
                                            ->first();
                    if($check->tinhTrangSV)
                    {
                        return false;
                    }
                }
                $res = bienbanphancong::create(['idGV' => $idGV] + $request->except('students'));
    
                $idBB = $res->idBB;
    
                foreach($students as $student)
                {
                    ct_bienban::create([
                        'idBB' => $idBB,
                        'idSV' => $student
                    ]);
    
                    ct_hnc::where([['idHNC', '=', $idHNC], ['idGV', '=', $idGV], ['idSV', '=', $student]])->update(['tinhTrangSV' => true]);
                    
                }
                return true;
            }
            return false;
        }
        catch(QueryException $e)
        {
            return false;
        }
    }

    public function updateBienBan($request, $id)
    {
        dd($request);
    }

    public function getBienBan($filter, $year)
    {
        if($idUser = $this->getidGV())
        {
            $user = giangvien::find($idUser);
            if(count($filter) == 0)
            {
                $ct = $user->giangVien_BienBan()->whereYear('ngayLap', $year)->with('bienBan_SinhVien')->get();
                return BienBanPhanCongResource::collection($ct);
            }
            else
            {
                $ct2 = $user->giangVien_BienBan()->whereYear('ngayLap', $year)->where($filter)->with('bienBan_SinhVien')->get();
                return BienBanPhanCongResource::collection($ct2);
            }
        }   
        return false;
    }
}
