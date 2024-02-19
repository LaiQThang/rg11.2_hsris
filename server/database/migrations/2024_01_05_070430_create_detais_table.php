<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('detais', function (Blueprint $table) {
            $table->uuid('idDT')->primary();
            $table->string('tenDT');
            $table->string('tomTat')->nullable();
            $table->string('mucTieu')->nullable();
            $table->string('phamVi')->nullable();
            $table->string('nhanXet')->nullable();
            $table->date('ngayLap');
            $table->date('ngayHoanThanh')->nullable();
            $table->uuid('idGV')->nullable();
            $table->uuid('idHNC')->nullable();
            $table->uuid('idHD')->nullable();
            $table->string('diemF')->nullable();
            $table->uuid('idGT')->nullable();
            $table->integer('trangThaiGV')->nullable();
            $table->integer('trangThaiQT')->nullable();
            $table->boolean('delete')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detais');
    }
};
