import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import {
  m,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  motionValue,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Container, LogoMark, Numeral, Section, SectionHeader } from "./brand";
import { EASE_OUT, Item, Stagger } from "../motion";

const STAGES = [
  {
    title: "Source Integration & Ingestion",
    plane: "Source integration",
    body: "Connect existing relational databases, legacy mainframes, and field collection endpoints without disrupting live operations.",
    components: [
      "JDBC / ODBC connectors",
      "Change data capture (CDC)",
      "SFTP & batch file intake",
      "REST & MQTT field endpoints",
    ],
  },
  {
    title: "Processing, Governance & Storage",
    plane: "Processing & governance",
    body: "Normalize raw records, enforce strict role-based access rules, and maintain complete audit histories.",
    components: [
      "Schema validation",
      "Role-based access control",
      "Append-only audit log",
      "Warehouse & object storage",
    ],
  },
  {
    title: "Application & Creative Services",
    plane: "Application services",
    body: "Expose clean, well-documented APIs that power internal management dashboards, creative tools, and public interfaces.",
    components: [
      "REST & GraphQL APIs",
      "OpenAPI documentation",
      "OAuth 2.0 / OpenID Connect",
      "Webhooks & event streams",
    ],
  },
  {
    title: "Observability & Long-Term Maintainability",
    plane: "Observability",
    body: "Comprehensive system monitoring, automated backups, and clean codebases your internal IT team can fully own.",
    components: [
      "Metrics, logs & traces",
      "Automated backups & restore drills",
      "Infrastructure as code",
      "Runbooks & handover docs",
    ],
  },
];

/* ---------- Isometric stack ---------- */
const SIZE = 220;
const GAP_CLOSED = 34; // stacked tight before the diagram is reached
const GAP_OPEN = 138; // exploded view
const LIFT = 30; // extra gap opened beneath the selected plane
const SIN_X = Math.sin((58 * Math.PI) / 180);
const ORIGIN_X = "36%";
const ORIGIN_Y = "77%";
const SPRING = { stiffness: 140, damping: 22, mass: 0.9 };
/** Reduced motion: no scroll-linked explode, the stack is simply shown open. */
const GAP_OPEN_MV = motionValue(GAP_OPEN);

/**
 * Connectors run up the stack's left and right corners, tracing its silhouette so they stay
 * visible between planes. Plane coordinates are fractions of SIZE before rotation.
 */
const RISERS: [number, number][] = [
  [0.08, 0.08], // left corner
  [0.92, 0.92], // right corner
];

type Tone = "dark" | "light" | "white";

function Cells({
  items,
  tone,
  active,
  pulse,
}: {
  items: string[];
  tone: Tone;
  active: boolean;
  pulse: number;
}) {
  const idle = {
    dark: "border-[#333] text-step-2",
    light: "bg-black/80 text-silver",
    white: "border-neutral-400 text-neutral-500",
  }[tone];
  const lit = {
    dark: "border-white/70 text-white",
    light: "bg-black text-white",
    white: "border-black text-black",
  }[tone];
  return (
    <div className="grid size-full grid-cols-2 gap-2.5 p-5">
      {items.map((t, j) => (
        <m.div
          // Re-keyed on each activation so the cells light up again in sequence
          key={`${t}-${active ? pulse : "idle"}`}
          initial={active ? { opacity: 0.25 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE_OUT, delay: active ? 0.25 + j * 0.09 : 0 }}
          className={`tile-sm flex items-end p-2.5 font-mono text-[9px] uppercase tracking-[0.12em] transition-colors duration-500 ${
            tone === "light" ? "" : "border"
          } ${active ? lit : idle}`}
        >
          {t}
        </m.div>
      ))}
    </div>
  );
}

const PLANES: {
  cls: string;
  shadow: string;
  body: (active: boolean, pulse: number) => ReactNode;
}[] = [
  {
    cls: "bg-[#0a0a0a] border border-[#333]",
    shadow: "10px 10px 0 0 #161616, 20px 20px 0 0 #262626",
    body: (a, p) => (
      <Cells tone="dark" active={a} pulse={p} items={["RDBMS", "Mainframe", "Field", "Files"]} />
    ),
  },
  {
    cls: "bg-[#1c1c1c] border border-[#444]",
    shadow: "10px 10px 0 0 #262626, 20px 20px 0 0 #333",
    body: (a) => (
      <div className="relative grid size-full place-items-center">
        <div
          className={`absolute inset-7 rounded-full border transition-colors duration-700 ${a ? "border-white/60" : "border-[#444]"}`}
        />
        <div
          className={`absolute inset-14 rounded-full border border-dashed transition-colors duration-700 ${a ? "border-white/40" : "border-transparent"}`}
        />
        <div className="tile-sm relative grid size-16 place-items-center bg-white">
          <LogoMark className="w-9" />
        </div>
      </div>
    ),
  },
  {
    cls: "bg-[#cccccc]",
    shadow: "10px 10px 0 0 #666, 20px 20px 0 0 #333",
    body: (a, p) => (
      <Cells
        tone="light"
        active={a}
        pulse={p}
        items={["Portals", "Analytics", "Creative", "API"]}
      />
    ),
  },
  {
    cls: "bg-white",
    shadow: "10px 10px 0 0 #ccc, 20px 20px 0 0 #666",
    body: (a, p) => (
      <Cells tone="white" active={a} pulse={p} items={["Metrics", "Logs", "Backups", "Docs"]} />
    ),
  },
];

/** Height of plane i: shared (scroll-linked) gap × index + its own spring-driven selection lift. */
function usePlaneZ(i: number, gap: MotionValue<number>, active: number) {
  const lift = useSpring(0, SPRING);
  useEffect(() => {
    lift.set(active > 0 && i >= active ? LIFT : 0);
  }, [active, i, lift]);
  return useTransform(() => i * gap.get() + lift.get());
}

function Plane({
  i,
  z,
  active,
  pulse,
  shown,
}: {
  i: number;
  z: MotionValue<number>;
  active: number;
  pulse: number;
  shown: boolean;
}) {
  const p = PLANES[i];
  const on = i === active;
  return (
    <m.div
      className={`tile absolute inset-0 transition-[filter,outline-color] duration-700 ${p.cls}`}
      style={{
        z,
        boxShadow: p.shadow,
        // Inactive planes dim but stay opaque, so the stack never turns muddy
        filter: on ? "brightness(1)" : "brightness(0.42) saturate(0)",
        outline: "1px solid",
        outlineOffset: 10,
        outlineColor: on ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: shown ? 1 : 0 }}
      transition={{ duration: 0.8, ease: EASE_OUT, delay: i * 0.12 }}
    >
      {p.body(on, pulse)}
    </m.div>
  );
}

function Riser({
  x,
  y,
  z0,
  z1,
  lit,
  feeding,
  flow,
  delay,
}: {
  x: number;
  y: number;
  z0: MotionValue<number>;
  z1: MotionValue<number>;
  lit: boolean;
  feeding: boolean;
  flow: boolean;
  delay: number;
}) {
  const height = useTransform(() => Math.max(0, z1.get() - z0.get()));
  return (
    <m.span
      className="absolute w-px transition-opacity duration-700"
      style={{
        left: x * SIZE,
        top: y * SIZE,
        z: z0,
        rotateX: 90,
        height,
        transformOrigin: "top center",
        backgroundImage: `repeating-linear-gradient(to top, ${lit ? "#a1a1aa" : "#444"} 0 4px, transparent 4px 9px)`,
        opacity: flow ? 1 : 0,
      }}
    >
      {/* Packets flow upward continuously; brightest on the connector feeding the selected stage */}
      {flow && (
        <span
          className={`absolute left-1/2 size-[5px] -translate-x-1/2 rounded-full transition-opacity duration-700 ${
            feeding
              ? "bg-white opacity-100 shadow-[0_0_10px_2px_rgba(255,255,255,0.55)]"
              : "bg-white opacity-30"
          }`}
          style={{
            animation: `packet ${feeding ? 1.8 : 3.2}s cubic-bezier(.65,0,.35,1) ${delay}s infinite both`,
          }}
        />
      )}
    </m.span>
  );
}

function StageLabel({
  i,
  z,
  gap,
  active,
  shown,
  onSelect,
}: {
  i: number;
  z: MotionValue<number>;
  gap: MotionValue<number>;
  active: number;
  shown: boolean;
  onSelect: (i: number) => void;
}) {
  const y = useTransform(() => -z.get() * SIN_X);
  // Labels only appear once the planes have separated enough to give each one room
  const roomy = useTransform(gap, [GAP_CLOSED + 20, GAP_OPEN - 30], [0, 1]);
  const on = i === active;
  return (
    <m.div
      className="absolute -translate-y-1/2"
      style={{
        left: `calc(${ORIGIN_X} + ${(SIZE / 2) * Math.SQRT2 + 24}px)`,
        top: ORIGIN_Y,
        y,
        opacity: roomy,
      }}
    >
      <m.button
        type="button"
        tabIndex={-1}
        onClick={() => onSelect(i)}
        className="group flex items-center gap-3 text-left"
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: shown ? (on ? 1 : 0.55) : 0, x: shown ? 0 : -8 }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
      >
        <span
          className={`h-px transition-all duration-500 ${on ? "w-10 bg-white" : "w-6 bg-step-2 group-hover:w-8"}`}
        />
        <span className="whitespace-nowrap font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em]">
          <span className="block text-step-2">Stage {String(i + 1).padStart(2, "0")}</span>
          <span
            className={`block transition-colors duration-500 ${on ? "text-white" : "text-silver group-hover:text-white"}`}
          >
            {STAGES[i].plane}
          </span>
        </span>
      </m.button>
    </m.div>
  );
}

function IsoDiagram({ active, onSelect }: { active: number; onSelect: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const shown = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();

  // Exploded view: the stack opens as the diagram travels into view, with a slight camera turn
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center 55%"] });
  const gapRaw = useTransform(scrollYProgress, [0.1, 1], [GAP_CLOSED, GAP_OPEN]);
  const gapSpring = useSpring(gapRaw, { stiffness: 90, damping: 24 });
  const turnRaw = useTransform(scrollYProgress, [0, 1], [-52, -45]);
  const turn = useSpring(turnRaw, { stiffness: 90, damping: 24 });
  const gap = reduced ? GAP_OPEN_MV : gapSpring;

  // Re-run the cell sequence each time a stage is selected
  const [pulse, setPulse] = useState(0);
  useEffect(() => setPulse((n) => n + 1), [active]);

  const z = [
    usePlaneZ(0, gap, active),
    usePlaneZ(1, gap, active),
    usePlaneZ(2, gap, active),
    usePlaneZ(3, gap, active),
  ];

  return (
    <div ref={ref} className="relative h-[760px] w-full" aria-hidden>
      <m.div
        className="absolute"
        style={{
          left: ORIGIN_X,
          top: ORIGIN_Y,
          width: SIZE,
          height: SIZE,
          marginLeft: -SIZE / 2,
          marginTop: -SIZE / 2,
          transformStyle: "preserve-3d",
          rotateX: 58,
          rotateZ: reduced ? -45 : turn,
        }}
      >
        {PLANES.map((_, i) => (
          <Plane key={i} i={i} z={z[i]} active={active} pulse={pulse} shown={shown} />
        ))}
        {[0, 1, 2].flatMap((i) =>
          RISERS.map(([x, y], j) => (
            <Riser
              key={`${i}-${j}`}
              x={x}
              y={y}
              z0={z[i]}
              z1={z[i + 1]}
              lit={i === active || i + 1 === active}
              feeding={i + 1 === active || (active === 0 && i === 0)}
              flow={shown && !reduced}
              delay={i * 0.6 + j * 1.3}
            />
          )),
        )}
      </m.div>

      {STAGES.map((s, i) => (
        <StageLabel
          key={s.plane}
          i={i}
          z={z[i]}
          gap={gap}
          active={active}
          shown={shown}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export function Architecture() {
  const [active, setActive] = useState(0);

  // Arrow keys / Home / End move between stages, as in a standard accordion
  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = STAGES.length - 1;
    const next =
      e.key === "ArrowDown"
        ? Math.min(last, i + 1)
        : e.key === "ArrowUp"
          ? Math.max(0, i - 1)
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : -1;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    document.getElementById(`stage-${next}`)?.focus();
  };

  return (
    <Section id="architecture">
      <Container>
        <div className="grid grid-cols-12 gap-x-8 gap-y-16">
          <div className="col-span-12 lg:col-span-6 lg:pr-12">
            <SectionHeader
              eyebrow="System architecture"
              lines={["How a SYNAPSTREAM platform works"]}
              lead="Every platform we deliver follows the same four-stage structure. Select a stage to inspect what it does and the components it is typically built from."
            />

            <Stagger as="ol" delay={0.2} className="mt-16 border-t border-line">
              {STAGES.map((s, i) => {
                const open = i === active;
                return (
                  <Item as="li" key={s.title} className="border-b border-line">
                    <h3>
                      <button
                        type="button"
                        id={`stage-${i}`}
                        aria-expanded={open}
                        aria-controls={`stage-panel-${i}`}
                        onClick={() => setActive(i)}
                        onKeyDown={(e) => onKey(e, i)}
                        className="group flex w-full items-center gap-6 py-7 text-left"
                      >
                        <Numeral
                          n={i + 1}
                          className={`w-10 text-[15px] transition-colors ${open ? "text-white" : "text-step-2"}`}
                        />
                        <span className="flex-1">
                          <span className="block text-sm font-medium text-silver">
                            Stage {String(i + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={`mt-1 block text-xl font-semibold tracking-[-0.015em] transition-colors ${
                              open ? "text-white" : "text-mist group-hover:text-white"
                            }`}
                          >
                            {s.title}
                          </span>
                        </span>
                        <span
                          className={`tile-xs grid size-9 shrink-0 place-items-center border transition-colors ${
                            open
                              ? "border-white bg-white text-black"
                              : "border-step-1 text-silver group-hover:border-step-2"
                          }`}
                        >
                          <svg
                            viewBox="0 0 12 12"
                            className={`size-3 transition-transform duration-300 ${open ? "rotate-45" : ""}`}
                            aria-hidden
                          >
                            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" />
                          </svg>
                        </span>
                      </button>
                    </h3>
                    <div
                      id={`stage-panel-${i}`}
                      role="region"
                      aria-labelledby={`stage-${i}`}
                      className={`grid transition-[grid-template-rows] duration-500 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                    >
                      <div
                        className={`overflow-hidden transition-opacity duration-500 ${open ? "opacity-100 delay-100" : "opacity-0"}`}
                        inert={!open}
                      >
                        <div className="pb-9 pl-16">
                          <p className="max-w-[62ch] text-base leading-[1.65] text-silver">
                            {s.body}
                          </p>
                          <p className="mt-6 text-sm font-medium text-mist">Typical components</p>
                          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                            {s.components.map((c) => (
                              <li
                                key={c}
                                className="tile-xs border border-line px-3.5 py-2.5 font-mono text-[12px] text-mist"
                              >
                                {c}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Item>
                );
              })}
            </Stagger>
          </div>

          <div className="col-span-12 hidden lg:col-span-6 lg:block">
            <div className="sticky top-28">
              <IsoDiagram active={active} onSelect={setActive} />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
