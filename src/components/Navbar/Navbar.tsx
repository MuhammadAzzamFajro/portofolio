'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import gsap from 'gsap';
import styles from './Navbar.module.css';

const NAV = [
  { label: 'Tentang', href: '#about' },
  { label: 'Proyek', href: '#projects' },
  { label: 'Sertifikat', href: '#certificates' },
  { label: 'Kontak', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [motion, setMotion] = useState<'enable' | 'reduced'>('enable');
  const [mounted, setMounted] = useState(false);

  const themeBtnRef = useRef<HTMLButtonElement>(null);
  const motionBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
    // Theme init
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initTheme = savedTheme ?? (sysDark ? 'dark' : 'light');
    setTheme(initTheme);
    document.documentElement.setAttribute('data-theme', initTheme);

    // Motion init
    const savedMotion = localStorage.getItem('motion_preference') as 'enable' | 'reduced' | null;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const initMotion = savedMotion ?? (prefersReduced ? 'reduced' : 'enable');
    setMotion(initMotion);
    document.documentElement.setAttribute('data-motion', initMotion);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      return next;
    });
  }, []);

  const toggleMotion = useCallback(() => {
    setMotion((prev) => {
      const next = prev === 'enable' ? 'reduced' : 'enable';
      document.documentElement.setAttribute('data-motion', next);
      localStorage.setItem('motion_preference', next);
      window.dispatchEvent(new CustomEvent('motion:change', { detail: next }));
      return next;
    });
  }, []);

  // Magnetic hover for buttons
  const handleMagneticMove = (el: HTMLElement | null, e: React.MouseEvent) => {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.3;
    const dy = (e.clientY - cy) * 0.3;
    gsap.to(el, { x: dx, y: dy, duration: 0.25, ease: 'power2.out', overwrite: 'auto' });
  };

  const handleMagneticLeave = (el: HTMLElement | null) => {
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)', overwrite: 'auto' });
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = NAV.map((n) => n.href.slice(1));
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY + 120 >= el.offsetTop) current = id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      <nav
        className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
        aria-label="Navigasi utama"
      >
        <div className={styles.inner}>
          {/* Logo mark */}
          <a href="#home" className={styles.logo} aria-label="Kembali ke atas">
            <span className={styles.logoMark} aria-hidden="true">AF</span>
          </a>

          {/* Desktop links */}
          <ul className={styles.links} role="list">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className={`${styles.link} ${active === n.href.slice(1) ? styles.linkActive : ''}`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className={styles.controls}>
            {/* Motion toggle */}
            <button
              ref={motionBtnRef}
              onClick={toggleMotion}
              onMouseMove={(e) => handleMagneticMove(motionBtnRef.current, e)}
              onMouseLeave={() => handleMagneticLeave(motionBtnRef.current)}
              className={styles.motionBtn}
              aria-label={motion === 'enable' ? 'Matikan animasi (gerakan dikurangi)' : 'Nyalakan animasi'}
              title={`Gerakan: ${motion === 'enable' ? 'Hidup' : 'Mati'}`}
            >
              <span className={`${styles.motionDot} ${motion === 'reduced' ? styles.motionDotOff : ''}`} />
              <span>Gerakan: {motion === 'enable' ? 'Hidup' : 'Mati'}</span>
            </button>

            {/* Theme toggle */}
            <button
              ref={themeBtnRef}
              onClick={toggleTheme}
              onMouseMove={(e) => handleMagneticMove(themeBtnRef.current, e)}
              onMouseLeave={() => handleMagneticLeave(themeBtnRef.current)}
              className={styles.themeBtn}
              aria-label={mounted && theme === 'dark' ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'}
              title={mounted && theme === 'dark' ? 'Mode terang' : 'Mode gelap'}
            >
              {mounted && theme === 'dark' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>

            {/* Hamburger */}
            <button
              className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
        aria-hidden={!menuOpen}
      >
        <ul role="list" className={styles.mobileLinks}>
          {NAV.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                className={styles.mobileLink}
                onClick={() => setMenuOpen(false)}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.5rem' }}>
          <button
            onClick={() => { toggleMotion(); setMenuOpen(false); }}
            className={styles.mobileThemeBtn}
            aria-label="Ubah gerakan"
          >
            Gerakan: {motion === 'enable' ? 'Hidup' : 'Mati'}
          </button>
          <button
            onClick={() => { toggleTheme(); setMenuOpen(false); }}
            className={styles.mobileThemeBtn}
            aria-label="Ubah tema"
          >
            {mounted && theme === 'dark' ? '☀ Mode Terang' : '☽ Mode Gelap'}
          </button>
        </div>
      </div>
    </>
  );
}
