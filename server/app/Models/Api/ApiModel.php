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
}
