from fastapi import APIRouter
from app.schemas.plant_schema import plantPredictionInput, plantPredictOutput
from app.services.plant_service import plant_service

router = APIRouter()

@router.post("/predict", response_model=plantPredictOutput, tags=["Prediction"])
def predict_crop(data: plantPredictionInput):
    result = plant_service.predictPlan(data)
    return result

@router.get("/health", tags=["System"])
def health_check():
    return{
        "status": "healthy",
        "service": "RecoPlant ML API",
        "message": "Service is up and running!"
    }