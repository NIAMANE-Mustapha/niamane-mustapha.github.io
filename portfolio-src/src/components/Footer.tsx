import React from 'react';
import { translations } from '../i18n';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  lang: 'fr' | 'en';
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {

  const handleScrollTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="relative py-12 px-6 border-t border-white/5 bg-[#03050a] z-10 overflow-hidden">
      {/* Decorative Aurora line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-glow to-transparent" />

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
        {/* Copyright copy */}
        <p className="text-slate-500 text-xs sm:text-sm text-center sm:text-left leading-relaxed">
          &copy; 2026 Mustapha NIAMANE. {lang === 'fr' ? 'Conçu avec passion, optimisé pour la performance.' : 'Designed with passion, optimized for performance.'}
        </p>

        {/* Back to top button */}
        <a
          href="#hero"
          onClick={handleScrollTop}
          className="w-10 h-10 rounded-full border border-white/5 bg-white/5 text-slate-400 hover:text-primary-glow hover:border-primary-glow hover:bg-white/10 flex items-center justify-center transition-all duration-300 magnetic"
          aria-label="Back to top"
        >
          <ArrowUp size={16} />
        </a>
      </div>
    </footer>
  );
};
