"use client";
import React, { useState, useEffect } from "react";

export default function GlitchedIP({ ip }: { ip: string }) {
    const [displayText, setDisplayText] = useState(ip);
    
    useEffect(() => {
        if (!ip) return;
        
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
        let isGlitching = false;
        
        // Interval to decide WHEN to glitch
        const glitchTrigger = setInterval(() => {
            // 5% chance to start a glitch cycle
            if (Math.random() < 0.05 && !isGlitching) {
                isGlitching = true;
                
                // End glitch after 50-250ms
                setTimeout(() => {
                    isGlitching = false;
                    setDisplayText(ip);
                }, Math.random() * 200 + 50);
            }
        }, 100);

        // Interval to actually perform the glitching animation while isGlitching is true
        const renderInterval = setInterval(() => {
            if (isGlitching) {
                let glitched = "";
                for (let i = 0; i < ip.length; i++) {
                    if (ip[i] === "." || ip[i] === ":") {
                        glitched += ip[i]; // Preserve separators
                    } else {
                        // 60% chance to scramble character
                        if (Math.random() > 0.4) {
                            glitched += chars[Math.floor(Math.random() * chars.length)];
                        } else {
                            glitched += ip[i];
                        }
                    }
                }
                setDisplayText(glitched);
            }
        }, 40); // 25 fps glitch speed
        
        return () => {
            clearInterval(glitchTrigger);
            clearInterval(renderInterval);
        };
    }, [ip]);

    return <span className="font-jetbrains text-[11px] md:text-xs tracking-widest text-[#1A1A1A] font-bold opacity-80">{displayText}</span>;
}
