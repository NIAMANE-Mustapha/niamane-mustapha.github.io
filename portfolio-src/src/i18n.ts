import ebiblioMockup from './assets/ebiblio_mockup.png';
import recruitmentMockup from './assets/recruitment_mockup.png';
import energyMockup from './assets/energy_mockup.png';

export const translations = {
  fr: {
    "nav-about": "À propos",
    "nav-skills": "Compétences",
    "nav-experience": "Parcours",
    "nav-projects": "Projets",
    "nav-gallery": "Média Gallery",
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
    "about-info-loc": "<strong>Localisation:</strong> Paris, France",
    "about-info-email": "<strong>Email:</strong> mustaphaniamane@gmail.com",
    "about-info-phone": "<strong>Téléphone:</strong> +33 7 45 14 95 04",
    "about-info-spec": "<strong>Spécialité:</strong> Laravel, PHP, Backend",
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
    "exp-job1-date": "2026",
    "exp-job1-title": "Développeur Backend",
    "exp-job1-desc": "Contribution active aux plateformes SaaS <strong>InnovGuide</strong> et <strong>InnovRental</strong>. Diagnostic, troubleshooting approfondi et résolution de bugs complexes sur l'environnement de staging.",
    "exp-job2-date": "2025",
    "exp-job2-title": "Développeur Full Stack",
    "exp-job2-desc": "Planification et développement d'une architecture <strong>Monolithe Modulaire</strong>. Conception complète des modules <strong>Wallet</strong> et <strong>Gamification</strong>, et implémentation progressive du <strong>Strangler Pattern</strong> pour migrer les fonctionnalités legacy.",
    "exp-job3-date": "2024",
    "exp-job3-title": "Développeur Full Stack (Stage)",
    "exp-job3-desc": "Conception et développement de la plateforme e-commerce <strong>E-Biblio</strong>. Modélisation complète d'API REST et développement du back-office de gestion.",

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

    "gal-title": "Galerie Média & Architecture",
    "gal-subtitle": "Aperçu de mes environnements de travail, architectures de bases de données et démonstrations interactives.",
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
    "footer-text": "&copy; 2026 Mustapha NIAMANE. Conçu avec passion, optimisé pour la performance.",
    
    "contact-submitting": "Transmission en cours...",
    "contact-success": "Message Envoyé !",
    "contact-alert": "Merci pour votre message, Mustapha NIAMANE vous répondra dans les plus brefs délais !"
  },
  en: {
    "nav-about": "About",
    "nav-skills": "Skills",
    "nav-experience": "Journey",
    "nav-projects": "Projects",
    "nav-gallery": "Gallery",
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
    "about-info-loc": "<strong>Location:</strong> Paris, France",
    "about-info-email": "<strong>Email:</strong> mustaphaniamane@gmail.com",
    "about-info-phone": "<strong>Phone:</strong> +33 7 45 14 95 04",
    "about-info-spec": "<strong>Specialty:</strong> Laravel, PHP, Backend",
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
    "exp-job1-date": "2026",
    "exp-job1-title": "Backend Developer",
    "exp-job1-desc": "Active contribution to SaaS platforms <strong>InnovGuide</strong> and <strong>InnovRental</strong>. Diagnostics, deep troubleshooting, and resolving complex bugs in staging environments.",
    "exp-job2-date": "2025",
    "exp-job2-title": "Full Stack Developer",
    "exp-job2-desc": "Planning and development of a <strong>Modular Monolith</strong> architecture. Complete design of <strong>Wallet</strong> and <strong>Gamification</strong> modules, and progressive implementation of the <strong>Strangler Pattern</strong> to migrate legacy features.",
    "exp-job3-date": "2024",
    "exp-job3-title": "Full Stack Developer (Internship)",
    "exp-job3-desc": "Design and development of the <strong>E-Biblio</strong> e-commerce platform. Complete REST API modeling and development of the management back-office.",

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

    "gal-title": "Media & Architecture Gallery",
    "gal-subtitle": "Overview of my work environments, database architectures, and interactive demonstrations.",
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
    "footer-text": "&copy; 2026 Mustapha NIAMANE. Designed with passion, optimized for performance.",
    
    "contact-submitting": "Transmission in progress...",
    "contact-success": "Message Sent !",
    "contact-alert": "Thank you for your message, Mustapha NIAMANE will get back to you as soon as possible!"
  }
};

export const occupations = {
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

export interface ProjectItem {
  id: string;
  img: string;
  title: { fr: string; en: string };
  desc: { fr: string; en: string };
  tags: string[];
  link: string;
}

export const projectsData: Record<string, ProjectItem> = {
  'ebiblio': {
    id: 'ebiblio',
    img: ebiblioMockup,
    title: {
      fr: 'E-Biblio (Fourniscolaire)',
      en: 'E-Biblio (Fourniscolaire)'
    },
    desc: {
      fr: "Ce projet e-commerce a été conçu pour structurer et moderniser les ventes d'une grande franchise de bibliothèques scolaires au Maroc. Le système intègre la gestion dynamique des stocks multi-magasins, des paniers complexes, un système de paiement sécurisé et un back-office d'administration complet développé sous Laravel. L'interface frontend en React garantit des temps de transition fluides.",
      en: "This e-commerce project was designed to structure and modernize sales for a large school bookstore franchise in Morocco. The system integrates dynamic multi-store stock management, complex shopping carts, a secure payment system, and a comprehensive administration back-office built with Laravel. The React frontend interface guarantees smooth transition times."
    },
    tags: ['React', 'Laravel', 'MySQL', 'REST API', 'Tailwind CSS'],
    link: 'https://fourniscolaire.ma/en/'
  },
  'recruitment': {
    id: 'recruitment',
    img: recruitmentMockup,
    title: {
      fr: 'Module de Recrutement',
      en: 'Recruitment Module'
    },
    desc: {
      fr: "Développée spécifiquement pour l'OFPPT, cette plateforme permet la publication d'offres de recrutement technique, le dépôt de dossiers sécurisés en ligne et le traitement automatisé des CV selon des critères de pondération configurables. Le backend en Laravel gère d'importantes charges lors de l'ouverture des concours, et l'interface d'administration offre des graphiques d'analyse statistique complets.",
      en: "Developed specifically for OFPPT, this platform enables the publication of technical recruitment offers, secure online application uploads, and automated resume processing based on configurable weight criteria. The Laravel backend handles heavy loads during application phases, and the admin dashboard offers comprehensive statistical analysis charts."
    },
    tags: ['Laravel', 'React', 'API REST', 'Bootstrap', 'MySQL'],
    link: 'https://github.com/NIAMANE-Mustapha/OFPPT_RECRUTE-.git'
  },
  'energy': {
    id: 'energy',
    img: energyMockup,
    title: {
      fr: 'Solution Energy Consulting',
      en: 'Solution Energy Consulting'
    },
    desc: {
      fr: "Solution Energy Consulting est une plateforme vitrine optimisée SEO et conçue pour un cabinet de conseil en énergie solaire et audits d'économie de coûts. Elle intègre un formulaire intelligent d'estimation de rentabilité solaire, un portfolio de réalisations réactives et un design responsive haut de gamme basé sur CSS Grid et Vanilla JavaScript.",
      en: "Solution Energy Consulting is a showcase platform optimized for SEO and designed for a solar energy and cost-saving audits consulting firm. It integrates a smart solar profitability estimation form, a portfolio of responsive achievements, and a high-end responsive design based on CSS Grid and Vanilla JavaScript."
    },
    tags: ['HTML5 / CSS3', 'JavaScript', 'SEO Opti', 'Flexbox'],
    link: 'https://solutionenergyconsulting.ma/'
  }
};
