import { useRef, type ReactNode } from "react";
import { m, useInView } from "motion/react";
import { EASE_OUT, StepTile, useIsMobile } from "../motion";
import { Numeral } from "./brand";

/** Build order (seconds after the card enters view), following the direction of data flow. */
const SEQ = {
    layers: [0.35, 0.95, 1.55],
    connectors: [0.7, 1.3],
    ticks: 1.85,
    base: 2.05,
};

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

const FLOW = [
    {
        n: 1,
        label: "Source layer",
        title: "Legacy & field data sources",
        desc: "Ingesting records across legacy ERPs, national registries, and edge sensors without requiring disruptive migrations.",
        tags: ["ERP Systems", "National Registries", "Field Telemetry"],
    },
    {
        n: 2,
        label: "Data backbone",
        title: "SYNAPSTREAM data backbone",
        desc: "Automated pipelines, governed lakehouses, and zero-trust validation creating a single dependable source of truth.",
        tags: ["Automated Ingestion", "Lakehouse", "Access Gov"],
        core: true,
    },
    {
        n: 3,
        label: "Application layer",
        title: "Custom application layer",
        desc: "Purpose-built operational portals, executive consoles, and workflow suites tailored to institutional operations.",
        tags: ["Portals", "Executive Analytics", "Workflow Suites"],
    },
];

const ENVIRONMENTS = [
    { name: "On-premise data centers", tag: "Air-Gapped" },
    { name: "Private GovCloud", tag: "Sovereign" },
    { name: "Hybrid enterprise cloud", tag: "Distributed" },
];

function Connector({ show, delay }: { show: boolean; delay: number }) {
    return (
        <m.div
            className="hidden items-center lg:flex"
            aria-hidden
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{
                clipPath: show ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
            }}
            transition={{ duration: 0.5, ease: EASE_OUT, delay }}
        >
            <svg viewBox="0 0 48 12" className="w-12" fill="none">
                <path
                    d="M0 6h44"
                    stroke="#000"
                    strokeWidth="1.25"
                    strokeDasharray="3 3"
                />
                <path d="M40 2l5 4-5 4" stroke="#000" strokeWidth="1.25" />
            </svg>
        </m.div>
    );
}

/** Reference architecture (builds in once, then stays static) showing the four layers of a SYNAPSTREAM platform. */
export function Blueprint() {
    const ref = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();
    const inView = useInView(ref, { once: true, amount: 0.35 });
    const show = isMobile ? true : inView;
    return (
        <StepTile
            as="figure"
            className="tile-lg bg-white p-8 text-black md:p-12"
            aria-labelledby="blueprint-title"
        >
            <div ref={ref}>
                <figcaption className="flex flex-wrap items-end justify-between gap-6 border-b border-neutral-200 pb-8">
                    <div>
                        <h2
                            id="blueprint-title"
                            className="text-xl font-semibold tracking-[-0.01em]"
                        >
                            Reference architecture
                        </h2>
                        <p className="mt-2 max-w-[62ch] text-[15px] leading-relaxed text-neutral-600">
                            How the four layers of a SYNAPSTREAM platform
                            connect — from the records you already hold to the
                            software your teams use every day.
                        </p>
                    </div>
                    <p className="flex items-center gap-3 font-mono text-xs text-neutral-500">
                        <svg
                            viewBox="0 0 32 8"
                            className="w-8"
                            fill="none"
                            aria-hidden
                        >
                            <path
                                d="M0 4h28"
                                stroke="currentColor"
                                strokeDasharray="3 3"
                            />
                            <path d="M26 1l3 3-3 3" stroke="currentColor" />
                        </svg>
                        data flow
                    </p>
                </figcaption>

                <ol className="mt-10 grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
                    {FLOW.map((layer, i) => (
                        <li key={layer.n} className="contents">
                            {i > 0 && (
                                <Connector
                                    show={show}
                                    delay={SEQ.connectors[i - 1]}
                                />
                            )}
                            <Step
                                show={show}
                                delay={SEQ.layers[i]}
                                className={`tile flex flex-col justify-between p-7 ${
                                    layer.core
                                        ? "bg-black text-white"
                                        : "border border-neutral-200 bg-white"
                                }`}
                            >
                                <div>
                                    <div className="flex items-center justify-between">
                                        <Numeral
                                            n={layer.n}
                                            className={`text-lg ${layer.core ? "text-white" : "text-black"}`}
                                        />
                                        <span
                                            className={`font-mono text-[11px] uppercase tracking-[0.14em] ${layer.core ? "text-silver" : "text-neutral-500"}`}
                                        >
                                            {layer.label}
                                        </span>
                                    </div>
                                    <h3 className="mt-5 text-[17px] font-semibold leading-snug tracking-[-0.01em]">
                                        {layer.title}
                                    </h3>
                                    <p
                                        className={`mt-3 text-[14px] leading-relaxed ${layer.core ? "text-mist" : "text-neutral-600"}`}
                                    >
                                        {layer.desc}
                                    </p>
                                </div>

                                <div
                                    className={`mt-6 flex flex-wrap gap-2 border-t pt-5 ${layer.core ? "border-white/15" : "border-neutral-200"}`}
                                >
                                    {layer.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className={`tile-xs px-2.5 py-1 font-mono text-[11px] tracking-wide ${
                                                layer.core
                                                    ? "border border-white/20 bg-white/10 text-white"
                                                    : "border border-neutral-200 bg-neutral-100 text-neutral-700"
                                            }`}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </Step>
                        </li>
                    ))}
                </ol>

                {/* Layer 04 underpins every layer above it */}
                <div
                    className="mt-4 hidden grid-cols-[1fr_48px_1fr_48px_1fr] gap-4 lg:grid"
                    aria-hidden
                >
                    {[0, 1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex justify-center">
                            {i % 2 === 0 && (
                                <m.span
                                    className="h-6 w-px origin-top bg-neutral-300"
                                    initial={{ scaleY: 0 }}
                                    animate={{ scaleY: show ? 1 : 0 }}
                                    transition={{
                                        duration: 0.45,
                                        ease: EASE_OUT,
                                        delay: SEQ.ticks + i * 0.04,
                                    }}
                                />
                            )}
                        </div>
                    ))}
                </div>
                <Step
                    show={show}
                    delay={SEQ.base}
                    className="tile mt-4 grid items-center gap-6 bg-neutral-100 p-7 lg:mt-0 lg:grid-cols-[260px_1fr]"
                >
                    <div className="flex items-center gap-5">
                        <Numeral n={4} className="text-lg" />
                        <div>
                            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-500">
                                Deployment environment
                            </span>
                            <p className="mt-1 text-[15px] font-semibold">
                                Runs where you choose
                            </p>
                        </div>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                        {ENVIRONMENTS.map((env) => (
                            <div
                                key={env.name}
                                className="tile-sm flex items-center justify-between border border-neutral-300 bg-white px-5 py-4 text-[14px] font-medium"
                            >
                                <span>{env.name}</span>
                                <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                                    {env.tag}
                                </span>
                            </div>
                        ))}
                    </div>
                </Step>
            </div>
        </StepTile>
    );
}
