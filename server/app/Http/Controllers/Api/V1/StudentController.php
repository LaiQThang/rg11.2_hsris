<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\sinhvien;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\SinhVienCollection;

class StudentController extends Controller
{
    public function listStudents()
    {
        return new SinhVienCollection(sinhvien::all());
    }

    public function infoStudents()
    {
        dd(123);
    }
}
