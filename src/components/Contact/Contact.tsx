'use client';

import { useRef, useCallback } from 'react';
import gsap from 'gsap';
import styles from './Contact.module.css';

const EMAIL = 'muhammadazzamfajro@gmail.com';

export default function Contact() {
  const emailRef = useRef<HTMLAnchorElement>(null);

  // Magnetic attraction using GSAP
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = emailRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.18;
    const dy = (e.clientY - cy) * 0.25;

    gsap.to(el, {
      x: dx,
      y: dy,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  }, []);

  const onMouseLeave = useCallback(() => {
    const el = emailRef.current;
    if (!el) return;
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.4)',
      overwrite: 'auto',
    });
  }, []);

  return (
    <section id="contact" className={styles.section} aria-label="Kontak">
      <div className="container">
        <header className={styles.header}>
          <span className="section-label">05 / JALUR KONTAK</span>
          <h2 className="section-title">Mari Berkolaborasi</h2>
        </header>

        <div className={styles.emailWrap}>
          <a
            ref={emailRef}
            href={`mailto:${EMAIL}`}
            className={styles.email}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            aria-label={`Kirim email ke ${EMAIL}`}
          >
            {EMAIL}
          </a>
          <span className={styles.emailLine} aria-hidden="true" />
        </div>

        <p className={styles.tagline}>
          Punya proyek? Kirim saja — saya baca setiap pesan.
        </p>
      </div>
    </section>
  );
}
