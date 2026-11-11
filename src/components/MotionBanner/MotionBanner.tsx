'use client';

import { useState, useEffect } from 'react';
import styles from './MotionBanner.module.css';

export default function MotionBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if user already made an explicit decision
    const savedChoice = localStorage.getItem('motion_preference');
    if (savedChoice) {
      if (savedChoice === 'enable') {
        document.documentElement.setAttribute('data-motion', 'enable');
      } else {
        document.documentElement.setAttribute('data-motion', 'reduced');
      }
      return;
    }

    // Check system preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      document.documentElement.setAttribute('data-motion', 'reduced');
      setShow(true);
    } else {
      document.documentElement.setAttribute('data-motion', 'enable');
    }

    const onMotionChange = () => setShow(false);
    window.addEventListener('motion:change', onMotionChange);
    return () => window.removeEventListener('motion:change', onMotionChange);
  }, []);

  const handleEnable = () => {
    localStorage.setItem('motion_preference', 'enable');
    document.documentElement.setAttribute('data-motion', 'enable');
    window.dispatchEvent(new CustomEvent('motion:change', { detail: 'enable' }));
    setShow(false);
  };

  const handleDismiss = () => {
    localStorage.setItem('motion_preference', 'reduced');
    document.documentElement.setAttribute('data-motion', 'reduced');
    window.dispatchEvent(new CustomEvent('motion:change', { detail: 'reduced' }));
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className={styles.banner} role="status" aria-live="polite">
      <span className={styles.text}>
        Perangkatmu meminta gerakan dikurangi. Aktifkan animasi?
      </span>
      <div className={styles.actions}>
        <button onClick={handleEnable} className={styles.btn}>
          Aktifkan Animasi
        </button>
        <button onClick={handleDismiss} className={styles.dismiss}>
          Biarkan Nonaktif
        </button>
      </div>
    </div>
  );
}
