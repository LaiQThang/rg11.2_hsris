<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Api\V1\CTDeTaiModel;
use Exception;
use Illuminate\Http\Request;

class CTDeTaiController extends Controller
{

    private $modelCTDeTai;
    private $idUser;
    public function __construct() {
        $this->modelCTDeTai = new CTDeTaiModel();
        $this->idUser = $this->getidSV();
    }

    public function index()
    {

    }

    public function store(Request $request)
    {
        try{
            $idUser = $this->idUser;
            $idDT = $request->idDT;
            $bool = $this->modelCTDeTai->addCTDeTai($idUser, $idDT);
            if($bool){
                return response()->json(['Message' => 'Success'], 200);
            }
            return response()->json(['Message' => 'Error'], 500);
        }
        catch(Exception $e){
            return response()->json(['Message' => 'Error'], 500);
        }
    }


    public function show(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        $bool = $this->modelCTDeTai->deleteCTDeTai($this->idUser, $id);
        if($bool){
            return response()->json(['Message' => 'Success'], 200);
        }
        return response()->json(['Message' => 'Error'], 500);
    }
}
