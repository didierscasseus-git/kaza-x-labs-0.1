
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface NavbarProps {
  onNavigate: (path: string) => void;
  currentPath: string;
  onOpenReview: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPath, onOpenReview }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'The Rebuild', path: '/offer' },
    { label: 'The Way', path: '/process' },
    { label: 'The Story', path: '/about' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 py-8 px-6 md:px-12 flex justify-between items-center ${
        scrolled ? 'bg-black/95 backdrop-blur-2xl py-4 border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center">
        <button onClick={() => onNavigate('/')} className="flex items-center gap-6 group">
          {/* Single Clear Brand Icon */}
          <div className="w-10 h-10 bg-white flex items-center justify-center group-hover:bg-neutral-200 transition-all duration-500 shadow-xl shadow-white/5">
              <span className="text-black font-black text-sm tracking-tighter">K</span>
          </div>
          
          {/* Impactful Mantra */}
          <div className="flex flex-col">
            <span className="font-heading font-black uppercase tracking-[0.2em] text-[11px] text-white leading-none mb-1">Kaza X Labs</span>
            <span className="font-mono uppercase tracking-[0.4em] text-[7px] text-white/30 group-hover:text-white/60 transition-colors">Engineering Structural Clarity.</span>
          </div>
        </button>
      </div>

      <div className="hidden lg:flex items-center gap-12">
        {navLinks.map((link) => (
          <button
            key={link.path}
            onClick={() => onNavigate(link.path)}
            className={`text-[9px] uppercase tracking-[0.5em] font-bold transition-all duration-500 relative group ${
              currentPath === link.path ? 'text-white' : 'text-white/20 hover:text-white'
            }`}
          >
            {link.label}
            <motion.div 
              className="absolute -bottom-2 left-0 h-[1px] bg-white"
              initial={{ width: 0 }}
              animate={{ width: currentPath === link.path ? '100%' : 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </button>
        ))}
      </div>

      <div className="flex items-center gap-8">
        <button 
          onClick={onOpenReview}
          className={`text-[9px] uppercase tracking-[0.4em] px-10 py-4 transition-all duration-500 font-bold border ${
            scrolled || currentPath !== '/'
              ? 'bg-white text-black border-white hover:bg-neutral-100 shadow-lg shadow-white/5' 
              : 'bg-transparent text-white border-white/10 hover:border-white hover:bg-white/5'
          }`}
        >
          Initiate Review
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
