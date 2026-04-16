'use client';

import { useState } from 'react';
import { FaReact, FaHtml5, FaNodeJs, FaPython, FaGit, FaDocker, FaAws, FaFigma } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiVuedotjs, SiTailwindcss, SiExpress, SiPostgresql, SiMongodb, SiGraphql } from 'react-icons/si';
import styles from './Skills.module.css';

interface Skill {
    name: string;
    icon: React.ReactNode;
    category: string;
    color: string;
}

const skills: Skill[] = [
    // Frontend
    { name: 'React', icon: <FaReact />, category: 'Frontend', color: '#61DAFB' },
    { name: 'Next.js', icon: <SiNextdotjs />, category: 'Frontend', color: '#000000' },
    { name: 'TypeScript', icon: <SiTypescript />, category: 'Frontend', color: '#3178C6' },
    { name: 'Vue.js', icon: <SiVuedotjs />, category: 'Frontend', color: '#4FC08D' },
    { name: 'HTML/CSS', icon: <FaHtml5 />, category: 'Frontend', color: '#E34F26' },
    { name: 'Tailwind CSS', icon: <SiTailwindcss />, category: 'Frontend', color: '#06B6D4' },

    // Backend
    { name: 'Node.js', icon: <FaNodeJs />, category: 'Backend', color: '#339933' },
    { name: 'Python', icon: <FaPython />, category: 'Backend', color: '#3776AB' },
    { name: 'PostgreSQL', icon: <SiPostgresql />, category: 'Backend', color: '#4169E1' },
    { name: 'MongoDB', icon: <SiMongodb />, category: 'Backend', color: '#47A248' },

    // Tools
    { name: 'Git', icon: <FaGit />, category: 'Tools', color: '#F05032' },
    { name: 'Docker', icon: <FaDocker />, category: 'Tools', color: '#2496ED' },
    { name: 'Figma', icon: <FaFigma />, category: 'Tools', color: '#F24E1E' },
];

export default function Skills() {
    const [isPaused, setIsPaused] = useState(false);

    // Split skills into two rows for better distribution
    const row1Skills = skills.slice(0, 8);
    const row2Skills = skills.slice(8);

    // Double the arrays for seamless looping
    const loopedRow1 = [...row1Skills, ...row1Skills, ...row1Skills];
    const loopedRow2 = [...row2Skills, ...row2Skills, ...row2Skills];

    return (
        <section id="skills" className={styles.skills}>
            <div className="container">
                <header className="section-heading">
                    <span className="section-label">Expertise</span>
                    <h2 className="section-title">Technological <br /> Stack</h2>
                    <p className="section-subtitle">
                        I leverage a modern ecosystem of tools to build resilient,
                        scalable, and user-centric solutions.
                    </p>
                </header>

                <div
                    className={styles.carouselContainer}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Row 1 - Scroll Left to Right */}
                    <div className={styles.carouselRow}>
                        <div className={`${styles.carouselTrack} ${isPaused ? styles.paused : ''}`}>
                            {loopedRow1.map((skill, index) => (
                                <div key={`row1-${skill.name}-${index}`} className={`${styles.skillCard} glass`}>
                                    <div className={styles.skillIcon} style={{ color: skill.color }}>
                                        {skill.icon}
                                    </div>
                                    <div className={styles.skillInfo}>
                                        <span className={styles.skillName}>{skill.name}</span>
                                        <span className={styles.skillCategory}>{skill.category}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Row 2 - Scroll Right to Left */}
                    <div className={styles.carouselRow}>
                        <div className={`${styles.carouselTrack} ${styles.reverse} ${isPaused ? styles.paused : ''}`}>
                            {loopedRow2.map((skill, index) => (
                                <div key={`row2-${skill.name}-${index}`} className={`${styles.skillCard} glass`}>
                                    <div className={styles.skillIcon} style={{ color: skill.color }}>
                                        {skill.icon}
                                    </div>
                                    <div className={styles.skillInfo}>
                                        <span className={styles.skillName}>{skill.name}</span>
                                        <span className={styles.skillCategory}>{skill.category}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

