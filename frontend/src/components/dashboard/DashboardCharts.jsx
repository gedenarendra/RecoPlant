import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell, Legend } from 'recharts';

const colors = ['#2ECC71', '#27AE60', '#F1C40F', '#E67E22', '#E74C3C'];

const DashboardCharts = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Chart 1: Distribution */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl"
      >
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold">Distribusi Rekomendasi Tanaman</h3>
            <p className="text-gray-400 text-sm mt-1">5 tanaman paling banyak direkomendasikan</p>
          </div>
        </div>

        <div className="h-[350px] w-full">
          {stats?.top_plants?.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.top_plants} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis
                  dataKey="result_plant"
                  stroke="#9CA3AF"
                  tick={{ fill: '#9CA3AF' }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                />
                <YAxis
                  stroke="#9CA3AF"
                  tick={{ fill: '#9CA3AF' }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{
                    backgroundColor: 'rgba(15, 30, 20, 0.9)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
                  }}
                  itemStyle={{ color: '#2ECC71' }}
                />
                <Bar dataKey="total" radius={[6, 6, 0, 0]} maxBarSize={60}>
                  {
                    stats.top_plants.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))
                  }
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <svg className="w-16 h-16 text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
              <p className="text-gray-400 text-center">Belum ada data prediksi untuk divisualisasikan.</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Chart 2: Spectral Inputs Correlation */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl"
      >
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold">Rata-rata Indeks Spektral</h3>
            <p className="text-gray-400 text-sm mt-1">Korelasi input prediksi (NDVI, NDWI, EVI) per tanaman</p>
          </div>
        </div>

        <div className="h-[350px] w-full">
          {stats?.spectral_correlation?.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.spectral_correlation} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis
                  dataKey="plant"
                  stroke="#9CA3AF"
                  tick={{ fill: '#9CA3AF' }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                />
                <YAxis
                  stroke="#9CA3AF"
                  tick={{ fill: '#9CA3AF' }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{
                    backgroundColor: 'rgba(15, 30, 20, 0.9)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="NDVI" fill="#2ECC71" radius={[4, 4, 0, 0]} maxBarSize={30} />
                <Bar dataKey="NDWI" fill="#3498DB" radius={[4, 4, 0, 0]} maxBarSize={30} />
                <Bar dataKey="EVI" fill="#F1C40F" radius={[4, 4, 0, 0]} maxBarSize={30} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <svg className="w-16 h-16 text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
              <p className="text-gray-400 text-center">Belum ada data korelasi input prediksi.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardCharts;
