'use client';

import { useEffect, useRef } from 'react';
import styles from './About.module.css';

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.visible);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <section id="about" className={styles.about} ref={sectionRef}>
            <div className="container">
                <header className="section-heading">
                    <span className="section-label">Biography</span>
                    <h2 className="section-title">Azzam Fajro</h2>
                    <p className="section-subtitle">
                        A dedicated software engineer crafting scalable solutions and
                        seamless digital experiences.
                    </p>
                </header>

                <div className={styles.mainContent}>
                    <div className={styles.textSection}>
                        <p className={styles.paragraph}>
                            Developer berbasis di Indonesia dengan pengalaman hands-on dalam pengembangan solusi teknologi
                            yang scalable dan user-centric. Saat ini menjalani internship di PT Ubig.id, berkontribusi pada
                            proyek-proyek yang menuntut inovasi dan deliverables berdampak nyata.
                        </p>
                        <p className={styles.paragraph}>
                            Filosofi Kerja: Saya meyakini bahwa software excellence lahir dari perpaduan teknis yang kuat
                            dan empati terhadap pengguna. Setiap baris kode harus melayani tujuan bisnis sekaligus pengalaman
                            pengguna yang seamless.
                        </p>
                        <p className={styles.paragraph}>
                            Beyond Coding: Aktif mengikuti perkembangan teknologi terkini, berkontribusi pada ekosistem
                            open-source, dan berbagi pengetahuan dengan komunitas developer. Komitmen pada continuous learning
                            dan collaborative growth.
                        </p>
                    </div>

                    <div className={styles.statsSection}>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>01</span>
                            <span className={styles.statLabel}>Peran Internship</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>03</span>
                            <span className={styles.statLabel}>Fokus Utama: Scalable, User-Centric, Impactful</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>100%</span>
                            <span className={styles.statLabel}>Komitmen pada Continuous Learning</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>24/7</span>
                            <span className={styles.statLabel}>Kolaborasi dan Berbagi Pengetahuan</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
