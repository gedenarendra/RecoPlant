import { useState, useEffect } from 'react';

export const useTypingAnimation = (phrases) => {
  const [displayedText, setDisplayedText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let typingSpeed = isDeleting ? 40 : 100;
    let timer;

    if (!isDeleting && displayedText === currentPhrase) {
      // Tunggu sebentar setelah selesai mengetik, lalu mulai menghapus
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayedText === '') {
      // Pindah ke kata selanjutnya setelah selesai menghapus
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
      // Jeda singkat sebelum mengetik kata baru
      timer = setTimeout(() => { }, 500);
    } else {
      // Proses mengetik atau menghapus
      timer = setTimeout(() => {
        setDisplayedText(prev =>
          isDeleting
            ? currentPhrase.substring(0, prev.length - 1)
            : currentPhrase.substring(0, prev.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, phraseIndex, phrases]);

  return { displayedText, isDeleting };
};
