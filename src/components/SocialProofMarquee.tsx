import { useState } from "react";
import { DrawLine, Reveal } from "../motion";

type LogoItem = {
    src: string;
    alt: string;
    className: string;
};

// 1. Static Company & Institutional Partner Logos (NO CARDS, NO SLIDING, NO NAMES, PROPERLY WHITE)
const PARTNER_LOGOS: LogoItem[] = [
    {
        src: "/logos/cda.png",
        alt: "CDA",
        className: "h-11 md:h-12 w-auto object-contain",
    },
    {
        src: "/logos/linkup.png",
        alt: "LinkUp",
        className: "h-9 md:h-10 w-auto object-contain",
    },
    {
        src: "/logos/brtc.png",
        alt: "BRTC",
        className: "h-11 md:h-12 w-auto object-contain",
    },
    {
        src: "/logos/esri.svg",
        alt: "ESRI",
        className: "h-8 md:h-9 w-auto object-contain",
    },
    {
        src: "/logos/frobel.png",
        alt: "Frobel Academy",
        className: "h-10 md:h-11 w-auto object-contain",
    },
    {
        src: "/logos/lalsabuj.png",
        alt: "Lal Sabuj Society",
        className: "h-7 md:h-8 w-auto object-contain",
    },
];

// 2. Open Industry Technology Standards (Minimal sliding marquee, NO CARDS, PROPERLY WHITE)
const TECH_LOGOS: LogoItem[] = [
    {
        src: "/logos/postgresql.svg",
        alt: "PostgreSQL",
        className: "h-7 md:h-8 w-auto object-contain",
    },
    {
        src: "/logos/kubernetes.svg",
        alt: "Kubernetes",
        className: "h-7 md:h-8 w-auto object-contain",
    },
    {
        src: "/logos/opentelemetry.svg",
        alt: "OpenTelemetry",
        className: "h-7 md:h-8 w-auto object-contain",
    },
    {
        src: "/logos/docker.svg",
        alt: "Docker",
        className: "h-7 md:h-8 w-auto object-contain",
    },
    {
        src: "/logos/apachekafka.svg",
        alt: "Apache Kafka",
        className: "h-7 md:h-8 w-auto object-contain",
    },
    {
        src: "/logos/duckdb.svg",
        alt: "DuckDB",
        className: "h-7 md:h-8 w-auto object-contain",
    },
    {
        src: "/logos/redis.svg",
        alt: "Redis",
        className: "h-7 md:h-8 w-auto object-contain",
    },
    {
        src: "/logos/python.svg",
        alt: "Python",
        className: "h-7 md:h-8 w-auto object-contain",
    },
    {
        src: "/logos/linux.svg",
        alt: "Linux",
        className: "h-7 md:h-8 w-auto object-contain",
    },
    {
        src: "/logos/openid.svg",
        alt: "OpenID",
        className: "h-7 md:h-8 w-auto object-contain",
    },
];

export function SocialProofMarquee() {
    const [techPaused, setTechPaused] = useState(false);

    return (
        <div className="relative mt-24 flex flex-col items-center pt-32">
            <DrawLine className="absolute inset-x-0 top-0 h-px bg-hairline" />

            {/* Row 1: Static Partner Logos (NO CARDS, NO SLIDING, NO NAMES, PROPERLY WHITE) */}
            <div className="w-full max-w-5xl mx-auto px-6 mb-16">
                <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-14 md:gap-16 lg:gap-20">
                    {PARTNER_LOGOS.map((partner) => (
                        <div
                            key={partner.alt}
                            className="flex items-center justify-center transition-all duration-300 hover:scale-105"
                        >
                            <img
                                src={partner.src}
                                alt={partner.alt}
                                className={`${partner.className} opacity-90 hover:opacity-100 transition-opacity duration-300 brightness-100`}
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Subtle Section Divider */}
            <Reveal
                as="div"
                className="mb-8 flex items-center justify-center px-4 w-full max-w-3xl"
            >
                <div className="h-px flex-1 bg-hairline" />
                <p className="mx-6 font-mono text-[11px] uppercase tracking-[0.2em] text-silver">
                    Open standards we build on
                </p>
                <div className="h-px flex-1 bg-hairline" />
            </Reveal>

            {/* Row 2: Sliding Minimal Technology Standards Marquee (NO CARDS, PROPERLY WHITE) */}
            <div
                className="group relative w-full overflow-hidden py-4"
                onMouseEnter={() => setTechPaused(true)}
                onMouseLeave={() => setTechPaused(false)}
            >
                {/* Left & Right edge masks: smooth fade to black */}
                <div
                    className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 md:w-48 bg-gradient-to-r from-black via-black/80 to-transparent"
                    aria-hidden
                />
                <div
                    className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 md:w-48 bg-gradient-to-l from-black via-black/80 to-transparent"
                    aria-hidden
                />

                {/* Sliding Tech Logos Track (Leftwards) */}
                <div
                    className="flex w-max items-center gap-8 md:gap-12 animate-marquee-left"
                    style={{
                        animationPlayState: techPaused ? "paused" : "running",
                    }}
                >
                    {[
                        ...TECH_LOGOS,
                        ...TECH_LOGOS,
                        ...TECH_LOGOS,
                        ...TECH_LOGOS,
                    ].map((tech, idx) => (
                        <div
                            key={`tech-${idx}`}
                            className="flex shrink-0 items-center justify-center px-4 md:px-6 transition-all duration-300 hover:scale-110"
                        >
                            <img
                                src={tech.src}
                                alt={tech.alt}
                                className={`${tech.className} opacity-85 hover:opacity-100 transition-opacity duration-300 brightness-100`}
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
