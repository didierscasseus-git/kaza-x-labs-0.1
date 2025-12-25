import React from 'react';
import { motion } from 'framer-motion';
import SystemModule from './SystemModule';
import { SystemProfile } from '../../hooks/useReviewRequest';
import { useSystem } from '../../system/systemContext';
import { SystemClass } from '../../types';

interface SystemConstructionFieldProps {
  profile: SystemProfile;
  systemClass: SystemClass;
}

const SystemConstructionField: React.FC<SystemConstructionFieldProps> = ({ profile, systemClass }) => {
  const { signals } = useSystem();

  // Metrics (0-1)
  const pulse = signals.growthCeiling / 100;
  const debt = signals.technicalDebt / 100;
  const maturity = signals.businessMaturity / 100;
  const clarity = signals.brandClarity / 100;

  const renderClassModules = () => {
    switch (systemClass) {
      case 'Fragmented Operator System':
        return (
          <>
            <SystemModule type="gear" active={true} rotationSpeed={0.5} offset={{ x: -80, y: -40, z: 0 }} />
            <SystemModule type="gear" active={true} rotationSpeed={-0.3} offset={{ x: 60, y: 80, z: -20 }} />
            <SystemModule type="sensor" active={true} offset={{ x: 0, y: -100, z: 0 }} />
          </>
        );
      case 'Scaling Bottleneck Engine':
        return (
          <>
            <SystemModule type="rotor" active={true} offset={{ x: 0, y: 0, z: 40 }} />
            <SystemModule type="beam" active={true} offset={{ x: -120, y: 0, z: 0 }} />
            <SystemModule type="beam" active={true} offset={{ x: 120, y: 0, z: 0 }} />
            <SystemModule type="gear" active={debt > 0.6} rotationSpeed={0.1} offset={{ x: 0, y: 120, z: 10 }} />
          </>
        );
      case 'Brand-Strong / System-Weak Chassis':
        return (
          <>
            <SystemModule type="chassis" active={true} scale={1.2} offset={{ x: 0, y: 0, z: 0 }} />
            <SystemModule type="sensor" active={true} offset={{ x: 100, y: -100, z: 50 }} />
            {/* Interior is hollow or minimal */}
          </>
        );
      case 'Overbuilt / Under-Coordinated Stack':
        return (
          <>
            <SystemModule type="sensor" active={true} offset={{ x: -40, y: -40, z: 40 }} />
            <SystemModule type="sensor" active={true} offset={{ x: 40, y: -40, z: 40 }} />
            <SystemModule type="sensor" active={true} offset={{ x: -40, y: 40, z: 40 }} />
            <SystemModule type="sensor" active={true} offset={{ x: 40, y: 40, z: 40 }} />
            <SystemModule type="cable" active={true} offset={{ x: 0, y: -80, z: 0 }} />
          </>
        );
      case 'Lean but Volatile Growth Machine':
        return (
          <>
            <SystemModule type="rotor" active={true} rotationSpeed={3} offset={{ x: 0, y: 0, z: 0 }} />
            <SystemModule type="cable" active={true} offset={{ x: -80, y: -80, z: 0 }} />
            <SystemModule type="cable" active={true} offset={{ x: 80, y: 80, z: 0 }} />
          </>
        );
      case 'Enterprise Drag System':
        return (
          <>
            <SystemModule type="chassis" active={true} scale={1.5} offset={{ x: 0, y: 0, z: -50 }} />
            <SystemModule type="beam" active={true} offset={{ x: -150, y: 0, z: 0 }} />
            <SystemModule type="beam" active={true} offset={{ x: 150, y: 0, z: 0 }} />
            <SystemModule type="gear" active={true} rotationSpeed={0.05} offset={{ x: 0, y: 0, z: 60 }} />
          </>
        );
      default:
        return <SystemModule type="core" active={true} pulse={pulse} />;
    }
  };

  return (
    <div className="relative w-full h-[60vh] md:h-full flex items-center justify-center overflow-hidden perspective-2000">
      {/* Blueprint Grid */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <div className="w-full h-full border border-white" style={{ backgroundSize: '60px 60px', backgroundImage: 'radial-gradient(circle, white 0.5px, transparent 0.5px)' }} />
        <svg className="absolute inset-0 w-full h-full">
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="white" strokeWidth="0.5" strokeDasharray="10 20" />
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="white" strokeWidth="0.5" strokeDasharray="10 20" />
        </svg>
      </div>

      <motion.div 
        animate={{ 
          rotateY: [0, 360],
          rotateX: [0, 5, -5, 0]
        }}
        transition={{ 
          rotateY: { duration: 120, repeat: Infinity, ease: "linear" },
          rotateX: { duration: 20, repeat: Infinity, ease: "easeInOut" }
        }}
        className="relative flex items-center justify-center w-full h-full preserve-3d"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Universal Core Chassis */}
        <SystemModule type="chassis" active={true} scale={0.8} offset={{ x: 0, y: 0, z: 0 }} delay={0} />
        
        {/* Signal-Driven Assembly */}
        {renderClassModules()}

        {/* Global Lighting Accents */}
        <div className="absolute w-[800px] h-[800px] bg-white/[0.01] rounded-full blur-[150px] pointer-events-none" />
      </motion.div>

      {/* Assembly Telemetry */}
      <div className="absolute bottom-12 left-12 text-left space-y-4 pointer-events-none">
        <div className="space-y-1">
          <div className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em]">System_Archetype:</div>
          <div className="text-[11px] font-heading font-black text-white uppercase tracking-wider">{systemClass}</div>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-2">
          <div>
            <div className="text-[7px] font-mono text-white/20 uppercase tracking-widest">Maturity</div>
            <div className="w-16 h-[2px] bg-white/5 overflow-hidden">
              <motion.div animate={{ width: `${maturity * 100}%` }} className="h-full bg-white/40" />
            </div>
          </div>
          <div>
            <div className="text-[7px] font-mono text-white/20 uppercase tracking-widest">Stability</div>
            <div className="w-16 h-[2px] bg-white/5 overflow-hidden">
              <motion.div animate={{ width: `${(1 - debt) * 100}%` }} className="h-full bg-white/40" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 right-12 text-right pointer-events-none">
        <div className="text-[9px] font-mono text-white/30 uppercase tracking-[0.5em] flex items-center justify-end gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          Assembly_Lock: Enabled
        </div>
      </div>
    </div>
  );
};

export default SystemConstructionField;