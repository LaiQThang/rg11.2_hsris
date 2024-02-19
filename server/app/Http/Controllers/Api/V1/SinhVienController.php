<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\SinhVienCollection;
use App\Models\sinhvien;
use Illuminate\Http\Request;
use App\Http\Requests\V1\BulkStoreSinhvienRequest;
use App\Http\Requests\V1\StoreSinhVienRequest;
use App\Http\Requests\V1\UpdateSinhVienRequest;
use App\Http\Resources\V1\SinhVienResource;
use Illuminate\Support\Arr;
use Illuminate\Database\QueryException;
class SinhVienController extends Controller
{

    public function __construct() {
        $this->middleware('authorizationClassify');
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return new SinhVienCollection(sinhvien::paginate()->append($request->query()));
    }

    /**
     * Show the form for creating a new resource.
     */


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSinhVienRequest $request)
    {
        // dd(request());
        return new SinhVienResource(sinhvien::create($request->all())); 
    }

    public function bulkStore(BulkStoreSinhvienRequest $request){
        // dd($request);
        // DB::listen(function (QueryExecuted $query) {
        //     dd($query->sql);
        //     });

        $bulk = collect($request->all())->map(function($arr, $key){
            return Arr::except($arr, ['name', 'sex', 'passWord', 'status', 'avatar', 'favorite', 'idCard', 'phone', 'address', 'birthday', 'class', 'code',]);
        });
        
        // dd($bulk->toArray());

        $result = sinhvien::insert($bulk->toArray());
        
        if($result == true){
            return response()->json(['message' => 'Success', 'status' => 200], 200);
        }
        else{
            return response()->json(['message' => 'Error', 'status' => 500], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        return  SinhVienResource::make(sinhvien::find($id));
    }

    /**
     * Show the form for editing the specified resource.
     */


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSinhVienRequest $request, string $id)
    {
        try{
            sinhvien::find($id)->update($request->all());
            return response()->json(['message' => 'Success', 'status' => 200], 200);
        } catch(QueryException $e){
            return response()->json(['message' => 'Error', 'status' => 500], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
