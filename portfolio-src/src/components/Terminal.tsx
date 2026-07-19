import React, { useState, useEffect, useRef } from 'react';
import { translations, projectsData } from '../i18n';
import { Terminal as TermIcon, AlertCircle } from 'lucide-react';

interface TerminalProps {
  lang: 'fr' | 'en';
  setLang: (lang: 'fr' | 'en') => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

interface CommandOutput {
  command: string;
  output: string | React.ReactNode;
  timestamp: string;
}

export const Terminal: React.FC<TerminalProps> = ({ lang, setLang, theme, toggleTheme }) => {
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: 'systeminfo',
      output: (
        <div className="space-y-1">
          <p className="text-emerald-400 font-bold">Mustapha NIAMANE - OS Terminal v1.0.0</p>
          <p className="text-slate-400">Type <span className="text-primary-glow font-bold">"help"</span> to view all available commands.</p>
        </div>
      ),
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const t = translations[lang];

  // Auto scroll to bottom of the console buffer
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const commandList = [
    'help',
    'clear',
    'about',
    'skills',
    'projects',
    'contact',
    'social',
    'history',
    'theme',
    'lang',
  ];

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCmd = inputVal.trim().toLowerCase();
    if (!cleanCmd) return;

    // Add to history list
    const newCmdHistory = [...cmdHistory, inputVal];
    setCmdHistory(newCmdHistory);
    setHistoryIndex(-1);
    setInputVal('');

    let reply: string | React.ReactNode = '';

    switch (cleanCmd) {
      case 'help':
        reply = (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1.5 text-xs text-slate-300">
            <div><span className="text-emerald-400 font-bold">help</span> - Display this guide</div>
            <div><span className="text-emerald-400 font-bold">clear</span> - Clear console logs</div>
            <div><span className="text-emerald-400 font-bold">about</span> - Brief career statement</div>
            <div><span className="text-emerald-400 font-bold">skills</span> - Skill stats rating overview</div>
            <div><span className="text-emerald-400 font-bold">projects</span> - View project list summary</div>
            <div><span className="text-emerald-400 font-bold">contact</span> - Contact email & phone</div>
            <div><span className="text-emerald-400 font-bold">social</span> - Profile URL references</div>
            <div><span className="text-emerald-400 font-bold">history</span> - Previous input log history</div>
            <div><span className="text-emerald-400 font-bold">theme</span> - Toggle light/dark views</div>
            <div><span className="text-emerald-400 font-bold">lang</span> - Switch FR/EN i18n languages</div>
          </div>
        );
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'about':
        reply = (
          <div className="space-y-1 max-w-2xl text-slate-300">
            <p className="font-bold text-white">{t['about-subtitle']}</p>
            <p className="text-slate-300 leading-relaxed text-xs">{t['about-p1'].replace(/<\/?[^>]+(>|$)/g, "")}</p>
          </div>
        );
        break;
      case 'skills':
        reply = (
          <div className="space-y-1 pt-1.5 text-xs text-slate-300">
            <p><span className="text-primary-glow font-bold">Backend & API:</span> 90% (PHP, Laravel 11, API REST, JWT, MVC, DDD)</p>
            <p><span className="text-primary-glow font-bold">Frontend & UI:</span> 80% (JS, TS, React.js, Tailwind CSS, HTML/CSS)</p>
            <p><span className="text-primary-glow font-bold">Databases:</span> 85% (SQL, MySQL, MongoDB, Query Tuning, Indexing)</p>
            <p><span className="text-primary-glow font-bold">DevOps & tools:</span> 85% (Git, Docker, Linux, CI/CD, GitHub Actions, Scrum)</p>
          </div>
        );
        break;
      case 'projects':
        reply = (
          <div className="space-y-3 pt-1 text-slate-300">
            {Object.values(projectsData).map((proj) => (
              <div key={proj.id} className="border-l border-white/10 pl-3">
                <p className="font-bold text-white text-sm">{proj.title[lang]}</p>
                <p className="text-xs text-slate-400 mb-1">{proj.desc[lang].substring(0, 85)}...</p>
                <p className="text-[10px] text-primary-glow">Stack: {proj.tags.join(', ')}</p>
              </div>
            ))}
          </div>
        );
        break;
      case 'contact':
        reply = (
          <div className="space-y-1 pt-1 text-xs text-slate-300">
            <p><span className="font-bold text-white">Email:</span> <a href="mailto:mustaphaniamane@gmail.com" className="text-primary-glow hover:underline">mustaphaniamane@gmail.com</a></p>
            <p><span className="font-bold text-white">Phone:</span> <a href="tel:+33745149504" className="text-primary-glow hover:underline">+33 7 45 14 95 04</a></p>
            <p><span className="font-bold text-white">Location:</span> Paris, France / Remote</p>
          </div>
        );
        break;
      case 'social':
        reply = (
          <div className="space-y-1 pt-1 text-xs text-slate-300">
            <p><span className="font-bold text-white">GitHub:</span> <a href="https://github.com/NIAMANE-Mustapha" target="_blank" rel="noreferrer" className="text-primary-glow hover:underline">github.com/NIAMANE-Mustapha</a></p>
            <p><span className="font-bold text-white">LinkedIn:</span> <a href="https://www.linkedin.com/in/mustapha-niamane" target="_blank" rel="noreferrer" className="text-primary-glow hover:underline">linkedin.com/in/mustapha-niamane</a></p>
          </div>
        );
        break;
      case 'history':
        reply = (
          <div className="text-xs text-slate-400 space-y-1">
            {newCmdHistory.map((cmd, i) => (
              <p key={i}>{(i + 1).toString().padStart(3, '0')}  {cmd}</p>
            ))}
          </div>
        );
        break;
      case 'theme':
        toggleTheme();
        reply = `System theme updated to: ${theme === 'dark' ? 'LIGHT' : 'DARK'}`;
        break;
      case 'lang': {
        const nextLang = lang === 'fr' ? 'en' : 'fr';
        setLang(nextLang);
        reply = `System language swapped to: ${nextLang.toUpperCase()}`;
        break;
      }
      default:
        reply = (
          <div className="flex items-center gap-2 text-rose-400 text-xs">
            <AlertCircle size={14} />
            <span>Command not found: "{cleanCmd}". Type "help" to view directory options.</span>
          </div>
        );
    }

    setHistory((prev) => [
      ...prev,
      {
        command: inputVal,
        output: reply,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  };

  // Keyboard navigation listeners (Tab, ArrowUp, ArrowDown)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      // Simple autocompletion matching prefixes
      const val = inputVal.toLowerCase();
      if (!val) return;
      const match = commandList.find((cmd) => cmd.startsWith(val));
      if (match) {
        setInputVal(match);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const newIdx = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIdx);
      setInputVal(cmdHistory[newIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cmdHistory.length === 0 || historyIndex === -1) return;
      if (historyIndex === cmdHistory.length - 1) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        const newIdx = historyIndex + 1;
        setHistoryIndex(newIdx);
        setInputVal(cmdHistory[newIdx]);
      }
    }
  };

  const handleConsoleClick = () => {
    inputRef.current?.focus();
  };

  return (
    <section className="relative py-24 max-w-5xl mx-auto px-6 z-10">
      <div 
        className="glass-card rounded-2xl overflow-hidden border border-white/10 shadow-2xl crt-screen text-left"
        onClick={handleConsoleClick}
      >
        {/* Console Title Bar */}
        <div className="bg-[#090d16] px-4 py-3 flex items-center justify-between border-b border-white/5 select-none">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500" />
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-[10px] sm:text-xs font-semibold text-slate-500 font-mono ml-2">mustapha@niamane-os:~</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600">
            <TermIcon size={14} />
            <span className="text-[9px] uppercase tracking-wider font-bold">bash</span>
          </div>
        </div>

        {/* Terminal Screen Body */}
        <div className="bg-[#04060b] p-6 h-80 overflow-y-auto font-mono text-slate-300 text-xs sm:text-sm space-y-4">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-slate-500 text-[10px]">
                <span>$ {item.command}</span>
                <span>{item.timestamp}</span>
              </div>
              <div className="pl-4 border-l border-emerald-500/20 text-slate-300">
                {item.output}
              </div>
            </div>
          ))}

          {/* Form input line */}
          <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 pt-2">
            <span className="text-emerald-400 font-bold">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow bg-transparent border-none outline-none text-emerald-400 font-semibold caret-transparent focus:ring-0 p-0"
              placeholder='Type "help" for options...'
              autoComplete="off"
              autoCapitalize="off"
            />
            {/* Blinking block cursor */}
            <span className="w-2 h-4 bg-emerald-400 blink-cursor -ml-2" />
          </form>

          <div ref={terminalEndRef} />
        </div>
      </div>
    </section>
  );
};
