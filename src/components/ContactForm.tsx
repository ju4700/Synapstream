import React from "react";
import LineWaves from "@/components/LineWaves";

export default function ContactForm() {
    return (
        <section
            id="contact"
            className="w-full max-w-[1320px] mx-auto px-4 md:px-8 mt-24 mb-8 relative z-20"
        >
            <div className="border-t border-black/10 pt-16 flex flex-col md:flex-row items-start justify-between gap-16 xl:gap-24">
                {/* Left Side: Copy */}
                <div className="flex-1 w-full">
                    <h3 className="font-jetbrains text-[10px] md:text-xs tracking-[0.2em] uppercase text-black/50 mb-3 font-bold border-b border-black/10 pb-2">
                        Inquiries &mdash; Engineering & Data Solutions
                    </h3>
                    <p className="font-inter text-xs md:text-sm leading-[1.8] text-[#1A1A1A]/80 font-medium text-justify mt-8">
                        Synapstream engineers mission-critical software
                        solutions and high-throughput data infrastructure for
                        enterprise and government partners. Submit your inquiry
                        to discuss bespoke engineering engagements, API access,
                        or enterprise integration.
                    </p>
                </div>

                {/* Right Side: Form */}
                <div className="flex-1 w-full md:ml-12 xl:ml-24">
                    <form
                        action="https://formsubmit.co/jalal.dev.design@gmail.com"
                        method="POST"
                        className="flex flex-col gap-6 w-full"
                    >
                        <input
                            type="hidden"
                            name="_autoresponse"
                            value="Thank you for contacting Synapstream. We have received your inquiry regarding APEX-IDS2026 API access and enterprise integration. A member of our engineering team will review your credentials and respond shortly to schedule a consultation."
                        />
                        <div className="flex flex-col gap-2">
                            <label className="font-jetbrains text-[10px] tracking-[0.2em] uppercase text-black/50 font-bold">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                required
                                className="w-full bg-transparent border-b border-black/20 px-0 py-2 text-[#1A1A1A] font-inter text-sm focus:outline-none focus:border-black transition-all placeholder:text-black/20 rounded-none"
                                placeholder="Enter your name"
                            />
                        </div>

                        <div className="flex flex-col gap-2 mt-2">
                            <label className="font-jetbrains text-[10px] tracking-[0.2em] uppercase text-black/50 font-bold">
                                Work Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="w-full bg-transparent border-b border-black/20 px-0 py-2 text-[#1A1A1A] font-inter text-sm focus:outline-none focus:border-black transition-all placeholder:text-black/20 rounded-none"
                                placeholder="name@company.com"
                            />
                        </div>

                        <button
                            type="submit"
                            className="mt-8 relative overflow-hidden group w-fit border border-black/20 text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors px-12 py-3 rounded-full font-bold font-inter text-xs uppercase tracking-widest"
                        >
                            <div className="absolute inset-0 bg-[#1A1A1A] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>

                            <div className="absolute inset-0 z-0 opacity-30 group-hover:opacity-50 group-hover:invert transition-all duration-500 pointer-events-none">
                                <LineWaves
                                    innerLineCount={15}
                                    outerLineCount={15}
                                    color1="#000000"
                                    color2="#333333"
                                    color3="#666666"
                                    brightness={1.5}
                                />
                            </div>

                            <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                                Send
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
