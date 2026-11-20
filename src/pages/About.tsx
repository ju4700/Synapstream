import { useState } from "react";
import { m, AnimatePresence } from "motion/react";
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
} from "../motion";

const TENETS = [
  {
    n: "01",
    title: "Clarity Over Cleverness",
    body: "We favor explicit, readable, well-typed codebases and proven architectural patterns over unnecessary abstraction. Systems must remain understandable and maintainable to internal engineering teams long after initial handover.",
  },
  {
    n: "02",
    title: "Contract-First Integration",
    body: "Every internal boundary, data pipeline, and API is governed by strict, versioned schemas (OpenAPI 3.1, GraphQL, typed RPC). Clear contracts eliminate ambiguity between frontends, microservices, and external partner ecosystems.",
  },
  {
    n: "03",
    title: "Security & Privacy by Design",
    body: "Access control, least-privilege execution, input validation, and tamper-evident audit logging are engineered from sprint zero rather than bolted on before release. Every system is built to withstand real institutional scrutiny.",
  },
  {
    n: "04",
    title: "Operational Observability",
    body: "Production software is only as dependable as its visibility. We instrument applications with OpenTelemetry tracing, structured JSON logs, and proactive latency alerting so operational teams detect and diagnose bottlenecks in seconds.",
  },
  {
    n: "05",
    title: "Incremental, Verifiable Delivery",
    body: "Large initiatives are decomposed into demonstrable two-week vertical slices. Stakeholders review working software in dedicated staging environments at every milestone, eliminating schedule risk and ensuring continuous strategic alignment.",
  },
];

const GOV_CAPABILITIES = [
  {
    title: "National Registries & Public Administration",
    desc: "Bespoke citizen portals, civil licensing, healthcare registries, and institutional workflows engineered for peak nationwide concurrency, multi-lingual accessibility, and zero data loss.",
  },
  {
    title: "100% Jurisdictional Data Sovereignty",
    desc: "Zero exposure to extraterritorial jurisdiction. Deployed directly within national data centers, private GovCloud accounts, or dedicated hardware with independent encryption key custody.",
  },
  {
    title: "Air-Gapped & Offline-First Resiliency",
    desc: "Critical systems engineered to install, validate, and execute continuously on isolated networks disconnected from the public internet, featuring secure cryptographic offline sync.",
  },
  {
    title: "Full Codebase & Blueprint Handover",
    desc: "Zero vendor lock-in. Full source code repositories, infrastructure definitions, schema documentation, and operational runbooks are transferred entirely to the client upon milestone completion.",
  },
];

const AI_CAPABILITIES = [
  {
    title: "Private & Air-Gapped LLM Deployments",
    desc: "Deploying high-capability open-weight models (Llama, DeepSeek, Mistral) on your dedicated on-premise hardware or private cloud. Zero external API calls, zero data retention, and zero training on institutional records.",
  },
  {
    title: "High-Precision Enterprise RAG",
    desc: "Retrieval-Augmented Generation across millions of regulatory, legal, and operational documents. Strict role-based access filtering (RBAC) and mathematical citation verification prevent hallucinations.",
  },
  {
    title: "Deterministic Document Intelligence",
    desc: "Automated ingestion, OCR, classification, and structured schema extraction across historical archives, invoices, clinical charts, and registry files—transforming paper silos into queryable databases.",
  },
  {
    title: "Auditable Agentic Automation",
    desc: "Self-executing operational pipelines equipped with deterministic guardrails, human-in-the-loop approvals, and immutable audit logs that trace every autonomous step with complete forensic accountability.",
  },
];

const TECH_STACK = [
  {
    discipline: "Frontend & Web",
    tools: "TypeScript, React 19, Next.js, Tailwind CSS, Accessible Primitives",
    rationale: "Strong type safety, server-side rendering for load speed, maintainable component reuse with zero layout shift.",
  },
  {
    discipline: "Backend & Distributed Systems",
    tools: "Node.js (TypeScript), Python (FastAPI / Django), Go, OpenAPI 3.1, GraphQL",
    rationale: "High developer velocity, robust concurrency models, strict schema validation, and mature security libraries.",
  },
  {
    discipline: "Data, Streaming & Persistence",
    tools: "PostgreSQL, Redis, Apache Kafka, RabbitMQ, S3-Compatible Object Storage",
    rationale: "ACID transactional consistency, reliable background job queues, and durable binary asset storage.",
  },
  {
    discipline: "Cloud, Sovereign Ops & Security",
    tools: "Docker, Kubernetes, Terraform (IaC), Linux, OpenTelemetry, Prometheus",
    rationale: "Reproducible deployments, zero-downtime releases, automated rollbacks, and proactive observability.",
  },
];

export function About() {
  return (
    <div className="pt-24 pb-20 lg:pt-36">
      {/* -------------------------------------------------------------------- */}
      {/* 1. EDITORIAL HERO & THESIS (NO BOXED CARDS)                          */}
      {/* -------------------------------------------------------------------- */}
      <section className="relative pb-24 md:pb-36">
        <Container>
          <div className="border-b border-hairline pb-16 md:pb-24">
            <Reveal delay={0.05}>
              <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-silver">
                <span className="size-1.5 bg-white" />
                <span>About Synapstream &bull; Engineering & Digital Systems</span>
              </div>
            </Reveal>

            <h1 className="mt-8 max-w-5xl text-[36px] font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-[54px] md:text-[68px] lg:text-[76px]">
              <MaskLine>We engineer digital infrastructure</MaskLine>
              <MaskLine>where failure is not an option.</MaskLine>
            </h1>

            {/* Asymmetrical 2-Column Editorial Intro */}
            <div className="mt-12 grid gap-10 md:grid-cols-12 md:items-start lg:mt-16">
              <div className="md:col-span-5">
                <p className="font-display text-lg sm:text-xl font-normal leading-snug tracking-tight text-white">
                  Rather than treating software as a disposable deliverable, we engineer long-lived
                  platforms grounded in clean architecture, deterministic delivery, and measurable reliability.
                </p>
                <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 font-mono text-xs uppercase tracking-wider text-silver">
                  <div>
                    <span className="block text-2xl font-semibold text-white">100%</span>
                    <span>Codebase Handover</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-semibold text-white">Zero</span>
                    <span>Vendor Lock-In</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-semibold text-white">Air-Gapped</span>
                    <span>Sovereignty</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6 text-[15px] sm:text-base leading-[1.75] text-mist md:col-span-7 md:border-l md:border-hairline md:pl-10">
                <p>
                  Modern organizations frequently outgrow fragmented spreadsheets, brittle legacy
                  tools, and disconnected third-party software. Synapstream bridges this operational gap
                  by translating complex domain workflows into cohesive, high-throughput web
                  applications, automated data pipelines, and secure multi-tenant platforms.
                </p>
                <p>
                  Our engineering teams work directly with business stakeholders, technical leaders,
                  and operational staff to ensure that architectural choices reflect real-world constraints
                  rather than theoretical trends. Every system we build is designed to scale gracefully
                  alongside the institutions that depend on it.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 2. THE ENGINEERING MANDATE (FULL-BLEED EDITORIAL QUOTE)              */}
      {/* -------------------------------------------------------------------- */}
      <section className="relative pb-24 md:pb-36">
        <Container>
          <div className="relative py-8 md:py-12">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-silver">
              The Engineering Mandate
            </span>
            <blockquote className="mt-6 max-w-4xl text-[24px] sm:text-[34px] md:text-[42px] font-medium leading-[1.25] tracking-[-0.02em] text-white">
              &ldquo;Build software that is unambiguous in its architecture, transparent in its
              operation, secure by default, and effortless for the people who rely on it every day. Every
              line of production code must serve a verifiable operational objective.&rdquo;
            </blockquote>
            <p className="mt-6 font-mono text-xs uppercase tracking-widest text-silver">
              — Synapstream Architecture Protocol
            </p>
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 3. SOVEREIGN GOVERNMENT PRACTICE (EDITORIAL DEEP DIVE)               */}
      {/* -------------------------------------------------------------------- */}
      <section className="relative border-t border-hairline py-24 md:py-36">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            {/* Left Column: Mission Narrative */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-silver">
                Public Sector Practice
              </span>
              <Heading as="h2" className="mt-4 text-[28px] sm:text-[38px] leading-[1.15]">
                Sovereign Digital Systems for National Institutions
              </Heading>
              <p className="mt-6 text-[15px] sm:text-base leading-[1.7] text-mist">
                Ministries, defense bodies, and public authorities cannot outsource their operational
                sovereignty to opaque third-party software vendors. We architect resilient systems
                engineered to handle citizen-scale workloads while remaining strictly under statutory control.
              </p>
              <div className="mt-8 border-l border-white/20 pl-4 text-xs font-mono text-silver">
                <span>GOVERNMENT SYSTEMS SPECIFICATION</span>
                <p className="mt-2 text-white">
                  Air-gapped compatibility &bull; 100% jurisdictional residency &bull; Zero external telemetry
                </p>
              </div>
            </div>

            {/* Right Column: Architectural Pillars (Typographic List with Lines) */}
            <div className="divide-y divide-hairline border-y border-hairline lg:col-span-7">
              {GOV_CAPABILITIES.map((cap, i) => (
                <div key={cap.title} className="py-8 sm:py-10">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-mono text-xs text-silver">0{i + 1}</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                      Sovereign Mandate
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold tracking-[-0.015em] text-white">
                    {cap.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.7] text-silver">
                    {cap.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 4. APPLIED ENTERPRISE & SOVEREIGN AI (EDITORIAL DEEP DIVE)           */}
      {/* -------------------------------------------------------------------- */}
      <section className="relative border-t border-hairline py-24 md:py-36">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            {/* Left Column: AI Narrative */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-silver">
                Artificial Intelligence Practice
              </span>
              <Heading as="h2" className="mt-4 text-[28px] sm:text-[38px] leading-[1.15]">
                Private, Deterministic AI for High-Stakes Operations
              </Heading>
              <p className="mt-6 text-[15px] sm:text-base leading-[1.7] text-mist">
                Consumer AI models introduce severe vulnerabilities: data leakage, non-deterministic
                hallucinations, and unverified outputs. Synapstream engineers sovereign, private AI
                infrastructure deployed directly inside your secure perimeter.
              </p>
              <div className="mt-8 border-l border-white/20 pl-4 text-xs font-mono text-silver">
                <span>ENTERPRISE AI STANDARD</span>
                <p className="mt-2 text-white">
                  Zero training on client data &bull; Mathematical citation grounding &bull; Human-in-the-loop
                </p>
              </div>
            </div>

            {/* Right Column: AI Capabilities (Typographic List with Lines) */}
            <div className="divide-y divide-hairline border-y border-hairline lg:col-span-7">
              {AI_CAPABILITIES.map((cap, i) => (
                <div key={cap.title} className="py-8 sm:py-10">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-mono text-xs text-silver">0{i + 1}</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                      Private AI Architecture
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold tracking-[-0.015em] text-white">
                    {cap.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.7] text-silver">
                    {cap.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 5. FIVE CORE ARCHITECTURAL TENETS (MANIFESTO LAYOUT)                 */}
      {/* -------------------------------------------------------------------- */}
      <section className="relative border-t border-hairline py-24 md:py-36">
        <Container>
          <div className="border-b border-hairline pb-12">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-silver">
              Engineering Governance
            </span>
            <Heading as="h2" className="mt-4 text-[28px] sm:text-[40px]">
              Five Non-Negotiable Architectural Tenets
            </Heading>
            <p className="mt-4 max-w-2xl text-[15px] sm:text-base leading-relaxed text-silver">
              Across all client engagements—from greenfield SaaS platforms to national system
              modernizations—Synapstream operates under five core principles that govern how code is
              designed, verified, and shipped.
            </p>
          </div>

          <div className="divide-y divide-hairline">
            {TENETS.map((t) => (
              <div
                key={t.title}
                className="grid gap-6 py-10 sm:grid-cols-12 sm:items-baseline md:py-14"
              >
                <div className="sm:col-span-2">
                  <span className="font-display text-2xl sm:text-3xl font-normal text-white">
                    {t.n}
                  </span>
                </div>
                <div className="sm:col-span-4">
                  <h3 className="text-xl sm:text-2xl font-semibold tracking-[-0.015em] text-white">
                    {t.title}
                  </h3>
                </div>
                <div className="sm:col-span-6">
                  <p className="text-[15px] sm:text-base leading-[1.75] text-mist">
                    {t.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 6. TECHNOLOGY MATRIX (CLEAN EDITORIAL SPECIFICATION)                 */}
      {/* -------------------------------------------------------------------- */}
      <section className="relative border-t border-hairline py-24 md:py-36">
        <Container>
          <div className="border-b border-hairline pb-12">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-silver">
              Technical Standards
            </span>
            <Heading as="h2" className="mt-4 text-[28px] sm:text-[40px]">
              Technology Stack Selection Rationale
            </Heading>
            <p className="mt-4 max-w-2xl text-[15px] sm:text-base leading-relaxed text-silver">
              We select technologies based on ecosystem health, developer productivity, runtime
              performance, and ease of hiring for internal teams. We strictly avoid fragile, experimental
              toolchains in mission-critical environments.
            </p>
          </div>

          <div className="mt-8 divide-y divide-hairline">
            {TECH_STACK.map((tech) => (
              <div
                key={tech.discipline}
                className="grid gap-4 py-8 sm:grid-cols-12 sm:items-baseline"
              >
                <div className="sm:col-span-3">
                  <h3 className="text-base font-semibold text-white">{tech.discipline}</h3>
                </div>
                <div className="sm:col-span-4">
                  <p className="font-mono text-xs sm:text-[13px] leading-relaxed text-silver">
                    {tech.tools}
                  </p>
                </div>
                <div className="sm:col-span-5">
                  <p className="text-[14px] leading-relaxed text-mist">
                    {tech.rationale}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 7. THE SYNAPSTREAM COVENANT & 100% IP OWNERSHIP                      */}
      {/* -------------------------------------------------------------------- */}
      <section className="relative border-t border-hairline py-24 md:py-36">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-silver">
                Institutional Guarantee
              </span>
              <Heading as="h2" className="mt-4 text-[30px] sm:text-[44px] leading-[1.12]">
                100% Client Intellectual Property Ownership
              </Heading>
              <p className="mt-6 text-[16px] sm:text-[18px] leading-[1.75] text-mist">
                Clients retain complete, unencumbered ownership of all custom source code,
                architecture blueprints, schema definitions, and cloud infrastructure configurations
                developed under their engagement. We work directly inside client-owned Git repositories
                from day zero—ensuring zero vendor lock-in and complete transparency into every commit.
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <ButtonLink href="/#contact" size="lg" className="w-full sm:w-auto">
                <span>Initiate Architecture Consultation</span>
                <Arrow />
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
