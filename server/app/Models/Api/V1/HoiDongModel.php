<?php

namespace App\Models\Api\V1;

use App\Models\Api\ApiModel;
use App\Models\ct_detai;
use App\Models\ct_hoidonggv;
use App\Models\ct_hoidongsv;
use App\Models\detai;
use App\Models\hoidong;
use App\Models\phieudiem;
use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HoiDongModel extends ApiModel
{
    use HasFactory;
    public function store($request)
    {
        try{
            $postData =  $request->except('topicArr', 'teacherArr');
            $topicArr = $request->topicArr;
            $data = ["ngayTao" => now()->format('Y-m-d'), "delete" => 0, "soLuong" => count($topicArr)] ;
            $teacherArr = $request->teacherArr;
    
            $result = hoidong::create(array_merge($data, $postData));
            $idHD = $result->idHD;

            foreach($topicArr as $value)
            {
                $res = detai::find($value);
                if(!empty($res))
                {
                    $res->update([
                        "idHD" => $idHD
                    ]);
                }
                $arrStd = $this->getArrStd($value);
                foreach($arrStd as $val)
                {
                    ct_hoidongsv::create([
                        "idSV" => $val['idSV'],
                        "idHD" => $idHD
                    ]);
                }
            }
    
            if(!empty($teacherArr))
            {
                $this->storeArrTch($teacherArr, $idHD);
            }

            return true;
        } catch(Exception $e) {
            return $e;
        }
    }

    public function getArrStd($idDT) : array
    {
        $res = ct_detai::where('idDT', $idDT)->get();

        if($res)
        {
            return $res->toArray();
        }
        return [];
    }

    public function storeArrTch($array, $idHD)
    {
        foreach($array as $value)
        {
           ct_hoidonggv::create([
                "idHD" => $idHD,
                "idGV" => $value
           ]);
        }
        return true;
    }

    public function storePoint($request)
    {
        try{
            $idGV = $this->getidGV();
            $topicArr = $request->topicArr;
            $data = [
                "idGV" => $idGV,
                "ngayLap" => now()->format('Y-m-d'),
                "idHD" => $request->idHD
            ];

            foreach($topicArr as $val)
            {
                phieudiem::create(array_merge($data, $val));
            }
            return true;
        }
        catch(Exception $e){
            return $e;
        }
    }
}
