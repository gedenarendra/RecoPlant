<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Membuat satu user dummy untuk keperluan testing login API
        User::create([
            'name' => 'Petani Tester',
            'username' => 'petani_tester', // Menggunakan username
            'password' => Hash::make('password123'), // Password yang di-hash
            'role' => 'guest',
        ]);

        // Memanggil seeder ensiklopedia tanaman
        $this->call(PlantEncyclopediaSeeder::class);
    }
}