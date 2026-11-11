'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Marquee.module.css';

gsap.registerPlugin(ScrollTrigger);

const WORDS = [
  'Laravel',
  'Next.js',
  'Full Stack',
  'Freelancer',
  'Malang',
  'Laravel',
  'Next.js',
  'Full Stack',
  'Freelancer',
  'Malang',
];

/** Yellow separator box */
const Sep = () => <span className={styles.sep} aria-hidden="true" />;

export default function Marquee() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const wrapper = wrapperRef.current;
    if (!track || !wrapper) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const motionPref = typeof window !== 'undefined' ? localStorage.getItem('motion_preference') : null;
    const isReduced = motionPref === 'reduced' || (prefersReduced && motionPref !== 'enable');

    if (isReduced) return;

    const ctx = gsap.context(() => {
      const clone = track.firstElementChild as HTMLElement;
      const copyW = clone?.offsetWidth ?? 800;

      // Infinite continuous horizontal movement
      const loopTween = gsap.to(track, {
        x: -copyW,
        duration: copyW / 40,
        ease: 'none',
        repeat: -1,
      });

      // ScrollTrigger velocity: boost speed on fast scroll, then return to normal
      ScrollTrigger.create({
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity());
          if (velocity > 20) {
            const speedRatio = 1 + Math.min(velocity / 350, 4);
            gsap.to(loopTween, {
              timeScale: speedRatio,
              duration: 0.15,
              overwrite: 'auto',
              onComplete: () => {
                gsap.to(loopTween, { timeScale: 1, duration: 0.6, ease: 'power2.out' });
              },
            });
          }
        },
      });
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className={styles.wrapper} aria-label="Kata kunci" role="marquee">
      <div ref={trackRef} className={styles.track}>
        {[0, 1].map((copy) => (
          <div key={copy} className={styles.copy} aria-hidden={copy === 1}>
            {WORDS.map((word, i) => (
              <span key={i} className={styles.item}>
                {word}
                <Sep />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
