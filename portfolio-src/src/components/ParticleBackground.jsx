import React, { useEffect, useRef } from 'react';

const ParticleBackground = ({ theme }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particlesArray = [];
        const numberOfParticles = 80;
        let animationFrameId = null;
        let isCanvasVisible = true;

        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }
            
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.shadowBlur = 10;
                ctx.shadowColor = document.body.classList.contains('light-mode') 
                    ? 'rgba(17, 99, 123, 0.2)' 
                    : 'rgba(0, 242, 254, 0.4)';
                ctx.fill();
                ctx.shadowBlur = 0;
            }
            
            update() {
                if (this.x > canvas.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }
                
                this.x += this.directionX;
                this.y += this.directionY;
                
                this.draw();
            }
        }

        function initParticles() {
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
                
                let color = isLight
                    ? (Math.random() > 0.5 ? 'rgba(17, 99, 123, 0.35)' : 'rgba(99, 102, 241, 0.25)')
                    : (Math.random() > 0.5 ? 'rgba(0, 242, 254, 0.25)' : 'rgba(99, 102, 241, 0.2)');
                
                particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
            }
        }

        function connectParticles() {
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

        function animateParticles() {
            if (!isCanvasVisible) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            connectParticles();
            animationFrameId = requestAnimationFrame(animateParticles);
        }

        function toggleParticles(visible) {
            isCanvasVisible = visible;
            if (visible) {
                if (!animationFrameId) {
                    animationFrameId = requestAnimationFrame(animateParticles);
                }
            } else {
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = null;
                }
            }
        }

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        
        // Setup observer for Hero section
        const heroSection = document.getElementById('hero');
        let observer = null;
        if (heroSection) {
            observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    toggleParticles(entry.isIntersecting);
                });
            }, { threshold: 0.05 });
            observer.observe(heroSection);
        } else {
            // Fallback if hero not found
            animationFrameId = requestAnimationFrame(animateParticles);
        }

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (observer && heroSection) {
                observer.unobserve(heroSection);
            }
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [theme]); // Re-init on theme change to update particle colors

    return <canvas ref={canvasRef} id="particleCanvas" />;
};

export default ParticleBackground;
