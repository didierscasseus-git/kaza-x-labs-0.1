
import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Grid, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { SystemClassId } from '../../system/systemClassifier';
import { MACHINE_MANIFESTS, MachinePart } from '../../system/systemMachines';

const MechanicalPart: React.FC<{ part: MachinePart; visible: boolean; index: number }> = ({ part, visible, index }) => {
  const geometry = useMemo(() => {
    switch (part.type) {
      case 'box': return <boxGeometry args={part.args as any} />;
      case 'cylinder': return <cylinderGeometry args={part.args as any} />;
      case 'torus': return <torusGeometry args={part.args as any} />;
      default: return null;
    }
  }, [part]);

  // Cast motion.mesh to any to bypass intrinsic type errors in the environment
  const MotionMesh = motion.mesh as any;

  return (
    <MotionMesh
      position={part.position}
      rotation={part.rotation}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: visible ? 1 : 0, 
        opacity: visible ? 1 : 0,
        y: visible ? part.position[1] : part.position[1] + 2
      }}
      transition={{ 
        duration: 0.8, 
        delay: visible ? index * 0.1 : 0, 
        ease: [0.16, 1, 0.3, 1] 
      }}
    >
      {geometry}
      <meshStandardMaterial 
        color="#ffffff" 
        wireframe={true} 
        transparent 
        opacity={0.4} 
        emissive="#ffffff"
        emissiveIntensity={0.1}
      />
    </MotionMesh>
  );
};

const Assembly: React.FC<{ classId: SystemClassId; progress: number }> = ({ classId, progress }) => {
  const parts = MACHINE_MANIFESTS[classId];
  const visibleCount = Math.floor(progress * parts.length);

  return (
    <group>
      {parts.map((part, i) => (
        <MechanicalPart 
          key={part.id} 
          part={part} 
          visible={i < visibleCount} 
          index={i} 
        />
      ))}
    </group>
  );
};

export const MachineViewer: React.FC<{ classId: SystemClassId; progress: number }> = ({ classId, progress }) => {
  return (
    <div className="w-full h-full bg-[#030303]">
      <Canvas>
        <PerspectiveCamera makeDefault position={[6, 6, 6]} fov={35} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate 
          autoRotateSpeed={0.4} 
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#444" />
        
        <Assembly classId={classId} progress={progress} />
        
        <Grid 
          infiniteGrid 
          fadeDistance={25} 
          sectionSize={1} 
          sectionThickness={1} 
          sectionColor="#1a1a1a" 
          cellColor="#0a0a0a" 
        />
      </Canvas>
    </div>
  );
};
