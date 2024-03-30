<?php

namespace App\Models\Api\V1;

use App\Models\giangvien;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GiangVienModel extends Model
{
    use HasFactory;

    public function getAllGV()
    {
        $res = giangvien::all();
        dd($res);
    }
}
