<?php

namespace App\Http\Controllers;

use Exception;
use ErrorException;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    // public $idSV;

    // public function __construct() {
    //     $this->idSV = auth('apiStudent')->user()->idSV;
    //         dd($this->idSV);

    // }

    public function getidSV() 
    {
        $user = auth('apiStudent')->user();
        if($user != null){
            // dd($user->idSV);
            return $user->idSV;
        }
        
        return false;
    }
}
