<?php

namespace App\Http\Controllers\Api\V1;

use Exception;
use App\Models\detai;
use PhpParser\Node\Expr;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\DeTaiCollection;
use App\Models\Api\V1\BaoCaoDeTaiModel;

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
        $list = detai::where('idGV', $this->getidGV())->get();
        dd($list->toArray());

    }

    public function listnhom()
    {
        if(!$this->getidGV())
        {
            return response()->json(['Message' => 'Login is continue'], 500);
        }
        try{
            if(isset(request()->b))
            {
                $list = detai::where([['idGV', $this->getidGV()], ['idBB', request()->b]])->whereYear('ngayLap', request()->y)->get();
            }
            else
            {
                $list = detai::where('idGV', $this->getidGV())->whereYear('ngayLap', request()->y)->get();
            }
                return new DeTaiCollection($list);
        }catch(Exception $e){
            return response()->json(['Message' => $e], 500);
        }

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
