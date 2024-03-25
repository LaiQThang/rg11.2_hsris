<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\HuongNghienCuuCollection;
use App\Http\Resources\V1\HuongNghienCuuResource;
use App\Models\Api\V1\XetDuyetAdminModel;
use App\Models\detai;
use Exception;
use Illuminate\Http\Request;

class XetDuyetAdminController extends Controller
{
    private $model;
    public function __construct(XetDuyetAdminModel $xd) {
        $this->model = $xd;
    }

    public function list()
    {
        if($res = $this->model->list())
        {
            return new HuongNghienCuuCollection($res);
        }
        return response()->json(["Message" => "Error", 500]);
    }

    public function update()
    {
        try{
            $idDT = request()->idDT;
            $res = detai::find($idDT);
            if(isset($res) && $res->trangThaiGV == 1 )
            {
                $res->update([
                    'trangThaiGV' => '2'
                ]);
                return response()->json(["Message" => "Successful"], 200);
            }
            return response()->json(["Message" => "Data not found"], 500);
        } catch(Exception $e){
            return response()->json(["Message" => $e], 500);
        }
    }
}
