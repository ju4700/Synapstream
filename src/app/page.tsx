'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="w-full h-screen bg-black overflow-hidden relative flex items-center justify-center cursor-pointer">
      {/* 3D Scene */}
      <div className="absolute inset-0 z-0">
        <Spline scene="/scene.splinecode" />
      </div>

      {/* Bottom Left Logo / Text */}
      <Link 
        href="/"
        className="group absolute bottom-16 left-16 z-10 pointer-events-auto flex items-center"
      >
        {/* Animated Line */}
        <span className="w-0 h-[3px] bg-black transition-all duration-300 ease-out group-hover:w-6 group-hover:mr-4"></span>
        
        {/* Main Logo Text */}
        <h1 className="text-black font-bold font-[family-name:var(--font-tech)] text-2xl md:text-3xl tracking-[0.3em] uppercase drop-shadow-sm transition-all duration-300 ease-out group-hover:tracking-[0.4em] group-hover:drop-shadow-[0_0_12px_rgba(0,0,0,0.4)] whitespace-nowrap">
          Synapstream
        </h1>
        
        {/* Sliding Tagline */}
        <div className="grid grid-cols-[0fr] transition-all duration-500 ease-in-out group-hover:grid-cols-[1fr]">
          <div className="overflow-hidden">
            <div className="flex items-center whitespace-nowrap">
              <span className="text-black/30 mx-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 text-xl font-light">|</span>
              <p className="text-black/70 font-bold font-sans tracking-widest text-xs md:text-sm uppercase transform -translate-x-4 opacity-0 transition-all duration-500 ease-out delay-150 group-hover:translate-x-0 group-hover:opacity-100">
                The Next Generation Data Engineering
              </p>
            </div>
          </div>
        </div>
      </Link>
    </main>
  );
}
