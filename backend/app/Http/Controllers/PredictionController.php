<?php

namespace App\Http\Controllers;

use App\Domain\Repositories\PredictionRepositoryInterface;
use App\Domain\Services\MLServiceInterface;
use App\Http\Requests\PredictRequest;
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

    public function store(PredictRequest $req) {
        $validated = $req->validated();

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
