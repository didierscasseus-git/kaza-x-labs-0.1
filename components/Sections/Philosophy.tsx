
import React from 'react';
import Reveal from '../UI/Reveal';
import SpatialElement from '../Motion/SpatialElement';

const Philosophy: React.FC = () => {
  return (
    <section id="approach" className="relative py-40 px-6 md:px-12 bg-white text-black min-h-[70vh] flex flex-col justify-center overflow-hidden">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center relative z-10">
        <div>
          <Reveal>
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-neutral-400 mb-8 font-bold">The Philosophy</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="font-heading text-4xl md:text-6xl font-bold tracking-tight leading-[1.1]">
              We don't build websites.<br/>
              We build systems of leverage.
            </div>
          </Reveal>
        </div>
        
        <div className="space-y-8">
          <Reveal delay={0.4}>
            <p className="text-xl text-neutral-800 leading-relaxed font-light">
              Digital products shouldn't just exist; they should work. At Kaza X Labs, we treat every interaction as an engineering challenge.
            </p>
          </Reveal>
          <Reveal delay={0.5}>
            <p className="text-lg text-neutral-600 leading-relaxed">
              By merging editorial design depth with rigid technical architecture, we ensure your brand doesn't just look better — it operates better. Zero friction, total scalability, maximum retention.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Spatial Accent Background */}
      <SpatialElement depth={0.3} parallaxFactor={80} className="absolute -right-20 top-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03]">
        <div className="text-[30rem] font-black leading-none select-none">SYSTEM</div>
      </SpatialElement>
    </section>
  );
};

export default Philosophy;
