
import React from 'react';
import { SERVICES } from '../../constants/content';
import Reveal from '../UI/Reveal';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-40 px-6 md:px-12 bg-[#0a0a0a]">
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-24 flex justify-between items-end">
            <div className="max-w-xl">
                <Reveal>
                    <h2 className="text-[10px] uppercase tracking-[0.5em] text-neutral-500 mb-6 font-bold">Capabilities</h2>
                </Reveal>
                <Reveal delay={0.2}>
                    <h3 className="font-heading text-4xl md:text-6xl font-bold text-white tracking-tighter">
                        Architecting full-spectrum digital dominance.
                    </h3>
                </Reveal>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1px bg-white/10 border border-white/10">
          {SERVICES.map((service, idx) => (
            <div key={service.id} className="bg-[#0a0a0a] p-10 group hover:bg-neutral-900 transition-colors duration-500 min-h-[400px] flex flex-col">
              <Reveal delay={0.1 * idx}>
                <span className="text-[10px] text-neutral-600 block mb-12 font-mono">{service.id}</span>
              </Reveal>
              <Reveal delay={0.2 * idx}>
                <h4 className="text-2xl font-bold text-white mb-4 leading-tight">{service.title}</h4>
              </Reveal>
              <Reveal delay={0.3 * idx}>
                <p className="text-xs uppercase tracking-widest text-white/40 mb-8">{service.tagline}</p>
              </Reveal>
              <Reveal delay={0.4 * idx}>
                <p className="text-neutral-500 text-sm leading-relaxed mb-auto">
                    {service.description}
                </p>
              </Reveal>
              
              <div className="mt-12 flex justify-end">
                  <div className="w-8 h-1px bg-white/20 group-hover:w-16 group-hover:bg-white transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
