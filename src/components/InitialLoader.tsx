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
        }, 1500); // Fast 1.5s load time
        
        return () => {
            clearTimeout(timer);
            document.body.style.overflow = "auto";
        };
    }, []);

    if (!isVisible) return null;

    return (
        <>
            <style jsx>{`
                @keyframes doubleS {
                    /* Forward S (Top Right to Bot Left) */
                    0% { transform: translate(60px, 0px); opacity: 1; }
                    5.55% { transform: translate(30px, 0px); opacity: 1; }
                    11.11% { transform: translate(0px, 0px); opacity: 1; }
                    16.66% { transform: translate(0px, 30px); opacity: 1; }
                    22.22% { transform: translate(30px, 30px); opacity: 1; }
                    27.77% { transform: translate(60px, 30px); opacity: 1; }
                    33.33% { transform: translate(60px, 60px); opacity: 1; }
                    38.88% { transform: translate(30px, 60px); opacity: 1; }
                    44.44% { transform: translate(0px, 60px); opacity: 1; }
                    
                    /* Jump 1 */
                    45% { transform: translate(0px, 60px); opacity: 0; }
                    49% { transform: translate(0px, 0px); opacity: 0; }
                    
                    /* Backward S (Top Left to Bot Right) */
                    50% { transform: translate(0px, 0px); opacity: 1; }
                    55.55% { transform: translate(30px, 0px); opacity: 1; }
                    61.11% { transform: translate(60px, 0px); opacity: 1; }
                    66.66% { transform: translate(60px, 30px); opacity: 1; }
                    72.22% { transform: translate(30px, 30px); opacity: 1; }
                    77.77% { transform: translate(0px, 30px); opacity: 1; }
                    83.33% { transform: translate(0px, 60px); opacity: 1; }
                    88.88% { transform: translate(30px, 60px); opacity: 1; }
                    94.44% { transform: translate(60px, 60px); opacity: 1; }
                    
                    /* Jump 2 */
                    95% { transform: translate(60px, 60px); opacity: 0; }
                    99% { transform: translate(60px, 0px); opacity: 0; }
                    100% { transform: translate(60px, 0px); opacity: 1; }
                }
                .loader-block {
                    position: absolute;
                    top: 0;
                    left: 0;
                    background-color: white;
                    width: 24px;
                    height: 24px;
                    animation: doubleS 4s cubic-bezier(0.6, 0, 0.4, 1) infinite;
                }
            `}</style>
            
            <div 
                className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] transition-opacity duration-800 ease-in-out ${
                    isAnimatingOut ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
            >
                {/* Double S-Shape Logo Container */}
                <div className="relative w-[84px] h-[84px] scale-100 md:scale-125">
                    <div className="loader-block" style={{ animationDelay: '0s' }} />
                    <div className="loader-block" style={{ animationDelay: '-0.222s' }} />
                    <div className="loader-block" style={{ animationDelay: '-0.444s' }} />
                    <div className="loader-block" style={{ animationDelay: '-0.666s' }} />
                </div>
            </div>
        </>
    );
}
