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
        Schema::create('huongnghiencuus', function (Blueprint $table) {
            $table->uuid('idHNC')->primary();
            $table->string('tenHNC');
            $table->date('ngayTao');
            $table->integer('soLuong')->nullable();
            $table->string('tomTat')->nullable();
            $table->string('mucTieu')->nullable();
            $table->string('phamVi')->nullable();
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
        Schema::dropIfExists('huongnghiencuus');
    }
};
