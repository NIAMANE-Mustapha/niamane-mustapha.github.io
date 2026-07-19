import React, { useState, useRef } from 'react';
import { translations } from '../i18n';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Points, PointMaterial } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

// --- INTERACTIVE 3D CONSTELLATION NODE ---
interface NodeProps {
  position: [number, number, number];
  color: string;
  name: string;
  level: number;
  isSelected: boolean;
  onHover: (hovered: boolean) => void;
  onClick: () => void;
  type: string;
}

const ConstellationNode: React.FC<NodeProps> = ({
  position,
  color,
  name,
  level,
  isSelected,
  onHover,
  onClick,
  type,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Organic bounce/float and continuous spin animation
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const offset = position[0] * 10; // offset based on position
    meshRef.current.position.y = position[1] + Math.sin(time + offset) * 0.12;
    
    // Slow rotational spin
    meshRef.current.rotation.x += delta * 0.35;
    meshRef.current.rotation.y += delta * 0.22;
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        position={position}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          onHover(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          onHover(false);
        }}
      >
        {type === 'backend' && <dodecahedronGeometry args={[isSelected ? 0.72 : hovered ? 0.62 : 0.5, 0]} />}
        {type === 'frontend' && <icosahedronGeometry args={[isSelected ? 0.72 : hovered ? 0.62 : 0.5, 0]} />}
        {type === 'db' && <cylinderGeometry args={[isSelected ? 0.55 : hovered ? 0.46 : 0.36, isSelected ? 0.55 : hovered ? 0.46 : 0.36, 0.75, 6]} />}
        {type === 'devops' && <torusKnotGeometry args={[isSelected ? 0.38 : hovered ? 0.32 : 0.25, 0.08, 48, 8, 2, 3]} />}

        <meshPhysicalMaterial
          color={hovered || isSelected ? color : '#475569'}
          roughness={0.15}
          metalness={0.8}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          transmission={0.45}
          thickness={0.6}
          ior={1.45}
          flatShading={type !== 'devops'} // clean faceted look for nodes, smooth for torus knot
        />
        
        {/* Glowing halo indicator */}
        {(hovered || isSelected) && (
          <mesh>
            {type === 'backend' && <dodecahedronGeometry args={[isSelected ? 0.9 : 0.78, 0]} />}
            {type === 'frontend' && <icosahedronGeometry args={[isSelected ? 0.9 : 0.78, 0]} />}
            {type === 'db' && <cylinderGeometry args={[isSelected ? 0.72 : 0.6, isSelected ? 0.72 : 0.6, 0.95, 6]} />}
            {type === 'devops' && <torusKnotGeometry args={[isSelected ? 0.5 : 0.42, 0.12, 48, 8, 2, 3]} />}
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.12}
              blending={THREE.AdditiveBlending}
              wireframe
            />
          </mesh>
        )}

        {/* 3D Label Overlay */}
        <Html distanceFactor={10} position={[0, type === 'db' ? 0.9 : 1.1, 0]} center>
          <div className="px-3 py-1 rounded-md glass-card text-xs font-semibold text-textMain whitespace-nowrap pointer-events-none select-none border border-borderGlass shadow-md">
            {name} ({level}%)
          </div>
        </Html>
      </mesh>
    </group>
  );
};

// --- CONNECTING THREADS ---
const ConnectingLines: React.FC<{ points: [number, number, number][] }> = ({ points }) => {
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(
    points.map((p) => new THREE.Vector3(...p))
  );

  return (
    // @ts-ignore
    <line geometry={lineGeometry}>
      <lineBasicMaterial color="rgba(99, 102, 241, 0.15)" linewidth={1} />
    </line>
  );
};

// --- DRIFTING STARS BACKGROUND ---
const DriftingStars: React.FC<{ count: number }> = ({ count }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions] = useState(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    return arr;
  });

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = time * 0.015;
    pointsRef.current.rotation.x = time * 0.01;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} limit={count}>
      <PointMaterial
        transparent
        color="#a855f7"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

// --- MAIN SKILLS COMPONENT ---
interface SkillsProps {
  lang: 'fr' | 'en';
}

export const SkillsConstellation: React.FC<SkillsProps> = ({ lang }) => {
  const t = translations[lang];
  const [selectedIdx, setSelectedIdx] = useState(0);

  // Position coordinates for 3D nodes
  const nodePositions: [number, number, number][] = [
    [-3, 1, 0],  // Backend
    [3, 1.5, 0], // Frontend
    [-1, -2, 2], // DBs
    [1, -1.5, -2] // DevOps
  ];

  const skillCategories = [
    {
      id: 0,
      title: t['skills-card1-title'],
      desc: t['skills-card1-desc'],
      level: 90,
      color: '#00f2fe',
      icon: 'fa-php',
      type: 'backend',
      technos: ['PHP', 'Laravel 11', 'API RESTful', 'Domain Driven Design (DDD)', 'MVC', 'JWT']
    },
    {
      id: 1,
      title: t['skills-card2-title'],
      desc: t['skills-card2-desc'],
      level: 80,
      color: '#6366f1',
      icon: 'fa-js',
      type: 'frontend',
      technos: ['JavaScript ES6+', 'TypeScript', 'React.js', 'Three.js', 'Tailwind CSS', 'HTML5 & CSS3']
    },
    {
      id: 2,
      title: t['skills-card3-title'],
      desc: t['skills-card3-desc'],
      level: 85,
      color: '#a855f7',
      icon: 'fa-database',
      type: 'db',
      technos: ['SQL / MySQL', 'MongoDB', 'Query Optimization', 'Indexing', 'Database Partitioning']
    },
    {
      id: 3,
      title: t['skills-card4-title'],
      desc: t['skills-card4-desc'],
      level: 85,
      color: '#10b981',
      icon: 'fa-tools',
      type: 'devops',
      technos: ['Git / GitHub', 'Docker', 'Linux / Nginx', 'CI/CD (GitHub Actions)', 'Scrum / Agile']
    }
  ];

  // Active details card selector
  const activeSkill = skillCategories[selectedIdx];

  return (
    <section id="skills" className="relative py-24 bg-gradient-to-b from-bgDark to-bgDark/50">
      {/* Aurora Radial Backdrop */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20" 
           style={{ background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.15) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-heading font-bold mb-4 relative inline-block text-textMain">
            {t['skills-title']}
            <span className="block w-16 h-1 bg-gradient-to-r from-primary to-primary-glow mx-auto mt-3 rounded-full" />
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: 3D interactive Skill Constellation Graph */}
          <div className="lg:col-span-7 h-[400px] lg:h-[500px] glass-card rounded-3xl overflow-hidden relative border border-borderGlass">
            <div className="absolute top-4 left-6 z-10 text-xs font-semibold text-textMuted select-none">
              &lt; Drag to rotate, click nodes to inspect &gt;
            </div>

            <Canvas camera={{ position: [0, 0, 7.5], fov: 60 }} dpr={[1, 1.5]}>
              <ambientLight intensity={0.25} />
              <pointLight position={[5, 5, 5]} intensity={1.5} color="#00f2fe" />
              <pointLight position={[-5, -5, -5]} intensity={1.0} color="#6366f1" />
              <pointLight position={[0, -5, 3]} intensity={0.8} color="#a855f7" />
              <directionalLight position={[0, 5, 0]} intensity={1.2} color="#ffffff" />
              
              {/* Connect nodes with line threads */}
              <ConnectingLines points={[
                nodePositions[0], nodePositions[1],
                nodePositions[1], nodePositions[2],
                nodePositions[2], nodePositions[3],
                nodePositions[3], nodePositions[0],
                nodePositions[0], nodePositions[2],
                nodePositions[1], nodePositions[3],
              ]} />

              {/* Skill Spheres */}
              {skillCategories.map((cat, i) => (
                <ConstellationNode
                  key={cat.id}
                  position={nodePositions[i]}
                  color={cat.color}
                  name={cat.title}
                  level={cat.level}
                  type={cat.type}
                  isSelected={selectedIdx === cat.id}
                  onHover={() => {}}
                  onClick={() => setSelectedIdx(cat.id)}
                />
              ))}

              <DriftingStars count={100} />

              <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 2.5} />
            </Canvas>
          </div>


          {/* Right: Glassmorphic Skill Detail sidebar panel */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSkill.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="glass-card p-8 rounded-3xl h-full border border-borderGlass flex flex-col justify-between"
              >
                <div>
                  {/* Category Title & Icon */}
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                      style={{ backgroundColor: `${activeSkill.color}20`, border: `1px solid ${activeSkill.color}50` }}
                    >
                      <i className={`fab ${activeSkill.icon} text-2xl`} style={{ color: activeSkill.color }} />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-heading font-bold text-textMain leading-tight">
                        {activeSkill.title}
                      </h3>
                      <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: activeSkill.color }}>
                        {activeSkill.level}% Mastered
                      </p>
                    </div>
                  </div>

                  {/* Level Progress Indicator Bar */}
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mb-6">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: activeSkill.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${activeSkill.level}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>

                  {/* Description */}
                  <p className="text-textMuted text-sm mb-6 leading-relaxed">
                    {activeSkill.desc}
                  </p>

                  {/* Tech stack items tags list */}
                  <h4 className="text-sm font-heading font-semibold text-textMain mb-3 uppercase tracking-wider">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeSkill.technos.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1.5 rounded-lg border border-borderGlass bg-white/5 text-textMuted transition-colors duration-300 hover:border-slate-400 hover:text-textMain"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-borderGlass flex justify-between items-center text-xs text-textMuted">
                  <span>Selected Category: {activeSkill.title}</span>
                  <div className="flex gap-1.5">
                    {skillCategories.map((dot) => (
                      <button
                        key={dot.id}
                        onClick={() => setSelectedIdx(dot.id)}
                        className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                          selectedIdx === dot.id ? 'bg-primary-glow' : 'bg-slate-300 dark:bg-slate-700'
                        }`}
                        style={{ backgroundColor: selectedIdx === dot.id ? dot.color : undefined }}
                        title={dot.title}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
