<?php

use App\Http\Controllers\Api\V1\HNCGiangVienController;
use App\Http\Controllers\Api\V1\HuongNghienCuuController;
use App\Http\Controllers\Api\V1\SinhVienController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'prefix' => 'v1'
], function(){
    Route::apiResource('/huongnghiencuu', HuongNghienCuuController::class);
    Route::apiResource('/hncgiangvien', HNCGiangVienController::class);
    Route::apiResource('/students', SinhVienController::class);

    Route::post('students/bulk', [SinhVienController::class, 'bulkStore']);
});

