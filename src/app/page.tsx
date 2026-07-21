import { Brand } from "@/components/Brand";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Experience } from "@/sections/Experience";
import { Projects } from "@/sections/Projects";
import { Skills } from "@/sections/Skills";
import { Certifications } from "@/sections/Certifications";
import { Contact } from "@/sections/Contact";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Brand />
      <Sidebar />
      <main className="flex-1">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
