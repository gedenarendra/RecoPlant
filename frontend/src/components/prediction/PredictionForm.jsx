import React from 'react';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 }
};

const PredictionForm = ({ params, handleInputChange, handleSubmit, loading, error }) => {
  return (
    <motion.div variants={itemVariants} className="w-full lg:w-2/3 bg-[#1A241E] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        {/* Waktu & Musim */}
        <section>
          <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-3">
            <h4 className="text-xl font-bold text-white tracking-wide">Waktu & Musim</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black/20 p-5 rounded-2xl border border-white/5">
              <div className="flex justify-between mb-3">
                <label className="text-white/60 font-semibold text-sm">Day of Year (DOY)</label>
                <span className="text-brand-primary font-mono bg-brand-primary/10 px-2 py-0.5 rounded text-sm">{params.DOY}</span>
              </div>
              <input type="range" name="DOY" min="1" max="365" step="1" value={params.DOY} onChange={handleInputChange} className="w-full accent-brand-primary cursor-pointer" />
            </div>
            <div className="bg-black/20 p-5 rounded-2xl border border-white/5">
              <div className="flex justify-between mb-3">
                <label className="text-white/60 font-semibold text-sm">Bulan (Month)</label>
                <span className="text-brand-primary font-mono bg-brand-primary/10 px-2 py-0.5 rounded text-sm">{params.Month}</span>
              </div>
              <input type="range" name="Month" min="1" max="12" step="1" value={params.Month} onChange={handleInputChange} className="w-full accent-brand-primary cursor-pointer" />
              {![3, 8, 9].includes(params.Month) && (
                <p className="text-amber-500 text-xs mt-2 font-medium">
                  ⚠️ Model dilatih dengan data bulan Maret (3), Agustus (8), dan September (9). Prediksi untuk bulan {params.Month} berada di luar jangkauan data training.
                </p>
              )}
            </div>

            <div className="bg-black/20 p-5 rounded-2xl border border-white/5">
              <label className="text-white/60 font-semibold text-sm block mb-3">Musim (Season)</label>
              <select name="Season_enc" value={params.Season_enc} onChange={handleInputChange} className="w-full bg-[#141E19] text-white border border-white/10 rounded-xl p-3 focus:outline-none focus:border-brand-primary transition-colors appearance-none cursor-pointer">
                <option value="1">Kharif (Apr–Okt)</option>
                <option value="0">Rabi (Nov–Mar)</option>
              </select>
            </div>
            <div className="bg-black/20 p-5 rounded-2xl border border-white/5">
              <label className="text-white/60 font-semibold text-sm block mb-3">Fase Pertumbuhan (Stage)</label>
              <select name="Stage_enc" value={params.Stage_enc} onChange={handleInputChange} className="w-full bg-[#141E19] text-white border border-white/10 rounded-xl p-3 focus:outline-none focus:border-brand-primary transition-colors appearance-none cursor-pointer">
                <option value="-1">Tidak berlaku / tidak diketahui</option>
                <option value="0">Pembajakan (Ploughing)</option>
                <option value="1">Penanaman (Sowing)</option>
                <option value="2">Awal pertumbuhan (Initial)</option>
                <option value="3">Vegetatif</option>
                <option value="4">Puncak pertumbuhan (Peak Growth)</option>
                <option value="5">Generatif (Reproductive)</option>
                <option value="6">Matang (Mature)</option>
                <option value="7">Panen (Harvested)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Indeks Vegetasi & Spektral */}
        <section>
          <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-3 mt-4">
            <h4 className="text-xl font-bold text-white tracking-wide">Indeks Vegetasi & Spektral</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black/20 p-5 rounded-2xl border border-white/5 md:col-span-2 flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="flex justify-between mb-3">
                  <label className="text-white/60 font-semibold text-sm">NDVI</label>
                  <span className="text-brand-primary font-mono bg-brand-primary/10 px-2 py-0.5 rounded text-sm">{params.NDVI}</span>
                </div>
                <input type="range" name="NDVI" min="-1" max="1" step="0.01" value={params.NDVI} onChange={handleInputChange} className="w-full accent-brand-primary cursor-pointer" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-3">
                  <label className="text-white/60 font-semibold text-sm">NDWI</label>
                  <span className="text-brand-primary font-mono bg-brand-primary/10 px-2 py-0.5 rounded text-sm">{params.NDWI}</span>
                </div>
                <input type="range" name="NDWI" min="-1" max="1" step="0.01" value={params.NDWI} onChange={handleInputChange} className="w-full accent-brand-primary cursor-pointer" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-3">
                  <label className="text-white/60 font-semibold text-sm">EVI</label>
                  <span className="text-brand-primary font-mono bg-brand-primary/10 px-2 py-0.5 rounded text-sm">{params.EVI}</span>
                </div>
                <input type="range" name="EVI" min="-2" max="2" step="0.01" value={params.EVI} onChange={handleInputChange} className="w-full accent-brand-primary cursor-pointer" />
              </div>
            </div>

            <div className="bg-black/20 p-5 rounded-2xl border border-white/5">
              <div className="flex justify-between mb-3">
                <label className="text-white/60 font-semibold text-sm">Red</label>
                <span className="text-brand-primary font-mono bg-brand-primary/10 px-2 py-0.5 rounded text-sm">{params.Red}</span>
              </div>
              <input type="range" name="Red" min="0" max="3500" step="1" value={params.Red} onChange={handleInputChange} className="w-full accent-brand-primary cursor-pointer" />
            </div>
            <div className="bg-black/20 p-5 rounded-2xl border border-white/5">
              <div className="flex justify-between mb-3">
                <label className="text-white/60 font-semibold text-sm">Green</label>
                <span className="text-brand-primary font-mono bg-brand-primary/10 px-2 py-0.5 rounded text-sm">{params.Green}</span>
              </div>
              <input type="range" name="Green" min="0" max="2500" step="1" value={params.Green} onChange={handleInputChange} className="w-full accent-brand-primary cursor-pointer" />
            </div>
            <div className="bg-black/20 p-5 rounded-2xl border border-white/5">
              <div className="flex justify-between mb-3">
                <label className="text-white/60 font-semibold text-sm">NIR</label>
                <span className="text-brand-primary font-mono bg-brand-primary/10 px-2 py-0.5 rounded text-sm">{params.NIR}</span>
              </div>
              <input type="range" name="NIR" min="1000" max="5000" step="1" value={params.NIR} onChange={handleInputChange} className="w-full accent-brand-primary cursor-pointer" />
            </div>
            <div className="bg-black/20 p-5 rounded-2xl border border-white/5">
              <div className="flex justify-between mb-3">
                <label className="text-white/60 font-semibold text-sm">SWIR</label>
                <span className="text-brand-primary font-mono bg-brand-primary/10 px-2 py-0.5 rounded text-sm">{params.SWIR}</span>
              </div>
              <input type="range" name="SWIR" min="0" max="4500" step="1" value={params.SWIR} onChange={handleInputChange} className="w-full accent-brand-primary cursor-pointer" />
            </div>
          </div>
        </section>

        {/* Spasial & Geografis */}
        <section>
          <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-3 mt-4">
            <h4 className="text-xl font-bold text-white tracking-wide">Spasial & Geografis</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black/20 p-5 rounded-2xl border border-white/5 flex flex-col">
              <label className="text-white/60 font-semibold text-sm mb-3">Latitude</label>
              <input type="number" step="0.0001" min="24" max="36" name="Latitude" value={params.Latitude} onChange={handleInputChange} className="w-full bg-[#141E19] text-white border border-white/10 rounded-xl p-3 focus:outline-none focus:border-brand-primary transition-colors" />
            </div>
            <div className="bg-black/20 p-5 rounded-2xl border border-white/5 flex flex-col">
              <label className="text-white/60 font-semibold text-sm mb-3">Longitude</label>
              <input type="number" step="0.0001" min="64" max="75" name="Longitude" value={params.Longitude} onChange={handleInputChange} className="w-full bg-[#141E19] text-white border border-white/10 rounded-xl p-3 focus:outline-none focus:border-brand-primary transition-colors" />
            </div>
            <div className="bg-black/20 p-5 rounded-2xl border border-white/5 flex flex-col">
              <label className="text-white/60 font-semibold text-sm mb-3">Cluster ID</label>
              <select name="Cluster" value={params.Cluster} onChange={handleInputChange} className="w-full bg-[#141E19] text-white border border-white/10 rounded-xl p-3 focus:outline-none focus:border-brand-primary transition-colors appearance-none cursor-pointer">
                <option value="0">Klaster 0</option>
                <option value="1">Klaster 1</option>
              </select>
            </div>
            <div className="bg-black/20 p-5 rounded-2xl border border-white/5 flex flex-col">
              <label className="text-white/60 font-semibold text-sm mb-3">Cluster K4</label>
              <select name="Cluster_K4" value={params.Cluster_K4} onChange={handleInputChange} className="w-full bg-[#141E19] text-white border border-white/10 rounded-xl p-3 focus:outline-none focus:border-brand-primary transition-colors appearance-none cursor-pointer">
                <option value="0">Klaster 0</option>
                <option value="1">Klaster 1</option>
                <option value="2">Klaster 2</option>
                <option value="3">Klaster 3</option>
              </select>
            </div>
          </div>
        </section>

        <div className="flex justify-center mt-4">
          <button
            type="submit"
            disabled={loading}
            className={`py-3 px-10 text-white font-bold text-lg rounded-xl transition-all flex items-center justify-center ${loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#27ae60] hover:bg-green-600'}`}
          >
            <span>{loading ? 'Memproses...' : 'Mulai Prediksi'}</span>
          </button>
        </div>
        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-center font-medium mt-2">
            {error}
          </motion.div>
        )}
      </form>
    </motion.div>
  );
};

export default PredictionForm;
