<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\V1\StoreHNCSinhVienRequest;
use App\Models\Api\V1\HNCSinhVienModel;

class HNCSinhVienController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    private $initModel;

    public function __construct() {
        $this->initModel = new HNCSinhVienModel();
    }

    public function index()
    {
        //
    }

    public function store(StoreHNCSinhVienRequest $request)
    {
        $model = $this->initModel;

        $result = $model->addHNCSinhVien($request);
        if($result){
            return response()->json(['Message' => 'Success'], 200);
        }
        else{
            return response()->json(['Message' => 'Fail'], 404);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $model = $this->initModel;
        $arr = $model->showHNCSinhVien($request->y, $id);
        $res = $model->ApiResponse($arr);
        return response()->json($res);
    }

    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $check = $this->initModel->deleteHNCSinhVien($id);
        if($check){
            return response()->json(['Message' => 'Success'], 200);
        }
        else{
            return response()->json(['Message' => 'Fail'], 404);
        }
    }

}
