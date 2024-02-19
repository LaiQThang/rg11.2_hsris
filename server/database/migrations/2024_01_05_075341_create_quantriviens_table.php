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
        Schema::create('quantriviens', function (Blueprint $table) {
            $table->uuid('idQTV')->primary();
            $table->string('tenQTV');
            $table->date('ngaySinh')->nullable();
            $table->string('email');
            $table->string('soDienThoai')->nullable();
            $table->string('diaChi')->nullable();
            $table->binary('gioiTinh')->nullable();
            $table->string('passWord');
            $table->uuid('permissionId')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quantriviens');
    }
};
