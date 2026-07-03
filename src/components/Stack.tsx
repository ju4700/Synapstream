import React from 'react';
import { motion } from 'framer-motion';

const techStack = [
  'Python', 'Go', 'TypeScript', 'React', 'PostgreSQL',
  'Kafka', 'Spark', 'Airflow', 'dbt', 'ClickHouse',
  'Kubernetes', 'AWS'
];

export const Stack: React.FC = () => {
  return (
    <section id="stack" className="section-padding bg-ink border-t border-b border-border/50">
      <div className="container-custom flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-12"
        >
          <h2 className="mb-4">What's under the hood</h2>
          <p className="text-text-muted">
            We build with the tools that hold up in production, without locking you into proprietary platforms.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: i * 0.05,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="px-5 py-2.5 rounded-full border border-border bg-surface font-mono text-sm text-text-primary hover:-translate-y-0.5 hover:border-accent-periwinkle transition-all duration-150 ease-out cursor-default"
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
