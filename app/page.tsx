import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import About from "@/components/About";
import VenturesMarquee from "@/components/VenturesMarquee";
import FaqChatbot from "@/components/FaqChatbot";
import LaunchCTA from "@/components/LaunchCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <Projects />
      <About />
      <VenturesMarquee />
      <FaqChatbot />
      <LaunchCTA />
      <Footer />
    </main>
  );
}
