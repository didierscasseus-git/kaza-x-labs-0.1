import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Reveal from '../UI/Reveal';
import SurfaceNode from './SurfaceNode';
import SurfaceDetailPanel from './SurfaceDetailPanel';
import { useSystemMapData, SurfaceData } from './useSystemMapData';

const StrategicSurfaceMap: React.FC = () => {
  const { getSurfaceConfig, confidence } = useSystemMapData();
  const [activeSurfaceId, setActiveSurfaceId] = useState<string | null>(null);

  const surfaces = ['brand', 'web', 'automation', 'platform', 'growth'].map(id => getSurfaceConfig(id));
  
  const positions = {
    brand: { top: '35%', left: '25%' },
    web: { top: '60%', left: '40%' },
    automation: { top: '30%', left: '65%' },
    platform: { top: '70%', left: '75%' },
    growth: { top: '50%', left: '55%' }
  };

  const activeSurface = activeSurfaceId ? surfaces.find(s => s.id === activeSurfaceId) || null : null;

  return (
    <section className="relative min-h-screen bg-[#050505] flex flex-col justify-center overflow-hidden py-40">
      {/* Background System Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="w-full h-full border-t border-white" style={{ backgroundSize: '100px 100px', backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)' }} />
      </div>

      <div className="max-w-screen-xl mx-auto w-full px-6 md:px-12 relative z-10 pointer-events-none">
        <Reveal>
          <div className="flex flex-col gap-4">
            <span className="text-[10px] uppercase tracking-[0.5em] text-neutral-500 font-bold">Spatial Diagnostic</span>
            <h2 className="text-4xl md:text-7xl font-heading font-black text-white tracking-tighter uppercase leading-[0.9]">
              Strategic Surface Map
            </h2>
            <div className="flex items-center gap-4 mt-6">
              <div className="h-1px w-12 bg-white/20" />
              <p className="text-neutral-500 text-sm font-mono tracking-widest uppercase">Confidence_Index: {(confidence * 100).toFixed(0)}%</p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Nodes Layer */}
      <div className="absolute inset-0 z-20 overflow-hidden">
        {surfaces.map((surface) => (
          <SurfaceNode
            key={surface.id}
            data={surface}
            isActive={activeSurfaceId === surface.id}
            onClick={() => setActiveSurfaceId(surface.id)}
            position={(positions as any)[surface.id]}
          />
        ))}
      </div>

      {/* Connection Lines (Aesthetic background) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-[0.05]">
        <path d="M 25% 35% Q 40% 45% 40% 60%" stroke="white" strokeWidth="1" fill="none" />
        <path d="M 40% 60% Q 55% 55% 75% 70%" stroke="white" strokeWidth="1" fill="none" />
        <path d="M 25% 35% Q 45% 30% 65% 30%" stroke="white" strokeWidth="1" fill="none" />
        <path d="M 65% 30% Q 65% 50% 55% 50%" stroke="white" strokeWidth="1" fill="none" />
        <path d="M 40% 60% Q 50% 55% 55% 50%" stroke="white" strokeWidth="1" fill="none" />
      </svg>

      <SurfaceDetailPanel 
        data={activeSurface} 
        onClose={() => setActiveSurfaceId(null)} 
      />

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-neutral-500 text-[9px] tracking-[0.5em] uppercase font-mono z-30 pointer-events-none opacity-40">
        [ SELECT_SURFACE_TO_QUERY ]
      </div>
    </section>
  );
};

export default StrategicSurfaceMap;