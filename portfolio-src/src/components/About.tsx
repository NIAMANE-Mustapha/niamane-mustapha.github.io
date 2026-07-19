import React, { useEffect, useState, useRef } from 'react';
import { translations } from '../i18n';
import { motion, useInView } from 'framer-motion';

interface AboutProps {
  lang: 'fr' | 'en';
}

const CountUpNumber: React.FC<{ target: number; suffix?: string }> = ({ target, suffix = '+' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 1500; // 1.5 seconds

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing out quadratic
      const easeProgress = progress * (2 - progress);
      const current = Math.floor(easeProgress * target);
      
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-4xl sm:text-5xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white to-primary-glow">
      {count}{suffix}
    </div>
  );
};

export const About: React.FC<AboutProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <section id="about" className="relative py-24 px-6 max-w-7xl mx-auto z-10">
      {/* Title */}
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-5xl font-heading font-bold mb-4 relative inline-block text-white">
          {t['about-title']}
          <span className="block w-16 h-1 bg-gradient-to-r from-primary to-primary-glow mx-auto mt-3 rounded-full" />
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: About Text Details */}
        <motion.div
          className="lg:col-span-7 space-y-6 text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h3 className="text-xl sm:text-2xl font-heading font-semibold text-primary-glow">
            {t['about-subtitle']}
          </h3>
          
          <p 
            className="text-textMuted leading-relaxed text-base sm:text-lg"
            dangerouslySetInnerHTML={{ __html: t['about-p1'] }}
          />
          
          <p 
            className="text-textMuted leading-relaxed text-base sm:text-lg"
            dangerouslySetInnerHTML={{ __html: t['about-p2'] }}
          />

          {/* Personal Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-borderGlass">
            <div className="text-sm text-textMuted">
              <span dangerouslySetInnerHTML={{ __html: t['about-info-loc'] }} />
            </div>
            <div className="text-sm text-textMuted">
              <span dangerouslySetInnerHTML={{ __html: t['about-info-email'] }} />
            </div>
            <div className="text-sm text-textMuted">
              <span dangerouslySetInnerHTML={{ __html: t['about-info-phone'] }} />
            </div>
            <div className="text-sm text-textMuted">
              <span dangerouslySetInnerHTML={{ __html: t['about-info-spec'] }} />
            </div>
          </div>
        </motion.div>

        {/* Right: Glassmorphic Stats Grid */}
        <motion.div
          className="lg:col-span-5 grid grid-cols-2 gap-4"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Stat Card 1 */}
          <div className="glass-card glass-card-hover p-6 rounded-2xl flex flex-col items-center justify-center text-center">
            <CountUpNumber target={3} suffix="+" />
            <p className="text-xs font-semibold tracking-wider text-textMuted uppercase mt-3 leading-tight">
              {t['about-stat-exp']}
            </p>
          </div>

          {/* Stat Card 2 */}
          <div className="glass-card glass-card-hover p-6 rounded-2xl flex flex-col items-center justify-center text-center">
            <CountUpNumber target={15} suffix="+" />
            <p className="text-xs font-semibold tracking-wider text-textMuted uppercase mt-3 leading-tight">
              {t['about-stat-projects']}
            </p>
          </div>

          {/* Stat Card 3 */}
          <div className="glass-card glass-card-hover p-6 rounded-2xl flex flex-col items-center justify-center text-center">
            <CountUpNumber target={100} suffix="%" />
            <p className="text-xs font-semibold tracking-wider text-textMuted uppercase mt-3 leading-tight">
              {t['about-stat-passion']}
            </p>
          </div>

          {/* Stat Card 4 */}
          <div className="glass-card glass-card-hover p-6 rounded-2xl flex flex-col items-center justify-center text-center">
            <CountUpNumber target={80} suffix="%" />
            <p className="text-xs font-semibold tracking-wider text-textMuted uppercase mt-3 leading-tight">
              {t['about-stat-speed']}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
