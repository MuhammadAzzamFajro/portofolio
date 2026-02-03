import { Navbar, Hero, About, Skills, Projects, Certificates, Contact, Footer } from '@/components';

export default function Home() {
  return (
    <>
      <div className="bg-gradient" />
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
    </>
  );
}
