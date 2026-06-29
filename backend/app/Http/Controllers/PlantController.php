<?php

namespace App\Http\Controllers;

use App\Domain\Repositories\PlantRepositoryInterface;
use App\Http\Resources\PlantResource;
use Illuminate\Http\Request;

class PlantController extends Controller
{
    protected PlantRepositoryInterface $plantRepository;

    public function __construct(PlantRepositoryInterface $plantRepository)
    {
        $this->plantRepository = $plantRepository;
    }

    public function index()
    {
        // Mengambil semua data dari repository
        $plants = $this->plantRepository->all();
        
        // Membungkus datanya menggunakan PlantResource agar bahasanya berubah
        return response()->json([
            'status' => 'success',
            'data' => PlantResource::collection($plants)
        ]);
    }
}