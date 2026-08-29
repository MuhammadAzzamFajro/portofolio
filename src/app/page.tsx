import { Navbar, Hero, About, Skills, Projects, Certificates, Contact, Footer, ScrollReveal } from '@/components';

export default function Home() {
  return (
    <>
      <div className="noise-overlay" />
      <div className="ambient-bg" />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certificates />
        <Contact />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
