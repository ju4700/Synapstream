import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border mt-32">
      <div className="container-custom py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-text-muted text-sm">
          © 2026 Synapstream. All rights reserved.
        </p>
        <div className="flex items-center space-x-6">
          <a href="#services" className="text-text-muted hover:text-text-primary transition-colors text-sm">Services</a>
          <a href="#approach" className="text-text-muted hover:text-text-primary transition-colors text-sm">Approach</a>
          <a href="#stack" className="text-text-muted hover:text-text-primary transition-colors text-sm">Stack</a>
        </div>
      </div>
    </footer>
  );
};
