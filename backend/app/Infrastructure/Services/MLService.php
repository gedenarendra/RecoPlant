<?php

namespace App\Infrastructure\Services;

use App\Domain\Services\MLServiceInterface;
use Illuminate\Support\Facades\Http;

class MLService implements MLServiceInterface
{
    public function predict(array $features): array
    {
        $response = Http::timeout(10)
            ->post(config('services.ml.api_url') . '/predict', $features);

        if ($response->failed()) {
            throw new \Exception('ML service error: ' . $response->status());
        }

        return $response->json();
    }
}
