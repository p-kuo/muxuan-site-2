import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import TreatmentFlow from "@/components/TreatmentFlow";
import Audience from "@/components/Audience";
import Story from "@/components/Story";
import Locations from "@/components/Locations";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <TreatmentFlow />
        <Audience />
        <Story />
        <Locations />
        <FAQ />
        <Contact />
      </main>
    </div>
  );
}
