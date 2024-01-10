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
        Schema::create('baocaodetais', function (Blueprint $table) {
            $table->uuid('idBC')->primary();
            $table->string('tenBC');
            $table->string('ngayLap');
            $table->string('ngayKetThuc');
            $table->integer('tinhTrang')->nullable();
            $table->string('ghiChu')->nullable();
            $table->uuid('idGV')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('baocaodetais');
    }
};
