import React, { useState, useEffect, useRef } from 'react';
import { 
    Sun, Moon, Globe, Menu, X, Send, Github, Linkedin, Terminal, 
    ExternalLink, Briefcase, Mail, Phone, MapPin, ArrowUp, 
    Code, Database, Cpu, Layers, GitBranch, Terminal as TermIcon, FileText
} from 'lucide-react';

import ParticleBackground from './components/ParticleBackground';
import InteractiveTerminal from './components/InteractiveTerminal';
import SystemArchitecture from './components/SystemArchitecture';
import Toast from './components/Toast';

// Import local assets
import profileImg from './assets/profile_upright.jpg';
import ebiblioImg from './assets/ebiblio_mockup.png';
import recruitmentImg from './assets/recruitment_mockup.png';
import energyImg from './assets/energy_mockup.png';

// Translations Dictionary
const translations = {
    fr: {
        "nav-about": "À propos",
        "nav-skills": "Compétences",
        "nav-experience": "Parcours",
        "nav-projects": "Projets",
        "nav-gallery": "Architecture",
        "nav-contact": "Contact",

        "hero-badge": "Disponible pour opportunités",
        "hero-greeting": "Bonjour, je suis",
        "hero-subtitle": "Spécialisé dans la conception d'architectures robustes (Monolithes Modulaires), l'optimisation des performances et le développement backend de haut niveau.",
        "hero-btn-projects": "Explorer mes projets",
        "hero-btn-contact": "Me contacter",

        "about-title": "À propos de moi",
        "about-subtitle": "Développeur & Architecte passionné",
        "about-p1": "Développeur Full Stack passionné, je me spécialise dans la création d'architectures logicielles modernes, performantes et scalables. Mon parcours m'a permis d'acquérir une solide expertise sur les technologies du web, de la gestion de bases de données à la mise en place de structures complexes de type <strong>Monolithe Modulaire</strong> et d'approches de migration comme le <strong>Strangler Pattern</strong>.",
        "about-p2": "Rigoureux et autonome, j'aime résoudre des problèmes techniques complexes, optimiser le code existant et automatiser les workflows pour offrir la meilleure expérience utilisateur et développeur possible.",
        "about-info-loc": "Localisation",
        "about-info-email": "Email",
        "about-info-phone": "Téléphone",
        "about-info-spec": "Spécialité",
        "about-stat-exp": "Années d'expérience",
        "about-stat-projects": "Projets Réalisés",
        "about-stat-passion": "% Passion & Rigueur",
        "about-stat-speed": "Optimisation Vitesse %",

        "skills-title": "Expertises & Compétences",
        "skills-card1-title": "Backend & API",
        "skills-card1-desc": "PHP, Laravel, API RESTful, Modélisation MVC & Domain Driven Design.",
        "skills-card2-title": "Frontend & UI",
        "skills-card2-desc": "JavaScript (ES6+), React.js, Tailwind CSS, HTML5, CSS3 Modernes.",
        "skills-card3-title": "Bases de données",
        "skills-card3-desc": "SQL, MySQL, MongoDB. Optimisation de requêtes complexes et d'indexation.",
        "skills-card4-title": "Outils & DevOps",
        "skills-card4-desc": "Git, GitHub, Docker, Linux Administration, CI/CD, Méthodes Agiles Scrum.",

        "exp-title": "Parcours & Expériences",
        "exp-job1-date": "Juin 2026 - Août 2026",
        "exp-job1-title": "Développeur Backend",
        "exp-job1-desc": "Contribution active aux plateformes SaaS InnovGuide et InnovRental. Diagnostic, troubleshooting approfondi et résolution de bugs complexes sur l'environnement de staging.",
        "exp-job2-date": "2026",
        "exp-job2-title": "Développeur Full Stack",
        "exp-job2-desc": "Planification et développement d'une architecture Monolithe Modulaire. Conception complète des modules Wallet et Gamification, et implémentation progressive du Strangler Pattern pour migrer les fonctionnalités legacy.",
        "exp-job3-date": "2024",
        "exp-job3-title": "Développeur Full Stack (Stage)",
        "exp-job3-desc": "Conception et développement de la plateforme e-commerce E-Biblio. Modélisation complète d'API REST et développement du back-office de gestion.",

        "proj-title": "Mes Projets Récents",
        "proj-view": "Voir le projet",
        "proj-visit": "Visiter le site",
        "proj-github": "Voir le dépôt GitHub",
        "proj-more": "En savoir plus sur GitHub",
        "proj-card1-title": "E-Biblio (Fourniscolaire)",
        "proj-card1-desc": "Site e-commerce destiné à une franchise de bibliothèques pour la vente en ligne de fournitures scolaires. Comprend la gestion complète du catalogue et du back-office.",
        "proj-card2-title": "Module de Recrutement",
        "proj-card2-desc": "Plateforme complète de publication d'offres d'emploi et de traitement automatisé des candidatures développée pour l'OFPPT.",
        "proj-card3-title": "Solution Energy Consulting",
        "proj-card3-desc": "Plateforme vitrine et de services pour votre partenaire de confiance en audits énergétiques et solutions solaires.",

        "gal-title": "Démonstrations de Code & Architecture",
        "gal-subtitle": "Découvrez des simulations interactives en temps réel représentant mon workflow de test, ma structure de données et mes intégrations Git.",
        "gal-filter-all": "Tous",
        "gal-filter-arch": "Architecture & Data",
        "gal-filter-code": "Environnement & Code",
        "gal-filter-agile": "Gestion de Projet (Scrum)",
        "gal-card1-badge": "Architecture Logicielle",
        "gal-card1-title": "Monolithe Modulaire",
        "gal-card1-desc": "Visualisation interactive de la structure modulaire implémentée chez ERAH. Les modules interagissent de manière découplée avec une base de données MySQL unifiée.",
        "gal-card2-badge": "Vidéo Code",
        "gal-card2-title": "Programmation & Tests",
        "gal-card2-desc": "Démonstration en temps réel d'exécution de tests unitaires PHPUnit et de requêtes d'optimisation backend.",
        "gal-card3-badge": "Workspace",
        "gal-card3-title": "Environnement Linux / Git",
        "gal-card3-desc": "Développement quotidien sous Linux avec Git en CLI pour un suivi précis des branches et versions de déploiement.",
        "gal-card4-badge": "Kanban Interactif",
        "gal-kanban-todo": "À faire",
        "gal-kanban-doing": "En cours",
        "gal-kanban-done": "Fait",
        "gal-card4-title": "Méthodologie Scrum",
        "gal-card4-desc": "Gestion de projet agile avec Jira/Trello pour planifier les sprints, attribuer les tâches et suivre l'avancement.",
        "gal-card5-badge": "Modélisation Base de données",
        "gal-card5-title": "Conception SQL / MySQL",
        "gal-card5-desc": "Indexation rigoureuse et relations de clés étrangères pour garantir la cohérence des données transactionnelles.",
        "gal-card6-badge": "Git Workflow",
        "gal-card6-title": "Branches & Git Flow",
        "gal-card6-desc": "Utilisation avancée de Git (rebases, interactive staging et commits atomiques) pour des revues de code fluides.",

        "modal-visit": "Visiter / En savoir plus",

        "contact-title": "Me Contacter",
        "contact-name": "Votre nom",
        "contact-email": "Votre adresse email",
        "contact-message": "Votre message",
        "contact-btn": "Envoyer le message",
        "contact-info-title": "Coordonnées",
        "contact-info-desc": "N'hésitez pas à me contacter pour toute opportunité de collaboration, mission freelance ou échange technique.",
        "contact-label-email": "Email",
        "contact-label-phone": "Téléphone",
        "contact-label-loc": "Localisation",
        "footer-text": "© 2026 Mustapha NIAMANE. Conçu avec passion, optimisé pour la performance.",
        
        "contact-submitting": "Transmission en cours...",
        "contact-success": "Message Envoyé !",
        "contact-alert": "Merci pour votre message, Mustapha NIAMANE vous répondra dans les plus brefs délais !"
    },
    en: {
        "nav-about": "About",
        "nav-skills": "Skills",
        "nav-experience": "Journey",
        "nav-projects": "Projects",
        "nav-gallery": "Architecture",
        "nav-contact": "Contact",

        "hero-badge": "Available for opportunities",
        "hero-greeting": "Hello, I am",
        "hero-subtitle": "Specialized in designing robust architectures (Modular Monoliths), performance optimization, and high-level backend development.",
        "hero-btn-projects": "Explore my projects",
        "hero-btn-contact": "Contact me",

        "about-title": "About Me",
        "about-subtitle": "Passionate Developer & Architect",
        "about-p1": "Passionate Full Stack Developer, I specialize in creating modern, high-performance, and scalable software architectures. My journey has allowed me to acquire solid expertise in web technologies, database management, and implementing complex structures like <strong>Modular Monoliths</strong> and migration approaches like the <strong>Strangler Pattern</strong>.",
        "about-p2": "Rigorous and autonomous, I love solving complex technical problems, optimizing existing code, and automating workflows to deliver the best possible user and developer experience.",
        "about-info-loc": "Location",
        "about-info-email": "Email",
        "about-info-phone": "Phone",
        "about-info-spec": "Specialty",
        "about-stat-exp": "Years of Experience",
        "about-stat-projects": "Completed Projects",
        "about-stat-passion": "% Passion & Rigor",
        "about-stat-speed": "Speed Optimization %",

        "skills-title": "Expertise & Skills",
        "skills-card1-title": "Backend & API",
        "skills-card1-desc": "PHP, Laravel, RESTful APIs, MVC Modeling & Domain Driven Design.",
        "skills-card2-title": "Frontend & UI",
        "skills-card2-desc": "JavaScript (ES6+), React.js, Tailwind CSS, HTML5, Modern CSS3.",
        "skills-card3-title": "Databases",
        "skills-card3-desc": "SQL, MySQL, MongoDB. Optimizing complex queries and indexing.",
        "skills-card4-title": "Tools & DevOps",
        "skills-card4-desc": "Git, GitHub, Docker, Linux Administration, CI/CD, Scrum Agile Methods.",

        "exp-title": "Journey & Experiences",
        "exp-job1-date": "June 2026 - August 2026",
        "exp-job1-title": "Backend Developer",
        "exp-job1-desc": "Active contribution to SaaS platforms InnovGuide and InnovRental. Diagnostics, deep troubleshooting, and resolving complex bugs in staging environments.",
        "exp-job2-date": "2026",
        "exp-job2-title": "Full Stack Developer",
        "exp-job2-desc": "Planning and development of a Modular Monolith architecture. Complete design of Wallet and Gamification modules, and progressive implementation of the Strangler Pattern to migrate legacy features.",
        "exp-job3-date": "2024",
        "exp-job3-title": "Full Stack Developer (Internship)",
        "exp-job3-desc": "Design and development of the E-Biblio e-commerce platform. Complete REST API modeling and development of the management back-office.",

        "proj-title": "My Recent Projects",
        "proj-view": "View project",
        "proj-visit": "Visit site",
        "proj-github": "View GitHub repository",
        "proj-more": "Learn more on GitHub",
        "proj-card1-title": "E-Biblio (Fourniscolaire)",
        "proj-card1-desc": "E-commerce website designed for a bookstore franchise for the online sale of school supplies. Includes full catalog and back-office management.",
        "proj-card2-title": "Recruitment Module",
        "proj-card2-desc": "Complete technical recruitment offer publication and automated application processing platform developed for OFPPT.",
        "proj-card3-title": "Solution Energy Consulting",
        "proj-card3-desc": "Showcase and service platform for your trusted partner in energy audits and solar solutions.",

        "gal-title": "Code & Architecture Demos",
        "gal-subtitle": "Explore interactive real-time simulations showcasing my testing workflow, database models, and Git practices.",
        "gal-filter-all": "All",
        "gal-filter-arch": "Architecture & Data",
        "gal-filter-code": "Environment & Code",
        "gal-filter-agile": "Project Management (Scrum)",
        "gal-card1-badge": "Software Architecture",
        "gal-card1-title": "Modular Monolith",
        "gal-card1-desc": "Interactive visualization of the modular structure implemented at ERAH. Modules interact in a decoupled manner with a unified MySQL database.",
        "gal-card2-badge": "Code Video",
        "gal-card2-title": "Programming & Tests",
        "gal-card2-desc": "Real-time demonstration of executing PHPUnit unit tests and backend optimization queries.",
        "gal-card3-badge": "Workspace",
        "gal-card3-title": "Linux / Git Environment",
        "gal-card3-desc": "Daily development under Linux with Git CLI for precise branch tracking and deployment versions.",
        "gal-card4-badge": "Interactive Kanban",
        "gal-kanban-todo": "To Do",
        "gal-kanban-doing": "In Progress",
        "gal-kanban-done": "Done",
        "gal-card4-title": "Scrum Methodology",
        "gal-card4-desc": "Agile project management with Jira/Trello to plan sprints, assign tasks, and track progress.",
        "gal-card5-badge": "Database Modeling",
        "gal-card5-title": "SQL / MySQL Design",
        "gal-card5-desc": "Rigorous indexing and foreign key relationships to guarantee transactional data consistency.",
        "gal-card6-badge": "Git Workflow",
        "gal-card6-title": "Branches & Git Flow",
        "gal-card6-desc": "Advanced use of Git (rebases, interactive staging, and atomic commits) for smooth code reviews.",

        "modal-visit": "Visit / Learn More",

        "contact-title": "Contact Me",
        "contact-name": "Your name",
        "contact-email": "Your email address",
        "contact-message": "Your message",
        "contact-btn": "Send Message",
        "contact-info-title": "Contact Info",
        "contact-info-desc": "Feel free to contact me for any collaboration opportunities, freelance missions, or technical exchanges.",
        "contact-label-email": "Email",
        "contact-label-phone": "Phone",
        "contact-label-loc": "Location",
        "footer-text": "© 2026 Mustapha NIAMANE. Designed with passion, optimized for performance.",
        
        "contact-submitting": "Transmission in progress...",
        "contact-success": "Message Sent !",
        "contact-alert": "Thank you for your message, Mustapha NIAMANE will get back to you as soon as possible!"
    }
};

// Words for typewriter hero animation
const occupations = {
    fr: [
        'Développeur Full Stack Laravel & React',
        'Architecte Backend de Systèmes Scalables',
        'Spécialiste Monolithes Modulaires & APIs',
        'Passionné de Performances & DevOps'
    ],
    en: [
        'Full Stack Laravel & React Developer',
        'Backend Architect for Scalable Systems',
        'Modular Monoliths & API Specialist',
        'Performance & DevOps Enthusiast'
    ]
};

// Typewriter Sub-Component
const Typewriter = ({ words, delay = 100, deleteDelay = 50, pause = 2000 }) => {
    const [wordIndex, setWordIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');

    useEffect(() => {
        let timer;
        const currentWord = words[wordIndex];

        if (isDeleting) {
            timer = setTimeout(() => {
                setText(currentWord.substring(0, charIndex - 1));
                setCharIndex(prev => prev - 1);
            }, deleteDelay);
        } else {
            timer = setTimeout(() => {
                setText(currentWord.substring(0, charIndex + 1));
                setCharIndex(prev => prev + 1);
            }, delay);
        }

        if (!isDeleting && charIndex === currentWord.length) {
            timer = setTimeout(() => setIsDeleting(true), pause);
        } else if (isDeleting && charIndex === 0) {
            setIsDeleting(false);
            setWordIndex(prev => (prev + 1) % words.length);
        }

        return () => clearTimeout(timer);
    }, [charIndex, isDeleting, wordIndex, words]);

    return <span>{text}</span>;
};

// StatCounter Sub-Component (performs better than full window scroll listener)
const StatCounter = ({ targetValue, label, duration = 1500 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        let observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let start = 0;
                    const end = targetValue;
                    const stepTime = Math.max(Math.floor(duration / end), 10);
                    const timer = setInterval(() => {
                        start += Math.ceil(end / (duration / stepTime));
                        if (start >= end) {
                            setCount(end);
                            clearInterval(timer);
                        } else {
                            setCount(start);
                        }
                    }, stepTime);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (observer) observer.disconnect();
        };
    }, [targetValue, duration]);

    return (
        <div ref={ref} className="stat-card">
            <div className="stat-number">
                {count}{targetValue === 100 || targetValue === 80 ? '%' : '+'}
            </div>
            <p>{label}</p>
        </div>
    );
};

// Live Terminal typing loop subcomponent
const SimulatedTerminal = () => {
    const [linesVisible, setLinesVisible] = useState(1);
    
    useEffect(() => {
        const timer = setInterval(() => {
            setLinesVisible(prev => {
                if (prev >= 6) {
                    // Reset after some time
                    setTimeout(() => setLinesVisible(1), 5000);
                    return prev;
                }
                return prev + 1;
            });
        }, 1200);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="terminal-sim">
            <div className="terminal-header">
                <span className="term-dot close"></span>
                <span className="term-dot minimize"></span>
                <span className="term-dot maximize"></span>
                <span className="terminal-title">phpunit --testdox</span>
            </div>
            <div className="terminal-body">
                <div className="term-line"><span className="term-prompt">$</span> phpunit tests/Feature/WalletTest</div>
                {linesVisible >= 2 && <div className="term-line success">✓ wallet balance initializes at zero</div>}
                {linesVisible >= 3 && <div className="term-line success">✓ wallet deposit adds balance</div>}
                {linesVisible >= 4 && <div className="term-line success">✓ wallet withdraw deducts balance</div>}
                {linesVisible >= 5 && <div className="term-line success">✓ wallet transfer handles concurrency</div>}
                {linesVisible >= 6 && <div className="term-line info">Tests: 4 passed, 4 assertions (0.24s)</div>}
                <div className="term-line cursor-line"><span className="term-prompt">$</span> <span className="term-cursor">_</span></div>
            </div>
        </div>
    );
};

// Scroll Reveal Component
const ScrollReveal = ({ children, anim = "fade-up", delay = 0 }) => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        el.classList.add('active');
                    }, delay);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(el);
        return () => observer.disconnect();
    }, [delay]);

    return (
        <div ref={ref} className="scroll-reveal" data-anim={anim}>
            {children}
        </div>
    );
};

const App = () => {
    const [lang, setLang] = useState(localStorage.getItem('portfolio-lang') || 'fr');
    const [theme, setTheme] = useState(localStorage.getItem('portfolio-theme') || 'dark');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const [selectedProject, setSelectedProject] = useState(null);
    const [galleryFilter, setGalleryFilter] = useState('all');
    const [toasts, setToasts] = useState([]);
    
    // Form submission states
    const [formName, setFormName] = useState('');
    const [formEmail, setFormEmail] = useState('');
    const [formMessage, setFormMessage] = useState('');
    const [formSubmitting, setFormSubmitting] = useState(false);
    const [formSuccess, setFormSuccess] = useState(false);

    // Toast triggers
    const triggerToast = (message, type = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    // Scroll listeners
    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (totalHeight > 0) {
                setScrollProgress((window.pageYOffset / totalHeight) * 100);
            }
            
            setScrolled(window.scrollY > 50);

            // Active section detection
            const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'gallery', 'contact'];
            let current = 'hero';
            for (const section of sections) {
                const el = document.getElementById(section);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 120 && rect.bottom >= 120) {
                        current = section;
                        break;
                    }
                }
            }
            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Sync theme class
    useEffect(() => {
        if (theme === 'light') {
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
        }
        localStorage.setItem('portfolio-theme', theme);
    }, [theme]);

    // Handle language change
    const toggleLanguage = () => {
        const nextLang = lang === 'fr' ? 'en' : 'fr';
        setLang(nextLang);
        localStorage.setItem('portfolio-lang', nextLang);
        document.documentElement.lang = nextLang;
    };

    // Form Submission
    const handleFormSubmit = (e) => {
        e.preventDefault();
        setFormSubmitting(true);

        setTimeout(() => {
            setFormSubmitting(false);
            setFormSuccess(true);
            triggerToast(translations[lang]["contact-alert"], 'success');

            setTimeout(() => {
                setFormSuccess(false);
                setFormName('');
                setFormEmail('');
                setFormMessage('');
            }, 3000);
        }, 1800);
    };

    const projectsData = {
        'ebiblio': {
            img: ebiblioImg,
            title: {
                fr: 'E-Biblio (Fourniscolaire)',
                en: 'E-Biblio (Fourniscolaire)'
            },
            desc: {
                fr: "Ce projet e-commerce a été conçu pour structurer et moderniser les ventes d'une grande franchise de bibliothèques scolaires au Maroc. Le système intègre la gestion dynamique des stocks multi-magasins, des paniers complexes, un système de paiement sécurisé et un back-office d'administration complet développé sous Laravel. L'interface frontend en React garantit des temps de transition fluides.",
                en: "This e-commerce project was designed to structure and modernize sales for a large school bookstore franchise in Morocco. The system integrates dynamic multi-store stock management, complex shopping carts, a secure payment system, and a comprehensive administration back-office built with Laravel. The React frontend interface guarantees smooth transition times."
            },
            tags: ['React', 'Laravel', 'MySQL', 'REST API', 'Tailwind CSS'],
            link: 'https://fourniscolaire.ma/en/',
            github: 'https://github.com/NIAMANE-Mustapha'
        },
        'recruitment': {
            img: recruitmentImg,
            title: {
                fr: 'Module de Recrutement',
                en: 'Recruitment Module'
            },
            desc: {
                fr: "Développée spécifiquement pour l'OFPPT, cette plateforme permet la publication d'offres de recrutement technique, le dépôt de dossiers sécurisés en ligne et le traitement automatisé des CV selon des critères de pondération configurables. Le backend en Laravel gère d'importantes charges lors de l'ouverture des concours, et l'interface d'administration offre des graphiques d'analyse statistique complets.",
                en: "Developed specifically for OFPPT, this platform enables the publication of technical recruitment offers, secure online application uploads, and automated resume processing based on configurable weight criteria. The Laravel backend handles heavy loads during application phases, and the admin dashboard offers comprehensive statistical analysis charts."
            },
            tags: ['Laravel', 'React', 'API REST', 'Bootstrap', 'MySQL'],
            link: 'https://github.com/NIAMANE-Mustapha/OFPPT_RECRUTE-.git',
            github: 'https://github.com/NIAMANE-Mustapha/OFPPT_RECRUTE-.git'
        },
        'energy': {
            img: energyImg,
            title: {
                fr: 'Solution Energy Consulting',
                en: 'Solution Energy Consulting'
            },
            desc: {
                fr: "Solution Energy Consulting est une plateforme vitrine optimisée SEO et conçue pour un cabinet de conseil en énergie solaire et audits d'économie de coûts. Elle intègre un formulaire intelligent d'estimation de rentabilité solaire, un portfolio de réalisations réactives et un design responsive haut de gamme basé sur CSS Grid et Vanilla JavaScript.",
                en: "Solution Energy Consulting is a showcase platform optimized for SEO and designed for a solar energy and cost-saving audits consulting firm. It integrates a smart solar profitability estimation form, a portfolio of responsive achievements, and a high-end responsive design based on CSS Grid and Vanilla JavaScript."
            },
            tags: ['HTML5 / CSS3', 'JavaScript', 'SEO Opti', 'Flexbox'],
            link: 'https://solutionenergyconsulting.ma/',
            github: 'https://github.com/NIAMANE-Mustapha'
        }
    };

    const galleryItems = [
        { id: 1, category: 'architecture', type: 'diagram', title: 'Modular Monolith', desc: 'Visualisation de l\'architecture ERAH.', isSvg: true },
        { id: 2, category: 'workspace', type: 'video', title: 'Programmation & Tests', desc: 'Démonstration de tests unitaires avec phpunit.', isTerminal: true },
        { id: 3, category: 'workspace', type: 'image', img: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=600&q=80', title: 'Environnement Linux / Git', desc: 'Développement quotidien sous Linux avec CLI Git.' },
        { id: 4, category: 'agile', type: 'kanban', title: 'Méthodologie Scrum', desc: 'Gestion de sprints et de stories sous Jira/Trello.', isKanban: true },
        { id: 5, category: 'architecture', type: 'db', title: 'Modélisation SQL / MySQL', desc: 'Gestion transactionnelle et indexation optimisée.', isDb: true },
        { id: 6, category: 'workspace', type: 'git', title: 'Branches & Git Flow', desc: 'Rebasing, atomic commits, et pull requests structurées.', isGit: true }
    ];

    const filteredGallery = galleryFilter === 'all' 
        ? galleryItems 
        : galleryItems.filter(item => item.category === galleryFilter);

    return (
        <>
            <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>
            <ParticleBackground theme={theme} />

            {/* Navbar */}
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
                <div className="nav-container">
                    <a href="#" className="logo">MN<span>.</span></a>
                    <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`} id="navLinks">
                        {['about', 'skills', 'experience', 'projects', 'gallery', 'contact'].map(sec => (
                            <li key={sec}>
                                <a 
                                    href={`#${sec}`} 
                                    className={activeSection === sec ? 'active' : ''}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {translations[lang][`nav-${sec}`]}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="nav-actions">
                        <button 
                            id="langToggle" 
                            className="lang-toggle-btn" 
                            onClick={toggleLanguage}
                            title={lang === 'fr' ? 'Switch to English' : 'Passer en Français'}
                            aria-label="Changer de langue"
                        >
                            <span className="flag-icon">
                                <Globe size={18} />
                            </span>
                        </button>
                        <button 
                            id="themeToggle" 
                            className="theme-toggle-btn" 
                            onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
                            title="Changer de thème"
                            aria-label="Changer de thème"
                        >
                            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                        <div 
                            className="menu-toggle" 
                            id="mobile-menu" 
                            onClick={() => setMobileMenuOpen(prev => !prev)}
                            aria-label="Ouvrir le menu de navigation"
                            aria-expanded={mobileMenuOpen}
                        >
                            <span className={`bar ${mobileMenuOpen ? 'rotate-down' : ''}`}></span>
                            <span className={`bar ${mobileMenuOpen ? 'fade-out' : ''}`}></span>
                            <span className={`bar ${mobileMenuOpen ? 'rotate-up' : ''}`}></span>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="hero" id="hero">
                <div className="hero-mesh-background"></div>
                <div className="hero-container">
                    <ScrollReveal anim="fade-right">
                        <div className="badge">{translations[lang]["hero-badge"]}</div>
                        <h1>{translations[lang]["hero-greeting"]} <br /><span className="highlight">Mustapha NIAMANE</span></h1>
                        <h2 className="typing-text-container">
                            <Typewriter words={occupations[lang]} />
                            <span className="cursor">|</span>
                        </h2>
                        <p>{translations[lang]["hero-subtitle"]}</p>
                        <div className="hero-buttons">
                            <a href="#projects" className="btn btn-primary">
                                <Briefcase size={18} /> {translations[lang]["hero-btn-projects"]}
                            </a>
                            <a href="#contact" className="btn btn-outline">
                                <Mail size={18} /> {translations[lang]["hero-btn-contact"]}
                            </a>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal anim="fade-left">
                        <div className="hero-profile">
                            <div className="profile-frame">
                                <img src={profileImg} alt="Mustapha NIAMANE" className="profile-img" />
                                <div className="glowing-border"></div>
                                <div className="tech-dots">
                                    <span className="dot-item php" title="PHP"><Code size={18} /></span>
                                    <span className="dot-item laravel" title="Laravel"><Layers size={18} /></span>
                                    <span className="dot-item js" title="JavaScript"><Cpu size={18} /></span>
                                    <span className="dot-item react" title="React"><Database size={18} /></span>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
                <a href="#about" className="scroll-down" aria-label="Défiler vers le bas">
                    <div className="mouse"><div className="wheel"></div></div>
                </a>
            </header>

            {/* Interactive Terminal Console */}
            <section className="bg-light">
                <ScrollReveal anim="fade-up">
                    <h2 className="section-title">{lang === 'fr' ? 'Console Interactive' : 'Interactive Console'}</h2>
                    <InteractiveTerminal translations={translations} lang={lang} />
                </ScrollReveal>
            </section>

            {/* About Section */}
            <section id="about" className="section">
                <h2 className="section-title">{translations[lang]["about-title"]}</h2>
                <div className="about-container">
                    <ScrollReveal anim="fade-right">
                        <h3>{translations[lang]["about-subtitle"]}</h3>
                        <p dangerouslySetInnerHTML={{ __html: translations[lang]["about-p1"] }}></p>
                        <p>{translations[lang]["about-p2"]}</p>
                        <div className="personal-info-grid">
                            <div className="info-item"><strong>{translations[lang]["about-info-loc"]}:</strong> Paris, France</div>
                            <div className="info-item"><strong>{translations[lang]["about-info-email"]}:</strong> mustaphaniamane@gmail.com</div>
                            <div className="info-item"><strong>{translations[lang]["about-info-phone"]}:</strong> +33 7 45 14 95 04</div>
                            <div className="info-item"><strong>{translations[lang]["about-info-spec"]}:</strong> Laravel, PHP, Backend</div>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal anim="fade-left">
                        <div className="about-stats">
                            <StatCounter targetValue={3} label={translations[lang]["about-stat-exp"]} />
                            <StatCounter targetValue={15} label={translations[lang]["about-stat-projects"]} />
                            <StatCounter targetValue={100} label={translations[lang]["about-stat-passion"]} />
                            <StatCounter targetValue={80} label={translations[lang]["about-stat-speed"]} />
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="section bg-light">
                <h2 className="section-title">{translations[lang]["skills-title"]}</h2>
                <div className="skills-grid">
                    {[
                        { title: translations[lang]["skills-card1-title"], desc: translations[lang]["skills-card1-desc"], icon: Cpu, progress: 90 },
                        { title: translations[lang]["skills-card2-title"], desc: translations[lang]["skills-card2-desc"], icon: Code, progress: 80 },
                        { title: translations[lang]["skills-card3-title"], desc: translations[lang]["skills-card3-desc"], icon: Database, progress: 85 },
                        { title: translations[lang]["skills-card4-title"], desc: translations[lang]["skills-card4-desc"], icon: Layers, progress: 85 }
                    ].map((skill, index) => (
                        <ScrollReveal key={index} anim="fade-up" delay={index * 100}>
                            <div className="skill-card">
                                <div className="skill-icon-wrapper"><skill.icon size={30} /></div>
                                <h3>{skill.title}</h3>
                                <p>{skill.desc}</p>
                                <div className="skill-progress">
                                    <div className="progress-bar" style={{ width: `${skill.progress}%` }}></div>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="section">
                <h2 className="section-title">{translations[lang]["exp-title"]}</h2>
                <div className="timeline">
                    {[
                        { date: translations[lang]["exp-job1-date"], title: translations[lang]["exp-job1-title"], comp: "InnovQube (Paris)", desc: translations[lang]["exp-job1-desc"], anim: "fade-left", side: "right" },
                        { date: translations[lang]["exp-job2-date"], title: translations[lang]["exp-job2-title"], comp: "ERAH", desc: translations[lang]["exp-job2-desc"], anim: "fade-right", side: "left" },
                        { date: translations[lang]["exp-job3-date"], title: translations[lang]["exp-job3-title"], comp: "Taousse Business Consulting", desc: translations[lang]["exp-job3-desc"], anim: "fade-left", side: "right" }
                    ].map((exp, index) => (
                        <ScrollReveal key={index} anim={exp.anim}>
                            <div className={`timeline-item timeline-${exp.side || "right"}`}>
                                <div className="timeline-dot"></div>
                                <div className="timeline-date">{exp.date}</div>
                                <div className="timeline-content">
                                    <h3>{exp.title}</h3>
                                    <h4>{exp.comp}</h4>
                                    <p dangerouslySetInnerHTML={{ __html: exp.desc }}></p>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="section bg-light">
                <h2 className="section-title">{translations[lang]["proj-title"]}</h2>
                <div className="projects-grid">
                    {Object.keys(projectsData).map((key, index) => {
                        const project = projectsData[key];
                        return (
                            <ScrollReveal key={key} anim="fade-up" delay={index * 100}>
                                <div className="project-card">
                                    <div className="project-image-wrapper">
                                        <img src={project.img} alt={project.title[lang]} className="project-card-image" />
                                        <div className="project-hover-overlay" onClick={() => setSelectedProject(key)}>
                                            <span className="view-details-btn">
                                                <TermIcon size={16} /> {translations[lang]["proj-view"]}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="project-info">
                                        <h3>{project.title[lang]}</h3>
                                        <p>{project.desc[lang].substring(0, 130)}...</p>
                                        <div className="project-tags">
                                            {project.tags.slice(0, 3).map(tag => (
                                                <span key={tag} className="tech-tag">{tag}</span>
                                            ))}
                                        </div>
                                        <div className="project-links-group">
                                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                                                <ExternalLink size={16} /> {translations[lang]["proj-visit"]}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        );
                    })}
                </div>
            </section>

            {/* Interactive Architecture & Showcase */}
            <section id="gallery" className="section">
                <ScrollReveal anim="fade-up">
                    <h2 className="section-title">{translations[lang]["gal-title"]}</h2>
                    <p style={{ textAlign: 'center', marginTop: '-30px', marginBottom: '40px', color: 'var(--text-muted)' }}>
                        {translations[lang]["gal-subtitle"]}
                    </p>
                </ScrollReveal>
                
                <div className="gallery-filters">
                    {['all', 'architecture', 'workspace', 'agile'].map(filter => (
                        <button 
                            key={filter} 
                            className={`filter-btn ${galleryFilter === filter ? 'active' : ''}`}
                            onClick={() => setGalleryFilter(filter)}
                        >
                            {translations[lang][`gal-filter-${filter === 'all' ? 'all' : filter === 'architecture' ? 'arch' : filter === 'workspace' ? 'code' : 'agile'}`]}
                        </button>
                    ))}
                </div>

                <div className="gallery-grid">
                    {filteredGallery.map(item => (
                        <div key={item.id} className="gallery-item-card" data-category={item.category}>
                            <div className="card-media-header">
                                <span className="media-badge">
                                    {item.type === 'diagram' && <Layers size={14} />}
                                    {item.type === 'video' && <TermIcon size={14} />}
                                    {item.type === 'image' && <Layers size={14} />}
                                    {item.type === 'kanban' && <Cpu size={14} />}
                                    {item.type === 'db' && <Database size={14} />}
                                    {item.type === 'git' && <GitBranch size={14} />}
                                    {translations[lang][`gal-card${item.id}-badge`]}
                                </span>
                                
                                {item.isSvg && <SystemArchitecture lang={lang} />}
                                {item.isTerminal && <SimulatedTerminal />}
                                {item.img && <img src={item.img} alt={item.title} className="gallery-image" />}
                                {item.isKanban && (
                                    <div className="kanban-miniature">
                                        <div className="kanban-column">
                                            <h5>{translations[lang]["gal-kanban-todo"]}</h5>
                                            <div className="kanban-card">Design API</div>
                                        </div>
                                        <div className="kanban-column">
                                            <h5>{translations[lang]["gal-kanban-doing"]}</h5>
                                            <div className="kanban-card coding">Optimisation DB</div>
                                        </div>
                                        <div className="kanban-column">
                                            <h5>{translations[lang]["gal-kanban-done"]}</h5>
                                            <div className="kanban-card done">Wallet Mod.</div>
                                        </div>
                                    </div>
                                )}
                                {item.isDb && (
                                    <div className="db-schema-visual">
                                        <div className="db-table">
                                            <div className="db-table-header"><Database size={12} /> users</div>
                                            <div className="db-table-row"><span>id</span> <span className="db-type">BIGINT [PK]</span></div>
                                            <div className="db-table-row"><span>email</span> <span className="db-type">VARCHAR</span></div>
                                        </div>
                                        <div className="db-relation-arrow">→</div>
                                        <div className="db-table">
                                            <div className="db-table-header"><Database size={12} /> wallets</div>
                                            <div className="db-table-row"><span>id</span> <span className="db-type">BIGINT [PK]</span></div>
                                            <div className="db-table-row"><span>balance</span> <span className="db-type">DECIMAL</span></div>
                                        </div>
                                    </div>
                                )}
                                {item.isGit && (
                                    <div className="git-sim">
                                        <svg viewBox="0 0 400 160" className="git-flow-svg">
                                            <line x1="40" y1="35" x2="360" y2="35" className="git-branch main-branch" />
                                            <line x1="40" y1="80" x2="320" y2="80" className="git-branch dev-branch" />
                                            <line x1="120" y1="125" x2="260" y2="125" className="git-branch feature-branch" />
                                            <path d="M 40 35 Q 80 80 120 80" className="git-connector" />
                                            <path d="M 120 80 Q 160 125 200 125" className="git-connector" />
                                            <path d="M 260 125 Q 290 80 320 80" className="git-connector" />
                                            <path d="M 320 80 Q 340 35 360 35" className="git-connector" />
                                            <circle cx="50" cy="35" r="6" className="git-commit main-commit" />
                                            <circle cx="120" cy="80" r="5" className="git-commit dev-commit" />
                                            <circle cx="190" cy="125" r="5" className="git-commit feature-commit pulse-node" />
                                            <circle cx="310" cy="80" r="5" className="git-commit dev-commit" />
                                            <circle cx="350" cy="35" r="6" className="git-commit main-commit" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <div className="gallery-item-info">
                                <h4>{translations[lang][`gal-card${item.id}-title`]}</h4>
                                <p>{translations[lang][`gal-card${item.id}-desc`]}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Modal Lightbox for project details */}
            <div className={`modal ${selectedProject ? 'show' : ''}`} role="dialog" aria-modal="true" aria-hidden={!selectedProject}>
                <button className="close-modal" onClick={() => setSelectedProject(null)}>&times;</button>
                {selectedProject && (
                    <div className="modal-content">
                        <div className="modal-body-container">
                            <div className="modal-left">
                                <img src={projectsData[selectedProject].img} alt={projectsData[selectedProject].title[lang]} />
                            </div>
                            <div className="modal-right">
                                <h3>{projectsData[selectedProject].title[lang]}</h3>
                                <p>{projectsData[selectedProject].desc[lang]}</p>
                                <div className="project-tags">
                                    {projectsData[selectedProject].tags.map(tag => (
                                        <span key={tag} className="tech-tag">{tag}</span>
                                    ))}
                                </div>
                                <div style={{ display: 'flex', gap: '15px' }}>
                                    <a href={projectsData[selectedProject].link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                        <ExternalLink size={16} /> {translations[lang]["modal-visit"]}
                                    </a>
                                    <a href={projectsData[selectedProject].github} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                                        <Github size={16} /> GitHub
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Contact Section */}
            <section id="contact" className="section">
                <h2 className="section-title">{translations[lang]["contact-title"]}</h2>
                <div className="contact-container">
                    <form className="contact-form" id="contactForm" onSubmit={handleFormSubmit}>
                        <div className="form-group">
                            <input 
                                type="text" 
                                id="name" 
                                required 
                                value={formName} 
                                onChange={e => setFormName(e.target.value)}
                                placeholder=" " 
                            />
                            <label htmlFor="name">{translations[lang]["contact-name"]}</label>
                        </div>
                        <div className="form-group">
                            <input 
                                type="email" 
                                id="email" 
                                required 
                                value={formEmail}
                                onChange={e => setFormEmail(e.target.value)}
                                placeholder=" " 
                            />
                            <label htmlFor="email">{translations[lang]["contact-email"]}</label>
                        </div>
                        <div className="form-group">
                            <textarea 
                                id="message" 
                                rows="5" 
                                required 
                                value={formMessage}
                                onChange={e => setFormMessage(e.target.value)}
                                placeholder=" "
                            ></textarea>
                            <label htmlFor="message">{translations[lang]["contact-message"]}</label>
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={formSubmitting || formSuccess}>
                            <span className="btn-text">
                                {formSubmitting 
                                    ? translations[lang]["contact-submitting"] 
                                    : formSuccess 
                                        ? translations[lang]["contact-success"] 
                                        : translations[lang]["contact-btn"]}
                            </span>
                            <span className="btn-icon">
                                {formSubmitting ? <i className="fas fa-spinner fa-spin"></i> : <Send size={16} />}
                            </span>
                        </button>
                    </form>

                    <div className="contact-info">
                        <h3>{translations[lang]["contact-info-title"]}</h3>
                        <p>{translations[lang]["contact-info-desc"]}</p>

                        <div className="contact-details">
                            <div className="contact-detail-item">
                                <div className="contact-icon-wrapper"><Mail size={18} /></div>
                                <div>
                                    <h4>{translations[lang]["contact-label-email"]}</h4>
                                    <p><a href="mailto:mustaphaniamane@gmail.com">mustaphaniamane@gmail.com</a></p>
                                </div>
                            </div>
                            <div className="contact-detail-item">
                                <div className="contact-icon-wrapper"><Phone size={18} /></div>
                                <div>
                                    <h4>{translations[lang]["contact-label-phone"]}</h4>
                                    <p><a href="tel:+33745149504">+33 7 45 14 95 04</a></p>
                                </div>
                            </div>
                            <div className="contact-detail-item">
                                <div className="contact-icon-wrapper"><MapPin size={18} /></div>
                                <div>
                                    <h4>{translations[lang]["contact-label-loc"]}</h4>
                                    <p>Paris, France</p>
                                </div>
                            </div>
                        </div>

                        <div className="social-icons">
                            <a href="https://www.linkedin.com/in/mustapha-niamane" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <Linkedin size={20} />
                            </a>
                            <a href="https://github.com/NIAMANE-Mustapha" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                <Github size={20} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer>
                <div className="footer-content">
                    <p dangerouslySetInnerHTML={{ __html: translations[lang]["footer-text"] }}></p>
                    <a href="#hero" className="back-to-top" aria-label="Retour en haut de page">
                        <ArrowUp size={18} />
                    </a>
                </div>
            </footer>

            <Toast toasts={toasts} removeToast={removeToast} />
        </>
    );
};

export default App;
