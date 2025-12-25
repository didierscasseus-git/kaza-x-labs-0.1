
import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Grid, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { MachineType, MACHINE_MANIFESTS } from '../system/machineManifests';

interface MachineViewerProps {
  type: MachineType;
  step: number; // 0-8
}

const MechanicalPart: React.FC<{ part: any; index: number; step: number }> = ({ part, index, step }) => {
  const visible = index < step;
  
  const geometry = useMemo(() => {
    switch (part.type) {
      case 'box': return <boxGeometry args={part.args} />;
      case 'cylinder': return <cylinderGeometry args={part.args} />;
      case 'torus': return <torusGeometry args={part.args} />;
      default: return null;
    }
  }, [part]);

  // Cast motion.mesh to any to bypass intrinsic type errors in the environment
  const MotionMesh = motion.mesh as any;

  return (
    <MotionMesh
      position={part.pos}
      rotation={part.rot}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: visible ? 1 : 0, 
        opacity: visible ? 1 : 0 
      }}
      transition={{ 
        type: 'spring', 
        damping: 20, 
        stiffness: 100 
      }}
    >
      {geometry}
      <meshStandardMaterial 
        color="#888" 
        wireframe={true} 
        transparent 
        opacity={0.5} 
      />
    </MotionMesh>
  );
};

export const MachineViewer: React.FC<MachineViewerProps> = ({ type, step }) => {
  const parts = MACHINE_MANIFESTS[type];

  return (
    <div className="w-full h-full bg-[#050505] border-l border-white/10">
      <Canvas>
        <PerspectiveCamera makeDefault position={[5, 5, 5]} fov={40} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Grid 
          infiniteGrid 
          fadeDistance={20} 
          sectionSize={1} 
          cellColor="#222" 
          sectionColor="#444" 
        />
        {parts.map((p, i) => (
          <MechanicalPart key={p.id} part={p} index={i} step={step} />
        ))}
      </Canvas>
    </div>
  );
};
