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
        Schema::create('plant_recommendations', function (Blueprint $table) {
        $table->id();
        $table->string('plant_name')->unique();
        $table->string('local_name');
        $table->string('latin_name');
        $table->text('description');
        $table->string('ideal_season');
        $table->string('ideal_temp_range');
        $table->string('ideal_humidity_range');
        $table->string('ndvi_range');
        $table->string('evi_range');
        $table->string('harvest_duration');
        $table->string('image_url')->nullable();
        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Pastikan saat rollback juga menghapus tabel yang benar
        Schema::dropIfExists('plant_recommendations');
    }
};
