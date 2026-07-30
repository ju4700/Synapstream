"use client";

import { useEffect, useState } from "react";

export default function InitialLoader() {
    const [isVisible, setIsVisible] = useState(true);
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);

    useEffect(() => {
        // Prevent scrolling while loader is active
        document.body.style.overflow = "hidden";
        
        const finishLoading = () => {
            // Small 500ms buffer so it doesn't just instantly flash away if cached
            setTimeout(() => {
                setIsAnimatingOut(true);
                setTimeout(() => {
                    setIsVisible(false);
                    document.body.style.overflow = "auto";
                }, 600);
            }, 500);
        };

        if (document.readyState === "complete") {
            finishLoading();
        } else {
            window.addEventListener("load", finishLoading);
        }
        
        return () => {
            window.removeEventListener("load", finishLoading);
            document.body.style.overflow = "auto";
        };
    }, []);

    if (!isVisible) return null;

    return (
        <>
            <style jsx>{`
                @keyframes chaseJ {
                    0% { transform: translate(60px, 0px); opacity: 1; }
                    14.28% { transform: translate(60px, 30px); opacity: 1; }
                    28.57% { transform: translate(60px, 60px); opacity: 1; }
                    42.85% { transform: translate(60px, 90px); opacity: 1; }
                    57.14% { transform: translate(30px, 90px); opacity: 1; }
                    71.42% { transform: translate(0px, 90px); opacity: 1; }
                    85.71% { transform: translate(0px, 60px); opacity: 1; }
                    90% { transform: translate(0px, 60px); opacity: 0; }
                    96% { transform: translate(60px, 0px); opacity: 0; }
                    100% { transform: translate(60px, 0px); opacity: 1; }
                }
                .loader-block {
                    position: absolute;
                    top: 0;
                    left: 0;
                    background-color: white;
                    width: 24px;
                    height: 24px;
                    animation: chaseJ 3.5s cubic-bezier(0.6, 0, 0.4, 1) infinite;
                }
            `}</style>
            
            <div 
                className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] transition-opacity duration-800 ease-in-out ${
                    isAnimatingOut ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
            >
                {/* J-Shape Container */}
                <div className="relative w-[84px] h-[114px] scale-100 md:scale-125">
                    <div className="loader-block" style={{ animationDelay: '0s' }} />
                    <div className="loader-block" style={{ animationDelay: '-0.5s' }} />
                    <div className="loader-block" style={{ animationDelay: '-1.0s' }} />
                    <div className="loader-block" style={{ animationDelay: '-1.5s' }} />
                    <div className="loader-block" style={{ animationDelay: '-2.0s' }} />
                </div>
            </div>
        </>
    );
}
