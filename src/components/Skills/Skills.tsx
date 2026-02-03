'use client';

import { useState } from 'react';
import { FaReact, FaHtml5, FaNodeJs, FaPython, FaGitAlt, FaDocker, FaAws, FaFigma } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiVuedotjs, SiTailwindcss, SiExpress, SiPostgresql, SiMongodb, SiGraphql } from 'react-icons/si';
import styles from './Skills.module.css';

interface Skill {
    name: string;
    level: number;
    icon: React.ReactNode;
    category: string;
    color: string;
}

const skills: Skill[] = [
    // Frontend
    { name: 'React', level: 95, icon: <FaReact />, category: 'Frontend', color: '#61DAFB' },
    { name: 'Next.js', level: 90, icon: <SiNextdotjs />, category: 'Frontend', color: '#000000' },
    { name: 'TypeScript', level: 88, icon: <SiTypescript />, category: 'Frontend', color: '#3178C6' },
    { name: 'Vue.js', level: 80, icon: <SiVuedotjs />, category: 'Frontend', color: '#4FC08D' },
    { name: 'HTML/CSS', level: 95, icon: <FaHtml5 />, category: 'Frontend', color: '#E34F26' },
    { name: 'Tailwind CSS', level: 90, icon: <SiTailwindcss />, category: 'Frontend', color: '#06B6D4' },

    // Backend
    { name: 'Node.js', level: 88, icon: <FaNodeJs />, category: 'Backend', color: '#339933' },
    { name: 'Python', level: 85, icon: <FaPython />, category: 'Backend', color: '#3776AB' },
    { name: 'Express.js', level: 85, icon: <SiExpress />, category: 'Backend', color: '#000000' },
    { name: 'PostgreSQL', level: 80, icon: <SiPostgresql />, category: 'Backend', color: '#4169E1' },
    { name: 'MongoDB', level: 82, icon: <SiMongodb />, category: 'Backend', color: '#47A248' },
    { name: 'GraphQL', level: 78, icon: <SiGraphql />, category: 'Backend', color: '#E10098' },

    // Tools
    { name: 'Git', level: 90, icon: <FaGitAlt />, category: 'Tools', color: '#F05032' },
    { name: 'Docker', level: 75, icon: <FaDocker />, category: 'Tools', color: '#2496ED' },
    { name: 'AWS', level: 72, icon: <FaAws />, category: 'Tools', color: '#FF9900' },
    { name: 'Figma', level: 85, icon: <FaFigma />, category: 'Tools', color: '#F24E1E' },
];

const categories = ['All', 'Frontend', 'Backend', 'Tools'];

export default function Skills() {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredSkills = skills.filter(
        skill => activeCategory === 'All' || skill.category === activeCategory
    );

    return (
        <section id="skills" className={styles.skills}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.label}>My Skills</span>
                    <h2 className={styles.title}>
                        Technologies & <span className={styles.highlight}>Expertise</span>
                    </h2>
                    <p className={styles.description}>
                        Here are the technologies and tools I work with to bring ideas to life
                    </p>
                </div>

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
                    {filteredSkills.map((skill, index) => (
                        <div
                            key={skill.name}
                            className={styles.skillCard}
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <div className={styles.skillHeader}>
                                <span className={styles.skillIcon} style={{ color: skill.color }}>{skill.icon}</span>
                                <span className={styles.skillName}>{skill.name}</span>
                                <span className={styles.skillLevel}>{skill.level}%</span>
                            </div>
                            <div className={styles.progressBar}>
                                <div
                                    className={styles.progress}
                                    style={{ width: `${skill.level}%`, background: `linear-gradient(90deg, ${skill.color}, ${skill.color}aa)` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
