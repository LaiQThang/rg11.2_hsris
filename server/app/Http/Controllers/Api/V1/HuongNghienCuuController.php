<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\HuongNghienCuuCollection;
use App\Http\Resources\V1\HuongNghienCuuResource;
use Illuminate\Http\Request;
use App\Models\huongnghiencuu;
use App\Filters\V1\HuongNghienCuuFilter;
use App\Http\Requests\V1\StoreHuongNghienCuuRequest;
use App\Http\Requests\V1\UpdateHuongNghienCuuRequest;

class HuongNghienCuuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new HuongNghienCuuFilter();
        $filterItems = $filter->transform($request);

        $includeHNCGV = $request->query('includeCT');

        $huongnghiencuu = huongnghiencuu::where($filterItems);

        if($includeHNCGV){
            $huongnghiencuu = $huongnghiencuu->with('hNCGiangVien');
        }

        
        return new HuongNghienCuuCollection($huongnghiencuu->paginate()->appends($request->query()));
    }

    /**
     * Show the form for creating a new resource.
     */


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreHuongNghienCuuRequest $request)
    {
        return new HuongNghienCuuResource(huongnghiencuu::create($request->all()));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $includeHNCGV = request()->query('includeCT');
        if($includeHNCGV){
            return HuongNghienCuuResource::make(huongnghiencuu::find($id)->loadMissing('hNCGiangVien'));
        }
        return HuongNghienCuuResource::make(huongnghiencuu::find($id));

    }

    /**
     * Show the form for editing the specified resource.
     */

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateHuongNghienCuuRequest $request, string $id)
    {
        // dd($request->toArray());
        $hnc = huongnghiencuu::find($id)->update($request->all());
        if($hnc == true){
            return response()->json(['messege' => 'Success', 'status' => 200], 200);
        }
        else{
            return response()->json(['messege' => 'Error', 'status' => 500], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
