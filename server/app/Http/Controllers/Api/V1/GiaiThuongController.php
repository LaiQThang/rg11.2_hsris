<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\detai;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Api\V1\GiaiThuongModel;
use App\Http\Requests\V1\UpdateCupTopicRequest;
use App\Http\Requests\V1\UpdatePointTopicRequest;
use App\Http\Resources\V1\GiaiThuongCollection;
use App\Http\Resources\V1\GiaiThuongResource;
use App\Models\giaithuong;
use Exception;

class GiaiThuongController extends Controller
{
    private $modelGT;
    public function __construct(GiaiThuongModel $model) 
    {
        $this->modelGT = $model;
    }
    public function index()
    {
        //
    }

    public function getGiaiThuongSV()
    {
        if($result = $this->modelGT->getGiaiThuongSV())
        {
            return response($this->ApiResponse($result));
        }
        return response()->json(["Message" => "Login is continue"], 404);
    }

    public function CalculatorPoint()
    {
        return response()->json($this->ApiResponse($this->modelGT->CalculatorPoint()));
    }

    public function UpdatePoint(UpdatePointTopicRequest $request)
    {
        $response = $this->modelGT->UpdatePoint($request);
        if($response === true)
        {
            return response()->json(["Message" => "Successful"], 200);
        }
        return response()->json($response);
    }

    public function updateCup(UpdateCupTopicRequest $request)
    {
        try{
            $postData = $request->all();
            foreach($postData as $val)
            {
                $response = detai::find($val['idDT']);
                if(!empty($response))
                {
                    $response->update([
                        'idGT' => $val['idGT']
                    ]);
                }
            }
            return response()->json(["Message" => "Successful"], 200);
        }catch(Exception $e){
            return response()->json(["Message" => $e->getMessage()], 500);
        }
    }

    public function ListCup()
    {
        $cup = giaithuong::all();
        return new GiaiThuongCollection($cup);
    }

    public function store(Request $request)
    {
        //
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
        //
    }
}
