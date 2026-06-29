import joblib
import pandas as pd

class plantPredictionService:
    def __init__(self):
        self.model = joblib.load("models/crop_model.pkl")
        self.labelEncoder = joblib.load("models/label_encoder.pkl")
        self.feature_names = [
            "NDVI", "NDWI", "EVI", "Red", "Green", "NIR", "SWIR",
            "NIR_SWIR_ratio", "Red_NIR_ratio", "DOY_sin", "DOY_cos",
            "Season_enc", "Month", "Stage_enc", "Latitude", "Longitude",
            "Cluster", "Cluster_K4"
        ]

    def predictPlan(self, data) -> dict :
        feature_values = [[
            data.NDVI, data.NDWI, data.EVI,
            data.Red, data.Green, data.NIR, data.SWIR,
            data.NIR_SWIR_ratio, data.Red_NIR_ratio,
            data.DOY_sin, data.DOY_cos,
            data.Season_enc, data.Month, data.Stage_enc,
            data.Latitude, data.Longitude,
            data.Cluster, data.Cluster_K4
        ]]
        
        # Wrap features in a DataFrame to match the model's fitted feature names
        features_df = pd.DataFrame(feature_values, columns=self.feature_names)

        raw_pred = self.model.predict(features_df)[0]
        plantName = self.labelEncoder.inverse_transform([raw_pred])[0]
        proba = self.model.predict_proba(features_df)[0]
        confidence = round(float(proba.max()), 4)

        return {
            "plant": plantName,
            "confidence": confidence
        }

# Inisiasi service agar model diload sekali saat service berjalan
plant_service = plantPredictionService()