import styles from './About.module.css';

export default function About() {
    return (
        <section id="about" className={styles.about}>
            <div className="container">
                <header className="section-heading">
                    <span className="section-label">Biografi</span>
                    <h2 className="section-title">Azzam Fajro</h2>
                    <p className="section-subtitle">
                        Software engineer yang berdedikasi menciptakan solusi skalabel dan
                        pengalaman digital yang mulus.
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
                </div>
            </div>
        </section>
    );
}
