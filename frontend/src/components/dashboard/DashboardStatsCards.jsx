import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, Sun, Leaf } from 'lucide-react';

const DashboardStatsCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        whileHover={{ y: -5 }}
        className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl hover:bg-white/10 transition duration-300"
      >
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-gray-300 font-medium">Total Prediksi</h4>
          <div className="p-2 bg-brand-primary/20 rounded-lg">
            <Sprout className="w-6 h-6 text-brand-primary" />
          </div>
        </div>
        <h2 className="text-4xl font-bold text-white">{stats?.total_predictions || 0}</h2>
        <p className="text-sm text-brand-primary mt-2 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
          Terus meningkat
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ y: -5 }}
        className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl hover:bg-white/10 transition duration-300"
      >
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-gray-300 font-medium">Prediksi Hari Ini</h4>
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Sun className="w-6 h-6 text-blue-400" />
          </div>
        </div>
        <h2 className="text-4xl font-bold text-white">{stats?.today_predictions || 0}</h2>
        <p className="text-sm text-blue-400 mt-2 flex items-center">
          Aktivitas harian
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        whileHover={{ y: -5 }}
        className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl hover:bg-white/10 transition duration-300"
      >
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-gray-300 font-medium">Tanaman Terpopuler</h4>
          <div className="p-2 bg-yellow-500/20 rounded-lg">
            <Leaf className="w-6 h-6 text-yellow-400" />
          </div>
        </div>
        <h2 className="text-4xl font-bold text-white">
          {stats?.top_plants?.length > 0 ? stats.top_plants[0].result_plant : '-'}
        </h2>
        <p className="text-sm text-yellow-400 mt-2 flex items-center">
          Paling banyak direkomendasikan
        </p>
      </motion.div>
    </div>
  );
};

export default DashboardStatsCards;
