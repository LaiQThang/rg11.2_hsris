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
        Schema::create('giangviens', function (Blueprint $table) {
            $table->uuid('idGV')->primary();
            $table->string('maGV');
            $table->string('tenGV');
            $table->string('anhDD')->nullable();
            $table->date('ngaySinh');
            $table->string('email')->nullable();
            $table->string('soDT')->nullable();
            $table->string('diaChi')->nullable();
            $table->binary('gioiTinh');
            $table->string('trinhDo')->nullable();
            $table->string('chuyenNganh')->nullable();
            $table->boolean('delete');
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
        Schema::dropIfExists('giangviens');
    }
};
