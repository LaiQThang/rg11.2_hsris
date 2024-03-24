<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Api\V1\XetDuyetAdminModel;
use Illuminate\Http\Request;

class XetDuyetAdminController extends Controller
{
    private $model;
    public function __construct(XetDuyetAdminModel $xd) {
        $this->model = $xd;
    }

    public function list()
    {
        $this->model->list();
    }
}
