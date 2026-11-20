import { m } from "motion/react";
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

const GOV_PILLARS = [
  {
    num: "01",
    title: "National Registries & Public Administration",
    desc: "Bespoke citizen portals, civil licensing, healthcare registries, and institutional workflows engineered for peak nationwide concurrency, multi-lingual accessibility, and zero data loss.",
    badge: "Citizen Scale",
  },
  {
    num: "02",
    title: "100% Jurisdictional Data Sovereignty",
    desc: "Zero exposure to extraterritorial jurisdiction. Deployed directly within national data centers, private GovCloud accounts, or dedicated hardware with independent encryption key custody.",
    badge: "Jurisdiction Control",
  },
  {
    num: "03",
    title: "Air-Gapped & Offline-First Resiliency",
    desc: "Critical systems engineered to install, validate, and execute continuously on isolated networks disconnected from the public internet, featuring secure cryptographic offline sync.",
    badge: "Air-Gapped",
  },
  {
    num: "04",
    title: "Full Codebase & Blueprint Handover",
    desc: "Zero vendor lock-in. Full source code repositories, infrastructure definitions, schema documentation, and operational runbooks are transferred entirely to the client upon milestone completion.",
    badge: "100% IP Transfer",
  },
];

const AI_PILLARS = [
  {
    num: "01",
    title: "Private & Air-Gapped LLM Deployments",
    desc: "Deploying high-capability open-weight models (Llama, DeepSeek, Mistral) on your dedicated on-premise hardware or private cloud. Zero external API calls, zero data retention, and zero training on institutional records.",
    badge: "Zero Leakage",
  },
  {
    num: "02",
    title: "High-Precision Enterprise RAG",
    desc: "Retrieval-Augmented Generation across millions of regulatory, legal, and operational documents. Strict role-based access filtering (RBAC) and mathematical citation verification prevent hallucinations.",
    badge: "Verifiable Citations",
  },
  {
    num: "03",
    title: "Deterministic Document & Archive Intelligence",
    desc: "Automated ingestion, OCR, classification, and structured schema extraction across historical archives, invoices, clinical charts, and registry files—transforming paper silos into queryable databases.",
    badge: "Automated Ingestion",
  },
  {
    num: "04",
    title: "Auditable Agentic Automation",
    desc: "Self-executing operational pipelines equipped with deterministic guardrails, human-in-the-loop approvals, and immutable audit logs that trace every autonomous step with complete forensic accountability.",
    badge: "Human-in-the-Loop",
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
              Engineering Governance
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
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {TENETS.map((t, idx) => (
              <Item
                as="div"
                key={t.title}
                className={idx === 4 ? "sm:col-span-2 lg:col-span-1" : ""}
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
      {/* 3. SOVEREIGN GOVERNMENT PRACTICE (EXPLICIT USER REQUEST)              */}
      {/* -------------------------------------------------------------------- */}
      <Section id="government-practice" className="relative border-t border-hairline bg-[#040404]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-start">
            <div>
              <span className="tile-xs border border-white/10 bg-white/[0.05] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-silver">
                Government & Public Institutions
              </span>
              <Heading as="h2" className="mt-6 text-[28px] sm:text-[38px] leading-[1.18]">
                Sovereign Digital Systems & Civil Infrastructure
              </Heading>
              <p className="mt-6 text-[15px] sm:text-[17px] leading-[1.7] text-silver">
                Ministries, defense bodies, and public authorities cannot outsource their operational
                sovereignty to opaque third-party software vendors. We architect resilient systems
                engineered to handle citizen-scale workloads while remaining strictly under statutory control.
              </p>
              <div className="mt-8 space-y-4 border-l border-white/15 pl-5 text-[14px] leading-relaxed text-mist">
                <p>
                  <strong>Total Regulatory Alignment:</strong> Engineered to satisfy national data protection
                  frameworks, national archival laws, and multi-tier public audit protocols.
                </p>
                <p>
                  <strong>Zero Foreign Dependency:</strong> Deployed in your sovereign data center or national
                  GovCloud, ensuring continuity even during geopolitical network disruptions.
                </p>
              </div>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              {GOV_PILLARS.map((p) => (
                <div
                  key={p.title}
                  className="tile-sm border border-line bg-obsidian/80 p-6 backdrop-blur-md transition-colors hover:border-white/30"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-silver">{p.num}</span>
                    <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] uppercase text-white">
                      {p.badge}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-white">{p.title}</h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-silver">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* -------------------------------------------------------------------- */}
      {/* 4. APPLIED ENTERPRISE & SOVEREIGN AI (EXPLICIT USER REQUEST)         */}
      {/* -------------------------------------------------------------------- */}
      <Section id="ai-practice" className="relative border-t border-hairline">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-start">
            {/* Left AI Capabilities Grid */}
            <div className="order-2 grid gap-4 sm:grid-cols-2 lg:order-1">
              {AI_PILLARS.map((a) => (
                <div
                  key={a.title}
                  className="tile-sm border border-line bg-obsidian/80 p-6 backdrop-blur-md transition-colors hover:border-white/30"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-silver">{a.num}</span>
                    <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] uppercase text-white">
                      {a.badge}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-white">{a.title}</h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-silver">{a.desc}</p>
                </div>
              ))}
            </div>

            {/* Right Copy */}
            <div className="order-1 lg:order-2">
              <span className="tile-xs border border-white/10 bg-white/[0.05] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-silver">
                Applied Artificial Intelligence
              </span>
              <Heading as="h2" className="mt-6 text-[28px] sm:text-[38px] leading-[1.18]">
                Private, Deterministic AI for High-Stakes Operations
              </Heading>
              <p className="mt-6 text-[15px] sm:text-[17px] leading-[1.7] text-silver">
                Generic consumer AI models pose unmanaged data leaks and hallucinations. Synapstream
                engineers sovereign, air-gapped machine intelligence tailored to complex institutional archives,
                operational workflows, and automated decision-support pipelines.
              </p>
              <div className="mt-8 space-y-4 border-l border-white/15 pl-5 text-[14px] leading-relaxed text-mist">
                <p>
                  <strong>Zero Training on Client Data:</strong> Your intellectual property, citizen records, and
                  proprietary datasets are never used to train or refine foundation models.
                </p>
                <p>
                  <strong>Verifiable Grounding:</strong> Every generative response is bound to mathematical
                  citations in your underlying records, ensuring tamper-evident accountability.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* -------------------------------------------------------------------- */}
      {/* 5. 5-PHASE DELIVERY GOVERNANCE (SDLC)                                 */}
      {/* -------------------------------------------------------------------- */}
      <Section id="sdlc" className="border-t border-hairline">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-silver">
              Deterministic Execution
            </span>
            <Heading as="h2" className="mt-4 text-[26px] sm:text-[36px]">
              The Five-Phase Delivery Governance
            </Heading>
            <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-silver">
              Software delivery fails from optimistic schedules and vague boundaries. We govern every
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
