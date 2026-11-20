import { m } from "motion/react";
import { CircularCarousel, type CarouselItem } from "../components/reactbits/CircularCarousel";
import {
  Container,
  Heading,
  Numeral,
  Section,
  ButtonLink,
  Arrow,
} from "../components/brand";
import {
  DrawLine,
  EASE_OUT,
  Item,
  MaskLine,
  Reveal,
  Stagger,
  StepTile,
  useIsMobile,
} from "../motion";

/* -------------------------------------------------------------------------- */
/*                                    DATA                                    */
/* -------------------------------------------------------------------------- */

const TENETS = [
  {
    n: 1,
    title: "Clarity Over Cleverness",
    summary:
      "We favor explicit, readable, well-typed codebases and proven architectural patterns over unnecessary abstraction. Systems must remain understandable to internal engineering teams long after initial handover.",
    tag: "Maintainability",
  },
  {
    n: 2,
    title: "Contract-First Integration",
    summary:
      "Every service boundary, data pipeline, and API is governed by strict, versioned schemas (OpenAPI 3.1, GraphQL, typed RPC). Clear contracts eliminate ambiguity between user interfaces, distributed microservices, and partner integrations.",
    tag: "Type Safety",
  },
  {
    n: 3,
    title: "Security & Privacy by Design",
    summary:
      "Access control, least-privilege execution, input sanitation, and tamper-evident audit logging are engineered from sprint zero rather than bolted on before release. Every system is built to withstand real institutional scrutiny.",
    tag: "Defense-in-Depth",
  },
  {
    n: 4,
    title: "Operational Observability",
    summary:
      "Production software is only as dependable as its visibility. We instrument applications with OpenTelemetry tracing, structured JSON logs, and proactive latency alerting so operational teams detect and diagnose bottlenecks in seconds.",
    tag: "Telemetry",
  },
  {
    n: 5,
    title: "Incremental, Verifiable Delivery",
    summary:
      "Large initiatives are decomposed into demonstrable two-week vertical slices. Stakeholders review working software in dedicated staging environments at every milestone, eliminating schedule risk and ensuring continuous strategic alignment.",
    tag: "Deterministic SDLC",
  },
];

const SOVEREIGN_CAROUSEL_ITEMS: CarouselItem[] = [
  {
    src: "/carousel/pcb-circuits.jpg",
    alt: "Printed circuit board microarchitecture and precision gold trace routing",
    title: "Sovereign Silicon",
    subtitle: "Isolated Hardware Architectures",
  },
  {
    src: "/carousel/hardware-lab.jpg",
    alt: "Electronics prototyping laboratory and precision multimeter telemetry",
    title: "Hardware Validation",
    subtitle: "Physical Signal Benchmarking",
  },
  {
    src: "/carousel/bionic-interface.jpg",
    alt: "Cybernetic bionic hand interface under precision blue illumination",
    title: "Human-in-the-Loop",
    subtitle: "Auditable Autonomous Controls",
  },
  {
    src: "/carousel/infrastructure-cabling.jpg",
    alt: "High-density industrial cabling bundle for isolated networks",
    title: "Air-Gapped Telemetry",
    subtitle: "Zero External Network Transit",
  },
  {
    src: "/carousel/cybernetic-intelligence.jpg",
    alt: "Monochrome cybernetic intelligence sculpture and neural network geometry",
    title: "Machine Intelligence",
    subtitle: "Private Open-Weight Inference",
  },
  {
    src: "/carousel/server-rack-patching.jpg",
    alt: "Structured enterprise server rack with high-throughput patch routing",
    title: "GovCloud Infrastructure",
    subtitle: "Statutory Data Center Nodes",
  },
  {
    src: "/carousel/tensor-junction.jpg",
    alt: "Geometric 3D coordinate tensor junction representing multi-dimensional system routing",
    title: "Tensor Topologies",
    subtitle: "High-Dimensional Coordinate Routing",
  },
  {
    src: "/carousel/llm-architecture.jpg",
    alt: "Minimalist architectural 3D typography of LLM foundation model",
    title: "Sovereign LLMs",
    subtitle: "Private In-Jurisdiction Execution",
  },
  {
    src: "/carousel/codebase-terminal.jpg",
    alt: "High-density source code terminal and algorithmic execution logic",
    title: "Deterministic Codebases",
    subtitle: "Type-Safe Architectural Handover",
  },
  {
    src: "/carousel/embedded-motherboard.jpg",
    alt: "Industrial computing motherboard with integrated processing chips",
    title: "Embedded Architectures",
    subtitle: "Statutory Hardware Security Modules",
  },
  {
    src: "/carousel/industrial-hydraulics.jpg",
    alt: "Heavy industrial hydraulic control assemblies and ruggedized field wiring",
    title: "Civil Infrastructure",
    subtitle: "Field Instrumentation & Operations",
  },
  {
    src: "/carousel/systems-workshop.jpg",
    alt: "Workstation hardware array and field systems deployment kits",
    title: "Station Runbooks",
    subtitle: "100% Operational Handover",
  },
];

const PHASES = [
  {
    phase: "01",
    name: "Discovery, Domain Modeling & Architecture",
    duration: "Week 1 - 2",
    description:
      "Solution architects and technical leads conduct structured workshops to map workflows, security constraints, and integration boundaries. We produce a formal Technical Architecture Document (TAD) and schema models.",
    gate: "Architecture Approval",
  },
  {
    phase: "02",
    name: "Experience Design & Interface Specification",
    duration: "Week 3 - 4",
    description:
      "Interactive high-fidelity wireframes, design tokens, and component specifications are created. User journeys are validated before writing extensive frontend code to prevent expensive mid-build reworks.",
    gate: "Design Sign-Off",
  },
  {
    phase: "03",
    name: "Iterative Sprint Engineering",
    duration: "Sprint Cycles",
    description:
      "Development proceeds in focused two-week sprints. Every commit undergoes automated linting, type-checking, test verification, and peer review before deploying to a dedicated client staging environment.",
    gate: "Sprint Demos",
  },
  {
    phase: "04",
    name: "Verification, Security & User Acceptance",
    duration: "Pre-Release",
    description:
      "End-to-end regression testing, synthetic load benchmarking under simulated peak concurrency, OWASP Top 10 security audits, and structured client User Acceptance Testing (UAT).",
    gate: "UAT Sign-Off",
  },
  {
    phase: "05",
    name: "Production Rollout, Handover & Evolution",
    duration: "Launch",
    description:
      "Scripted, zero-downtime deployment with live telemetry. 100% codebase repositories, infrastructure scripts, and operational runbooks are transferred to your team with continuous SLA support.",
    gate: "Production Acceptance",
  },
];

const ENGAGEMENT_MODELS = [
  {
    title: "Fixed-Scope Project Delivery",
    tag: "Milestone-Driven",
    bestFor: "Clearly defined initiatives such as institutional portals, greenfield SaaS MVPs, or scoped integrations.",
    deliverables: "Architecture blueprint, formal milestone schedule, bi-weekly staging builds, final production deployment.",
  },
  {
    title: "Dedicated Engineering Squad",
    tag: "Roadmap Acceleration",
    bestFor: "Enterprises and high-growth technology companies requiring continuous, multi-quarter engineering velocity.",
    deliverables: "Cross-functional team (Architecture, Backend, Frontend, QA) integrated directly into your sprint backlog and standups.",
  },
  {
    title: "Technical Advisory & System Rescue",
    tag: "Stabilization & Audits",
    bestFor: "Organizations experiencing architectural bottlenecks, security vulnerabilities, or stalled legacy systems.",
    deliverables: "Forensic code audit, database query profiling, security remediation roadmap, hands-on refactoring.",
  },
];

/* -------------------------------------------------------------------------- */
/*                               ABOUT COMPONENT                              */
/* -------------------------------------------------------------------------- */

export function About() {
  const isMobile = useIsMobile();

  return (
    <div className="pt-24 lg:pt-32">
      {/* -------------------------------------------------------------------- */}
      {/* 1. HERO SECTION                                                      */}
      {/* -------------------------------------------------------------------- */}
      <section className="relative overflow-hidden pt-8 pb-20 md:pt-14 md:pb-28">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <Reveal delay={0.05}>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-mono uppercase tracking-[0.16em] text-silver backdrop-blur-md">
                <span className="size-1.5 rounded-full bg-white animate-pulse" />
                Firm Overview & Institutional Engineering
              </div>
            </Reveal>

            <h1 className="mt-8 text-[32px] font-semibold leading-[1.12] tracking-[-0.025em] text-white sm:text-[46px] md:text-[58px]">
              <MaskLine>Engineering long-lived digital</MaskLine>
              <MaskLine>systems where failure</MaskLine>
              <MaskLine className="text-silver">is not an option.</MaskLine>
            </h1>

            <Reveal delay={0.25}>
              <p className="mx-auto mt-8 max-w-[68ch] text-[16px] sm:text-[18px] leading-[1.7] text-mist">
                Synapstream is an institutional software engineering firm focused on designing,
                building, and operating resilient digital systems for sovereign governments,
                commercial conglomerates, and mission-critical technology platforms. Rather than
                treating software as a disposable deliverable, we engineer platforms grounded in
                clean architecture, deterministic delivery, and measurable operational reliability.
              </p>
            </Reveal>

            {/* Engineering Mandate Callout Box */}
            <Reveal delay={0.35}>
              <div className="tile mt-12 border border-white/15 bg-obsidian/90 p-6 sm:p-10 text-left shadow-[0_12px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl">
                <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-silver">
                    The Engineering Mandate
                  </span>
                  <span className="font-mono text-xs text-step-2">SYNAPSTREAM PROTOCOL</span>
                </div>
                <blockquote className="mt-5 text-[17px] sm:text-[20px] font-medium leading-[1.55] tracking-[-0.01em] text-white">
                  &ldquo;Build software that is unambiguous in its architecture, transparent in its
                  operation, secure by default, and effortless for the people who rely on it every day.
                  Every line of production code must serve a verifiable operational objective.&rdquo;
                </blockquote>
              </div>
            </Reveal>

            {/* Quick Metrics */}
            <Reveal delay={0.45}>
              <div className="mt-12 grid grid-cols-2 gap-4 text-left sm:grid-cols-4">
                {[
                  { metric: "100%", label: "IP & Code Handover", sub: "Zero vendor lock-in" },
                  { metric: "Zero", label: "Third-Party Data Leak", sub: "Strict sovereign boundary" },
                  { metric: "Air-Gapped", label: "Infrastructure Ready", sub: "Isolated network execution" },
                  { metric: "Contract", label: "First Architecture", sub: "Type-safe OpenAPI & schemas" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="tile-sm border border-line bg-obsidian/60 p-4 sm:p-5"
                  >
                    <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white">
                      {stat.metric}
                    </span>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-white">
                      {stat.label}
                    </p>
                    <p className="mt-0.5 text-[11px] text-neutral-400">{stat.sub}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 2. FIVE CORE ARCHITECTURAL TENETS                                    */}
      {/* -------------------------------------------------------------------- */}
      <Section id="tenets" className="border-t border-hairline">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-silver">
              Engineering System
            </span>
            <Heading as="h2" className="mt-4 text-[26px] sm:text-[36px]">
              Five Non-Negotiable Architectural Tenets
            </Heading>
            <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-silver">
              From greenfield platform builds to complex sovereign modernizations, Synapstream operates
              under five strict architectural standards that govern how we design, verify, and maintain software.
            </p>
          </div>

          <Stagger
            as="div"
            delay={0.2}
            stagger={0.08}
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-6"
          >
            {TENETS.map((t, idx) => (
              <Item
                as="div"
                key={t.title}
                className={
                  idx < 3
                    ? "lg:col-span-2"
                    : idx === 3
                      ? "lg:col-span-2 lg:col-start-2"
                      : "sm:col-span-2 lg:col-span-2 sm:max-w-md sm:mx-auto lg:max-w-none w-full"
                }
              >
                <StepTile
                  as="article"
                  hover
                  delay={idx * 0.1}
                  className="tile-lg flex h-full flex-col justify-between border border-line bg-obsidian p-6 sm:p-8"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <Numeral n={t.n} className="text-2xl text-white" />
                      <span className="tile-xs border border-line bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-silver">
                        {t.tag}
                      </span>
                    </div>
                    <h3 className="mt-6 text-lg font-semibold tracking-[-0.015em] text-white">
                      {t.title}
                    </h3>
                    <p className="mt-3 text-[14px] leading-[1.65] text-mist">
                      {t.summary}
                    </p>
                  </div>
                </StepTile>
              </Item>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* -------------------------------------------------------------------- */}
      {/* 3. SOVEREIGN TOPOLOGY & DEPLOYMENT NODES (CIRCULAR CAROUSEL)         */}
      {/* -------------------------------------------------------------------- */}
      <Section id="operational-nodes" className="relative border-t border-hairline bg-[#040404] py-14 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-silver">
              Operational Environments
            </span>
            <Heading as="h2" className="mt-4 text-[26px] sm:text-[36px]">
              Sovereign Topologies & Deployment Nodes
            </Heading>
            <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-silver text-justify [text-align-last:center]">
              Interactive spatial visualization of certified operational deployment footprints across
              sovereign data centers, private GovClouds, and isolated machine intelligence enclaves.
            </p>
          </div>

          <div
            className="relative mt-8 sm:mt-12 lg:mt-14 w-full overflow-hidden h-[580px] sm:h-[700px] lg:h-[820px]"
            style={{ width: "100%", position: "relative" }}
          >
            <CircularCarousel
              items={SOVEREIGN_CAROUSEL_ITEMS}
              preset="cylinder"
              intro="rise"
              cardWidth={360}
              aspectRatio={0.64}
              gap={28}
              cornerRadius={16}
              speed={11}
              fadeColor="#040404"
              captions
            />
          </div>
        </Container>
      </Section>

      {/* -------------------------------------------------------------------- */}
      {/* 5. 5-PHASE DELIVERY SYSTEM (SDLC)                                     */}
      {/* -------------------------------------------------------------------- */}
      <Section id="sdlc" className="border-t border-hairline">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-silver">
              Deterministic Execution
            </span>
            <Heading as="h2" className="mt-4 text-[26px] sm:text-[36px]">
              The Five-Phase Delivery System
            </Heading>
            <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-silver">
              Software delivery fails from optimistic schedules and vague boundaries. We structure every
              engagement with formalized milestone sign-off gates.
            </p>
          </div>

          <div className="mt-16 space-y-4">
            {PHASES.map((phase) => (
              <div
                key={phase.phase}
                className="tile-sm grid gap-6 border border-line bg-obsidian p-6 sm:p-8 transition-colors hover:border-white/30 md:grid-cols-[100px_1fr_240px] md:items-center"
              >
                <div className="flex items-center gap-3 md:block">
                  <Numeral n={phase.phase} className="text-3xl text-white" />
                  <span className="block font-mono text-xs text-neutral-400 md:mt-1">
                    {phase.duration}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{phase.name}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-mist">
                    {phase.description}
                  </p>
                </div>
                <div className="border-t border-line pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400">
                    Sign-Off Gate
                  </span>
                  <p className="mt-1 font-semibold text-white">{phase.gate}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* -------------------------------------------------------------------- */}
      {/* 7. ENGAGEMENT MODELS & 100% IP COVENANT                              */}
      {/* -------------------------------------------------------------------- */}
      <Section id="engagement-models" className="border-t border-hairline bg-[#040404]">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-silver">
              Collaboration Structures
            </span>
            <Heading as="h2" className="mt-4 text-[26px] sm:text-[36px]">
              Transparent Engagement Models
            </Heading>
            <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-silver">
              Align commercial and technical terms with your organization's exact maturity and roadmap stage.
            </p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {ENGAGEMENT_MODELS.map((m) => (
              <div
                key={m.title}
                className="tile flex flex-col justify-between border border-line bg-obsidian p-7 transition-colors hover:border-white/30"
              >
                <div>
                  <span className="tile-xs border border-line bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-silver">
                    {m.tag}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-white">{m.title}</h3>
                  <div className="mt-4 border-t border-line pt-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                      Best For
                    </span>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-mist">{m.bestFor}</p>
                  </div>
                </div>
                <div className="mt-6 border-t border-line pt-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    Key Deliverables
                  </span>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-silver">{m.deliverables}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 100% IP Ownership Guarantee */}
          <div className="tile mt-12 border border-white/20 bg-white text-black p-8 sm:p-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-600">
                  The Synapstream Covenant
                </span>
                <h3 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-[-0.015em] text-black">
                  100% Client Intellectual Property Ownership
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-neutral-700">
                  Clients retain complete, unencumbered ownership of all custom source code,
                  architecture documents, schema definitions, and infrastructure scripts developed under
                  their engagement. We commit directly to client-owned Git repositories from day zero—guaranteeing
                  full institutional sovereignty and zero vendor lock-in.
                </p>
              </div>
              <div className="shrink-0">
                <ButtonLink href="/#contact" variant="black" size="lg" className="w-full sm:w-auto">
                  <span>Initiate Consultation</span>
                  <Arrow />
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
