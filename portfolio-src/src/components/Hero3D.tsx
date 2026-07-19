import React, { useState, useEffect, useRef } from 'react';
import { translations, occupations } from '../i18n';
import profileImg from '../assets/profile_upright.jpg';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { ArrowRight, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// --- 3D INTERACTIVE PARTICLE SYSTEM ---
const ParticleField: React.FC<{ mouse: React.MutableRefObject<{ x: number; y: number }> }> = ({ mouse }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 400;
  
  // Generate random coordinates inside a sphere
  const [positions] = useState(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 8 + Math.random() * 8; // Sphere radius range [8, 16]
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  });

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    // Rotate the particle field organically
    const time = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = time * 0.05;
    pointsRef.current.rotation.x = time * 0.03;
    
    // Subtly react to mouse coordinates
    const targetX = mouse.current.x * 1.5;
    const targetY = mouse.current.y * 1.5;
    pointsRef.current.position.x += (targetX - pointsRef.current.position.x) * 0.05;
    pointsRef.current.position.y += (-targetY - pointsRef.current.position.y) * 0.05;
  });

  return (
    <group>
      <Points ref={pointsRef} positions={positions} stride={3} limit={count}>
        <PointMaterial
          transparent
          color="#00f2fe"
          size={0.12}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

// --- MAIN HERO COMPONENT ---
interface Hero3DProps {
  lang: 'fr' | 'en';
}

export const Hero3D: React.FC<Hero3DProps> = ({ lang }) => {
  const t = translations[lang];
  const mouse = useRef({ x: 0, y: 0 });
  const [typewriterText, setTypewriterText] = useState('');
  const [occIndex, setOccIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  // Mouse move listener to update coordinates for 3D camera reactivity
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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

  return (
    <section id="hero" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-24 bg-bgDark">
      {/* 3D R3F Canvas Container */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.5} />
          <ParticleField mouse={mouse} />
        </Canvas>
      </div>

      {/* Aurora Radial Backdrop */}
      <div className="absolute inset-0 bg-radial pointer-events-none z-0 opacity-40 mix-blend-screen" 
           style={{ background: 'radial-gradient(circle at center, rgba(13, 22, 41, 0.45) 0%, #070b13 100%)' }} />

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
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-extrabold tracking-tight leading-[1.08] mb-4 text-white">
            {t['hero-greeting']} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-glow via-secondary to-accent">
              Mustapha NIAMANE
            </span>
          </h1>

          {/* Subtitle / Typewriter */}
          <h2 className="text-lg sm:text-2xl font-medium text-slate-400 mb-6 min-h-[40px] flex items-center">
            <span className="text-slate-100 font-semibold">{typewriterText}</span>
            <span className="w-[3px] h-[24px] bg-primary-glow ml-1.5 blink-cursor inline-block" />
          </h2>

          {/* Paragraph */}
          <p className="text-base sm:text-lg text-slate-400 max-w-xl mb-8 leading-relaxed">
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/10 hover:border-white/30 text-white font-semibold text-sm hover:bg-white/5 transition-all duration-300 transform hover:-translate-y-0.5 magnetic"
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
