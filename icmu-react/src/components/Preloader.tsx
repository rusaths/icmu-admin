import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[10000] bg-bg-deep flex flex-col items-center justify-center p-12"
    >
      <div className="relative flex flex-col items-center gap-12 max-w-md w-full">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex gap-4"
        >
          <img src="/ic-logo.png" alt="IC" className="h-16 w-auto object-contain brightness-125" />
          <img src="/icmu-logo.png" alt="ICMU" className="h-16 w-auto object-contain brightness-125 shadow-[0_0_30px_rgba(28,166,90,0.3)]" />
        </motion.div>

        {/* Text Reveal */}
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white font-black text-xl tracking-[8px] uppercase mb-2"
          >
            Media Unit
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.5 }}
            className="text-white text-[0.6rem] font-bold uppercase tracking-[4px]"
          >
            Isipathana College // Establish 1999
          </motion.p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full h-[2px] bg-white/5 relative mt-4">
          <motion.div
            className="absolute top-0 left-0 h-full bg-accent-green shadow-[0_0_15px_#1ca65a]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
          <div className="absolute top-4 right-0 text-accent-green font-black text-[0.7rem] tabular-nums">
            {progress}%
          </div>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute bottom-12 left-12 flex flex-col gap-1">
        <div className="h-1 w-8 bg-accent-green/20" />
        <div className="h-1 w-12 bg-accent-green/40" />
        <div className="h-1 w-4 bg-accent-green/10" />
      </div>
    </motion.div>
  );
};

export default Preloader;
