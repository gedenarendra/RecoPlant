import { useState, useEffect } from 'react';
import { 
  getPredictionHistory, 
  deletePrediction as deletePredictionAPI,
  updatePredictionNotes
} from '../services/predictionService';
import { handleApiError } from '../services/errorHandler';

export const useHistoryController = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // State untuk melacak baris mana yang sedang diubah catatannya
  const [editingId, setEditingId] = useState(null);
  const [tempNotes, setTempNotes] = useState('');

  const fetchHistory = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getPredictionHistory();
      // API mengembalikan object paginasi, datanya ada di response.data
      if (response && Array.isArray(response.data)) {
        setPredictions(response.data);
      } else {
        setPredictions([]);
      }
    } catch (err) {
      setError(handleApiError(err));
      setPredictions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Hapus data riwayat ini?")) {
      try {
        await deletePredictionAPI(id);
        fetchHistory(); // refresh
      } catch (err) {
        alert(handleApiError(err));
      }
    }
  };

  const handleUpdateNotes = async (id, notes) => {
    try {
      await updatePredictionNotes(id, notes);
      setEditingId(null);
      
      // Update state predictions lokal secara instan untuk UX yang cepat
      setPredictions(prev => prev.map(item => {
        if (item.id === id) {
          return { ...item, notes };
        }
        return item;
      }));
    } catch (err) {
      alert(handleApiError(err));
    }
  };

  return {
    predictions,
    loading,
    error,
    editingId,
    tempNotes,
    setEditingId,
    setTempNotes,
    handleDelete,
    handleUpdateNotes,
    fetchHistory
  };
};
