'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Cursor.module.css';

/**
 * Custom cursor — desktop only.
 * Yellow circle follows mouse with gsap.quickTo inertia.
 * Grows over interactive elements (a, button, frame, etc.).
 */
export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on pointer (non-touch) devices
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    gsap.set([dot, ring], { opacity: 1 });

    // Inersia via gsap.quickTo
    const setRingX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' });
    const setRingY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' });
    const setDotX  = gsap.quickTo(dot,  'x', { duration: 0.04 });
    const setDotY  = gsap.quickTo(dot,  'y', { duration: 0.04 });

    const onMove = (e: MouseEvent) => {
      setRingX(e.clientX);
      setRingY(e.clientY);
      setDotX(e.clientX);
      setDotY(e.clientY);
    };

    const INTERACTIVE = 'a, button, [role="button"], input, textarea, [data-cursor="expand"], .frame, [class*="frame"]';

    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as Element).closest(INTERACTIVE);
      if (target) {
        gsap.to(ring, { scale: 1.8, duration: 0.25, ease: 'expo.out', overwrite: 'auto' });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = (e.target as Element).closest(INTERACTIVE);
      if (target) {
        gsap.to(ring, { scale: 1, duration: 0.25, ease: 'expo.out', overwrite: 'auto' });
      }
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={styles.dot} aria-hidden="true" />
      <div ref={ringRef} className={styles.ring} aria-hidden="true" />
    </>
  );
}
