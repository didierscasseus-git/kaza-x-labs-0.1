import React from 'react';
import Reveal from '../UI/Reveal';
import SpatialElement from '../Motion/SpatialElement';

const Philosophy: React.FC = () => {
  return (
    <section id="problem" className="relative py-40 px-6 md:px-12 bg-white text-black min-h-[80vh] flex flex-col justify-center overflow-hidden">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-start relative z-10">
        <div>
          <Reveal>
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-neutral-400 mb-8 font-bold italic">The Diagnosis</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="font-heading text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] uppercase">
              Your growth has <br/>outpaced your core.
            </div>
          </Reveal>
        </div>
        
        <div className="space-y-8">
          <Reveal delay={0.4}>
            <p className="text-xl text-neutral-800 leading-relaxed font-light">
              Every successful business reaches a tipping point where its foundations no longer support its potential. The gap between how you are seen and how you operate is no longer just an annoyance—it is a tax on your momentum.
            </p>
          </Reveal>
          <Reveal delay={0.5}>
            <p className="text-lg text-neutral-600 leading-relaxed">
              When your brand feels "smaller" than your actual caliber, and your daily tools require manual management, your company is in a state of disconnect. We intervene to close this gap, replacing fragmented legacy structures with a singular, high-fidelity system.
            </p>
          </Reveal>
        </div>
      </div>

      <SpatialElement depth={0.3} parallaxFactor={80} className="absolute -right-20 top-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03]">
        <div className="text-[25rem] font-black leading-none select-none italic uppercase">Disconnect</div>
      </SpatialElement>
    </section>
  );
};

export default Philosophy;