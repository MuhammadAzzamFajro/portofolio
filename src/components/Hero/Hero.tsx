'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Hero.module.css';

gsap.registerPlugin(ScrollTrigger);

const FIRST = 'Azzam'.split('');
const LAST  = 'Fajro'.split('');

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameWrapperRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const subRef = useRef<HTMLParagraphElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const nameWrapper = nameWrapperRef.current;
    if (!section || !nameWrapper) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const motionPref = typeof window !== 'undefined' ? localStorage.getItem('motion_preference') : null;
    const isReduced = motionPref === 'reduced' || (prefersReduced && motionPref !== 'enable');

    const ctx = gsap.context(() => {
      // If reduced motion, set everything visible immediately
      if (isReduced) {
        gsap.set(lettersRef.current, { yPercent: 0, opacity: 1 });
        gsap.set(subRef.current, { opacity: 1, y: 0 });
        gsap.set(cueRef.current, { opacity: 1 });
        gsap.set(lineRef.current, { scaleY: 1 });
        return;
      }

      // Initial state
      gsap.set(lettersRef.current, { yPercent: 110, opacity: 0 });
      gsap.set(subRef.current, { opacity: 0, y: 15 });
      gsap.set(cueRef.current, { opacity: 0 });
      gsap.set(lineRef.current, { scaleY: 0 });

      const startEntrance = () => {
        const tl = gsap.timeline();

        // 1. Letters reveal: stagger 80ms, expo.out
        tl.to(lettersRef.current, {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: 'expo.out',
        })
        // 2. Subline fade up
        .to(subRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'expo.out',
        }, '-=0.3')
        // 3. Scroll cue
        .to(cueRef.current, {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        }, '-=0.2')
        .to(lineRef.current, {
          scaleY: 1,
          duration: 0.8,
          ease: 'expo.out',
        }, '-=0.4');
      };

      // Listen for preloader completion, with fallback timeout
      let started = false;
      const onPreloaderDone = () => {
        if (started) return;
        started = true;
        startEntrance();
      };

      window.addEventListener('preloader:done', onPreloaderDone);
      const fallbackTimer = setTimeout(onPreloaderDone, 2400);

      // Zoom-in saat di-scroll: nama membesar dengan origin kiri (scrub)
      gsap.to(nameWrapper, {
        scale: 1.35,
        opacity: 0.9,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      return () => {
        window.removeEventListener('preloader:done', onPreloaderDone);
        clearTimeout(fallbackTimer);
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={sectionRef} className={styles.hero} aria-label="Halaman utama">
      <div className={styles.inner}>
        <div ref={nameWrapperRef} className={styles.nameWrapper}>
          <h1 className={styles.name} aria-label="Azzam Fajro">
            {/* First name */}
            <span className={styles.nameLine} aria-hidden="true">
              {FIRST.map((ch, i) => (
                <span
                  key={i}
                  ref={(el) => { lettersRef.current[i] = el; }}
                  className={styles.letter}
                >
                  {ch}
                </span>
              ))}
            </span>
            {/* Last name */}
            <span className={styles.nameLine} aria-hidden="true">
              {LAST.map((ch, i) => (
                <span
                  key={i}
                  ref={(el) => { lettersRef.current[FIRST.length + i] = el; }}
                  className={`${styles.letter} ${styles.letterAccent}`}
                >
                  {ch}
                </span>
              ))}
            </span>
          </h1>

          {/* Subline */}
          <p ref={subRef} className={styles.sub}>
            Freelancer · Laravel &amp; Next.js
          </p>
        </div>
      </div>

      {/* Scroll cue */}
      <div ref={cueRef} className={styles.scrollCue} aria-hidden="true">
        <span ref={lineRef} className={styles.scrollLine} />
        <span className={styles.scrollLabel}>scroll</span>
      </div>
    </section>
  );
}
