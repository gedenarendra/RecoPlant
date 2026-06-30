import { useState } from 'react';
import { submitPrediction, getPlantsData } from '../services/predictionService';
import { handleApiError } from '../services/errorHandler';

export const usePredictionController = () => {
  const [params, setParams] = useState({
    DOY: 243,
    Month: 8,
    NDVI: 0.56,
    NDWI: -0.55,
    EVI: 1.30,
    Red: 883,
    Green: 892,
    NIR: 3123,
    SWIR: 2157,
    Season_enc: 1,
    Stage_enc: 4,
    Latitude: 28.79,
    Longitude: 69.81,
    Cluster: 0,
    Cluster_K4: 1
  });

  const [result, setResult] = useState(null);
  const [encyclopediaData, setEncyclopediaData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const integerFields = ['DOY', 'Month', 'Season_enc', 'Stage_enc', 'Cluster', 'Cluster_K4'];
    setParams(prev => ({
      ...prev,
      [name]: integerFields.includes(name) ? parseInt(value, 10) : parseFloat(value)
    }));
  };

  const calculateDerived = () => {
    const DOY_sin = Math.sin(params.DOY * (2 * Math.PI) / 365).toFixed(4);
    const DOY_cos = Math.cos(params.DOY * (2 * Math.PI) / 365).toFixed(4);

    const nirSwirRatio = params.SWIR !== 0
      ? Math.max(-10, Math.min(10, params.NIR / (params.SWIR + 1e-6)))
      : 0;

    const redNirRatio = params.NIR !== 0
      ? Math.max(0, Math.min(10, params.Red / (params.NIR + 1e-6)))
      : 0;

    return {
      DOY_sin,
      DOY_cos,
      NIR_SWIR_ratio: nirSwirRatio.toFixed(4),
      Red_NIR_ratio: redNirRatio.toFixed(4),
    };
  };

  const derived = calculateDerived();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    const payloadToSend = {
      NDVI: params.NDVI,
      NDWI: params.NDWI,
      EVI: params.EVI,
      Red: params.Red,
      Green: params.Green,
      NIR: params.NIR,
      SWIR: params.SWIR,
      NIR_SWIR_ratio: parseFloat(derived.NIR_SWIR_ratio),
      Red_NIR_ratio: parseFloat(derived.Red_NIR_ratio),
      DOY_sin: parseFloat(derived.DOY_sin),
      DOY_cos: parseFloat(derived.DOY_cos),
      Season_enc: params.Season_enc,
      Month: params.Month,
      Stage_enc: params.Stage_enc,
      Latitude: params.Latitude,
      Longitude: params.Longitude,
      Cluster: params.Cluster,
      Cluster_K4: params.Cluster_K4
    };

    try {
      const data = await submitPrediction(payloadToSend);
      setResult(data);

      try {
        const plantsData = await getPlantsData();
        const matchedPlant = plantsData.find(
          p => p.nama_komoditas_inggris.toLowerCase() === data.result_plant.toLowerCase()
        );
        if (matchedPlant) {
          setEncyclopediaData(matchedPlant);
        }
      } catch (err) {
        console.error("Failed to load encyclopedia data for this plant", err);
      }
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return {
    params,
    result,
    encyclopediaData,
    loading,
    error,
    derived,
    handleInputChange,
    handleSubmit
  };
};
