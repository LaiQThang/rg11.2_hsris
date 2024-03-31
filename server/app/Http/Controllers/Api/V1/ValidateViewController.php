<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\ct_hnc;
use Illuminate\Http\Request;

class ValidateViewController extends Controller
{
    public function RegisterTopic()
    {
        $idSV = $this->getidSV();
        $cthnc = ct_hnc::where('idSV', $idSV)->whereYear('dateCreate', date('Y'))->get()->toArray();
        if(!empty($cthnc))
        {
            return true;
        }
        return false;
    }
}
