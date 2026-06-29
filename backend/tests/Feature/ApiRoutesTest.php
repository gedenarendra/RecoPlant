<?php

namespace Tests\Feature;

use Tests\TestCase;

class ApiRoutesTest extends TestCase
{
    public function test_api_routes_are_registered(): void
    {
        $routes = $this->app['router']->getRoutes()->getRoutesByMethod()['POST'] ?? [];

        $this->assertTrue(
            collect($routes)->contains(fn ($route) => $route->uri() === 'api/register'),
            'Expected POST /api/register route to be registered.'
        );
    }
}
