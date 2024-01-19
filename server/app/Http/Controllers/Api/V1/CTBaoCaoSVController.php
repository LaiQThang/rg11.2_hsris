<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\StoreCTBaoCaoSVRequest;
use App\Models\Api\V1\CTBaoCaoSVModel;
use Illuminate\Http\Request;

class CTBaoCaoSVController extends Controller
{
    private $model;
    public function __construct() {
        $this->model = new CTBaoCaoSVModel();
    }

    public function index()
    {
        //
        dd(213);
    }

    public function store(Request $request)
    {
        $this->model->addFileBaoCaoSV($request);
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
