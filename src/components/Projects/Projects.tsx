'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Projects.module.css';
import projects from '@/data/projects';
import gallery, { type GalleryFrame } from '@/data/gallery';

gsap.registerPlugin(ScrollTrigger);

/* ─── Lightbox ─── */
interface LightboxProps {
  frames: GalleryFrame[];
  initial: number;
  onClose: () => void;
}

function Lightbox({ frames, initial, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initial);
  const dialogRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);

  const prev = useCallback(() => setIndex((i) => (i - 1 + frames.length) % frames.length), [frames.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % frames.length), [frames.length]);

  useEffect(() => {
    document.body.classList.add('lightbox-open');
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    dialogRef.current?.focus();

    // Shared-element scale entrance
    if (dialogRef.current) {
      gsap.fromTo(
        dialogRef.current,
        { scale: 0.88, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.35, ease: 'expo.out' }
      );
    }

    // URL param
    const url = new URL(window.location.href);
    url.searchParams.set('frame', String(index + 1).padStart(2, '0'));
    window.history.replaceState(null, '', url.toString());

    return () => {
      document.body.classList.remove('lightbox-open');
      window.removeEventListener('keydown', onKey);
      const clean = new URL(window.location.href);
      clean.searchParams.delete('frame');
      window.history.replaceState(null, '', clean.toString());
    };
  }, []); // eslint-disable-line

  // Crossfade and subtle slide transition when switching frames
  useEffect(() => {
    if (imgWrapRef.current) {
      gsap.fromTo(
        imgWrapRef.current,
        { opacity: 0.2, x: 10 },
        { opacity: 1, x: 0, duration: 0.28, ease: 'power2.out' }
      );
    }
    const url = new URL(window.location.href);
    url.searchParams.set('frame', String(index + 1).padStart(2, '0'));
    window.history.replaceState(null, '', url.toString());
  }, [index]);

  const frame = frames[index];
  if (!frame) return null;

  return (
    <div
      className={styles.lightboxOverlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Lightbox: ${frame.alt}`}
    >
      <div
        ref={dialogRef}
        className={styles.lightboxInner}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {/* Top bar */}
        <div className={styles.lightboxTop}>
          <span className={styles.lightboxCode}>{frame.code}</span>
          <span className={styles.lightboxCounter}>
            {index + 1} / {frames.length}
          </span>
          <button className={styles.lightboxClose} onClick={onClose} aria-label="Tutup lightbox">
            ×
          </button>
        </div>

        {/* Image */}
        <div ref={imgWrapRef} className={styles.lightboxImgWrap}>
          {frame.blur ? (
            <div className={styles.blurredFrame} aria-label="Konten dikaburkan (data sensitif)" />
          ) : (
            <Image
              src={frame.src}
              alt={frame.alt}
              fill
              style={{ objectFit: 'contain' }}
              sizes="(max-width: 768px) 100vw, 90vw"
              priority
            />
          )}
        </div>

        {/* Caption */}
        {frame.caption && (
          <p className={styles.lightboxCaption}>{frame.caption}</p>
        )}

        {/* Navigation */}
        {frames.length > 1 && (
          <>
            <button
              className={`${styles.lightboxNav} ${styles.lightboxNavPrev}`}
              onClick={prev}
              aria-label="Frame sebelumnya"
            >
              ←
            </button>
            <button
              className={`${styles.lightboxNav} ${styles.lightboxNavNext}`}
              onClick={next}
              aria-label="Frame berikutnya"
            >
              →
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Contact Sheet (gallery per project) ─── */
interface ContactSheetProps {
  projectId: string;
  onFrameClick: (frames: GalleryFrame[], index: number) => void;
}

function ContactSheet({ projectId, onFrameClick }: ContactSheetProps) {
  const projectGallery = gallery.find((g) => g.projectId === projectId);
  const frames = projectGallery?.frames.filter((f) => !f.hidden) ?? [];
  const sheetRef = useRef<HTMLDivElement>(null);

  // Efek developing dengan GSAP: grayscale, gelap, buram -> berwarna penuh stagger 110ms
  useEffect(() => {
    const sheet = sheetRef.current;
    if (!sheet) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const motionPref = typeof window !== 'undefined' ? localStorage.getItem('motion_preference') : null;
    const isReduced = motionPref === 'reduced' || (prefersReduced && motionPref !== 'enable');

    const frameEls = sheet.querySelectorAll<HTMLElement>(`.${styles.frameImg}`);
    if (isReduced) {
      gsap.set(frameEls, { filter: 'none' });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        frameEls,
        { filter: 'grayscale(100%) brightness(0.25) blur(4px)' },
        {
          filter: 'grayscale(0%) brightness(1) blur(0px)',
          duration: 0.9,
          stagger: 0.11, // ±110ms
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sheet,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sheet);

    return () => ctx.revert();
  }, []);

  if (frames.length === 0) return null;

  return (
    <div ref={sheetRef} className={styles.contactSheet} aria-label={`Galeri ${projectId}`}>
      {/* Perforation top */}
      <div className={`perforation ${styles.perfTop}`} aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="perforation-hole" />
        ))}
      </div>

      {/* Frames grid */}
      <div className={styles.framesGrid}>
        {frames.map((frame, i) => (
          <button
            key={frame.code}
            className={`${styles.frame} ${
              frame.size === 'wide' ? styles.frameWide :
              frame.size === 'tall' ? styles.frameTall : ''
            }`}
            onClick={() => onFrameClick(frames, i)}
            aria-label={`Buka frame ${frame.code}: ${frame.alt}`}
            title={frame.caption}
          >
            <div className={styles.frameImg}>
              {frame.blur ? (
                <div className={styles.blurThumb} aria-hidden="true" />
              ) : (
                <Image
                  src={frame.src}
                  alt={frame.alt}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 640px) 50vw, 280px"
                  loading="lazy"
                />
              )}
            </div>
            <div className={styles.frameFooter}>
              <span className="frame-code">{frame.code}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Perforation bottom */}
      <div className={`perforation ${styles.perfBottom}`} aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="perforation-hole" />
        ))}
      </div>
    </div>
  );
}

/* ─── Film Roll (single project) ─── */
interface FilmRollProps {
  project: typeof projects[0];
  index: number;
}

function FilmRoll({ project, index }: FilmRollProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxFrames, setLightboxFrames] = useState<GalleryFrame[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const rollRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const openLightbox = (frames: GalleryFrame[], i: number) => {
    setLightboxFrames(frames);
    setLightboxIndex(i);
    setLightboxOpen(true);
  };

  // Parallax contact sheet (±36px scrub) & rollInfo entrance from left
  useEffect(() => {
    const roll = rollRef.current;
    if (!roll) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const motionPref = typeof window !== 'undefined' ? localStorage.getItem('motion_preference') : null;
    const isReduced = motionPref === 'reduced' || (prefersReduced && motionPref !== 'enable');

    if (isReduced) return;

    const ctx = gsap.context(() => {
      const sheet = roll.querySelector(`.${styles.contactSheet}`);
      const info = roll.querySelector(`.${styles.rollInfo}`);

      if (sheet) {
        gsap.fromTo(
          sheet,
          { y: -36 },
          {
            y: 36,
            ease: 'none',
            scrollTrigger: {
              trigger: roll,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      if (info) {
        gsap.fromTo(
          info,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: roll,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, roll);

    return () => ctx.revert();
  }, []);

  // Hover proyek: preview frame mengambang mengikuti kursor dengan lerp (desktop)
  useEffect(() => {
    const roll = rollRef.current;
    const preview = previewRef.current;
    if (!roll || !preview) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const setX = gsap.quickTo(preview, 'x', { duration: 0.28, ease: 'power2.out' });
    const setY = gsap.quickTo(preview, 'y', { duration: 0.28, ease: 'power2.out' });

    const onMouseMove = (e: MouseEvent) => {
      setX(e.clientX + 20);
      setY(e.clientY + 20);
    };

    const onMouseEnter = () => {
      gsap.to(preview, { opacity: 1, scale: 1, duration: 0.25, ease: 'power2.out' });
    };

    const onMouseLeave = () => {
      gsap.to(preview, { opacity: 0, scale: 0.85, duration: 0.25, ease: 'power2.out' });
    };

    roll.addEventListener('mousemove', onMouseMove);
    roll.addEventListener('mouseenter', onMouseEnter);
    roll.addEventListener('mouseleave', onMouseLeave);

    return () => {
      roll.removeEventListener('mousemove', onMouseMove);
      roll.removeEventListener('mouseenter', onMouseEnter);
      roll.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  const accentVar = `var(--frame-${project.accentColor})`;
  const isEven = index % 2 === 0;
  const projectGallery = gallery.find((g) => g.projectId === project.id);
  const previewImage = projectGallery?.frames.find((f) => !f.blur)?.src;

  return (
    <>
      <article
        ref={rollRef}
        className={`${styles.roll} ${isEven ? '' : styles.rollReverse}`}
        id={`project-${project.id}`}
        aria-label={`Proyek ${project.title}`}
      >
        {/* Floating preview badge for desktop hover */}
        {previewImage && (
          <div ref={previewRef} className={styles.floatingPreview} aria-hidden="true">
            <Image
              src={previewImage}
              alt=""
              fill
              style={{ objectFit: 'cover' }}
              sizes="140px"
            />
          </div>
        )}

        {/* Roll header strip */}
        <div className={styles.rollHeader} style={{ borderColor: accentVar }}>
          <span className={styles.rollNumber} style={{ color: accentVar }}>
            ROLL {project.roll}
          </span>
          <span className={styles.rollRule} style={{ background: accentVar }} />
        </div>

        {/* Two-column layout: info + gallery */}
        <div className={styles.rollBody}>
          {/* Info column */}
          <div className={styles.rollInfo}>
            <h3 className={styles.rollTitle}>{project.title}</h3>

            {project.year && (
              <span className={styles.rollYear}>{project.year}</span>
            )}

            <p className={styles.rollDesc}>{project.description}</p>

            {/* Stack */}
            <ul className={styles.stack} aria-label="Teknologi">
              {project.stack.map((s) => (
                <li key={s} className={styles.stackItem}>{s}</li>
              ))}
            </ul>

            {/* Actions */}
            <div className={styles.rollActions}>
              {project.demoUrl && (
                <Link href={project.demoUrl} className="btn-film btn-film-accent">
                  ▶ Main Demo
                </Link>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-film">
                  ↗ Kunjungi
                </a>
              )}
              {project.githubUrl && !project.isPrivateRepo && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-film">
                  ⌥ GitHub
                </a>
              )}
              {project.isPrivateRepo && (
                <span className={styles.privateTag}>Repo Privat</span>
              )}
            </div>
          </div>

          {/* Gallery column */}
          <div className={styles.rollGallery}>
            <ContactSheet projectId={project.id} onFrameClick={openLightbox} />
          </div>
        </div>
      </article>

      {lightboxOpen && (
        <Lightbox
          frames={lightboxFrames}
          initial={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}

/* ─── Projects section ─── */
export default function Projects() {
  return (
    <section id="projects" className={styles.section} aria-label="Proyek">
      <div className="container">
        <header className={styles.header}>
          <span className="section-label">02 / GULUNGAN FILM</span>
          <h2 className="section-title">Arsip Proyek</h2>
        </header>

        <div className={styles.rolls}>
          {projects.map((p, i) => (
            <FilmRoll key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
