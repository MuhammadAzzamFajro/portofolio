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
        title: 'Website Portofolio Pribadi',
        description: 'Website portofolio modern berperforma tinggi yang dibangun dengan Next.js 14, React, dan TypeScript. Mendukung responsivitas penuh, animasi kustom, estetika mode gelap, dan rendering konten dinamis.',
        image: '/porto_land.png',
        tags: ['Next.js 14', 'TypeScript', 'React', 'CSS Modules'],
        category: 'Aplikasi Web',
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
        category: 'Aplikasi Web',
        liveUrl: 'https://eschool.ac.id/',
        githubUrl: '#',
    },
    {
        id: 3,
        title: 'Sistem Manajemen Tugas',
        description: 'Alat manajemen tugas kolaboratif dengan papan kanban drag-and-drop, fitur kolaborasi tim, dan analitik produktivitas.',
        image: '/taskman.png',
        tags: ['Vue.js', 'Firebase', 'Tailwind', 'PWA'],
        category: 'Aplikasi Web',
        liveUrl: '#',
        githubUrl: '#',
    },
];

export default function Projects() {
    const [activeCategory, setActiveCategory] = useState('Semua');

    const filteredProjects = projects.filter(
        project => activeCategory === 'Semua' || project.category === activeCategory
    );


    return (
        <section id="projects" className={styles.projects}>
            <div className="container">
                <header className="section-heading">
                    <span className="section-label">Karya Pilihan</span>
                    <h2 className="section-title">Dibangun dengan <br /> Presisi</h2>
                    <p className="section-subtitle">
                        Kumpulan proyek pilihan yang menunjukkan komitmen saya terhadap
                        keunggulan teknis dan desain yang berpusat pada pengguna.
                    </p>
                </header>


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
