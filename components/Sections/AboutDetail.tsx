import React from 'react';
import Reveal from '../UI/Reveal';
import SpatialElement from '../Motion/SpatialElement';

const AboutDetail: React.FC = () => {
  return (
    <div className="pt-32 pb-40">
      {/* 01: The Objective - Statement of Purpose */}
      <section className="px-6 md:px-12 mb-40 relative">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-8">
              <Reveal>
                <span className="text-[10px] font-mono uppercase tracking-[0.6em] text-neutral-500 mb-8 block font-bold italic">The Objective</span>
              </Reveal>
              <Reveal delay={0.2}>
                <h1 className="text-5xl md:text-8xl font-heading font-black text-white tracking-tighter leading-[0.9] mb-12 uppercase">
                  The alignment <br/>of presence and <br/>production.
                </h1>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-2xl md:text-3xl font-light text-neutral-400 leading-tight max-w-3xl">
                  Kaza X Labs exists to resolve a specific structural friction. We believe that a business's brand (how it is seen) and its systems (how it works) are not separate departments—they are the same foundation.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
        
        <SpatialElement depth={0.2} parallaxFactor={100} className="absolute right-0 top-0 opacity-[0.02] pointer-events-none select-none">
          <div className="text-[40rem] font-black leading-none uppercase italic">SYNC</div>
        </SpatialElement>
      </section>

      {/* 02: The Point of View - The Gap Thesis */}
      <section className="px-6 md:px-12 py-40 bg-white text-black overflow-hidden relative">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="text-[10px] uppercase tracking-[0.5em] text-neutral-400 mb-8 font-bold italic">The Thesis</h2>
            </Reveal>
            <Reveal delay={0.2}>
              <h3 className="text-4xl md:text-6xl font-heading font-black tracking-tight leading-[0.9] uppercase mb-12">
                The tax on <br/>momentum.
              </h3>
            </Reveal>
          </div>
          <div className="lg:col-span-7 space-y-8">
            <Reveal delay={0.4}>
              <p className="text-xl text-neutral-800 leading-relaxed font-light">
                When an established business grows, its core systems rarely keep pace. This creates a "structural gap"—a state where the brand feels smaller than the company's actual capability, and daily operations are held together by manual workarounds.
              </p>
            </Reveal>
            <Reveal delay={0.5}>
              <p className="text-lg text-neutral-500 leading-relaxed">
                This gap acts as a hidden tax on your growth. It creates friction for your team and confusion for your market. Our perspective is that these two issues must be solved simultaneously. You cannot fix the brand without fixing the tools that deliver the promise.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 03: The Way of Working - The Partnership Model */}
      <section className="px-6 md:px-12 py-40 bg-[#0a0a0a]">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-32">
            <Reveal>
              <span className="text-[10px] uppercase tracking-[0.5em] text-neutral-500 mb-8 block font-bold italic">The Methodology</span>
            </Reveal>
            <Reveal delay={0.2}>
              <h2 className="text-4xl md:text-7xl font-heading font-black text-white tracking-tighter uppercase leading-[0.9]">
                Structured <br/>Intervention.
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <Reveal delay={0.3}>
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-white uppercase tracking-widest border-l border-white/20 pl-6">Single Outcome Focus</h4>
                <p className="text-neutral-500 font-light leading-relaxed text-lg">
                  We do not offer modular services. We provide one single outcome: The Rebuild. Over 12 weeks, we handle every detail of your brand identity and your technical foundation as a single integrated cycle. This ensures that every tool we build is in perfect sync with your message.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-white uppercase tracking-widest border-l border-white/20 pl-6">Exit-Oriented Cycles</h4>
                <p className="text-neutral-500 font-light leading-relaxed text-lg">
                  We are not looking for a permanent seat at the table. Our success is measured by how little you need us once the 12 weeks are complete. We build for long-term internal ownership, providing the training and documentation needed for your team to lead the system forward.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 04: The Handover - Calm Authority */}
      <section className="px-6 md:px-12 py-40 border-t border-white/5">
        <div className="max-w-screen-xl mx-auto text-center">
          <Reveal width="100%">
            <p className="text-neutral-600 font-mono text-[10px] uppercase tracking-[0.8em] mb-12">
              Clarity. Authority. Integrity.
            </p>
          </Reveal>
          <Reveal width="100%" delay={0.2}>
            <div className="flex justify-center items-center gap-12 opacity-10">
              <div className="h-[px] w-32 bg-white" />
              <div className="w-3 h-3 border border-white rotate-45" />
              <div className="h-[px] w-32 bg-white" />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default AboutDetail;