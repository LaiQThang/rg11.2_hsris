<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\StoreDeTaiSVRequest;
use App\Http\Resources\V1\DeTaiCollection;
use App\Models\Api\V1\DeTaiGiangVienModel;
use App\Models\Api\V1\DeTaiSinhVienModel;
use App\Models\detai;
use Exception;
use Google\Service\CloudDeploy\Rollback;
use Illuminate\Http\Request;

class DeTaiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    private $modelDeTaiSV;
    private $modelDeTaiGV;
    private $idSV;
    public function __construct(DeTaiSinhVienModel $sv, DeTaiGiangVienModel $gv) {
        $this->modelDeTaiSV = $sv;
        $this->modelDeTaiGV = $gv;
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

    public function addDTGV(StoreDeTaiSVRequest $request)
    {
        
        try{
            if($this->modelDeTaiGV->store($request)){
                return response()->json(['Message' => 'Successful'], 200);
            }
            return response()->json(['Message' => 'Not Founds'], 404);
        }
        catch(Exception $e){
            return response()->json(['Message' => 'Not Found'], 404);
        }
    }

    public function listDTXetDuyet()
    {
        try{
            if($res = $this->modelDeTaiGV->listDeTaiXD()){
                return new DeTaiCollection($res);
            }
            return response()->json(['Message' => 'Not Founds'], 404);
        }
        catch(Exception $e){
            return response()->json(['Message' => 'Not Found'], 404);
        }
    }

    public function postDTXetDuyet()
    {
        try{
            if($this->getidGV()){
                $dt = detai::find(request()->idDT);
                $dt->update([
                    'trangThaiGV' => 1
                ]);
                return response()->json(['Message' => 'Successful'], 200);
            }
            return response()->json(['Message' => 'Login is continued'], 500);
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
