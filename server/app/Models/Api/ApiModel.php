<?php

namespace App\Models\Api;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApiModel extends Model
{
    use HasFactory;

    public function ApiResponse($array) 
    {
        return [
            'data' => $array
        ];
    }

    public function getidSV() 
    {
        $user = auth('apiStudent')->user();
        if($user != null)
        {
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
}
