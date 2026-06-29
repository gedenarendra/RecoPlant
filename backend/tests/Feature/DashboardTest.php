<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test dashboard access for authenticated user.
     */
    public function test_user_can_access_dashboard(): void
    {
        $user = User::create([
            'name' => 'John Doe',
            'username' => 'johndoe',
            'password' => bcrypt('secret123'),
        ]);

        $response = $this->actingAs($user, 'sanctum')
            ->getJson('/api/dashboard');

        $response->assertStatus(200);
        $response->assertJsonStructure(['message', 'user']);
    }

    /**
     * Test that unauthenticated guests cannot access the dashboard.
     */
    public function test_unauthenticated_user_cannot_access_dashboard(): void
    {
        $this->getJson('/api/dashboard')->assertStatus(401);
    }
}
