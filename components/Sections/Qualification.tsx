import React from 'react';
import Reveal from '../UI/Reveal';

const Qualification: React.FC = () => {
  return (
    <section className="py-40 px-6 md:px-12 bg-white text-black overflow-hidden">
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-24">
          <Reveal>
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-neutral-400 mb-8 font-bold">Is this for you?</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <h3 className="font-heading text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] uppercase">
              How to know if you're <br/>ready for this.
            </h3>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-1px bg-black/5 border border-black/5">
          <div className="p-12 md:p-20 bg-white">
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-neutral-400 mb-10 font-bold">You are likely in the right place if:</h4>
            <ul className="space-y-8">
              {[
                "You have an established business but your image feels outdated.",
                "Your internal tools feel slow and make new ideas hard to start.",
                "You are preparing for a major move or a new stage of growth.",
                "You care about quality and things working correctly the first time."
              ].map((item, i) => (
                <li key={i} className="flex gap-6 items-start">
                  <span className="text-neutral-300 font-mono text-sm">0{i+1}</span>
                  <p className="text-lg font-light leading-snug">{item}</p>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="p-12 md:p-20 bg-neutral-50">
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-neutral-400 mb-10 font-bold">This may not be the best fit if:</h4>
            <ul className="space-y-8">
              {[
                "You are just starting out and still finding your main focus.",
                "You only need a basic website with very little detail.",
                "You prefer small, temporary fixes over a complete realignment.",
                "You need everything finished in less than 8 weeks."
              ].map((item, i) => (
                <li key={i} className="flex gap-6 items-start">
                  <span className="text-neutral-300 font-mono text-sm">×</span>
                  <p className="text-lg font-light leading-snug text-neutral-500">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Qualification;