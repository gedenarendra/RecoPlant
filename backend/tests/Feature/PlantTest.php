<?php

namespace Tests\Feature;

use App\Models\PlantEncyclopedia;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PlantTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test fetching the plant encyclopedia list.
     */
    public function test_user_can_retrieve_plant_encyclopedia(): void
    {
        // Seed a sample plant record
        PlantEncyclopedia::create([
            'plant_name'           => 'Rice',
            'local_name'           => 'Padi',
            'latin_name'           => 'Oryza sativa',
            'description'          => 'Tanaman pangan utama.',
            'ideal_season'         => 'Musim Hujan',
            'ideal_temp_range'     => '22-30°C',
            'ideal_humidity_range' => '70-85%',
            'ndvi_range'           => '0.5-0.85',
            'evi_range'            => '0.35-0.65',
            'harvest_duration'     => '110-130 hari',
            'image_url'            => 'http://example.com/rice.png',
        ]);

        $response = $this->getJson('/api/plants');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'status',
            'data' => [
                '*' => [
                    'id',
                    'nama_komoditas_inggris',
                    'nama_lokal',
                    'nama_latin',
                    'deskripsi_umum',
                    'musim_tanam_ideal',
                    'suhu_udara_ideal',
                    'kelembaban_lingkungan_ideal',
                    'rentang_nilai_ndvi',
                    'rentang_nilai_evi',
                    'estimasi_durasi_panen',
                    'url_gambar',
                ]
            ]
        ]);

        $response->assertJsonFragment([
            'status' => 'success',
            'nama_komoditas_inggris' => 'Rice',
            'nama_lokal' => 'Padi',
            'nama_latin' => 'Oryza sativa',
            'url_gambar' => 'http://example.com/rice.png',
        ]);
    }
}
