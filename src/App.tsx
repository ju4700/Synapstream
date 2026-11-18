import { useEffect, useState } from "react";
import { LazyMotion, MotionConfig, domMax } from "motion/react";
import { Capabilities } from "./components/Capabilities";
import { Contact } from "./components/Contact";
import { Delivery } from "./components/Delivery";
import { Footer } from "./components/Footer";
import { Governance } from "./components/Governance";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";

export default function App() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth <= 767;
    }
    return false;
  });

  useEffect(() => {
    document.title = "Synapstream";
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsMobile(mq.matches);
    setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <LazyMotion features={domMax} strict>
      {/* On mobile / phone screens, reducedMotion="always" stops all transform animations */}
      <MotionConfig reducedMotion={isMobile ? "always" : "user"}>
        <div className="min-h-screen overflow-x-clip bg-black text-white">
          <Nav />
          <main>
            <Hero />
            <Capabilities />
            <Delivery />
            <Governance />
            <Contact />
          </main>
          <Footer />
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
