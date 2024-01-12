<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\sinhvien;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\V1\StoreHNCSinhVienRequest;
use App\Models\V1\HNCSinhVienModel;

class HNCSinhVienController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreHNCSinhVienRequest $request)
    {
        $model = new HNCSinhVienModel();

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
        $res = sinhvien::find($id);
        $res1 = $res->historyResearchStudent()->whereYear('ngayTao', $request->y)->get();
        return response()->json($res1);
        dd($res1->toArray());
        dd($request);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
