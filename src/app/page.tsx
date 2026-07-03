"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState, useEffect } from "react";
import LineWaves from "@/components/LineWaves";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
    ssr: false,
});

function TypewriterEffect({ words }: { words: string[] }) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const word = words[currentWordIndex];
        const typingSpeed = isDeleting ? 25 : 50;

        if (!isDeleting && currentText === word) {
            const timeout = setTimeout(() => setIsDeleting(true), 1500);
            return () => clearTimeout(timeout);
        }

        if (isDeleting && currentText === "") {
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
            return;
        }

        const timeout = setTimeout(() => {
            setCurrentText((prev) =>
                isDeleting ? prev.slice(0, -1) : word.slice(0, prev.length + 1),
            );
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, currentWordIndex, words]);

    return (
        <span className="inline-block min-w-[160px]">
            {currentText}
            <span className="animate-[pulse_1s_ease-in-out_infinite] ml-[2px]">
                _
            </span>
        </span>
    );
}

export default function Home() {
    const taglineWords = [
        "Data Engineering",
        "Creative Software",
        "Public Datasets",
        "Digital Solutions",
    ];

    return (
        <main className="w-full h-screen overflow-hidden relative flex items-center justify-center cursor-pointer">
            {/* LineWaves Background */}
            <div className="absolute inset-0 z-0">
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
                    enableMouseInteraction={true}
                    mouseInfluence={2.0}
                />
            </div>

            {/* 3D Scene */}
            <div className="absolute inset-0 z-0">
                <Spline scene="/scene.splinecode" />
            </div>

            {/* Top Center IEEE-style Text */}
            <div className="absolute top-26 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none max-w-3xl w-full px-8 opacity-90 hover:opacity-100 transition-opacity duration-500">
                <div className="border-t-[1.5px] border-b-[1.5px] border-black/40 py-4 columns-1 md:columns-2 gap-6 text-justify text-[11px] text-[#1A1A1A] font-inter leading-relaxed tracking-[0.03em]">
                    <p className="mb-4 md:mb-0 break-inside-avoid">
                        <strong className="text-[#1A1A1A] font-bold font-jetbrains tracking-wider text-[10px]">
                            I. ABSTRACT &mdash;{" "}
                        </strong>
                        Synapstream engineers the next generation of data
                        infrastructure for public sector entities and enterprise
                        conglomerates. By leveraging state-of-the-art
                        computational models, high-throughput stream processing,
                        and scalable distributed architecture, we bridge the
                        widening gap between legacy government systems and
                        modern analytical frameworks. Our proprietary
                        ecosystems are mathematically verified to deliver highly
                        secure, fault-tolerant, and robust solutions, ensuring
                        absolute data integrity and zero-downtime scalability
                        at an unprecedented global scale.
                    </p>
                    <p className="break-inside-avoid">
                        <strong className="text-[#1A1A1A] font-bold font-jetbrains tracking-wider text-[10px]">
                            II. SERVICES & WORK &mdash;{" "}
                        </strong>
                        Our core competencies encompass massive-scale data
                        ingestion, distributed database architecture,
                        out-of-core pipeline engineering, and bespoke creative
                        software design. We continuously synthesize complex,
                        highly fragmented data pipelines into intuitive,
                        hyper-performant front-end applications tailored
                        specifically for mission-critical operations. By
                        unifying raw, unstructured telemetry with advanced
                        real-time visualization heuristics, we empower agencies
                        and enterprise stakeholders with instantaneous,
                        actionable intelligence.
                    </p>
                </div>

                <div className="relative w-full">
                    {/* APEX-IDS2026 Reference */}
                    <div className="peer/apex pt-4 flex flex-col gap-1.5 pointer-events-auto">
                        <div className="flex justify-between items-center text-[9px] md:text-[10px] font-jetbrains text-[#1A1A1A]/80">
                            <span className="uppercase tracking-widest font-bold">
                                Featured Project &mdash; Open Source
                            </span>
                            <a
                                href="https://github.com/ju4700/APEX-IDS2026"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-[#1A1A1A] hover:text-black font-bold hover:underline decoration-1 underline-offset-4 transition-all tracking-wider"
                            >
                                APEX-IDS2026 &#8599;
                            </a>
                        </div>
                        <p className="text-[10.5px] text-[#1A1A1A] font-inter leading-relaxed tracking-[0.03em] text-left">
                            A research-grade network intrusion detection dataset
                            capturing genuine threat actor behavior from the
                            live internet. Powered by a MikroTik honeypot and a
                            continuous 18-Billion flow pipeline, it serves as a
                            foundational replacement for synthetic legacy
                            benchmarks.
                        </p>
                    </div>

                    {/* LinkUp BD Reference */}
                    <div className="peer/linkup pt-3 border-t border-black/20 flex flex-col gap-1.5 pointer-events-auto mt-2">
                        <div className="flex justify-between items-center text-[9px] md:text-[10px] font-jetbrains text-[#1A1A1A]/80">
                            <span className="uppercase tracking-widest font-bold">
                                Enterprise Client &mdash; ISP
                            </span>
                            <a
                                href="http://www.linkupbd.net/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-[#1A1A1A] hover:text-black font-bold hover:underline decoration-1 underline-offset-4 transition-all tracking-wider uppercase"
                            >
                                LinkUp BD &#8599;
                            </a>
                        </div>
                        <p className="text-[10.5px] text-[#1A1A1A] font-inter leading-relaxed tracking-[0.03em] text-left">
                            Architected robust ISP infrastructure and custom
                            enterprise billing software, currently powering and
                            managing network services for more than 5,300 active
                            clients.
                        </p>
                    </div>

                    {/* APEX Glass Hover Card */}
                    <div className="absolute top-full left-0 w-full md:w-[calc(50%-1.25rem)] mt-4 p-4 rounded-md bg-white/30 backdrop-blur-md backdrop-saturate-150 border border-white shadow-lg opacity-0 peer-hover/apex:opacity-100 transition-all duration-500 pointer-events-none transform -translate-y-2 peer-hover/apex:translate-y-0 z-50">
                        <p className="text-[10.5px] text-[#1A1A1A] font-inter font-medium leading-[1.6] tracking-[0.03em] text-left">
                            <strong className="text-[#1A1A1A] font-jetbrains uppercase tracking-widest text-[9px] block mb-2 border-b border-[#1A1A1A]/10 pb-1.5">
                                Technical Overview
                            </strong>
                            This dataset utilizes a proprietary Deterministic
                            Labeling Architecture (DLA) integrated deeply with
                            Zeek Deep Packet Inspection (DPI) to extract complex
                            network semantics in real-time. By applying a
                            NAT-immune, 5-minute bucketed 6-tuple merge, it
                            produces mathematically pure malicious labels with a
                            verified 0% false positive rate for Tier 1 attacks.
                            Additionally, the project features a specialized
                            Feature as a Counter (FaaC) time-series dataset.
                            Engineered via highly parallelized out-of-core
                            DuckDB aggregations, this FaaC pipeline is natively
                            optimized for training complex volumetric LSTM
                            anomaly detectors on massive data scales without
                            memory bottlenecks.
                        </p>
                    </div>

                    {/* LinkUp BD Glass Hover Card */}
                    <div className="absolute top-full left-0 w-full md:w-[calc(50%-1.25rem)] mt-4 p-4 rounded-md bg-white/30 backdrop-blur-md backdrop-saturate-150 border border-white shadow-lg opacity-0 peer-hover/linkup:opacity-100 transition-all duration-500 pointer-events-none transform -translate-y-2 peer-hover/linkup:translate-y-0 z-50">
                        <p className="text-[10.5px] text-[#1A1A1A] font-inter font-medium leading-[1.6] tracking-[0.03em] text-left">
                            <strong className="text-[#1A1A1A] font-jetbrains uppercase tracking-widest text-[9px] block mb-2 border-b border-[#1A1A1A]/10 pb-1.5">
                                Deployment Specs
                            </strong>
                            This large-scale deployment completely automates and
                            orchestrates core ISP infrastructure, currently
                            managing robust network operations for over 5,300
                            active enterprise clients. The architecture
                            integrates a fully custom billing framework with an
                            advanced RADIUS server, ensuring seamless client
                            provisioning, automated usage tracking, and
                            instantaneous policy enforcement. Designed for high
                            availability, the infrastructure guarantees
                            zero-downtime scalability while providing deep
                            operational analytics to optimize overall bandwidth
                            distribution.
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Left Content */}
            <div className="absolute bottom-20 left-24 z-10 pointer-events-auto flex flex-col items-start gap-4">
                {/* Description */}
                <p className="max-w-md text-black/80 font-jetbrains text-sm md:text-base leading-relaxed tracking-wide drop-shadow-sm font-medium">
                    A Software and Data Engineering firm working with
                    Governments, making world-class Datasets and creative
                    Software solutions.
                </p>

                {/* Interactive Logo Group */}
                <div className="group flex items-center">
                    {/* Logo Link to Home */}
                    <Link href="/" className="flex items-center">
                        {/* Animated Line */}
                        <span className="w-6 mr-4 h-[3px] bg-black transition-all duration-300 ease-out group-hover:w-0 group-hover:mr-0"></span>

                        {/* Main Logo Text */}
                        <h1 className="text-black font-bold font-[family-name:var(--font-tech)] text-2xl md:text-3xl tracking-[0.4em] uppercase drop-shadow-[0_0_12px_rgba(0,0,0,0.4)] transition-all duration-300 ease-out group-hover:tracking-[0.3em] group-hover:drop-shadow-sm whitespace-nowrap">
                            Synapstream
                        </h1>
                    </Link>

                    {/* Sliding Tagline (Hides on hover) */}
                    <div className="grid grid-cols-[1fr] transition-all duration-500 ease-in-out group-hover:grid-cols-[0fr]">
                        <div className="overflow-hidden">
                            <div className="flex items-center whitespace-nowrap">
                                <span className="text-black/30 mx-4 opacity-100 group-hover:opacity-0 transition-opacity duration-300 text-xl font-light">
                                    |
                                </span>
                                <div className="flex items-center gap-1 text-black/70 font-bold font-sans tracking-widest text-xs md:text-sm uppercase transform translate-x-0 opacity-100 transition-all duration-500 ease-out group-hover:-translate-x-4 group-hover:opacity-0">
                                    <span>The Next Generation</span>
                                    <TypewriterEffect words={taglineWords} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sliding Contact Button (Appears on hover) */}
                    <div className="grid grid-cols-[0fr] transition-all duration-500 ease-in-out group-hover:grid-cols-[1fr]">
                        <div className="overflow-hidden">
                            <div className="flex items-center whitespace-nowrap pl-6">
                                <Link
                                    href="/contact"
                                    className="bg-black text-white hover:bg-black/80 rounded-full px-6 py-2 text-xs md:text-sm font-bold tracking-widest uppercase transition-all transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-500 shadow-[0_4px_14px_0_rgba(0,0,0,0.3)]"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
