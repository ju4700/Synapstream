import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MagneticButton } from './MagneticButton';

const SynapseNetwork = () => {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, -10]);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 z-0 pointer-events-none flex items-center justify-end overflow-hidden"
      style={{ y: prefersReducedMotion ? 0 : yParallax }}
    >
      <div
        className="absolute w-[800px] h-[800px] bg-accent-periwinkle/5 rounded-full blur-[100px]"
        style={{ left: '40%', top: '50%', transform: 'translateY(-50%)' }}
      />
      <div
        className="absolute inset-0"
        style={{
          maskImage: 'radial-gradient(circle at 70% 50%, black 20%, transparent 60%)',
          WebkitMaskImage: 'radial-gradient(circle at 70% 50%, black 20%, transparent 60%)'
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid slice" className="opacity-80">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Base paths */}
          <path id="path1" d="M 200,400 Q 400,200 600,400 T 1000,300" fill="none" stroke="#233053" strokeWidth="1.4" />
          <path id="path2" d="M 300,500 Q 500,600 700,450 T 1000,550" fill="none" stroke="#233053" strokeWidth="1.4" />
          <path id="path3" d="M 400,250 Q 600,100 800,300 T 1000,200" fill="none" stroke="#233053" strokeWidth="1.4" />

          {!prefersReducedMotion && (
            <>
              {/* Animated paths */}
              <path
                d="M 200,400 Q 400,200 600,400 T 1000,300"
                fill="none"
                stroke="#8C9EFF"
                strokeWidth="2"
                strokeDasharray="200 800"
                filter="url(#glow)"
              >
                <animate attributeName="stroke-dashoffset" from="1000" to="0" dur="4.5s" repeatCount="indefinite" />
              </path>
              <path
                d="M 300,500 Q 500,600 700,450 T 1000,550"
                fill="none"
                stroke="#8C9EFF"
                strokeWidth="2"
                strokeDasharray="150 850"
                filter="url(#glow)"
              >
                <animate attributeName="stroke-dashoffset" from="1000" to="0" dur="6s" begin="1s" repeatCount="indefinite" />
              </path>
              <path
                d="M 400,250 Q 600,100 800,300 T 1000,200"
                fill="none"
                stroke="#8C9EFF"
                strokeWidth="2"
                strokeDasharray="250 750"
                filter="url(#glow)"
              >
                <animate attributeName="stroke-dashoffset" from="1000" to="0" dur="5.2s" begin="2s" repeatCount="indefinite" />
              </path>

              {/* Amber Particles */}
              <circle r="3" fill="#F2A65A" filter="url(#glow)">
                <animateMotion dur="4.5s" repeatCount="indefinite">
                  <mpath href="#path1" />
                </animateMotion>
              </circle>
              <circle r="3" fill="#F2A65A" filter="url(#glow)">
                <animateMotion dur="6s" begin="1s" repeatCount="indefinite">
                  <mpath href="#path2" />
                </animateMotion>
              </circle>
              <circle r="3" fill="#F2A65A" filter="url(#glow)">
                <animateMotion dur="5.2s" begin="2s" repeatCount="indefinite">
                  <mpath href="#path3" />
                </animateMotion>
              </circle>

              {/* Pulsing Nodes */}
              {[
                {cx: 200, cy: 400, dur: "2.5s"},
                {cx: 600, cy: 400, dur: "3.2s"},
                {cx: 1000, cy: 300, dur: "2.8s"},
                {cx: 300, cy: 500, dur: "3.4s"},
                {cx: 700, cy: 450, dur: "2.7s"},
                {cx: 1000, cy: 550, dur: "3.1s"},
                {cx: 400, cy: 250, dur: "2.9s"},
                {cx: 800, cy: 300, dur: "3.3s"},
              ].map((node, i) => (
                <circle key={i} cx={node.cx} cy={node.cy} r="4" fill="#8C9EFF">
                  <animate attributeName="opacity" values="0.4;1;0.4" dur={node.dur} repeatCount="indefinite" />
                </circle>
              ))}
            </>
          )}

          {prefersReducedMotion && (
            <>
              {/* Static Nodes for Reduced Motion */}
              {[
                {cx: 200, cy: 400},
                {cx: 600, cy: 400},
                {cx: 1000, cy: 300},
                {cx: 300, cy: 500},
                {cx: 700, cy: 450},
                {cx: 1000, cy: 550},
                {cx: 400, cy: 250},
                {cx: 800, cy: 300},
              ].map((node, i) => (
                <circle key={i} cx={node.cx} cy={node.cy} r="4" fill="#8C9EFF" opacity="0.8" />
              ))}
            </>
          )}
        </svg>
      </div>
    </motion.div>
  );
};

export const Hero: React.FC = () => {
  const primaryEase = [0.16, 1, 0.3, 1] as const;

  const fadeUpProps = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: primaryEase }
  };

  const clipPathProps = {
    initial: { clipPath: 'inset(100% 0 0 0)', opacity: 0, y: 20 },
    animate: { clipPath: 'inset(0% 0 0 0)', opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: primaryEase }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <SynapseNetwork />

      <div className="container-custom relative z-10 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: primaryEase }}
            className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-8 backdrop-blur-sm"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-accent-amber animate-pulse" />
            <span className="font-mono text-[11px] font-medium tracking-wide">NOW TAKING ON FOUNDING CLIENTS</span>
          </motion.div>

          {/* Eyebrow */}
          <div className="flex items-center space-x-4 mb-6">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 22 }}
              transition={{ duration: 0.6, delay: 0.25, ease: primaryEase }}
              className="h-px bg-accent-periwinkle"
            />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25, ease: primaryEase }}
              className="font-mono text-xs text-text-muted tracking-widest"
            >
              SOFTWARE & DATA ENGINEERING
            </motion.span>
          </div>

          {/* H1 */}
          <h1 className="mb-8">
            <motion.div {...clipPathProps} transition={{ ...clipPathProps.transition, delay: 0.4 }}>
              Software built for
            </motion.div>
            <motion.div {...clipPathProps} transition={{ ...clipPathProps.transition, delay: 0.49 }}>
              the <span className="text-accent-periwinkle">scale</span> of your data.
            </motion.div>
          </h1>

          {/* Subhead */}
          <motion.p
            {...fadeUpProps}
            transition={{ ...fadeUpProps.transition, delay: 0.9 }}
            className="text-lg text-text-muted max-w-2xl mb-12 leading-relaxed"
          >
            Synapstream designs and ships software systems and data infrastructure for teams whose data has outgrown their tools — from pipelines moving billions of events to the products people use on top of them.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUpProps}
            transition={{ ...fadeUpProps.transition, delay: 1.05 }}
            className="flex flex-wrap items-center gap-4 mb-20"
          >
            <MagneticButton href="#contact">
              Start a project
            </MagneticButton>
            <MagneticButton variant="ghost" href="#approach">
              See how we work
            </MagneticButton>
          </motion.div>

          {/* Differentiator Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2, ease: primaryEase }}
            className="grid grid-cols-1 md:grid-cols-3 border border-border bg-surface/50 backdrop-blur-sm divide-y md:divide-y-0 md:divide-x divide-border rounded-lg overflow-hidden"
          >
            {[
              { title: "DIRECT ACCESS", desc: "you work with the engineers, not account managers" },
              { title: "MODERN STACK", desc: "no legacy decisions to work around" },
              { title: "FIXED PROCESS", desc: "discover, architect, build, operate, every time" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 + (i * 0.08), ease: primaryEase }}
                className="p-5"
              >
                <div className="font-mono text-[10px] text-accent-amber mb-2 tracking-wider">{item.title}</div>
                <div className="text-sm text-text-muted leading-tight">{item.desc}</div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};
