import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { QuestionNode } from '../../types';
import { DURATION_TOKENS, EASING_TOKENS, TRANSITION_PRESETS } from '../../constants/motionTokens';

interface QuestionRendererProps {
  question: QuestionNode;
  onAnswer: (value: any) => void;
}

const QuestionRenderer: React.FC<QuestionRendererProps> = ({ question, onAnswer }) => {
  const [showContext, setShowContext] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="w-full max-w-4xl px-6">
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-6">
          <motion.div 
            layoutId="cat-indicator"
            className="px-3 py-1 border border-white/10 bg-white/[0.05] text-[9px] font-mono uppercase tracking-[0.3em] text-white/60"
          >
            {question.category}
          </motion.div>
          <div className="h-[1px] flex-grow bg-white/5" />
          <div className="text-[9px] font-mono text-white/20 uppercase tracking-widest">
            NODE_REF: {question.id.toUpperCase()}
          </div>
        </div>
        
        <motion.h3 
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={TRANSITION_PRESETS.SLIDE}
          className="text-4xl md:text-6xl font-heading font-extrabold text-white tracking-tighter leading-[1.05] mb-8"
        >
          {question.prompt}
        </motion.h3>
        
        <div className="flex flex-col gap-6">
          {question.subPrompt && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, ...TRANSITION_PRESETS.FADE }}
              className="text-neutral-500 font-light text-xl leading-relaxed max-w-2xl"
            >
              {question.subPrompt}
            </motion.p>
          )}

          <button 
            onClick={() => setShowContext(!showContext)}
            className="group flex items-center gap-3 text-[10px] uppercase tracking-widest text-white/20 hover:text-white/60 transition-colors w-fit"
          >
            <span className="w-4 h-[1px] bg-current" />
            {showContext ? 'Close Architecture' : 'Expose Diagnostic Logic'}
          </button>

          <AnimatePresence>
            {showContext && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: DURATION_TOKENS.BASE, ease: EASING_TOKENS.PRECISION }}
                className="overflow-hidden"
              >
                <div className="p-6 bg-white/[0.02] border border-white/10 font-mono text-[10px] uppercase tracking-widest leading-relaxed text-white/40">
                  <div className="mb-2 text-white/60">// Impact Vector Calibration:</div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>Confidence_Weight: {(question.confidenceImpact * 100).toFixed(0)}%</div>
                    <div>Branching_Potential: {question.branchingRules.length > 0 ? 'DYNAMIC' : 'LINEAR'}</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.answers?.map((option, idx) => (
          <motion.button
            key={option.value}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + (idx * 0.05), ...TRANSITION_PRESETS.SLIDE }}
            onClick={() => onAnswer(option.value)}
            className="group relative w-full text-left p-8 border border-white/5 bg-white/[0.02] hover:bg-white hover:text-black transition-all duration-500 overflow-hidden"
          >
            {/* Engineered Selection indicator */}
            <div className="absolute top-0 left-0 w-[2px] h-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold tracking-tight uppercase">{option.label}</span>
                <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500">→</span>
              </div>
              
              {/* Optional signal delta hint */}
              <div className="flex gap-2 opacity-0 group-hover:opacity-30 transition-opacity duration-700">
                {option.signalDeltas.slice(0, 2).map((s, i) => (
                  <span key={i} className="text-[8px] font-mono border border-current px-2 py-0.5">
                    {s.signal.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>

            {/* Background Texture on hover */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="absolute bottom-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <span className="font-mono text-[10px]">0x0{idx+1}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default QuestionRenderer;
