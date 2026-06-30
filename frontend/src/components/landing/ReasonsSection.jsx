import React from 'react';
import { motion } from 'framer-motion';
import { reasonsData } from '../../data/mockData';

const ReasonsSection = () => {
  return (
    <section id="reasons" className="container mx-auto px-6">
      <div className="pt-32 pb-20">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-medium text-center mb-16 max-w-3xl mx-auto"
        >
          4 alasan mengapa prediksi bersama kami sangat diandalkan
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasonsData.map((item, index) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col h-full"
            >
              <div className="text-6xl md:text-7xl font-light text-white leading-none mb-6">
                {item.num}
              </div>
              <h4 className="text-xl md:text-2xl font-medium mb-4">{item.title}</h4>
              <p className="text-base text-white/60 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReasonsSection;
