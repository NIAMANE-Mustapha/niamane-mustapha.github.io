import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero3D } from './components/Hero3D';
import { About } from './components/About';
import { SkillsConstellation } from './components/SkillsConstellation';
import { Architecture3D } from './components/Architecture3D';
import { Timeline } from './components/Timeline';
import { Projects } from './components/Projects';
import { Terminal } from './components/Terminal';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  // Restore language preference
  const [lang, setLang] = useState<'fr' | 'en'>(() => {
    const saved = localStorage.getItem('portfolio-lang');
    return (saved === 'en' ? 'en' : 'fr');
  });

  // Restore theme preference
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('portfolio-theme');
    return (saved === 'light' ? 'light' : 'dark');
  });

  // Sync theme status on body and HTML element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      document.body.classList.add('light-mode');
      root.classList.remove('dark');
      localStorage.setItem('portfolio-theme', 'light');
    } else {
      document.body.classList.remove('light-mode');
      root.classList.add('dark');
      localStorage.setItem('portfolio-theme', 'dark');
    }
  }, [theme]);

  // Sync language status on document header
  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem('portfolio-lang', lang);
  }, [lang]);

  // Initialize Lenis smooth scroll engine
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Linear/Stripe easing curve
      touchMultiplier: 2,
      infinite: false,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Force scroll to top on every page load — disable browser's scroll memory
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="relative min-h-screen bg-bgDark text-textMain overflow-x-hidden selection:bg-primary-glow selection:text-bgDark">
      {/* Animated Mesh Gradients Backdrop */}
      <div className="aurora-bg" />

      {/* Global Interactive Custom Cursor */}
      <CustomCursor />

      {/* Glassmorphic Navbar */}
      <Navbar lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />

      {/* Portfolio Sections */}
      <div className="relative z-10">
        {/* Spectacular 3D Hero */}
        <Hero3D lang={lang} />

        {/* About Details & Counters */}
        <About lang={lang} />

        {/* 3D Skills Constellation */}
        <SkillsConstellation lang={lang} />

        {/* 3D Modular Monolith Request Flow */}
        <Architecture3D lang={lang} />

        {/* Drawing Timeline Journey */}
        <Timeline lang={lang} />

        {/* Projects Cards Showcase */}
        <Projects lang={lang} />

        {/* CLI console terminal shell */}
        <Terminal lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />

        {/* Contact form & social fields */}
        <Contact lang={lang} />

        {/* Futuristic footer */}
        <Footer lang={lang} />
      </div>
    </div>
  );
};
export default App;
