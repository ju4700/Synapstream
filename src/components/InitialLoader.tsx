"use client";

import { useEffect, useState } from "react";

export default function InitialLoader() {
    const [isVisible, setIsVisible] = useState(true);
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);

    useEffect(() => {
        // Prevent scrolling while loader is active
        document.body.style.overflow = "hidden";
        
        const timer = setTimeout(() => {
            setIsAnimatingOut(true);
            setTimeout(() => {
                setIsVisible(false);
                document.body.style.overflow = "auto";
            }, 600);
        }, 1500);
        
        return () => {
            clearTimeout(timer);
            document.body.style.overflow = "auto";
        };
    }, []);

    if (!isVisible) return null;

    return (
        <>
            <style jsx>{`
                @keyframes rowShuffle {
                    0% { transform: translate(0px, 0px); }
                    25% { transform: translate(30px, 0px); }
                    50% { transform: translate(60px, 0px); }
                    75% { transform: translate(90px, 0px); }
                    87.5% { transform: translate(45px, -30px); } /* Arc up and over */
                    100% { transform: translate(0px, 0px); }
                }
                .loader-block {
                    position: absolute;
                    top: 30px; /* offset to allow room for the arc */
                    left: 0;
                    background-color: white;
                    width: 24px;
                    height: 24px;
                    animation: rowShuffle 2s ease-in-out infinite;
                }
            `}</style>
            
            <div 
                className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] transition-opacity duration-800 ease-in-out ${
                    isAnimatingOut ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
            >
                {/* Single Row Container */}
                <div className="relative w-[114px] h-[60px] scale-100 md:scale-125">
                    <div className="loader-block" style={{ animationDelay: '0s' }} />
                    <div className="loader-block" style={{ animationDelay: '-0.5s' }} />
                    <div className="loader-block" style={{ animationDelay: '-1.0s' }} />
                    <div className="loader-block" style={{ animationDelay: '-1.5s' }} />
                </div>
            </div>
        </>
    );
}
