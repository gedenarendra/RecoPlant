<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Prediction;
use App\Infrastructure\Services\MLService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class MLServiceIntegrationTest extends TestCase
{
    use RefreshDatabase;

    private array $validFeatures = [
        'NDVI'           => 0.5,
        'NDWI'           => -0.2,
        'EVI'            => 0.4,
        'Red'            => 0.1,
        'Green'          => 0.2,
        'NIR'            => 0.6,
        'SWIR'           => 0.15,
        'NIR_SWIR_ratio' => 4.0,
        'Red_NIR_ratio'  => 0.16,
        'DOY_sin'        => 0.866,
        'DOY_cos'        => -0.5,
        'Season_enc'     => 1,
        'Month'          => 6,
        'Stage_enc'      => 0,
        'Latitude'       => -6.2,
        'Longitude'      => 106.8,
        'Cluster'        => 2,
        'Cluster_K4'     => 3,
    ];

    /**
     * Test ML Service health check.
     */
    public function test_ml_service_is_healthy(): void
    {
        $apiUrl = config('services.ml.api_url');
        
        $response = Http::timeout(5)->get($apiUrl . '/health');
        
        $this->assertTrue($response->successful(), 'ML service health check failed. Is the service running?');
        $this->assertEquals('healthy', $response->json('status'));
        $this->assertEquals('RecoPlant ML API', $response->json('service'));
    }

    /**
     * Test direct MLService prediction integration.
     */
    public function test_ml_service_direct_predict_returns_correct_response_structure(): void
    {
        $mlService = new MLService();
        
        try {
            $result = $mlService->predict($this->validFeatures);
        } catch (\Exception $e) {
            $this->fail('Failed calling ML service predict: ' . $e->getMessage());
        }

        $this->assertArrayHasKey('plant', $result);
        $this->assertArrayHasKey('confidence', $result);
        $this->assertIsString($result['plant']);
        $this->assertIsNumeric($result['confidence']);
        $this->assertGreaterThanOrEqual(0, $result['confidence']);
        $this->assertLessThanOrEqual(1, $result['confidence']);
    }

    /**
     * Test full flow prediction through the backend controller endpoint using the real ML service.
     */
    public function test_backend_controller_endpoint_integrates_with_real_ml_service(): void
    {
        $user = User::create([
            'name' => 'Integration Tester',
            'username' => 'inttester',
            'password' => bcrypt('secret123'),
        ]);

        // Note: No Http::fake() here!
        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/predict', $this->validFeatures);

        $response->assertStatus(201);
        $response->assertJsonStructure([
            'id',
            'user_id',
            'input_features',
            'result_plant',
            'confidence_score',
            'created_at',
            'updated_at'
        ]);

        $this->assertDatabaseHas('predictions', [
            'user_id' => $user->id,
            'result_plant' => $response->json('result_plant'),
            'confidence_score' => $response->json('confidence_score')
        ]);
    }
}
