
import React from 'react';
import Reveal from '../UI/Reveal';

const CaseStudyDetail: React.FC = () => {
  return (
    <section 
      id="case-study-detail" 
      className="py-40 px-6 md:px-12 bg-neutral-950 border-t border-white/5 relative overflow-hidden scroll-mt-24"
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="text-[10px] uppercase tracking-[0.5em] text-neutral-500 mb-8 font-bold">Deep Dive / System Analysis</h2>
            </Reveal>
            <Reveal delay={0.2}>
              <h3 className="font-heading text-4xl md:text-5xl font-bold text-white mb-12 tracking-tight">
                Nexus Venture: Architecting for 10ms Latency.
              </h3>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="space-y-6 text-neutral-400 leading-relaxed font-light">
                <p>
                  To handle the complex data requirements of Nexus Venture, we implemented a distributed event-driven architecture. By decoupling the real-time processing layer from the primary persistence engine, we achieved a sustained 99.99% uptime during peak load.
                </p>
                <p>
                  The system leverages edge computing to minimize TTFB, ensuring a seamless experience across global nodes while maintaining strict consistency for critical transaction paths.
                </p>
              </div>
            </Reveal>
          </div>
          
          <div className="lg:col-span-7">
            <Reveal delay={0.4}>
              <div className="bg-neutral-900 aspect-video w-full flex items-center justify-center border border-white/5 relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent" />
                <div className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest text-center px-12 z-10">
                   [ Visualizing Technical Layer: Distribution / Mesh / Auth ]
                </div>
                {/* Decorative Tech Accents */}
                <div className="absolute top-8 left-8 w-4 h-4 border-l border-t border-white/20" />
                <div className="absolute bottom-8 right-8 w-4 h-4 border-r border-b border-white/20" />
                
                {/* Simulated Scanning Line */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10 animate-[scan_4s_linear_infinite]" />
              </div>
            </Reveal>
            
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Throughput', value: '1.2M req/s' },
                { label: 'Redundancy', value: '3-Node' },
                { label: 'Security', value: 'E2E AES' },
                { label: 'Deployment', value: 'Atomic' }
              ].map((stat, i) => (
                <Reveal key={stat.label} delay={0.5 + (i * 0.1)}>
                  <div className="border-l border-white/10 pl-6">
                    <div className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">{stat.label}</div>
                    <div className="text-xl font-bold text-white">{stat.value}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(400px); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default CaseStudyDetail;
