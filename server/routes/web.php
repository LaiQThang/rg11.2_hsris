<?php

use App\Models\ct_hncgv;
use App\Models\giangvien;
use App\Models\huongnghiencuu;
use App\Models\permission;
use App\Models\permission_detail;
use App\Models\permission_list;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/postdata', function(){
    // try{
        huongnghiencuu::create([
            'tenHNC' => 'Lập trình web',
            'ngayTao' => now(),
            'soLuong' => random_int(1, 10),
            'tomTat' => Str::random(10),
            'mucTieu' => Str::random(10),
            'phamVi' => Str::random(10),
            'delete' => false,
            'ghiChu' => null
        ]);
        $result = App\Models\huongnghiencuu::all()->toArray();
        dd($result);
    // }
    // catch(\Exception $e){
    //     dd($e->getMessage());
    // }
});


Route::get('/postgv', function(){
    // try{
        $randT = mt_rand(strtotime('2000-01-01'), strtotime(now()));
        giangvien::create([
            'maGV' => mt_rand(10000, 99999),
            'tenGV' => 'Nguyễn Thị Quỳnh Như',
            'anhDD' => null,
            'ngaySinh' => Carbon::createFromTimestamp($randT),
            'email' => 'thang@gmail.com',
            'soDT' => null,
            'diaChi' => null,
            'gioiTinh' => mt_rand(0,1),
            'trinhDo' => null,
            'chuyenNganh' => null,
            'delete' => false,
            'matKhau' => Hash::make('thang0308'),
            'permissionId'=> null,
        ]);
        $result = App\Models\giangvien::all()->toArray();
        dd($result);
    // }
    // catch(\Exception $e){
    //     dd($e->getMessage());
    // }
});

Route::get('/postctgv', function(){
    // try{
        ct_hncgv::create([
            'idHNC' => '8c60bb01-7e98-49bd-a95c-a6eb71c2c753',
            'idGV' => '93fa57b8-7147-4568-9b73-d59dcee1897b',
        ]);
        $result = App\Models\ct_hncgv::all()->toArray();
        dd($result);
        // Auth::attempt();
        // Auth::user();
    // }
    // catch(\Exception $e){
    //     dd($e->getMessage());
    // }
});

Route::get('/postpermission', function(){
    // try{
        permission::create([
            'tenQuyen' => Str::random(10),
            'ghiChu' => null,
        ]);
        $result = App\Models\permission::all()->toArray();
        dd($result);
    // }
    // catch(\Exception $e){
    //     dd($e->getMessage());
    // }
});

Route::get('/postpermission2', function(){
        // permission_list::create([
        //     'tenQuyen' => Str::random(10),
        //     'tokenBase' => Hash::make(\Ramsey\Uuid\Uuid::uuid4()->toString()),
        // ]);
        $result = App\Models\permission_list::all()->toArray();
        dd($result);
});

Route::get('/postpermission3', function(){
    // permission_detail::create([
    //     'permission_id' => '7fb1b312-1841-45ef-8f82-c572a08b2410',
    //     'permission_list_id' => 'b89282d1-0456-4ae0-85fb-a5af5e21b03f'
    // ]);
    $result = App\Models\permission_detail::all()->toArray();
    dd($result);
});