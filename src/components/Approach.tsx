import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'Discover',
    desc: 'We audit your current stack and data flows to find where time, money, and reliability are being lost.'
  },
  {
    num: '02',
    title: 'Architect',
    desc: 'We design the system on paper first — schemas, pipelines, service boundaries — before a line of production code is written.'
  },
  {
    num: '03',
    title: 'Build',
    desc: 'Engineers ship in short iterations, with staging environments, tests, and monitoring running from week one.'
  },
  {
    num: '04',
    title: 'Operate',
    desc: 'We hand off with documentation and an on-call runbook — or stay on as your data and platform team.'
  }
];

export const Approach: React.FC = () => {
  return (
    <section id="approach" className="section-padding bg-ink relative">
      <div className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 text-center"
        >
          <h2 className="mb-4">A fixed process, not a black box</h2>
        </motion.div>

        <div className="relative">
          {/* Spine line */}
          <div className="absolute left-6 md:left-12 top-0 bottom-0 w-px bg-border -z-0" />

          <div className="relative z-10 flex flex-col">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`flex gap-6 md:gap-16 py-12 ${index !== steps.length - 1 ? 'border-b border-border/50' : ''}`}
              >
                <div className="flex-shrink-0 bg-ink py-2">
                  <div className="font-mono text-3xl md:text-5xl font-medium text-accent-amber tabular-nums">
                    {step.num}
                  </div>
                </div>
                <div className="pt-2 md:pt-4">
                  <h3 className="mb-3 text-xl">{step.title}</h3>
                  <p className="text-text-muted leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
