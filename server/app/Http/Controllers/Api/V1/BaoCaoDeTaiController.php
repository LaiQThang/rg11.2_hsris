<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\DeTaiCollection;
use App\Http\Resources\V1\DeTaiResource;
use App\Models\Api\V1\BaoCaoDeTaiModel;
use Exception;
use Illuminate\Http\Request;
use PhpParser\Node\Expr;

class BaoCaoDeTaiController extends Controller
{
    private $model;
    private $idUser;
    public function __construct() {
        $this->model = new BaoCaoDeTaiModel();
        $this->idUser = $this->getidSV();
    }
    public function index()
    {
        if($this->idUser == false){
            return response()->json(['Message' => 'Login is continue'], 500);
        }
        $arr = $this->model->getAllBaoCaoSV($this->idUser, request()->year);
        return response($this->model->ApiResponse($arr));
    }

    public function getAllTienDo(Request $request)
    {
        $year = $request->year;
        if($rsl = $this->model->getAllTienDo($year))
        {
            return new DeTaiCollection($rsl);
        }
        else{
            return response()->json(['Message' => 'Login is continue'], 500);    
        }
    }

    public function getTienDo(Request $request)
    {
        $idDT = $request->idDT;
        $rsl = $this->model->getTienDo($idDT);
        dd($rsl);
        if($rsl == false)
        {
            return response()->json(['Message' => 'Login is continue'], 500);   
        }
        else{
            return response($this->model->ApiResponse($rsl));
        }
    }

    public function store(Request $request)
    {
        $this->model->addTienDo($request);
    }

    public function edit(string $id)
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
