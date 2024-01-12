<?php

namespace App\Models\V1;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\QueryException;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class HNCSinhVienModel extends Model
{
    use HasFactory;

    public function addHNCSinhVien($request) : bool
    {
        try{
            $this->create($request->all());
            return true;
        }
        catch(QueryException $e){
            return false;
        }
    }
}
