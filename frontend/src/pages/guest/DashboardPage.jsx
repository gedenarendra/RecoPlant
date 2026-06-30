import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useDashboardController } from '../../hooks/useDashboardController';
import DashboardStatsCards from '../../components/dashboard/DashboardStatsCards';
import DashboardCharts from '../../components/dashboard/DashboardCharts';

const DashboardPage = () => {
  const { user } = useAuth();
  const { stats, loading, error } = useDashboardController();

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark text-white">
      <div className="text-xl animate-pulse">Memuat data...</div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.4 }}
      className="relative min-h-screen bg-brand-dark text-white overflow-x-hidden"
      style={{ paddingTop: '130px', paddingBottom: '80px' }}
    >
      {/* Global Background Image with Fixed Attachment */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: 'url(/global-bg.png)' }}
      />

      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 z-0 bg-brand-dark/90" />

      {/* Main Content Area */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Selamat Datang, <span className="text-brand-primary">{user?.name || 'Guest'}</span>
          </h1>
          <p className="text-gray-400">Berikut adalah ringkasan statistik rekomendasi tanaman.</p>
        </motion.div>

        {error && (
          <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl text-yellow-400 text-sm flex items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        {/* Stats Cards Section */}
        <DashboardStatsCards stats={stats} />

        {/* Charts Section */}
        <DashboardCharts stats={stats} />
      </div>
    </motion.div>
  );
};

export default DashboardPage;
