<?php

namespace App\Models\Api\V1;

use App\Models\Api\ApiModel;
use App\Models\ct_hnc;
use App\Models\ct_hncgv;
use App\Models\ct_hncsv;
use App\Models\huongnghiencuu;
use App\Models\sinhvien;
use Illuminate\Database\QueryException;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class HNCSinhVienModel extends ApiModel 
{
    use HasFactory;

    public function addHNCSinhVien($request) : bool
    {
        
        try{
            $res = ct_hnc::where([['idHNC', $request->idHNC], ['idSV', null]]);
            // dd(ct_hncgv::where('idHNC', $request->idHNC)->first('idGV')->toArray()["idGV"]);

            if($res->get()->toArray() === []){
                $arr = [
                    'idHNC' => $request->idHNC,
                    'idGV' => ct_hncgv::where('idHNC', $request->idHNC)->first('idGV')->toArray()["idGV"],
                    'idSV' => $request->idSV,
                    'dateCreate' => now()->format('Y-m-d')
                ];
                ct_hnc::create($arr);
            }
            else{
                $res->update([
                    'idSV' => $request->idSV,
                    'dateCreate' => now()->format('Y-m-d')
                ]);
            }
            ct_hncsv::create($request->all());
            return true;
        }
        catch(QueryException $e){
            return false;
        }
    }

    public function showHNCSinhVien($year, $idSV) : array
    {
        $student = sinhvien::find($idSV);
        // dd($student);
        $researchStudent = $student->historyResearchStudent()->whereYear('ngayTao', $year)->get();
        // dd($researchStudent->toArray());
        return $researchStudent->toArray();
    }

    public function deleteHNCSinhVien($id)
    {
        try{
            $check = ct_hncsv::find($id);
            if(empty($check)){
                return false;
            }
            ct_hncsv::destroy($id);
            return true;
        }
        catch(QueryException $e){
            return false;
        }
    }
}
