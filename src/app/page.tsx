"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState, useEffect } from "react";

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
        <main className="w-full h-screen bg-black overflow-hidden relative flex items-center justify-center cursor-pointer">
            {/* 3D Scene */}
            <div className="absolute inset-0 z-0">
                <Spline scene="/scene.splinecode" />
            </div>

            {/* Top Center IEEE-style Text */}
            <div className="absolute top-32 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none max-w-3xl w-full px-8 opacity-90 hover:opacity-100 transition-opacity duration-500">
                <div className="border-t-[1.5px] border-b-[1.5px] border-black/40 py-4 columns-1 md:columns-2 gap-10 text-justify text-[11px] text-black/80 font-serif leading-[1.7]">
                    <p className="mb-4 md:mb-0 break-inside-avoid">
                        <strong className="text-black font-bold font-sans tracking-wider text-[10px]">I. ABSTRACT &mdash; </strong> 
                        Synapstream engineers the next generation of data infrastructure for public sector entities. By leveraging state-of-the-art computational models and scalable architecture, we bridge the gap between legacy government systems and modern analytical frameworks, delivering highly secure and robust solutions at an unprecedented global scale.
                    </p>
                    <p className="break-inside-avoid">
                        <strong className="text-black font-bold font-sans tracking-wider text-[10px]">II. SERVICES & WORK &mdash; </strong> 
                        Our core competencies encompass large-scale data ingestion, distributed database architecture, and bespoke creative software design. We continuously synthesize complex, fragmented data pipelines into intuitive, high-performance applications tailored for mission-critical operations, empowering agencies with actionable intelligence.
                    </p>
                </div>

                {/* APEX-IDS2026 Reference */}
                <div className="pt-4 flex flex-col gap-1.5 pointer-events-auto">
                    <div className="flex justify-between items-center text-[9px] md:text-[10px] font-sans text-black/60">
                        <span className="uppercase tracking-widest font-bold">Featured Project &mdash; Open Source</span>
                        <a 
                            href="https://github.com/ju4700/APEX-IDS2026" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-black/80 hover:text-black font-bold hover:underline decoration-1 underline-offset-4 transition-all tracking-wider"
                        >
                            APEX-IDS2026 &#8599;
                        </a>
                    </div>
                    <p className="text-[10.5px] text-black/80 font-serif leading-relaxed text-justify">
                        One of the world's largest open-source datasets, featuring over 20 Billion network flows captured via NetFlow v9. It serves as a foundational benchmarking framework for training state-of-the-art anomaly detection and intrusion detection systems (IDS).
                    </p>
                </div>

                {/* LinkUp BD Reference */}
                <div className="pt-3 border-t border-black/20 flex flex-col gap-1.5 pointer-events-auto mt-2">
                    <div className="flex justify-between items-center text-[9px] md:text-[10px] font-sans text-black/60">
                        <span className="uppercase tracking-widest font-bold">Enterprise Client &mdash; ISP</span>
                        <a 
                            href="http://www.linkupbd.net/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-black/80 hover:text-black font-bold hover:underline decoration-1 underline-offset-4 transition-all tracking-wider uppercase"
                        >
                            LinkUp BD &#8599;
                        </a>
                    </div>
                    <p className="text-[10.5px] text-black/80 font-serif leading-relaxed text-justify">
                        Architected robust ISP infrastructure and custom enterprise billing software, currently powering and managing network services for more than 5,300 active clients.
                    </p>
                </div>
            </div>

            {/* Bottom Left Content */}
            <div className="absolute bottom-20 left-24 z-10 pointer-events-auto flex flex-col items-start gap-4">
                {/* Description */}
                <p className="max-w-md text-black/80 font-sans text-sm md:text-base leading-relaxed tracking-wide drop-shadow-sm font-medium">
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
