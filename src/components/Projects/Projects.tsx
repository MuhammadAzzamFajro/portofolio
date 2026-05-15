'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import styles from './Projects.module.css';

interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    tags: string[];
    category: string;
    liveUrl: string;
    githubUrl: string;
    detailUrl?: string;
}

const projects: Project[] = [
    {
        id: 1,
        title: 'ESCHOOL',
        description: 'Sistem Informasi Akademik sekolah berbasis multi-tenant web.',
        image: '/eschool_official.png',
        tags: ['Laravel', 'MySQL', 'Multi-tenant'],
        category: 'Aplikasi Web',
        liveUrl: 'https://eschool.ac.id/',
        githubUrl: '#',
    },
    {
        id: 2,
        title: 'NoctuaNovel',
        description: 'Platform baca novel online modern dengan fitur scraping real-time, manajemen chapter, dan antarmuka imersif.',
        image: '/noctua_novel.png',
        tags: ['Next.js', 'Tailwind', 'Flask', 'Supabase'],
        category: 'Aplikasi Web',
        liveUrl: 'https://noctua-novel.vercel.app/',
        githubUrl: 'https://github.com/SahrulRamadhanHardiansyah/noctua-novel',
    },
    {
        id: 3,
        title: 'F1 Hub',
        description: 'Portal informasi lengkap Formula 1 yang terintegrasi.',
        image: '/f1hub.png',
        tags: ['React', 'Tailwind', 'F1 API'],
        category: 'Aplikasi Web',
        liveUrl: 'https://websitef1-kappa.vercel.app/',
        githubUrl: '#',
    },
    {
        id: 4,
        title: 'Java Snake Game',
        description: 'Game ular klasik yang dibangun menggunakan Java Swing.',
        image: '/snake_game.png',
        tags: ['Java', 'Swing', 'Canvas API'],
        category: 'Desktop App',
        liveUrl: '#',
        githubUrl: 'https://github.com/MuhammadAzzamFajro/snake-java',
        detailUrl: '/snake',
    },
    {
        id: 5,
        title: 'Sistem Menu Makanan',
        description: 'Aplikasi manajemen pesanan makanan berbasis Java.',
        image: '/menu_makanan.png',
        tags: ['Java', 'CLI', 'Order System'],
        category: 'Desktop App',
        liveUrl: '#',
        githubUrl: 'https://github.com/MuhammadAzzamFajro/menu-makanan-java',
        detailUrl: '/menu',
    },
];

const categories = ['Semua', 'Aplikasi Web', 'Desktop App'];

export default function Projects() {
    const [mounted, setMounted] = useState(false);
    const [activeCategory, setActiveCategory] = useState('Semua');

    useEffect(() => {
        setMounted(true);
    }, []);

    const filteredProjects = useMemo(() => {
        return projects.filter(
            project => activeCategory === 'Semua' || project.category === activeCategory
        );
    }, [activeCategory]);

    if (!mounted) return null;

    return (
        <section id="projects" className={styles.projects}>
            <div className="container">
                <header className={styles.minimalHeader}>
                    <h2 className={styles.minimalTitle}>Portfolio</h2>
                    <p className={styles.minimalSubtitle}>Eksplorasi proyek pengembangan web dan aplikasi.</p>
                </header>

                <div className={styles.filters}>
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`${styles.filterBtn} ${activeCategory === category ? styles.active : ''}`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                
                <div className={styles.grid}>
                    {filteredProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className={`${styles.projectCard} glass`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className={styles.projectImage}>
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority={index < 2}
                                    className={styles.actualImage}
                                />
                                <div className={styles.overlay}>
                                    <div className={styles.overlayButtons}>
                                        {project.liveUrl !== '#' && (
                                            <a href={project.liveUrl} className={styles.overlayBtn} target="_blank" rel="noopener noreferrer">
                                                Live Demo
                                            </a>
                                        )}
                                        {project.detailUrl && (
                                            <Link href={project.detailUrl} className={styles.overlayBtn}>
                                                Detail
                                            </Link>
                                        )}
                                        <a href={project.githubUrl} className={styles.overlayBtn} target="_blank" rel="noopener noreferrer">
                                            Source
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.projectContent}>
                                <div className={styles.contentTop}>
                                    <h3 className={styles.projectTitle}>{project.title}</h3>
                                    <span className={styles.projectCategory}>{project.category}</span>
                                </div>
                                <p className={styles.projectDescription}>{project.description}</p>
                                <div className={styles.tags}>
                                    {project.tags.map((tag) => (
                                        <span key={tag} className={styles.tag}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
