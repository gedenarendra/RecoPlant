<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PredictionController;
use App\Http\Controllers\PlantController;


// Rute Publik (Limit 10 request per menit)
Route::middleware('throttle:10,1')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login',    [AuthController::class, 'login']);
});

// Rute Publik untuk Ensiklopedia Tanaman (Tanpa limit ketat, tanpa login)
Route::get('/plants', [PlantController::class, 'index']);

// Rute Terproteksi (Wajib membawa Token Sanctum, limit 60 request per menit)
Route::middleware(['auth:sanctum', 'throttle:60,1'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/predict', [PredictionController::class, 'store']);
    Route::apiResource('/predictions', PredictionController::class)
         ->except(['create','edit']);
    Route::get('/dashboard', [DashboardController::class, 'index']);
});