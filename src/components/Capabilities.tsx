import React from "react";
import LineWaves from "@/components/LineWaves";

const capabilities = [
    {
        id: "01",
        domain: "Database Infrastructure",
        title: "Enterprise-Scale Storage & Management Systems",
        description:
            "Design and deployment of high-throughput database architectures for large-scale institutional data — including spatial databases, GIS-integrated data lakes, and multi-terabyte Parquet-based storage systems optimized for government and urban planning workloads.",
    },
    {
        id: "02",
        domain: "Geospatial & Smart City Systems",
        title: "Spatial Data Engineering & Metropolitan Analytics",
        description:
            "End-to-end engineering of geospatial data pipelines for urban planning authorities. We deliver structured data environments capable of ingesting, normalizing, and serving multi-source metropolitan datasets — from drone-captured aerial surveys to real-time sensor feeds.",
    },
    {
        id: "03",
        domain: "Government-Grade Procurement",
        title: "Integrated Hardware & Software Solutions",
        description:
            "Full-stack procurement and deployment of integrated IT infrastructure — from server-class hardware and network switching to custom enterprise software. All engagements are compliant with government procurement standards and designed for zero-downtime institutional operations.",
    },
    {
        id: "04",
        domain: "Systems Integration",
        title: "Custom Software & ITES Delivery",
        description:
            "Bespoke software development and IT-enabled services (ITES) for government and semi-autonomous organizations. Our delivery model covers requirements analysis, system architecture, implementation, and long-term maintenance under SLA-bound operational guarantees.",
    },
];

export default function Capabilities() {
    return (
        <section className="w-full mb-24 relative z-20">
            <div className="bg-[#0A0A0A] overflow-hidden relative">
                {/* Background LineWaves */}
                <div className="absolute inset-0 z-0 opacity-25 pointer-events-none">
                    <LineWaves
                        speed={0.1}
                        innerLineCount={64}
                        outerLineCount={72}
                        warpIntensity={1.0}
                        rotation={-45}
                        edgeFadeWidth={0.0}
                        colorCycleSpeed={1.0}
                        brightness={0.2}
                        color1="#ffffff"
                        color2="#ffffff"
                        color3="#ffffff"
                    />
                </div>

                <div className="relative z-10 px-6 py-12 md:px-12 md:py-16 max-w-[1400px] mx-auto">
                    {/* Section Header */}
                    <div className="mb-12 flex flex-col items-center text-center">
                        <p className="font-jetbrains text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/40 font-bold mb-3">
                            Domain Expertise
                        </p>
                        <h2 className="font-inter text-3xl md:text-4xl font-bold text-white tracking-tight max-w-2xl leading-tight">
                            Built for Institutional & Government-Scale
                            Deployments
                        </h2>
                    </div>

                    {/* Capabilities Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 rounded-xl overflow-hidden">
                        {capabilities.map((cap) => (
                            <div
                                key={cap.id}
                                className="bg-[#0A0A0A] p-8 md:p-10 flex flex-col gap-4 group hover:bg-[#111111] transition-colors duration-300"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-jetbrains text-[9px] tracking-[0.25em] uppercase text-white/35 font-bold">
                                        {cap.domain}
                                    </span>
                                    <span className="font-jetbrains text-[9px] tracking-[0.2em] text-white/15 font-bold">
                                        {cap.id}
                                    </span>
                                </div>
                                <h3 className="font-inter text-lg md:text-xl font-bold text-white tracking-tight leading-snug">
                                    {cap.title}
                                </h3>
                                <p className="font-inter text-xs md:text-sm leading-[1.85] text-white/50 font-medium text-justify">
                                    {cap.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Tag */}
                    <div className="mt-8 flex items-center justify-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                        <p className="font-jetbrains text-[9px] tracking-[0.2em] uppercase text-white font-bold">
                            All engagements comply with national e-GP
                            procurement standards
                        </p>
                        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    </div>
                </div>
            </div>
        </section>
    );
}
