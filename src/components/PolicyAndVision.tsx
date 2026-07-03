import React from "react";

export default function PolicyAndVision() {
    return (
        <section className="w-full max-w-[1400px] mx-auto px-4 md:px-8 mt-0 mb-32 relative z-20">
            {/* Massive Heading */}
            <div className="border-b border-black/10 py-12 md:py-24 mb-16 relative">
                <p className="font-inter text-xs md:text-sm leading-[1.8] text-[#1A1A1A]/70 font-medium max-w-3xl mt-12 text-justify">
                    We refuse to build on synthetic foundations. The future of
                    data infrastructure demands absolute mathematical certainty,
                    zero-downtime global scalability, and a brutalist adherence
                    to native performance. We reengineer legacy systems into
                    deterministic data pipelines capable of ingesting the
                    internet's raw background radiation without a single dropped
                    packet. This document serves as the absolute specification
                    of our operational, engineering, and ethical directives.
                </p>
            </div>

            {/* Detailed Document Layout */}
            <div className="flex flex-col gap-10 md:gap-14">
                {/* Section 1: The Vision */}
                <div className="flex flex-col md:flex-row gap-12 xl:gap-24">
                    <div className="md:w-1/3 shrink-0">
                        <h3 className="font-jetbrains text-[10px] md:text-xs tracking-[0.2em] uppercase text-black/50 mb-6 font-bold border-b border-black/10 pb-2 flex justify-between">
                            <span>01</span>
                            <span>Macro Vision & Trajectory</span>
                        </h3>
                        <h4 className="font-inter font-bold text-2xl text-[#1A1A1A] tracking-tight">
                            Eradicating Synthetic Baselines
                        </h4>
                    </div>
                    <div className="md:w-2/3 flex flex-col gap-6 font-inter text-xs md:text-sm leading-[1.8] text-[#1A1A1A]/80 font-medium text-justify">
                        <p>
                            The global machine learning and cybersecurity
                            ecosystems are currently starving on legacy,
                            artificially synthesized datasets (e.g., NSL-KDD,
                            UNSW-NB15). These datasets inherently fail to
                            capture the chaotic, adversarial reality of the
                            modern internet. Our absolute vision is to
                            transition global enterprise models to run
                            exclusively on our mathematically pure,
                            live-captured volumetric flows.
                        </p>
                        <p>
                            By engineering honeypots directly into tier-1 ISP
                            infrastructure, we are capturing the raw truth of
                            the internet. Our trajectory involves scaling this
                            data-capture architecture across five distinct
                            geographical regions, effectively creating a
                            real-time pulse of global threat telemetry that
                            renders synthetic generation obsolete.
                        </p>
                        <ul className="list-disc pl-5 mt-4 flex flex-col gap-3">
                            <li>
                                <strong>Phase I:</strong> Capture and label 50
                                Billion verified malicious flows with 0% false
                                positive rates.
                            </li>
                            <li>
                                <strong>Phase II:</strong> Open-source the
                                APEX-IDS foundation to academia to force a
                                paradigm shift in baseline evaluations.
                            </li>
                            <li>
                                <strong>Phase III:</strong> Deploy native API
                                integrations for enterprise Security Operations
                                Centers (SOCs) for real-time model retraining.
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="w-full h-px bg-black/10"></div>

                {/* Section 2: Engineering Policy */}
                <div className="flex flex-col md:flex-row gap-12 xl:gap-24">
                    <div className="md:w-1/3 shrink-0">
                        <h3 className="font-jetbrains text-[10px] md:text-xs tracking-[0.2em] uppercase text-black/50 mb-6 font-bold border-b border-black/10 pb-2 flex justify-between">
                            <span>02</span>
                            <span>Engineering Directives</span>
                        </h3>
                        <h4 className="font-inter font-bold text-2xl text-[#1A1A1A] tracking-tight">
                            Zero-Noise Tolerance
                        </h4>
                    </div>
                    <div className="md:w-2/3 flex flex-col gap-6 font-inter text-xs md:text-sm leading-[1.8] text-[#1A1A1A]/80 font-medium text-justify">
                        <p>
                            We operate under a strict, unforgiving{" "}
                            <strong>Zero-Noise</strong> policy. In our
                            deterministic data pipelines, a single
                            false-positive label is treated as a critical,
                            systemic failure requiring immediate architectural
                            review. We demand perfect entropy tracking, rigorous
                            6-tuple aggregation merges, and absolute
                            mathematical purity in every output.
                        </p>
                        <p>
                            All Synapstream infrastructure must be built
                            natively using out-of-core computational standards.
                            We explicitly forbid relying on high-level,
                            memory-bound tooling. Instead, our systems leverage
                            highly parallelized DuckDB aggregations and strictly
                            partitioned Parquet architectures to circumvent the
                            Out-Of-Memory failures inherent to legacy Python
                            data-science stacks.
                        </p>
                        <div className="bg-[#fafafa] border border-black/10 p-6 rounded-lg mt-4">
                            <h5 className="font-jetbrains text-[10px] tracking-[0.2em] uppercase text-black/50 font-bold mb-4">
                                Core Technical Mandates
                            </h5>
                            <ul className="list-disc pl-5 flex flex-col gap-2 text-sm">
                                <li>
                                    All label extraction must be{" "}
                                    <strong>Deterministically Derived</strong>{" "}
                                    from verified honeypot payload signatures.
                                    No heuristics allowed in ground-truth
                                    generation.
                                </li>
                                <li>
                                    Data pipelines must support{" "}
                                    <strong>Out-Of-Core execution</strong> by
                                    default. Datasets that cannot be queried on
                                    machines with 16GB of RAM are considered
                                    architecturally flawed.
                                </li>
                                <li>
                                    All backend services must be written in
                                    strongly-typed, memory-safe languages
                                    (Rust/Go) or executed within mathematically
                                    verified VM environments.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="w-full h-px bg-black/10"></div>

                {/* Section 3: Operational Directives */}
                <div className="flex flex-col md:flex-row gap-12 xl:gap-24">
                    <div className="md:w-1/3 shrink-0">
                        <h3 className="font-jetbrains text-[10px] md:text-xs tracking-[0.2em] uppercase text-black/50 mb-6 font-bold border-b border-black/10 pb-2 flex justify-between">
                            <span>03</span>
                            <span>Operational Standards</span>
                        </h3>
                        <h4 className="font-inter font-bold text-2xl text-[#1A1A1A] tracking-tight">
                            Absolute Security & Integrity
                        </h4>
                    </div>
                    <div className="md:w-2/3 flex flex-col gap-6 font-inter text-xs md:text-sm leading-[1.8] text-[#1A1A1A]/80 font-medium text-justify">
                        <p>
                            Every system deployed by Synapstream is designed
                            security-first, from bare-metal orchestration down
                            to the application layer. Beyond our foundational data pipelines, 
                            we engineer highly-optimized, enterprise-grade software applications.
                            Whether we are architecting bespoke, high-frequency billing
                            frameworks for 5,000+ active enterprise clients, building robust internal operational tooling, or
                            deploying stealth deep-packet inspection nodes, we
                            guarantee zero-downtime availability under extreme
                            adversarial conditions.
                        </p>
                        <p>
                            We optimize exclusively for mission-critical
                            reliability, native bare-metal performance, and
                            mathematically verified data integrity. Our
                            infrastructure is heavily compartmentalized,
                            employing zero-trust methodologies internally. Every
                            API endpoint, database transaction, and
                            inter-service communication is explicitly
                            authenticated and aggressively rate-limited.
                        </p>
                        <ul className="list-disc pl-5 mt-4 flex flex-col gap-3">
                            <li>
                                <strong>Redundancy Protocol:</strong> All active
                                operational services deploy in N+2
                                high-availability clusters spanning multiple
                                geographically isolated datacenters.
                            </li>
                            <li>
                                <strong>Auditing Standards:</strong> Every
                                configuration change and deployment is immutable
                                and cryptographically signed.
                            </li>
                            <li>
                                <strong>Client Data Isolation:</strong>{" "}
                                Enterprise tenant data is cryptographically
                                separated. We do not aggregate or blend
                                proprietary client data under any circumstances.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
