<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// app/Models/PlantEncyclopedia.php
class PlantEncyclopedia extends Model
{
    protected $table = 'plant_recommendations';

    protected $fillable = [
        'plant_name',
        'local_name',
        'latin_name',
        'description',
        'ideal_season',
        'ideal_temp_range',
        'ideal_humidity_range',
        'ndvi_range',
        'evi_range',
        'harvest_duration',
        'image_url'
    ];
}
