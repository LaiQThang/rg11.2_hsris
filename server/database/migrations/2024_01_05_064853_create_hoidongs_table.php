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
        Schema::create('hoidongs', function (Blueprint $table) {
            $table->uuid('idHD')->primary();
            $table->string('tenHD');
            $table->integer('soLuong')->nullable();
            $table->date('ngayTao');
            $table->date('ngayCham')->nullable();
            $table->string('diaDiem')->nullable();
            $table->boolean('delete');
            $table->string('ghiChu')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hoidongs');
    }
};
