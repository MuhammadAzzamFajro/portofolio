'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Preloader.module.css';

interface PreloaderProps {
  onDone?: () => void;
}

export default function Preloader({ onDone }: PreloaderProps) {
  const [visible, setVisible] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If motion is off, skip preloader immediately
    const motionPref = typeof window !== 'undefined' ? localStorage.getItem('motion_preference') : null;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (motionPref === 'reduced' || (prefersReduced && motionPref !== 'enable')) {
      setVisible(false);
      window.dispatchEvent(new CustomEvent('preloader:done'));
      onDone?.();
      return;
    }

    const overlay = overlayRef.current;
    const counter = counterRef.current;
    const progress = progressRef.current;
    if (!overlay || !counter || !progress) return;

    const ctx = gsap.context(() => {
      const obj = { count: 0 };
      const tl = gsap.timeline();

      // 000 -> 100 counting with power2.inOut in ~1.9s
      tl.to(obj, {
        count: 100,
        duration: 1.9,
        ease: 'power2.inOut',
        onUpdate: () => {
          const val = Math.floor(obj.count);
          counter.textContent = String(val).padStart(3, '0');
          progress.style.transform = `scaleX(${obj.count / 100})`;
        },
      });

      // Tirai terangkat dengan expo.inOut
      tl.to(overlay, {
        yPercent: -100,
        duration: 0.9,
        ease: 'expo.inOut',
        delay: 0.15,
        onComplete: () => {
          setVisible(false);
          window.dispatchEvent(new CustomEvent('preloader:done'));
          onDone?.();
        },
      });
    }, overlay);

    return () => ctx.revert();
  }, [onDone]);

  if (!visible) return null;

  return (
    <div ref={overlayRef} className={styles.overlay} aria-hidden="true">
      <div className={styles.logo}>AF.</div>
      <div className={styles.counterWrap}>
        <span ref={counterRef} className={styles.counter}>000</span>
      </div>
      <div className={styles.progressTrack} role="progressbar" aria-label="Loading">
        <div ref={progressRef} className={styles.progressBar} />
      </div>
    </div>
  );
}
