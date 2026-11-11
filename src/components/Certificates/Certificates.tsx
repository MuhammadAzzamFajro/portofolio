'use client';

import { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Certificates.module.css';

gsap.registerPlugin(ScrollTrigger);

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  verifyUrl: string;
  image?: string;
}

const certificates: Certificate[] = [
  {
    id: 1,
    title: 'Peserta DLC ANFORCOM 2025: Digital Innovation for Prosperous Urban Growth',
    issuer: 'Universitas Diponegoro (FSM)',
    date: '20 Sep 2025',
    credentialId: '363/UN7.F8/HK/IX/2025',
    verifyUrl: '/certificates/anforcom.pdf',
    image: '/certificates/anforcom.png',
  },
  {
    id: 2,
    title: 'Peserta JHIC 2025',
    issuer: 'Jagoan Hosting Infra Competition (JHIC)',
    date: '08–17 Nov 2025',
    credentialId: 'JHIC-2025-PARTICIPANT',
    verifyUrl: '/certificates/jhic.pdf',
    image: '/certificates/jhic.png',
  },
  {
    id: 3,
    title: 'Belajar Dasar Pemrograman Web',
    issuer: 'Dicoding Indonesia',
    date: '06 Nov 2024',
    credentialId: '53XEQK2QYXRN',
    verifyUrl: '/certificates/dicoding.pdf',
    image: '/certificates/dicoding.png',
  },
  {
    id: 4,
    title: 'Sertifikat Dasar Java',
    issuer: 'SoloLearn',
    date: '2024',
    credentialId: 'SOLO-JAVA-BASIC',
    verifyUrl: '/certificates/java.png',
    image: '/certificates/java.png',
  },
  {
    id: 5,
    title: 'Sertifikat Dasar Python',
    issuer: 'SoloLearn',
    date: '2024',
    credentialId: 'SOLO-PY-BASIC',
    verifyUrl: '/certificates/py.png',
    image: '/certificates/py.png',
  },
  {
    id: 6,
    title: 'Sertifikat Lanjut Python',
    issuer: 'SoloLearn',
    date: '2024',
    credentialId: 'SOLO-PY-ADV',
    verifyUrl: '/certificates/pyhard.png',
    image: '/certificates/pyhard.png',
  },
  {
    id: 7,
    title: 'Sertifikat Dasar C#',
    issuer: 'SoloLearn',
    date: '2024',
    credentialId: 'SOLO-CS-BASIC',
    verifyUrl: '/certificates/csharp.png',
    image: '/certificates/csharp.png',
  },
];

/* 3D tilt on mouse move with GSAP */
function useTilt() {
  const ref = useRef<HTMLElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    gsap.to(el, {
      rotationY: x * 6,
      rotationX: -y * 6,
      transformPerspective: 800,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  }, []);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}

function CertCard({ cert }: { cert: Certificate }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt();

  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      className={styles.card}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      aria-label={cert.title}
    >
      {cert.image && (
        <div className={styles.imgWrap}>
          <Image
            src={cert.image}
            alt={`Sertifikat ${cert.title}`}
            width={400}
            height={250}
            className={styles.img}
            loading="lazy"
          />
        </div>
      )}

      <div className={styles.body}>
        <h3 className={styles.title}>{cert.title}</h3>

        <dl className={styles.meta}>
          <div className={styles.metaRow}>
            <dt className="sr-only">Penerbit</dt>
            <dd className={styles.metaItem}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 21V19C19 17.9 18.6 16.9 17.8 16.2C17.1 15.4 16.1 15 15 15H9C7.9 15 6.9 15.4 6.2 16.2C5.4 16.9 5 17.9 5 19V21"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              {cert.issuer}
            </dd>
          </div>
          <div className={styles.metaRow}>
            <dt className="sr-only">Tanggal</dt>
            <dd className={styles.metaItem}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <path d="M16 2V6M8 2V6M3 10H21"/>
              </svg>
              {cert.date}
            </dd>
          </div>
          <div className={styles.metaRow}>
            <dt className="sr-only">ID Kredensial</dt>
            <dd className={`${styles.metaItem} ${styles.credId}`}>
              ID: {cert.credentialId}
            </dd>
          </div>
        </dl>
      </div>

      <div className={styles.footer}>
        <a
          href={cert.verifyUrl}
          className="btn-film btn-film-accent"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Verifikasi kredensial: ${cert.title}`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 13V19C18 20.1 17.1 21 16 21H5C3.9 21 3 20.1 3 19V8C3 6.9 3.9 6 5 6H11"/>
            <path d="M15 3H21V9"/>
            <path d="M10 14L21 3"/>
          </svg>
          Verifikasi Kredensial
        </a>
      </div>
    </article>
  );
}

export default function Certificates() {
  const gridRef = useRef<HTMLDivElement>(null);

  // Stagger cards appearance with GSAP ScrollTrigger
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const motionPref = typeof window !== 'undefined' ? localStorage.getItem('motion_preference') : null;
    const isReduced = motionPref === 'reduced' || (prefersReduced && motionPref !== 'enable');

    const cards = grid.querySelectorAll(`.${styles.card}`);
    if (isReduced) {
      gsap.set(cards, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, grid);

    return () => ctx.revert();
  }, []);

  return (
    <section id="certificates" className={styles.section} aria-label="Sertifikat">
      <div className="container">
        <header className={styles.header}>
          <span className="section-label">04 / SERTIFIKASI</span>
          <h2 className="section-title">Sertifikat Terverifikasi</h2>
          <p className="section-subtitle" style={{ marginTop: '1rem' }}>
            Validasi kompetensi teknis dan komitmen berkelanjutan terhadap pertumbuhan profesional.
          </p>
        </header>

        <div ref={gridRef} className={styles.grid} role="list">
          {certificates.map((cert) => (
            <div key={cert.id} role="listitem">
              <CertCard cert={cert} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
