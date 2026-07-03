import React from 'react';
import { motion } from 'framer-motion';

export const WhyNewFirm: React.FC = () => {
  return (
    <section className="section-padding py-24 md:py-32">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-surface/40 backdrop-blur-md border border-border rounded-2xl p-8 md:p-16 lg:p-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div>
              <h2 className="mb-6">Built lean, on purpose</h2>
              <p className="text-text-muted leading-relaxed font-body">
                Synapstream is a new firm — deliberately. No legacy contracts to maintain, no bloated account layers, no stack decisions made a decade ago. You get senior engineers working directly on your system from day one, with the flexibility to move at the speed data problems actually require.
              </p>
            </div>

            <div className="flex flex-col space-y-6">
              {[
                "Senior engineers only — no junior bench",
                "Direct Slack or email access to whoever's building your system",
                "Scoped, fixed-price engagements — no open-ended retainers"
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-periwinkle mt-2.5 flex-shrink-0" />
                  <p className="text-text-primary m-0">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
