from pydantic import BaseModel

class plantPredictionInput(BaseModel):
    NDVI: float
    NDWI: float
    EVI: float
    Red: float
    Green: float
    NIR: float
    SWIR: float
    NIR_SWIR_ratio: float
    Red_NIR_ratio: float
    DOY_sin: float
    DOY_cos: float
    Season_enc: int
    Month: int
    Stage_enc: int
    Latitude: float
    Longitude: float
    Cluster: int
    Cluster_K4: int

class plantPredictOutput(BaseModel):
    plant: str
    confidence: float