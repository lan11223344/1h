import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Work } from "@/components/sections/work";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { About, Contact, Footer } from "@/components/sections/about-contact";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        跳到主要内容
      </a>

      <Navbar />

      <main>
        <Hero />
        <Work />
        <Skills />
        <Experience />
        <About />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
