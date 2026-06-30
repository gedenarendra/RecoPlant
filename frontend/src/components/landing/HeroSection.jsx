import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useTypingAnimation } from '../../hooks/useTypingAnimation';

const phrases = ["lahan cerdas", "pertanian modern", "akurasi presisi"];

const HeroSection = () => {
  const textPart1 = "Prediksi komoditas ";
  const { displayedText } = useTypingAnimation(phrases);

  return (
    <section id="hero" className="container mx-auto px-6 min-h-screen flex items-center justify-center py-24 mb-12 md:mb-20 scroll-mt-24">
      <div className="flex flex-col md:flex-row w-full gap-12 md:gap-16 items-center justify-between">

        {/* Left: Text */}
        <motion.div
          className="flex-1 max-w-2xl text-center md:text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl mb-6 leading-tight font-bold tracking-tight text-white flex flex-wrap justify-center md:justify-start items-center">
            <span className="animate-shine whitespace-pre-wrap">
              {textPart1}
              <br className="hidden md:block" />
              {displayedText}
            </span>
            <span className="inline-block w-[4px] md:w-[6px] h-[40px] md:h-[60px] bg-brand-primary ml-2 animate-blink"></span>
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-lg mx-auto md:mx-0 leading-relaxed text-white/70">
            Ubah data cuaca dan tanah menjadi rekomendasi panen terbaik. Ciptakan efisiensi pertanian dengan dukungan Machine Learning.
          </p>
        </motion.div>

        {/* Right: Floating Glass Card */}
        <motion.div
          className="flex-none flex justify-center md:justify-end w-full md:w-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 w-full max-w-[460px] flex flex-col items-center shadow-2xl group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full h-[360px] rounded-2xl overflow-hidden mb-5 bg-white/5 relative">
              <img
                src="/farmer-rice.png"
                alt="Petani Menanam Padi"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
            </div>
            <Link to="/predict" className="w-full">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl bg-white text-black font-semibold text-base flex justify-center items-center gap-2 cursor-pointer hover:bg-gray-100 transition-colors"
              >
                Mulai Prediksi <ArrowUpRight size={20} />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
