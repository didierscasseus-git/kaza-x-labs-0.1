
import React, { useState } from 'react';
import Navbar from './Layout/Navbar';
import Hero from './Sections/Hero';
import Philosophy from './Sections/Philosophy';
import Services from './Sections/Services';
import Process from './Sections/Process';
import Work from './Sections/Work';
import TechStack from './Sections/TechStack';
import SystemMetrics from './Sections/SystemMetrics';
import Qualification from './Sections/Qualification';
import CTA from './Sections/CTA';
import CaseStudyDetail from './Sections/CaseStudyDetail';
import ScrollToTop from './UI/ScrollToTop';
import LabAssistant from './AI/LabAssistant';
import BackgroundSystem from './Motion/BackgroundSystem';
import StrategicSurfaceMap from './SystemMap/StrategicSurfaceMap';
import { useDiagnostic } from '../context/DiagnosticContext';

export const AppShell: React.FC = () => {
  const { openDiagnostic } = useDiagnostic();
  const [currentPath, setCurrentPath] = useState('/');

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    const id = path.startsWith('/') ? path.substring(1) : path;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (path === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative overflow-x-hidden">
      <BackgroundSystem />
      <Navbar 
        onNavigate={handleNavigate} 
        currentPath={currentPath} 
        onOpenReview={openDiagnostic} 
      />
      
      <main>
        <Hero onOpenReview={openDiagnostic} />
        <Philosophy />
        <Services />
        <Process />
        <StrategicSurfaceMap />
        <Work onOpenReview={openDiagnostic} />
        <CaseStudyDetail />
        <TechStack />
        <SystemMetrics />
        <Qualification />
        <CTA onOpenReview={openDiagnostic} />
      </main>

      <ScrollToTop />
      <LabAssistant />
    </div>
  );
};
