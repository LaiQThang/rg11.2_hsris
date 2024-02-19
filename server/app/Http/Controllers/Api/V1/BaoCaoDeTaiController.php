<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
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

    public function store(Request $request)
    {
        //
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
