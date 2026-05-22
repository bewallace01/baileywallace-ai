import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import RevealOnScroll from "./components/RevealOnScroll";

export default function Page() {
  return (
    <main className="relative isolate min-h-screen overflow-x-hidden bg-grain">
      <RevealOnScroll />
      <Hero />
      <About />
      <Projects />
      <Footer />
    </main>
  );
}
