import { useState } from "react";
import { m, AnimatePresence } from "motion/react";
import { EASE_OUT } from "../../motion";
import { Numeral } from "../brand";

interface Module {
  id: string;
  name: string;
  category: "Government" | "AI" | "Enterprise" | "Security";
  tag: string;
  desc: string;
  metric: string;
  metricLabel: string;
  icon: string;
}

const MODULES: Module[] = [
  {
    id: "registry",
    name: "Sovereign Registry Engine",
    category: "Government",
    tag: "Civil Infrastructure",
    desc: "National scale citizen identity, civil licensing, and institutional records with sub-millisecond query indexing.",
    metric: "10M+",
    metricLabel: "Citizen Concurrency",
    icon: "🏛️",
  },
  {
    id: "llm",
    name: "Air-Gapped Private LLM",
    category: "AI",
    tag: "Zero-Data-Leak",
    desc: "Dedicated high-capability open-weight models (Llama, DeepSeek) hosted within sovereign perimeters without third-party APIs.",
    metric: "0 KB",
    metricLabel: "External Egress",
    icon: "⚡",
  },
  {
    id: "rag",
    name: "Deterministic Institutional RAG",
    category: "AI",
    tag: "Citation Grounding",
    desc: "Contextual vector retrieval over legal archives and regulatory schemas with mathematical citation verification.",
    metric: "99.98%",
    metricLabel: "Grounding Accuracy",
    icon: "🧠",
  },
  {
    id: "etl",
    name: "High-Throughput ETL Telemetry",
    category: "Enterprise",
    tag: "Data Ingestion",
    desc: "Kafka and RabbitMQ streaming pipelines normalizing millions of sensor logs, financial mutations, and ERP databases.",
    metric: "85K/s",
    metricLabel: "Event Ingestion",
    icon: "🔄",
  },
  {
    id: "portal",
    name: "Citizen & Staff Web Consoles",
    category: "Government",
    tag: "Accessible UI",
    desc: "WCAG AAA accessible, role-governed web applications engineered for seamless desktop and mobile point-of-service use.",
    metric: "<80ms",
    metricLabel: "Interaction Latency",
    icon: "🖥️",
  },
  {
    id: "rbac",
    name: "Zero-Trust RBAC & Audit Matrix",
    category: "Security",
    tag: "Defense-in-Depth",
    desc: "Granular attribute-based access control with cryptographically signed immutable action ledgers for public scrutiny.",
    metric: "100%",
    metricLabel: "Tamper-Evident",
    icon: "🛡️",
  },
  {
    id: "doc-ai",
    name: "Document & Archive Intelligence",
    category: "AI",
    tag: "Automated OCR",
    desc: "Machine intelligence turning historical paper registers, PDFs, and invoices into structured, normalized relational schemas.",
    metric: "12x",
    metricLabel: "Ingestion Velocity",
    icon: "📄",
  },
  {
    id: "ledger",
    name: "Double-Entry Ledger Engine",
    category: "Enterprise",
    tag: "FinOps Integrity",
    desc: "Immutable append-only ledger guaranteeing mathematical precision across multi-subsidiary billing and payment reconciliation.",
    metric: "0.00",
    metricLabel: "Reconciliation Drift",
    icon: "📊",
  },
];

export function EcosystemMosaic() {
  const [activeId, setActiveId] = useState<string>("registry");
  const selected = MODULES.find((m) => m.id === activeId) || MODULES[0];

  return (
    <div className="rounded-3xl border border-line bg-obsidian p-6 sm:p-10 lg:p-12 shadow-[0_24px_80px_rgba(0,0,0,0.8)]">
      <div className="flex flex-col justify-between gap-6 border-b border-line pb-8 md:flex-row md:items-end">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-silver">
            <span className="size-2 rounded-full bg-white animate-ping" />
            <span>Integrated Systems Ecosystem &bull; Inspired by Unified Platforms</span>
          </div>
          <h3 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-white">
            One Architecture. Every Institutional Workload.
          </h3>
          <p className="mt-2 max-w-2xl text-[15px] text-silver">
            Similar to how comprehensive enterprise operating systems unify business apps, Synapstream
            connects sovereign government registries, private AI pipelines, and enterprise ledgers into a single, cohesive ecosystem.
          </p>
        </div>

        {/* Selected Module Live Telemetry Pill */}
        <div className="flex items-center gap-4 rounded-2xl border border-line bg-black/60 px-5 py-3 backdrop-blur-md">
          <div>
            <span className="block font-display text-xl font-bold text-white">
              {selected.metric}
            </span>
            <span className="text-[11px] font-mono text-neutral-400">
              {selected.metricLabel}
            </span>
          </div>
          <div className="h-8 w-px bg-line" />
          <span className="rounded bg-white/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-white">
            {selected.category}
          </span>
        </div>
      </div>

      {/* Interactive Mosaic Grid */}
      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {MODULES.map((mod) => {
          const isActive = mod.id === activeId;
          return (
            <button
              key={mod.id}
              type="button"
              onMouseEnter={() => setActiveId(mod.id)}
              onClick={() => setActiveId(mod.id)}
              className={`group relative flex flex-col justify-between rounded-2xl border p-5 text-left transition-all duration-300 ${
                isActive
                  ? "border-white bg-white text-black shadow-[0_8px_32px_rgba(255,255,255,0.18)]"
                  : "border-line bg-black/40 text-white hover:border-white/40 hover:bg-white/[0.03]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{mod.icon}</span>
                  <span
                    className={`font-mono text-[10px] uppercase tracking-wider ${
                      isActive ? "text-neutral-600" : "text-neutral-500"
                    }`}
                  >
                    {mod.tag}
                  </span>
                </div>
                <h4
                  className={`mt-4 text-base font-semibold leading-snug tracking-[-0.01em] ${
                    isActive ? "text-black" : "text-white"
                  }`}
                >
                  {mod.name}
                </h4>
              </div>

              <div className="mt-6 flex items-center justify-between border-t pt-3 border-current/10">
                <span
                  className={`text-xs font-mono font-medium ${
                    isActive ? "text-neutral-700" : "text-silver"
                  }`}
                >
                  {mod.metric}
                </span>
                <span
                  className={`text-[11px] transition-transform duration-300 group-hover:translate-x-1 ${
                    isActive ? "text-black" : "text-neutral-400"
                  }`}
                >
                  &rarr;
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Module Detail Banner */}
      <div className="mt-6 rounded-2xl border border-line bg-black/60 p-6 backdrop-blur-md">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{selected.icon}</span>
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-silver">
                Active Architectural Module: {selected.name}
              </span>
              <p className="mt-1 text-[14px] text-mist">{selected.desc}</p>
            </div>
          </div>
          <div className="shrink-0 font-mono text-xs text-silver">
            <span className="text-white">&bull; Sovereign Protocol</span> &bull; Production Ready
          </div>
        </div>
      </div>
    </div>
  );
}
