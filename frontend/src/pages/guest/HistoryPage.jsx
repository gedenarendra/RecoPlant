import React from 'react';
import { Trash2, Clock, MapPin, ChevronRight, Edit3, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useHistoryController } from '../../hooks/useHistoryController';

const HistoryPage = () => {
  const { 
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
  } = useHistoryController();

  if (loading) return (
    <div className="container min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#27ae60] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a110d] text-white relative px-6">
      <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: 'url(/global-bg.png)' }} />
      <div className="absolute inset-0 z-0 bg-[#0a110d]/90 backdrop-blur-sm" />
      <div className="relative z-10 bg-red-500/10 border border-red-500/30 p-8 rounded-3xl max-w-md text-center shadow-2xl backdrop-blur-md">
        <p className="text-red-400 mb-6 font-medium text-lg">{error}</p>
        <button
          onClick={fetchHistory}
          className="px-8 py-3 bg-[#27ae60] hover:bg-brand-primary text-white font-bold rounded-xl transition-all shadow-[0_4px_15px_rgba(46,204,113,0.3)] hover:scale-105"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  );

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
      <div className="container mx-auto px-6 relative z-10" style={{ paddingTop: '130px', paddingBottom: '80px' }}>
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Clock className="text-[#27ae60]" size={28} />
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              Riwayat <span className="text-[#27ae60]">Prediksi Lahan</span>
            </h1>
          </div>
          <p className="text-white/60 text-lg">
            Daftar seluruh hasil analisis spektral dan spasial yang pernah Anda lakukan.
          </p>
        </motion.div>

        <motion.div
          className="bg-[#1A241E] border border-white/10 shadow-2xl rounded-3xl overflow-hidden relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-[1px] bg-gradient-to-r from-transparent via-[#27ae60]/50 to-transparent"></div>

          <div className="overflow-x-auto p-6 md:p-8">
            {predictions.length === 0 ? (
              <div className="text-center py-16">
                <MapPin size={48} className="mx-auto text-white/20 mb-4" />
                <p className="text-white/50 text-lg">Belum ada riwayat prediksi tersimpan.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-white/50 text-sm uppercase tracking-wider">
                    <th className="py-4 px-6 font-semibold">Tanggal</th>
                    <th className="py-4 px-6 font-semibold">Komoditas Rekomendasi</th>
                    <th className="py-4 px-6 font-semibold">Akurasi</th>
                    <th className="py-4 px-6 font-semibold">Parameter Satelit</th>
                    <th className="py-4 px-6 font-semibold">Catatan Lapangan</th>
                    <th className="py-4 px-6 font-semibold text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {predictions.map((item, index) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="py-5 px-6 text-white/80">
                        {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </td>
                      <td className="py-5 px-6 font-bold text-brand-primary text-lg flex items-center gap-2">
                        <ChevronRight size={16} className="text-brand-primary/50" />
                        {item.result_plant}
                      </td>
                      <td className="py-5 px-6">
                        <div className="inline-flex items-center gap-2 bg-brand-primary/10 px-3 py-1 rounded-full border border-brand-primary/20">
                          <span className="text-brand-primary font-mono font-bold">
                            {Math.round(item.confidence_score <= 1 ? item.confidence_score * 100 : item.confidence_score)}%
                          </span>
                        </div>
                      </td>
                      <td className="py-5 px-6 text-white/60 text-sm font-mono">
                        NDVI: {item.input_features?.NDVI || '-'} | EVI: {item.input_features?.EVI || '-'}
                      </td>
                      <td className="py-5 px-6 text-sm">
                        {editingId === item.id ? (
                          <div className="flex items-center gap-2 max-w-[280px]">
                            <input
                              type="text"
                              value={tempNotes}
                              onChange={(e) => setTempNotes(e.target.value)}
                              className="bg-black/40 border border-brand-primary/30 text-white text-sm px-3 py-1.5 rounded-lg focus:outline-none focus:border-brand-primary w-full"
                              placeholder="Tambah catatan..."
                              autoFocus
                            />
                            <button
                              onClick={() => handleUpdateNotes(item.id, tempNotes)}
                              className="p-1.5 rounded-lg bg-brand-primary/20 text-brand-primary hover:bg-brand-primary/30 transition-colors flex-shrink-0"
                              title="Simpan"
                            >
                              <Check size={16} />
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors flex-shrink-0"
                              title="Batal"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-white/70 group/notes max-w-[280px]">
                            <span className={item.notes ? "text-white/80" : "text-white/30 italic"}>
                              {item.notes || 'Belum ada catatan'}
                            </span>
                            <button
                              onClick={() => {
                                setEditingId(item.id);
                                setTempNotes(item.notes || '');
                              }}
                              className="p-1 rounded-md text-white/30 hover:text-brand-primary hover:bg-white/5 transition-all opacity-0 group-hover/notes:opacity-100 focus:opacity-100"
                              title="Edit Catatan"
                            >
                              <Edit3 size={14} />
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="py-5 px-6 text-right">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all opacity-50 group-hover:opacity-100"
                          title="Hapus Riwayat"
                        >
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HistoryPage;
