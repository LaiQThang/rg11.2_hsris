<?php

namespace App\Models\Api\V1;

use App\Models\Api\ApiModel;
use App\Models\giangvien;
use App\Models\nhanxetbaocao;
use App\Helpers\GoogleDrive;
use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NhanXetDeTaiModel extends ApiModel
{
    use HasFactory;
    public function viewCreate()
    {
        try{
            $idGV = $this->getidGV();
            $year = request()->y;
            $idBB = request()->i;
            if(isset($idBB))
            {
                $res = giangvien::join('bienbanphancongs', function($join) use ($idGV) {
                    $join->on('giangviens.idGV', '=', 'bienbanphancongs.idGV')
                        ->where('giangviens.idGV', '=', $idGV);
                })
                ->join('detais', function ($join) use ($idBB){
                    $join->on( 'detais.idBB', '=', 'bienbanphancongs.idBB')
                    ->where('bienbanphancongs.idBB', $idBB);
                } )
                ->join('ct_baocaodetai', function($join) use ($year){
                    $join->on( 'ct_baocaodetai.idDT', '=', 'detais.idDT')
                        ->whereYear('detais.ngaylap', $year);
                })
                ->join('ct_baocaosv', 'ct_baocaosv.idBC', '=', 'ct_baocaodetai.idBC')
                ->join('sinhviens', 'sinhviens.idSV', '=', 'ct_baocaosv.idSV')
                ->join('baocaodetais', 'baocaodetais.idBC', '=', 'ct_baocaosv.idBC')
                ->select('sinhviens.tenSV', 'bienbanphancongs.tenBB', 'bienbanphancongs.idBB', 'detais.tenDT', 'ct_baocaosv.fileTaiNguyen', 'ct_baocaosv.id', 'baocaodetais.ngayKetThuc')
                ->get();
            }
            else
            {
                $res = giangvien::join('bienbanphancongs', function($join) use ($idGV) {
                    $join->on('giangviens.idGV', '=', 'bienbanphancongs.idGV')
                        ->where('giangviens.idGV', '=', $idGV);
                })
                ->join('detais', 'detais.idBB', '=', 'bienbanphancongs.idBB')
                ->join('ct_baocaodetai', function($join) use ($year){
                    $join->on( 'ct_baocaodetai.idDT', '=', 'detais.idDT')
                        ->whereYear('detais.ngaylap', $year);
                })
                ->join('ct_baocaosv', 'ct_baocaosv.idBC', '=', 'ct_baocaodetai.idBC')
                ->join('sinhviens', 'sinhviens.idSV', '=', 'ct_baocaosv.idSV')
                ->join('baocaodetais', 'baocaodetais.idBC', '=', 'ct_baocaosv.idBC')
                ->select('sinhviens.tenSV', 'bienbanphancongs.tenBB', 'bienbanphancongs.idBB', 'detais.tenDT', 'ct_baocaosv.fileTaiNguyen', 'ct_baocaosv.id', 'baocaodetais.ngayKetThuc')
                ->get();
            }
            return $res->toArray();
        } catch(Exception $e){
            return $e->getMessage();
        }
    }

    public function store()
    {
        try
        {
            $idGV = $this->getidGV();
            $file = request()->file('file');
            $fileId = GoogleDrive::POST($file);
            $data = [
                "idGV" => $idGV,
                "ngayLap" => now()->format('Y-m-d'),
                "fileTaiNguyen" => $fileId
            ];
            nhanxetbaocao::create(array_merge($data, request()->except('file')));
            return true;
        }
        catch(Exception $e)
        {
            GoogleDrive::DELETE($fileId);
            return $e->getMessage();
        }
    }
}
