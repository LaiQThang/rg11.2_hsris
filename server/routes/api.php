<?php

use App\Http\Controllers\Api\V1\BaoCaoDeTaiController;
use App\Http\Controllers\Api\V1\CTBaoCaoSVController;
use App\Http\Controllers\Api\V1\CTDeTaiController;
use App\Http\Controllers\Api\V1\DeTaiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\SinhVienController;
use App\Http\Controllers\Api\V1\HNCGiangVienController;
use App\Http\Controllers\Api\V1\HNCSinhVienController;
use App\Http\Controllers\Api\V1\HuongNghienCuuController;
use App\Http\Controllers\Authentication\V1\AuthController;

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
    Route::patch('update-profile/{id}', [AuthController::class, 'updateProfile']);
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'v1'
], function(){
    Route::apiResource('/huongnghiencuu', HuongNghienCuuController::class);
    Route::apiResource('/hncgiangvien', HNCGiangVienController::class);
    Route::apiResource('/students', SinhVienController::class)->middleware(['authorizationClassify', 'validatePermission']);
    Route::apiResource('/hncsinhvien', HNCSinhVienController::class);
    Route::apiResource('/detai', DeTaiController::class);
    Route::apiResource('/ct-detai', CTDeTaiController::class);
    Route::apiResource('/baocaodetai', BaoCaoDeTaiController::class);
    Route::apiResource('/ct-baocaosinhvien', CTBaoCaoSVController::class);

    Route::post('students/bulk', [SinhVienController::class, 'bulkStore']);
});



