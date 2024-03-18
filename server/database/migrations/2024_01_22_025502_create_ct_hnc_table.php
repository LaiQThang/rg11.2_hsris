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
        Schema::create('ct_hnc', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('idSV')->nullable();
            $table->uuid('idGV')->nullable();
            $table->uuid('idHNC')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ct_hnc');
    }
};
