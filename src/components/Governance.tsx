import { useRef, useState } from "react";
import { m, useInView } from "motion/react";
import {
  EASE_OUT,
  Item,
  MaskLine,
  Reveal,
  Stagger,
  drawX,
  fadeIn,
  fadeUp,
  DrawLine,
} from "../motion";
import { Container, Heading, Numeral, Section, H2_SIZE } from "./brand";
import { HalftoneSphere } from "./HalftoneSphere";
import { SocialProofMarquee } from "./SocialProofMarquee";

const COMMITMENTS = [
  {
    control: "Infrastructure",
    title: "100% Data & Infrastructure Sovereignty",
    body: "Deployed on your own servers, national data centers, or private cloud accounts. You hold the keys.",
  },
  {
    control: "Access & encryption keys",
    title: "Defense-in-Depth Access Control",
    body: "End-to-end encryption in transit and at rest, granular Role-Based Access Control (RBAC), and tamper-evident activity logs.",
  },
  {
    control: "Source code & documentation",
    title: "No Black-Box Lock-In",
    body: "Built on battle-tested, open industry standards with clean documentation so your organization retains full institutional control.",
  },
];

const EMBLEM_W = 280;
const EMBLEM_H = 312;
const HUB_H = 680;

/** Build order once the hub enters view (seconds). */
const SEQ = {
  sphere: 0,
  emblem: 0.3,
  steps: 0.75,
  spokes: 0.9,
  endpoints: 1.5,
  cards: [1.35, 1.45, 1.6],
};
const SHADOW_OFF = "0px 0px 0px 0px #333333, 0px 0px 0px 0px #666666";
const SHADOW_ON = "10px 10px 0px 0px #333333, 20px 20px 0px 0px #666666";

type Linked = { focus: number | null; setFocus: (i: number | null) => void };

function CommitmentCard({
  i,
  className = "",
  on,
  link,
}: {
  i: number;
  className?: string;
  on: boolean;
  link?: Linked;
}) {
  const c = COMMITMENTS[i];
  const lit = link?.focus === i;
  return (
    <m.article
      initial={{ opacity: 0, y: 24 }}
      animate={on ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.9, ease: EASE_OUT, delay: SEQ.cards[i] }}
      onMouseEnter={() => link?.setFocus(i)}
      onMouseLeave={() => link?.setFocus(null)}
      className={`tile-lg relative z-10 border bg-obsidian/90 p-6 sm:p-10 backdrop-blur-md transition-colors duration-500 xl:p-12 ${
        lit ? "border-step-2" : "border-line"
      } ${className}`}
    >
      <div className="flex items-center justify-between gap-4">
        <Numeral n={i + 1} className="text-[14px] sm:text-[15px] text-white" />
        <span
          className={`font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.12em] transition-colors duration-500 ${lit ? "text-mist" : "text-step-2"}`}
        >
          {c.control}
        </span>
      </div>
      <h3 className="mt-6 sm:mt-10 text-[18px] sm:text-[22px] font-semibold leading-[1.25] tracking-[-0.015em] text-white">
        {c.title}
      </h3>
      <p className="mt-3 sm:mt-4 text-[14px] sm:text-base leading-[1.65] text-silver">{c.body}</p>
    </m.article>
  );
}

/** Central hub: what stays under the client's control, keyed to the three commitments. */
function ControlEmblem({ on, focus = null }: { on: boolean; focus?: number | null }) {
  return (
    <m.div
      className="tile-lg relative z-10 flex flex-col bg-white p-8 text-black"
      style={{ width: EMBLEM_W, minHeight: EMBLEM_H }}
      initial={{ opacity: 0, scale: 0.96, boxShadow: SHADOW_OFF }}
      animate={
        on
          ? { opacity: 1, scale: 1, boxShadow: SHADOW_ON }
          : { opacity: 0, scale: 0.96, boxShadow: SHADOW_OFF }
      }
      transition={{
        opacity: { duration: 0.8, ease: EASE_OUT, delay: SEQ.emblem },
        scale: { duration: 0.9, ease: EASE_OUT, delay: SEQ.emblem },
        boxShadow: { duration: 0.8, ease: EASE_OUT, delay: SEQ.steps },
      }}
    >
      <span className="tile-sm grid size-12 place-items-center bg-black text-white" aria-hidden>
        <svg viewBox="0 0 20 20" className="size-5" fill="none">
          <circle cx="7" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10.5 10H18M15 10v3M17.5 10v2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </span>
      <p className="mt-6 text-xl font-semibold leading-tight tracking-[-0.015em]">
        Under your control
      </p>
      <ul className="mt-8 divide-y divide-neutral-200 border-t border-neutral-200 pt-1">
        {COMMITMENTS.map((c, i) => {
          const dim = focus !== null && focus !== i;
          return (
            <li
              key={c.control}
              className={`flex items-center gap-4 py-2.5 text-[14px] font-medium transition-colors duration-500 ${dim ? "text-neutral-400" : "text-black"}`}
            >
              <Numeral
                n={i + 1}
                className={`text-[11px] transition-colors duration-500 ${focus === i ? "text-black" : "text-neutral-400"}`}
              />
              {c.control}
            </li>
          );
        })}
      </ul>
    </m.div>
  );
}

function Spoke({
  on,
  lit,
  axis,
  origin,
  className,
  style,
}: {
  on: boolean;
  lit: boolean;
  axis: "x" | "y";
  origin: string;
  className: string;
  style: React.CSSProperties;
}) {
  const hidden = axis === "x" ? { scaleX: 0 } : { scaleY: 0 };
  const shown = axis === "x" ? { scaleX: 1 } : { scaleY: 1 };
  return (
    <m.span
      aria-hidden
      className={`absolute transition-colors duration-500 ${lit ? "border-white" : "border-white/45"} ${origin} ${className}`}
      style={style}
      initial={hidden}
      animate={on ? shown : hidden}
      transition={{ duration: 0.75, ease: EASE_OUT, delay: SEQ.spokes }}
    />
  );
}

function Endpoint({ className, on }: { className: string; on: boolean }) {
  return (
    <m.span
      aria-hidden
      className={`absolute z-20 size-2 bg-white ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: on ? 1 : 0 }}
      transition={{ duration: 0.4, ease: EASE_OUT, delay: SEQ.endpoints }}
    />
  );
}

function HubDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { once: true, amount: 0.35 });
  const [focus, setFocus] = useState<number | null>(null);
  const link = { focus, setFocus };

  return (
    <div ref={ref} className="mt-24 hidden lg:block">
      <div className="grid grid-cols-12 items-center gap-8">
        <CommitmentCard i={0} className="col-span-4" on={on} link={link} />

        <div className="relative col-span-4" style={{ height: HUB_H }}>
          <m.div
            className="pointer-events-none absolute left-1/2 top-1/2 size-[720px] -translate-x-1/2 -translate-y-1/2"
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: on ? 1 : 0 }}
            transition={{ duration: 1.4, ease: EASE_OUT, delay: SEQ.sphere }}
          >
            <HalftoneSphere
              radius={0.42}
              centerY={0.5}
              rings={66}
              maxDot={4}
              tilt={0.4}
              speed={0.03}
              fadeTop={0}
            />
          </m.div>
          <div
            className="pointer-events-none absolute inset-x-0 top-1/2 h-[380px] -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(0,0,0,0.85),transparent)]"
            aria-hidden
          />

          {/* Spokes grow outward from the emblem to each commitment */}
          <Spoke
            on={on}
            lit={focus === 0}
            axis="x"
            origin="origin-right"
            className="top-1/2 -left-8 border-t"
            style={{ right: `calc(50% + ${EMBLEM_W / 2}px)` }}
          />
          <Spoke
            on={on}
            lit={focus === 1}
            axis="x"
            origin="origin-left"
            className="top-1/2 -right-8 border-t"
            style={{ left: `calc(50% + ${EMBLEM_W / 2}px)` }}
          />
          <Spoke
            on={on}
            lit={focus === 2}
            axis="y"
            origin="origin-top"
            className="left-1/2 border-l"
            style={{ top: `calc(50% + ${EMBLEM_H / 2}px)`, bottom: -96 }}
          />
          <Endpoint on={on} className="-left-9 top-1/2 -translate-y-1/2" />
          <Endpoint on={on} className="-right-9 top-1/2 -translate-y-1/2" />

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <ControlEmblem on={on} focus={focus} />
          </div>
        </div>

        <CommitmentCard i={1} className="col-span-4" on={on} link={link} />
      </div>

      <div className="relative -mt-24 grid grid-cols-12 gap-8">
        <Endpoint on={on} className="left-1/2 -top-1 -translate-x-1/2" />
        <CommitmentCard i={2} className="col-span-4 col-start-5" on={on} link={link} />
      </div>
    </div>
  );
}

function StackedMobile() {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { once: true, amount: 0.3 });
  return (
    <div className="mt-16 lg:hidden">
      <div
        ref={ref}
        className="relative mx-auto grid aspect-square w-full max-w-[520px] place-items-center"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <HalftoneSphere
            radius={0.44}
            centerY={0.5}
            rings={56}
            maxDot={3.6}
            tilt={0.4}
            speed={0.03}
            fadeTop={0}
          />
        </div>
        <ControlEmblem on={on} />
      </div>
      <div className="mx-auto mt-12 grid max-w-[640px] gap-8">
        {COMMITMENTS.map((_, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <CommitmentCard i={i} on />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function Governance() {
  return (
    <Section id="governance" className="overflow-hidden">
      <Container>
        <Stagger
          as="header"
          stagger={0.1}
          amount={0.4}
          className="mx-auto flex max-w-[860px] flex-col items-center text-center"
        >
          <m.p
            variants={fadeIn}
            className="flex items-center gap-3 text-sm font-medium text-silver"
          >
            <m.span
              variants={drawX}
              className="block h-px w-6 origin-right bg-step-2"
              aria-hidden
            />
            Governance
            <m.span variants={drawX} className="block h-px w-6 origin-left bg-step-2" aria-hidden />
          </m.p>
          <Heading className={`mt-8 ${H2_SIZE}`}>
            <MaskLine className="text-white">Security, ownership &</MaskLine>
            <MaskLine className="text-silver">engineering governance</MaskLine>
          </Heading>
          <Item
            as="p"
            variants={fadeUp}
            className="mt-8 max-w-[62ch] text-lg leading-[1.65] text-mist"
          >
            The commitments CTOs and procurement officers ask about first—built into how every
            system is designed, deployed, and handed over, not added afterwards.
          </Item>
        </Stagger>

        <HubDiagram />
        <StackedMobile />
      </Container>

      {/* Dual-direction sliding logo marquees: Government/Institutional partners & Technology standards */}
      <SocialProofMarquee />
    </Section>
  );
}
