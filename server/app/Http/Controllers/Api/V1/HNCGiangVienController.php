<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\HNCGiangVienCollection;
use App\Models\ct_hncgv;
use Illuminate\Http\Request;
use App\Filters\V1\HNCGiangVienFilter;

class HNCGiangVienController extends Controller
{
    /**
     * Display a listing of the resource.
     */

     public function index(Request $request)
    {
        $filter = new HNCGiangVienFilter();
        $queryItems = $filter->transform($request);

        if(count($queryItems) == 0){
            return new HNCGiangVienCollection(ct_hncgv::paginate());
        }
        else{
            $hnc = ct_hncgv::where($queryItems)->paginate();
            return new HNCGiangVienCollection($hnc->appends($request->query()));
        }
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
