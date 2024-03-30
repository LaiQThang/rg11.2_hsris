<?php

namespace App\Models\Api\V1;

use App\Models\Api\ApiModel;
use App\Models\baocaodetai;
use App\Models\ct_baocaosv;
use App\Models\ct_bienban;
use App\Helpers\GoogleDrive;
use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CTBaoCaoSVModel extends ApiModel
{
    use HasFactory;

    public function addFileBaoCaoSV($request, $idSV)
    {
        
        if($request->hasFile('file') && $request->idBC != null && $idSV != null)
        {
            try{
                ct_baocaosv::create([
                    'idBC' => $request->idBC,
                    'fileTaiNguyen' => GoogleDrive::POST($request->file('file')),
                    'idSV' => $idSV
                ]);
                $baocao = baocaodetai::find($request->idBC);
                $baocao->update([
                    'tinhTrang' => 1
                ]);
                return true;
            }
            catch(Exception $e){
                return $e->getMessage();
            }
        }

        return false;
    }
}
