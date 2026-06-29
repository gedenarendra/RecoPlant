<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\PlantEncyclopedia;

class PlantEncyclopediaSeeder extends Seeder
{
    // database/seeders/PlantEncyclopediaSeeder.php
    public function run(): void
    {
        $plants = [
            [
                'plant_name'           => 'Rice',       // exact match output model
                'local_name'           => 'Padi',
                'latin_name'           => 'Oryza sativa',
                'description'          => 'Tanaman pangan utama di Asia Tenggara. Tumbuh optimal di lahan sawah dengan ketersediaan air yang cukup. Membutuhkan curah hujan tinggi dan suhu hangat sepanjang musim tanam.',
                'ideal_season'         => 'Musim Hujan',
                'ideal_temp_range'     => '22-30°C',
                'ideal_humidity_range' => '70-85%',
                'ndvi_range'           => '0.5-0.85',
                'evi_range'            => '0.35-0.65',
                'harvest_duration'     => '110-130 hari',
            ],
            [
                'plant_name'           => 'Maize',
                'local_name'           => 'Jagung',
                'latin_name'           => 'Zea mays',
                'description'          => 'Tanaman serealia yang adaptif terhadap berbagai kondisi lahan. Digunakan sebagai pangan, pakan ternak, dan bahan baku industri. Membutuhkan drainase yang baik dan sinar matahari penuh.',
                'ideal_season'         => 'Musim Kemarau - Peralihan',
                'ideal_temp_range'     => '21-30°C',
                'ideal_humidity_range' => '50-75%',
                'ndvi_range'           => '0.45-0.80',
                'evi_range'            => '0.30-0.60',
                'harvest_duration'     => '90-110 hari',
            ],
            [
                'plant_name'           => 'Wheat',
                'local_name'           => 'Gandum',
                'latin_name'           => 'Triticum aestivum',
                'description'          => 'Tanaman serealia musim dingin yang membutuhkan suhu rendah untuk vernalisasi. Cocok untuk lahan kering dengan curah hujan sedang. Merupakan bahan baku utama industri tepung dan roti.',
                'ideal_season'         => 'Musim Dingin – Semi',
                'ideal_temp_range'     => '10–24°C',
                'ideal_humidity_range' => '40–65%',
                'ndvi_range'           => '0.4–0.75',
                'evi_range'            => '0.25–0.55',
                'harvest_duration'     => '120–150 hari',
            ],
            [
                'plant_name'           => 'Cotton',
                'local_name'           => 'Kapas',
                'latin_name'           => 'Gossypium hirsutum',
                'description'          => 'Tanaman industri penghasil serat alami. Membutuhkan musim panas yang panjang dan kering saat periode pembentukan boll. Sensitif terhadap frost dan genangan air.',
                'ideal_season'         => 'Musim Panas - Kemarau',
                'ideal_temp_range'     => '25-35°C',
                'ideal_humidity_range' => '40-60%',
                'ndvi_range'           => '0.35-0.70',
                'evi_range'            => '0.25-0.50',
                'harvest_duration'     => '150-180 hari',
            ],
            [
                'plant_name'           => 'Sugarcane',
                'local_name'           => 'Tebu',
                'latin_name'           => 'Saccharum officinarum',
                'description'          => 'Tanaman industri penghasil gula dan bioetanol. Membutuhkan periode panas panjang dan air berlimpah saat vegetatif, lalu kondisi kering saat pemasakan untuk memaksimalkan kadar sukrosa.',
                'ideal_season'         => 'Sepanjang Tahun (Tropis)',
                'ideal_temp_range'     => '24-38°C',
                'ideal_humidity_range' => '60-80%',
                'ndvi_range'           => '0.55-0.90',
                'evi_range'            => '0.40-0.70',
                'harvest_duration'     => '10-18 bulan',
            ],
        ];

        foreach ($plants as $plant) {
            PlantEncyclopedia::updateOrCreate(
                ['plant_name' => $plant['plant_name']],  // cari berdasarkan ini
                $plant                                   // update/insert dengan ini
            );
        }
    }
}
