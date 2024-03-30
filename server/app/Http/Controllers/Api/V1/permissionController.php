<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Api\V1\permissionModel;
use Illuminate\Http\Request;

class permissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    private $model;
    public function __construct(permissionModel $model) {
        $this->model = $model;
    }
    public function index()
    {
        
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
        $res = $this->model->getPermission($id);

        if($res){
            return response($this->ApiResponse($res));
        }
        return response()->json(["Message" => "Error", 500]);
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
