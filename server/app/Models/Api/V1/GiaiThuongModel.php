<?php

namespace App\Models\Api\V1;

use App\Models\sinhvien;
use App\Models\phieudiem;
use App\Models\Api\ApiModel;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\V1\DeTaiResource;
use App\Models\detai;
use Exception;
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

    public function CalculatorPoint()
    {
        try{
            $year = request()->y;
            return detai::join('phieudiems', function($join) use ($year) {
                $join->on('phieudiems.idDT', '=', 'detais.idDT')
                ->whereYear('phieudiems.ngayLap', $year);})
                   ->select('detais.idDT', 'detais.tenDT', DB::raw('SUM(phieudiems.diem) AS TongDiem'))
                   ->groupBy('detais.tenDT', 'detais.idDT')
                   ->get()->toArray();
        } catch(Exception $e){
            return $e->getMessage();
        }
    }

    public function UpdatePoint($request)
    {
        try{
            $postData = request()->all();
            foreach($postData as $val)
            {
                $topic = detai::find($val['idDT']);
                if(!empty($topic))
                {
                    $topic->update([
                        'diemF' => $val['TongDiem']
                    ]);
                }
            }
            return true;
        } catch(Exception $e){
            return $e->getMessage();
        }
    }
}
