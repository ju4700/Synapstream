import React from 'react';
import { motion } from 'framer-motion';
import { SpotlightCard } from './SpotlightCard';
import { MagneticButton } from './MagneticButton';

export const ClosingCTA: React.FC = () => {
  return (
    <section id="contact" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <SpotlightCard className="rounded-[14px] p-10 md:p-16 lg:p-24 border border-border bg-gradient-to-br from-surface to-surface-2 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <h2 className="text-3xl md:text-5xl leading-tight text-white m-0">
                  Have a system that's outgrown itself?
                </h2>
              </div>

              <div className="flex flex-col items-start md:items-end space-y-6">
                <MagneticButton as="a" href="mailto:hello@synapstream.ai" className="text-lg px-8 py-4">
                  Start a project
                </MagneticButton>
                <a
                  href="mailto:hello@synapstream.ai"
                  className="font-mono text-text-muted hover:text-accent-periwinkle transition-colors"
                >
                  hello@synapstream.ai
                </a>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
};
