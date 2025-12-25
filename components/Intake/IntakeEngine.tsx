import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useAdaptiveIntake } from '../../hooks/useAdaptiveIntake';
import QuestionRenderer from './QuestionRenderer';
import IntakeSummary from './IntakeSummary';
import IntakeLanding from './IntakeLanding';
import { DURATION_TOKENS, EASING_TOKENS, TRANSITION_PRESETS } from '../../constants/motionTokens';

interface IntakeEngineProps {
  isOpen: boolean;
  onClose: () => void;
}

const IntakeEngine: React.FC<IntakeEngineProps> = ({ isOpen, onClose }) => {
  const { state, currentQuestion, submitAnswer, goBack, reset, setPhase, hasActiveSession } = useAdaptiveIntake();
  const [isProcessing, setIsProcessing] = useState(false);
  const [log, setLog] = useState<string[]>(['[PARTNER] Reviewing current status...', '[INFO] Awaiting your perspective...']);
  const logEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isOpen) {
      const focusableElements = containerRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements?.length) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }
  }, [isOpen]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [log]);

  const handleAnswer = (val: any) => {
    setIsProcessing(true);
    const node = currentQuestion;
    const label = node.answers.find(a => a.value === val)?.label || val;
    
    setLog(prev => [...prev, `[INPUT] Priority: ${label}`, `[REVIEW] Analyzing operational impact...`]);

    setTimeout(() => {
      submitAnswer(val);
      setIsProcessing(false);
      setLog(prev => [...prev, `[PARTNER] Clarity improved. Moving to the next area.`]);
    }, 1100);
  };

  const handleStart = () => {
    setLog(prev => [...prev, '[START] Consultation initiated. Phase 1: Context.']);
    setPhase('loop');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="engine-title"
          tabIndex={-1}
          onKeyDown={handleKeyDown}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={TRANSITION_PRESETS.FADE}
          className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center p-6 md:p-12 overflow-hidden outline-none"
        >
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" aria-hidden="true">
            <div className="grid grid-cols-12 h-full w-full">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="border-r border-white/20 h-full" />
              ))}
            </div>
          </div>

          <div className="absolute top-0 left-0 w-full p-6 md:p-12 flex justify-between items-start z-40">
            <div className="flex flex-col gap-1">
              <div id="engine-title" className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/30 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Partner Consultation // Kaza X Labs
              </div>
              <div className="flex items-center gap-6 mt-6">
                <div className="flex flex-col">
                  <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.2em] mb-2">Clarity level</span>
                  <div className="flex gap-[1px]">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <motion.div 
                        key={i}
                        className="w-4 h-[1px] bg-white"
                        animate={{ 
                          opacity: (state.confidenceScore * 12) > i ? 1 : 0.05,
                          backgroundColor: (state.confidenceScore * 12) > i ? '#ffffff' : 'rgba(255,255,255,0.05)'
                        }}
                        transition={{ duration: DURATION_TOKENS.FAST, ease: EASING_TOKENS.LINEAR }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <button 
                onClick={reset} 
                className="text-[9px] uppercase tracking-widest text-white/20 hover:text-white transition-colors focus:text-white outline-none"
              >
                Start Over
              </button>
              <button 
                onClick={onClose} 
                className="w-12 h-12 border border-white/10 flex items-center justify-center hover:border-white transition-colors bg-white/5 group focus:border-white outline-none"
                aria-label="Exit Meeting"
              >
                <span className="text-xl group-hover:rotate-90 transition-transform duration-300">×</span>
              </button>
            </div>
          </div>

          <div className="absolute bottom-12 left-12 w-64 hidden xl:flex flex-col gap-2 z-40 opacity-20 hover:opacity-100 transition-opacity">
            <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest border-b border-white/10 pb-2">Meeting Notes</span>
            <div className="h-32 overflow-y-auto font-mono text-[9px] text-neutral-500 space-y-1 scrollbar-hide">
              {log.map((entry, i) => <div key={i}>{entry}</div>)}
              <div ref={logEndRef} />
            </div>
          </div>

          <div className="w-full h-full flex flex-col items-center justify-center py-24 relative z-10 overflow-y-auto">
            <AnimatePresence mode="wait">
              {state.phase === 'orientation' ? (
                <motion.div 
                  key="landing" 
                  initial={{ opacity: 0, scale: 0.98 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 1.02 }} 
                  transition={TRANSITION_PRESETS.SLIDE}
                  className="w-full flex justify-center"
                >
                  <IntakeLanding onStart={handleStart} isResuming={hasActiveSession} />
                </motion.div>
              ) : isProcessing ? (
                <motion.div 
                  key="proc" 
                  className="flex flex-col items-center gap-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                   <div className="relative w-16 h-16">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border border-white/10 border-t-white"
                      />
                   </div>
                   <div className="flex flex-col items-center gap-2">
                     <div className="text-[10px] font-mono text-white/40 uppercase tracking-[0.8em] animate-pulse">Reviewing...</div>
                   </div>
                </motion.div>
              ) : !state.isComplete ? (
                <motion.div 
                  key={state.currentQuestionId} 
                  initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }} 
                  transition={TRANSITION_PRESETS.SLIDE} 
                  className="w-full flex justify-center"
                >
                  <QuestionRenderer question={currentQuestion} onAnswer={handleAnswer} />
                </motion.div>
              ) : (
                <motion.div 
                  key="summary" 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={TRANSITION_PRESETS.FADE}
                  className="w-full flex justify-center"
                >
                  <IntakeSummary state={state} onClose={onClose} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {state.phase === 'loop' && !state.isComplete && !isProcessing && (
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 flex justify-between items-end z-40">
              <button 
                onClick={goBack} 
                disabled={state.history.length <= 1} 
                className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-neutral-500 hover:text-white transition-colors disabled:opacity-0 focus:text-white outline-none"
              >
                <div className="w-10 h-10 border border-white/5 flex items-center justify-center group-hover:border-white transition-colors">←</div>
                <span>Go Back</span>
              </button>

              <div className="flex flex-col items-end gap-3">
                <div className="text-[9px] font-mono text-white/20 uppercase tracking-[0.4em]">
                  Progress: {Object.keys(state.answers).length + 1} / 12
                </div>
                <div className="w-48 h-[1px] bg-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(Object.keys(state.answers).length / 12) * 100}%` }}
                    className="h-full bg-white/40"
                    transition={{ duration: DURATION_TOKENS.SLOW, ease: EASING_TOKENS.PRECISION }}
                  />
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntakeEngine;