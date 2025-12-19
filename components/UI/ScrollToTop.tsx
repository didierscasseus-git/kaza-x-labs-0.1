
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[60] group"
          aria-label="Scroll to top"
        >
          <div className="relative w-14 h-14 bg-white text-black flex items-center justify-center overflow-hidden shadow-2xl transition-transform active:scale-95">
            {/* Animated Background Overlay */}
            <motion.div 
              className="absolute inset-0 bg-neutral-200 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
            />
            
            {/* Arrow Icon */}
            <span className="relative z-10 text-xl font-light transform group-hover:-translate-y-1 transition-transform duration-300">
              ↑
            </span>

            {/* Micro-interaction Border */}
            <div className="absolute inset-0 border border-black/5 pointer-events-none" />
          </div>
          
          {/* Label Tooltip */}
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            <span className="text-[9px] uppercase tracking-[0.4em] text-white bg-black/50 backdrop-blur-md px-3 py-1 font-bold border border-white/10">
              Back_to_Top
            </span>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
