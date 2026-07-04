"use client";

import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    const items = ["Blog", "Careers", "Architecture"];
    const hoveredIndex = hoveredItem ? items.indexOf(hoveredItem) : -1;

    return (
        <div
            className="flex flex-col md:flex-row items-end md:items-center gap-6 md:gap-10"
            onMouseLeave={() => setHoveredItem(null)}
        >
            {items.map((item, index) => {
                const isHovered = hoveredItem === item;

                let scale = 1;
                let translateX = 0;
                let itemOpacity = 1;

                if (hoveredItem) {
                    if (isHovered) {
                        scale = 1.4;
                        itemOpacity = 1;
                    } else {
                        const distance = index - hoveredIndex;
                        const absDistance = Math.abs(distance);
                        const pushDirection = distance > 0 ? 1 : -1;
                        translateX =
                            pushDirection * Math.max(6, 18 - absDistance * 5);
                        scale = 0.88;
                        itemOpacity = 0.35;
                    }
                }

                return (
                    <Link
                        key={item}
                        href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                        onMouseEnter={() => setHoveredItem(item)}
                        className="relative font-inter text-xs md:text-sm font-bold text-[#1A1A1A] uppercase tracking-widest whitespace-nowrap will-change-transform"
                        style={{
                            transform: `scale(${scale}) translateX(${translateX}px)`,
                            opacity: itemOpacity,
                            transition:
                                "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease",
                            transformOrigin: "center center",
                        }}
                    >
                        {item}
                    </Link>
                );
            })}
        </div>
    );
}
