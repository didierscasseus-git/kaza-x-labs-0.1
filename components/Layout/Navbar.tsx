import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [isPathIntake, setIsPathIntake] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handlePath = () => setIsPathIntake(window.location.pathname.includes('/intake'));
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('popstate', handlePath);
    window.addEventListener('pushstate', handlePath);
    
    // Initial checks
    handleScroll();
    handlePath();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handlePath);
      window.removeEventListener('pushstate', handlePath);
    };
  }, []);

  useEffect(() => {
    const sections = ['approach', 'services', 'work', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleIntakeNavigation = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, '', '/intake');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const navLinks = [
    { label: 'Approach', href: '#approach', id: 'approach' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Work', href: '#work', id: 'work' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 py-8 px-6 md:px-12 flex justify-between items-center ${
        scrolled ? 'bg-black/90 backdrop-blur-xl py-4 border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center gap-2">
        <a href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
              <span className="text-black font-bold text-xs">K</span>
          </div>
          <span className="font-heading font-bold uppercase tracking-[0.3em] text-[11px] text-white">Kaza X Labs</span>
        </a>
      </div>

      <div className="hidden md:flex gap-12 text-[9px] uppercase tracking-[0.4em] font-bold text-neutral-400">
        {navLinks.map((link) => {
          const isActive = activeSection === link.id;
          
          return (
            <a
              key={link.id}
              href={link.href}
              className={`relative py-1 transition-colors duration-300 hover:text-white ${
                isActive ? 'text-white' : 'text-neutral-500'
              }`}
            >
              {link.label}
              {isActive && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-white"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          );
        })}
      </div>

      <div className="flex items-center gap-8">
        <button 
          onClick={handleIntakeNavigation}
          className={`hidden md:block text-[9px] uppercase tracking-[0.3em] font-bold transition-all duration-500 ${
            scrolled ? 'text-white' : 'text-white/40 hover:text-white'
          }`}
        >
          Diagnose System
        </button>
        <button 
          className={`text-[9px] uppercase tracking-[0.3em] px-8 py-3 transition-all duration-500 font-bold border ${
            scrolled 
              ? 'bg-white text-black border-white' 
              : 'bg-transparent text-white/20 border-white/10 hover:border-white hover:text-white'
          }`}
        >
          Start Project
        </button>
      </div>
    </nav>
  );
};

export default Navbar;