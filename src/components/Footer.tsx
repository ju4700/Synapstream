"use client";

import Link from "next/link";
import LineWaves from "@/components/LineWaves";
import { useLenis } from "lenis/react";

export default function Footer() {
    const lenis = useLenis();

    const scrollToTop = () => {
        if (lenis) {
            // Heavy, slow quintic ease-out over 3 seconds
            lenis.scrollTo(0, { duration: 3, easing: (t: number) => 1 - Math.pow(1 - t, 5) });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const scrollToAbout = () => {
        if (lenis) {
            lenis.scrollTo('#future-of-data', { duration: 2, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
        } else {
            document.getElementById('future-of-data')?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="w-full pt-12 pb-12 px-4 md:px-8 flex justify-center items-center">
            <div className="w-full max-w-7xl min-h-[55vh] bg-[#050505] rounded-[3rem] px-12 pt-16 pb-8 md:px-24 md:pt-20 md:pb-12 shadow-2xl flex flex-col justify-between gap-12 relative overflow-hidden">
                {/* Background LineWaves */}
                <div className="absolute inset-0 z-0 opacity-50">
                    <LineWaves
                        speed={0.05}
                        innerLineCount={40}
                        outerLineCount={50}
                        warpIntensity={0.8}
                        rotation={-45}
                        edgeFadeWidth={0.0}
                        colorCycleSpeed={1.0}
                        brightness={0.15}
                        color1="#ffffff"
                        color2="#ffffff"
                        color3="#ffffff"
                        enableMouseInteraction={true}
                        mouseInfluence={2.0}
                    />
                </div>
                
                {/* Subtle Glow inside the card */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-white/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
                
                <div className="flex flex-col items-center text-center w-full z-10 gap-16 mt-auto">
                    {/* Brand / Logo */}
                    <div className="flex flex-col items-center gap-6">
                        <h2 className="bg-gradient-to-br from-white via-white/70 to-white/10 bg-clip-text text-transparent mix-blend-plus-lighter font-bold font-[family-name:var(--font-tech)] text-3xl md:text-5xl lg:text-6xl tracking-[0.3em] uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                            Synapstream
                        </h2>
                        <div className="flex flex-col items-center gap-3">
                            <p className="bg-gradient-to-r from-white/70 to-white/30 bg-clip-text text-transparent mix-blend-plus-lighter text-sm md:text-base font-inter max-w-lg leading-relaxed">
                                Engineering the next generation of data infrastructure and creative software solutions for governments and enterprise conglomerates.
                            </p>
                            <p className="bg-gradient-to-r from-white/50 to-white/20 bg-clip-text text-transparent mix-blend-plus-lighter italic font-inter text-sm tracking-wide">
                                &quot;Debugging Humanity&quot; &mdash; Jalal Uddin (ju4700)
                            </p>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-row flex-wrap justify-center items-center gap-8 md:gap-16 text-sm md:text-base font-jetbrains text-white/70">
                        <button onClick={scrollToTop} className="hover:text-white transition-colors duration-300 cursor-pointer">Home</button>
                        <button onClick={scrollToAbout} className="hover:text-white transition-colors duration-300 cursor-pointer">About</button>
                        <Link href="/contact" className="hover:text-white transition-colors duration-300">Contact</Link>
                    </div>
                </div>
                
                <div className="w-full border-t border-white/10 mt-16 pt-8 flex flex-col items-center justify-center z-10 gap-4">
                    {/* Copyright & Status */}
                    <div className="text-xs text-white/40 font-inter uppercase tracking-widest text-center leading-loose">
                        &copy; {new Date().getFullYear()} Synapstream. All rights reserved. <br className="md:hidden" />
                        <span className="hidden md:inline mx-4">|</span> 
                        <span className="font-jetbrains">Status: Operational</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
