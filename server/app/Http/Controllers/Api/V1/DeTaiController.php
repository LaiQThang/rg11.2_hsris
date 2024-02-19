<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\StoreDeTaiSVRequest;
use App\Models\Api\V1\DeTaiSinhVienModel;
use Exception;
use Illuminate\Http\Request;

class DeTaiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    private $modelDeTaiSV;
    private $idSV;
    public function __construct() {
        $this->modelDeTaiSV = new DeTaiSinhVienModel();
        $this->idSV = $this->getidSV();
    }
    public function index(Request $request)
    {
        try{
            $idUser = $this->idSV;
            $model = $this->modelDeTaiSV;
            return $model->getAllDeTai($idUser, $request);
        }
        catch(Exception $e){
            // dd($e);
            return response()->json(['Message' => 'Not Found'], 404);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDeTaiSVRequest $request)
    {
        try{
            $idUser = $this->idSV;
            $result = $this->modelDeTaiSV->addDeTaiSinhVien($idUser, $request);
            if($result == true)
            {
                return response()->json(['Message' => 'Successful'], 200);
            }
            return response()->json(['Message' => 'Not Found'], 404);
        }
        catch(Exception $e){
            return response()->json(['Message' => 'Not Found'], 404);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $result = $this->modelDeTaiSV->getDeTai($id);
        // dd($result);
        if($result != false)
        {
            return $result;
        }
        return response()->json(['Message' => 'Not Found'], 404);
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
