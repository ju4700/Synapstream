import type { PointerEvent } from "react";
import { Item, Stagger, StepTile } from "../motion";
import { Container, Heading, Numeral, Section, SectionHeader } from "./brand";

/** Track the pointer so a faint light can follow it across the card. */
function trackPointer(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

type Pillar = {
  n: number;
  title: string;
  discipline: string;
  summary: string;
  focusAreas: { title: string; desc: string }[];
  inverted?: boolean;
};

const PILLARS: Pillar[] = [
  {
    n: 1,
    title: "Data Infrastructure & Systems Architecture",
    discipline: "Infrastructure discipline",
    summary:
      "We design and build the foundational systems that collect, clean, store, and protect your organization’s most critical records—turning scattered departmental silos into a single, dependable source of truth.",
    focusAreas: [
      {
        title: "Unified Warehousing & Lakes",
        desc: "Consolidating disparate ERP records and databases into structured, query-ready repositories.",
      },
      {
        title: "Resilient Pipelines & Gateways",
        desc: "Automated ingestion, real-time synchronization, and zero-trust API middleware connecting systems.",
      },
      {
        title: "Sovereign Cloud Orchestration",
        desc: "Containerized, fault-tolerant infrastructure deployed on your hardware or chosen sovereign cloud.",
      },
    ],
  },
  {
    n: 2,
    title: "Enterprise & Creative Software Solutions",
    discipline: "Software discipline",
    summary:
      "Data is only valuable when teams can act on it. We design and engineer custom web platforms, internal operational tools, and high-velocity creative workflows tailored to how your organization operates.",
    inverted: true,
    focusAreas: [
      {
        title: "Custom Operational Portals",
        desc: "High-concurrency, role-based web applications engineered for daily institutional operations.",
      },
      {
        title: "Workflow & Process Automation",
        desc: "Replacing manual approval chains and paper-heavy administration with auditable digital pipelines.",
      },
      {
        title: "Enterprise UI & Asset Systems",
        desc: "Cohesive component libraries and digital asset ecosystems unifying multiple subsidiaries.",
      },
    ],
  },
];

function PillarCard({ p, delay }: { p: Pillar; delay: number }) {
  const inv = !!p.inverted;
  return (
    <StepTile
      as="article"
      hover
      delay={delay}
      onPointerMove={trackPointer}
      className={`tile-lg group relative flex flex-col justify-between overflow-hidden p-6 sm:p-8 md:p-14 ${
        inv ? "bg-white text-black" : "border border-line bg-obsidian text-white"
      }`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(520px circle at var(--mx, 50%) var(--my, 0%), ${
            inv ? "rgba(0,0,0,0.045)" : "rgba(255,255,255,0.07)"
          }, transparent 65%)`,
        }}
      />
      <div>
        <div className="flex items-start justify-between gap-6">
          <Numeral
            n={p.n}
            className={`text-[32px] sm:text-[40px] leading-none ${inv ? "text-black" : "text-white"}`}
          />
          <span className={`text-xs sm:text-sm font-medium ${inv ? "text-neutral-500" : "text-silver"}`}>
            {p.discipline}
          </span>
        </div>
        <Heading as="h3" className="mt-8 sm:mt-12 text-[clamp(21px,2.2vw,32px)]">
          {p.title}
        </Heading>
        <p
          className={`mt-4 sm:mt-6 max-w-[62ch] text-[15px] sm:text-lg leading-[1.65] ${inv ? "text-neutral-700" : "text-mist"}`}
        >
          {p.summary}
        </p>
      </div>

      <Stagger
        as="div"
        delay={delay + 0.3}
        stagger={0.08}
        amount={0.2}
        className={`mt-10 flex flex-1 flex-col divide-y border-t ${
          inv ? "divide-neutral-200 border-neutral-200" : "divide-line border-line"
        }`}
        aria-label={`${p.title} focus areas`}
      >
        {p.focusAreas.map((f, idx) => (
          <Item
            as="div"
            key={f.title}
            className="flex flex-col py-4 sm:py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
          >
            <div className="flex items-baseline gap-3">
              <span
                className={`font-mono text-xs tabular-nums ${
                  inv ? "text-neutral-400" : "text-step-2"
                }`}
              >
                {String(idx + 1).padStart(2, "0")}
              </span>
              <h4 className="text-[15px] sm:text-base font-semibold tracking-[-0.01em]">
                {f.title}
              </h4>
            </div>
            <p
              className={`mt-1.5 sm:mt-0 text-[13px] sm:text-[14px] leading-relaxed sm:max-w-[34ch] sm:text-right ${
                inv ? "text-neutral-600" : "text-silver"
              }`}
            >
              {f.desc}
            </p>
          </Item>
        ))}
      </Stagger>
    </StepTile>
  );
}

export function Capabilities() {
  return (
    <Section id="capabilities">
      <Container>
        <SectionHeader
          center
          eyebrow="Core capabilities"
          lines={["Two core disciplines.", "One engineering standard."]}
          lead="Complex organizations rarely fail from a lack of data—they stall because their underlying infrastructure and the software their people actually use are built in isolation. SYNAPSTREAM engineers both as a unified system."
        />

        <div className="mt-12 sm:mt-20 grid gap-8 sm:gap-10 pb-0 pr-0 md:pb-5 md:pr-5 lg:grid-cols-2">
          {PILLARS.map((p, i) => (
            <PillarCard key={p.n} p={p} delay={i * 0.15} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
