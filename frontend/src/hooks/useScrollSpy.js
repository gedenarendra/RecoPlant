import { useState, useEffect } from 'react';

export const useScrollSpy = (sectionIds, offset = 200) => {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      let currentId = '';
      
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Cek apakah elemen saat ini sedang melewati garis offset di layar
          if (rect.top <= offset && rect.bottom >= offset) {
            currentId = id;
            break; // Berhenti mencari karena elemen ini yang sedang aktif
          }
        }
      }

      // Jika kita benar-benar di atas (y=0), pastikan section pertama aktif
      if (window.scrollY < 50 && sectionIds.length > 0) {
        currentId = sectionIds[0];
      }

      // Jika discroll mentok sampai bawah, aktifkan section terakhir
      if (window.innerHeight + Math.round(window.scrollY) >= document.body.offsetHeight - 50) {
        currentId = sectionIds[sectionIds.length - 1];
      }

      if (currentId) {
        setActiveId(currentId);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Inisialisasi saat pertama mount
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return activeId;
};
