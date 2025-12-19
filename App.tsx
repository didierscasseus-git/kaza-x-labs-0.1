
import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Layout/Navbar';
import Hero from './components/Sections/Hero';
import Philosophy from './components/Sections/Philosophy';
import Services from './components/Sections/Services';
import Process from './components/Sections/Process';
import Work from './components/Sections/Work';
import CaseStudyDetail from './components/Sections/CaseStudyDetail';
import StrategicSurfaceMap from './components/SystemMap/StrategicSurfaceMap';
import TechStack from './components/Sections/TechStack';
import SystemMetrics from './components/Sections/SystemMetrics';
import CTA from './components/Sections/CTA';
import BackgroundSystem from './components/Motion/BackgroundSystem';
import IntakeEngine from './components/Intake/IntakeEngine';
import ScrollToTop from './components/UI/ScrollToTop';
import LabAssistant from './components/AI/LabAssistant';
import { SystemProvider } from './system/systemContext';

const AppContent: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const handleLocationChange = useCallback(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', handleLocationChange);
    // Custom event for internal navigation
    window.addEventListener('pushstate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('pushstate', handleLocationChange);
    };
  }, [handleLocationChange]);

  const isIntakeRoute = currentPath.includes('/intake');

  useEffect(() => {
    if (isIntakeRoute) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isIntakeRoute]);

  const navigateToHome = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen selection:bg-white selection:text-black bg-[#0a0a0a] text-neutral-200 overflow-x-hidden antialiased">
      <BackgroundSystem />
      
      <div 
        className={`transition-all duration-1000 ease-[0.16,1,0.3,1] ${
          isIntakeRoute 
          ? 'blur-xl grayscale scale-[0.96] opacity-20 pointer-events-none' 
          : 'opacity-100'
        }`}
      >
        <Navbar />
        <main className="relative z-10">
          <Hero />
          <Philosophy />
          <Services />
          <Process />
          <Work />
          <CaseStudyDetail />
          <StrategicSurfaceMap />
          <TechStack />
          <SystemMetrics />
          <CTA />
        </main>
        
        <ScrollToTop />
        <LabAssistant />

        <footer className="relative z-10 py-20 px-6 border-t border-white/5 bg-[#0a0a0a] text-neutral-500 text-sm">
          <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="font-mono text-[9px] uppercase tracking-widest">© {new Date().getFullYear()} Kaza X Labs // System Integrity Verified.</div>
            <div className="flex gap-8 uppercase tracking-[0.3em] text-[9px] font-bold">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Lab_Status</a>
            </div>
          </div>
        </footer>
      </div>

      <AnimatePresence mode="wait">
        {isIntakeRoute && (
          <IntakeEngine isOpen={true} onClose={navigateToHome} />
        )}
      </AnimatePresence>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <SystemProvider>
      <AppContent />
    </SystemProvider>
  );
};

export default App;
