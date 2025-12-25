
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SignalSet } from '../../types';
import { SystemClassDefinition } from '../../system/systemClassifier';

interface ReviewFormProps {
  step: number;
  onAnswer: (key: string, value: any, signals?: Partial<SignalSet>) => void;
  onFinalize: () => void;
  isTransmitting: boolean;
  currentClass: SystemClassDefinition;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ step, onAnswer, onFinalize, isTransmitting, currentClass }) => {
  
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-12">
            <h2 className="text-4xl md:text-6xl font-heading font-black text-white uppercase tracking-tighter leading-none">
              Primary <br/>Objective.
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {[
                { label: 'Brand Realignment', val: 'brand', s: { brandClarity: 20 } },
                { label: 'Conversion Performance', val: 'web', s: { growthCeiling: 20 } },
                { label: 'Workflow Automation', val: 'automation', s: { automationReadiness: 20 } },
                { label: 'Platform Infrastructure', val: 'platform', s: { technicalDebt: 20 } },
                { label: 'Aggressive Scaling', val: 'growth', s: { businessMaturity: -10, growthCeiling: 40 } },
              ].map(opt => (
                <button 
                  key={opt.val}
                  onClick={() => onAnswer('objective', opt.val, opt.s)}
                  className="text-left p-6 border border-white/10 hover:border-white hover:bg-white/[0.02] transition-all uppercase tracking-widest text-[10px] font-bold"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-12">
            <h2 className="text-4xl md:text-6xl font-heading font-black text-white uppercase tracking-tighter leading-none">
              Business <br/>Phase.
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {[
                { label: 'Operating / Steady', val: 'op', s: { businessMaturity: 20 } },
                { label: 'Rapid Growth', val: 'scaling', s: { businessMaturity: 40, growthCeiling: 20 } },
                { label: 'Industry Leader', val: 'enterprise', s: { businessMaturity: 60, technicalDebt: 20 } },
              ].map(opt => (
                <button 
                  key={opt.val}
                  onClick={() => onAnswer('phase', opt.val, opt.s)}
                  className="text-left p-6 border border-white/10 hover:border-white transition-all uppercase tracking-widest text-[10px] font-bold"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-12">
            <h2 className="text-4xl md:text-6xl font-heading font-black text-white uppercase tracking-tighter leading-none">
              Primary <br/>Friction.
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {[
                { label: 'Manual Labor Dependencies', val: 'labor', s: { automationReadiness: -30 } },
                { label: 'Legacy Architecture', val: 'legacy', s: { technicalDebt: 40 } },
                { label: 'Identity/Market Desync', val: 'desync', s: { brandClarity: -30 } },
                { label: 'Resource Constriction', val: 'resource', s: { growthCeiling: 30 } },
              ].map(opt => (
                <button 
                  key={opt.val}
                  onClick={() => onAnswer('friction', opt.val, opt.s)}
                  className="text-left p-6 border border-white/10 hover:border-white transition-all uppercase tracking-widest text-[10px] font-bold"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-12">
            <h2 className="text-4xl md:text-6xl font-heading font-black text-white uppercase tracking-tighter leading-none">
              Structural <br/>Complexity.
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {[
                { label: 'Lean / Focused', val: 'lean', s: { technicalDebt: -10 } },
                { label: 'Moderate / Fragmented', val: 'mid', s: { technicalDebt: 10 } },
                { label: 'High / Distributed', val: 'high', s: { technicalDebt: 30 } },
              ].map(opt => (
                <button 
                  key={opt.val}
                  onClick={() => onAnswer('complexity', opt.val, opt.s)}
                  className="text-left p-6 border border-white/10 hover:border-white transition-all uppercase tracking-widest text-[10px] font-bold"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-12">
            <h2 className="text-4xl md:text-6xl font-heading font-black text-white uppercase tracking-tighter leading-none">
              Timeline <br/>Urgency.
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {[
                { label: 'Immediate Intervention', val: 'now', s: { urgency: 30 } },
                { label: 'Strategic (90 Days)', val: 'mid', s: { urgency: 10 } },
                { label: 'Planned (Next Quarter)', val: 'later', s: { urgency: -10 } },
              ].map(opt => (
                <button 
                  key={opt.val}
                  onClick={() => onAnswer('urgency', opt.val, opt.s)}
                  className="text-left p-6 border border-white/10 hover:border-white transition-all uppercase tracking-widest text-[10px] font-bold"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-12">
            <h2 className="text-4xl md:text-6xl font-heading font-black text-white uppercase tracking-tighter leading-none">
              Decision <br/>Authority.
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {[
                { label: 'Founder / CEO', val: 'founder', s: { decisionAuthority: 40 } },
                { label: 'Department Executive', val: 'exec', s: { decisionAuthority: 20 } },
                { label: 'Strategy / Ops Lead', val: 'lead', s: { decisionAuthority: 10 } },
              ].map(opt => (
                <button 
                  key={opt.val}
                  onClick={() => onAnswer('authority', opt.val, opt.s)}
                  className="text-left p-6 border border-white/10 hover:border-white transition-all uppercase tracking-widest text-[10px] font-bold"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        );
      case 6:
        return (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-neutral-500 block font-bold">
                [ Assembly Sequence Complete ]
              </span>
              <h2 className="text-4xl md:text-6xl font-heading font-black text-white uppercase tracking-tighter leading-tight">
                Model <br/>Analyzed.
              </h2>
              <div className="p-8 border border-white/10 bg-white/[0.02] space-y-6">
                <div>
                  <div className="text-[8px] font-mono text-white/30 uppercase tracking-widest mb-1">Detected System Class:</div>
                  <div className="text-xl font-bold text-white uppercase tracking-wider">{currentClass.name}</div>
                </div>
                <div className="h-[1px] w-full bg-white/5" />
                <p className="text-sm text-neutral-400 font-light leading-relaxed">
                  The configuration for {currentClass.machineName} has been generated. Finalize the diagnostic to transmit the structural snapshot.
                </p>
                <button 
                  disabled={isTransmitting}
                  onClick={onFinalize}
                  className="w-full py-6 bg-white text-black font-bold uppercase tracking-widest text-[10px]"
                >
                  {isTransmitting ? 'Transmitting...' : 'Finalize Diagnostic'}
                </button>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {renderStep()}
      </motion.div>
    </AnimatePresence>
  );
};
