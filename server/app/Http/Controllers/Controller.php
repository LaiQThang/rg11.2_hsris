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

    public function getidGV()
    {
        $user = auth('apiTeacher')->user();
        if($user != null)
        {
            return $user->idGV;
        }
        return false;
    }

    public function ApiResponse($array) 
    {
        return [
            'data' => $array
        ];
    }
}
