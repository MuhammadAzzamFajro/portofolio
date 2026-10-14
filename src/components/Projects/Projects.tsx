'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt, FaGamepad, FaLock } from 'react-icons/fa';
import styles from './Projects.module.css';

interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    tags: string[];
    category: 'Aplikasi Web' | 'Desktop App';
    liveUrl: string;
    githubUrl: string;
    detailUrl?: string;
    isPrivate?: boolean;
}

const projects: Project[] = [
    {
        id: 1,
        title: 'ESCHOOL Official',
        description: 'Sistem Informasi Manajemen Sekolah (SIS) multi-tenant berbasis SaaS, menangani ribuan siswa, absensi otomatis, tagihan SPP online, dan tata kelola akademik.',
        image: '/eschool_official.png',
        tags: ['Laravel', 'MySQL Multi-Tenant', 'Blade', 'Bootstrap'],
        category: 'Aplikasi Web',
        liveUrl: 'https://eschool.ac.id/',
        githubUrl: '#',
        isPrivate: true,
    },
    {
        id: 2,
        title: 'NoctuaNovel',
        description: 'Platform baca novel daring modern dengan modul scraping real-time, manajemen chapter interaktif, dan reader mode yang nyaman.',
        image: '/noctua_novel.png',
        tags: ['Next.js 14', 'Tailwind CSS', 'Flask', 'Supabase'],
        category: 'Aplikasi Web',
        liveUrl: 'https://noctua-novel.vercel.app/',
        githubUrl: 'https://github.com/SahrulRamadhanHardiansyah/noctua-novel',
    },
    {
        id: 3,
        title: 'F1 Hub Indonesia',
        description: 'Portal analitik dan informasi Formula 1 terintegrasi dengan jadwal balapan real-time, klasemen pembalap, dan statistik sirkuit.',
        image: '/f1hub.png',
        tags: ['React', 'Tailwind CSS', 'F1 Live API', 'Vite'],
        category: 'Aplikasi Web',
        liveUrl: 'https://websitef1-kappa.vercel.app/',
        githubUrl: 'https://github.com/MuhammadAzzamFajro',
    },
    {
        id: 4,
        title: 'Task & Internship Manager',
        description: 'Aplikasi manajemen tugas dan pemantauan aktivitas magang siswa dengan sistem pelaporan terstruktur serta analitik progres kerja.',
        image: '/taskman.png',
        tags: ['Laravel', 'Next.js', 'PostgreSQL', 'REST API'],
        category: 'Aplikasi Web',
        liveUrl: '#',
        githubUrl: 'https://github.com/MuhammadAzzamFajro',
    },
    {
        id: 5,
        title: 'Java Snake Game',
        description: 'Game arcade ular retro dengan grafis 2D kustom, deteksi tabrakan akurat, audio feedback, dan sistem skor dinamis yang di-porting ke web.',
        image: '/snake_game.png',
        tags: ['Java', 'Swing Canvas', 'OOP Architecture', 'Web Port'],
        category: 'Desktop App',
        liveUrl: '#',
        githubUrl: 'https://github.com/MuhammadAzzamFajro/snake-java',
        detailUrl: '/snake',
    },
    {
        id: 6,
        title: 'Sistem POS Menu Makanan',
        description: 'Aplikasi kasir dan manajemen pesanan restoran interaktif dengan kalkulasi nota otomatis, simulasi struk, dan pencatatan menu.',
        image: '/menu_makanan.png',
        tags: ['Java', 'CLI / GUI', 'Order System', 'Web Simulator'],
        category: 'Desktop App',
        liveUrl: '#',
        githubUrl: 'https://github.com/MuhammadAzzamFajro/menu-makanan-java',
        detailUrl: '/menu',
    },
];

const categories = ['Semua', 'Aplikasi Web', 'Desktop App'];

export default function Projects() {
    const [activeCategory, setActiveCategory] = useState('Semua');

    const filteredProjects = useMemo(() => {
        return projects.filter(
            project => activeCategory === 'Semua' || project.category === activeCategory
        );
    }, [activeCategory]);

    return (
        <section id="projects" className={styles.projects}>
            <div className="container">
                <header className="section-heading">
                    <span className="section-label">Proyek Pilihan</span>
                    <h2 className="section-title">Karya &amp; <br /> Inovasi Pilihan</h2>
                    <p className="section-subtitle">
                        Koleksi aplikasi web berskala penuh, solusi enterprise, dan software rekayasa sistem yang dirancang dengan performa serta pengalaman pengguna optimal.
                    </p>
                </header>

                <div className={styles.filters}>
                    {categories.map((category) => {
                        const count = category === 'Semua'
                            ? projects.length
                            : projects.filter(p => p.category === category).length;
                        return (
                            <button
                                key={category}
                                className={`${styles.filterBtn} ${activeCategory === category ? styles.active : ''}`}
                                onClick={() => setActiveCategory(category)}
                            >
                                <span>{category}</span>
                                <span className={styles.filterCount}>{count}</span>
                            </button>
                        );
                    })}
                </div>

                <div className={styles.grid}>
                    {filteredProjects.map((project, index) => (
                        <article
                            key={project.id}
                            className={`${styles.projectCard} glass`}
                        >
                            <div className={styles.projectImage}>
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    width={600}
                                    height={340}
                                    className={styles.actualImage}
                                    priority={index < 2}
                                    unoptimized
                                />
                                <div className={styles.categoryBadge}>
                                    <span>{project.category}</span>
                                </div>
                            </div>

                            <div className={styles.projectContent}>
                                <h3 className={styles.projectTitle}>{project.title}</h3>
                                <p className={styles.projectDescription}>{project.description}</p>

                                <div className={styles.tags}>
                                    {project.tags.map((tag) => (
                                        <span key={tag} className={styles.tag}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className={styles.cardFooter}>
                                    {project.detailUrl ? (
                                        <Link href={project.detailUrl} className={styles.actionBtnPrimary}>
                                            <FaGamepad /> Mainkan Demo
                                        </Link>
                                    ) : project.liveUrl !== '#' ? (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.actionBtnPrimary}
                                        >
                                            <FaExternalLinkAlt /> Kunjungi Web
                                        </a>
                                    ) : (
                                        <span className={styles.actionBtnDisabled}>
                                            <FaLock /> Demo Khusus
                                        </span>
                                    )}

                                    {project.githubUrl !== '#' ? (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.actionBtnSecondary}
                                            title="Lihat Source Code di GitHub"
                                        >
                                            <FaGithub /> Repository
                                        </a>
                                    ) : (
                                        <span className={styles.actionBtnDisabled} title="Kode sumber privat/proyek perusahaan">
                                            <FaLock /> Private Repo
                                        </span>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

