import { useState, useEffect } from 'react';
import { getDashboardStats } from '../services/predictionService';
import { handleApiError } from '../services/errorHandler';
import { dummyStats } from '../data/mockData';

export const useDashboardController = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        setError(handleApiError(err) + ' Menampilkan data offline.');
        setStats(dummyStats);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return {
    stats,
    loading,
    error
  };
};
