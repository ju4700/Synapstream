"use client";
import React, { useState } from "react";
import GlitchedIP from "./GlitchedIP";
import LineWaves from "./LineWaves";

type DatasetRecord = Record<string, string>;

interface DatasetViewerProps {
    normalData: DatasetRecord[];
    suspiciousData: DatasetRecord[];
    attacksData: DatasetRecord[];
}

export default function DatasetViewer({
    normalData,
    suspiciousData,
    attacksData,
}: DatasetViewerProps) {
    const [activeFile, setActiveFile] = useState<
        | "nfcapd.202606241740_attacks.csv"
        | "nfcapd.202606241740_suspicious.csv"
        | "nfcapd.202606241740_normal.csv"
    >("nfcapd.202606241740_attacks.csv");

    const getActiveData = () => {
        if (activeFile === "nfcapd.202606241740_normal.csv") return normalData;
        if (activeFile === "nfcapd.202606241740_suspicious.csv")
            return suspiciousData;
        return attacksData;
    };

    const data = getActiveData();
    const headers = data.length > 0 ? Object.keys(data[0]) : [];

    const getFileDescription = () => {
        if (activeFile === "nfcapd.202606241740_attacks.csv") {
            return "This dataset contains verified, volumetric malicious network flows captured directly by Synapstream's deterministic honeypot architecture. These labels are mathematically verified with a 0% false-positive rate, tracking real threat-actor behavior from the live internet.";
        }
        if (activeFile === "nfcapd.202606241740_suspicious.csv") {
            return "This dataset captures anomalous, probing, and reconnaissance traffic that triggered heuristics but lacked the definitive signatures required for verified attack status. Ideal for training unsupervised anomaly detection models.";
        }
        return "A control dataset containing completely benign, standard internet background noise and validated service traffic. Used as the baseline for differentiating malicious telemetry.";
    };

    const getFileSize = () => {
        if (activeFile === "nfcapd.202606241740_attacks.csv") return "18.4 GB";
        if (activeFile === "nfcapd.202606241740_suspicious.csv")
            return "42.1 GB";
        return "115.8 GB";
    };

    return (
        <div className="w-[90vw] max-w-[1320px] mx-auto mt-16 mb-16 bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col md:flex-row text-[#1A1A1A]">
            {/* Left Column: Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Main Header */}
                <div className="border-b border-gray-200 px-6 py-5 flex items-start justify-between bg-white">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3 text-sm text-gray-500 font-jetbrains">
                            <svg
                                className="w-4 h-4 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                />
                            </svg>
                            <span className="font-bold text-[#1A1A1A]">
                                {activeFile}
                            </span>
                            <span>({getFileSize()})</span>
                        </div>
                    </div>
                </div>

                {/* About this file */}
                <div className="relative overflow-hidden p-6 border-b border-gray-200 bg-gray-50/30">
                    <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                        <LineWaves
                            speed={0.15}
                            innerLineCount={15}
                            color1="#cccccc"
                            color2="#999999"
                            color3="#eeeeee"
                        />
                    </div>
                    <div className="relative z-10">
                        <div className="mb-2">
                            <h3 className="font-bold font-inter text-sm text-[#1A1A1A]">
                                About this file
                            </h3>
                        </div>
                        <p className="text-sm font-inter leading-relaxed text-gray-700 max-w-3xl">
                            {getFileDescription()}
                        </p>
                    </div>
                </div>

                {/* Table Container */}
                <div className="w-full overflow-x-auto overflow-y-auto h-[700px] relative custom-scrollbar bg-white">
                    <table className="w-full text-left border-collapse min-w-max">
                        <thead className="sticky top-0 bg-white z-10 shadow-[0_1px_0_#e5e7eb]">
                            <tr>
                                <th className="px-4 py-3 text-[10px] font-bold text-gray-800 border-b border-gray-200 whitespace-nowrap bg-white">
                                    <div className="flex flex-col gap-1">
                                        <span className="flex items-center gap-1">
                                            <span className="text-[8px]">
                                                ▲
                                            </span>{" "}
                                            ID
                                        </span>
                                        <span className="text-xs font-black">
                                            {data.length} rows
                                        </span>
                                    </div>
                                </th>
                                {headers.map((header) => (
                                    <th
                                        key={header}
                                        className="px-4 py-3 text-[10px] font-bold text-gray-800 border-b border-gray-200 border-l border-gray-100 whitespace-nowrap bg-white"
                                    >
                                        <div className="flex flex-col gap-1">
                                            <span className="flex items-center gap-1">
                                                <span className="text-[8px]">
                                                    ▲
                                                </span>{" "}
                                                {header}
                                            </span>
                                            <span className="text-[10px] text-gray-400 font-normal">
                                                {header === "src_ip" ||
                                                header === "dst_ip"
                                                    ? "Anonymized"
                                                    : "Raw Data"}
                                            </span>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {data.map((row, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    className="hover:bg-gray-50 transition-colors group"
                                >
                                    <td className="px-4 py-3 whitespace-nowrap font-jetbrains text-[10px] text-gray-400 border-r border-gray-100">
                                        {(rowIndex + 1)
                                            .toString()
                                            .padStart(3, "0")}
                                    </td>
                                    {headers.map((header) => {
                                        const val = row[header];
                                        let content: React.ReactNode = (
                                            <span className="font-inter text-xs text-gray-600">
                                                {val}
                                            </span>
                                        );

                                        if (
                                            header === "src_ip" ||
                                            header === "dst_ip"
                                        ) {
                                            content = <GlitchedIP ip={val} />;
                                        } else if (
                                            header === "label" ||
                                            header === "attack_type" ||
                                            header === "attack_category"
                                        ) {
                                            const isAttack =
                                                val
                                                    .toLowerCase()
                                                    .includes("attack") ||
                                                val
                                                    .toLowerCase()
                                                    .includes("probe") ||
                                                val
                                                    .toLowerCase()
                                                    .includes("scan");
                                            const isNormal =
                                                val.toLowerCase() === "normal";
                                            if (val && val !== "none") {
                                                content = (
                                                    <span
                                                        className={`font-jetbrains text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                                                            isNormal
                                                                ? "bg-green-100 text-green-700"
                                                                : isAttack
                                                                  ? "bg-red-100 text-red-700"
                                                                  : "bg-gray-100 text-gray-600"
                                                        }`}
                                                    >
                                                        {val}
                                                    </span>
                                                );
                                            } else {
                                                content = (
                                                    <span className="text-xs text-gray-300">
                                                        -
                                                    </span>
                                                );
                                            }
                                        } else if (header === "protocol") {
                                            content = (
                                                <span className="font-jetbrains text-[10px] font-bold text-gray-500">
                                                    {val}
                                                </span>
                                            );
                                        }

                                        return (
                                            <td
                                                key={header}
                                                className="px-4 py-3 whitespace-nowrap border-l border-gray-100"
                                            >
                                                {content}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Right Column: Data Explorer Sidebar */}
            <div className="w-full md:w-80 bg-gray-50/50 border-t md:border-t-0 md:border-l border-gray-200 flex flex-col shrink-0">
                <div className="p-6 flex-1 flex flex-col">
                    <div className="flex-1">
                        <h2 className="font-bold text-base font-inter text-[#1A1A1A] mb-1">
                            Data Explorer
                        </h2>
                        <p className="text-xs font-jetbrains text-gray-500 mb-6">
                            Version 1.0 (176.3 GB)
                        </p>

                        {/* File Tree */}
                        <div className="flex flex-col gap-1 mb-8">
                            <div className="flex items-center gap-2 text-sm font-jetbrains text-gray-700 mb-2">
                                <svg
                                    className="w-4 h-4 text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                                </svg>
                                <span className="font-bold">APEX-IDS2026</span>
                            </div>

                            {/* File Links */}
                            <div className="pl-4 flex flex-col gap-1 border-l border-gray-200 ml-2">
                                <button
                                    onClick={() =>
                                        setActiveFile(
                                            "nfcapd.202606241740_attacks.csv",
                                        )
                                    }
                                    className={`flex items-center gap-2 px-2 py-1.5 rounded text-[11px] font-jetbrains transition-colors text-left w-full ${activeFile === "nfcapd.202606241740_attacks.csv" ? "bg-gray-200/80 text-black font-bold" : "text-gray-500 hover:bg-gray-100 hover:text-black"}`}
                                >
                                    <svg
                                        className="w-3 h-3 shrink-0 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                    <span className="truncate">
                                        nfcapd...attacks.csv
                                    </span>
                                </button>
                                <button
                                    onClick={() =>
                                        setActiveFile(
                                            "nfcapd.202606241740_suspicious.csv",
                                        )
                                    }
                                    className={`flex items-center gap-2 px-2 py-1.5 rounded text-[11px] font-jetbrains transition-colors text-left w-full ${activeFile === "nfcapd.202606241740_suspicious.csv" ? "bg-gray-200/80 text-black font-bold" : "text-gray-500 hover:bg-gray-100 hover:text-black"}`}
                                >
                                    <svg
                                        className="w-3 h-3 shrink-0 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                    <span className="truncate">
                                        nfcapd...suspicious.csv
                                    </span>
                                </button>
                                <button
                                    onClick={() =>
                                        setActiveFile(
                                            "nfcapd.202606241740_normal.csv",
                                        )
                                    }
                                    className={`flex items-center gap-2 px-2 py-1.5 rounded text-[11px] font-jetbrains transition-colors text-left w-full ${activeFile === "nfcapd.202606241740_normal.csv" ? "bg-gray-200/80 text-black font-bold" : "text-gray-500 hover:bg-gray-100 hover:text-black"}`}
                                >
                                    <svg
                                        className="w-3 h-3 shrink-0 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                    <span className="truncate">
                                        nfcapd...normal.csv
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="mb-8">
                            <h3 className="font-bold text-sm text-[#1A1A1A] mb-3">
                                Summary
                            </h3>
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2 text-xs text-gray-600 font-inter">
                                    <svg
                                        className="w-4 h-4 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                    3 core files
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-600 font-inter">
                                    <svg
                                        className="w-4 h-4 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 10h16M4 14h16M4 18h16"
                                        />
                                    </svg>
                                    {headers.length} attributes (columns)
                                </div>
                            </div>
                            <p className="mt-6 text-xs font-inter text-gray-500 leading-relaxed text-justify border-t border-gray-200 pt-4">
                                APEX-IDS2026 is currently being built as the
                                next-generation gold standard for network
                                intrusion and anomaly detection modeling.
                                Through a deterministic, large-scale honeypot
                                infrastructure, Synapstream is actively
                                engineering a dataset designed to eliminate the
                                persistent industry flaw of false-positive data
                                labeling. Once complete, it will provide massive
                                out-of-core volumetric flows, capturing verified
                                threat-actor methodologies directly from the
                                live internet with absolute certainty.
                            </p>
                        </div>
                    </div>

                    <div className="mt-auto pt-6 flex flex-col gap-2">
                        <button className="relative w-full flex items-center justify-center gap-2 py-2.5 bg-[#0a0a0a] border border-[#1A1A1A] rounded-full text-xs font-bold font-inter text-white transition-colors overflow-hidden">
                            <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
                                <LineWaves
                                    speed={0.1}
                                    innerLineCount={20}
                                    outerLineCount={20}
                                    warpIntensity={0.8}
                                    rotation={-45}
                                    edgeFadeWidth={0.0}
                                    colorCycleSpeed={1.0}
                                    brightness={0.2}
                                    color1="#ffffff"
                                    color2="#ffffff"
                                    color3="#ffffff"
                                    enableMouseInteraction={false}
                                />
                            </div>
                            <div className="relative z-10 flex items-center gap-2">
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                    />
                                </svg>
                                Download Dataset Sample
                            </div>
                        </button>
                        <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border border-gray-300 rounded-full text-xs font-bold font-inter text-[#1A1A1A] hover:bg-gray-50 transition-colors">
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                />
                            </svg>
                            Request Access via API
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
