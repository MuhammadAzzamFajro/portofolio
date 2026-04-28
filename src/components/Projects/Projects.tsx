'use client';

import { useState } from 'react';
import Image from 'next/image';
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
    isFeatured?: boolean;
}

const projects: Project[] = [
    {
        id: 1,
        title: 'Personal Portfolio Website',
        description: 'A modern, high-performance portfolio website built with Next.js 14, React, and TypeScript. Features include a fully responsive design, custom animations, dark mode aesthetics, and dynamic content rendering.',
        image: '/porto_land.png',
        tags: ['Next.js 14', 'TypeScript', 'React', 'CSS Modules'],
        category: 'Web App',
        liveUrl: '#',
        githubUrl: '#',
        isFeatured: true,
    },
    {
        id: 2,
        title: 'SIAKAD PLUS (ESCHOOL)',
        description: 'Sistem Informasi Akademik sekolah berbasis multi-tenant web dengan fitur dashboard terintegrasi, pemantauan pembayaran (fees), dan rekapitulasi data absensi real-time.',
        image: '/eschool_official.png',
        tags: ['Laravel', 'Multi-tenant', 'Bootstrap', 'MySQL'],
        category: 'Web App',
        liveUrl: 'https://eschool.ac.id/',
        githubUrl: '#',
    },
    {
        id: 3,
        title: 'Task Management System',
        description: 'Collaborative task management tool with drag-and-drop kanban boards, team collaboration features, and productivity analytics.',
        image: '/taskman.png',
        tags: ['Vue.js', 'Firebase', 'Tailwind', 'PWA'],
        category: 'Web App',
        liveUrl: '#',
        githubUrl: '#',
    },
];

const categories = ['Semua', 'Web App', 'Mobile', 'AI/ML'];

export default function Projects() {
    const [activeCategory, setActiveCategory] = useState('Semua');

    const filteredProjects = projects.filter(
        project => activeCategory === 'Semua' || project.category === activeCategory
    );


    return (
        <section id="projects" className={styles.projects}>
            <div className="container">
                <header className="section-heading">
                    <span className="section-label">Selected Works</span>
                    <h2 className="section-title">Built with <br /> Precision</h2>
                    <p className="section-subtitle">
                        A curated collection of projects that demonstrate my commitment
                        to engineering excellence and user-centric design.
                    </p>
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
                            className={`${styles.projectCard} glass ${project.isFeatured ? styles.featured : ''}`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className={styles.projectImage}>
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    layout="fill"
                                    objectFit="cover"
                                    objectPosition="center"
                                    className={styles.actualImage}
                                />
                                {project.isFeatured && <span className={styles.featuredBadge}>Unggulan</span>}
                                <div className={styles.overlay}>
                                    <div className={styles.overlayButtons}>
                                        <a href={project.liveUrl} className={styles.overlayBtn} target="_blank" rel="noopener noreferrer">
                                            <FaExternalLinkAlt /> Demo Langsung
                                        </a>
                                        <a href={project.githubUrl} className={styles.overlayBtn} target="_blank" rel="noopener noreferrer">
                                            <FaGithub /> Sumber
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.projectContent}>
                                <span className={styles.projectCategory}>{project.category}</span>
                                <h3 className={styles.projectTitle}>{project.title}</h3>
                                <p className={styles.projectDescription}>{project.description}</p>
                                <div className={styles.tags}>
                                    {project.tags.map((tag) => (
                                        <span key={tag} className={styles.tag}>{tag}</span>
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
