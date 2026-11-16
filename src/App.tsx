import { useEffect } from "react";
import { LazyMotion, MotionConfig, domMax } from "motion/react";
import { Capabilities } from "./components/Capabilities";
import { Contact } from "./components/Contact";
import { Delivery } from "./components/Delivery";
import { Footer } from "./components/Footer";
import { Governance } from "./components/Governance";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";

export default function App() {
  useEffect(() => {
    document.title = "Synapstream";
  }, []);

  return (
    <LazyMotion features={domMax} strict>
      {/* reducedMotion="user": transforms are dropped for users who prefer reduced motion; fades remain */}
      <MotionConfig reducedMotion="user">
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
