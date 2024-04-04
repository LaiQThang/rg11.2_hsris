<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\GiangVienCollection;
use App\Models\Api\V1\GiangVienModel;
use App\Models\giangvien;
use Exception;
use Illuminate\Http\Request;

class GiangVienController extends Controller
{
    private $giangvien;
    public function __construct(GiangVienModel $gv) 
    {
        $this->giangvien = $gv;
    }

    public function index()
    {
        try{
            return response($this->ApiResponse(giangvien::all(['idGV', 'tenGV'])));
        }
        catch(Exception $e){
            return response()->json(['message' => 'Error query'], 500);
        }
    }

    public function listStudents()
    {
        return new GiangVienCollection(giangvien::all());
    }
}
