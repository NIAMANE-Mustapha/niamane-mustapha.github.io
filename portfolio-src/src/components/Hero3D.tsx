import React, { useState, useEffect, useRef } from 'react';
import { translations, occupations } from '../i18n';
import profileImg from '../assets/profile_upright.jpg';
import { ArrowRight, Mail } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

// --- 3D INTERACTIVE PARTICLE SYSTEM ---
// --- 3D INTERACTIVE PARTICLE LAYER ---
// --- FLOATING 2D BACKGROUND SHAPES & DUST ---
// --- DRIFTING 2D STAR FIELD WITH PARALLAX ---
interface StarFieldProps {
  springX: any;
  springY: any;
}

const StarField: React.FC<StarFieldProps> = ({ springX, springY }) => {
  const stars = useRef([...Array(25)].map((_, i) => ({
    size: Math.random() * 3 + 2,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 6 + 5,
    depth: 0.15 + (i % 6) * 0.18 // depth factor for 3D parallax layers!
  })));

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {stars.current.map((star, i) => {
        const starX = useTransform(springX, [-1, 1], [-35 * star.depth, 35 * star.depth]);
        const starY = useTransform(springY, [-1, 1], [30 * star.depth, -30 * star.depth]);

        return (
          <motion.div
            key={i}
            className="absolute bg-primary-glow/40 rounded-full"
            style={{
              width: star.size,
              height: star.size,
              left: `${star.left}%`,
              top: `${star.top}%`,
              x: starX,
              y: starY,
              boxShadow: "0 0 6px rgba(0, 242, 254, 0.45)",
            }}
            animate={{
              opacity: [0.15, 0.6, 0.15],
              scale: [0.9, 1.2, 0.9],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
};

// --- FLOATING 2D BACKGROUND SHAPES ---
interface Floating2DShapesProps {
  x: any;
  y: any;
}

const Floating2DShapes: React.FC<Floating2DShapesProps> = ({ x, y }) => {
  return (
    <motion.div 
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none"
      style={{ x, y }}
    >
      {/* Torus / Ring Outline */}
      <motion.div
        className="absolute top-[20%] left-[10%] w-32 h-32 opacity-[0.12] text-primary"
        animate={{
          y: [0, -12, 0],
          rotate: [0, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current" strokeWidth="1.5">
          <circle cx="50" cy="50" r="40" strokeDasharray="6 4" />
          <circle cx="50" cy="50" r="25" />
        </svg>
      </motion.div>

      {/* Hexagon / Geometric Core Outline */}
      <motion.div
        className="absolute bottom-[20%] right-[12%] w-44 h-44 opacity-[0.1] text-secondary"
        animate={{
          y: [0, 15, 0],
          rotate: [360, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current" strokeWidth="1">
          <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" />
          <line x1="50" y1="5" x2="50" y2="95" />
          <line x1="5" y1="25" x2="95" y2="75" />
          <line x1="95" y1="25" x2="5" y2="75" />
        </svg>
      </motion.div>

      {/* Tech Coordinate Crosshairs */}
      <motion.div
        className="absolute top-[55%] left-[8%] w-8 h-8 opacity-[0.15] text-textMuted"
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg viewBox="0 0 20 20" className="w-full h-full stroke-current" strokeWidth="1.5">
          <line x1="10" y1="2" x2="10" y2="18" />
          <line x1="2" y1="10" x2="18" y2="10" />
        </svg>
      </motion.div>

      {/* Another crosshair on the right */}
      <motion.div
        className="absolute top-[30%] right-[10%] w-6 h-6 opacity-[0.15] text-textMuted"
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg viewBox="0 0 20 20" className="w-full h-full stroke-current" strokeWidth="1.5">
          <line x1="10" y1="4" x2="10" y2="16" />
          <line x1="4" y1="10" x2="16" y2="10" />
          <circle cx="10" cy="10" r="3" fill="none" />
        </svg>
      </motion.div>
    </motion.div>
  );
};


// --- MAIN HERO COMPONENT ---
interface Hero3DProps {
  lang: 'fr' | 'en';
}

export const Hero3D: React.FC<Hero3DProps> = ({ lang }) => {
  const t = translations[lang];
  const [typewriterText, setTypewriterText] = useState('');
  const [occIndex, setOccIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  // High-performance Framer Motion coordinates for 2D parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 80, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 25 });

  const translateX = useTransform(springX, [-1, 1], [-15, 15]);
  const translateY = useTransform(springY, [-1, 1], [-15, 15]);

  // Spotlight tracking
  const rawX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 500);
  const rawY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 500);

  const rawSpringX = useSpring(rawX, { stiffness: 60, damping: 20 });
  const rawSpringY = useSpring(rawY, { stiffness: 60, damping: 20 });

  // Dynamic coordinates for backdrop radial gradient center
  const glowX = useTransform(springX, [-1, 1], ['40%', '60%']);
  const glowY = useTransform(springY, [-1, 1], ['60%', '40%']);

  // Mouse move listener to update coordinates for 2D parallax reactivity & spotlight
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set(-(e.clientY / window.innerHeight) * 2 + 1);
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, rawX, rawY]);

  // Typewriter effect logic
  useEffect(() => {
    const currentList = occupations[lang];
    const currentText = currentList[occIndex];

    const typeTimer = setTimeout(() => {
      if (isDeleting) {
        setTypewriterText(currentText.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
        setTypingSpeed(40);
      } else {
        setTypewriterText(currentText.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
        setTypingSpeed(90);
      }

      if (!isDeleting && charIndex === currentText.length) {
        setTypingSpeed(2200); // Wait on complete string
        setIsDeleting(true);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setOccIndex((prev) => (prev + 1) % currentList.length);
        setTypingSpeed(600); // Wait before starting next string
      }
    }, typingSpeed);

    return () => clearTimeout(typeTimer);
  }, [charIndex, isDeleting, occIndex, lang, typingSpeed]);

  const handleScrollDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const aboutSec = document.getElementById('about');
    if (aboutSec) {
      window.scrollTo({
        top: aboutSec.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  // Dynamic gradient template tracking mouse coordinates with inertia
  const spotlight = useMotionTemplate`radial-gradient(circle 350px at ${rawSpringX}px ${rawSpringY}px, rgba(0, 242, 254, 0.12) 0%, transparent 100%)`;
  const bgGradient = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, rgba(13, 22, 41, 0.65) 0%, #070b13 100%)`;

  return (
    <section id="hero" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-24 bg-bgDark">
      {/* 2D Star Field with dynamic parallax layers */}
      <StarField springX={springX} springY={springY} />

      {/* 2D Animated Constellation Backdrop */}
      <Floating2DShapes x={translateX} y={translateY} />

      {/* Aurora Radial Backdrop following the cursor */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0 opacity-55 mix-blend-screen" 
        style={{ background: bgGradient }} 
      />

      {/* Cursor Spotlight Ring */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0" 
        style={{ background: spotlight }} 
      />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10 w-full">
        {/* Left: Interactive Details */}
        <motion.div 
          className="md:col-span-7 flex flex-col items-start text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-xs font-semibold tracking-wider text-primary-glow uppercase mb-6 animate-pulse-slow">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-ping" />
            {t['hero-badge']}
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-extrabold tracking-tight leading-[1.08] mb-4 text-textMain">
            {t['hero-greeting']} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-glow via-secondary to-accent">
              Mustapha NIAMANE
            </span>
          </h1>

          {/* Subtitle / Typewriter */}
          <h2 className="text-lg sm:text-2xl font-medium text-textMuted mb-6 min-h-[40px] flex items-center">
            <span className="text-textMain font-semibold">{typewriterText}</span>
            <span className="w-[3px] h-[24px] bg-primary-glow ml-1.5 blink-cursor inline-block" />
          </h2>

          {/* Paragraph */}
          <p className="text-base sm:text-lg text-textMuted max-w-xl mb-8 leading-relaxed">
            {t['hero-subtitle']}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              onClick={handleScrollDown}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-primary-glow text-white font-semibold text-sm hover:shadow-[0_0_20px_rgba(0,242,254,0.3)] transition-all duration-300 transform hover:-translate-y-0.5 magnetic"
            >
              {t['hero-btn-projects']}
              <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-borderGlass hover:border-slate-400 dark:hover:border-white/30 text-textMain font-semibold text-sm hover:bg-white/5 transition-all duration-300 transform hover:-translate-y-0.5 magnetic"
            >
              {t['hero-btn-contact']}
              <Mail size={16} />
            </a>
          </div>
        </motion.div>

        {/* Right: Floating Framed Portrait */}
        <motion.div 
          className="md:col-span-5 flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 select-none">
            {/* Spinning Glowing Border Rings */}
            <div className="absolute inset-[-10px] rounded-full border border-dashed border-primary-glow/30 animate-spin-slow pointer-events-none" />
            <div className="absolute inset-[-20px] rounded-full border border-dotted border-secondary/20 animate-spin-slow pointer-events-none" style={{ animationDirection: 'reverse' }} />

            {/* Inner Rounded Framed Profile Picture */}
            <div className="w-full h-full rounded-full p-2.5 bg-gradient-to-tr from-primary via-secondary to-accent shadow-2xl relative overflow-hidden flex items-center justify-center">
              <img
                src={profileImg}
                alt="Mustapha NIAMANE"
                className="w-full h-full object-cover rounded-full border-[6px] border-bgDark transition-all duration-300 hover:scale-105"
              />
            </div>

            {/* Circular Satellite Badges */}
            <div className="absolute top-[10%] left-[-5%] w-12 h-12 rounded-full glass-card flex items-center justify-center text-[#777bb4] shadow-lg animate-bounce" style={{ animationDuration: '4s' }}>
              <i className="fab fa-php text-2xl" />
            </div>
            <div className="absolute bottom-[20%] left-[-10%] w-12 h-12 rounded-full glass-card flex items-center justify-center text-[#ff2d20] shadow-lg animate-bounce" style={{ animationDuration: '5s' }}>
              <i className="fab fa-laravel text-xl" />
            </div>
            <div className="absolute top-[-5%] right-[15%] w-12 h-12 rounded-full glass-card flex items-center justify-center text-[#f7df1e] shadow-lg animate-bounce" style={{ animationDuration: '6s' }}>
              <i className="fab fa-js text-xl" />
            </div>
            <div className="absolute bottom-[10%] right-[-5%] w-12 h-12 rounded-full glass-card flex items-center justify-center text-[#61dafb] shadow-lg animate-bounce" style={{ animationDuration: '4.5s' }}>
              <i className="fab fa-react text-2xl" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Down Scroll Indicator mouse */}
      <a
        href="#about"
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 hover:opacity-80 transition-opacity z-10"
      >
        <div className="w-[26px] h-[40px] rounded-2xl border-2 border-slate-500 flex justify-center p-1 hover:border-primary-glow transition-colors">
          <motion.div 
            className="w-1.5 h-1.5 rounded-full bg-primary-glow"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </a>
    </section>
  );
};
