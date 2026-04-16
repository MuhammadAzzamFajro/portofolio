'use client';

import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const navLinks = [
  { name: 'Beranda', href: '#home' },
  { name: 'Tentang', href: '#about' },
  { name: 'Keahlian', href: '#skills' },
  { name: 'Proyek', href: '#projects' },
  { name: 'Sertifikat', href: '#certificates' },
  { name: 'Kontak', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.href.slice(1));

    const syncFromHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (sectionIds.includes(hash)) {
        setActiveSection(hash);
      }
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on current viewport
      const marker = window.scrollY + 140;
      let current = 'home';

      for (const section of sectionIds) {
        const element = document.getElementById(section);
        if (element && marker >= element.offsetTop) {
          current = section;
        }
      }

      setActiveSection(current);
    };

    syncFromHash();
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', syncFromHash);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', syncFromHash);
    };
  }, []);

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <a href="#home" className={styles.logo}>
          <span className={styles.logoIcon}>✦</span>
          <span className={styles.logoText}>Portfolio</span>
        </a>

        <div className={`${styles.navLinks} ${isMobileMenuOpen ? styles.active : ''}`}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`${styles.navLink} ${activeSection === link.href.slice(1) ? styles.activeLink : ''}`}
              onClick={() => {
                setActiveSection(link.href.slice(1));
                setIsMobileMenuOpen(false);
              }}
            >
              {link.name}
            </a>
          ))}
        </div>

        <button
          className={`${styles.mobileMenuBtn} ${isMobileMenuOpen ? styles.active : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Buka tutup menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
