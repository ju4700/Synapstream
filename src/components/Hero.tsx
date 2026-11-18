import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { EASE_OUT, useIsMobile } from "../motion";
import { Arrow, ButtonLink, Container } from "./brand";
import { Blueprint } from "./Blueprint";
import { HalftoneSphere } from "./HalftoneSphere";

const WORD = "SYNAPSTREAM";
const LETTER_START = 0.25;
const LETTER_STAGGER = 0.045;
const AFTER_WORD = LETTER_START + WORD.length * LETTER_STAGGER;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Sphere sinks slower than the page on scroll
  const sphereY = useTransform(scrollYProgress, [0, 1], [0, 240]);
  const sphereOpacity = useTransform(scrollYProgress, [0.15, 0.75], [1, 0.4]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative overflow-hidden bg-black pt-[130px] sm:pt-[170px] lg:pt-[240px]"
    >
      <div>
        <Container className="relative flex flex-col items-center text-center">
          <m.h1
            aria-label="SYNAPSTREAM"
            className="font-display text-[clamp(21px,5.8vw,88px)] uppercase leading-none text-white"
            initial={{ letterSpacing: reduced ? "0.06em" : "0.14em" }}
            animate={{ letterSpacing: "0.08em" }}
            transition={{ duration: 1.6, ease: EASE_OUT, delay: LETTER_START }}
          >
            <span className="block overflow-hidden pb-[0.08em] whitespace-nowrap" aria-hidden>
              {WORD.split("").map((ch, i) => (
                <m.span
                  key={i}
                  className="inline-block will-change-transform text-white"
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 1,
                    ease: EASE_OUT,
                    delay: LETTER_START + i * LETTER_STAGGER,
                  }}
                >
                  {ch}
                </m.span>
              ))}
            </span>
          </m.h1>
          <m.p
            className="mt-6 sm:mt-8 max-w-[58ch] text-balance text-[15px] sm:text-[17px] md:text-[clamp(18px,1.6vw,22px)] leading-[1.55] text-white md:max-w-none md:text-wrap"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE_OUT, delay: AFTER_WORD + 0.05 }}
          >
            Engineering the next generation of data infrastructure and creative software{" "}
            <br className="hidden md:block" />
            solutions for governments and enterprise conglomerates.
          </m.p>
          <m.div
            className="mt-8 sm:mt-12 flex w-full flex-col sm:w-auto sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE_OUT, delay: AFTER_WORD + 0.25 }}
          >
            <ButtonLink href="#contact" size="lg" className="w-full sm:w-auto">
              Schedule a Briefing <Arrow />
            </ButtonLink>
            <ButtonLink href="#capabilities" size="lg" variant="outline" className="w-full sm:w-auto">
              Explore Capabilities
            </ButtonLink>
          </m.div>
        </Container>
      </div>

      {/* Rising halftone sphere with the blueprint overlaid at its base */}
      <div className="relative mt-4 sm:mt-12 lg:mt-24">
        <m.div
          className="pointer-events-none absolute inset-x-0 top-0 h-[600px] sm:h-[900px] lg:h-[1300px]"
          style={reduced || isMobile ? undefined : { y: sphereY, opacity: sphereOpacity }}
          aria-hidden
        >
          <HalftoneSphere
            radius={0.4}
            crestY={40}
            maxRadius={760}
            minRadius={320}
            rings={96}
            maxDot={5.6}
            tilt={0.62}
            speed={0.02}
            fadeTop={0.45}
            intro={2.2}
            interactive
          />
        </m.div>
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[180px] sm:h-[260px] lg:h-[320px] bg-gradient-to-t from-black via-black/80 to-transparent"
          aria-hidden
        />
        <Container className="relative pb-20 sm:pb-32 lg:pb-40 pt-[40px] sm:pt-[160px] lg:pt-[340px]">
          <div className="pr-0 md:pr-5">
            <Blueprint />
          </div>
        </Container>
      </div>
    </section>
  );
}
