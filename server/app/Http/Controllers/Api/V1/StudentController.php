<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\sinhvien;
use Illuminate\Http\Request;
use App\Filters\V1\SinhVienFilter;
use App\Http\Controllers\Controller;
use App\Http\Requests\V1\StoreSinhVienRequest;
use App\Http\Resources\V1\DeTaiCollection;
use App\Http\Resources\V1\SinhVienCollection;
use App\Http\Resources\V1\SinhVienResource;
use App\Models\detai;

class StudentController extends Controller
{
    private $filter;
    public function __construct(SinhVienFilter $filter) {
        $this->filter = $filter;
    }
    public function listStudents()
    {
        return new SinhVienCollection(sinhvien::all());
    }

    public function searchStudents(Request $request)
    {
        $filterItems = $this->filter->transform($request);
        $student = sinhvien::where($filterItems)->get();
        return new SinhVienCollection($student);
    }

    public function infoStudents()
    {
        try{
            $idSV = request()->id;
            if($idSV === null) 
            {
                return response()->json(['Message' => 'Param id is required'], 500);
            }
            $array = [];

            $student = sinhvien::find($idSV);
            $array['student'] = $student;

            $detai = $student->detailsDeTai()->with('HNC', 'giaiThuong')->get();
            $array['data'] = $detai;
            
            return response()->json([
                "student" => new SinhVienResource($array['student']),
                "topic" => new DeTaiCollection($array['data']),
            ]);
        } catch(\Exception $e){
            return response()->json([
                "Message" => $e,
                "Status" => 500
            ], 500);
        }
    }

    public function editStudents(StoreSinhVienRequest $request)
    {
        try{
            $student = sinhvien::find($request->id);
            if(!empty($student))
            {
                $student->update($request->all());
                return response()->json(['message' => 'Success', 'status' => 200], 200);
            }
            return response()->json(['message' => 'Student null', 'status' => 500], 500);

        } catch(\Exception $e){
            return response()->json(['message' => $e->getMessage(), 'status' => 500], 500);
        }
    }
}
