import Navbar from "@/components/nav/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import Experience from "@/components/sections/Experience";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden" }}>
      <Navbar />
      <Hero />
      <About />
      <Work />
      <Experience />
      <Footer />
    </main>
  );
}