import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

// --- DATA PACKET PARTICLE ---
interface Packet {
  id: number;
  start: THREE.Vector3;
  end: THREE.Vector3;
  color: string;
  progress: number;
  speed: number;
}

const DataPacket: React.FC<{ packet: Packet; onComplete: (id: number) => void }> = ({ packet, onComplete }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    
    // Update progress
    packet.progress += delta * packet.speed;
    
    if (packet.progress >= 1) {
      onComplete(packet.id);
      return;
    }

    // Interpolate positions
    meshRef.current.position.lerpVectors(packet.start, packet.end, packet.progress);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshBasicMaterial color={packet.color} />
      {/* Light glow halo */}
      <mesh>
        <sphereGeometry args={[0.16, 8, 8]} />
        <meshBasicMaterial color={packet.color} transparent opacity={0.3} blending={THREE.AdditiveBlending} />
      </mesh>
    </mesh>
  );
};

// --- ARCHITECTURE NODE MESH ---
interface ArchNodeProps {
  position: [number, number, number];
  type: 'client' | 'gateway' | 'module' | 'db';
  label: string;
  color: string;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
  onClick: () => void;
}

const ArchNode: React.FC<ArchNodeProps> = ({
  position,
  type,
  label,
  color,
  isHovered,
  onHover,
  onClick,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  // Floating animation
  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.position.y = position[1] + Math.sin(time * 1.5 + position[0]) * 0.08;
  });

  return (
    <group ref={groupRef} position={[position[0], 0, position[2]]}>
      <mesh
        position={[0, position[1], 0]}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          onHover(false);
        }}
      >
        {type === 'client' && <boxGeometry args={[1.2, 0.7, 0.2]} />}
        {type === 'gateway' && <boxGeometry args={[0.9, 0.9, 0.9]} />}
        {type === 'module' && <sphereGeometry args={[0.5, 32, 32]} />}
        {type === 'db' && <cylinderGeometry args={[0.6, 0.6, 0.8, 32]} />}

        <meshStandardMaterial
          color={isHovered ? color : '#334155'}
          roughness={0.2}
          metalness={0.8}
          wireframe={!isHovered}
        />

        {/* Glow Halo */}
        {isHovered && (
          <mesh>
            {type === 'client' && <boxGeometry args={[1.4, 0.9, 0.3]} />}
            {type === 'gateway' && <boxGeometry args={[1.1, 1.1, 1.1]} />}
            {type === 'module' && <sphereGeometry args={[0.65, 16, 16]} />}
            {type === 'db' && <cylinderGeometry args={[0.75, 0.75, 0.9, 16]} />}
            <meshBasicMaterial color={color} transparent opacity={0.12} blending={THREE.AdditiveBlending} />
          </mesh>
        )}

        <Html distanceFactor={10} position={[0, type === 'db' ? -0.8 : 0.8, 0]} center>
          <div className="px-3 py-1 rounded-md glass-card text-xs font-bold text-white whitespace-nowrap pointer-events-none select-none border border-white/5 shadow-lg">
            {label}
          </div>
        </Html>
      </mesh>
    </group>
  );
};

// --- CONNECTING BEAMS ---
const FlowBeam: React.FC<{ start: [number, number, number]; end: [number, number, number] }> = ({ start, end }) => {
  const linePoints = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);

  return (
    // @ts-ignore
    <line geometry={lineGeometry}>
      <lineBasicMaterial color="rgba(255, 255, 255, 0.05)" />
    </line>
  );
};

// --- MAIN ARCHITECTURE COMPONENT ---
interface ArchitectureProps {
  lang: 'fr' | 'en';
}

export const Architecture3D: React.FC<ArchitectureProps> = ({ lang }) => {
  const [activeNode, setActiveNode] = useState<string>('gateway');
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [packets, setPackets] = useState<Packet[]>([]);
  const packetIdRef = useRef(0);

  // Define nodes coordinates
  const nodes = {
    client: { pos: [0, 2.2, 0] as [number, number, number], label: 'React Client SPA', type: 'client' as const, color: '#61dafb' },
    gateway: { pos: [0, 0.6, 0] as [number, number, number], label: 'Core Laravel Gateway', type: 'gateway' as const, color: '#ff2d20' },
    wallet: { pos: [-2.2, -0.8, 0] as [number, number, number], label: 'Module Wallet', type: 'module' as const, color: '#00f2fe' },
    gamification: { pos: [2.2, -0.8, 0] as [number, number, number], label: 'Module Gamification', type: 'module' as const, color: '#a855f7' },
    db: { pos: [0, -2.2, 0] as [number, number, number], label: 'MySQL Shared DB', type: 'db' as const, color: '#10b981' },
  };

  // Periodically emit data packets along connection lines
  useEffect(() => {
    const emit = () => {
      const paths = [
        // Client -> Gateway
        { start: nodes.client.pos, end: nodes.gateway.pos, color: '#61dafb' },
        // Gateway -> Modules
        { start: nodes.gateway.pos, end: nodes.wallet.pos, color: '#00f2fe' },
        { start: nodes.gateway.pos, end: nodes.gamification.pos, color: '#a855f7' },
        // Modules -> Database
        { start: nodes.wallet.pos, end: nodes.db.pos, color: '#10b981' },
        { start: nodes.gamification.pos, end: nodes.db.pos, color: '#10b981' },
      ];

      const newPackets: Packet[] = paths.map((path) => ({
        id: packetIdRef.current++,
        start: new THREE.Vector3(...path.start),
        end: new THREE.Vector3(...path.end),
        color: path.color,
        progress: 0,
        speed: 0.35 + Math.random() * 0.15,
      }));

      setPackets((prev) => [...prev, ...newPackets]);
    };

    const interval = setInterval(emit, 2500);
    return () => clearInterval(interval);
  }, []);

  const removePacket = (id: number) => {
    setPackets((prev) => prev.filter((p) => p.id !== id));
  };

  // Node details text mapping
  const nodeDetails: Record<string, { title: { fr: string; en: string }; desc: { fr: string; en: string }; list: string[] }> = {
    client: {
      title: { fr: 'Client SPA React', en: 'React Client SPA' },
      desc: {
        fr: "L'interface utilisateur développée en React. Elle communique uniquement avec le Gateway API via des requêtes AJAX sécurisées (JWT). L'expérience utilisateur est fluide, optimisée au niveau des bundles.",
        en: "The React-built frontend. It communicates exclusively with the API Gateway via secure HTTP requests carrying JWT payloads, ensuring a decoupling of UI and business processing."
      },
      list: ['SPA (Single Page Application)', 'State Management', 'Tailwind Styling', 'Interactive Widgets']
    },
    gateway: {
      title: { fr: 'Core Laravel Gateway', en: 'Core Laravel Gateway' },
      desc: {
        fr: "Responsable du routage global, de la sécurité et de l'authentification JWT. Il sert de point d'entrée unique et dispatche les requêtes vers les modules correspondants de manière isolée.",
        en: "Acts as the single point of entry for the system. Responsible for global request routing, authentication verification via JWT, global middleware configuration, and system security."
      },
      list: ['Request Routing', 'JWT Security Middleware', 'Core Auth Service', 'Rate Limiting Gatekeeper']
    },
    wallet: {
      title: { fr: 'Module Wallet', en: 'Wallet Module' },
      desc: {
        fr: 'Développé pour ERAH. Gère les opérations transactionnelles complexes (dépôts, retraits, transferts, balances) de manière totalement modulaire et sécurisée avec gestion de la concurrence.',
        en: "Handles critical transactional transactions (deposits, cash withdrawals, peer-to-peer transfers, balances) within ERAH. Features complete encapsulation and concurrency logs."
      },
      list: ['Multi-currency balance logs', 'Concurrency Locks', 'Transactional accounting logs', 'Independent business logic']
    },
    gamification: {
      title: { fr: 'Module Gamification', en: 'Gamification Module' },
      desc: {
        fr: "Gère l'engagement utilisateur : calcul de points d'expérience (XP), attribution de badges, objectifs hebdomadaires et tableaux de bord. Intégration modulaire au système core.",
        en: "Manages user engagement logs: calculating experience points (XP), badge unlock triggers, weekly challenges, leaderboard generation, and reward points distribution."
      },
      list: ['Engagement Engine', 'Badges & XP Levels', 'Trigger events listeners', 'Independent processing']
    },
    db: {
      title: { fr: 'MySQL Base de données', en: 'MySQL Database Schema' },
      desc: {
        fr: 'Base de données SQL partagée physiquement, mais logiquement segmentée par module. Les tables de chaque module sont isolées pour respecter les règles du Monolithe Modulaire.',
        en: "Unified physical storage using MySQL, but logically isolated on a per-module database design schema. Prevents cross-module joins to retain modular deployment structure."
      },
      list: ['Encapsulated tables design', 'Query indexing locks', 'Database constraints validation', 'Foreign key references']
    }
  };

  const activeDetail = nodeDetails[activeNode];

  return (
    <section id="gallery" className="relative py-24 max-w-7xl mx-auto px-6 z-10">
      {/* Title */}
      <div className="text-center mb-6">
        <h2 className="text-3xl sm:text-5xl font-heading font-bold mb-4 text-white">
          {lang === 'fr' ? 'Architecture 3D Interactive' : 'Interactive 3D Architecture'}
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base mb-12">
          {lang === 'fr' 
            ? "Visualisation tridimensionnelle du monolithe modulaire implémenté pour mes applications, montrant les flux de requêtes et de données."
            : "Three-dimensional visualization of the modular monolith architecture, displaying request routing and transactional data packets."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Interactive 3D Canvas */}
        <div className="lg:col-span-7 h-[450px] lg:h-[550px] glass-card rounded-3xl overflow-hidden relative border border-white/5 bg-bgDark/40">
          <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 1.5]}>
            <ambientLight intensity={0.7} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            
            {/* Connections */}
            <FlowBeam start={nodes.client.pos} end={nodes.gateway.pos} />
            <FlowBeam start={nodes.gateway.pos} end={nodes.wallet.pos} />
            <FlowBeam start={nodes.gateway.pos} end={nodes.gamification.pos} />
            <FlowBeam start={nodes.wallet.pos} end={nodes.db.pos} />
            <FlowBeam start={nodes.gamification.pos} end={nodes.db.pos} />

            {/* Packets */}
            {packets.map((p) => (
              <DataPacket key={p.id} packet={p} onComplete={removePacket} />
            ))}

            {/* Nodes */}
            {Object.entries(nodes).map(([key, node]) => (
              <ArchNode
                key={key}
                position={node.pos}
                type={node.type}
                label={node.label}
                color={node.color}
                isHovered={hoveredNode === key || activeNode === key}
                onHover={(hovered) => setHoveredNode(hovered ? key : null)}
                onClick={() => setActiveNode(key)}
              />
            ))}

            <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 2.5} />
          </Canvas>
        </div>

        {/* Right: Glassmorphic Component Detail Sidebar Panel */}
        <div className="lg:col-span-5 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNode}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-8 rounded-3xl h-full border border-white/5 flex flex-col justify-between"
            >
              <div>
                <span 
                  className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full border mb-6 inline-block"
                  style={{ 
                    borderColor: `${nodes[activeNode as keyof typeof nodes].color}30`, 
                    color: nodes[activeNode as keyof typeof nodes].color,
                    backgroundColor: `${nodes[activeNode as keyof typeof nodes].color}10` 
                  }}
                >
                  {nodes[activeNode as keyof typeof nodes].type}
                </span>

                <h3 className="text-xl sm:text-3xl font-heading font-bold text-white mb-4 mt-2">
                  {activeDetail.title[lang]}
                </h3>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  {activeDetail.desc[lang]}
                </p>

                <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-slate-400 mb-3">
                  {lang === 'fr' ? 'Caractéristiques clés' : 'Key Specifications'}
                </h4>
                
                <ul className="space-y-2">
                  {activeDetail.list.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-sm text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: nodes[activeNode as keyof typeof nodes].color }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-xs text-slate-500 mt-8 pt-4 border-t border-white/5">
                {lang === 'fr' 
                  ? "*Cliquez sur un autre nœud 3D pour voir ses détails."
                  : "*Click on other 3D nodes to view their responsibilities."}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
