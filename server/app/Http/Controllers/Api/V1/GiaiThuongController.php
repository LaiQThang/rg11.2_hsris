<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Api\V1\GiaiThuongModel;
use Illuminate\Http\Request;

class GiaiThuongController extends Controller
{
    private $modelGT;
    public function __construct() 
    {
        $this->modelGT = new GiaiThuongModel();
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
