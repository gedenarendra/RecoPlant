import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 }
};

const PredictionResult = ({ derived, result }) => {
  const navigate = useNavigate();

  return (
    <motion.div variants={itemVariants} className="w-full lg:w-1/3 flex flex-col gap-8 sticky top-[140px]">
      {/* Real-time Data Feed */}
      <div className="bg-[#141E19] border border-brand-primary/20 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <h3 className="mb-6 text-xl font-bold text-white flex items-center gap-2">
          Live Telemetry
        </h3>

        <div className="flex flex-col gap-4">
          <div className="bg-black/40 border border-white/5 p-4 rounded-2xl flex justify-between items-center group hover:border-brand-primary/30 transition-colors">
            <div>
              <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1">Siklus Hari (DOY)</p>
              <p className="text-white text-sm">sin / cos</p>
            </div>
            <div className="text-right font-mono">
              <p className="text-brand-primary font-bold">{derived.DOY_sin}</p>
              <p className="text-brand-primary font-bold">{derived.DOY_cos}</p>
            </div>
          </div>

          <div className="bg-black/40 border border-white/5 p-4 rounded-2xl flex justify-between items-center group hover:border-brand-primary/30 transition-colors">
            <p className="text-white/50 text-xs font-semibold uppercase tracking-wider">Rasio NIR/SWIR</p>
            <p className="text-brand-primary font-mono font-bold text-lg">{derived.NIR_SWIR_ratio}</p>
          </div>

          <div className="bg-black/40 border border-white/5 p-4 rounded-2xl flex justify-between items-center group hover:border-brand-primary/30 transition-colors">
            <p className="text-white/50 text-xs font-semibold uppercase tracking-wider">Rasio Red/NIR</p>
            <p className="text-brand-primary font-mono font-bold text-lg">{derived.Red_NIR_ratio}</p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 p-4 bg-brand-primary/5 border border-brand-primary/20 rounded-2xl">
          <span className="w-2 h-2 rounded-full bg-brand-primary animate-ping"></span>
          <p className="text-brand-primary font-mono text-sm font-semibold tracking-wide">18 Parameter Standby</p>
        </div>
      </div>

      {/* Prediction Result Alert */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="bg-gradient-to-b from-[#1E2A23] to-[#141E19] border-2 border-brand-primary p-8 rounded-3xl shadow-[0_15px_40px_rgba(46,204,113,0.2)] text-center relative overflow-hidden"
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PredictionResult;
