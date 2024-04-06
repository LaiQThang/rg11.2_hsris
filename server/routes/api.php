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
use App\Http\Controllers\Api\V1\StudentController;
use App\Http\Controllers\Api\V1\XetDuyetAdminController;
use App\Http\Controllers\Api\V1\ValidateViewController;
use App\Http\Controllers\Authentication\V1\AuthController;
use App\Models\Auth\GiangVien;
use App\Models\permission;
use App\Models\permission_detail;
use App\Models\permission_list;

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
    'middleware' => ['api'],
    'prefix' => 'v1'
], function(){
    Route::apiResource('/huongnghiencuu', HuongNghienCuuController::class)->middleware('permissionValidate:$2y$12$50Kh77IHlZdqrkjEkQAge.5F/vyjqS1jq4Sp5vkA3rGP.rJ3HquZa');
    Route::apiResource('/hncgiangvien', HNCGiangVienController::class)->middleware('permissionValidate:$2y$12$wkevJCZy7ONVtIBVf61N7.07Ork1PkejwVpNO695m3aRrQuFOkb5a');
    Route::apiResource('/students', SinhVienController::class)->middleware('permissionValidate:$2y$12$OJLdjBC8EUgIT714iTcGau1tU7VMGOJDcM1sP.7JR./ZH6IFaeE2C');
    Route::apiResource('/hncsinhvien', HNCSinhVienController::class)->middleware('permissionValidate:$2y$12$PHUw1QeMeMxb7oM307g1ZufPFWiGuD6UzRWfaFB1dN98KkATBJGr.');
    Route::apiResource('/detai', DeTaiController::class)->middleware('permissionValidate:$2y$12$wZT/l86iOWc1SsOrBy/kcOnADLOSUwwezNaVBIsVob8vgW./1RwYK');

    Route::post('/detai-giangvien', [DeTaiController::class, 'addDTGV'])->middleware('permissionValidate:$2y$12$/V4sHeKhG0PJJN20ZfeONOreDiwuQyMXazzGWzoylGFAagf1T.3Sy');
    Route::get('/detai-giangvien-xetduyet', [DeTaiController::class, 'listDTXetDuyet'])->middleware('permissionValidate:$2y$12$PWnvMf4J0EEkQNW1QmGdOe8tuRxMGZoUQ3a8WnEe2/gotnlwpFeGi');
    Route::post('/detai-giangvien-xetduyet-post', [DeTaiController::class, 'postDTXetDuyet'])->middleware('permissionValidate:$2y$12$PWnvMf4J0EEkQNW1QmGdOe8tuRxMGZoUQ3a8WnEe2/gotnlwpFeGi');

    Route::apiResource('/ct-detai', CTDeTaiController::class)->middleware('permissionValidate:$2y$10$TUlbFrlrcVR8E2ixnx.Xm.FnUrmMVDqeCXEi1n4imTWb9PL73XoY.');
    Route::get('/ct-detai-finally', [CTDeTaiController::class, 'getFinally']);

    Route::apiResource('/baocaodetai', BaoCaoDeTaiController::class)->middleware('permissionValidate:$2y$10$bSfE7Qp8GBCiN76zLX1wlejfV5MJkn2xUEKKqat6eKyEp9yWi9BK.');
    Route::get('/baocaodetai-listnhom', [BaoCaoDeTaiController::class, 'listnhom']);
    
    Route::apiResource('/ct-baocaosinhvien', CTBaoCaoSVController::class)->middleware('permissionValidate:$2y$10$JY/zgv5J/DMOm408H1LIve7mFVGNR4nOEM7Pu1yHBZ7pI9YWVh8lq');
    Route::apiResource('/ct-huongnghiencuu', CTHuongNghienCuuController::class)->middleware('permissionValidate:$2y$10$7M4SGokx1JeoRjVYa3jCz.1072XfgVGgSyTsKGUXlaxBLoC14P.Bi');
    Route::apiResource('/bienbanphancong', BienBanPhanCongController::class)->middleware('permissionValidate:$2y$10$6Z1Kj3j4A9XXBvzdINNcYuu1nmHbrfeR0LwFe5zNTGELRVD423dd2');
    Route::get('/bienbanphancong-get', [BienBanPhanCongController::class, 'getBienBan']);

    Route::apiResource('/giai-thuong', GiaiThuongController::class)->middleware('permissionValidate:$2y$10$o0.b7Zooi7BMZAcdB04FIOEQsGNPbhLa2Zwve4G4MosYOmpdoF99u');
    Route::get('/giai-thuong-sv', [GiaiThuongController::class, 'getGiaiThuongSV']);

    Route::post('students/bulk', [SinhVienController::class, 'bulkStore']);
    Route::get('giangvien', [GiangVienController::class, 'index']);

    Route::apiResource('/permission', permissionController::class)->middleware('permissionValidate:$2y$10$RqFak3XXAWlATKIu3MXGKub63m3CiF2CULS8i7iPKoF230lPJBi9a');

    Route::group([ 'middleware' => 'permissionValidate:$2y$10$EIbI0VE/W7Mf8yYZDN9kJux/K1G5dHKjxRVO4yICduD0MP9FayUcG', 'prefix' => 'xet-duyet'], function() {
        Route::get('list', [XetDuyetAdminController::class, 'list']);
        Route::post('update', [XetDuyetAdminController::class, 'update']);
    });

    Route::group(['middleware' => 'permissionValidate:$2y$10$FIfIxrogDOd7XlffDkkCO.3RDsmJ2Q/zNJvabgMoxFD2lbG8GtFSy', 'prefix' => 'hoidong'], function() {
        Route::post('/', [HoiDongController::class, 'store']);
        Route::get('/list', [HoiDongController::class, 'listCouncil']);
        Route::get('/list-teacher', [HoiDongController::class, 'listCouncilTeacher']);
        Route::get('/view-point', [HoiDongController::class, 'listCouncilPoint']);
        Route::get('/list-no-council', [HoiDongController::class, 'listNoCouncil']);
        Route::post('/point', [HoiDongController::class, 'pointCard']);
    });

    Route::group(['middleware' => 'permissionValidate:$2y$10$Ctbkibu2vvi08vLcPCovSuPBp5zOKKGIPg8JZN.qq.5SgwY9nb3ve','prefix' => 'nhanxet'], function() {
        Route::post('/', [NhanXetDeTaiController::class, 'store']);
        Route::get('/view', [NhanXetDeTaiController::class, 'viewStore']);
    });

    Route::group([
        'middleware' => 'permissionValidate:$2y$10$6d0H0zTcJrXxLsdfCWHRr.49Yzm0lwEsOLnMt1sVLVS4qe9W3.0uG',
        'prefix' => 'giaithuong']
        , function() {
        Route::post('/', [GiaiThuongController::class, 'updateCup']);
        Route::get('/tinhdiem', [GiaiThuongController::class, 'CalculatorPoint']);
        Route::post('/capnhatdiem', [GiaiThuongController::class, 'UpdatePoint']);
        Route::get('/list', [GiaiThuongController::class, 'ListCup']);
    });

    Route::group([
        'middleware' => ['api'],
        'prefix' => 'valit'
    ], function() {
        Route::get('/', [ValidateViewController::class, 'RegisterTopic']);
        Route::get('/research', [ValidateViewController::class, 'RegisterResearch']);
        Route::get('/researchTeacher', [ValidateViewController::class, 'Research']);
        Route::get('/report', [ValidateViewController::class, 'checkReport']);
    });

});

Route::group([
    'middleware' => ['api'],
    'prefix' => 'infoStudents'
], function() {
    Route::get('/', [StudentController::class, 'listStudents']);
    Route::get('/search', [StudentController::class, 'searchStudents']);
    Route::get('/info', [StudentController::class, 'infoStudents']);
});

Route::group([
    'middleware' => ['api'],
    'prefix' => 'infoTeacher'
], function() {
    Route::get('/', [GiangVienController::class, 'listTeachers']);
    Route::get('/info', [GiangVienController::class, 'infoTeacher']);
    Route::get('/search', [GiangVienController::class, 'searchTeacher']);
    Route::post('/add', [GiangVienController::class, 'addTeacher']);
    Route::post('/addbulk', [GiangVienController::class, 'addBulkTeacher']);
});
