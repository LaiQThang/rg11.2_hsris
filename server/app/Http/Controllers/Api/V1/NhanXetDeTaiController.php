<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Api\V1\NhanXetDeTaiModel;
use App\Models\giangvien;
use Illuminate\Http\Request;

class NhanXetDeTaiController extends Controller
{
    private NhanXetDeTaiModel $model;
    public function __construct(NhanXetDeTaiModel $model) {
        $this->model = $model;
    }

    public function viewStore()
    {
        $idGV = $this->getidGV();
        $gv = giangvien::find($idGV);
        // $res = $gv->giangVien_BienBan()->with('bienBan_deTai')->with('deTai_baoCao')->get()->toArray();
        $res2 = GiangVien::join('bienbanphancongs', function($join) use ($idGV) {
            $join->on('giangviens.idGV', '=', 'bienbanphancongs.idGV')
                 ->where('giangviens.idGV', '=', $idGV);
        })
        ->join('detais', 'detais.idBB', '=', 'bienbanphancongs.idBB')
        ->join('ct_baocaodetai', 'ct_baocaodetai.idDT', '=', 'detais.idDT')
        ->join('ct_baocaosv', 'ct_baocaosv.idBC', '=', 'ct_baocaodetai.idBC')
        ->join('sinhviens', 'sinhviens.idSV', '=', 'ct_baocaosv.idSV')
        ->join('baocaodetais', 'baocaodetais.idBC', '=', 'ct_baocaosv.idBC')
        ->select('sinhviens.tenSV', 'bienbanphancongs.tenBB', 'detais.tenDT', 'ct_baocaosv.fileTaiNguyen', 'baocaodetais.ngayKetThuc')
        ->get()->toArray();
        dd($res2);
    }
}
