document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // MULTILINGUAL I18N SYSTEM (FRANÇAIS / ENGLISH)
    // ==========================================================================
    const translations = {
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
            "exp-job1-date": "Juin 2026 - Août 2026",
            "exp-job1-title": "Développeur Backend",
            "exp-job1-desc": "Contribution active aux plateformes SaaS <strong>InnovGuide</strong> et <strong>InnovRental</strong>. Diagnostic, troubleshooting approfondi et résolution de bugs complexes sur l'environnement de staging.",
            "exp-job2-date": "2026",
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
            "exp-job1-date": "June 2026 - August 2026",
            "exp-job1-title": "Backend Developer",
            "exp-job1-desc": "Active contribution to SaaS platforms <strong>InnovGuide</strong> and <strong>InnovRental</strong>. Diagnostics, deep troubleshooting, and resolving complex bugs in staging environments.",
            "exp-job2-date": "2026",
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

    const flagIcons = {
        fr: `<svg class="flag-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600"><rect width="900" height="600" fill="#fff"/><rect width="300" height="600" fill="#002654"/><rect x="600" width="300" height="600" fill="#ED2939"/></svg>`,
        en: `<svg class="flag-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30"><clipPath id="flag-uk-a"><path d="M0,0 v30 h60 v-30 z"/></clipPath><clipPath id="flag-uk-b"><path d="M30,15 L0,0 L0,30 z"/></clipPath><clipPath id="flag-uk-c"><path d="M30,15 L60,0 L60,30 z"/></clipPath><g clip-path="url(#flag-uk-a)"><path d="M0,0 h60 v30 h-60 z" fill="#012169"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/><path d="M0,0 L60,30" stroke="#C8102E" stroke-width="4" clip-path="url(#flag-uk-b)"/><path d="M60,0 L0,30" stroke="#C8102E" stroke-width="4" clip-path="url(#flag-uk-c)"/><path d="M0,15 H60 M30,0 V30" stroke="#fff" stroke-width="10"/><path d="M0,15 H60 M30,0 V30" stroke="#C8102E" stroke-width="6"/></g></svg>`
    };

    let currentLang = localStorage.getItem('portfolio-lang') || 'fr';
    const langToggle = document.getElementById('langToggle');

    function updateLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('portfolio-lang', lang);
        document.documentElement.lang = lang;
        
        if (langToggle) {
            langToggle.setAttribute('data-lang', lang);
            const flagSpan = langToggle.querySelector('.flag-icon');
            if (flagSpan) {
                flagSpan.innerHTML = lang === 'fr' ? flagIcons.en : flagIcons.fr;
            }
            langToggle.title = lang === 'fr' ? 'Switch to English' : 'Passer en Français';
        }
        
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });
        
        // Reset typewriter words on language change
        if (typewriter) {
            charIndex = 0;
            isDeleting = false;
            typewriter.textContent = '';
        }
    }

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const nextLang = currentLang === 'fr' ? 'en' : 'fr';
            updateLanguage(nextLang);
        });
    }

    // Load persisted theme preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        if (themeIcon) themeIcon.className = 'fas fa-sun';
    } else {
        document.body.classList.remove('light-mode');
        if (themeIcon) themeIcon.className = 'fas fa-moon';
    }

    if (themeToggle && themeIcon) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const isLight = document.body.classList.contains('light-mode');
            
            if (isLight) {
                themeIcon.className = 'fas fa-sun';
                localStorage.setItem('portfolio-theme', 'light');
            } else {
                themeIcon.className = 'fas fa-moon';
                localStorage.setItem('portfolio-theme', 'dark');
            }
            
            // Re-initialize particles to update their color palettes instantly
            initParticles();
        });
    }

    // ==========================================================================
    // MOBILE NAVIGATION & BURGER MENU
    // ==========================================================================
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('navLinks');
    const navbar = document.getElementById('navbar');
    
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Burger menu animation toggle
            const bars = document.querySelectorAll('.menu-toggle .bar');
            if (bars.length >= 3) {
                bars[0].classList.toggle('rotate-down');
                bars[1].classList.toggle('fade-out');
                bars[2].classList.toggle('rotate-up');
            }
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks) navLinks.classList.remove('active');
            const bars = document.querySelectorAll('.menu-toggle .bar');
            if (bars.length >= 3) {
                bars[0].classList.remove('rotate-down');
                bars[1].classList.remove('fade-out');
                bars[2].classList.remove('rotate-up');
            }
        });
    });

    // Navbar style shift on scroll
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        // Update scroll progress bar
        updateScrollProgress();
    });

    function updateScrollProgress() {
        const scrollProgress = document.getElementById('scrollProgress');
        if (scrollProgress) {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (totalHeight > 0) {
                const progress = (window.pageYOffset / totalHeight) * 100;
                scrollProgress.style.width = progress + '%';
            }
        }
    }

    // ==========================================================================
    // LIGHTWEIGHT CANVAS PARTICLES SYSTEM (Theme-Aware)
    // ==========================================================================
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas ? canvas.getContext('2d') : null;
    
    let particlesArray = [];
    const numberOfParticles = 80;
    
    // Particle class
    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }
        
        // Draw particle
        draw() {
            if (!ctx) return;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = document.body.classList.contains('light-mode') 
                ? 'rgba(17, 99, 123, 0.2)' 
                : 'rgba(0, 242, 254, 0.4)';
            ctx.fill();
            ctx.shadowBlur = 0; // Reset shadow for efficiency
        }
        
        // Update position
        update() {
            if (!canvas) return;
            // Bounce off edges
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }
            
            // Move particle
            this.x += this.directionX;
            this.y += this.directionY;
            
            this.draw();
        }
    }
    
    // Initialize particles array
    function initParticles() {
        if (!canvas) return;
        particlesArray = [];
        let screenArea = canvas.width * canvas.height;
        let adjustedNumber = Math.min(numberOfParticles, Math.floor(screenArea / 18000));
        const isLight = document.body.classList.contains('light-mode');
        
        for (let i = 0; i < adjustedNumber; i++) {
            let size = (Math.random() * 2) + 1;
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            let directionX = (Math.random() * 0.4) - 0.2;
            let directionY = (Math.random() * 0.4) - 0.2;
            
            // Slate/Teal translucent glowing particles, styled differently for Light vs Dark
            let color = '';
            if (isLight) {
                color = Math.random() > 0.5 ? 'rgba(17, 99, 123, 0.35)' : 'rgba(99, 102, 241, 0.25)';
            } else {
                color = Math.random() > 0.5 ? 'rgba(0, 242, 254, 0.25)' : 'rgba(99, 102, 241, 0.2)';
            }
            
            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }
    
    // Draw lines connecting close particles
    function connectParticles() {
        if (!ctx) return;
        let opacityValue = 1;
        const isLight = document.body.classList.contains('light-mode');
        
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distSq = ((particlesArray[a].x - particlesArray[b].x) ** 2) + 
                             ((particlesArray[a].y - particlesArray[b].y) ** 2);
                
                let limit = 120 * 120;
                if (distSq < limit) {
                    opacityValue = 1 - (distSq / limit);
                    ctx.strokeStyle = isLight 
                        ? `rgba(17, 99, 123, ${opacityValue * 0.1})`
                        : `rgba(0, 242, 254, ${opacityValue * 0.12})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Animation loop
    function animateParticles() {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connectParticles();
        requestAnimationFrame(animateParticles);
    }
    
    // Handle resize
    function resizeCanvas() {
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = Math.max(
            document.documentElement.scrollHeight,
            document.body.scrollHeight,
            window.innerHeight
        );
        initParticles();
    }
    
    if (canvas) {
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        animateParticles();
    }

    // ==========================================================================
    // HERO TYPING EFFECT
    // ==========================================================================
    const typewriter = document.getElementById('typewriter');
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
    let occupationIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentTextList = occupations[currentLang] || occupations['fr'];
        const currentText = currentTextList[occupationIndex];
        
        if (isDeleting) {
            typewriter.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deleting is faster
        } else {
            typewriter.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 2000; // Pause at full text
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            occupationIndex = (occupationIndex + 1) % currentTextList.length;
            typingSpeed = 500; // Small pause before writing next item
        }

        setTimeout(type, typingSpeed);
    }
    
    if (typewriter) {
        setTimeout(type, 1000); // Start after 1 second
    }

    // ==========================================================================
    // INTERSECTION OBSERVER FOR SCROLL REVEAL & STATS COUNTER
    // ==========================================================================
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: '0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add tiny delay depending on data attribute
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, delay);
                observer.unobserve(entry.target); // Trigger only once
                
                // If it is the about section, trigger numbers animation
                if (entry.target.id === 'about') {
                    animateNumbers();
                }
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Animate stats counter
    function animateNumbers() {
        const statsNumbers = document.querySelectorAll('.stat-number');
        statsNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            let current = 0;
            const duration = 1500; // 1.5 seconds
            const stepTime = Math.max(Math.floor(duration / target), 10);
            
            const timer = setInterval(() => {
                current += Math.ceil(target / (duration / stepTime));
                if (current >= target) {
                    stat.textContent = target + (target === 100 || target === 80 ? '%' : '+');
                    clearInterval(timer);
                } else {
                    stat.textContent = current;
                }
            }, stepTime);
        });
    }

    // Ensure the about observer is triggered if it's already in viewport
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        revealObserver.observe(aboutSection);
    }

    // ==========================================================================
    // SIMULATED TERMINAL WIDGET ANIMATION
    // ==========================================================================
    const terminalBody = document.querySelector('.terminal-body');
    if (terminalBody) {
        const lines = terminalBody.querySelectorAll('.term-line');
        // Hide all lines initially except the first prompt
        lines.forEach((line, index) => {
            if (index > 0) {
                line.style.opacity = '0';
                line.style.transition = 'opacity 0.3s ease';
            }
        });

        let currentLine = 1;
        const typeNextLine = () => {
            if (currentLine < lines.length) {
                setTimeout(() => {
                    lines[currentLine].style.opacity = '1';
                    currentLine++;
                    typeNextLine();
                }, 800 + Math.random() * 600); // realistic typing wait
            } else {
                // Loop: reset after 7 seconds and type again!
                setTimeout(() => {
                    lines.forEach((line, index) => {
                        if (index > 0) line.style.opacity = '0';
                    });
                    currentLine = 1;
                    typeNextLine();
                }, 7000);
            }
        };
        // Start typing loop
        setTimeout(typeNextLine, 1500);
    }

    // ==========================================================================
    // GALLERY CATEGORY FILTER ENGINE
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                // Remove existing anim classes to re-trigger on change
                item.style.transform = 'scale(0.8)';
                item.style.opacity = '0';
                
                setTimeout(() => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.transform = 'scale(1)';
                            item.style.opacity = '1';
                        }, 50);
                    } else {
                        item.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    // ==========================================================================
    // PROJECT CARDS LIGHTBOX / MODAL DETAILS
    // ==========================================================================
    const modal = document.getElementById('projectModal');
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalTags = document.getElementById('modalTags');
    const modalLink = document.getElementById('modalLink');
    const closeModal = document.querySelector('.close-modal');

    // Project data dictionary to populate the modal
    const projectsData = {
        'ebiblio': {
            img: 'ebiblio_mockup.png',
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
            img: 'recruitment_mockup.png',
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
            img: 'energy_mockup.png',
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

    // Open Modal when clicking image overlays
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const projectId = card.getAttribute('data-project');
        const overlay = card.querySelector('.project-hover-overlay');

        if (overlay && projectsData[projectId]) {
            overlay.addEventListener('click', () => {
                const data = projectsData[projectId];
                if (modalImg) modalImg.src = data.img;
                if (modalTitle) modalTitle.textContent = data.title[currentLang] || data.title['fr'];
                if (modalDescription) modalDescription.textContent = data.desc[currentLang] || data.desc['fr'];
                
                // Clear and recreate tags
                if (modalTags) {
                    modalTags.innerHTML = '';
                    data.tags.forEach(tag => {
                        const span = document.createElement('span');
                        span.className = 'tech-tag';
                        span.textContent = tag;
                        modalTags.appendChild(span);
                    });
                }
                
                if (modalLink) modalLink.href = data.link;
                if (modal) {
                    modal.style.display = 'flex';
                    document.body.style.overflow = 'hidden'; // Stop background scrolling
                }
            });
        }
    });

    // Close modal function
    function doCloseModal() {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Restore scroll
        }
    }

    if (closeModal) {
        closeModal.addEventListener('click', doCloseModal);
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            doCloseModal();
        }
    });

    // Close modal with Escape Key
    window.addEventListener('keydown', (e) => {
        if (modal && e.key === 'Escape' && modal.style.display === 'flex') {
            doCloseModal();
        }
    });

    // ==========================================================================
    // CONTACT FORM SUBMISSION WITH PRETTIFIED SIMULATION
    // ==========================================================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = translations[currentLang]["contact-btn"] || 'Envoyer';
            
            // Submitting animation state
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.75';
            submitBtn.querySelector('.btn-text').textContent = translations[currentLang]["contact-submitting"] || 'Envoi...';
            submitBtn.querySelector('.btn-icon').innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            
            setTimeout(() => {
                // Success state animation
                submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                submitBtn.style.borderColor = '#10b981';
                submitBtn.querySelector('.btn-text').textContent = translations[currentLang]["contact-success"] || 'Envoyé !';
                submitBtn.querySelector('.btn-icon').innerHTML = '<i class="fas fa-check-circle"></i>';
                
                // Show clean custom toast / alert instead of native block alert
                setTimeout(() => {
                    alert(translations[currentLang]["contact-alert"] || 'Merci !');
                    
                    // Reset button state
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.background = '';
                    submitBtn.style.borderColor = '';
                    submitBtn.querySelector('.btn-text').textContent = originalText;
                    submitBtn.querySelector('.btn-icon').innerHTML = '<i class="fas fa-paper-plane"></i>';
                    
                    contactForm.reset();
                }, 300);
                
            }, 1800);
        });
    }

    // Run initial language setup on page load
    updateLanguage(currentLang);

});