<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Filters\V1\BienBanPhanCongFilter;
use App\Models\Api\V1\BienBanPhanCongModel;
use App\Http\Requests\V1\UpdateBienBanRequest;
use App\Http\Requests\V1\StoreBienBanPhanCongRequest;

class BienBanPhanCongController extends Controller
{
    private $model;
    private $filter;
    public function __construct(BienBanPhanCongModel $model, BienBanPhanCongFilter $filter) {
        $this->model = $model;
        $this->filter = $filter;
    }
    public function index()
    {
        //
    }

    public function store(StoreBienBanPhanCongRequest $request)
    {

        if($this->model->addBB($request))
        {
            return response()->json(["Message" => "Successful"], 200);
        }
        return response()->json(["Error" => "Query not found"], 404);
    }

    public function show(string $id)
    {
        //
    }

    public function getBienBan(Request $request)
    {
        $filter = $this->filter->transform($request);
        $year = $request->y;
        if($data = $this->model->getBienBan($filter, $year))
        {
            return $data;
        }
        return response()->json(["Message" => "Login is continued"], 404);
    }

    public function update(UpdateBienBanRequest $request, string $id)
    {
        $this->model->updateBienBan($request, $id);
    }

    public function destroy(string $id)
    {
        //
    }
}
