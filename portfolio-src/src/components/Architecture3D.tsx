import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- MAIN ARCHITECTURE COMPONENT ---
interface ArchitectureProps {
  lang: 'fr' | 'en';
}

export const Architecture3D: React.FC<ArchitectureProps> = ({ lang }) => {
  const [activeNode, setActiveNode] = useState<string>('gateway');
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Nodes coordinates (in SVG viewBox space)
  const nodes = {
    client: { label: 'React Client SPA', type: 'Client', color: '#61dafb' },
    gateway: { label: 'Core Laravel Gateway', type: 'Gateway', color: '#ff2d20' },
    wallet: { label: 'Module Wallet', type: 'Module', color: '#00f2fe' },
    gamification: { label: 'Module Gamification', type: 'Module', color: '#a855f7' },
    db: { label: 'MySQL Shared DB', type: 'Database', color: '#10b981' },
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
        <h2 className="text-3xl sm:text-5xl font-heading font-bold mb-4 text-textMain">
          {lang === 'fr' ? 'Architecture Système Interactive' : 'Interactive System Architecture'}
        </h2>
        <p className="text-textMuted max-w-2xl mx-auto text-sm sm:text-base mb-12">
          {lang === 'fr' 
            ? "Visualisation interactive du monolithe modulaire implémenté pour mes applications, montrant les flux de requêtes et de transactions."
            : "Interactive visualization of the modular monolith architecture, displaying request routing and transactional data flow paths."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Interactive 2D SVG/HTML Schema Container */}
        <div className="lg:col-span-7 h-[450px] lg:h-[550px] glass-card rounded-3xl overflow-hidden relative border border-borderGlass bg-slate-950/20">
          <div className="absolute top-4 left-6 z-10 text-xs font-semibold text-textMuted select-none">
            &lt; Click nodes to inspect request details &gt;
          </div>

          {/* Embedded Custom CSS animation style for GPU dashed line offset */}
          <style>{`
            @keyframes flowDash {
              to {
                stroke-dashoffset: -20;
              }
            }
            .animate-flow-dash {
              animation: flowDash 1.2s linear infinite;
            }
          `}</style>

          {/* SVG Connection Tracks */}
          <svg viewBox="0 0 500 500" className="w-full h-full absolute inset-0 z-0">
            <defs>
              <radialGradient id="gateway-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ff2d20" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#ff2d20" stopOpacity="0" />
              </radialGradient>
            </defs>

            <circle cx="250" cy="190" r="100" fill="url(#gateway-glow)" />

            {/* Client -> Gateway */}
            <path 
              d="M 250 50 L 250 190" 
              stroke="#61dafb" 
              strokeWidth="2" 
              className="transition-all duration-300"
              opacity={hoveredNode === 'client' || hoveredNode === 'gateway' || activeNode === 'client' || activeNode === 'gateway' ? 0.7 : 0.2} 
            />
            <path 
              d="M 250 50 L 250 190" 
              stroke="#61dafb" 
              strokeWidth="2" 
              strokeDasharray="6 4" 
              className="animate-flow-dash transition-all duration-300"
              opacity={hoveredNode === 'client' || hoveredNode === 'gateway' || activeNode === 'client' || activeNode === 'gateway' ? 0.9 : 0.4} 
            />

            {/* Gateway -> Wallet */}
            <path 
              d="M 250 190 L 100 320" 
              stroke="#00f2fe" 
              strokeWidth="2" 
              className="transition-all duration-300"
              opacity={hoveredNode === 'gateway' || hoveredNode === 'wallet' || activeNode === 'gateway' || activeNode === 'wallet' ? 0.7 : 0.2} 
            />
            <path 
              d="M 250 190 L 100 320" 
              stroke="#00f2fe" 
              strokeWidth="2" 
              strokeDasharray="6 4" 
              className="animate-flow-dash transition-all duration-300"
              opacity={hoveredNode === 'gateway' || hoveredNode === 'wallet' || activeNode === 'gateway' || activeNode === 'wallet' ? 0.9 : 0.4} 
            />

            {/* Gateway -> Gamification */}
            <path 
              d="M 250 190 L 400 320" 
              stroke="#a855f7" 
              strokeWidth="2" 
              className="transition-all duration-300"
              opacity={hoveredNode === 'gateway' || hoveredNode === 'gamification' || activeNode === 'gateway' || activeNode === 'gamification' ? 0.7 : 0.2} 
            />
            <path 
              d="M 250 190 L 400 320" 
              stroke="#a855f7" 
              strokeWidth="2" 
              strokeDasharray="6 4" 
              className="animate-flow-dash transition-all duration-300"
              opacity={hoveredNode === 'gateway' || hoveredNode === 'gamification' || activeNode === 'gateway' || activeNode === 'gamification' ? 0.9 : 0.4} 
            />

            {/* Wallet -> DB */}
            <path 
              d="M 100 320 L 250 440" 
              stroke="#10b981" 
              strokeWidth="2" 
              className="transition-all duration-300"
              opacity={hoveredNode === 'wallet' || hoveredNode === 'db' || activeNode === 'wallet' || activeNode === 'db' ? 0.7 : 0.2} 
            />
            <path 
              d="M 100 320 L 250 440" 
              stroke="#10b981" 
              strokeWidth="2" 
              strokeDasharray="6 4" 
              className="animate-flow-dash transition-all duration-300"
              opacity={hoveredNode === 'wallet' || hoveredNode === 'db' || activeNode === 'wallet' || activeNode === 'db' ? 0.9 : 0.4} 
            />

            {/* Gamification -> DB */}
            <path 
              d="M 400 320 L 250 440" 
              stroke="#10b981" 
              strokeWidth="2" 
              className="transition-all duration-300"
              opacity={hoveredNode === 'gamification' || hoveredNode === 'db' || activeNode === 'gamification' || activeNode === 'db' ? 0.7 : 0.2} 
            />
            <path 
              d="M 400 320 L 250 440" 
              stroke="#10b981" 
              strokeWidth="2" 
              strokeDasharray="6 4" 
              className="animate-flow-dash transition-all duration-300"
              opacity={hoveredNode === 'gamification' || hoveredNode === 'db' || activeNode === 'gamification' || activeNode === 'db' ? 0.9 : 0.4} 
            />

            {/* Cascading Moving Circle Packets (Compositor Loop) */}
            <circle r="4" fill="#61dafb">
              <animateMotion dur="3.5s" repeatCount="indefinite" path="M 250 50 L 250 190" />
            </circle>
            <circle r="4" fill="#00f2fe">
              <animateMotion dur="2.8s" repeatCount="indefinite" path="M 250 190 L 100 320" />
            </circle>
            <circle r="4" fill="#a855f7">
              <animateMotion dur="2.8s" repeatCount="indefinite" path="M 250 190 L 400 320" />
            </circle>
            <circle r="4" fill="#10b981">
              <animateMotion dur="3.2s" repeatCount="indefinite" path="M 100 320 L 250 440" />
            </circle>
            <circle r="4" fill="#10b981">
              <animateMotion dur="3.2s" repeatCount="indefinite" path="M 400 320 L 250 440" />
            </circle>
          </svg>

          {/* Interactive overlays (Absolute HTML cards) */}
          
          {/* CLIENT */}
          <button 
            onClick={() => setActiveNode('client')}
            onMouseEnter={() => setHoveredNode('client')}
            onMouseLeave={() => setHoveredNode(null)}
            style={{ left: "50%", top: "11%" }}
            className={`absolute -translate-x-[50%] -translate-y-[50%] z-20 transition-all duration-300 w-44 p-3 glass-card border rounded-2xl flex items-center gap-3 ${
              activeNode === 'client' 
                ? 'border-[#61dafb] shadow-[0_0_20px_rgba(97,218,251,0.25)] bg-slate-900/90 scale-105' 
                : 'border-borderGlass hover:bg-slate-900/40 hover:scale-105'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-[#61dafb]/10 flex items-center justify-center text-[#61dafb] shrink-0">
              <i className="fab fa-react text-lg" />
            </div>
            <div className="text-left leading-none">
              <div className="text-[10px] text-textMuted uppercase tracking-wider font-mono">Client</div>
              <div className="text-xs font-bold text-textMain mt-0.5">React SPA</div>
            </div>
            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </button>

          {/* GATEWAY */}
          <button 
            onClick={() => setActiveNode('gateway')}
            onMouseEnter={() => setHoveredNode('gateway')}
            onMouseLeave={() => setHoveredNode(null)}
            style={{ left: "50%", top: "38%" }}
            className={`absolute -translate-x-[50%] -translate-y-[50%] z-20 transition-all duration-300 w-48 p-3 glass-card border rounded-2xl flex items-center gap-3 ${
              activeNode === 'gateway' 
                ? 'border-[#ff2d20] shadow-[0_0_20px_rgba(255,45,32,0.25)] bg-slate-900/90 scale-105' 
                : 'border-borderGlass hover:bg-slate-900/40 hover:scale-105'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-[#ff2d20]/10 flex items-center justify-center text-[#ff2d20] shrink-0 animate-spin-slow">
              <i className="fab fa-laravel text-lg" />
            </div>
            <div className="text-left leading-none">
              <div className="text-[10px] text-textMuted uppercase tracking-wider font-mono">Gateway</div>
              <div className="text-xs font-bold text-textMain mt-0.5">Laravel API Router</div>
            </div>
          </button>

          {/* WALLET */}
          <button 
            onClick={() => setActiveNode('wallet')}
            onMouseEnter={() => setHoveredNode('wallet')}
            onMouseLeave={() => setHoveredNode(null)}
            style={{ left: "20%", top: "64%" }}
            className={`absolute -translate-x-[50%] -translate-y-[50%] z-20 transition-all duration-300 w-40 p-3 glass-card border rounded-2xl flex items-center gap-3 ${
              activeNode === 'wallet' 
                ? 'border-[#00f2fe] shadow-[0_0_20px_rgba(0,242,254,0.25)] bg-slate-900/90 scale-105' 
                : 'border-borderGlass hover:bg-slate-900/40 hover:scale-105'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-[#00f2fe]/10 flex items-center justify-center text-[#00f2fe] shrink-0">
              <i className="fa fa-wallet text-sm" />
            </div>
            <div className="text-left leading-none">
              <div className="text-[10px] text-textMuted uppercase tracking-wider font-mono">Module</div>
              <div className="text-xs font-bold text-textMain mt-0.5">Wallet</div>
            </div>
          </button>

          {/* GAMIFICATION */}
          <button 
            onClick={() => setActiveNode('gamification')}
            onMouseEnter={() => setHoveredNode('gamification')}
            onMouseLeave={() => setHoveredNode(null)}
            style={{ left: "80%", top: "64%" }}
            className={`absolute -translate-x-[50%] -translate-y-[50%] z-20 transition-all duration-300 w-40 p-3 glass-card border rounded-2xl flex items-center gap-3 ${
              activeNode === 'gamification' 
                ? 'border-[#a855f7] shadow-[0_0_20px_rgba(168,85,247,0.25)] bg-slate-900/90 scale-105' 
                : 'border-borderGlass hover:bg-slate-900/40 hover:scale-105'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-[#a855f7]/10 flex items-center justify-center text-[#a855f7] shrink-0">
              <i className="fa fa-trophy text-sm" />
            </div>
            <div className="text-left leading-none">
              <div className="text-[10px] text-textMuted uppercase tracking-wider font-mono">Module</div>
              <div className="text-xs font-bold text-textMain mt-0.5">Gamification</div>
            </div>
          </button>

          {/* DATABASE */}
          <button 
            onClick={() => setActiveNode('db')}
            onMouseEnter={() => setHoveredNode('db')}
            onMouseLeave={() => setHoveredNode(null)}
            style={{ left: "50%", top: "88%" }}
            className={`absolute -translate-x-[50%] -translate-y-[50%] z-20 transition-all duration-300 w-48 p-3 glass-card border rounded-2xl flex items-center gap-3 ${
              activeNode === 'db' 
                ? 'border-[#10b981] shadow-[0_0_20px_rgba(16,185,129,0.25)] bg-slate-900/90 scale-105' 
                : 'border-borderGlass hover:bg-slate-900/40 hover:scale-105'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-[#10b981]/10 flex items-center justify-center text-[#10b981] shrink-0">
              <i className="fa fa-database text-sm" />
            </div>
            <div className="text-left leading-none">
              <div className="text-[10px] text-textMuted uppercase tracking-wider font-mono">Database</div>
              <div className="text-xs font-bold text-textMain mt-0.5">MySQL Shared DB</div>
            </div>
          </button>
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
              className="glass-card p-8 rounded-3xl h-full border border-borderGlass flex flex-col justify-between"
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

                <h3 className="text-xl sm:text-3xl font-heading font-bold text-textMain mb-4 mt-2">
                  {activeDetail.title[lang]}
                </h3>

                <p className="text-textMuted text-sm sm:text-base leading-relaxed mb-6">
                  {activeDetail.desc[lang]}
                </p>

                <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-textMuted mb-3">
                  {lang === 'fr' ? 'Caractéristiques clés' : 'Key Specifications'}
                </h4>
                
                <ul className="space-y-2">
                  {activeDetail.list.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-sm text-textMuted">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: nodes[activeNode as keyof typeof nodes].color }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-xs text-textMuted mt-8 pt-4 border-t border-borderGlass">
                {lang === 'fr' 
                  ? "*Cliquez sur un autre nœud pour voir ses détails."
                  : "*Click on other nodes to view their responsibilities."}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
