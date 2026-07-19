import React, { useState } from 'react';
import { translations } from '../i18n';
import { motion, AnimatePresence } from 'framer-motion';

interface SkillsProps {
  lang: 'fr' | 'en';
}

export const SkillsConstellation: React.FC<SkillsProps> = ({ lang }) => {
  const t = translations[lang];
  const [selectedIdx, setSelectedIdx] = useState(0);

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
          {/* Left: 2D Interactive Skill Constellation Graph */}
          <div className="lg:col-span-7 h-[400px] lg:h-[500px] glass-card rounded-3xl overflow-hidden relative border border-borderGlass bg-slate-950/20">
            <div className="absolute top-4 left-6 z-10 text-xs font-semibold text-textMuted select-none">
              &lt; Click nodes to inspect &gt;
            </div>

            {/* SVG Connecting Tracks */}
            <svg viewBox="0 0 500 400" className="w-full h-full absolute inset-0 z-0">
              <defs>
                <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                </radialGradient>
              </defs>
              
              {/* Background ambient core glow */}
              <circle cx="250" cy="200" r="90" fill="url(#core-glow)" />

              {/* Connecting Lines */}
              <line x1="250" y1="200" x2="110" y2="120" stroke="rgba(99, 102, 241, 0.2)" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="250" y1="200" x2="390" y2="100" stroke="rgba(99, 102, 241, 0.2)" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="250" y1="200" x2="130" y2="290" stroke="rgba(99, 102, 241, 0.2)" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="250" y1="200" x2="370" y2="300" stroke="rgba(99, 102, 241, 0.2)" strokeWidth="1.5" strokeDasharray="3 3" />

              <line x1="110" y1="120" x2="390" y2="100" stroke="rgba(99, 102, 241, 0.12)" strokeWidth="1.2" />
              <line x1="390" y1="100" x2="370" y2="300" stroke="rgba(99, 102, 241, 0.12)" strokeWidth="1.2" />
              <line x1="370" y1="300" x2="130" y2="290" stroke="rgba(99, 102, 241, 0.12)" strokeWidth="1.2" />
              <line x1="130" y1="290" x2="110" y2="120" stroke="rgba(99, 102, 241, 0.12)" strokeWidth="1.2" />
              
              {/* Star dust points */}
              <circle cx="80" cy="220" r="1.5" fill="#a855f7" opacity="0.4" />
              <circle cx="430" cy="180" r="1" fill="#00f2fe" opacity="0.3" />
              <circle cx="210" cy="80" r="1.2" fill="#6366f1" opacity="0.5" />
              <circle cx="310" cy="330" r="1.5" fill="#10b981" opacity="0.4" />
              <circle cx="150" cy="160" r="1" fill="#fff" opacity="0.3" />

              {/* Glowing animations */}
              <circle r="3.5" fill="#00f2fe">
                <animateMotion dur="5s" repeatCount="indefinite" path="M 250 200 L 110 120" />
              </circle>
              <circle r="3.5" fill="#6366f1">
                <animateMotion dur="4.2s" repeatCount="indefinite" path="M 250 200 L 390 100" />
              </circle>
              <circle r="3.5" fill="#a855f7">
                <animateMotion dur="6s" repeatCount="indefinite" path="M 250 200 L 130 290" />
              </circle>
              <circle r="3.5" fill="#10b981">
                <animateMotion dur="4.8s" repeatCount="indefinite" path="M 250 200 L 370 300" />
              </circle>
              
              <circle r="3" fill="#6366f1" opacity="0.6">
                <animateMotion dur="7s" repeatCount="indefinite" path="M 110 120 L 390 100" />
              </circle>
              <circle r="3" fill="#10b981" opacity="0.6">
                <animateMotion dur="8s" repeatCount="indefinite" path="M 390 100 L 370 300" />
              </circle>
            </svg>

            {/* Central Stack Core Hub */}
            <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] z-10 flex flex-col items-center select-none">
              <div className="w-14 h-14 rounded-full bg-slate-900 border border-primary/40 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.25)] relative">
                <div className="absolute inset-1 rounded-full border border-dashed border-primary-glow/20 animate-spin-slow" />
                <span className="text-[10px] tracking-widest text-primary font-mono font-bold uppercase">Core</span>
              </div>
            </div>

            {/* Interactive category buttons */}
            {skillCategories.map((cat, i) => {
              const pos = [
                { left: "22%", top: "30%", colorGlow: "shadow-[0_0_25px_rgba(0,242,254,0.35)]", borderGlow: "border-[#00f2fe]/40" },  // Backend
                { left: "78%", top: "25%", colorGlow: "shadow-[0_0_25px_rgba(99,102,241,0.35)]", borderGlow: "border-[#6366f1]/40" },  // Frontend
                { left: "26%", top: "72.5%", colorGlow: "shadow-[0_0_25px_rgba(168,85,247,0.35)]", borderGlow: "border-[#a855f7]/40" },   // DBs
                { left: "74%", top: "75%", colorGlow: "shadow-[0_0_25px_rgba(16,185,129,0.35)]", borderGlow: "border-[#10b981]/40" }   // DevOps
              ][i];

              const isSelected = selectedIdx === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedIdx(cat.id)}
                  style={{ left: pos.left, top: pos.top }}
                  className="absolute -translate-x-[50%] -translate-y-[50%] z-20 flex flex-col items-center gap-2 group transition-all duration-300"
                >
                  <div 
                    style={{ color: cat.color }}
                    className={`w-12 h-12 rounded-full glass-card border border-borderGlass flex items-center justify-center text-xl shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:border-white/20 ${
                      isSelected 
                        ? `${pos.borderGlow} ${pos.colorGlow} bg-slate-900 border-opacity-100 scale-110` 
                        : "hover:bg-slate-900/40"
                    }`}
                  >
                    <i className={`fab ${cat.icon}`} />
                  </div>
                  
                  <div className="px-2.5 py-0.5 rounded-md glass-card border border-borderGlass text-[10px] font-bold text-textMain shadow-sm whitespace-nowrap">
                    {cat.title} ({cat.level}%)
                  </div>
                </button>
              );
            })}
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
                      style={{ color: activeSkill.color }}
                      className="w-12 h-12 rounded-2xl glass-card border border-borderGlass flex items-center justify-center text-2xl shadow-md"
                    >
                      <i className={`fab ${activeSkill.icon}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-textMain">{activeSkill.title}</h3>
                      <span className="text-xs text-textMuted">{lang === 'fr' ? 'Niveau de maîtrise' : 'Mastery Level'}: {activeSkill.level}%</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-textMuted mb-8 leading-relaxed">
                    {activeSkill.desc}
                  </p>

                  {/* Technologies Tags List */}
                  <div className="mb-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-textMuted mb-3">
                      {lang === 'fr' ? 'Technologies clés' : 'Key Technologies'}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeSkill.technos.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 border border-borderGlass text-textMain shadow-sm hover:bg-white/10 hover:border-white/10 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Progress bar metrics */}
                <div className="pt-4 border-t border-borderGlass mt-auto">
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-textMuted">{lang === 'fr' ? 'Niveau d\'expertise' : 'Expertise Level'}</span>
                    <span style={{ color: activeSkill.color }}>{activeSkill.level}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/5 border border-borderGlass overflow-hidden p-0.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${activeSkill.level}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      style={{ backgroundColor: activeSkill.color }}
                      className="h-full rounded-full shadow-inner"
                    />
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
