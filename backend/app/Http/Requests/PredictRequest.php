<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PredictRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'NDVI'           => 'required|numeric|between:-1,1',
            'NDWI'           => 'required|numeric|between:-1,1',
            'EVI'            => 'required|numeric|between:-2,2',
            'Red'            => 'required|numeric|between:0,3500',
            'Green'          => 'required|numeric|between:0,2500',
            'NIR'            => 'required|numeric|between:1000,5000',
            'SWIR'           => 'required|numeric|between:0,4500',
            'NIR_SWIR_ratio' => 'required|numeric|between:-10,10',
            'Red_NIR_ratio'  => 'required|numeric|between:0,10',
            'DOY_sin'        => 'required|numeric|between:-1,1',
            'DOY_cos'        => 'required|numeric|between:-1,1',
            'Season_enc'     => 'required|integer|in:0,1',
            'Month'          => 'required|integer|between:1,12',
            'Stage_enc'      => 'required|integer|between:-1,7',
            'Latitude'       => 'required|numeric|between:24,36',
            'Longitude'      => 'required|numeric|between:64,75',
            'Cluster'        => 'required|integer|in:0,1',
            'Cluster_K4'     => 'required|integer|in:0,1,2,3',
        ];
    }

    public function messages(): array
    {
        return [
            'EVI.between'             => 'EVI harus berada di antara -2 dan 2.',
            'Red.between'             => 'Nilai Red harus berada di antara 0 dan 3500.',
            'Green.between'           => 'Nilai Green harus berada di antara 0 dan 2500.',
            'NIR.between'             => 'Nilai NIR harus berada di antara 1000 dan 5000.',
            'SWIR.between'            => 'Nilai SWIR harus berada di antara 0 dan 4500.',
            'NIR_SWIR_ratio.between'  => 'Rasio NIR/SWIR harus di antara -10 dan 10.',
            'Red_NIR_ratio.between'   => 'Rasio Red/NIR harus di antara 0 dan 10.',
            'Season_enc.in'           => 'Musim harus Kharif (1) atau Rabi (0).',
            'Stage_enc.between'       => 'Fase pertumbuhan tidak valid.',
            'Latitude.between'        => 'Latitude harus berada di rentang wilayah data training (24-36).',
            'Longitude.between'       => 'Longitude harus berada di rentang wilayah data training (64-75).',
            'Cluster.in'              => 'Cluster harus bernilai 0 atau 1.',
            'Cluster_K4.in'           => 'Cluster K4 harus salah satu dari 0, 1, 2, atau 3.',
        ];
    }
}
