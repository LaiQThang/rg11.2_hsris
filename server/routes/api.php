<?php

use App\Http\Controllers\Api\V1\BaoCaoDeTaiController;
use App\Http\Controllers\Api\V1\BienBanPhanCongController;
use App\Http\Controllers\Api\V1\CTBaoCaoSVController;
use App\Http\Controllers\Api\V1\CTDeTaiController;
use App\Http\Controllers\Api\V1\CTHuongNghienCuuController;
use App\Http\Controllers\Api\V1\DeTaiController;
use App\Http\Controllers\Api\V1\GiaiThuongController;
use App\Http\Controllers\Api\V1\GiangVienController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\SinhVienController;
use App\Http\Controllers\Api\V1\HNCGiangVienController;
use App\Http\Controllers\Api\V1\HNCSinhVienController;
use App\Http\Controllers\Api\V1\HoiDongController;
use App\Http\Controllers\Api\V1\HuongNghienCuuController;
use App\Http\Controllers\Api\V1\NhanXetDeTaiController;
use App\Http\Controllers\Api\V1\permissionController;
use App\Http\Controllers\Api\V1\XetDuyetAdminController;
use App\Http\Controllers\Authentication\V1\AuthController;
use App\Models\permission;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('profile-me', [AuthController::class, 'profile']);
    Route::post('update-profile', [AuthController::class, 'updateProfile']);
});

Route::group([
    'middleware' => ['api', 'bearerValidate'],
    'prefix' => 'v1'
], function(){
    Route::apiResource('/huongnghiencuu', HuongNghienCuuController::class);
    Route::apiResource('/hncgiangvien', HNCGiangVienController::class);
    Route::apiResource('/students', SinhVienController::class);
    Route::apiResource('/hncsinhvien', HNCSinhVienController::class);
    Route::apiResource('/detai', DeTaiController::class);

    Route::post('/detai-giangvien', [DeTaiController::class, 'addDTGV']);
    Route::get('/detai-giangvien-xetduyet', [DeTaiController::class, 'listDTXetDuyet']);
    Route::post('/detai-giangvien-xetduyet-post', [DeTaiController::class, 'postDTXetDuyet']);

    Route::apiResource('/ct-detai', CTDeTaiController::class);
    Route::get('/ct-detai-finally', [CTDeTaiController::class, 'getFinally']);

    Route::apiResource('/baocaodetai', BaoCaoDeTaiController::class);
    Route::get('/baocaodetai-listnhom', [BaoCaoDeTaiController::class, 'listnhom']);
    
    Route::apiResource('/ct-baocaosinhvien', CTBaoCaoSVController::class);
    Route::apiResource('/ct-huongnghiencuu', CTHuongNghienCuuController::class);
    Route::apiResource('/bienbanphancong', BienBanPhanCongController::class);
    Route::get('/bienbanphancong-get', [BienBanPhanCongController::class, 'getBienBan']);

    Route::apiResource('/giai-thuong', GiaiThuongController::class);
    Route::get('/giai-thuong-sv', [GiaiThuongController::class, 'getGiaiThuongSV']);

    Route::post('students/bulk', [SinhVienController::class, 'bulkStore']);
    Route::get('giangvien', [GiangVienController::class, 'index']);

    Route::apiResource('/permission', permissionController::class);

    Route::group(['prefix' => 'xet-duyet'], function() {
        Route::get('list', [XetDuyetAdminController::class, 'list']);
        Route::post('update', [XetDuyetAdminController::class, 'update']);
    });

    Route::group(['prefix' => 'hoidong'], function() {
        Route::post('/', [HoiDongController::class, 'store']);
        Route::get('/list', [HoiDongController::class, 'listCouncil']);
        Route::get('/list-teacher', [HoiDongController::class, 'listCouncilTeacher']);
        Route::get('/view-point', [HoiDongController::class, 'listCouncilPoint']);
        Route::get('/list-no-council', [HoiDongController::class, 'listNoCouncil']);
        Route::post('/point', [HoiDongController::class, 'pointCard']);
    });

    Route::group(['prefix' => 'nhanxet'], function() {
        Route::post('/', [NhanXetDeTaiController::class, 'store']);
        Route::get('/view', [NhanXetDeTaiController::class, 'viewStore']);
    });

    Route::group(['prefix' => 'giaithuong'], function() {
        Route::post('/', [GiaiThuongController::class, 'updateCup']);
        Route::get('/tinhdiem', [GiaiThuongController::class, 'CalculatorPoint']);
        Route::post('/capnhatdiem', [GiaiThuongController::class, 'UpdatePoint']);
        Route::get('/list', [GiaiThuongController::class, 'ListCup']);
    });

});



