import React, { useState, useRef } from 'react';
import { translations, projectsData, ProjectItem } from '../i18n';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Eye, X } from 'lucide-react';

interface ProjectsProps {
  lang: 'fr' | 'en';
}

const ProjectCard: React.FC<{ project: ProjectItem; lang: 'fr' | 'en'; onOpenModal: (proj: ProjectItem) => void }> = ({
  project,
  lang,
  onOpenModal,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' });
  const [glareStyle, setGlareStyle] = useState({ opacity: 0, left: '0%', top: '0%' });

  const t = translations[lang];

  // Apple/Vercel style 3D Tilt calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x coordinate within the element
    const y = e.clientY - rect.top;  // y coordinate within the element

    const width = rect.width;
    const height = rect.height;

    // Normalize mouse coordinates to [-0.5, 0.5] range
    const normX = (x / width) - 0.5;
    const normY = (y / height) - 0.5;

    // Angle adjustments (tilt constraints)
    const rotateX = -normY * 18; // Rotate around x axis (vertical tilt)
    const rotateY = normX * 18;  // Rotate around y axis (horizontal tilt)

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
    });

    // Mirror reflection glare overlay
    setGlareStyle({
      opacity: 0.15,
      left: `${(x / width) * 100}%`,
      top: `${(y / height) * 100}%`,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    });
    setGlareStyle({
      opacity: 0,
      left: '0%',
      top: '0%',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between h-full relative transition-all duration-300 shadow-xl border border-white/5 bg-bgDark/30"
      style={{
        ...tiltStyle,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Glossy Reflection Overlay */}
      <div
        className="absolute w-40 h-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white pointer-events-none blur-3xl z-10 transition-opacity duration-300"
        style={{
          ...glareStyle,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Project Image Panel */}
      <div className="relative h-48 overflow-hidden group select-none">
        <img
          src={project.img}
          alt={project.title[lang]}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Glow Hover Layer */}
        <div className="absolute inset-0 bg-bgDark/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={() => onOpenModal(project)}
            className="px-4 py-2 rounded-full border border-white bg-white/10 text-white font-medium text-xs flex items-center gap-2 hover:bg-white hover:text-bgDark transition-all duration-300 hover:scale-105"
          >
            <Eye size={14} />
            {t['proj-view']}
          </button>
        </div>
      </div>

      {/* Info Group */}
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-xl sm:text-2xl font-heading font-bold text-textMain mb-2.5">
            {project.title[lang]}
          </h3>
          <p className="text-textMuted text-sm leading-relaxed mb-6">
            {project.desc[lang].length > 130 ? `${project.desc[lang].substring(0, 130)}...` : project.desc[lang]}
          </p>
        </div>

        <div>
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] px-2.5 py-1 rounded-full border border-borderGlass bg-white/5 text-textMuted"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="pt-4 border-t border-borderGlass flex items-center justify-between">
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-glow hover:text-textMain transition-colors"
            >
              {project.link.includes('github.com') ? (
                <>
                  <Github size={14} />
                  <span>Repository</span>
                </>
              ) : (
                <>
                  <ExternalLink size={14} />
                  <span>{t['proj-visit']}</span>
                </>
              )}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Projects: React.FC<ProjectsProps> = ({ lang }) => {
  const t = translations[lang];
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const projects = Object.values(projectsData);

  return (
    <section id="projects" className="relative py-24 bg-gradient-to-b from-bgDark/50 to-bgDark">
      <div className="max-w-7xl mx-auto px-6 z-10 relative">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-heading font-bold mb-4 relative inline-block text-textMain">
            {t['proj-title']}
            <span className="block w-16 h-1 bg-gradient-to-r from-primary to-primary-glow mx-auto mt-3 rounded-full" />
          </h2>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              lang={lang}
              onOpenModal={setSelectedProject}
            />
          ))}
        </div>

        {/* Explore More on Github */}
        <div className="text-center mt-16">
          <a
            href="https://github.com/NIAMANE-Mustapha"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl border border-borderGlass bg-white/5 text-textMain font-semibold text-sm transition-all duration-300 magnetic"
          >
            <i className="fab fa-github text-base" />
            {t['proj-more']}
          </a>
        </div>
      </div>

      {/* Lightbox details modal overlay */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-bgDark/80 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-4xl glass-card rounded-3xl overflow-hidden relative border border-borderGlass z-10 shadow-2xl flex flex-col md:flex-row h-[90vh] md:h-auto max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-bgDark/60 hover:bg-white/10 border border-borderGlass text-textMain flex items-center justify-center transition-colors"
              >
                <X size={18} />
              </button>

              {/* Left Side: Mockup Image */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden bg-bgDark select-none flex items-center justify-center">
                <img
                  src={selectedProject.img}
                  alt={selectedProject.title[lang]}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right Side: Information Panels */}
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-between overflow-y-auto">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-textMain mb-4">
                    {selectedProject.title[lang]}
                  </h3>
                  <p className="text-textMuted text-sm sm:text-base leading-relaxed mb-6">
                    {selectedProject.desc[lang]}
                  </p>

                  <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-textMuted mb-3">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {selectedProject.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-3 py-1 rounded-lg border border-borderGlass bg-white/5 text-textMuted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-primary-glow text-center text-white font-semibold text-sm hover:shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {selectedProject.link.includes('github.com') ? (
                    <>
                      <Github size={16} />
                      <span>{t['proj-github']}</span>
                    </>
                  ) : (
                    <>
                      <ExternalLink size={16} />
                      <span>{t['modal-visit']}</span>
                    </>
                  )}
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
