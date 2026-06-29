<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PlantResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nama_komoditas_inggris' => $this->plant_name,
            'nama_lokal' => $this->local_name,
            'nama_latin' => $this->latin_name,
            'deskripsi_umum' => $this->description,
            'musim_tanam_ideal' => $this->ideal_season,
            'suhu_udara_ideal' => $this->ideal_temp_range,
            'kelembaban_lingkungan_ideal' => $this->ideal_humidity_range,
            'rentang_nilai_ndvi' => $this->ndvi_range,
            'rentang_nilai_evi' => $this->evi_range,
            'estimasi_durasi_panen' => $this->harvest_duration,
            'url_gambar' => $this->image_url,
        ];
    }
}