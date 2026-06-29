<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(
            \App\Domain\Repositories\UserRepositoryInterface::class,
            \App\Infrastructure\Repositories\EloquentUserRepository::class
        );

        $this->app->bind(
            \App\Domain\Repositories\PredictionRepositoryInterface::class,
            \App\Infrastructure\Repositories\EloquentPredictionRepository::class
        );

        $this->app->bind(
            \App\Domain\Repositories\PlantRepositoryInterface::class,
            \App\Infrastructure\Repositories\EloquentPlantRepository::class
        );

        $this->app->bind(
            \App\Domain\Services\MLServiceInterface::class,
            \App\Infrastructure\Services\MLService::class
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
