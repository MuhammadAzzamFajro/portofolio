'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './History.module.css';

gsap.registerPlugin(ScrollTrigger);

interface Milestone {
  code: string;
  label: string;
  sub: string;
  note?: string;
}

const MILESTONES: Milestone[] = [
  {
    code: 'A',
    label: 'SMKN 1 Bangil',
    sub: 'Rekayasa Perangkat Lunak',
    note: 'Pendidikan formal teknik perangkat lunak',
  },
  {
    code: 'B',
    label: 'PT Ubig.id',
    sub: 'Magang — Selesai',
    note: 'Kontribusi pada proyek enterprise nyata',
  },
  {
    code: 'C',
    label: 'Freelancer',
    sub: 'Laravel · Next.js',
    note: 'Menerima proyek web — saat ini aktif',
  },
];

export default function History() {
  const lineRef = useRef<SVGLineElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const line = lineRef.current;
    const section = sectionRef.current;
    if (!line || !section) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const motionPref = typeof window !== 'undefined' ? localStorage.getItem('motion_preference') : null;
    const isReduced = motionPref === 'reduced' || (prefersReduced && motionPref !== 'enable');

    const totalLen = line.getTotalLength?.() ?? 400;

    const ctx = gsap.context(() => {
      if (isReduced) {
        gsap.set(line, { strokeDasharray: 'none', strokeDashoffset: 0 });
        rowRefs.current.forEach((row) => {
          if (!row) return;
          const dot = row.querySelector(`.${styles.dot}`);
          const card = row.querySelector(`.${styles.card}`);
          gsap.set([dot, card], { opacity: 1, scale: 1, y: 0 });
        });
        return;
      }

      // 1. Garis kuning menggambar dirinya mengikuti progres scroll (scrub)
      gsap.set(line, {
        strokeDasharray: totalLen,
        strokeDashoffset: totalLen,
      });

      gsap.to(line, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          end: 'bottom 85%',
          scrub: true,
        },
      });

      // 2. Tiap titik berbentuk frame film muncul dengan pop kecil, lalu teks naik dan muncul
      rowRefs.current.forEach((row) => {
        if (!row) return;
        const dot = row.querySelector(`.${styles.dot}`);
        const card = row.querySelector(`.${styles.card}`);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        });

        tl.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }
        ).fromTo(
          card,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' },
          '-=0.25'
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="history" ref={sectionRef} className={styles.section} aria-label="Riwayat">
      <div className={`container ${styles.inner}`}>
        <header className={styles.header}>
          <span className="section-label">01 / RIWAYAT</span>
          <h2 className="section-title">Perjalanan</h2>
        </header>

        <div className={styles.timeline}>
          {/* SVG vertical connecting line */}
          <svg
            className={styles.lineSvg}
            aria-hidden="true"
            preserveAspectRatio="none"
          >
            <line
              ref={lineRef}
              x1="50%" y1="0"
              x2="50%" y2="100%"
              stroke="var(--yellow)"
              strokeWidth="2"
            />
          </svg>

          {MILESTONES.map((m, i) => (
            <div
              key={m.code}
              ref={(el) => { rowRefs.current[i] = el; }}
              className={`${styles.row} ${i % 2 === 1 ? styles.rowRight : ''}`}
            >
              {/* Film frame dot */}
              <div className={styles.dot} aria-hidden="true">
                <span className={styles.dotCode}>{m.code}</span>
              </div>

              {/* Content */}
              <div className={styles.card}>
                <div className="perforation" aria-hidden="true">
                  {Array.from({ length: 8 }).map((_, j) => (
                    <span key={j} className="perforation-hole" />
                  ))}
                  <span className="frame-code" style={{ marginLeft: 'auto' }}>
                    HISTORY {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{m.label}</h3>
                  <p className={styles.cardSub}>{m.sub}</p>
                  {m.note && <p className={styles.cardNote}>{m.note}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
