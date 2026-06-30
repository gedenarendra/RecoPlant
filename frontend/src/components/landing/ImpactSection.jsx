import React from 'react';
import { motion } from 'framer-motion';

const ImpactSection = () => {
  const glassStyle = "bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col md:flex-row items-start md:items-center gap-6";

  return (
    <section id="about" className="container mx-auto px-6 pt-32 pb-20 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="mb-12"
      >
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium max-w-4xl leading-tight text-center md:text-left mx-auto md:mx-0">
          Mengubah data lahan menjadi <br className="hidden md:block" />potensi panen maksimal
        </h2>
      </motion.div>

      <div className="flex flex-col lg:flex-row w-full gap-10 items-stretch">

        {/* Left Image/Video Area */}
        <motion.div
          className="flex-grow lg:w-2/3 relative rounded-[2rem] overflow-hidden min-h-[300px] lg:min-h-[400px]"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <img
            src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1000&q=80"
            alt="Farmer Technology"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>

        {/* Right: 3 Stacked Stat Cards */}
        <div className="flex flex-col gap-6 lg:w-1/3">

          <motion.div className={glassStyle}
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <span className="text-5xl md:text-6xl font-light leading-none">18</span>
            <span className="text-lg text-white/70 leading-snug">Parameter diperlukan<br /></span>
          </motion.div>

          <motion.div className={glassStyle}
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <span className="text-5xl md:text-6xl font-light leading-none">5</span>
            <span className="text-lg text-white/70 leading-snug">Komoditas Tanaman<br />direkomendasikan</span>
          </motion.div>

          <motion.div className={glassStyle}
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <span className="text-5xl md:text-6xl font-light leading-none">92%</span>
            <span className="text-lg text-white/70 leading-snug">Akurasi klasifikasi<br />Machine Learning</span>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
