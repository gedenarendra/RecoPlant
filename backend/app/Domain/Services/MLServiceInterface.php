<?php

namespace App\Domain\Services;

interface MLServiceInterface
{
    public function predict(array $features): array;
}
