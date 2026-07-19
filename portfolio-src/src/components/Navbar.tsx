import React, { useState, useEffect } from 'react';
import { translations } from '../i18n';
import { Sun, Moon, Menu, X } from 'lucide-react';

interface NavbarProps {
  lang: 'fr' | 'en';
  setLang: (lang: 'fr' | 'en') => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, setLang, theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  const t = translations[lang];

  const navItems = [
    { id: 'about', label: t['nav-about'] },
    { id: 'skills', label: t['nav-skills'] },
    { id: 'experience', label: t['nav-experience'] },
    { id: 'projects', label: t['nav-projects'] },
    { id: 'gallery', label: t['nav-gallery'] },
    { id: 'contact', label: t['nav-contact'] },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Scroll state for translucent background addition
      setScrolled(window.scrollY > 50);

      // Scroll progress percentage calculation
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // Check current visible section for navigation highlighting
      const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'gallery', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.getElementById(id);
    if (target) {
      window.scrollTo({
        top: id === 'hero' ? 0 : target.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-white/5 backdrop-blur-md ${
          scrolled ? 'py-3 bg-bgDark/80 shadow-lg' : 'py-5 bg-transparent'
        }`}
        style={{
          borderBottomColor: scrolled ? 'var(--border-glass)' : 'rgba(255, 255, 255, 0.02)',
          backgroundColor: scrolled ? 'var(--bg-navbar-scrolled)' : 'var(--bg-navbar)'
        }}
      >
        {/* Scroll Progress Line */}
        <div
          className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-primary to-primary-glow via-secondary"
          style={{ width: `${scrollProgress}%`, transition: 'width 0.1s ease-out' }}
        />

        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e as any, 'hero')}
            className="text-2xl font-heading font-extrabold tracking-tight"
          >
            MN<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-glow to-secondary">.</span>
          </a>

          {/* Desktop Navigation Link Items */}
          <ul className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:text-white ${
                    activeSection === item.id ? 'text-white' : 'text-slate-400'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute bottom-[-15px] left-4 right-4 h-[2px] bg-primary-glow rounded-full shadow-[0_0_8px_var(--primary-glow)]" />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Configuration Actions (Lang, Theme, Hamburger) */}
          <div className="flex items-center gap-3">
            {/* Lang Button */}
            <button
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 hover:border-primary-glow transition-all duration-300 magnetic"
              title={lang === 'fr' ? 'Switch to English' : 'Passer en Français'}
            >
              {lang === 'fr' ? (
                // French flag mockup or simple indicator
                <span className="text-xs font-bold text-slate-300">EN</span>
              ) : (
                <span className="text-xs font-bold text-slate-300">FR</span>
              )}
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 hover:border-primary-glow transition-all duration-300 magnetic"
              title={theme === 'dark' ? 'Mode Clair' : 'Mode Sombre'}
            >
              {theme === 'dark' ? (
                <Sun size={18} className="text-yellow-400 animate-spin-slow" />
              ) : (
                <Moon size={18} className="text-indigo-400" />
              )}
            </button>

            {/* Mobile Menu Toggle button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 hover:border-primary-glow transition-all duration-300"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Panel */}
      <div
        className={`fixed inset-y-0 right-0 z-40 w-72 bg-bgDark/95 border-l border-white/5 backdrop-blur-lg transform transition-transform duration-500 ease-in-out md:hidden shadow-2xl ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ borderLeftColor: 'var(--border-glass)' }}
      >
        <div className="flex flex-col h-full pt-24 px-6 pb-10">
          <ul className="flex flex-col gap-6 flex-grow">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`block py-2 text-lg font-medium border-b border-white/5 transition-colors ${
                    activeSection === item.id ? 'text-primary-glow' : 'text-slate-400'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="text-center text-xs text-slate-500">
            Mustapha NIAMANE &copy; 2026
          </div>
        </div>
      </div>
    </>
  );
};
