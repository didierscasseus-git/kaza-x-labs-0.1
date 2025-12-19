import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SurfaceData } from './useSystemMapData';

interface SurfaceDetailPanelProps {
  data: SurfaceData | null;
  onClose: () => void;
}

const SurfaceDetailPanel: React.FC<SurfaceDetailPanelProps> = ({ data, onClose }) => {
  return (
    <AnimatePresence>
      {data && (
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-black/90 backdrop-blur-3xl border-l border-white/10 z-[80] p-12 flex flex-col justify-center"
        >
          <button 
            onClick={onClose}
            className="absolute top-12 right-12 text-white/20 hover:text-white transition-colors text-2xl"
          >
            ×
          </button>

          <div className="space-y-12">
            <div>
              <span className="text-[10px] uppercase tracking-[0.5em] text-neutral-500 font-bold mb-4 block">System Artifact</span>
              <h3 className="text-4xl font-heading font-black text-white tracking-tighter uppercase">{data.label}</h3>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest">STATE: {data.state}</span>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h4 className="text-[9px] uppercase tracking-[0.4em] text-white/20 mb-4 font-mono">Pressure_Points:</h4>
                <div className="space-y-2">
                  {data.pressurePoints.map(p => (
                    <div key={p} className="text-sm font-light text-neutral-400 flex items-center gap-3">
                      <span className="w-4 h-[1px] bg-white/10" />
                      {p}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-[9px] uppercase tracking-[0.4em] text-white/20 mb-4 font-mono">Dependencies:</h4>
                <div className="flex flex-wrap gap-2">
                  {data.dependencies.map(d => (
                    <span key={d} className="px-3 py-1 border border-white/5 bg-white/[0.02] text-[9px] font-mono text-white/40 uppercase tracking-wider">
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-white/5">
                <h4 className="text-[9px] uppercase tracking-[0.4em] text-white/20 mb-6 font-mono">Recommended_Protocol:</h4>
                <div className="p-6 bg-white/[0.03] border border-white/5">
                  <p className="text-lg font-bold text-white mb-6 leading-tight">{data.recommendedAction}</p>
                  <button className="w-full py-4 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors">
                    Initialize Protocol
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-12 left-12 font-mono text-[8px] text-white/10 uppercase tracking-[0.5em]">
            Node_Ref: 0x{Math.random().toString(16).slice(2, 10).toUpperCase()}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SurfaceDetailPanel;