from pydantic import BaseModel, Field

class plantPredictionInput(BaseModel):
    NDVI: float = Field(ge=-1.0, le=1.0)
    NDWI: float = Field(ge=-1.0, le=1.0)
    EVI: float = Field(ge=-2.0, le=2.0)
    Red: float = Field(ge=0.0, le=3500.0)
    Green: float = Field(ge=0.0, le=2500.0)
    NIR: float = Field(ge=1000.0, le=5000.0)
    SWIR: float = Field(ge=0.0, le=4500.0)
    NIR_SWIR_ratio: float = Field(ge=-10.0, le=10.0)
    Red_NIR_ratio: float = Field(ge=0.0, le=10.0)
    DOY_sin: float = Field(ge=-1.0, le=1.0)
    DOY_cos: float = Field(ge=-1.0, le=1.0)
    Season_enc: int = Field(ge=0, le=1)
    Month: int = Field(ge=1, le=12)
    Stage_enc: int = Field(ge=-1, le=7)
    Latitude: float = Field(ge=24.0, le=36.0)
    Longitude: float = Field(ge=64.0, le=75.0)
    Cluster: int = Field(ge=0, le=1)
    Cluster_K4: int = Field(ge=0, le=3)

class plantPredictOutput(BaseModel):
    plant: str
    confidence: float