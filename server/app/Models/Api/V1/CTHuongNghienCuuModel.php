<?php

namespace App\Models\Api\V1;

use App\Http\Resources\V1\CTHuongNghienCuuResource;
use App\Models\Api\ApiModel;
use App\Models\giangvien;
use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CTHuongNghienCuuModel extends ApiModel
{
    use HasFactory;

    public function getAllHNC()
    {
        // dd($this->getData(null));
        return $this->getData(null);
    }

    public function getOneHNC($id)
    {

        // dd($this->getData($id));
        return $this->getData($id);
    }

    public function getData($id)
    {
        try{
            $idGV = $this->getidGV();
            $year = request()->y;
            if($idGV == null || $year == null)
            {
                return false;
            }
            $inputArray = [];
            if($id != null)
            {
                // dd(123);
                $inputArray = giangvien::find($idGV)->giangVien_CTHNC()
                                                    ->where('ct_hnc.idHNC', '=', $id)
                                                    ->whereYear('ngayTao', '=', $year)
                                                    ->with(['hNCSinhVien' => function ($query) use ($idGV) {
                                                $query->wherePivot('idGV', '=', $idGV)
                                                    ->wherePivot('tinhTrangSV', '=', false);
                }])->get();
            }
            else
            {
                $inputArray = giangvien::find($idGV)->giangVien_CTHNC()
                                                    ->whereYear('ngayTao', '=', $year)
                                                    ->with(['hNCSinhVien' => function ($query) use ($idGV) {
                                                $query->wherePivot('idGV', '=', $idGV)
                                                    ->wherePivot('tinhTrangSV', '=', false);
                }])->get();
            }

            $outputArray = [];
            $seenIds = [];
    
            foreach ( $inputArray as $item) {
                $idHNC = $item['idHNC'];
                // Kiểm tra xem idHNC đã xuất hiện chưa
                if (!in_array($idHNC, $seenIds)) {
                    // Nếu chưa xuất hiện, thêm vào mảng kết quả và danh sách đã xuất hiện
                    $outputArray[] = $item;
                    $seenIds[] = $idHNC;
                }
            }
            $resource = CTHuongNghienCuuResource::collection($outputArray);
            // dd($resource);
            return $resource;
        }
        catch(Exception $e){
            dd($e);
            return false;
        }
    }
}
