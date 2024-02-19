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
        Schema::create('bienbanphancongs', function (Blueprint $table) {
            $table->uuid('idBB')->primary();
            $table->string('tenBB');
            $table->date('ngayLap');
            $table->string('noiDung')->nullable();
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
        Schema::dropIfExists('bienbanphancongs');
    }
};
