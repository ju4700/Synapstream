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
                @keyframes hopAndJump {
                    0%, 100% { transform: translate(0px, 0px) scale(1) rotate(0deg); border-radius: 0; }
                    
                    /* Small hop to position 2 */
                    12.5% { transform: translate(15px, -12px) scale(0.9) rotate(0deg); border-radius: 6px; }
                    25% { transform: translate(30px, 0px) scale(1) rotate(0deg); border-radius: 0; }
                    
                    /* Small hop to position 3 */
                    37.5% { transform: translate(45px, -12px) scale(0.9) rotate(0deg); border-radius: 6px; }
                    50% { transform: translate(60px, 0px) scale(1) rotate(0deg); border-radius: 0; }
                    
                    /* Small hop to position 4 */
                    62.5% { transform: translate(75px, -12px) scale(0.9) rotate(0deg); border-radius: 6px; }
                    75% { transform: translate(90px, 0px) scale(1) rotate(0deg); border-radius: 0; }
                    
                    /* Big acrobatic jump back to start */
                    87.5% { transform: translate(45px, -70px) scale(1.3) rotate(45deg); border-radius: 12px; }
                    99.9% { transform: translate(0px, 0px) scale(1) rotate(90deg); border-radius: 0; }
                }
                .loader-block {
                    position: absolute;
                    top: 60px; /* offset to allow room for the big arc */
                    left: 0;
                    background-color: white;
                    width: 24px;
                    height: 24px;
                    animation: hopAndJump 2.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                }
            `}</style>
            
            <div 
                className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] transition-opacity duration-800 ease-in-out ${
                    isAnimatingOut ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
            >
                {/* Single Row Container */}
                <div className="relative w-[114px] h-[100px] scale-100 md:scale-125">
                    <div className="loader-block" style={{ animationDelay: '0s' }} />
                    <div className="loader-block" style={{ animationDelay: '-0.6s' }} />
                    <div className="loader-block" style={{ animationDelay: '-1.2s' }} />
                    <div className="loader-block" style={{ animationDelay: '-1.8s' }} />
                </div>
            </div>
        </>
    );
}
