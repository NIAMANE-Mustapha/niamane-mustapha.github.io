import React, { useState } from 'react';
import { translations } from '../i18n';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, Linkedin, Github } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

interface ContactProps {
  lang: 'fr' | 'en';
}

export const Contact: React.FC<ContactProps> = ({ lang }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const t = translations[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setStatus('submitting');

    // Simulate submission delay
    setTimeout(() => {
      setStatus('success');
      
      // Shoot premium confetti storm
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f2fe', '#6366f1', '#a855f7'],
      });

      setTimeout(() => {
        alert(t['contact-alert']);
        // Reset states
        setName('');
        setEmail('');
        setMessage('');
        setStatus('idle');
      }, 500);

    }, 1800);
  };

  return (
    <section id="contact" className="relative py-24 px-6 max-w-7xl mx-auto z-10">
      {/* Title */}
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-5xl font-heading font-bold mb-4 relative inline-block text-textMain">
          {t['contact-title']}
          <span className="block w-16 h-1 bg-gradient-to-r from-primary to-primary-glow mx-auto mt-3 rounded-full" />
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        {/* Left Side: Contact Form */}
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <form onSubmit={handleSubmit} className="glass-card p-8 rounded-3xl border border-borderGlass space-y-6 h-full flex flex-col justify-between">
            <div className="space-y-6">
              {/* Name Input */}
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder=" "
                  className="w-full bg-white/5 border border-borderGlass rounded-xl px-4 py-4 text-textMain text-sm focus:border-primary-glow focus:ring-1 focus:ring-primary-glow/30 outline-none transition-all duration-300 peer placeholder-shown:placeholder-transparent"
                />
                <label
                  htmlFor="name"
                  className="absolute left-4 top-4 text-xs text-textMuted pointer-events-none transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-textMuted peer-focus:top-[-10px] peer-focus:left-3 peer-focus:text-xs peer-focus:text-primary-glow peer-focus:bg-bgDark peer-focus:px-2 peer-focus:rounded peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-primary-glow peer-[:not(:placeholder-shown)]:bg-bgDark peer-[:not(:placeholder-shown)]:px-2"
                >
                  {t['contact-name']}
                </label>
              </div>

              {/* Email Input */}
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder=" "
                  className="w-full bg-white/5 border border-borderGlass rounded-xl px-4 py-4 text-textMain text-sm focus:border-primary-glow focus:ring-1 focus:ring-primary-glow/30 outline-none transition-all duration-300 peer placeholder-shown:placeholder-transparent"
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 top-4 text-xs text-textMuted pointer-events-none transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-textMuted peer-focus:top-[-10px] peer-focus:left-3 peer-focus:text-xs peer-focus:text-primary-glow peer-focus:bg-bgDark peer-focus:px-2 peer-focus:rounded peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-primary-glow peer-[:not(:placeholder-shown)]:bg-bgDark peer-[:not(:placeholder-shown)]:px-2"
                >
                  {t['contact-email']}
                </label>
              </div>

              {/* Message Area */}
              <div className="relative">
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                  placeholder=" "
                  className="w-full bg-white/5 border border-borderGlass rounded-xl px-4 py-4 text-textMain text-sm focus:border-primary-glow focus:ring-1 focus:ring-primary-glow/30 outline-none transition-all duration-300 peer placeholder-shown:placeholder-transparent resize-none"
                />
                <label
                  htmlFor="message"
                  className="absolute left-4 top-4 text-xs text-textMuted pointer-events-none transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-textMuted peer-focus:top-[-10px] peer-focus:left-3 peer-focus:text-xs peer-focus:text-primary-glow peer-focus:bg-bgDark peer-focus:px-2 peer-focus:rounded peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-primary-glow peer-[:not(:placeholder-shown)]:bg-bgDark peer-[:not(:placeholder-shown)]:px-2"
                >
                  {t['contact-message']}
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status !== 'idle'}
              className={`w-full py-4 rounded-xl font-semibold text-sm transition-all duration-500 flex items-center justify-center gap-2 transform active:scale-[0.98] ${
                status === 'success'
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                  : 'bg-gradient-to-r from-primary to-primary-glow hover:shadow-[0_0_15px_rgba(0,242,254,0.35)] text-white'
              }`}
            >
              {status === 'idle' && (
                <>
                  <span>{t['contact-btn']}</span>
                  <Send size={15} />
                </>
              )}
              {status === 'submitting' && (
                <>
                  <span>{t['contact-submitting']}</span>
                  <Loader2 size={15} className="animate-spin" />
                </>
              )}
              {status === 'success' && (
                <>
                  <span>{t['contact-success']}</span>
                  <CheckCircle2 size={15} />
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Right Side: Coordinate Information */}
        <motion.div
          className="lg:col-span-5 flex flex-col justify-between gap-6"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <div className="glass-card p-8 rounded-3xl border border-borderGlass flex-grow flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-textMain mb-2">
                  {t['contact-info-title']}
                </h3>
                <p className="text-textMuted text-sm leading-relaxed">
                  {t['contact-info-desc']}
                </p>
              </div>

              {/* Coordinates List */}
              <div className="space-y-5 pt-4 border-t border-borderGlass">
                {/* Email */}
                <div className="flex items-center gap-4 text-left">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-borderGlass text-primary-glow flex items-center justify-center flex-shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs text-textMuted font-bold uppercase tracking-wider">
                      {t['contact-label-email']}
                    </h4>
                    <p className="text-sm text-textMuted">
                      <a href="mailto:mustaphaniamane@gmail.com" className="hover:text-primary-glow transition-colors">
                        mustaphaniamane@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4 text-left">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-borderGlass text-primary-glow flex items-center justify-center flex-shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs text-textMuted font-bold uppercase tracking-wider">
                      {t['contact-label-phone']}
                    </h4>
                    <p className="text-sm text-textMuted">
                      <a href="tel:+33745149504" className="hover:text-primary-glow transition-colors">
                        +33 7 45 14 95 04
                      </a>
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-4 text-left">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-borderGlass text-primary-glow flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs text-textMuted font-bold uppercase tracking-wider">
                      {t['contact-label-loc']}
                    </h4>
                    <p className="text-sm text-textMuted">
                      Paris, France / Maroc
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-4 pt-6 border-t border-borderGlass">
              <a
                href="https://www.linkedin.com/in/mustapha-niamane"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-xl bg-white/5 border border-borderGlass text-textMuted hover:text-[#0077b5] hover:border-[#0077b5] hover:bg-[#0077b5]/5 flex items-center justify-center transition-all duration-300 magnetic"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://github.com/NIAMANE-Mustapha"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-xl bg-white/5 border border-borderGlass text-textMuted hover:text-textMain hover:border-textMain hover:bg-white/5 flex items-center justify-center transition-all duration-300 magnetic"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
