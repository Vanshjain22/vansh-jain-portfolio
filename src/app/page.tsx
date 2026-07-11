import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { TechMarquee } from "@/components/sections/TechMarquee";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <SelectedWork />
        <TechMarquee />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
