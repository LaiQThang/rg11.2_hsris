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
        Schema::create('nhanxetbaocaos', function (Blueprint $table) {
            $table->uuid('idNX')->primary();
            $table->string('tenNX');
            $table->date('ngayLap');
            $table->string('nhanXet');
            $table->string('ghiChu')->nullable();
            $table->uuid('idGV')->nullable();
            $table->uuid('idBC')->nullable();
            $table->string('fileTaiNguyen')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nhanxetbaocaos');
    }
};
