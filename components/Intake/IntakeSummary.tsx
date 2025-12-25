
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { IntakeState } from '../../types';
import ProposalView from '../../proposal/ProposalView';
import { EASING_TOKENS, DURATION_TOKENS } from '../../constants/motionTokens';
import { getWhyThisPath, getImmediateWins } from '../../proposal/narrativeHelpers';

interface IntakeSummaryProps {
  state: IntakeState;
  onClose: () => void;
}

const MomentumRail: React.FC = () => {
  const stages = [
    "Intake captured",
    "System classified",
    "Bottleneck confirmed",
    "Path locked",
    "Next action ready"
  ];

  return (
    <div className="flex items-center justify-between w-full max-w-4xl mx-auto py-12 px-6">
      {stages.map((stage, i) => (
        <React.Fragment key={stage}>
          <div className="flex flex-col items-center gap-3 relative">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: EASING_TOKENS.PRECISION }}
              className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
            />
            <motion.span 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.3 }}
              className="text-[7px] font-mono text-white/30 uppercase tracking-[0.3em] absolute top-6 whitespace-nowrap"
            >
              {stage}
            </motion.span>
          </div>
          {i < stages.length - 1 && (
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: i * 0.1 + 0.2, duration: 0.8 }}
              className="h-[1px] flex-grow bg-white/10 origin-left mx-4"
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const IntakeSummary: React.FC<IntakeSummaryProps> = ({ state, onClose }) => {
  const [showProposal, setShowProposal] = useState(false);
  
  const whyThisPath = useMemo(() => getWhyThisPath(state.signals), [state.signals]);
  const immediateWins = useMemo(() => getImmediateWins(), []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1, 
        delayChildren: 0.2 
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: EASING_TOKENS.PRECISION 
      }
    }
  };

  const primaryCTA = state.signals.urgency > 70 ? "Lock this plan" : "Send my system brief";

  return (
    <div className="w-full h-full max-w-6xl mx-auto flex flex-col justify-center px-6 py-20">
      <MomentumRail />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative grid grid-cols-1 lg:grid-cols-12 gap-px bg-white/5 border border-white/5 shadow-2xl mt-12"
      >
        {/* Header Section */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-12 bg-[#050505] p-10 md:p-16 border-b border-white/5"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <span className="text-[9px] font-mono uppercase tracking-[0.5em] text-neutral-500 block mb-8 font-bold">
                [ ANALYSIS VERIFIED ]
              </span>
              <h2 className="text-5xl md:text-8xl font-heading font-black text-white tracking-tighter leading-[0.85] uppercase">
                System <br/>Configuration <br/>Locked.
              </h2>
            </div>
            <div className="flex flex-col items-start md:items-end font-mono">
              <span className="text-[8px] text-white/20 uppercase tracking-widest mb-2">Protocol Integrity</span>
              <span className="text-xs text-white font-bold uppercase tracking-[0.4em] italic bg-white/5 px-4 py-2 border border-white/10">
                L7_VERIFIED
              </span>
            </div>
          </div>
        </motion.div>

        {/* Why this is the right path */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-7 bg-[#050505] p-10 md:p-16 flex flex-col min-h-[450px]"
        >
          <div className="mb-16">
            <h3 className="text-[9px] uppercase tracking-[0.4em] text-white/30 mb-10 font-bold border-b border-white/5 pb-4 w-fit">
              Why this approach is indicated
            </h3>
            <div className="space-y-8">
              {whyThisPath.map((point, i) => (
                <div key={i} className="flex gap-6 group">
                  <span className="text-white/20 font-mono text-sm mt-1 shrink-0">0{i+1}</span>
                  <p className="text-xl md:text-2xl font-light text-neutral-300 leading-tight tracking-tight group-hover:text-white transition-colors">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-auto pt-10 border-t border-white/5">
            <h4 className="text-[8px] uppercase tracking-[0.5em] text-white/20 mb-6 font-mono font-bold">The System Contract:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {[
                { label: "No guessing", desc: "Every step ties to a measured constraint" },
                { label: "No chaos", desc: "Scope stays controlled unless the system changes" },
                { label: "No opacity", desc: "Decisions documented in a shared repository" },
                { label: "No wasted labor", desc: "Automate repeat work before hiring" }
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-[9px] text-white font-bold uppercase tracking-widest">{item.label}</div>
                  <div className="text-[10px] text-neutral-500 font-light leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Immediate Wins */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-5 bg-[#080808] p-10 md:p-16 border-l border-white/5"
        >
          <h3 className="text-[9px] uppercase tracking-[0.4em] text-white/20 mb-10 font-bold border-b border-white/5 pb-4 w-fit">
            Immediate Wins (Week 1)
          </h3>
          <div className="space-y-12">
            {immediateWins.map((win, i) => (
              <div key={i} className="flex gap-6 group">
                <span className="text-neutral-800 font-heading text-4xl font-black group-hover:text-white/20 transition-colors shrink-0">
                  {i+1}
                </span>
                <p className="text-sm md:text-base text-neutral-400 font-medium leading-relaxed mt-2 uppercase tracking-wide">
                  {win}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-20 p-8 border border-white/5 bg-white/[0.01] relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-white opacity-20 group-hover:opacity-100 transition-opacity" />
            <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.4em] mb-4 block">Recommended Protocol</span>
            <div className="text-lg font-bold text-white uppercase tracking-[0.1em] leading-tight mb-2">The Brand & Systems Rebuild</div>
            <div className="text-[10px] text-neutral-600 font-mono uppercase tracking-widest">Fixed 12-week Cycle</div>
          </div>
        </motion.div>

        {/* Action Bar */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-12 bg-white text-black p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12"
        >
          <div className="max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.6em] text-black/40 font-bold block mb-4 italic">Next Step: Formalize Partnership</span>
            <p className="text-2xl md:text-3xl text-black font-light leading-[1.1] tracking-tight uppercase">
              Lock the configuration and transmit the <br/><span className="font-black">Strategic Asset Roadmap.</span>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <button 
              onClick={() => setShowProposal(true)}
              className="px-14 py-7 bg-black text-white font-bold uppercase tracking-[0.4em] text-[11px] hover:bg-neutral-800 transition-all shadow-2xl active:scale-95 whitespace-nowrap"
            >
              {primaryCTA}
            </button>
            <button 
              onClick={onClose}
              className="px-14 py-7 border border-black text-black font-bold uppercase tracking-[0.4em] text-[11px] hover:bg-black hover:text-white transition-all active:scale-95 whitespace-nowrap"
            >
              Exit Diagnostic
            </button>
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 flex justify-between items-center text-[8px] font-mono text-white/10 uppercase tracking-[0.5em] px-2"
      >
        <span>Kaza X Labs // Senior Partner Review Sequence: CLOSED</span>
        <span>Decision Status: LOCKED.</span>
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
