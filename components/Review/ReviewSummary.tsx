import React from 'react';
import { motion } from 'framer-motion';
import Reveal from '../UI/Reveal';
// Fix: Import SystemClass from types.ts where it is defined and exported.
import { SystemClass } from '../../types';
import { SystemProfile } from '../../hooks/useReviewRequest';
import { useSystem } from '../../system/systemContext';

interface ReviewSummaryProps {
  onClose: () => void;
  systemClass: SystemClass;
  profile: SystemProfile;
}

const ReviewSummary: React.FC<ReviewSummaryProps> = ({ onClose, systemClass, profile }) => {
  const { signals } = useSystem();

  const getNarrative = (sClass: SystemClass) => {
    switch (sClass) {
      case 'Fragmented Operator System':
        return {
          snapshot: "This configuration indicates an environment where manual workarounds have outpaced technical foundations. Current output is entirely dependent on personnel effort rather than deterministic logic.",
          consequence: "Without structural intervention, scaling this system will lead to catastrophic labor costs and recurring operational debt.",
          bottleneck: "Manual Labor Dependency",
          priority: ["Workflow Codification", "Legacy Debt Removal", "System Unification"]
        };
      case 'Scaling Bottleneck Engine':
        return {
          snapshot: "Growth signals are high, but existing pipelines are constricted. This system is actively resisting the volume it is attempting to process.",
          consequence: "Friction will continue to increase until the system reaches a point of total structural failure under load.",
          bottleneck: "Constricted Operational Throughput",
          priority: ["Horizontal Scaling", "API/Platform Integration", "Latency Reduction"]
        };
      case 'Brand-Strong / System-Weak Chassis':
        return {
          snapshot: "The system presents a high-fidelity visual shell that is disconnected from the operational core. There is a significant divergence between market perception and internal delivery capability.",
          consequence: "Trust erosion will occur as clients move deeper into the delivery cycle and encounter technical friction.",
          bottleneck: "Perception-Delivery Divergence",
          priority: ["Back-end Synchronization", "Delivery Automation", "Internal Core Refactor"]
        };
      case 'Overbuilt / Under-Coordinated Stack':
        return {
          snapshot: "Maturity signals are high, but coordination is fragmented. This configuration suffers from tool sprawl and administrative overhead despite a modern stack.",
          consequence: "Tool redundancy and context-switching are acting as a hidden tax on every unit of work delivered.",
          bottleneck: "Administrative Tool Sprawl",
          priority: ["System Consolidation", "Centralized Data Governance", "License Removal"]
        };
      case 'Lean but Volatile Growth Machine':
        return {
          snapshot: "This system is optimized for speed at the cost of stability. It is a high-RPM configuration with zero redundancy and brittle foundations.",
          consequence: "A single point of failure in the technical stack could lead to total business interruption.",
          bottleneck: "Zero Redundancy / Brittle Core",
          priority: ["Structural Stabilization", "Edge-Case Engineering", "Reliability Hardening"]
        };
      case 'Enterprise Drag System':
        return {
          snapshot: "Large-scale configuration suffering from legacy gravity. Every strategic move is hampered by architectural complexity and inertia.",
          consequence: "Agility is non-existent. Market competitors will out-maneuver this system while internal cycles remain locked in maintenance.",
          bottleneck: "Legacy Architecture Gravity",
          priority: ["Decoupling Strategy", "Incremental Modularization", "Process Removal"]
        };
      default:
        return {
          snapshot: "System assembly indicates a state of flux. Foundations are transitioning between stages without a clear structural anchor.",
          consequence: "Continued divergence will lead to unpredictable operational costs.",
          bottleneck: "Structural Indeterminacy",
          priority: ["Baseline Assessment", "Operational Mapping", "Target Architecture Definition"]
        };
    }
  };

  const narrative = getNarrative(systemClass);

  return (
    <div className="max-w-4xl mx-auto py-20 overflow-y-auto scrollbar-hide">
      <Reveal>
        <div className="flex items-center gap-4 mb-10">
          <span className="text-[10px] font-mono uppercase tracking-[0.8em] text-neutral-600 font-bold italic">System Model Assembled</span>
          <div className="h-[1px] flex-grow bg-white/5" />
        </div>
      </Reveal>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
        <div className="md:col-span-12">
          <Reveal delay={0.2}>
            <h2 className="text-4xl md:text-7xl font-heading font-black text-white tracking-tighter uppercase mb-12 leading-[0.9]">
              {systemClass}
            </h2>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Reveal delay={0.3}>
              <div className="space-y-6">
                <p className="text-xl text-neutral-400 font-light leading-relaxed">
                  {narrative.snapshot}
                </p>
                <p className="text-sm text-neutral-600 italic border-l border-white/10 pl-6">
                  {narrative.consequence}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="bg-white/[0.02] border border-white/5 p-8 space-y-8">
                <div>
                  <h4 className="text-[9px] uppercase tracking-[0.4em] text-white/20 mb-4 font-mono">Primary_Bottleneck:</h4>
                  <div className="text-xl font-bold text-white uppercase tracking-wider">{narrative.bottleneck}</div>
                </div>
                <div>
                  <h4 className="text-[9px] uppercase tracking-[0.4em] text-white/20 mb-4 font-mono">Priority_Sequence:</h4>
                  <div className="space-y-3">
                    {narrative.priority.map((p, i) => (
                      <div key={i} className="flex items-center gap-4 text-xs font-bold text-white/60 uppercase tracking-widest">
                        <span className="text-white/20 font-mono">0{i+1}</span>
                        {p}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 justify-center border-t border-white/5 pt-12">
        <button 
          onClick={onClose}
          className="bg-white text-black px-12 py-6 font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-neutral-200 transition-all shadow-2xl active:scale-95"
        >
          Initiate Strategic Review
        </button>
        <button 
          onClick={onClose}
          className="bg-transparent border border-white/10 text-white px-12 py-6 font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-white/5 transition-all active:scale-95"
        >
          Request Diagnostic Alignment
        </button>
      </div>

      <div className="mt-16 text-center">
        <button onClick={onClose} className="text-[9px] uppercase tracking-[1em] text-neutral-600 hover:text-white transition-all">Save System Model</button>
      </div>
    </div>
  );
};

export default ReviewSummary;