<?php

namespace App\Http\Controllers;

use App\Domain\Repositories\PredictionRepositoryInterface;
use App\Domain\Services\MLServiceInterface;
use Illuminate\Http\Request;

class PredictionController extends Controller
{
    protected PredictionRepositoryInterface $predictionRepository;
    protected MLServiceInterface $mlService;

    public function __construct(
        PredictionRepositoryInterface $predictionRepository,
        MLServiceInterface $mlService
    ) {
        $this->predictionRepository = $predictionRepository;
        $this->mlService = $mlService;
    }

    public function store(Request $req) {
        $validated = $req->validate([
            'NDVI'           => 'required|numeric|between:-1,1',
            'NDWI'           => 'required|numeric|between:-1,1',
            'EVI'            => 'required|numeric|between:-1,1',
            'Red'            => 'required|numeric|between:0,1',
            'Green'          => 'required|numeric|between:0,1',
            'NIR'            => 'required|numeric|between:0,1',
            'SWIR'           => 'required|numeric|between:0,1',
            'NIR_SWIR_ratio' => 'required|numeric|min:0',
            'Red_NIR_ratio'  => 'required|numeric|min:0',
            'DOY_sin'        => 'required|numeric|between:-1,1',
            'DOY_cos'        => 'required|numeric|between:-1,1',
            'Season_enc'     => 'required|integer|between:0,3',
            'Month'          => 'required|integer|between:1,12',
            'Stage_enc'      => 'required|integer|between:0,2',
            'Latitude'       => 'required|numeric',
            'Longitude'      => 'required|numeric',
            'Cluster'        => 'required|integer|min:0',
            'Cluster_K4'     => 'required|integer|between:0,3',
        ]);

        $result = $this->mlService->predict($validated);

        $prediction = $this->predictionRepository->create([
            'user_id'          => $req->user()->id,
            'input_features'   => $validated,
            'result_plant'     => $result['plant'],
            'confidence_score' => $result['confidence'],
        ]);

        return response()->json($prediction, 201);
    }

    public function index(Request $req) {
        return $this->predictionRepository->paginateForUser($req->user(), 10);
    }

    public function show(Request $req, $id) {
        return $this->predictionRepository->findForUser($req->user(), $id);
    }

    public function update(Request $req, $id) {
        $pred = $this->predictionRepository->findForUser($req->user(), $id);
        $this->predictionRepository->update($pred, ['notes' => $req->notes]);
        return response()->json($pred);
    }

    public function destroy(Request $req, $id) {
        $pred = $this->predictionRepository->findForUser($req->user(), $id);
        $this->predictionRepository->delete($pred);
        return response()->json(['message' => 'Dihapus']);
    }
}
