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
  summary: string;
  deliverables: { title: string; body: string }[];
  inverted?: boolean;
};

const PILLARS: Pillar[] = [
  {
    n: 1,
    title: "Data Infrastructure & Systems Architecture",
    summary:
      "We design and build the foundational systems that collect, clean, store, and protect your organization’s most critical records—turning scattered departmental silos into a single, dependable source of truth.",
    deliverables: [
      {
        title: "Unified Data Warehousing & Lakes",
        body: "Consolidating fragmented databases, spreadsheets, and legacy ERP records into structured, query-ready repositories.",
      },
      {
        title: "High-Throughput ETL/ELT Pipelines",
        body: "Automated data ingestion, validation, and real-time synchronization across distributed branches and ministries.",
      },
      {
        title: "Interoperability & API Gateways",
        body: "Secure REST, GraphQL, and event-driven middleware connecting legacy software with modern applications.",
      },
      {
        title: "On-Premise & Private Cloud Orchestration",
        body: "Containerized, fault-tolerant infrastructure deployed directly on your hardware or chosen sovereign cloud.",
      },
    ],
  },
  {
    n: 2,
    title: "Enterprise & Creative Software Solutions",
    summary:
      "Data is only valuable when teams can act on it. We design and engineer custom web platforms, internal operational tools, and high-velocity creative workflows tailored to how your organization operates.",
    inverted: true,
    deliverables: [
      {
        title: "Custom Operational & Citizen Portals",
        body: "Fast, accessible, role-based web applications built for high concurrency and daily institutional use.",
      },
      {
        title: "Digital Asset & Media Ecosystems",
        body: "Centralized platforms for managing, versioning, and distributing brand, media, and production assets at conglomerate scale.",
      },
      {
        title: "Workflow & Process Automation",
        body: "Replacing manual approval chains and paper-heavy administration with auditable digital workflows.",
      },
      {
        title: "Enterprise Design Systems",
        body: "Cohesive, reusable UI component libraries that unify software experiences across multiple subsidiaries and departments.",
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
      className={`tile-lg group relative flex flex-col overflow-hidden p-6 sm:p-8 md:p-14 ${
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
      <div className="flex items-start justify-between gap-6">
        <Numeral
          n={p.n}
          className={`text-[32px] sm:text-[40px] leading-none ${inv ? "text-black" : "text-white"}`}
        />
        <span className={`text-xs sm:text-sm font-medium ${inv ? "text-neutral-500" : "text-silver"}`}>
          {inv ? "Software discipline" : "Infrastructure discipline"}
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

      <Stagger
        as="ul"
        delay={delay + 0.5}
        stagger={0.09}
        amount={0.3}
        className={`relative mt-12 grid flex-1 border-l border-t sm:grid-cols-2 ${inv ? "border-neutral-200" : "border-line"}`}
        aria-label={`${p.title} deliverables`}
      >
        {p.deliverables.map((d) => (
          <Item
            as="li"
            key={d.title}
            className={`border-b border-r p-7 ${inv ? "border-neutral-200" : "border-line"}`}
          >
            <span className={`block size-2 ${inv ? "bg-black" : "bg-white"}`} aria-hidden />
            <h4 className="mt-5 text-base font-semibold leading-snug tracking-[-0.01em]">
              {d.title}
            </h4>
            <p
              className={`mt-3 text-[15px] leading-[1.65] ${inv ? "text-neutral-600" : "text-silver"}`}
            >
              {d.body}
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
