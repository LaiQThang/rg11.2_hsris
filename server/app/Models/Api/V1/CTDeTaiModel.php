<?php

namespace App\Models\Api\V1;

use App\Models\Api\ApiModel;
use App\Models\ct_detai;
use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CTDeTaiModel extends ApiModel
{
    use HasFactory;

    public function addCTDeTai($idUser, $idDT) : bool
    {
        try{
            ct_detai::create([
                'idSV' => $idUser,
                'idDT' => $idDT
            ]);
            return true;
        }
        catch(Exception $e){
            return false;
        }
    }
    public function deleteCTDeTai($idUser, $id) : bool
    {
        try{
            $res = ct_detai::find($id, ['idSV']);
            if($res->idSV != null && $res->idSV == $idUser){
                ct_detai::destroy($id);
                return true;
            }
            return false;
        }
        catch(Exception $e){
            return false;
        }
    }
}
