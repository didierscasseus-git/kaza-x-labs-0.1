import React from 'react';
import Reveal from '../UI/Reveal';

const LayerDetail: React.FC<{ number: string; title: string; desc: React.ReactNode }> = ({ number, title, desc }) => (
  <div className="border-t border-white/10 pt-12 pb-12">
    <div className="flex gap-8 md:gap-16">
      <span className="text-[10px] font-mono text-neutral-600">{number}</span>
      <div className="max-w-2xl text-neutral-200">
        <h4 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider">{title}</h4>
        <div className="space-y-4">
          {desc}
        </div>
      </div>
    </div>
  </div>
);

const Services: React.FC = () => {
  return (
    <section id="offer" className="py-40 px-6 md:px-12 bg-[#0a0a0a]">
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-32">
          <Reveal>
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-neutral-500 mb-6 font-bold">The Engagement</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <h3 className="font-heading text-4xl md:text-7xl font-bold text-white tracking-tighter uppercase leading-[0.9]">
              The Brand & <br/>Systems Rebuild.
            </h3>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-12 text-neutral-400 max-w-2xl text-lg font-light leading-relaxed">
              Kaza X Labs provides structural interventions focused on the removal of operational drag. Every deployment is designed to replace manual coordination with deterministic systems, reducing recurring overhead and ensuring your business scales without a proportional increase in headcount or technical debt.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-4">
             <div className="sticky top-40 bg-white/[0.02] border border-white/5 p-8">
               <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.3em] mb-4 block italic">Singular Scope</span>
               <div className="text-xl font-bold text-white mb-6 uppercase">A 12-Week Partner Engagement.</div>
               <div className="space-y-4 mb-8">
                 <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                    <span>Outcome</span>
                    <span className="text-white">Business Clarity</span>
                 </div>
                 <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                    <span>Architecture</span>
                    <span className="text-white">Inseparable</span>
                 </div>
                 <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                    <span>Target</span>
                    <span className="text-white">Zero Clutter</span>
                 </div>
               </div>
               <div className="h-[1px] w-full bg-white/5 mb-8" />
               <p className="text-[10px] text-neutral-600 font-mono uppercase leading-relaxed tracking-wider">
                 This is not a list of services to choose from. It is a singular, proven protocol to align your business with its potential.
               </p>
             </div>
          </div>

          <div className="lg:col-span-8">
            <Reveal width="100%">
              <LayerDetail 
                number="01"
                title="Brand Strategy & Identity Systems"
                desc={
                  <>
                    <p className="text-sm leading-relaxed text-neutral-400">Identity systems serve as an executive shortcut to trust. By codifying your brand authority, we eliminate the recurring cost of explaining your value to high-level partners and reduce the friction inherent in fragmented market positioning.</p>
                    <p className="text-sm leading-relaxed text-neutral-400">A unified identity reduces internal alignment time and prevents the financial waste associated with inconsistent messaging across disparate channels. It is a structural asset designed for clarity and rapid market recognition.</p>
                  </>
                }
              />
            </Reveal>

            <Reveal width="100%">
              <LayerDetail 
                number="02"
                title="Web Redesign & Full-Stack Development"
                desc={
                  <>
                    <p className="text-sm leading-relaxed text-neutral-400">Our full-stack deployments are engineered to remove technical debt and reduce the server-side costs of legacy infrastructure. We replace slow, high-maintenance platforms with high-fidelity systems that require zero manual management and scale horizontally.</p>
                    <p className="text-sm leading-relaxed text-neutral-400">This transition eliminates the recurring payroll expense of constant troubleshooting and small-fix development. Your digital home becomes a self-sustaining asset rather than an ongoing maintenance liability.</p>
                  </>
                }
              />
            </Reveal>

            <Reveal width="100%">
              <LayerDetail 
                number="03"
                title="Mobile App Development"
                desc={
                  <>
                    <p className="text-sm leading-relaxed text-neutral-400">Mobile systems are built to automate the point of service delivery, reducing the need for human support and manual coordination. We prioritize architectural stability to eliminate the risk of system failure and the associated costs of urgent technical recovery.</p>
                    <p className="text-sm leading-relaxed text-neutral-400">These platforms are designed to streamline the customer lifecycle, removing the administrative friction of manual data entry and ensuring that high-volume interactions are handled by code, not personnel.</p>
                  </>
                }
              />
            </Reveal>

            <Reveal width="100%">
              <LayerDetail 
                number="04"
                title="API & Platform Integrations"
                desc={
                  <>
                    <p className="text-sm leading-relaxed text-neutral-400">We resolve tool sprawl by unifying fragmented software into a single, cohesive architecture. This removes the "data tax"—the time and labor wasted on manual data transfer between disconnected platforms—and reduces license redundancy costs.</p>
                    <p className="text-sm leading-relaxed text-neutral-400">Integrations are built for durability, ensuring that your core systems communicate with precision. This architecture replaces human bridge-work with automated data flows, significantly lowering operational risk and management overhead.</p>
                  </>
                }
              />
            </Reveal>

            <Reveal width="100%">
              <LayerDetail 
                number="05"
                title="Workflow & Business Automation"
                desc={
                  <>
                    <p className="text-sm leading-relaxed text-neutral-400">Workflow automation is the direct replacement of repetitive manual labor with deterministic logic. We identify and resolve the high-friction points in your daily operations, eliminating the recurring time-loss associated with manual admin and routine coordination.</p>
                    <p className="text-sm leading-relaxed text-neutral-400">By codifying your business rules, we remove the variable of human error and the subsequent costs of correction. This deployment allows your team to focus on strategic growth while the system manages the volume.</p>
                  </>
                }
              />
            </Reveal>

            <Reveal width="100%">
              <LayerDetail 
                number="06"
                title="Data & System Architecture"
                desc={
                  <>
                    <p className="text-sm leading-relaxed text-neutral-400">We design data structures that prioritize retrieval speed and storage efficiency, reducing the long-term costs of technical mismanagement. A clear architecture removes the inefficiency of data silos and ensures that decisions are based on a singular, verified source of truth.</p>
                    <p className="text-sm leading-relaxed text-neutral-400">Robust system design prevents the expensive architectural pivots required by poor early-stage planning. It is a foundational investment that simplifies your technical environment and reduces the complexity of future scaling.</p>
                  </>
                }
              />
            </Reveal>

            <Reveal width="100%">
              <LayerDetail 
                number="07"
                title="SEO & Performance Optimization"
                desc={
                  <>
                    <p className="text-sm leading-relaxed text-neutral-400">Performance optimization is a technical intervention designed to reduce your dependence on expensive paid acquisition channels. By engineering for speed and indexing precision, we remove the operational drag of a slow, unoptimized presence that leaks potential revenue.</p>
                    <p className="text-sm leading-relaxed text-neutral-400">Technical SEO reduces the long-term cost of customer acquisition. We replace ad-hoc marketing tactics with a structural system that ensures your business remains visible and accessible without ongoing, variable ad spend.</p>
                  </>
                }
              />
            </Reveal>

            <Reveal width="100%">
              <LayerDetail 
                number="08"
                title="Automated Marketing Systems"
                desc={
                  <>
                    <p className="text-sm leading-relaxed text-neutral-400">We deploy systems that handle the entire lead lifecycle without manual intervention. This removes the administrative burden from your sales team, eliminating the need for manual follow-ups and routine lead nurturing.</p>
                    <p className="text-sm leading-relaxed text-neutral-400">These systems ensure that every interaction is timely and precise, reducing the labor cost of lead management. By automating the top of the funnel, you remove the operational bottlenecks that prevent rapid scaling.</p>
                  </>
                }
              />
            </Reveal>

            <Reveal width="100%">
              <LayerDetail 
                number="09"
                title="Digital Upscaling & Optimization Strategy"
                desc={
                  <>
                    <p className="text-sm leading-relaxed text-neutral-400">This is a partner-led roadmap focused exclusively on the removal of operational waste. We audit your existing tech stack and workflows to identify redundant costs, tool inefficiencies, and payroll leakages that are currently capping your growth.</p>
                    <p className="text-sm leading-relaxed text-neutral-400">The resulting strategy is a blueprint for lean scaling. It replaces ad-hoc growth with a systematic plan to increase output while simultaneously reducing the cost per unit of work.</p>
                  </>
                }
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;