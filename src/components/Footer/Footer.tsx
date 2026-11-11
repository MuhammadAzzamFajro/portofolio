import styles from './Footer.module.css';

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/MuhammadAzzamFajro',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 19C4 20.5 4 16.5 2 16M16 22V18.13C16.04 17.65 15.97 17.17 15.81 16.72C15.65 16.27 15.39 15.86 15.06 15.52C18.2 15.17 21.5 13.98 21.5 8.52C21.5 7.12 20.96 5.78 20 4.77C20.46 3.55 20.42 2.2 19.91 1C19.91 1 18.73 0.65 16 2.48C13.71 1.86 11.29 1.86 9 2.48C6.27 0.65 5.09 1 5.09 1C4.58 2.2 4.54 3.55 5 4.77C4.03 5.79 3.49 7.14 3.5 8.55C3.5 13.97 6.8 15.16 9.94 15.55C9.61 15.89 9.36 16.3 9.2 16.74C9.03 17.18 8.97 17.66 9 18.13V22"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/zammfjr',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    label: 'Dribbble',
    href: 'https://dribbble.com/muhammad-azzam-fajro',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8.56 2.75C12.93 8.78 14.58 12.17 16.59 20.47M19.13 5.09C15.41 9.44 10.19 10.75 2.25 10.94M21.75 12.84C18.25 11.91 15.12 12.02 12.81 12.84C10.23 13.76 7.8 15.7 5.37 19.16"/>
      </svg>
    ),
  },
];

const NAV = [
  { label: 'Histori', href: '#history' },
  { label: 'Proyek', href: '#projects' },
  { label: 'Tentang', href: '#about' },
  { label: 'Sertifikat', href: '#certificates' },
  { label: 'Kontak', href: '#contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} aria-label="Footer">
      <div className={`container ${styles.inner}`}>
        {/* Top row */}
        <div className={styles.top}>
          {/* Brand */}
          <div className={styles.brand}>
            <a href="#home" className={styles.logo} aria-label="Kembali ke atas">
              <span className={styles.logoMark}>AF</span>
            </a>
            <p className={styles.tagline}>
              Freelancer — Laravel &amp; Next.js
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Navigasi footer">
            <ul className={styles.navList} role="list">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className={styles.navLink}>{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div className={styles.socials}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.social}
                aria-label={s.label}
                title={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <hr className={styles.rule} aria-hidden="true" />

        {/* Bottom */}
        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {year} Muhammad Azzam Fajro — azzamfajro.my.id
          </p>
          <p className={styles.copy} style={{ color: 'var(--ink-dim)', opacity: 0.5 }}>
            Dibangun dengan Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
