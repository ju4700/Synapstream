import React from 'react';
import { motion } from 'framer-motion';
import { MagneticButton } from './MagneticButton';

const links = ['Services', 'Approach', 'Stack', 'Contact'];

export const Nav: React.FC = () => {
  return (
    <motion.nav
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-[10px] border-b border-border shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
    >
      <div className="container-custom h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 rounded-full bg-accent-amber animate-[pulse_3s_infinite]" />
          <span className="font-display font-bold text-lg tracking-tight">SYNAPSTREAM</span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-text-muted hover:text-text-primary transition-colors duration-150 text-sm font-medium relative group"
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-text-primary transition-all duration-150 ease-out group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center">
          <MagneticButton variant="ghost" as="a" href="#contact" className="py-2 px-4 text-sm hidden sm:inline-flex">
            Start a project
          </MagneticButton>
          <MagneticButton variant="ghost" as="a" href="#contact" className="py-2 px-4 text-sm sm:hidden">
            Contact
          </MagneticButton>
        </div>
      </div>
    </motion.nav>
  );
};
