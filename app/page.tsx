import { Navbar } from "@/components/navbar";
import { LabBackground } from "@/components/lab-background";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Services } from "@/components/services";
import { Works } from "@/components/works";
import { Skills } from "@/components/skills";
import { FAQ } from "@/components/faq";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Lewati ke konten
      </a>
      <Navbar />
      <LabBackground />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 focus-visible:outline-none"
      >
        <Hero />
        <Works />
        <About />
        <Services />
        <Skills />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
