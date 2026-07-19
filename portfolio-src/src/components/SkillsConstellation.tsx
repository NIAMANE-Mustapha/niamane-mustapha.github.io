import React, { useState, useRef } from 'react';
import { translations } from '../i18n';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
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
}

const ConstellationNode: React.FC<NodeProps> = ({
  position,
  color,
  name,
  level,
  isSelected,
  onHover,
  onClick,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Organic bounce/float animation
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const offset = position[0] * 10; // offset based on position
    meshRef.current.position.y = position[1] + Math.sin(time + offset) * 0.15;
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
        <sphereGeometry args={[isSelected ? 0.7 : hovered ? 0.6 : 0.45, 32, 32]} />
        <meshBasicMaterial
          color={hovered || isSelected ? color : '#334155'}
          wireframe={!isSelected && !hovered}
        />
        
        {/* Glowing halo indicator */}
        {(hovered || isSelected) && (
          <mesh>
            <sphereGeometry args={[isSelected ? 0.9 : 0.75, 16, 16]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.15}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        )}

        {/* 3D Label Overlay */}
        <Html distanceFactor={10} position={[0, 1.2, 0]} center>
          <div className="px-3 py-1 rounded-md glass-card text-xs font-semibold text-white whitespace-nowrap pointer-events-none select-none border border-white/5 shadow-md">
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
      <lineBasicMaterial color="rgba(99, 102, 241, 0.2)" linewidth={1} />
    </line>
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
      technos: ['PHP', 'Laravel 11', 'API RESTful', 'Domain Driven Design (DDD)', 'MVC', 'JWT']
    },
    {
      id: 1,
      title: t['skills-card2-title'],
      desc: t['skills-card2-desc'],
      level: 80,
      color: '#6366f1',
      icon: 'fa-js',
      technos: ['JavaScript ES6+', 'TypeScript', 'React.js', 'Three.js', 'Tailwind CSS', 'HTML5 & CSS3']
    },
    {
      id: 2,
      title: t['skills-card3-title'],
      desc: t['skills-card3-desc'],
      level: 85,
      color: '#a855f7',
      icon: 'fa-database',
      technos: ['SQL / MySQL', 'MongoDB', 'Query Optimization', 'Indexing', 'Database Partitioning']
    },
    {
      id: 3,
      title: t['skills-card4-title'],
      desc: t['skills-card4-desc'],
      level: 85,
      color: '#10b981',
      icon: 'fa-tools',
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
          <h2 className="text-3xl sm:text-5xl font-heading font-bold mb-4 relative inline-block text-white">
            {t['skills-title']}
            <span className="block w-16 h-1 bg-gradient-to-r from-primary to-primary-glow mx-auto mt-3 rounded-full" />
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: 3D interactive Skill Constellation Graph */}
          <div className="lg:col-span-7 h-[400px] lg:h-[500px] glass-card rounded-3xl overflow-hidden relative border border-white/5">
            <div className="absolute top-4 left-6 z-10 text-xs font-semibold text-slate-400 select-none">
              &lt; Drag to rotate, click nodes to inspect &gt;
            </div>

            <Canvas camera={{ position: [0, 0, 7.5], fov: 60 }} dpr={[1, 1.5]}>
              <ambientLight intensity={0.8} />
              <pointLight position={[10, 10, 10]} intensity={1.5} />
              
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
                  isSelected={selectedIdx === cat.id}
                  onHover={() => {}}
                  onClick={() => setSelectedIdx(cat.id)}
                />
              ))}

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
                className="glass-card p-8 rounded-3xl h-full border border-white/5 flex flex-col justify-between"
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
                      <h3 className="text-xl sm:text-2xl font-heading font-bold text-white leading-tight">
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
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    {activeSkill.desc}
                  </p>

                  {/* Tech stack items tags list */}
                  <h4 className="text-sm font-heading font-semibold text-slate-200 mb-3 uppercase tracking-wider">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeSkill.technos.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1.5 rounded-lg border border-white/5 bg-white/5 text-slate-300 transition-colors duration-300 hover:border-slate-400 hover:text-white"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center text-xs text-slate-500">
                  <span>Selected Category: {activeSkill.title}</span>
                  <div className="flex gap-1.5">
                    {skillCategories.map((dot) => (
                      <button
                        key={dot.id}
                        onClick={() => setSelectedIdx(dot.id)}
                        className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                          selectedIdx === dot.id ? 'bg-primary-glow' : 'bg-slate-700'
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
