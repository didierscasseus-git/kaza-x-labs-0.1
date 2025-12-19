import React from 'react';
import SpatialElement from './SpatialElement';
import { motion } from 'framer-motion';

const BackgroundSystem: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050505]">
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-150 contrast-150 mix-blend-overlay pointer-events-none" />

      {/* Deep Background: Atmospheric Glows */}
      <SpatialElement 
        depth={-1.5} 
        driftIntensity={100} 
        parallaxFactor={350}
        className="absolute top-[-15%] left-[-15%] w-[90vw] h-[90vw] bg-white/[0.015] rounded-full blur-[180px]"
      />

      <SpatialElement 
        depth={-1.0} 
        driftIntensity={120} 
        parallaxFactor={250}
        className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-white/[0.01] rounded-full blur-[150px]"
      />

      {/* Mid-Ground: Structural Accents */}
      <SpatialElement 
        depth={-0.4} 
        driftIntensity={30} 
        parallaxFactor={90}
        className="absolute top-[20%] right-[30%] hidden lg:block"
      >
        <div className="w-[1px] h-[40vh] bg-gradient-to-b from-transparent via-white/10 to-transparent opacity-20" />
      </SpatialElement>

      <SpatialElement 
        depth={-0.6} 
        driftIntensity={25} 
        parallaxFactor={110}
        className="absolute bottom-[25%] left-[25%] hidden md:block"
      >
        <div className="w-[1px] h-[35vh] bg-gradient-to-t from-transparent via-white/5 to-transparent opacity-10" />
      </SpatialElement>

      {/* Interactive Fore-Ground Artifacts */}
      <SpatialElement 
        depth={0.5} 
        driftIntensity={15} 
        parallaxFactor={-70}
        className="absolute top-[15%] left-[12%] select-none"
      >
        <div className="text-[22rem] font-black text-white/[0.018] leading-none select-none -rotate-12">
          X
        </div>
      </SpatialElement>

      <SpatialElement 
        depth={0.3} 
        driftIntensity={20} 
        parallaxFactor={-45}
        className="absolute bottom-[15%] right-[20%] select-none"
      >
        <div className="font-mono text-[10px] text-white/[0.04] uppercase tracking-[2.2em] rotate-90 origin-right whitespace-nowrap">
          LAB_ENGINE_STATUS_READY
        </div>
      </SpatialElement>

      {/* Global Vignette for focused contrast */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.45)_100%)]" />
    </div>
  );
};

export default BackgroundSystem;