<?php

namespace App\Infrastructure\Repositories;

use App\Domain\Repositories\PlantRepositoryInterface;
use App\Models\PlantEncyclopedia;
use Illuminate\Support\Collection;

class EloquentPlantRepository implements PlantRepositoryInterface
{
    public function all(): Collection
    {
        return PlantEncyclopedia::all();
    }
}
