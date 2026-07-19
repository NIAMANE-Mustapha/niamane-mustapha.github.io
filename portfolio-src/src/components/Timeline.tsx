import React, { useRef } from 'react';
import { translations } from '../i18n';
import { motion, useScroll, useSpring } from 'framer-motion';

interface TimelineProps {
  lang: 'fr' | 'en';
}

export const Timeline: React.FC<TimelineProps> = ({ lang }) => {
  const t = translations[lang];
  const containerRef = useRef<HTMLDivElement>(null);

  // Monitor scroll progress on this section to draw the centerline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end']
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const timelineItems = [
    {
      id: 1,
      date: t['exp-job1-date'],
      title: t['exp-job1-title'],
      company: 'InnovQube (Paris)',
      desc: t['exp-job1-desc'],
      side: 'left'
    },
    {
      id: 2,
      date: t['exp-job2-date'],
      title: t['exp-job2-title'],
      company: 'ERAH (Paris)',
      desc: t['exp-job2-desc'],
      side: 'right'
    },
    {
      id: 3,
      date: t['exp-job3-date'],
      title: t['exp-job3-title'],
      company: 'Taousse Business Consulting Services (Casablanca)',
      desc: t['exp-job3-desc'],
      side: 'left'
    }
  ];

  return (
    <section id="experience" className="relative py-24 px-6 max-w-7xl mx-auto z-10" ref={containerRef}>
      {/* Title */}
      <div className="text-center mb-20">
        <h2 className="text-3xl sm:text-5xl font-heading font-bold mb-4 relative inline-block text-textMain">
          {t['exp-title']}
          <span className="block w-16 h-1 bg-gradient-to-r from-primary to-primary-glow mx-auto mt-3 rounded-full" />
        </h2>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Animated Center Drawing Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-slate-800 transform -translate-x-1/2 hidden md:block" />
        <motion.div
          className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-primary-glow to-accent transform -translate-x-1/2 origin-top hidden md:block shadow-[0_0_8px_var(--primary-glow)]"
          style={{ scaleY }}
        />

        {/* Mobile Line */}
        <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-slate-800 md:hidden" />

        {/* Timeline Cards */}
        <div className="space-y-12 relative">
          {timelineItems.map((item, idx) => (
            <div
              key={item.id}
              className={`flex flex-col md:flex-row items-center justify-between relative ${item.side === 'right' ? 'md:flex-row-reverse' : ''
                }`}
            >
              {/* Desktop Center Connector Dot */}
              <div className="absolute left-1/2 top-[30px] transform -translate-x-1/2 w-4 h-4 rounded-full bg-bgDark border-2 border-primary-glow z-10 hidden md:block shadow-[0_0_8px_var(--primary-glow)] hover:scale-125 transition-transform" />

              {/* Mobile Connector Dot */}
              <div className="absolute left-4 top-[30px] transform -translate-x-1/2 w-4 h-4 rounded-full bg-bgDark border-2 border-primary-glow z-10 md:hidden" />

              {/* Card wrapper */}
              <motion.div
                className="w-full md:w-[45%] pl-10 md:pl-0"
                initial={{ opacity: 0, x: item.side === 'left' ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <div className="glass-card glass-card-hover p-8 rounded-2xl border border-borderGlass relative">
                  {/* Date Tag */}
                  <span className="text-xs font-heading font-bold text-primary-glow uppercase tracking-wider block mb-2">
                    {item.date}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-textMain mb-1">
                    {item.title}
                  </h3>

                  {/* Company */}
                  <h4 className="text-sm font-semibold text-textMuted mb-4">
                    {item.company}
                  </h4>

                  {/* Description */}
                  <p
                    className="text-textMuted text-sm sm:text-base leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.desc }}
                  />
                </div>
              </motion.div>

              {/* Spacer on the opposite side */}
              <div className="w-[45%] hidden md:block" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
