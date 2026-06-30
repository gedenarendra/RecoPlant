<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test user registration.
     */
    public function test_user_can_register(): void
    {
        $response = $this->postJson('/api/register', [
            'name' => 'John Doe',
            'username' => 'johndoe',
            'password' => 'secret123',
        ]);

        $response->assertStatus(201);
        $response->assertJsonStructure(['token', 'user']);
        $this->assertDatabaseHas('users', ['username' => 'johndoe']);
    }

    /**
     * Test registration failure due to duplicate username.
     */
    public function test_user_cannot_register_with_duplicate_username(): void
    {
        User::create([
            'name' => 'John Doe',
            'username' => 'johndoe',
            'password' => bcrypt('secret123'),
        ]);

        $response = $this->postJson('/api/register', [
            'name' => 'John Duplicate',
            'username' => 'johndoe', // Duplicate
            'password' => 'secret1234',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['username']);
    }

    /**
     * Test registration failure due to short password.
     */
    public function test_user_cannot_register_with_short_password(): void
    {
        $response = $this->postJson('/api/register', [
            'name' => 'John Short',
            'username' => 'johnshort',
            'password' => '123', // < 6 chars
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['password']);
    }

    /**
     * Test registration failure due to long password.
     */
    public function test_user_cannot_register_with_long_password(): void
    {
        $response = $this->postJson('/api/register', [
            'name' => 'John Long',
            'username' => 'johnlong',
            'password' => str_repeat('a', 33), // 33 chars (> 32)
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['password']);
    }

    /**
     * Test user login.
     */
    public function test_user_can_login(): void
    {
        User::create([
            'name' => 'John Doe',
            'username' => 'johndoe',
            'password' => bcrypt('secret123'),
        ]);

        $response = $this->postJson('/api/login', [
            'username' => 'johndoe',
            'password' => 'secret123',
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure(['token', 'user']);
    }

    /**
     * Test login failure with incorrect credentials.
     */
    public function test_user_cannot_login_with_wrong_password(): void
    {
        User::create([
            'name' => 'John Doe',
            'username' => 'johndoe',
            'password' => bcrypt('secret123'),
        ]);

        $response = $this->postJson('/api/login', [
            'username' => 'johndoe',
            'password' => 'wrongpassword',
        ]);

        $response->assertStatus(401);
        $response->assertJsonFragment(['message' => 'Kredensial salah']);
    }

    /**
     * Test logout.
     */
    public function test_user_can_logout(): void
    {
        $user = User::create([
            'name' => 'John Doe',
            'username' => 'johndoe',
            'password' => bcrypt('secret123'),
        ]);

        $token = $user->createToken('auth')->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->postJson('/api/logout');

        $response->assertStatus(200);
        $response->assertJsonFragment(['message' => 'Logout berhasil']);
        $this->assertCount(0, $user->tokens);
    }
}
