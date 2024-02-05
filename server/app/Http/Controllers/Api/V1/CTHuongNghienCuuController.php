<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Api\V1\CTHuongNghienCuuModel;
use Illuminate\Http\Request;

class CTHuongNghienCuuController extends Controller
{
    private $model;
    public function __construct() 
    {
        $this->model = new CTHuongNghienCuuModel();
    }
    public function index()
    {
        $arr = $this->model->getAllHNC();
        if(!$arr){
            return response()->json(["Message" => 'Login is continue'], 404);
        }
        return response($this->ApiResponse($arr));
    }

    public function store(Request $request)
    {
        //
    }

    public function show(string $id)
    {
        $arr = $this->model->getOneHNC($id);
        if(!$arr){
            return response()->json(["Message" => 'Login is continue'], 404);
        }
        return response($this->ApiResponse($arr));
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        //
    }
}
