import { useEffect, useState } from "react";
import { LazyMotion, MotionConfig, domMax } from "motion/react";
import { Footer } from "./components/Footer";
import { Nav } from "./components/Nav";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { usePathname } from "./router";

export default function App() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth <= 767;
    }
    return false;
  });

  useEffect(() => {
    if (pathname === "/about") {
      document.title = "About — Synapstream | Institutional Software Engineering";
    } else {
      document.title = "Synapstream — Enterprise Architecture & Digital Infrastructure";
    }
  }, [pathname]);

  useEffect(() => {
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
          <main id="top">
            {pathname === "/about" ? <About /> : <Home />}
          </main>
          <Footer className={pathname === "/about" ? "bg-[#040404]" : "bg-black"} />
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
