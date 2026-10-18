import { Navbar } from "@/components/navbar";
import { LabBackground } from "@/components/lab-background";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Services } from "@/components/services";
import { Works } from "@/components/works";
import { Skills } from "@/components/skills";
import { Experience } from "@/components/experience";
import { FAQ } from "@/components/faq";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <LabBackground />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <Works />
        <Skills />
        <Experience />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
