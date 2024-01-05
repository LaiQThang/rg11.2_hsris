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
        Schema::create('phieudiems', function (Blueprint $table) {
            $table->uuid('idPD')->primary();
            $table->string('tenPD');
            $table->date('ngayLap');
            $table->uuid('idGV')->nullable();
            $table->uuid('idDT')->nullable();
            $table->uuid('idHD')->nullable();
            $table->float('diem');
            $table->boolean('delete')->nullable();
            $table->string('ghiChu')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('phieudiems');
    }
};
