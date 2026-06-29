<?php

namespace App\Domain\Repositories;

use Illuminate\Support\Collection;

interface PlantRepositoryInterface
{
    public function all(): Collection;
}
