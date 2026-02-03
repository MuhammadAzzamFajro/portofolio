'use client';

import styles from './About.module.css';

export default function About() {
    return (
        <section id="about" className={styles.about}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <span className={styles.label}>About Me</span>
                    <h2 className={styles.title}>
                        Crafting Digital Experiences with <span className={styles.highlight}>Passion</span>
                    </h2>

                    <div className={styles.text}>
                        <p>
                            I&apos;m a creative developer based in Indonesia with a passion for building
                            beautiful and functional web applications. With over 5 years of experience
                            in the industry, I&apos;ve had the privilege of working with startups and
                            established companies alike.
                        </p>
                        <p>
                            My approach combines technical expertise with creative problem-solving.
                            I believe that great software is not just about writing code—it&apos;s about
                            understanding users, crafting intuitive experiences, and delivering
                            solutions that make a real impact.
                        </p>
                        <p>
                            When I&apos;m not coding, you can find me exploring new technologies,
                            contributing to open-source projects, or sharing knowledge with the
                            developer community.
                        </p>
                    </div>

                    <div className={styles.features}>
                        <div className={styles.feature}>
                            <div className={styles.featureIcon}>🎯</div>
                            <div className={styles.featureContent}>
                                <h4>Problem Solver</h4>
                                <p>I love tackling complex challenges and finding elegant solutions</p>
                            </div>
                        </div>
                        <div className={styles.feature}>
                            <div className={styles.featureIcon}>📚</div>
                            <div className={styles.featureContent}>
                                <h4>Continuous Learner</h4>
                                <p>Always exploring new technologies and improving my skills</p>
                            </div>
                        </div>
                        <div className={styles.feature}>
                            <div className={styles.featureIcon}>🤝</div>
                            <div className={styles.featureContent}>
                                <h4>Team Player</h4>
                                <p>Strong believer in collaboration and knowledge sharing</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.visual}>
                    <div className={styles.infoCards}>
                        <div className={styles.infoCard}>
                            <span className={styles.infoNumber}>5+</span>
                            <span className={styles.infoLabel}>Years of Experience</span>
                        </div>
                        <div className={styles.infoCard}>
                            <span className={styles.infoNumber}>50+</span>
                            <span className={styles.infoLabel}>Projects Delivered</span>
                        </div>
                        <div className={styles.infoCard}>
                            <span className={styles.infoNumber}>30+</span>
                            <span className={styles.infoLabel}>Happy Clients</span>
                        </div>
                        <div className={styles.infoCard}>
                            <span className={styles.infoNumber}>15+</span>
                            <span className={styles.infoLabel}>Certifications</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
