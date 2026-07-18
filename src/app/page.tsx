import { Brand } from "@/components/Brand";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Experience } from "@/sections/Experience";
import { Projects } from "@/sections/Projects";
import { GithubActivity } from "@/sections/GithubActivity";
import { Skills } from "@/sections/Skills";
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
        <GithubActivity />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
