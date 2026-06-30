<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Prediction;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class PredictionTest extends TestCase
{
    use RefreshDatabase;

    private array $validFeatures = [
        'NDVI'           => 0.56,
        'NDWI'           => -0.55,
        'EVI'            => 1.30,
        'Red'            => 883,
        'Green'          => 892,
        'NIR'            => 3123,
        'SWIR'           => 2157,
        'NIR_SWIR_ratio' => 1.45,
        'Red_NIR_ratio'  => 0.28,
        'DOY_sin'        => -0.87,
        'DOY_cos'        => -0.5,
        'Season_enc'     => 1,
        'Month'          => 8,
        'Stage_enc'      => 4,
        'Latitude'       => 28.79,
        'Longitude'      => 69.81,
        'Cluster'        => 0,
        'Cluster_K4'     => 1,
    ];

    /**
     * Test prediction creation with mocked ML response.
     */
    public function test_user_can_create_prediction(): void
    {
        $user = User::create([
            'name' => 'John Doe',
            'username' => 'johndoe',
            'password' => bcrypt('secret123'),
        ]);

        // Mock the ML Service response
        Http::fake([
            config('services.ml.api_url') . '/predict' => Http::response([
                'plant' => 'Rice',
                'confidence' => 0.95
            ], 200)
        ]);

        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/predict', $this->validFeatures);

        $response->assertStatus(201);
        $response->assertJsonFragment([
            'user_id' => $user->id,
            'result_plant' => 'Rice',
            'confidence_score' => 0.95
        ]);

        $this->assertDatabaseHas('predictions', [
            'user_id' => $user->id,
            'result_plant' => 'Rice',
        ]);
    }

    /**
     * Test prediction failure when ML service returns error.
     */
    public function test_prediction_fails_when_ml_service_fails(): void
    {
        $user = User::create([
            'name' => 'John Doe',
            'username' => 'johndoe',
            'password' => bcrypt('secret123'),
        ]);

        // Mock ML service failure
        Http::fake([
            config('services.ml.api_url') . '/predict' => Http::response([], 500)
        ]);

        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/predict', $this->validFeatures);

        $response->assertStatus(500);
        $response->assertJsonFragment(['message' => 'ML service error: 500']);
    }

    /**
     * Test prediction validation failures (missing features / wrong ranges).
     */
    public function test_prediction_fails_with_invalid_features(): void
    {
        $user = User::create([
            'name' => 'John Doe',
            'username' => 'johndoe',
            'password' => bcrypt('secret123'),
        ]);

        // Out-of-bounds NDVI (> 1) and missing NIR feature
        $invalidFeatures = $this->validFeatures;
        $invalidFeatures['NDVI'] = 1.5; // NDVI must be between -1 and 1
        unset($invalidFeatures['NIR']); // NIR is required

        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/predict', $invalidFeatures);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['NDVI', 'NIR']);
    }

    /**
     * Test paginated predictions retrieval.
     */
    public function test_user_can_get_predictions_list(): void
    {
        $user = User::create([
            'name' => 'John Doe',
            'username' => 'johndoe',
            'password' => bcrypt('secret123'),
        ]);

        Prediction::create([
            'user_id' => $user->id,
            'input_features' => $this->validFeatures,
            'result_plant' => 'Corn',
            'confidence_score' => 0.88,
        ]);

        $response = $this->actingAs($user, 'sanctum')
            ->getJson('/api/predictions');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                '*' => ['id', 'user_id', 'input_features', 'result_plant', 'confidence_score', 'notes', 'created_at']
            ],
            'first_page_url', 'next_page_url', 'prev_page_url'
        ]);
        $this->assertCount(1, $response->json('data'));
    }

    /**
     * Test retrieving a single own prediction record.
     */
    public function test_user_can_show_own_prediction(): void
    {
        $user = User::create([
            'name' => 'John Doe',
            'username' => 'johndoe',
            'password' => bcrypt('secret123'),
        ]);

        $pred = Prediction::create([
            'user_id' => $user->id,
            'input_features' => $this->validFeatures,
            'result_plant' => 'Soybean',
            'confidence_score' => 0.92,
        ]);

        $response = $this->actingAs($user, 'sanctum')
            ->getJson("/api/predictions/{$pred->id}");

        $response->assertStatus(200);
        $response->assertJsonFragment([
            'id' => $pred->id,
            'result_plant' => 'Soybean'
        ]);
    }

    /**
     * Test that user cannot view other users' predictions (Data Isolation).
     */
    public function test_user_cannot_show_other_users_prediction(): void
    {
        $user1 = User::create([
            'name' => 'User One',
            'username' => 'user1',
            'password' => bcrypt('secret123'),
        ]);

        $user2 = User::create([
            'name' => 'User Two',
            'username' => 'user2',
            'password' => bcrypt('secret123'),
        ]);

        $pred = Prediction::create([
            'user_id' => $user2->id,
            'input_features' => $this->validFeatures,
            'result_plant' => 'Wheat',
            'confidence_score' => 0.85,
        ]);

        // User 1 tries to access User 2's prediction
        $response = $this->actingAs($user1, 'sanctum')
            ->getJson("/api/predictions/{$pred->id}");

        $response->assertStatus(404);
    }

    /**
     * Test updating notes of a prediction.
     */
    public function test_user_can_update_prediction_notes(): void
    {
        $user = User::create([
            'name' => 'John Doe',
            'username' => 'johndoe',
            'password' => bcrypt('secret123'),
        ]);

        $pred = Prediction::create([
            'user_id' => $user->id,
            'input_features' => $this->validFeatures,
            'result_plant' => 'Soybean',
            'confidence_score' => 0.92,
            'notes' => 'Old notes'
        ]);

        $response = $this->actingAs($user, 'sanctum')
            ->putJson("/api/predictions/{$pred->id}", [
                'notes' => 'New updated notes'
            ]);

        $response->assertStatus(200);
        $response->assertJsonFragment(['notes' => 'New updated notes']);
        $this->assertDatabaseHas('predictions', [
            'id' => $pred->id,
            'notes' => 'New updated notes'
        ]);
    }

    /**
     * Test that user cannot update other users' prediction notes.
     */
    public function test_user_cannot_update_other_users_prediction_notes(): void
    {
        $user1 = User::create([
            'name' => 'User One',
            'username' => 'user1',
            'password' => bcrypt('secret123'),
        ]);

        $user2 = User::create([
            'name' => 'User Two',
            'username' => 'user2',
            'password' => bcrypt('secret123'),
        ]);

        $pred = Prediction::create([
            'user_id' => $user2->id,
            'input_features' => $this->validFeatures,
            'result_plant' => 'Wheat',
            'confidence_score' => 0.85,
            'notes' => 'Old notes'
        ]);

        $response = $this->actingAs($user1, 'sanctum')
            ->putJson("/api/predictions/{$pred->id}", [
                'notes' => 'Hacked notes'
            ]);

        $response->assertStatus(404);
        $this->assertDatabaseHas('predictions', [
            'id' => $pred->id,
            'notes' => 'Old notes'
        ]);
    }

    /**
     * Test deleting a prediction.
     */
    public function test_user_can_delete_prediction(): void
    {
        $user = User::create([
            'name' => 'John Doe',
            'username' => 'johndoe',
            'password' => bcrypt('secret123'),
        ]);

        $pred = Prediction::create([
            'user_id' => $user->id,
            'input_features' => $this->validFeatures,
            'result_plant' => 'Soybean',
            'confidence_score' => 0.92,
        ]);

        $response = $this->actingAs($user, 'sanctum')
            ->deleteJson("/api/predictions/{$pred->id}");

        $response->assertStatus(200);
        $response->assertJsonFragment(['message' => 'Dihapus']);
        $this->assertDatabaseMissing('predictions', ['id' => $pred->id]);
    }

    /**
     * Test that user cannot delete other users' predictions.
     */
    public function test_user_cannot_delete_other_users_prediction(): void
    {
        $user1 = User::create([
            'name' => 'User One',
            'username' => 'user1',
            'password' => bcrypt('secret123'),
        ]);

        $user2 = User::create([
            'name' => 'User Two',
            'username' => 'user2',
            'password' => bcrypt('secret123'),
        ]);

        $pred = Prediction::create([
            'user_id' => $user2->id,
            'input_features' => $this->validFeatures,
            'result_plant' => 'Wheat',
            'confidence_score' => 0.85,
        ]);

        $response = $this->actingAs($user1, 'sanctum')
            ->deleteJson("/api/predictions/{$pred->id}");

        $response->assertStatus(404);
        $this->assertDatabaseHas('predictions', ['id' => $pred->id]);
    }

    /**
     * Test that unauthenticated guests cannot access prediction endpoints.
     */
    public function test_unauthenticated_user_cannot_access_prediction_routes(): void
    {
        $this->getJson('/api/predictions')->assertStatus(401);
        $this->postJson('/api/predict', $this->validFeatures)->assertStatus(401);
        $this->getJson('/api/predictions/1')->assertStatus(401);
        $this->putJson('/api/predictions/1', ['notes' => 'Notes'])->assertStatus(401);
        $this->deleteJson('/api/predictions/1')->assertStatus(401);
    }
}
