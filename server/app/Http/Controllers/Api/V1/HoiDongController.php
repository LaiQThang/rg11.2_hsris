<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\detai;
use App\Models\hoidong;
use App\Models\giangvien;
use Illuminate\Http\Request;
use App\Models\Api\V1\HoiDongModel;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\DeTaiCollection;
use App\Http\Resources\V1\HoiDongResource;
use App\Http\Resources\V1\HoiDongCollection;
use App\Http\Requests\V1\StoreHoiDongRequest;
use App\Http\Requests\V1\StorePhieuDiemRequest;

class HoiDongController extends Controller
{
    private HoiDongModel $model;

    public function __construct(HoiDongModel $model) 
    {
        $this->model = $model;
    }

    public function store(StoreHoiDongRequest $request)
    {
        if(! $this->getidGV())
        {
            return response()->json(['Message' => 'Login is continued'], 500);
        }
        $response = $this->model->store($request);
        // dd($response);
        if($response === true)
        {
            return response()->json(['Message' => 'Successful'], 200);
        }
        return response()->json(['Message' => $response->getMessage()], 500);
    }

    public function listCouncil()
    {
        return new HoiDongCollection(hoidong::whereYear('ngayCham', request()->y)->get());
    }

    public function listCouncilTeacher()
    {
        if(!$idGV = $this->getidGV())
        {
            return response()->json(['Message' => 'Login is continued'], 500);
        }
        $gv = giangvien::find($idGV);
        $listItem = $gv->hoidong()->whereYear('ngayCham', request()->y)->get();
        return new HoiDongCollection($listItem);
    }

    public function listCouncilPoint()
    {
        if(!$idGV = $this->getidGV())
        {
            return response()->json(['Message' => 'Login is continued'], 500);
        }
        $gv = giangvien::find($idGV);
        $res = $gv->hoidong()->whereYear('ngayCham', request()->y)->with('detai_hoidong')->get();
        return new HoiDongCollection($res);
    }

    public function listNoCouncil()
    {
        $res = detai::whereYear('ngayLap', request()->y)->where([['idHD', null], ['trangThaiGV', 2]])->get();
        return new DeTaiCollection($res);
    }
    
    public function pointCard(StorePhieuDiemRequest $request)
    {
        $res = $this->model->storePoint($request);
        if($res === true)
        {
            return response()->json(['Message' => 'Successful'], 200);
        }
        return response()->json(['Message' => $res->getMessage()], 500);
    }
}
