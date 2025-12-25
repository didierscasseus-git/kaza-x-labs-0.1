import React from 'react';
import { motion, Variants } from 'framer-motion';

interface SystemModuleProps {
  type: 'core' | 'chassis' | 'gear' | 'sensor' | 'beam' | 'rotor' | 'cable';
  active: boolean;
  pulse?: number; 
  rotationSpeed?: number;
  scale?: number;
  delay?: number;
  rotation?: number;
  offset?: { x: number; y: number; z: number };
}

const SystemModule: React.FC<SystemModuleProps> = ({ 
  type, active, pulse = 0.5, rotationSpeed = 1, scale = 1, delay = 0, rotation = 0, offset = { x: 0, y: 0, z: 0 } 
}) => {
  if (!active) return null;

  const variants: Variants = {
    initial: { 
      opacity: 0, 
      scale: 0.5,
      z: -200,
      rotateY: rotation + 90,
      rotateX: 45
    },
    animate: { 
      opacity: 1, 
      scale: scale,
      z: offset.z,
      rotateY: rotation,
      rotateX: 0,
      x: offset.x,
      y: offset.y,
      transition: { 
        duration: 1.5, 
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        delay 
      }
    }
  };

  const renderMechanicalPart = () => {
    switch (type) {
      case 'core':
        return (
          <div className="relative w-24 h-24 preserve-3d">
            <motion.div 
              animate={{ 
                scale: [1, 1 + (pulse * 0.1), 1],
                opacity: [0.6, 1, 0.6],
                rotateX: [0, 10, -10, 0]
              }}
              transition={{ duration: 3 - (pulse * 2), repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 border-[0.5px] border-white/60 bg-white/10 flex items-center justify-center"
            >
              <div className="w-4 h-4 bg-white/80 rounded-full blur-[2px]" />
            </motion.div>
            <div className="absolute inset-x-0 top-0 h-[1px] bg-white/20 translate-z-10" />
            <div className="absolute inset-y-0 left-0 w-[1px] bg-white/20 translate-z-10" />
          </div>
        );
      case 'chassis':
        return (
          <div className="relative w-64 h-64 preserve-3d">
            <div className="absolute inset-0 border border-white/5 bg-white/[0.01] rounded-sm" />
            <div className="absolute inset-10 border border-white/10 translate-z-20 opacity-40" />
            <div className="absolute -inset-4 border border-white/5 opacity-10" />
          </div>
        );
      case 'gear':
        return (
          <motion.div 
            animate={{ rotate: [0, 360 * rotationSpeed] }}
            transition={{ duration: 10 / rotationSpeed, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 relative flex items-center justify-center"
          >
            <div className="absolute inset-0 border border-white/30 rounded-full" />
            {Array.from({ length: 8 }).map((_, i) => (
              <div 
                key={i} 
                className="absolute w-2 h-4 bg-white/20" 
                style={{ transform: `rotate(${i * 45}deg) translateY(-10px)` }}
              />
            ))}
            <div className="w-4 h-4 bg-white/40 rounded-full" />
          </motion.div>
        );
      case 'beam':
        return (
          <div className="w-1 h-64 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        );
      case 'rotor':
        return (
          <motion.div 
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-40 h-[1px] bg-white/40"
          />
        );
      case 'sensor':
        return (
          <div className="flex flex-col items-center gap-2">
            <div className="w-2 h-2 bg-white/80 blur-[0.5px] animate-pulse" />
            <div className="w-[0.5px] h-8 bg-white/20" />
          </div>
        );
      case 'cable':
        return (
          <div className="w-[1px] h-40 bg-white/10 border-l border-dashed border-white/20" />
        );
      default: return null;
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      className="absolute flex items-center justify-center preserve-3d"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {renderMechanicalPart()}
    </motion.div>
  );
};

export default SystemModule;