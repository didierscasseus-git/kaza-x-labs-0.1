
import React from 'react';
import { PROCESS } from '../../constants/content';
import Reveal from '../UI/Reveal';

const Process: React.FC = () => {
  return (
    <section className="py-40 px-6 md:px-12 bg-neutral-950">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-4">
                <Reveal>
                    <h2 className="text-[10px] uppercase tracking-[0.5em] text-neutral-500 mb-8 font-bold">The Method</h2>
                </Reveal>
                <Reveal delay={0.2}>
                    <h3 className="font-heading text-4xl font-bold text-white mb-8">Engineering Certainty.</h3>
                </Reveal>
                <Reveal delay={0.3}>
                    <p className="text-neutral-500 leading-relaxed">
                        Our workflow is linear, technical, and objective. We eliminate guesswork through structured discovery and rigorous prototyping.
                    </p>
                </Reveal>
            </div>

            <div className="lg:col-span-8 space-y-24">
                {PROCESS.map((step, idx) => (
                    <div key={step.number} className="flex gap-12 group">
                        <div className="text-neutral-800 font-heading text-6xl md:text-8xl font-bold leading-none select-none transition-colors group-hover:text-white/10">
                            {step.number}
                        </div>
                        <div className="pt-2 md:pt-4 border-t border-white/5 flex-grow">
                            <Reveal delay={0.2}>
                                <h4 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">{step.title}</h4>
                            </Reveal>
                            <Reveal delay={0.3}>
                                <p className="text-neutral-500 max-w-lg leading-relaxed">{step.description}</p>
                            </Reveal>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
