'use client';

import Image from 'next/image';
import styles from './About.module.css';

export default function About() {
  return (
    <section id="about" className={styles.section} aria-label="Tentang saya">
      <div className="container">
        <header className={styles.header}>
          <span className="section-label">01 / TENTANG SAYA</span>
          <h2 className="section-title">Profil &amp; Perjalanan</h2>
        </header>

        <div className={styles.body}>
          {/* Left Column: Photo Film Frame */}
          <div className={styles.photoFrame}>
            {/* Perforations Top */}
            <div className={styles.perfTop} aria-hidden="true">
              <div className={styles.holes}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <span key={i} className="perforation-hole" />
                ))}
              </div>
              <span className="frame-code">FRAME 00-AZZAM</span>
            </div>

            {/* Photo portrait */}
            <div className={styles.photoWrap}>
              <Image
                src="/azzam_fajro.jpg"
                alt="Muhammad Azzam Fajro — Full Stack Developer"
                fill
                priority
                className={styles.photo}
                sizes="(max-width: 768px) 90vw, 380px"
              />
            </div>

            {/* Perforations Bottom */}
            <div className={styles.perfBottom} aria-hidden="true">
              <span className="frame-code">35MM FILM EXP-24</span>
              <div className={styles.holes}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <span key={i} className="perforation-hole" />
                ))}
              </div>
            </div>

            {/* Frame Caption */}
            <div className={styles.frameCaption}>
              <span className={styles.frameTitle}>Muhammad Azzam Fajro</span>
              <div className={styles.statusBadge}>
                <span className={styles.statusDot} />
                <span>Tersedia untuk Proyek &amp; Kerja Sama</span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Milestones */}
          <div className={styles.content}>
            <p className={styles.bioLead}>
              Mengembangkan sistem web yang tangguh, efisien, dan melayani kebutuhan nyata pengguna.
            </p>

            <div className={styles.bioParagraphs}>
              <p className={styles.bioText}>
                Saya adalah software engineer asal Jawa Timur, Indonesia dengan fokus mendalam pada arsitektur backend <strong>Laravel</strong> serta ekosistem frontend modern <strong>Next.js &amp; TypeScript</strong>. Pendekatan saya berakar pada kode yang terstruktur rapi, performa cepat, dan arsitektur database multi-tenant yang scalable.
              </p>
              <p className={styles.bioText}>
                Bagi saya, perangkat lunak yang unggul bukan semata-mata soal tampilan yang memikat, melainkan keandalan sistem saat menangani data masif dan kemudahan pemeliharaan jangka panjang.
              </p>
            </div>

            {/* Riwayat Terintegrasi */}
            <div className={styles.milestones}>
              <div className={styles.milestoneCard}>
                <span className={styles.milestoneTag}>Pendidikan</span>
                <h4 className={styles.milestoneTitle}>SMKN 1 Bangil</h4>
                <p className={styles.milestoneDesc}>
                  Jurusan Rekayasa Perangkat Lunak. Membangun fondasi algoritma, logika pemrograman, dan rekayasa data.
                </p>
              </div>

              <div className={styles.milestoneCard}>
                <span className={styles.milestoneTag}>Pengalaman Industri</span>
                <h4 className={styles.milestoneTitle}>PT Ubig.id</h4>
                <p className={styles.milestoneDesc}>
                  Magang software engineering. Berkontribusi langsung pada pengembangan sistem enterprise SaaS &amp; integrasi API.
                </p>
              </div>

              <div className={styles.milestoneCard}>
                <span className={styles.milestoneTag}>Status Saat Ini</span>
                <h4 className={styles.milestoneTitle}>Full Stack Freelancer</h4>
                <p className={styles.milestoneDesc}>
                  Menangani klien independen &amp; bisnis: pembuatan aplikasi web kustom, sistem informasi manajemen, dan RESTful API.
                </p>
              </div>
            </div>

            {/* Quick Notes Row */}
            <div className={styles.notesRow}>
              <div className={styles.noteItem}>
                <span className={styles.noteLabel}>Sedang Didalami</span>
                <span className={styles.noteValue}>Docker &amp; Cloud Infra</span>
              </div>
              <div className={styles.noteItem}>
                <span className={styles.noteLabel}>Minat &amp; Tontonan</span>
                <span className={styles.noteValue}>Formula 1 &amp; Balap</span>
              </div>
              <div className={styles.noteItem}>
                <span className={styles.noteLabel}>Bacaan Favorit</span>
                <span className={styles.noteValue}>Novel Web &amp; Manhwa</span>
              </div>
              <div className={styles.noteItem}>
                <span className={styles.noteLabel}>Domisili</span>
                <span className={styles.noteValue}>Bangil / Malang, ID</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
