import Image from "next/image";
import NavBar from "@/components/NavBar";
import LineWaves from "@/components/LineWaves";
import fs from "fs";
import path from "path";
import DatasetViewer from "./DatasetViewer";

function parseCSV(filePath: string) {
    try {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const lines = fileContent
            .split("\n")
            .filter((line) => line.trim() !== "");
        if (lines.length === 0) return [];

        const headers = lines[0].split(",");
        const data = [];

        // Take up to 100 data rows (skip header)
        const rowLimit = Math.min(lines.length, 101);

        for (let i = 1; i < rowLimit; i++) {
            const values = lines[i].split(",");
            const row: Record<string, string> = {};
            headers.forEach((header, index) => {
                row[header.trim()] = values[index]?.trim() || "";
            });
            data.push(row);
        }
        return data;
    } catch (e) {
        console.error("Error reading CSV:", filePath, e);
        return [];
    }
}

export default function FutureOfData() {
    const suspiciousPath = path.join(
        process.cwd(),
        "public",
        "nfcapd.202606241740_suspicious.csv",
    );
    const normalPath = path.join(
        process.cwd(),
        "public",
        "nfcapd.202606241740_normal.csv",
    );
    const attacksPath = path.join(
        process.cwd(),
        "public",
        "nfcapd.202606241740_attacks.csv",
    );

    const suspiciousData = parseCSV(suspiciousPath);
    const normalData = parseCSV(normalPath);
    const attacksData = parseCSV(attacksPath);

    return (
        <section
            id="future-of-data"
            className="w-full min-h-screen flex flex-col items-center py-32 text-[#1A1A1A] relative"
        >
            {/* Top Right Interactive Menu */}
            <div className="absolute top-12 right-12 md:top-20 md:right-24 z-20">
                <NavBar />
            </div>

            {/* Top Left Header (Logo + Description) */}
            <div className="absolute top-8 left-8 md:top-12 md:left-16 flex flex-col md:flex-row items-start md:items-start gap-6 md:gap-12 w-full max-w-5xl pr-8 md:pr-16 z-10">
                <div className="relative w-32 h-32 md:w-48 md:h-48 shrink-0 group">
                    <Image
                        src="/logot.png"
                        alt="Synapstream Logo"
                        fill
                        sizes="(max-width: 768px) 128px, 192px"
                        className="object-contain object-left-top z-0"
                        priority
                    />
                    <div 
                        className="absolute inset-0 z-10 mix-blend-screen opacity-50"
                        style={{ 
                            WebkitMaskImage: 'url(/logot.png)', 
                            WebkitMaskSize: 'contain', 
                            WebkitMaskPosition: 'left top', 
                            WebkitMaskRepeat: 'no-repeat',
                            maskImage: 'url(/logot.png)',
                            maskSize: 'contain',
                            maskPosition: 'left top',
                            maskRepeat: 'no-repeat'
                        }}
                    >
                        <LineWaves innerLineCount={20} outerLineCount={20} color1="#ffffff" color2="#cccccc" color3="#888888" brightness={2.5} />
                    </div>
                </div>
            </div>

            {/* Data Table */}
            <div className="w-full mt-[290px] md:mt-[245px]">
                <div className="w-full flex flex-col xl:flex-row justify-end items-end mb-16 md:pr-40 lg:pr-64 xl:pr-75 gap-12 xl:gap-3">
                    {/* Partner Logos - Left Side */}
                    <div className="flex flex-row items-center gap-0 shrink-0">
                        <div className="relative w-28 h-10">
                            <Image
                                src="/logo1.png"
                                alt="Linkup Communication"
                                fill
                                sizes="(max-width: 768px) 100vw, 150px"
                                className="object-contain object-left"
                            />
                        </div>
                        <div className="relative w-20 h-10">
                            <Image
                                src="/btrc-logo-updated.png"
                                alt="BTRC"
                                fill
                                sizes="(max-width: 768px) 100vw, 150px"
                                className="object-contain object-left"
                            />
                        </div>
                    </div>

                    {/* Dataset Intro Text - Right Side */}
                    <div className="md:max-w-4xl text-left w-full relative">
                        <div className="absolute -top-8 right-0 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-black/30"></div>
                            <span className="font-jetbrains text-[8px] md:text-[10px] tracking-[0.2em] uppercase text-black/40 font-bold">
                                Project APEX-IDS
                            </span>
                        </div>

                        <h3 className="font-jetbrains text-[10px] md:text-xs tracking-[0.2em] uppercase text-black/50 mb-3 font-bold border-b border-black/10 pb-2 w-full">
                            Dataset Overview &mdash; APEX-IDS2026 Architecture
                        </h3>
                        <p className="font-inter text-xs md:text-sm leading-[1.8] text-[#1A1A1A]/80 font-medium text-justify mb-8">
                            APEX-IDS2026 is a research-grade network intrusion
                            detection dataset engineered directly on live
                            production network infrastructure. Breaking away
                            from the synthetic laboratory environments that
                            produced legacy benchmarks like NSL-KDD, UNSW-NB15,
                            and CIC-IDS2017, this dataset captures genuine,
                            unstructured threat actor behavior directly from the
                            internet background radiation. Utilizing a
                            NAT-immune, 5-minute bucketed 6-tuple merge, our
                            pipeline correlates raw volumetric NetFlows with
                            Zeek Deep Packet Inspection metadata (including
                            payload entropy and inter-arrival times). The result
                            is a mathematically pure, 5-Tier Deterministic
                            Labeling Architecture that guarantees a 0% false
                            positive rate for honeypot-verified Tier 1 attacks.
                        </p>

                        <h3 className="font-jetbrains text-[10px] md:text-xs tracking-[0.2em] uppercase text-black/50 mb-3 font-bold border-b border-black/10 pb-2">
                            Implementation &mdash; Usage Guidelines
                        </h3>
                        <p className="font-inter text-xs md:text-sm leading-[1.8] text-[#1A1A1A]/80 font-medium text-justify">
                            Designed explicitly to circumvent the Out-of-Memory
                            (OOM) failures inherent to traditional Pandas
                            workflows, APEX-IDS2026 provides a highly optimized
                            DuckDB Partitioned Parquet architecture capable of
                            scaling to 18 billion flows natively. For Volumetric
                            Anomaly Detection (such as LSTMs and Transformers),
                            engineers should load the TimeSeries FaaC (Feature
                            as a Counter) partitioned directories to leverage
                            1-minute bins combined with maximum entropy and
                            kurtosis metrics. For binary or multi-class attack
                            detection architectures, the optimal configuration
                            combines Tier 1 (Honeypot-Verified) positive classes
                            with Tier 4 and 5 (Benign Baseline) negative
                            classes, achieving an evasion-resistant, zero-noise
                            ground truth for modern model training.
                        </p>
                    </div>
                </div>

                <DatasetViewer
                    normalData={normalData}
                    suspiciousData={suspiciousData}
                    attacksData={attacksData}
                />
            </div>
        </section>
    );
}
