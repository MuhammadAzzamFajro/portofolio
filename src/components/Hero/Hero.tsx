'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';

const roles = ['Full Stack Developer', 'UI/UX Designer', 'Software Engineer'];

export default function Hero() {
    const [currentRole, setCurrentRole] = useState(0);
    const [charIndex, setCharIndex] = useState<number>(0);
    const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing');

    useEffect(() => {
        const currentFullText = roles[currentRole];
        let delay = 90;

        if (phase === 'typing') {
            if (charIndex < currentFullText.length) {
                const timer = setTimeout(() => setCharIndex((prev: number) => prev + 1), delay);
                return () => clearTimeout(timer);
            }

            setPhase('pausing');
            return;
        }

        if (phase === 'pausing') {
            delay = 1400;
            const timer = setTimeout(() => setPhase('deleting'), delay);
            return () => clearTimeout(timer);
        }

        if (charIndex > 0) {
            delay = 55;
            const timer = setTimeout(() => setCharIndex((prev: number) => prev - 1), delay);
            return () => clearTimeout(timer);
        }

        setCurrentRole((prev: number) => (prev + 1) % roles.length);
        setPhase('typing');
    }, [currentRole, charIndex, phase]);

    const displayText = roles[currentRole].slice(0, charIndex);

    return (
        <section id="home" className={styles.hero}>
            <div className={styles.ambientGlow}>
                <div className={styles.glow1}></div>
                <div className={styles.glow2}></div>
            </div>

            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.content}>
                        <div className={styles.badge}>
                            <div className={styles.pulseDot}></div>
                            <span>Available for new projects</span>
                        </div>

                        <h1 className={styles.title}>
                            Crafting Digital <span className={styles.gradientText}>Masterpieces</span>
                        </h1>

                        <div className={styles.roleWrapper}>
                            <div className={styles.roleHeader}>Specializing in</div>
                            <div className={styles.roleBody}>
                                {displayText}
                                <span className={styles.cursor}>_</span>
                            </div>
                        </div>

                        <p className={styles.description}>
                            Hi, I'm <strong>Azzam Fajro</strong>. I build high-performance,
                            accessible, and visually stunning web applications that make
                            an impact.
                        </p>

                        <div className={styles.actions}>
                            <a href="#projects" className="btn-premium">
                                View Projects
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                            <a href="#contact" className={styles.btnSecondary}>
                                Get in Touch
                            </a>
                        </div>
                    </div>

                    <div className={styles.visualContainer}>
                        <div className={styles.imageBackdrop}></div>
                        <div className={styles.imageWrapper}>
                            <Image
                                src="/premium-avatar.png"
                                alt="Azzam Fajro 3D"
                                width={500}
                                height={500}
                                className={styles.avatarImg}
                                priority
                            />

                            <div className={`${styles.floatCard} ${styles.card1}`}>
                                <div className={styles.cardIcon}>⚡</div>
                                <div className={styles.cardText}>
                                    <span>Fast Performance</span>
                                    <small>99+ Core Web Vitals</small>
                                </div>
                            </div>

                            <div className={`${styles.floatCard} ${styles.card2}`}>
                                <div className={styles.cardIcon}>🎨</div>
                                <div className={styles.cardText}>
                                    <span>Pixel Perfect</span>
                                    <small>Modern UI/UX</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.scrollDown}>
                <div className={styles.mouse}>
                    <div className={styles.wheel}></div>
                </div>
                <span>SCROLL</span>
            </div>
        </section>
    );
}

