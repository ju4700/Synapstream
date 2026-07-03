import Image from "next/image";

export default function FutureOfData() {
    return (
        <section
            id="future-of-data"
            className="w-full min-h-screen flex flex-col items-center justify-center py-32 text-[#1A1A1A] relative"
        >
            {/* Top Left Header (Logo + Description) */}
            <div className="absolute top-8 left-8 md:top-12 md:left-16 flex flex-col md:flex-row items-start md:items-start gap-6 md:gap-12 w-full max-w-5xl pr-8 md:pr-16 z-10">
                <div className="relative w-32 h-32 md:w-48 md:h-48 shrink-0">
                    <Image
                        src="/Untitled design (1).png"
                        alt="Synapstream Logo"
                        fill
                        className="object-contain object-left-top"
                        priority
                    />
                </div>
                <div className="max-w-4xl text-left md:mt-4">
                    <p className="font-inter text-xs md:text-sm leading-[1.8] text-[#1A1A1A]/80 font-medium text-justify">
                        Synapstream is a specialized Software and Data
                        Engineering firm serving government entities and
                        enterprise-scale organizations. We construct
                        high-throughput digital infrastructure, engineering
                        mathematical certainty into massive, mission-critical
                        data pipelines. By synthesizing legacy telemetry with
                        state-of-the-art out-of-core processing paradigms, we
                        transform raw, unstructured fragmentation into
                        world-class datasets and perfectly optimized,
                        zero-downtime operational software suites. We don&apos;t
                        just process data; we engineer its absolute future.
                    </p>
                </div>
            </div>
        </section>
    );
}
