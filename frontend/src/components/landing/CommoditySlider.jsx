import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { showcasePlants } from '../../data/mockData';

const CommoditySlider = ({ selectedPlant, setSelectedPlant }) => {
  return (
    <>
      <section className="py-20">
        <div className="container mx-auto px-6 mb-10 text-center">
          <h3 className="text-3xl md:text-4xl font-medium">Jelajahi Komoditas Pangan</h3>
        </div>

        {/* Slider Container */}
        <div className="flex gap-6 pb-8 pt-4 px-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
          {showcasePlants.map((plant) => (
            <motion.div
              key={plant.id}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedPlant(plant)}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 cursor-pointer flex flex-col flex-none w-[280px] snap-center"
            >
              <div className="w-full h-[180px] rounded-2xl overflow-hidden mb-5 bg-white/5">
                <img src={plant.img} alt={plant.name} className="w-full h-full object-cover" />
              </div>
              <h4 className="text-xl font-semibold mb-3">{plant.name}</h4>
              <p className="text-sm text-white/60 leading-relaxed line-clamp-3">
                {plant.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MODAL FOR PLANT DETAILS */}
      <AnimatePresence>
        {selectedPlant && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center p-6"
            onClick={() => setSelectedPlant(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#141E19]/90 backdrop-blur-xl border border-white/10 max-w-lg w-full p-8 md:p-10 rounded-3xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPlant(null)}
                className="absolute top-6 right-6 bg-transparent border-none text-white cursor-pointer hover:text-gray-300 transition-colors"
              >
                <X size={24} />
              </button>

              <div className="w-full h-[200px] flex justify-center mb-6 rounded-2xl overflow-hidden">
                <img src={selectedPlant.img} alt={selectedPlant.name} className="w-full h-full object-cover" />
              </div>

              <h2 className="text-3xl font-semibold mb-4 text-white">{selectedPlant.name}</h2>
              <p className="text-lg leading-relaxed text-white/70">
                {selectedPlant.desc}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommoditySlider;
