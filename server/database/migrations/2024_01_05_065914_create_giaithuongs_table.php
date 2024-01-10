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
        Schema::create('giaithuongs', function (Blueprint $table) {
            $table->uuid('idGT')->primary();
            $table->string('tenGiai');
            $table->string('giaTriGiai')->nullable();
            $table->date('ngayLap');
            $table->string('moTa')->nullable();
            $table->boolean('delete')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('giaithuongs');
    }
};
