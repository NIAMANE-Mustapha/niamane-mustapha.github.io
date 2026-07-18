import React, { useState } from 'react';

const SystemArchitecture = ({ lang }) => {
    const [activeNode, setActiveNode] = useState('wallet');

    const nodeDetails = {
        monolith: {
            title: {
                fr: 'Monolithe Laravel Découplé',
                en: 'Decoupled Laravel Monolith'
            },
            desc: {
                fr: 'La structure globale du projet repose sur un monolithe modulaire. Chaque fonctionnalité majeure est encapsulée dans son propre domaine pour minimiser le couplage et faciliter les migrations futures.',
                en: 'The overall structure of the project rests on a modular monolith. Each major feature is encapsulated in its own domain to minimize coupling and facilitate future microservice migrations.'
            }
        },
        auth: {
            title: {
                fr: 'Module d\'Authentification',
                en: 'Authentication Module'
            },
            desc: {
                fr: 'Gère la session utilisateur, les tokens JWT et la vérification des rôles. Conçu de manière autonome pour être facilement extrait si nécessaire.',
                en: 'Manages user sessions, JWT tokens, and role verification. Designed autonomously to be easily extracted if necessary.'
            }
        },
        wallet: {
            title: {
                fr: 'Module Wallet (Portefeuille numérique)',
                en: 'Wallet Module (Digital Wallet)'
            },
            desc: {
                fr: 'Développé chez ERAH. Gère les soldes utilisateur, les dépôts, retraits et les transferts sécurisés avec gestion fine des transactions concurrentes dans MySQL.',
                en: 'Developed at ERAH. Manages user balances, deposits, withdrawals, and secure transfers with strict handling of concurrent transactions in MySQL.'
            }
        },
        gamification: {
            title: {
                fr: 'Module Gamification (Points & Badges)',
                en: 'Gamification Module (Points & Badges)'
            },
            desc: {
                fr: 'Gère le système de fidélisation et d\'engagement utilisateur. Utilise des écouteurs d\'événements (Laravel Event Listeners) pour réagir aux actions du module Wallet.',
                en: 'Manages user engagement and rewards. Uses Laravel Event Listeners to react to events triggered in the Wallet module without coupling them.'
            }
        },
        database: {
            title: {
                fr: 'Base de données MySQL Unifiée',
                en: 'Unified MySQL Database'
            },
            desc: {
                fr: 'Une base relationnelle indexée de manière optimale. Les tables de chaque module sont séparées par des préfixes logiques pour simuler des frontières physiques.',
                en: 'An optimally indexed relational database. Tables for each module are separated by logical prefixes to simulate physical boundaries.'
            }
        }
    };

    const currentDetails = nodeDetails[activeNode] || nodeDetails.wallet;

    return (
        <div className="diagram-section">
            <div className="diagram-card">
                <div className="diagram-header">
                    <h3>{lang === 'fr' ? 'Architecture du Système' : 'System Architecture'}</h3>
                    <p>
                        {lang === 'fr' 
                            ? 'Cliquez sur les différents blocs de l\'architecture ci-dessous pour inspecter les détails de conception :'
                            : 'Click on the different architecture blocks below to inspect the design details:'}
                    </p>
                </div>

                <div className="interactive-diagram-wrapper">
                    <svg viewBox="0 0 400 240" className="sys-architecture-svg">
                        <defs>
                            <filter id="glow-svg" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="3" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>

                        {/* Monolith Border Box */}
                        <rect
                            x="10"
                            y="15"
                            width="260"
                            height="210"
                            rx="12"
                            className={`arch-node monolith ${activeNode === 'monolith' ? 'active' : ''}`}
                            onClick={() => setActiveNode('monolith')}
                        />
                        <text x="75" y="40" className="arch-text font-bold" style={{ fill: 'var(--secondary)' }}>
                            {lang === 'fr' ? 'Monolithe Modulaire' : 'Modular Monolith'}
                        </text>

                        {/* Auth Module Node */}
                        <rect
                            x="140"
                            y="30"
                            width="110"
                            height="45"
                            rx="8"
                            className={`arch-node ${activeNode === 'auth' ? 'active' : ''}`}
                            onClick={() => setActiveNode('auth')}
                        />
                        <text x="195" y="56" className="arch-text">Auth Module</text>

                        {/* Wallet Module Node */}
                        <rect
                            x="140"
                            y="95"
                            width="110"
                            height="45"
                            rx="8"
                            className={`arch-node ${activeNode === 'wallet' ? 'active' : ''}`}
                            onClick={() => setActiveNode('wallet')}
                            filter={activeNode === 'wallet' ? 'url(#glow-svg)' : ''}
                        />
                        <text x="195" y="121" className="arch-text font-bold" style={{ fill: activeNode === 'wallet' ? 'var(--primary-glow)' : 'var(--text-main)' }}>
                            Wallet Module
                        </text>

                        {/* Gamification Module Node */}
                        <rect
                            x="140"
                            y="160"
                            width="110"
                            height="45"
                            rx="8"
                            className={`arch-node ${activeNode === 'gamification' ? 'active' : ''}`}
                            onClick={() => setActiveNode('gamification')}
                        />
                        <text x="195" y="186" className="arch-text">Gamification</text>

                        {/* MySQL Database Node */}
                        <rect
                            x="290"
                            y="95"
                            width="100"
                            height="45"
                            rx="8"
                            className={`arch-node database ${activeNode === 'database' ? 'active' : ''}`}
                            onClick={() => setActiveNode('database')}
                        />
                        <text x="340" y="121" className="arch-text">MySQL DB</text>

                        {/* Connectors */}
                        {/* Monolith internals connectors */}
                        <path d="M 100 118 L 140 52" className="connector-line" />
                        <path d="M 100 118 L 140 118" className={`connector-line ${activeNode === 'wallet' ? 'pulse active' : ''}`} />
                        <path d="M 100 118 L 140 182" className="connector-line" />
                        
                        {/* Modules to DB Connectors */}
                        <path d="M 250 118 L 290 118" className={`connector-line ${activeNode === 'wallet' || activeNode === 'database' ? 'active' : ''}`} />
                        <path d="M 250 52 L 290 118" className={`connector-line ${activeNode === 'auth' ? 'active' : ''}`} />
                        <path d="M 250 182 L 290 118" className={`connector-line ${activeNode === 'gamification' ? 'active' : ''}`} />
                    </svg>
                </div>

                <div className="diagram-description-card">
                    <h4>
                        <i className="fas fa-info-circle"></i>
                        {currentDetails.title[lang]}
                    </h4>
                    <p>{currentDetails.desc[lang]}</p>
                </div>
            </div>
        </div>
    );
};

export default SystemArchitecture;
