import React from 'react';
import { motion } from 'framer-motion';
import Reveal from '../UI/Reveal';

interface IntakeLandingProps {
  onStart: () => void;
  isResuming?: boolean;
}

const IntakeLanding: React.FC<IntakeLandingProps> = ({ onStart, isResuming = false }) => {
  return (
    <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      <div>
        <Reveal>
          <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-neutral-500 mb-8 block font-bold">
            Phase 01: {isResuming ? 'Resume Calibration' : 'Initial Calibration'}
          </span>
        </Reveal>
        <Reveal delay={0.2}>
          <h2 className="text-5xl md:text-7xl font-heading font-extrabold text-white tracking-tighter leading-[0.9] mb-12">
            {isResuming 
              ? "Pick up where you left off." 
              : "Diagnose your brand + system in minutes."}
          </h2>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="text-xl text-neutral-400 font-light leading-relaxed mb-12">
            {isResuming 
              ? "Your previous diagnostic data has been preserved. Continue the analysis to unlock your strategic technical roadmap."
              : "Not a sales form. A strategic diagnostic engine designed to map your current architecture and identify compound growth bottlenecks."}
          </p>
        </Reveal>
        
        <Reveal delay={0.4}>
          <button 
            onClick={onStart}
            className="group relative bg-white text-black px-12 py-6 font-bold uppercase tracking-widest text-[11px] overflow-hidden shadow-2xl shadow-white/10"
          >
            <span className="relative z-10">{isResuming ? 'Resume Diagnostic' : 'Start Diagnostic'}</span>
            <motion.div 
              className="absolute inset-0 bg-neutral-200 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
            />
          </button>
        </Reveal>
      </div>

      <div className="bg-white/[0.02] border border-white/10 p-12 relative overflow-hidden group">
        {/* Background Visual Element */}
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <div className="w-32 h-32 border border-white rotate-12 flex items-center justify-center">
             <div className="w-16 h-16 border border-white/20" />
          </div>
        </div>
        
        <h3 className="text-[10px] uppercase tracking-widest text-white/40 mb-10 font-bold">Engine Outputs:</h3>
        <ul className="space-y-8 relative z-10">
          {[
            { label: 'System Diagnosis', desc: 'Detailed signal mapping of technical and brand maturity.' },
            { label: 'Priority Plan', desc: 'A 3-step sequence to eliminate operational friction.' },
            { label: 'Strategic Recommendation', desc: 'Direct routing to the appropriate engineering track.' }
          ].map((item, i) => (
            <motion.li 
              key={item.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + (i * 0.1) }}
              className="flex gap-6"
            >
              <span className="text-white/20 font-mono text-xs">0{i+1}</span>
              <div>
                <span className="text-white font-bold block mb-1 uppercase tracking-wider text-[10px]">{item.label}</span>
                <span className="text-neutral-500 text-sm font-light leading-relaxed">{item.desc}</span>
              </div>
            </motion.li>
          ))}
        </ul>

        <div className="mt-12 pt-12 border-t border-white/5 flex justify-between items-center">
            <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest italic">
              *Local Session Persistence Active
            </span>
            <div className="flex gap-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div 
                  key={i} 
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ repeat: Infinity, duration: 2, delay: i * 0.4 }}
                  className="w-1 h-1 bg-white" 
                />
              ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default IntakeLanding;