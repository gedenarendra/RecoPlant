import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLoginController } from '../hooks/useLoginController';

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    isLogin,
    currentImg,
    formData,
    error,
    loading,
    loginImages,
    handleInputChange,
    handleSubmit,
    toggleLoginMode
  } = useLoginController();

  return (
    <div className="min-h-screen w-full flex bg-brand-dark font-sans pt-0 relative">

      {/* Back Button (Stack based) */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 md:top-8 md:left-8 z-50 flex items-center gap-2 text-white/80 hover:text-white bg-black/30 hover:bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300 cursor-pointer"
      >
        <ArrowLeft size={18} />
        <span className="text-sm font-semibold">Kembali</span>
      </button>

      {/* Left side: Premium Image Area with Slideshow */}
      <motion.div
        className="hidden lg:flex lg:w-1/2 relative bg-brand-dark overflow-hidden"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImg}
            src={loginImages[currentImg]}
            alt="Agriculture Tech"
            className="absolute inset-0 w-full h-full object-cover opacity-70"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent"></div>
        <div className="absolute inset-0 bg-brand-primary/10 mix-blend-overlay"></div>

        {/* Left Side Text Content */}
        <div className="absolute bottom-20 left-16 max-w-lg z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl lg:text-5xl font-semibold text-white mb-4 leading-tight"
          >
            Bergabung bersama<br />Pertanian Pintar
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg text-white/70"
          >
            Platform berbasis Machine Learning untuk mengoptimalkan potensi lahan dan hasil panen Anda.
          </motion.p>
        </div>
      </motion.div>

      {/* Right side: Form Area */}
      <motion.div
        className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-24 relative pt-32 lg:pt-0"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full max-w-md flex flex-col z-10">

          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              {isLogin ? 'Selamat Datang' : 'Mulai Perjalanan Anda'}
            </h2>
            <p className="text-white/60">
              {isLogin ? 'Masuk kembali ke akun RecoPlant Anda.' : 'Daftar sekarang untuk revolusi lahan Anda.'}
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-red-400 bg-red-500/10 border border-red-500/20 p-4 rounded-xl mb-6 text-sm text-center"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {!isLogin && (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white/70 ml-1">Nama Lengkap</label>
                <input
                  type="text"
                  placeholder="Masukkan nama Anda"
                  className="bg-white/5 border border-white/10 text-white p-4 rounded-xl focus:outline-none focus:border-brand-primary focus:bg-white/10 transition-all"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-white/70 ml-1">Username</label>
              <input
                type="text"
                placeholder="Masukkan username"
                className="bg-white/5 border border-white/10 text-white p-4 rounded-xl focus:outline-none focus:border-brand-primary focus:bg-white/10 transition-all"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-white/70 ml-1">Kata Sandi</label>
              <input
                type="password"
                placeholder="Masukkan kata sandi"
                className="bg-white/5 border border-white/10 text-white p-4 rounded-xl focus:outline-none focus:border-brand-primary focus:bg-white/10 transition-all"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-[70%] md:w-[60%] mx-auto py-3 mt-4 bg-[#27ae60] hover:bg-brand-primary disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold text-[15px] rounded-xl transition-all duration-300"
            >
              {loading ? (isLogin ? 'Memproses...' : 'Mendaftar...') : (isLogin ? 'Masuk' : 'Daftar Akun')}
            </button>
          </form>

          <div className="mt-10 text-center text-white/50 text-sm">
            {isLogin ? 'Belum memiliki akun? ' : 'Sudah punya akun? '}
            <button
              type="button"
              onClick={toggleLoginMode}
              className="text-brand-primary font-bold hover:underline ml-1"
            >
              {isLogin ? 'Daftar di sini' : 'Masuk di sini'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
