<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Services\GoogleDrive;
use App\Http\Controllers\Controller;
use App\Models\Api\V1\CTBaoCaoSVModel;
use App\Http\Requests\V1\StoreCTBaoCaoSVRequest;

class CTBaoCaoSVController extends Controller
{
    private $model;
    private $idSV;
    public function __construct() {
        $this->model = new CTBaoCaoSVModel();
        $this->idSV = $this->getidSV();
    }

    public function index()
    {
        //
        dd(213);
    }

    public function store(Request $request)
    {
        $check = $this->model->addFileBaoCaoSV($request, $this->idSV);
        if($check)
        {
            return response()->json(["Message" => "Success"], 200);
        }
            return response()->json(["Message" => "Error"], 404);
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
