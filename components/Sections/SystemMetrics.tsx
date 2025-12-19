
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Reveal from '../UI/Reveal';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  subValue?: string;
  progress?: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, unit, subValue, progress }) => (
  <div className="bg-white/[0.02] border border-white/5 p-8 group hover:bg-white/[0.04] transition-colors relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.4em] mb-4 block">{label}</span>
    <div className="flex items-baseline gap-2 mb-2">
      <span className="text-3xl font-heading font-bold text-white tracking-tighter">{value}</span>
      {unit && <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest">{unit}</span>}
    </div>
    {subValue && <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">{subValue}</div>}
    
    {progress !== undefined && (
      <div className="mt-6 h-[1px] w-full bg-white/5 relative">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${progress}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 bg-white/40"
        />
      </div>
    )}
  </div>
);

const SystemMetrics: React.FC = () => {
  const [metrics, setMetrics] = useState({
    cpu: 12.4,
    mem: 4.8,
    latency: 18,
    uptime: 99.998
  });

  // Simulate jitter
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        cpu: +(prev.cpu + (Math.random() - 0.5) * 2).toFixed(1),
        mem: +(prev.mem + (Math.random() - 0.5) * 0.1).toFixed(1),
        latency: Math.max(12, Math.min(45, prev.latency + Math.floor((Math.random() - 0.5) * 4))),
        uptime: prev.uptime
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-40 px-6 md:px-12 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
      {/* Decorative Matrix Bit */}
      <div className="absolute top-0 right-0 p-12 opacity-[0.02] font-mono text-[8px] leading-none pointer-events-none hidden lg:block">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="mb-1">
            {Math.random().toString(2).substring(2, 40)}
          </div>
        ))}
      </div>

      <div className="max-w-screen-xl mx-auto">
        <div className="mb-20">
          <Reveal>
            <span className="text-[10px] uppercase tracking-[0.5em] text-neutral-500 mb-6 font-bold block">Live Telemetry</span>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 className="font-heading text-4xl md:text-6xl font-bold text-white tracking-tighter uppercase mb-6">
              Laboratory Health
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-neutral-500 max-w-lg leading-relaxed text-sm uppercase tracking-widest">
              Real-time monitoring of Kaza X distributed nodes and engineering compute clusters.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard 
            label="CPU_COMPUTE_LOAD" 
            value={metrics.cpu} 
            unit="%" 
            subValue="Optimized Execution"
            progress={metrics.cpu}
          />
          <MetricCard 
            label="MEM_ALLOCATION" 
            value={metrics.mem} 
            unit="GB" 
            subValue="Total 32.0 GB"
            progress={(metrics.mem / 32) * 100}
          />
          <MetricCard 
            label="NET_LATENCY" 
            value={metrics.latency} 
            unit="MS" 
            subValue="Edge Node: US-EAST"
            progress={Math.min(100, (metrics.latency / 50) * 100)}
          />
          <MetricCard 
            label="SYSTEM_UPTIME" 
            value={metrics.uptime} 
            unit="%" 
            subValue="L7 Integrity Checked"
            progress={metrics.uptime}
          />
        </div>

        <div className="mt-12 flex items-center justify-between text-[8px] font-mono text-white/10 uppercase tracking-[0.4em]">
          <div className="flex items-center gap-4">
             <div className="w-1 h-1 bg-green-500/50 rounded-full animate-pulse" />
             NODE_STATUS: STABLE
          </div>
          <div>REF_ID: LAB_SYS_MONITOR_042</div>
        </div>
      </div>
    </section>
  );
};

export default SystemMetrics;
