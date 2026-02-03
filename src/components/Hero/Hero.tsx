'use client';

import { useEffect, useState } from 'react';
import styles from './Hero.module.css';

const roles = ['Full Stack Developer', 'UI/UX Designer', 'Software Engineer'];

export default function Hero() {
    const [currentRole, setCurrentRole] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const typeSpeed = isDeleting ? 50 : 100;
        const currentFullText = roles[currentRole];

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                setDisplayText(currentFullText.substring(0, displayText.length + 1));
                if (displayText === currentFullText) {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                setDisplayText(currentFullText.substring(0, displayText.length - 1));
                if (displayText === '') {
                    setIsDeleting(false);
                    setCurrentRole((prev) => (prev + 1) % roles.length);
                }
            }
        }, typeSpeed);

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, currentRole]);

    return (
        <section id="home" className={styles.hero}>
            <div className={styles.bgElements}>
                <div className={styles.orb1}></div>
                <div className={styles.orb2}></div>
                <div className={styles.orb3}></div>
                <div className={styles.grid}></div>
            </div>

            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.badge}>
                        <span className={styles.badgeDot}></span>
                        Available for work
                    </div>

                    <h1 className={styles.title}>
                        Hi, I&apos;m <span className={styles.name}>Azzam Fajro</span>
                    </h1>

                    <div className={styles.roleWrapper}>
                        <span className={styles.roleLabel}>I&apos;m a</span>
                        <span className={styles.role}>
                            {displayText}
                            <span className={styles.cursor}>|</span>
                        </span>
                    </div>

                    <p className={styles.description}>
                        Passionate about creating beautiful, functional, and user-centered digital experiences.
                        I bring ideas to life through clean code and creative design.
                    </p>

                    <div className={styles.cta}>
                        <a href="#projects" className={styles.btnPrimary}>
                            <span>View My Work</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                        <a href="#contact" className={styles.btnSecondary}>
                            <span>Get In Touch</span>
                        </a>
                    </div>

                    <div className={styles.stats}>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>5+</span>
                            <span className={styles.statLabel}>Years Experience</span>
                        </div>
                        <div className={styles.statDivider}></div>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>50+</span>
                            <span className={styles.statLabel}>Projects Completed</span>
                        </div>
                        <div className={styles.statDivider}></div>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>30+</span>
                            <span className={styles.statLabel}>Happy Clients</span>
                        </div>
                    </div>
                </div>

                <div className={styles.visual}>
                    <div className={styles.imageWrapper}>
                        <div className={styles.imageFrame}>
                            <div className={styles.imagePlaceholder}>
                                <span className={styles.avatarEmoji}>👨‍💻</span>
                            </div>
                        </div>
                        <div className={styles.floatingCard1}>
                            <span>🚀</span>
                            <span>React Expert</span>
                        </div>
                        <div className={styles.floatingCard2}>
                            <span>💡</span>
                            <span>Creative Thinker</span>
                        </div>
                        <div className={styles.floatingCard3}>
                            <span>🎨</span>
                            <span>UI Designer</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.scrollIndicator}>
                <div className={styles.mouse}>
                    <div className={styles.wheel}></div>
                </div>
                <span>Scroll Down</span>
            </div>
        </section>
    );
}
