import React, { useRef, useEffect } from 'react';
import { 
  motion, 
  useAnimationFrame, 
  useMotionValue, 
  useSpring, 
  useTransform, 
  useReducedMotion 
} from 'framer-motion';
import { SurfaceData } from './useSystemMapData';
import { SPRING_TOKENS, SPATIAL_TOKENS, INTERACTION_TOKENS } from '../../constants/motionTokens';
import { useMousePosition } from '../../hooks/useMousePosition';

interface SurfaceNodeProps {
  data: SurfaceData;
  isActive: boolean;
  onClick: () => void;
  position: { top: string; left: string };
}

const SurfaceNode: React.FC<SurfaceNodeProps> = ({ data, isActive, onClick, position }) => {
  const prefersReducedMotion = useReducedMotion();
  const mouse = useMousePosition();
  const nodeRef = useRef<HTMLDivElement>(null);

  // Physical Constraints
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  const cursorInfluence = prefersReducedMotion || isMobile ? 0 : SPATIAL_TOKENS.CURSOR_STRENGTH;
  const springConfig = prefersReducedMotion ? SPRING_TOKENS.REDUCED : SPRING_TOKENS.FLUID;

  // Motion Value Orchestration
  const driftX = useMotionValue(0);
  const driftY = useMotionValue(0);
  const smoothDriftX = useSpring(driftX, springConfig);
  const smoothDriftY = useSpring(driftY, springConfig);

  const scaleMotionValue = useMotionValue(isActive ? 1.1 : 1);
  const nodeScale = useSpring(scaleMotionValue, springConfig);

  useEffect(() => {
    scaleMotionValue.set(isActive ? 1.1 : 1);
  }, [isActive, scaleMotionValue]);

  // Continuous Drift Logic
  useAnimationFrame((time) => {
    if (prefersReducedMotion) return;
    const intensity = (data.drift || 10) * 0.05;
    const x = Math.sin(time * SPATIAL_TOKENS.DRIFT_BASE) * intensity;
    const y = Math.cos(time * (SPATIAL_TOKENS.DRIFT_BASE * 0.8)) * intensity;
    driftX.set(x);
    driftY.set(y);
  });

  // Spatial Transforms
  const mouseX = useTransform(mouse.x, [-0.5, 0.5], [-cursorInfluence * data.depth, cursorInfluence * data.depth]);
  const mouseY = useTransform(mouse.y, [-0.5, 0.5], [-cursorInfluence * data.depth, cursorInfluence * data.depth]);
  
  const depthOpacity = Math.max(0.2, 1 - Math.abs(data.depth) * (1 - SPATIAL_TOKENS.DEPTH_OPACITY));

  // Combine transformations
  const finalX = useTransform([mouseX, smoothDriftX], ([mX, dX]) => (mX as number) + (dX as number));
  const finalY = useTransform([mouseY, smoothDriftY], ([mY, dY]) => (mY as number) + (dY as number));

  return (
    <motion.div 
      ref={nodeRef}
      className="absolute cursor-pointer group" 
      style={{ 
        top: position.top, 
        left: position.left, 
        zIndex: Math.round((data.depth + 1) * 10),
      }}
      onClick={onClick}
    >
      <motion.div
        style={{
          x: finalX,
          y: finalY,
          scale: nodeScale,
          opacity: depthOpacity,
        }}
        className="relative flex items-center justify-center translate-x-[-50%] translate-y-[-50%]"
      >
        <motion.div 
          animate={prefersReducedMotion ? {} : { 
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.25, 0.05],
          }}
          transition={{ 
            duration: (SPATIAL_TOKENS.PULSE_FREQUENCY / (data.pulse || 1)), 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute w-56 h-56 rounded-full bg-white/5 blur-[80px] pointer-events-none"
        />

        <motion.div 
          animate={isActive ? { 
            borderColor: "rgba(255,255,255,0.8)",
            boxShadow: "0 0 40px rgba(255,255,255,0.1)"
          } : { 
            borderColor: "rgba(255,255,255,0.1)",
            boxShadow: "0 0 0px rgba(255,255,255,0)"
          }}
          transition={{ duration: 0.6, ease: INTERACTION_TOKENS.TRANSITION_PRECISION }}
          className={`w-32 h-32 border-2 rounded-full flex flex-col items-center justify-center backdrop-blur-md transition-all duration-500 overflow-hidden ${
            isActive ? 'bg-white text-black' : 'bg-black/60 text-white hover:bg-black/80'
          }`}
        >
          <div className="absolute top-4 font-mono text-[7px] opacity-30 tracking-[0.2em]">
            REF:{data.id.toUpperCase()}
          </div>
          
          <span className="text-[10px] font-mono tracking-widest uppercase mb-1 font-black">
            0{data.id === 'brand' ? 1 : data.id === 'web' ? 2 : data.id === 'automation' ? 3 : data.id === 'platform' ? 4 : 5}
          </span>
          <span className="text-[9px] font-bold text-center px-5 leading-tight uppercase tracking-widest">
            {data.label}
          </span>
          
          <div className="mt-2 flex gap-1.5">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div 
                key={i} 
                animate={isActive ? { scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] } : {}}
                transition={{ delay: i * 0.2, repeat: Infinity, duration: 2 }}
                className={`w-1 h-1 rounded-full ${isActive ? 'bg-black' : 'bg-white/30'}`} 
              />
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={isActive ? { opacity: 1, x: 25 } : { opacity: 0, x: -10 }}
          className="absolute left-full whitespace-nowrap pl-6 pointer-events-none"
        >
          <div className="flex flex-col">
            <div className="text-[10px] font-mono text-white/60 uppercase tracking-[0.5em] mb-1">
              SYSTEM_SYNC
            </div>
            <div className="flex items-center gap-2">
              <div className="h-[1px] w-8 bg-white/20" />
              <div className="text-[8px] font-mono text-white/30 uppercase tracking-widest">
                Stability: {(data.stability * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SurfaceNode;