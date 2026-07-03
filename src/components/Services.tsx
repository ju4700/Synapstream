import React from 'react';
import { motion } from 'framer-motion';
import { SpotlightCard } from './SpotlightCard';

const services = [
  {
    num: '01',
    category: 'SOFTWARE',
    title: 'Software Engineering',
    desc: 'Web apps, internal tools, and product platforms built in React, Go, and Python — designed to hold up under real production load, not just a demo.'
  },
  {
    num: '02',
    category: 'DATA',
    title: 'Data Engineering',
    desc: 'Pipelines, warehouses, and streaming systems that turn raw, scattered data into something your team can query, trust, and build on.'
  },
  {
    num: '03',
    category: 'SCALE',
    title: 'Big Data & Analytics',
    desc: 'Batch and real-time processing at scale — Spark, Kafka, and Airflow, tuned for terabyte workloads.'
  },
  {
    num: '04',
    category: 'INTELLIGENCE',
    title: 'AI & ML Systems',
    desc: 'Models wired into your product end to end — feature pipelines, training, and serving infrastructure that stays reliable after launch day.'
  }
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="section-padding border-t border-border bg-surface/30 relative">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h2 className="mb-4">Two disciplines, one team</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 border border-border rounded-xl overflow-hidden bg-surface">
          {services.map((service, index) => (
            <SpotlightCard
              key={index}
              className={`p-8 md:p-12 border-b md:border-b-0 border-border ${
                index % 2 === 0 ? 'md:border-r' : ''
              } ${index < 2 ? 'md:border-b' : ''}`}
            >
              <div className="font-mono text-xs text-text-muted mb-6 tracking-widest">
                <span className="text-accent-periwinkle">{service.num}</span> · {service.category}
              </div>
              <h3 className="mb-4">{service.title}</h3>
              <p className="text-text-muted">{service.desc}</p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};
