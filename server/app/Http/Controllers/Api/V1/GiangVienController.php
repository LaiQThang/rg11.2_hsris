<?php

namespace App\Http\Controllers\Api\V1;

use Exception;
use App\Models\sinhvien;
use App\Models\giangvien;
use Illuminate\Http\Request;
use App\Filters\V1\GiangVienFilter;
use App\Http\Controllers\Controller;
use App\Models\Api\V1\GiangVienModel;
use App\Http\Resources\V1\DeTaiCollection;
use App\Http\Resources\V1\GiangVienCollection;
use App\Http\Requests\V1\StoreGiangVienRequest;
use App\Http\Resources\V1\GiangVienClientResource;
use App\Http\Requests\V1\BulkStoreGiangVienRequest;
use App\Http\Resources\V1\HuongNghienCuuCollection;
use Illuminate\Support\Arr;

class GiangVienController extends Controller
{
    private $giangvien;
    private $filter;
    public function __construct(GiangVienModel $gv, GiangVienFilter $filter) 
    {
        $this->giangvien = $gv;
        $this->filter = $filter;
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

    public function listTeachers()
    {
        return new GiangVienCollection(giangvien::all());
    }

    public function infoTeacher()
    {
        try{
            $idGV = request()->id;
            if($idGV === null) 
            {
                return response()->json(['Message' => 'Param id is required'], 500);
            }
            $array = [];

            $teacher = giangvien::find($idGV);
            $array['teacher'] = $teacher;

            $detai = $teacher->deTai()->with('HNC', 'giaiThuong')->get();
            $array['topic'] = $detai;
            
            $hnc = $teacher->giangVien_CTHNCGV()->with('deTai')->get();
            $array['research'] = $hnc;

            return response()->json([
                "teacher" => new GiangVienClientResource($array['teacher']),
                "topic" => new DeTaiCollection($array['topic']),
                "research" => new HuongNghienCuuCollection($array['research']),
            ]);
        } catch(\Exception $e){
            return response()->json([
                "Message" => $e,
                "Status" => 500
            ], 500);
        }
    }

    public function searchTeacher(Request $request)
    {
        $filterItems = $this->filter->transform($request);
        $teacher = giangvien::where($filterItems)->get();
        return new GiangVienCollection($teacher);
    }

    public function addTeacher(StoreGiangVienRequest $request)
    {
        return new GiangVienClientResource(giangvien::create($request->all()));
    }

    public function addBulkTeacher(BulkStoreGiangVienRequest $request)
    {
        $bulk = collect($request->all())->map(function($arr, $key){
            return Arr::except($arr, ['name', 'sex', 'passWord', 'avatar', 'phone', 'address', 'birthday', 'code',]);
        });
        
        $result = giangvien::insert($bulk->toArray());
        
        if($result == true){
            return response()->json(['message' => 'Success', 'status' => 200], 200);
        }
        else{
            return response()->json(['message' => 'Error', 'status' => 500], 500);
        }
    }

    public function editTeacher(StoreGiangVienRequest $request)
    {
        try{
            $teacher = giangvien::find($request->id_GV);
            if(!empty($teacher))
            {
                $teacher->update($request->all());
                return response()->json(['message' => 'Success', 'status' => 200], 200);
            }
            return response()->json(['message' => 'Teacher null', 'status' => 500], 500);

        } catch(\Exception $e){
            return response()->json(['message' => $e->getMessage(), 'status' => 500], 500);
        }
    }
}
