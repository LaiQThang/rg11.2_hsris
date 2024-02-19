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
        Schema::create('ct_baocaosv', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('idBC')->nullable();
            $table->uuid('idSV')->nullable();
            $table->string('fileTaiNguyen');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ct_baocaosv');
    }
};
