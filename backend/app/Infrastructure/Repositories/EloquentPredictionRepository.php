<?php

namespace App\Infrastructure\Repositories;

use App\Domain\Repositories\PredictionRepositoryInterface;
use App\Models\User;
use App\Models\Prediction;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class EloquentPredictionRepository implements PredictionRepositoryInterface
{
    public function create(array $data): Prediction
    {
        return Prediction::create($data);
    }

    public function paginateForUser(User $user, int $perPage = 10): LengthAwarePaginator
    {
        return $user->predictions()->latest()->paginate($perPage);
    }

    public function findForUser(User $user, int $id): Prediction
    {
        return $user->predictions()->findOrFail($id);
    }

    public function update(Prediction $prediction, array $data): bool
    {
        return $prediction->update($data);
    }

    public function delete(Prediction $prediction): bool
    {
        return $prediction->delete();
    }
}
