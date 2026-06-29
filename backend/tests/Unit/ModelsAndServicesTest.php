<?php

namespace Tests\Unit;

use App\Models\User;
use App\Models\Prediction;
use App\Models\PlantEncyclopedia;
use App\Infrastructure\Services\MLService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class ModelsAndServicesTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test User predictions relationship.
     */
    public function test_user_has_many_predictions(): void
    {
        $user = User::create([
            'name'     => 'Farmer John',
            'username' => 'farmerjohn',
            'password' => bcrypt('password123'),
        ]);

        $prediction = Prediction::create([
            'user_id'          => $user->id,
            'input_features'   => ['NDVI' => 0.5, 'EVI' => 0.4],
            'result_plant'     => 'Rice',
            'confidence_score' => 0.95,
        ]);

        $this->assertTrue($user->predictions->contains($prediction));
        $this->assertInstanceOf(Prediction::class, $user->predictions->first());
    }

    /**
     * Test Prediction user relationship.
     */
    public function test_prediction_belongs_to_user(): void
    {
        $user = User::create([
            'name'     => 'Farmer John',
            'username' => 'farmerjohn',
            'password' => bcrypt('password123'),
        ]);

        $prediction = Prediction::create([
            'user_id'          => $user->id,
            'input_features'   => ['NDVI' => 0.5, 'EVI' => 0.4],
            'result_plant'     => 'Rice',
            'confidence_score' => 0.95,
        ]);

        $this->assertEquals($user->id, $prediction->user->id);
        $this->assertInstanceOf(User::class, $prediction->user);
    }

    /**
     * Test Prediction casts input_features attribute as array.
     */
    public function test_prediction_casts_input_features_as_array(): void
    {
        $user = User::create([
            'name'     => 'Farmer John',
            'username' => 'farmerjohn',
            'password' => bcrypt('password123'),
        ]);

        $features = ['NDVI' => 0.5, 'EVI' => 0.4, 'Red' => 0.1];

        $prediction = Prediction::create([
            'user_id'          => $user->id,
            'input_features'   => $features,
            'result_plant'     => 'Rice',
            'confidence_score' => 0.95,
        ]);

        $this->assertIsArray($prediction->input_features);
        $this->assertEquals(0.5, $prediction->input_features['NDVI']);
    }

    /**
     * Test PlantEncyclopedia targets correct table.
     */
    public function test_plant_encyclopedia_table_name(): void
    {
        $plant = new PlantEncyclopedia();
        $this->assertEquals('plant_recommendations', $plant->getTable());
    }

    /**
     * Test PlantEncyclopedia has the correct fillable attributes.
     */
    public function test_plant_encyclopedia_fillable_attributes(): void
    {
        $plant = new PlantEncyclopedia();
        $expectedFillable = [
            'plant_name',
            'local_name',
            'latin_name',
            'description',
            'ideal_season',
            'ideal_temp_range',
            'ideal_humidity_range',
            'ndvi_range',
            'evi_range',
            'harvest_duration',
            'image_url'
        ];

        $this->assertEquals($expectedFillable, $plant->getFillable());
    }

    /**
     * Test PlantEncyclopedia creation and attribute persistence in database.
     */
    public function test_plant_encyclopedia_creation_and_attributes(): void
    {
        $data = [
            'plant_name'           => 'Wheat',
            'local_name'           => 'Gandum',
            'latin_name'           => 'Triticum aestivum',
            'description'          => 'Tanaman gandum.',
            'ideal_season'         => 'Musim Semi',
            'ideal_temp_range'     => '15-20°C',
            'ideal_humidity_range' => '50-60%',
            'ndvi_range'           => '0.4-0.7',
            'evi_range'            => '0.2-0.5',
            'harvest_duration'     => '120 hari',
            'image_url'            => 'http://example.com/wheat.png',
        ];

        $plant = PlantEncyclopedia::create($data);

        $this->assertDatabaseHas('plant_recommendations', [
            'plant_name' => 'Wheat',
            'local_name' => 'Gandum',
        ]);

        $this->assertEquals('Wheat', $plant->plant_name);
        $this->assertEquals('Gandum', $plant->local_name);
        $this->assertEquals('Triticum aestivum', $plant->latin_name);
        $this->assertEquals('http://example.com/wheat.png', $plant->image_url);
    }

    /**
     * Test MLService calls prediction API and returns correct array.
     */
    public function test_ml_service_predict_returns_expected_result(): void
    {
        $mlService = new MLService();
        $features = ['NDVI' => 0.5, 'EVI' => 0.4];

        Http::fake([
            config('services.ml.api_url') . '/predict' => Http::response([
                'plant' => 'Maize',
                'confidence' => 0.87
            ], 200)
        ]);

        $result = $mlService->predict($features);

        $this->assertIsArray($result);
        $this->assertEquals('Maize', $result['plant']);
        $this->assertEquals(0.87, $result['confidence']);
    }
}
