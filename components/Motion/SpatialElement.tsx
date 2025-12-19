import React, { useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useMousePosition } from '../../hooks/useMousePosition';

interface SpatialElementProps {
  children: React.ReactNode;
  depth?: number; // -1 to 1 (back to front)
  driftIntensity?: number;
  rotationIntensity?: number;
  className?: string;
  parallaxFactor?: number;
}

const SpatialElement: React.FC<SpatialElementProps> = ({ 
  children, 
  depth = 0, 
  driftIntensity = 20, 
  rotationIntensity = 1.5,
  parallaxFactor = 50,
  className = "" 
}) => {
  const mouse = useMousePosition();
  const { scrollY } = useScroll();
  
  // Mobile-aware responsiveness
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  const responsiveFactor = isMobile ? 0.4 : 1;

  // Parallax Calculation with Physics Smoothing
  const parallaxY = useTransform(
    scrollY, 
    [0, 1200], 
    [0, -parallaxFactor * depth * responsiveFactor]
  );
  const smoothParallaxY = useSpring(parallaxY, { 
    damping: 50, 
    stiffness: 90,
    mass: 1
  });

  // Cursor Proximity Physics
  const cursorX = useTransform(mouse.x, [-0.5, 0.5], [depth * 40, depth * -40]);
  const cursorY = useTransform(mouse.y, [-0.5, 0.5], [depth * 40, depth * -40]);
  
  const smoothCursorX = useSpring(cursorX, { damping: 40, stiffness: 120 });
  const smoothCursorY = useSpring(cursorY, { damping: 40, stiffness: 120 });

  // Perspective Tilt Transforms
  const rotateX = useTransform(mouse.y, [-0.5, 0.5], [rotationIntensity * depth, -rotationIntensity * depth]);
  const rotateY = useTransform(mouse.x, [-0.5, 0.5], [-rotationIntensity * depth, rotationIntensity * depth]);

  return (
    <motion.div
      className={className}
      style={{
        x: smoothCursorX,
        y: smoothParallaxY,
        translateY: smoothCursorY,
        rotateX,
        rotateY,
        scale: useTransform(scrollY, [0, 800], [1, 1 + (depth * 0.08)]),
        perspective: 1000,
        z: depth * 50
      }}
    >
      {children}
    </motion.div>
  );
};

export default SpatialElement;