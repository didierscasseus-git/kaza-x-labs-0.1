import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLivingProposal } from './useLivingProposal';
import Reveal from '../components/UI/Reveal';
import CrmHandoffView from '../crm/CrmHandoffView';

const ProposalView: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { proposal, signals, isRefining } = useLivingProposal();
  const [showHandoff, setShowHandoff] = useState(false);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: proposal.pricing.currency, maximumFractionDigits: 0 }).format(val);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] bg-[#050505] overflow-y-auto overflow-x-hidden selection:bg-white selection:text-black"
    >
      {/* Editorial Header */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-32">
        <div className="flex justify-between items-start mb-24">
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-neutral-500 flex items-center gap-2">
              System_Output // Proposal_v4.2
              {isRefining && (
                <span className="ml-4 flex gap-1">
                  <span className="w-1 h-1 bg-white animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1 h-1 bg-white animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1 h-1 bg-white animate-bounce"></span>
                </span>
              )}
            </span>
            <button 
              onClick={onClose}
              className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors flex items-center gap-3 w-fit"
            >
              <span className="w-4 h-[1px] bg-white/20" />
              Back to Diagnostic
            </button>
          </div>
          <div className="text-right flex flex-col items-end">
            <div className="text-[10px] font-mono text-white/30 mb-2 uppercase tracking-widest">Confidence Index</div>
            <div className="text-2xl font-black text-white">{(proposal.confidence * 100).toFixed(0)}%</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Left Column: Core Narrative */}
          <div className="lg:col-span-7 space-y-24">
            <section>
              <Reveal>
                <h1 className="text-5xl md:text-8xl font-heading font-black text-white tracking-tighter leading-none mb-12 uppercase">
                  {proposal.title}
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="relative">
                  <motion.p 
                    key={proposal.summary}
                    initial={{ opacity: 0, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    className="text-2xl md:text-3xl font-light text-neutral-400 leading-tight max-w-2xl"
                  >
                    {proposal.summary}
                  </motion.p>
                  {isRefining && (
                    <div className="absolute top-0 left-0 w-full h-full bg-black/10 backdrop-blur-[1px] pointer-events-none" />
                  )}
                </div>
              </Reveal>
            </section>

            <section className="space-y-12">
              <h2 className="text-[10px] uppercase tracking-[0.5em] text-white/20 font-bold border-b border-white/5 pb-4">
                Engineered_Modules
              </h2>
              <div className="space-y-8">
                {proposal.modules.map((module, i) => (
                  <motion.div 
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                    className="group border border-white/5 bg-white/[0.01] p-10 hover:bg-white/[0.03] transition-colors"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-[8px] font-mono text-white/20 tracking-[0.4em] uppercase">Impact: {module.impact}</span>
                      <span className="text-[8px] font-mono text-white/10 uppercase">Artifact_0{i+1}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest">{module.title}</h3>
                    <p className="text-neutral-500 font-light mb-8 leading-relaxed">{module.description}</p>
                    <div className="flex items-center gap-3 py-3 px-4 bg-white/5 border border-white/5 w-fit">
                      <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">{module.reasoning}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="space-y-12">
              <h2 className="text-[10px] uppercase tracking-[0.5em] text-white/20 font-bold border-b border-white/5 pb-4">
                Deployment_Timeline
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-white/5 border border-white/5">
                {proposal.timeline.map((phase, i) => (
                  <div key={phase.title} className="bg-[#050505] p-8 flex flex-col">
                    <span className="text-[8px] font-mono text-white/20 mb-4 uppercase">Phase_0{i+1} // {phase.duration}</span>
                    <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">{phase.title}</h4>
                    <ul className="space-y-3 mt-auto">
                      {phase.deliverables.map(d => (
                        <li key={d} className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest flex items-center gap-2">
                          <span className="w-1 h-1 bg-white/10" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Financials & Authority */}
          <div className="lg:col-span-5">
            <div className="sticky top-12 space-y-12">
              <div className="bg-white p-12 text-black">
                <h2 className="text-[10px] uppercase tracking-[0.5em] text-black/40 font-bold mb-10">Investment_Band</h2>
                <div className="mb-12">
                  <div className="text-[10px] font-mono uppercase text-black/30 mb-2">Estimated Range</div>
                  <div className="text-4xl md:text-5xl font-black tracking-tighter">
                    {formatCurrency(proposal.pricing.min)} — {formatCurrency(proposal.pricing.max)}
                  </div>
                </div>
                <div className="space-y-6">
                  <p className="text-xs text-black/60 font-light leading-relaxed">
                    This investment band is dynamically calculated based on your diagnostic signals: Urgency ({(signals.urgency)}), Budget Elasticity ({(signals.budgetElasticity)}), and Technical Depth.
                  </p>
                  <button 
                    onClick={() => setShowHandoff(true)}
                    className="w-full bg-black text-white py-6 font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-neutral-800 transition-colors"
                  >
                    Initialize Engagement
                  </button>
                </div>
              </div>

              <div className="border border-white/10 p-10 space-y-10">
                <div>
                  <h3 className="text-[9px] uppercase tracking-[0.4em] text-white/20 mb-6 font-mono">Kernel_Assumptions:</h3>
                  <div className="space-y-4">
                    {proposal.assumptions.map((a, i) => (
                      <div key={i} className="text-[10px] text-neutral-400 font-light leading-relaxed flex gap-4">
                        <span className="text-white/20">0{i+1}</span>
                        {a}
                      </div>
                    ))}
                  </div>
                </div>

                {proposal.risks.length > 0 && (
                  <div>
                    <h3 className="text-[9px] uppercase tracking-[0.4em] text-red-500/40 mb-6 font-mono">Identified_Risks:</h3>
                    <div className="space-y-4">
                      {proposal.risks.map((r, i) => (
                        <div key={i} className="text-[10px] text-red-200/40 font-light leading-relaxed flex gap-4">
                          <span className="text-red-500/20">!</span>
                          {r}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-8 border-t border-white/5">
                  <h3 className="text-[9px] uppercase tracking-[0.4em] text-white/20 mb-6 font-mono">Immediate_Actions:</h3>
                  <div className="space-y-4">
                    {proposal.nextActions.map((n, i) => (
                      <div key={i} className="flex items-center gap-4 text-xs font-bold text-white uppercase tracking-widest">
                        <div className="w-2 h-2 border border-white/20" />
                        {n}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-40 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-mono text-white/10 uppercase tracking-[0.4em]">
          <div>Kaza X Labs // Engineered Intelligence Layer</div>
          <div>Node_Ref: {Math.random().toString(36).substring(7).toUpperCase()}</div>
          <div>Diagnostics Locked: {new Date().toLocaleDateString()}</div>
        </div>
      </div>

      <AnimatePresence>
        {showHandoff && (
          <CrmHandoffView onClose={() => setShowHandoff(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProposalView;
