import {
  Navbar,
  Hero,
  About,
  Marquee,
  Projects,
  Certificates,
  Contact,
  Footer,
  ScrollReveal,
  Preloader,
  Cursor,
  ScrollProgress,
  MotionBanner,
} from '@/components';

export default function Home() {
  return (
    <>
      <Preloader />
      <ScrollProgress />
      <Cursor />
      <MotionBanner />
      <Navbar />
      <main>
        {/* 1. Hero — nama align left + animasi zoom in saat di-scroll */}
        <Hero />

        {/* 2. Tentang Saya — foto asli + biografi & riwayat perjalanan */}
        <About />

        {/* Pita Marquee */}
        <Marquee />

        {/* 3. Proyek — gulungan film + galeri contact sheet */}
        <Projects />

        {/* 4. Sertifikat — grid kredensial terverifikasi */}
        <Certificates />

        {/* 5. Kontak — email besar magnetic */}
        <Contact />
      </main>

      <Footer />
      <ScrollReveal />
    </>
  );
}
