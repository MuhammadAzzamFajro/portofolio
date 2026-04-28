'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './Certificates.module.css';

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
        image: '/certificates/anforcom.png'
    },
    {
        id: 2,
        title: 'Participant of JHIC 2025',
        issuer: 'Jagoan Hosting Infra Competition (JHIC)',
        date: '08 - 17 Nov 2025',
        credentialId: 'JHIC-2025-PARTICIPANT',
        verifyUrl: '/certificates/jhic.pdf',
        image: '/certificates/jhic.png'
    },
    {
        id: 3,
        title: 'Belajar Dasar Pemrograman Web',
        issuer: 'Dicoding Indonesia',
        date: '06 Nov 2024',
        credentialId: '53XEQK2QYXRN',
        verifyUrl: '/certificates/dicoding.pdf',
        image: '/certificates/dicoding.png'
    },
    {
        id: 4,
        title: 'Java (Basic) Certificate',
        issuer: 'SoloLearn',
        date: '2024',
        credentialId: 'SOLO-JAVA-BASIC',
        verifyUrl: '/certificates/java.png',
        image: '/certificates/java.png'
    },
    {
        id: 5,
        title: 'Python (Basic) Certificate',
        issuer: 'SoloLearn',
        date: '2024',
        credentialId: 'SOLO-PY-BASIC',
        verifyUrl: '/certificates/py.png',
        image: '/certificates/py.png'
    },
    {
        id: 6,
        title: 'Python (Advanced) Certificate',
        issuer: 'SoloLearn',
        date: '2024',
        credentialId: 'SOLO-PY-ADV',
        verifyUrl: '/certificates/pyhard.png',
        image: '/certificates/pyhard.png'
    },
    {
        id: 7,
        title: 'C# (Basic) Certificate',
        issuer: 'SoloLearn',
        date: '2024',
        credentialId: 'SOLO-CS-BASIC',
        verifyUrl: '/certificates/csharp.png',
        image: '/certificates/csharp.png'
    }
];

export default function Certificates() {
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    return (
        <section id="certificates" className={styles.certificates}>
            <div className="container">
                <header className="section-heading">
                    <span className="section-label">Achievements</span>
                    <h2 className="section-title">Verified <br /> Certifications</h2>
                    <p className="section-subtitle">
                        A validation of my technical competence and ongoing commitment
                        to professional growth in the cloud ecosystem.
                    </p>
                </header>

                <div className={styles.grid}>
                    {certificates.map((cert, index) => (
                        <div
                            key={cert.id}
                            className={`${styles.certCard} glass ${hoveredId === cert.id ? styles.hovered : ''}`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                            onMouseEnter={() => setHoveredId(cert.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            {cert.image && (
                                <div className={styles.certImageWrapper}>
                                    <Image
                                        src={cert.image}
                                        alt={cert.title}
                                        width={400}
                                        height={250}
                                        className={styles.certImage}
                                    />
                                </div>
                            )}
                            <div className={styles.certBody}>
                                <h3 className={styles.certTitle}>{cert.title}</h3>
                                <div className={styles.certIssuer}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 21V19C19 17.9391 18.5786 16.9217 17.8284 16.1716C17.0783 15.4214 16.0609 15 15 15H9C7.93913 15 6.92172 15.4214 6.17157 16.1716C5.42143 16.9217 5 17.9391 5 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span>{cert.issuer}</span>
                                </div>
                                <div className={styles.certDate}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                                        <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                    <span>{cert.date}</span>
                                </div>
                                <div className={styles.certId}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                    <span>ID: {cert.credentialId}</span>
                                </div>
                            </div>

                            <div className={styles.certFooter}>
                                <a href={cert.verifyUrl} className={styles.verifyBtn} target="_blank" rel="noopener noreferrer">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M15 3H21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Verifikasi Kredensial
                                </a>
                            </div>

                            <div className={styles.shine}></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
