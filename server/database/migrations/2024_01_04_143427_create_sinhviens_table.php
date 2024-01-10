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
        Schema::create('sinhviens', function (Blueprint $table) {
            $table->uuid('idSV')->primary();
            $table->string('maSV');
            $table->string('tenSV');
            $table->string('anhDD')->nullable();
            $table->string('lopHC');
            $table->integer('tinhTrang');
            $table->string('soThich')->nullable();
            $table->date('ngaySinh');
            $table->string('soCCCD')->nullable();
            $table->string('soDT')->nullable();
            $table->string('email')->nullable();
            $table->binary('gioiTinh');
            $table->string('diaChi')->nullable();
            $table->boolean('delete')->nullable();
            $table->string('matKhau');
            $table->uuid('permissionId')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sinhviens');
    }
};
