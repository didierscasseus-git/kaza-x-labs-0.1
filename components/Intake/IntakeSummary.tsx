import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { IntakeState } from '../../types';
import { determineRecommendation } from '../../scoringModel';
import ProposalView from '../../proposal/ProposalView';
import { DURATION_TOKENS, EASING_TOKENS, TRANSITION_PRESETS } from '../../constants/motionTokens';

interface IntakeSummaryProps {
  state: IntakeState;
  onClose: () => void;
}

const IntakeSummary: React.FC<IntakeSummaryProps> = ({ state, onClose }) => {
  const [showProposal, setShowProposal] = useState(false);
  const recommendation = determineRecommendation(state.signals, state.confidenceScore);
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1, 
        delayChildren: 0.2 
      }
    }
  };

  const itemVariants = (direction: 'up' | 'down' | 'left' | 'right') => {
    const offsets = prefersReducedMotion ? { x: 0, y: 0 } : {
      up: { y: 100, x: 0 },
      down: { y: -100, x: 0 },
      left: { x: 100, y: 0 },
      right: { x: -100, y: 0 }
    };
    
    return {
      hidden: { opacity: 0, ...offsets[direction], filter: 'blur(10px)' },
      visible: { 
        opacity: 1, 
        y: 0, 
        x: 0, 
        filter: 'blur(0px)',
        transition: { 
          duration: DURATION_TOKENS.CONVERGENCE, 
          ease: EASING_TOKENS.PRECISION 
        }
      }
    };
  };

  return (
    <div className="w-full h-full max-w-6xl mx-auto flex flex-col justify-center px-6">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-1px bg-white/5 border border-white/5"
      >
        {/* TOP HEADER BLOCK - CONVERGE DOWN */}
        <motion.div 
          variants={itemVariants('down')}
          className="lg:col-span-12 bg-[#050505] p-8 md:p-12 border-b border-white/5"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-neutral-500 block mb-6 font-bold">
                [ DIAGNOSTIC_OUTCOME_ENCAPSULATED ]
              </span>
              <h2 className="text-4xl md:text-7xl font-heading font-black text-white tracking-tighter leading-[0.9] uppercase">
                Systems report: <br/>Locked & Verified.
              </h2>
            </div>
            <div className="flex flex-col items-start md:items-end font-mono">
              <span className="text-[9px] text-white/20 uppercase tracking-widest mb-1">Diagnostic Fidelity</span>
              <span className="text-sm text-white font-bold uppercase tracking-widest italic">
                {state.confidenceScore > 0.8 ? 'Optimal High' : state.confidenceScore > 0.6 ? 'Stable Medium' : 'Preliminary Low'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* SYSTEM SNAPSHOT - CONVERGE RIGHT */}
        <motion.div 
          variants={itemVariants('right')}
          className="lg:col-span-7 bg-[#050505] p-8 md:p-12 flex flex-col justify-between min-h-[400px]"
        >
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-10 font-bold border-b border-white/5 pb-4 w-fit">
              System Snapshot
            </h3>
            <p className="text-2xl md:text-3xl font-light text-neutral-300 leading-tight tracking-tight">
              {recommendation.snapshot}
            </p>
          </div>
          
          <div className="mt-12">
            <h4 className="text-[9px] uppercase tracking-[0.4em] text-white/20 mb-4 font-mono">Primary Bottleneck:</h4>
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xl font-bold text-white uppercase tracking-widest">{recommendation.bottleneck}</span>
            </div>
          </div>
        </motion.div>

        {/* PRIORITY SEQUENCE - CONVERGE LEFT */}
        <motion.div 
          variants={itemVariants('left')}
          className="lg:col-span-5 bg-[#080808] p-8 md:p-12 border-l border-white/5"
        >
          <h3 className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-10 font-bold border-b border-white/5 pb-4 w-fit">
            Priority Sequence
          </h3>
          <div className="space-y-10">
            {recommendation.priorities.map((step, i) => (
              <div key={i} className="flex gap-6 group">
                <span className="text-neutral-700 font-heading text-4xl font-black group-hover:text-white/20 transition-colors">0{i+1}</span>
                <p className="text-sm md:text-base text-neutral-400 font-light leading-relaxed mt-1">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RECOMMENDATION TRACK - CONVERGE UP */}
        <motion.div 
          variants={itemVariants('up')}
          className="lg:col-span-12 bg-white text-black p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12"
        >
          <div className="max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.6em] text-black/40 font-bold block mb-4 italic">Recommended Engagement</span>
            <h4 className="text-4xl md:text-6xl font-heading font-black tracking-tighter uppercase mb-6 leading-none">
              {recommendation.label}
            </h4>
            <p className="text-lg text-black/60 font-medium leading-snug">
              {recommendation.trackDescription}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <button 
              onClick={() => setShowProposal(true)}
              className="px-12 py-6 bg-black text-white font-bold uppercase tracking-widest text-[11px] hover:bg-neutral-800 transition-all shadow-xl shadow-black/10 active:scale-95"
            >
              Generate Proposal
            </button>
            <button 
              onClick={onClose}
              className="px-12 py-6 border border-black text-black font-bold uppercase tracking-widest text-[11px] hover:bg-black hover:text-white transition-all active:scale-95"
            >
              Close Diagnostic
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* FOOTER METADATA */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: DURATION_TOKENS.CONVERGENCE }}
        className="mt-12 flex justify-between items-center text-[8px] font-mono text-white/10 uppercase tracking-[0.5em] px-2"
      >
        <span>Kaza X Labs // Engineered Intelligence Layer</span>
        <span className="hidden md:inline">REF_TOKEN: {Math.random().toString(36).substring(7).toUpperCase()}</span>
        <span>Diagnostic Protocol Complete.</span>
      </motion.div>

      <AnimatePresence>
        {showProposal && (
          <ProposalView onClose={() => setShowProposal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default IntakeSummary;
