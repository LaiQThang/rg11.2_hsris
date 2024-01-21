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
    private $idSV;
    public function __construct() {
        $this->initModel = new HNCSinhVienModel();
        $this->idSV = $this->getidSV();
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
        // dd($request->y);
        $arr = $model->showHNCSinhVien($request->y, $this->idSV);
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
