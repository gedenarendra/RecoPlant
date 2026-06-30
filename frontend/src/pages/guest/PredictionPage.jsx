import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePredictionController } from '../../hooks/usePredictionController';
import PredictionForm from '../../components/prediction/PredictionForm';
import PredictionResult from '../../components/prediction/PredictionResult';

const PredictionPage = () => {
  const navigate = useNavigate();
  const {
    params,
    result,
    encyclopediaData,
    loading,
    error,
    derived,
    handleInputChange,
    handleSubmit
  } = usePredictionController();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.4 }}
      className="relative min-h-screen font-sans overflow-x-hidden"
    >
      {/* Global Background Image with Fixed Attachment */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: 'url(/global-bg.png)' }}
      />
      
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 z-0 bg-[#0a110d]/90 backdrop-blur-sm" />

      {/* Main Content Container */}
      <div className="container relative z-10" style={{ paddingTop: '130px', paddingBottom: '80px' }}>

        {/* Title Section */}
        <motion.div
          className="text-center mb-16 relative z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
            Analisis <span className="text-brand-primary">Spektral & Spasial</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Sesuaikan parameter satelit dan iklim untuk memprediksi komoditas tanaman yang paling optimal untuk lahan Anda.
          </p>
        </motion.div>

        <div className="relative z-10">
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.5 }}
                className="mb-12 max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-stretch"
              >
                {/* Hasil Prediksi (Best Recommendation & Accuracy) */}
                <div className="w-full lg:w-1/3 bg-gradient-to-b from-[#1E2A23] to-[#141E19] border-2 border-brand-primary p-8 rounded-3xl shadow-[0_15px_40px_rgba(46,204,113,0.2)] text-center relative overflow-hidden flex flex-col justify-center min-h-[350px]">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                  <div className="relative z-10">
                    <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-brand-primary/20 text-brand-primary mb-4 border border-brand-primary/30">
                      <Leaf size={32} />
                    </div>
                    <h3 className="text-white/60 font-semibold uppercase tracking-widest text-sm mb-2">Rekomendasi Terbaik</h3>
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-brand-primary to-green-300 mb-4 drop-shadow-sm">
                      {result.result_plant}
                    </h1>

                    <div className="bg-black/30 border border-white/5 rounded-2xl p-4 mb-6">
                      <p className="text-white/50 text-sm mb-1">Tingkat Akurasi Prediksi</p>
                      <div className="flex justify-center items-baseline gap-1">
                        <span className="text-3xl font-mono font-bold text-white">
                          {Math.round(result.confidence_score <= 1 ? result.confidence_score * 100 : result.confidence_score)}
                        </span>
                        <span className="text-brand-primary font-bold">%</span>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate('/history')}
                      className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-semibold rounded-xl transition-colors flex justify-center items-center gap-2 group"
                    >
                      Simpan & Lihat Riwayat
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Ensiklopedia Detail */}
                {encyclopediaData && (
                  <div className="flex-1 bg-gradient-to-br from-[#1E2A23] to-[#141E19] border border-brand-primary/30 p-8 rounded-3xl shadow-[0_0_30px_rgba(46,204,113,0.15)] relative overflow-hidden flex flex-col justify-between">
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-6">
                        <Leaf className="text-brand-primary" size={28} />
                        <h2 className="text-3xl font-bold text-white">
                          Ensiklopedia: <span className="text-brand-primary">{encyclopediaData.nama_lokal} ({encyclopediaData.nama_latin})</span>
                        </h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-colors">
                          <p className="text-white/50 text-sm font-semibold mb-1 uppercase tracking-wider">Suhu Udara Ideal</p>
                          <p className="text-xl font-bold text-white">{encyclopediaData.suhu_udara_ideal}</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-colors">
                          <p className="text-white/50 text-sm font-semibold mb-1 uppercase tracking-wider">Kelembaban Ideal</p>
                          <p className="text-xl font-bold text-white">{encyclopediaData.kelembaban_lingkungan_ideal}</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-colors">
                          <p className="text-white/50 text-sm font-semibold mb-1 uppercase tracking-wider">Rentang NDVI</p>
                          <p className="text-xl font-bold text-white">{encyclopediaData.rentang_nilai_ndvi}</p>
                        </div>
                      </div>

                      <p className="text-white/70 text-lg leading-relaxed bg-black/20 p-6 rounded-2xl border border-white/5 mb-4">
                        {encyclopediaData.deskripsi_umum}
                      </p>
                      
                      <p className="text-white/50 text-sm">
                        <span className="font-semibold text-white/80">Musim Tanam:</span> {encyclopediaData.musim_tanam_ideal} | <span className="font-semibold text-white/80">Durasi Panen:</span> {encyclopediaData.estimasi_durasi_panen}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="flex flex-col lg:flex-row gap-8 justify-center items-start"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Form Input Parameters */}
            <PredictionForm 
              params={params} 
              handleInputChange={handleInputChange} 
              handleSubmit={handleSubmit} 
              loading={loading} 
              error={error} 
            />

            {/* Live Metrics & Result Panel */}
            <PredictionResult 
              derived={derived} 
              result={null} 
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default PredictionPage;
