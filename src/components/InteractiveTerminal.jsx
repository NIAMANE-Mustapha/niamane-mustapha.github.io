import React, { useState, useEffect, useRef } from 'react';

const InteractiveTerminal = ({ translations, lang }) => {
    const [history, setHistory] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const terminalEndRef = useRef(null);
    const inputRef = useRef(null);

    // Initial message
    useEffect(() => {
        setHistory([
            {
                type: 'welcome',
                text: lang === 'fr' 
                    ? "Console interactive de Mustapha v1.0.0. Tapez 'help' pour lister les commandes."
                    : "Mustapha's Interactive Console v1.0.0. Type 'help' to see available commands."
            }
        ]);
    }, [lang]);

    // Scroll to bottom on history change
    useEffect(() => {
        if (terminalEndRef.current) {
            terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [history]);

    const handleCommandSubmit = (e) => {
        e.preventDefault();
        const cmd = inputValue.trim().toLowerCase();
        if (!cmd) return;

        let response = '';
        let status = 'normal';

        switch (cmd) {
            case 'help':
                response = lang === 'fr'
                    ? "Commandes disponibles :\n  - about      : À propos de moi\n  - skills     : Mes expertises techniques\n  - experience : Mon parcours professionnel\n  - projects   : Mes projets récents\n  - contact    : Mes coordonnées\n  - clear      : Effacer l'écran"
                    : "Available commands:\n  - about      : About me\n  - skills     : Technical expertise\n  - experience : Professional journey\n  - projects   : Recent projects\n  - contact    : Contact details\n  - clear      : Clear the screen";
                break;
            case 'about':
                response = translations[lang]["about-p1"].replace(/<\/?[^>]+(>|$)/g, "") + "\n\n" + translations[lang]["about-p2"];
                break;
            case 'skills':
                response = lang === 'fr'
                    ? "⚡ Compétences Techniques :\n- Backend : PHP, Laravel, API RESTful, MVC & Domain Driven Design (90%)\n- Frontend : JavaScript (ES6+), React.js, Tailwind CSS, HTML5/CSS3 (80%)\n- Bases de Données : SQL, MySQL, MongoDB, Optimisation de requêtes (85%)\n- DevOps & Outils : Git, GitHub, Docker, Linux, CI/CD, Agile Scrum (85%)"
                    : "⚡ Technical Skills:\n- Backend: PHP, Laravel, RESTful APIs, MVC & Domain Driven Design (90%)\n- Frontend: JavaScript (ES6+), React.js, Tailwind CSS, HTML5/CSS3 (80%)\n- Databases: SQL, MySQL, MongoDB, Query optimization (85%)\n- DevOps & Tools: Git, GitHub, Docker, Linux, CI/CD, Agile Scrum (85%)";
                break;
            case 'experience':
                response = lang === 'fr'
                    ? "💼 Expériences :\n1. Juin 2026 - Août 2026 : Développeur Backend chez InnovQube (Paris) - Plateformes SaaS InnovGuide & InnovRental.\n2. 2026 : Développeur Full Stack chez ERAH - Conception Monolithe Modulaire & Strangler Pattern.\n3. 2024 : Stage Développeur Full Stack chez Taousse Consulting - E-commerce E-Biblio."
                    : "💼 Experiences:\n1. June 2026 - August 2026: Backend Developer at InnovQube (Paris) - SaaS InnovGuide & InnovRental.\n2. 2026: Full Stack Developer at ERAH - Modular Monolith & Strangler Pattern.\n3. 2024: Full Stack Developer Intern at Taousse Consulting - E-Biblio E-commerce.";
                break;
            case 'projects':
                response = lang === 'fr'
                    ? "🚀 Projets :\n- E-Biblio (Fourniscolaire) : E-commerce complet pour bibliothèques (React/Laravel)\n- Module de Recrutement OFPPT : Traitement de candidatures (Laravel/React)\n- Solution Energy Consulting : Formulaire d'estimation solaire (JS/CSS/HTML)"
                    : "🚀 Projects:\n- E-Biblio (Fourniscolaire): Complete bookstore e-commerce (React/Laravel)\n- OFPPT Recruitment Module: Application processing system (Laravel/React)\n- Solution Energy Consulting: Solar assessment tool (JS/CSS/HTML)";
                break;
            case 'contact':
                response = lang === 'fr'
                    ? "📧 Contact :\n- Email: mustaphaniamane@gmail.com\n- Téléphone: +33 7 45 14 95 04\n- Localisation: Paris, France\n- LinkedIn: linkedin.com/in/mustapha-niamane\n- GitHub: github.com/NIAMANE-Mustapha"
                    : "📧 Contact:\n- Email: mustaphaniamane@gmail.com\n- Phone: +33 7 45 14 95 04\n- Location: Paris, France\n- LinkedIn: linkedin.com/in/mustapha-niamane\n- GitHub: github.com/NIAMANE-Mustapha";
                break;
            case 'clear':
                setHistory([]);
                setInputValue('');
                return;
            default:
                response = lang === 'fr'
                    ? `Commande inconnue: '${cmd}'. Tapez 'help' pour voir la liste.`
                    : `Unknown command: '${cmd}'. Type 'help' to see the list.`;
                status = 'error';
                break;
        }

        setHistory(prev => [...prev, { type: 'command', text: inputValue }, { type: 'response', text: response, status }]);
        setInputValue('');
    };

    const handleShortcutClick = (cmd) => {
        setInputValue(cmd);
        // Focus input after autocomplete
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div className="terminal-section">
            <div className="terminal-wrapper">
                <div className="terminal-topbar">
                    <div className="terminal-dots">
                        <span className="terminal-dot red"></span>
                        <span className="terminal-dot yellow"></span>
                        <span className="terminal-dot green"></span>
                    </div>
                    <div className="terminal-title-text">niamane@portfolio:~</div>
                    <div style={{ width: '48px' }}></div>
                </div>
                <div className="terminal-body" onClick={() => inputRef.current && inputRef.current.focus()}>
                    {history.map((item, index) => (
                        <div key={index} className="terminal-history-item">
                            {item.type === 'welcome' && (
                                <div className="terminal-welcome">{item.text}</div>
                            )}
                            {item.type === 'command' && (
                                <div className="terminal-command-line">
                                    <span className="terminal-prompt-sym">$</span> {item.text}
                                </div>
                            )}
                            {item.type === 'response' && (
                                <div className={`terminal-response-output ${item.status}`}>
                                    {item.text}
                                </div>
                            )}
                        </div>
                    ))}
                    <form onSubmit={handleCommandSubmit} className="terminal-input-prompt">
                        <span className="terminal-prompt-sym">$</span>
                        <input
                            ref={inputRef}
                            type="text"
                            className="terminal-input-field"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={lang === 'fr' ? "Entrez une commande..." : "Enter command..."}
                            autoFocus
                        />
                    </form>
                    <div ref={terminalEndRef}></div>
                </div>
            </div>
            <div className="terminal-shortcuts">
                {['help', 'about', 'skills', 'experience', 'projects', 'contact', 'clear'].map((cmd) => (
                    <button
                        key={cmd}
                        className="terminal-shortcut-btn"
                        onClick={() => handleShortcutClick(cmd)}
                    >
                        {cmd}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default InteractiveTerminal;
