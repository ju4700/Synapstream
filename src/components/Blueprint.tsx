import { useState, useRef, type ReactNode } from "react";
import { m, useInView } from "motion/react";
import { EASE_OUT, StepTile, useIsMobile } from "../motion";
import { Numeral } from "./brand";

type SectorMode = "gov" | "enterprise";

/** Build order (seconds after the card enters view) */
const SEQ = { layers: [0.2, 0.45, 0.7], connectors: [0.35, 0.6], ticks: 0.85, base: 0.95 };

function Step({
  show,
  delay,
  className = "",
  children,
}: {
  show: boolean;
  delay: number;
  className?: string;
  children: ReactNode;
}) {
  const isMobile = useIsMobile();
  if (isMobile) {
    return <div className={className}>{children}</div>;
  }
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: 0.8, ease: EASE_OUT, delay }}
    >
      {children}
    </m.div>
  );
}

function Connector({ show, delay, label }: { show: boolean; delay: number; label: string }) {
  return (
    <m.div
      className="hidden flex-col items-center justify-center px-1 lg:flex"
      aria-hidden
      initial={{ opacity: 0 }}
      animate={show ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5, ease: EASE_OUT, delay }}
    >
      <span className="mb-2 font-mono text-[9px] uppercase tracking-[0.16em] text-neutral-400">
        {label}
      </span>
      <svg viewBox="0 0 48 12" className="w-10 text-neutral-400" fill="none">
        <path d="M0 6h40" stroke="currentColor" strokeWidth="1.25" strokeDasharray="3 3" />
        <path d="M36 2l5 4-5 4" stroke="currentColor" strokeWidth="1.25" />
      </svg>
    </m.div>
  );
}

export function Blueprint() {
  const [mode, setMode] = useState<SectorMode>("gov");
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const show = isMobile ? true : inView;

  const DATA_SOURCES = mode === "gov" ? [
    { name: "Legacy DBs & Registries", desc: "Oracle ERP, MS SQL Server, FoxPro, and ASYCUDA customs feeds" },
    { name: "National Verification", desc: "Real-time NID / Porichoy API & BRTA vehicle verification gateways" },
    { name: "Spatial & GIS Assets", desc: "ESRI shapefiles & CDA master plan urban parcel geodatabases" },
    { name: "Resilient Branch Sync", desc: "Offline-first queuing for remote upazila offices & field checkpoints" },
  ] : [
    { name: "Multi-ERP Consolidation", desc: "Unifying SAP, Oracle, Tally, and decentralized Excel ledgers" },
    { name: "Industrial & Fleet Telematics", desc: "Weighbridge sensors, GPS fleet tracking & port gate RFID records" },
    { name: "Cross-Subsidiary Ingestion", desc: "Real-time streams from manufacturing plants, shipping & retail outlets" },
    { name: "Depot-Level Fault Tolerance", desc: "Offline edge caching that auto-reconciles after connectivity drops" },
  ];

  const APPLICATION_LAYERS = mode === "gov" ? [
    { name: "Executive Command Cockpits", desc: "Ministerial & DG-level dashboards with sub-second national drill-downs" },
    { name: "Field & Inspector Portals", desc: "Fast, accessible mobile interfaces for on-site audits & port clearance" },
    { name: "Citizen-Scale Public Portals", desc: "High-concurrency web applications tested against viral traffic surges" },
    { name: "Granular Multi-Tier RBAC", desc: "Strict permission boundaries between gazetted officers, staff & auditors" },
  ] : [
    { name: "Consolidated Group Cockpit", desc: "Multi-company cash flow, warehouse capacity, and reconciled group P&L" },
    { name: "Plant & Depot Workflows", desc: "High-speed operational interfaces for dispatchers, engineers & accountants" },
    { name: "Digital Asset Ecosystem", desc: "Centralized, versioned media & document repository for export & branding" },
    { name: "Enterprise Single-Sign-On", desc: "Unified staff directory with OpenID, 2FA, and full tamper-evident audit logs" },
  ];

  return (
    <StepTile
      as="figure"
      className="tile-lg bg-white p-6 sm:p-8 text-black md:p-12 shadow-none"
      aria-labelledby="blueprint-title"
    >
      <div ref={ref}>
        {/* Header & Interactive Sector Switcher */}
        <figcaption className="flex flex-col gap-6 border-b border-neutral-200 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[720px]">
            <div className="flex items-center gap-2.5">
              <span className="inline-block size-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                Institutional Architecture Blueprint
              </p>
            </div>
            <h2 id="blueprint-title" className="mt-2.5 text-2xl font-bold tracking-[-0.02em] sm:text-3xl text-black">
              The Sovereign Data Pipeline
            </h2>
            <p className="mt-2.5 text-[15px] leading-relaxed text-neutral-600 sm:text-base">
              Engineered specifically for the operational scale and infrastructure realities of Bangladesh — uniting disconnected departmental records, field terminals, and executive decision software into one fault-tolerant architecture.
            </p>
          </div>

          {/* Perspective Toggle (Public Sector vs Conglomerate) */}
          <div className="flex shrink-0 flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-400">
              Select Architecture View:
            </span>
            <div className="inline-flex rounded-full border border-neutral-300 bg-neutral-100 p-1 font-mono text-xs">
              <button
                type="button"
                onClick={() => setMode("gov")}
                className={`rounded-full px-3.5 py-1.5 transition-all duration-200 ${
                  mode === "gov"
                    ? "bg-black text-white font-medium shadow-sm"
                    : "text-neutral-600 hover:text-black"
                }`}
              >
                Public Sector &amp; Ministries
              </button>
              <button
                type="button"
                onClick={() => setMode("enterprise")}
                className={`rounded-full px-3.5 py-1.5 transition-all duration-200 ${
                  mode === "enterprise"
                    ? "bg-black text-white font-medium shadow-sm"
                    : "text-neutral-600 hover:text-black"
                }`}
              >
                Enterprise Conglomerates
              </button>
            </div>
          </div>
        </figcaption>

        {/* 3-Column Pipeline Architecture Flow */}
        <ol className="mt-10 grid gap-4 lg:grid-cols-[1fr_auto_1.1fr_auto_1fr]">
          {/* Column 01: Ingestion & Silo Federation */}
          <li className="flex flex-col">
            <Step
              show={show}
              delay={SEQ.layers[0]}
              className="tile flex h-full flex-col border border-neutral-200 bg-neutral-50/70 p-6 sm:p-7"
            >
              <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
                <Numeral n={1} className="text-xl font-bold text-black" />
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-500">
                  Ingestion &amp; Federation
                </span>
              </div>
              <h3 className="mt-5 text-[17px] font-bold leading-snug tracking-[-0.01em] text-black">
                {mode === "gov" ? "Institutional & Field Ingestion" : "Multi-Subsidiary Ingestion"}
              </h3>
              <p className="mt-1.5 text-xs text-neutral-500">
                {mode === "gov" ? "Bridges state records & field units" : "Consolidates siloed corporate ledgers"}
              </p>

              <ul className="mt-5 flex-1 space-y-3.5 border-t border-neutral-200/80 pt-5 text-[13px]">
                {DATA_SOURCES.map((item) => (
                  <li key={item.name} className="flex flex-col">
                    <span className="font-semibold text-neutral-900 flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-black shrink-0" aria-hidden />
                      {item.name}
                    </span>
                    <span className="pl-3.5 mt-0.5 text-xs text-neutral-600 leading-relaxed">
                      {item.desc}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t border-neutral-200 pt-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-500">
                  PROTOCOL: mTLS / REST / CSV / EDI
                </span>
              </div>
            </Step>
          </li>

          {/* Connector 1 -> 2 */}
          <Connector show={show} delay={SEQ.connectors[0]} label="Pipelined Stream" />

          {/* Column 02: Core Engine (Inverted Visual Anchor) */}
          <li className="flex flex-col">
            <Step
              show={show}
              delay={SEQ.layers[1]}
              className="tile flex h-full flex-col border border-black bg-black p-6 sm:p-7 text-white"
            >
              <div className="flex items-center justify-between border-b border-white/20 pb-4">
                <Numeral n={2} className="text-xl font-bold text-white" />
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-silver">
                  High-Throughput Core
                </span>
              </div>
              <h3 className="mt-5 text-[17px] font-bold leading-snug tracking-[-0.01em] text-white">
                Sovereign Processing Engine
              </h3>
              <p className="mt-1.5 text-xs text-silver">
                Automated validation, deduplication &amp; forensic auditing
              </p>

              <ul className="mt-5 flex-1 space-y-3.5 border-t border-white/15 pt-5 text-[13px] text-mist">
                <li className="flex flex-col">
                  <span className="font-semibold text-white flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-emerald-400 shrink-0" aria-hidden />
                    Event-Driven Stream Queuing
                  </span>
                  <span className="pl-3.5 mt-0.5 text-xs text-silver leading-relaxed">
                    Apache Kafka bus handling 50,000+ events/sec peak throughput without 504 timeouts
                  </span>
                </li>
                <li className="flex flex-col">
                  <span className="font-semibold text-white flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-emerald-400 shrink-0" aria-hidden />
                    Automated Reconciliation
                  </span>
                  <span className="pl-3.5 mt-0.5 text-xs text-silver leading-relaxed">
                    Eliminates ghost inventory, double-entry discrepancies &amp; conflicting field reports
                  </span>
                </li>
                <li className="flex flex-col">
                  <span className="font-semibold text-white flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-emerald-400 shrink-0" aria-hidden />
                    Tamper-Evident Audit Trails
                  </span>
                  <span className="pl-3.5 mt-0.5 text-xs text-silver leading-relaxed">
                    Cryptographic logging tracking every record read, write, and executive authorization
                  </span>
                </li>
                <li className="flex flex-col">
                  <span className="font-semibold text-white flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-emerald-400 shrink-0" aria-hidden />
                    Vectorized Query Engine
                  </span>
                  <span className="pl-3.5 mt-0.5 text-xs text-silver leading-relaxed">
                    DuckDB + PostgreSQL processing multi-million row ledgers in sub-second latency
                  </span>
                </li>
              </ul>

              <div className="mt-6 border-t border-white/15 pt-3 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-silver">
                  AES-256 / ZERO DATA LEAKAGE
                </span>
                <span className="inline-flex items-center gap-1.5 rounded bg-emerald-950/80 px-2 py-0.5 font-mono text-[10px] text-emerald-400">
                  FAIR &amp; AIR-GAPPED
                </span>
              </div>
            </Step>
          </li>

          {/* Connector 2 -> 3 */}
          <Connector show={show} delay={SEQ.connectors[1]} label="Governed Views" />

          {/* Column 03: Application & Command Layer */}
          <li className="flex flex-col">
            <Step
              show={show}
              delay={SEQ.layers[2]}
              className="tile flex h-full flex-col border border-neutral-200 bg-neutral-50/70 p-6 sm:p-7"
            >
              <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
                <Numeral n={3} className="text-xl font-bold text-black" />
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-500">
                  Application Layer
                </span>
              </div>
              <h3 className="mt-5 text-[17px] font-bold leading-snug tracking-[-0.01em] text-black">
                {mode === "gov" ? "Institutional Command Systems" : "Executive & Operations Hub"}
              </h3>
              <p className="mt-1.5 text-xs text-neutral-500">
                {mode === "gov" ? "Built for national concurrency & gazetted control" : "Built for daily high-velocity enterprise decisions"}
              </p>

              <ul className="mt-5 flex-1 space-y-3.5 border-t border-neutral-200/80 pt-5 text-[13px]">
                {APPLICATION_LAYERS.map((item) => (
                  <li key={item.name} className="flex flex-col">
                    <span className="font-semibold text-neutral-900 flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-black shrink-0" aria-hidden />
                      {item.name}
                    </span>
                    <span className="pl-3.5 mt-0.5 text-xs text-neutral-600 leading-relaxed">
                      {item.desc}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t border-neutral-200 pt-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-500">
                  INTERFACE: SUB-SECOND / RBAC ENFORCED
                </span>
              </div>
            </Step>
          </li>
        </ol>

        {/* Foundation Layer: 100% Bangladesh Data Sovereignty */}
        <div className="mt-6">
          <Step
            show={show}
            delay={SEQ.base}
            className="tile border border-neutral-300 bg-neutral-100 p-6 sm:p-7"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-[420px]">
                <div className="flex items-center gap-3">
                  <Numeral n={4} className="text-lg font-bold text-black" />
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                    Sovereign Deployment Domain
                  </span>
                </div>
                <h4 className="mt-2 text-base font-bold text-black">
                  100% Sovereign National Hosting — You Own the Hardware &amp; the Keys
                </h4>
                <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
                  Zero foreign jurisdiction exposure, zero cloud vendor lock-in. Deployed on high-security national infrastructure inside Bangladesh.
                </p>
              </div>

              {/* 3 Compliant Deployment Options */}
              <div className="grid flex-1 gap-3 sm:grid-cols-3">
                <div className="tile-sm border border-neutral-300/80 bg-white p-4">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700 block">
                    Certified Tier-IV
                  </span>
                  <p className="mt-1 text-[13px] font-bold text-neutral-900 leading-tight">
                    National Data Center
                  </p>
                  <p className="mt-1 text-[11px] text-neutral-500 leading-normal">
                    Hosted in Kaliakair (BCC / BDCCL) with 99.995% fault tolerance &amp; national security standards.
                  </p>
                </div>

                <div className="tile-sm border border-neutral-300/80 bg-white p-4">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700 block">
                    Bare-Metal On-Premise
                  </span>
                  <p className="mt-1 text-[13px] font-bold text-neutral-900 leading-tight">
                    Client Headquarter Servers
                  </p>
                  <p className="mt-1 text-[11px] text-neutral-500 leading-normal">
                    Air-gapped deployment directly in your Dhaka or Chittagong private server rooms.
                  </p>
                </div>

                <div className="tile-sm border border-neutral-300/80 bg-white p-4">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700 block">
                    Private Sovereign Cloud
                  </span>
                  <p className="mt-1 text-[13px] font-bold text-neutral-900 leading-tight">
                    Isolated Virtual Private Cloud
                  </p>
                  <p className="mt-1 text-[11px] text-neutral-500 leading-normal">
                    Containerized Kubernetes clusters with automated geo-replication and zero external telemetry.
                  </p>
                </div>
              </div>
            </div>
          </Step>
        </div>
      </div>
    </StepTile>
  );
}
