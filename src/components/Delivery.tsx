import { useRef, useState } from "react";
import { m, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { DrawLine, Item, Stagger, StepTile, useIsMobile } from "../motion";
import { Container, Heading, Numeral, Section, SectionHeader } from "./brand";

const SECTORS = [
  {
    title: "For Government & Public Sector Institutions",
    intro:
      "Ministries, agencies, and public bodies whose systems serve citizens and must remain under strict sovereign jurisdiction.",
    mandates: [
      {
        t: "Data Sovereignty & Air-Gap",
        d: "100% jurisdictional data residency, isolated network capability, and independent encryption keys.",
      },
      {
        t: "Citizen-Scale Reliability",
        d: "Engineered and stress-tested for nationwide concurrency without performance degradation.",
      },
      {
        t: "Full Institutional Autonomy",
        d: "Source code, architectural blueprints, and schema documentation handed over in full.",
      },
    ],
  },
  {
    title: "For Enterprise Conglomerates",
    intro:
      "Multi-industry groups that require a single dependable operational truth across distributed entities and brands.",
    inverted: true,
    mandates: [
      {
        t: "Unified Enterprise Governance",
        d: "A reconciled group-wide data foundation spanning subsidiaries, regional ledgers, and legacy ERPs.",
      },
      {
        t: "Purpose-Built Operations",
        d: "Custom software applications built for critical internal workflows off-the-shelf SaaS cannot accommodate.",
      },
      {
        t: "Enterprise Asset Distribution",
        d: "High-velocity media, brand, and operational asset pipelines governing multi-agency production.",
      },
    ],
  },
];

const STEPS = [
  {
    title: "Systems Audit & Discovery",
    body: "Mapping existing bottlenecks, data silos, and operational requirements with stakeholders and technical leads.",
    output: "Current-state assessment and prioritized requirements",
  },
  {
    title: "Architecture Blueprint",
    body: "Defining data models, security perimeters, infrastructure topology, and interface prototypes before writing production code.",
    output: "Architecture documents and clickable prototypes",
  },
  {
    title: "Iterative Engineering",
    body: "Developing in transparent milestones with rigorous automated testing, code reviews, and staging deployments.",
    output: "Tested releases reviewed in a staging environment",
  },
  {
    title: "Deployment & Knowledge Transfer",
    body: "Launching into production with full technical documentation, staff training, and ongoing SLA support.",
    output: "Production system, documentation, and trained staff",
  },
];

export function Delivery() {
  return (
    <Section id="delivery">
      <Container>
        {/* Part A — sector focus */}
        <SectionHeader
          center
          eyebrow="Who we build for"
          lines={["Two kinds of organization.", "The same long‑term responsibility."]}
          lead="Our work is shaped by clients whose systems are expected to run reliably for years, under real institutional scrutiny."
        />
        <div className="mt-20">
          <div className="space-y-8 sm:space-y-10 pb-0 pr-0 md:pb-5 md:pr-5">
            {SECTORS.map((s) => {
              const inv = !!s.inverted;
              return (
                <StepTile
                  as="article"
                  hover
                  key={s.title}
                  className={`tile-lg grid gap-8 sm:gap-10 p-6 sm:p-8 md:p-14 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] ${
                    inv ? "bg-white text-black" : "border border-line bg-obsidian text-white"
                  }`}
                >
                  <div>
                    <Heading as="h3" className="text-[20px] sm:text-[28px]">
                      {s.title}
                    </Heading>
                    <p
                      className={`mt-4 sm:mt-5 text-[15px] sm:text-base leading-[1.65] ${inv ? "text-neutral-600" : "text-silver"}`}
                    >
                      {s.intro}
                    </p>
                  </div>
                  <Stagger
                    as="div"
                    delay={0.45}
                    amount={0.3}
                    className={`divide-y border-y ${inv ? "divide-neutral-200 border-neutral-200" : "divide-line border-line"}`}
                  >
                    {s.mandates.map((m, idx) => (
                      <Item as="div" key={m.t} className="grid gap-1.5 py-5 sm:py-6">
                        <div className="flex items-center gap-3 text-[15px] sm:text-base font-semibold tracking-[-0.01em]">
                          <span
                            className={`font-mono text-xs tabular-nums ${
                              inv ? "text-neutral-400" : "text-step-2"
                            }`}
                          >
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <h4>{m.t}</h4>
                        </div>
                        <p
                          className={`pl-7 text-[14px] leading-relaxed ${inv ? "text-neutral-600" : "text-silver"}`}
                        >
                          {m.d}
                        </p>
                      </Item>
                    ))}
                  </Stagger>
                </StepTile>
              );
            })}
          </div>
        </div>

        {/* Part B — engagement model */}
        <div className="relative mt-24 pt-24 lg:mt-40 lg:pt-40">
          <DrawLine className="absolute inset-x-0 top-0 h-px bg-hairline" />
          <SectionHeader
            center
            eyebrow="How we deliver"
            lines={["Our engineering engagement model"]}
            lead="Four clearly bounded phases, each ending in a deliverable you can review, approve, and keep—so progress is visible and nothing depends on trust alone."
          />

          <Phases />
        </div>
      </Container>
    </Section>
  );
}

/** The four phases, joined by a line that draws 01 → 04 with scroll; each phase brightens as it's reached. */
function Phases() {
  const ref = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "start 35%"] });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [reached, setReached] = useState(reduced || isMobile ? STEPS.length : 0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!reduced && !isMobile) setReached(Math.min(STEPS.length, Math.floor(v * STEPS.length + 0.75)));
  });

  return (
    <Stagger
      as="ol"
      ref={ref}
      stagger={0.1}
      className="relative mt-20 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-4"
    >
      <m.span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 hidden h-px origin-left bg-white lg:block"
        style={{ scaleX: reduced ? 1 : scaleX }}
      />
      {STEPS.map((s, i) => {
        const on = i < reached;
        return (
          <Item as="li" key={s.title} className="flex flex-col border-t border-line pt-10">
            <div className="flex items-center gap-4">
              <Numeral
                n={i + 1}
                className={`text-[40px] leading-none transition-colors duration-700 ${on ? "text-white" : "text-step-2 max-lg:text-white"}`}
              />
              {i < STEPS.length - 1 && (
                <span
                  className="hidden h-px flex-1 bg-gradient-to-r from-step-1 to-transparent lg:block"
                  aria-hidden
                />
              )}
            </div>
            <h3
              className={`mt-10 text-xl font-semibold leading-[1.25] tracking-[-0.015em] transition-colors duration-700 ${on ? "text-white" : "text-silver max-lg:text-white"}`}
            >
              {s.title}
            </h3>
            <p className="mt-4 text-base leading-[1.65] text-silver">{s.body}</p>
            <div className="mt-auto pt-8">
              <div
                className={`tile-sm border bg-obsidian p-5 pt-4 transition-colors duration-700 ${on ? "border-step-1" : "border-line"}`}
              >
                <span className="text-xs font-medium text-step-2">Phase output</span>
                <p className="mt-1.5 text-sm leading-snug text-mist">{s.output}</p>
              </div>
            </div>
          </Item>
        );
      })}
    </Stagger>
  );
}
