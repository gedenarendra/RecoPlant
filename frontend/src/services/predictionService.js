import api from './api';
import { dummyStats } from '../data/mockData';

export const getDashboardStats = async () => {
  // Memanggil endpoint /api/dashboard sesuai dengan dokumentasi endpoints.md
  await api.get('/dashboard');

  const response = await api.get('/predictions');
  const total_predictions = response.data.total || 0;
  const predictions = response.data.data || [];

  if (total_predictions === 0) {
    return {
      ...dummyStats,
      total_predictions: 0,
      today_predictions: 0
    };
  }

  // Hitung prediksi hari ini
  const todayStr = new Date().toDateString();
  const today_predictions = predictions.filter(item => {
    return new Date(item.created_at).toDateString() === todayStr;
  }).length;

  // Hitung top_plants dari data riwayat yang ada
  const plantCounts = {};
  predictions.forEach(item => {
    const p = item.result_plant;
    plantCounts[p] = (plantCounts[p] || 0) + 1;
  });
  const top_plants = Object.entries(plantCounts)
    .map(([result_plant, total]) => ({ result_plant, total }))
    .sort((a, b) => b.total - a.total);

  // Hitung spectral_correlation rata-rata per tanaman dari data riwayat
  const plantSpecs = {};
  predictions.forEach(item => {
    const p = item.result_plant;
    const feat = item.input_features || {};
    if (!plantSpecs[p]) {
      plantSpecs[p] = { NDVI: 0, NDWI: 0, EVI: 0, count: 0 };
    }
    plantSpecs[p].NDVI += feat.NDVI || 0;
    plantSpecs[p].NDWI += feat.NDWI || 0;
    plantSpecs[p].EVI += feat.EVI || 0;
    plantSpecs[p].count += 1;
  });

  const spectral_correlation = Object.entries(plantSpecs).map(([plant, data]) => ({
    plant,
    NDVI: parseFloat((data.NDVI / data.count).toFixed(2)),
    NDWI: parseFloat((data.NDWI / data.count).toFixed(2)),
    EVI: parseFloat((data.EVI / data.count).toFixed(2))
  }));

  return {
    total_predictions,
    today_predictions,
    top_plants,
    spectral_correlation
  };
};

export const submitPrediction = async (payload) => {
  const response = await api.post('/predict', payload);
  return response.data;
};

export const getPredictionHistory = async (page = 1) => {
  const response = await api.get(`/predictions?page=${page}`);
  return response.data;
};

export const deletePrediction = async (id) => {
  const response = await api.delete(`/predictions/${id}`);
  return response.data;
};

export const updatePredictionNotes = async (id, notes) => {
  const response = await api.put(`/predictions/${id}`, { notes });
  return response.data;
};

export const getPlantsData = async () => {
  const response = await api.get('/plants');
  return response.data.data;
};
