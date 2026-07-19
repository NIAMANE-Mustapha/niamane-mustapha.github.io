import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursorDot = cursorDotRef.current;
    const cursorRing = cursorRingRef.current;
    if (!cursorDot || !cursorRing) return;

    // Check if the user prefers reduced motion or is on mobile
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouchDevice || prefersReducedMotion) {
      cursorDot.style.display = 'none';
      cursorRing.style.display = 'none';
      return;
    }

    const mouse = { x: 0, y: 0 };
    const dotPos = { x: 0, y: 0 };
    const ringPos = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);

    // GSAP quick setter for performance (no style updates inside tick loops)
    const setDotX = gsap.quickTo(cursorDot, 'x', { duration: 0.1, ease: 'power3.out' });
    const setDotY = gsap.quickTo(cursorDot, 'y', { duration: 0.1, ease: 'power3.out' });
    
    const setRingX = gsap.quickTo(cursorRing, 'x', { duration: 0.35, ease: 'power3.out' });
    const setRingY = gsap.quickTo(cursorRing, 'y', { duration: 0.35, ease: 'power3.out' });

    // Custom animation tick
    const tick = () => {
      dotPos.x = mouse.x;
      dotPos.y = mouse.y;
      
      ringPos.x = mouse.x;
      ringPos.y = mouse.y;

      setDotX(dotPos.x);
      setDotY(dotPos.y);

      setRingX(ringPos.x);
      setRingY(ringPos.y);

      requestAnimationFrame(tick);
    };

    const animId = requestAnimationFrame(tick);

    // Hover state animations
    const onMouseEnterLink = () => {
      gsap.to(cursorRing, {
        scale: 1.8,
        backgroundColor: 'rgba(0, 242, 254, 0.08)',
        borderColor: 'rgba(0, 242, 254, 0.6)',
        borderWidth: 1,
        duration: 0.3,
      });
      gsap.to(cursorDot, {
        scale: 0.5,
        backgroundColor: '#00f2fe',
        duration: 0.3,
      });
    };

    const onMouseLeaveLink = () => {
      gsap.to(cursorRing, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: 'var(--primary-glow)',
        borderWidth: 2,
        duration: 0.3,
      });
      gsap.to(cursorDot, {
        scale: 1,
        backgroundColor: 'var(--primary-glow)',
        duration: 0.3,
      });
    };

    // Attach listeners to interactive elements
    const attachHoverListeners = () => {
      const links = document.querySelectorAll('a, button, [role="button"], .project-card, .gallery-item-card, .filter-btn, input, textarea');
      links.forEach((link) => {
        link.addEventListener('mouseenter', onMouseEnterLink);
        link.addEventListener('mouseleave', onMouseLeaveLink);
      });
    };

    // Use MutationObserver to handle dynamic additions (like modal openings)
    const observer = new MutationObserver(() => {
      attachHoverListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });
    attachHoverListeners();

    // Magnetic effect implementation for selected elements
    const magneticElements = document.querySelectorAll('.magnetic');
    magneticElements.forEach((el) => {
      el.addEventListener('mousemove', (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = (el as HTMLElement).getBoundingClientRect();
        const x = mouseEvent.clientX - rect.left - rect.width / 2;
        const y = mouseEvent.clientY - rect.top - rect.height / 2;
        
        gsap.to(el, {
          x: x * 0.35,
          y: y * 0.35,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)',
        });
      });
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Outer ring */}
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] border-2 mix-blend-difference"
        style={{
          borderColor: 'var(--primary-glow)',
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      />
      {/* Inner dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          backgroundColor: 'var(--primary-glow)',
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      />
    </>
  );
};
