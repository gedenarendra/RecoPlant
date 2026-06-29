<?php

namespace App\Domain\Repositories;

use App\Models\User;
use App\Models\Prediction;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface PredictionRepositoryInterface
{
    public function create(array $data): Prediction;
    public function paginateForUser(User $user, int $perPage = 10): LengthAwarePaginator;
    public function findForUser(User $user, int $id): Prediction;
    public function update(Prediction $prediction, array $data): bool;
    public function delete(Prediction $prediction): bool;
}
