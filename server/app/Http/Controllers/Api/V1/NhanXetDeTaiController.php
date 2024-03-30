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
        if(empty($this->getidGV()))
        {
            return response()->json(["Message" => "Login is continued"], 500);
        }
        $res = $this->model->viewCreate();
        return response($this->ApiResponse($res));
    }

    public function store()
    {
        $response = $this->model->store();
        if($response === true)
        {
            return response()->json(["Message" => "Successful"], 200);
        }
        return response()->json(["Message" => $response], 500);
    }
}
