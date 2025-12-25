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
          <span className="text-[10px] font-mono uppercase tracking-[0.6em] text-neutral-600 mb-8 block font-bold italic">
            Sequence 01: {isResuming ? 'Resume Analysis' : 'Diagnostic Entry'}
          </span>
        </Reveal>
        <Reveal delay={0.2}>
          <h2 className="text-5xl md:text-7xl font-heading font-extrabold text-white tracking-tighter leading-[0.9] mb-12 uppercase">
            {isResuming 
              ? "Resuming Assessment." 
              : "Identify the structural gaps."}
          </h2>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="text-xl text-neutral-500 font-light leading-relaxed mb-16">
            {isResuming 
              ? "Your previous diagnostic data is preserved. Let's continue the assessment of your core systems."
              : "This brief inquiry allows us to audit the current state of your foundations. We look for the specific points where your brand and your technology have diverged."}
          </p>
        </Reveal>
        
        <Reveal delay={0.4}>
          <button 
            onClick={onStart}
            className="group relative bg-white text-black px-14 py-7 font-bold uppercase tracking-[0.5em] text-[10px] overflow-hidden shadow-2xl shadow-white/5 active:scale-95 transition-transform"
          >
            <span className="relative z-10">{isResuming ? 'Continue Protocol' : 'Commence Assessment'}</span>
            <motion.div 
              className="absolute inset-0 bg-neutral-200 translate-y-full group-hover:translate-y-0 transition-transform duration-700"
            />
          </button>
        </Reveal>
      </div>

      <div className="bg-white/[0.01] border border-white/5 p-12 md:p-16 relative overflow-hidden group">
        <h3 className="text-[9px] uppercase tracking-[0.4em] text-white/10 mb-12 font-bold font-mono">Evaluation Parameters:</h3>
        <ul className="space-y-10 relative z-10">
          {[
            { label: 'Technical Review', desc: 'A senior-level audit of where your digital systems are resisting growth.' },
            { label: 'Integrated Roadmap', desc: 'A clear 12-week blueprint to replace fragmented legacy tools.' },
            { label: 'Partner Allocation', desc: 'Direct coordination with our senior team once your profile is verified.' }
          ].map((item, i) => (
            <motion.li 
              key={item.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + (i * 0.1), duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex gap-8"
            >
              <span className="text-white/10 font-mono text-[10px] mt-1">0{i+1}</span>
              <div>
                <span className="text-white font-bold block mb-2 uppercase tracking-[0.2em] text-[10px]">{item.label}</span>
                <span className="text-neutral-500 text-[13px] font-light leading-relaxed">{item.desc}</span>
              </div>
            </motion.li>
          ))}
        </ul>

        <div className="mt-16 pt-12 border-t border-white/5 flex justify-between items-center">
            <span className="text-[8px] font-mono text-white/10 uppercase tracking-[0.4em] italic">
              *Secure Peer-to-Peer Protocol
            </span>
            <div className="flex gap-1.5">
              {Array.from({ length: 4 }).map((_, i) => (
                <motion.div 
                  key={i} 
                  animate={{ opacity: [0.1, 1, 0.1] }}
                  transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.5 }}
                  className="w-1 h-1 bg-white/40" 
                />
              ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default IntakeLanding;