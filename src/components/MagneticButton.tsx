import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '../utils';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'ghost';
  as?: 'button' | 'a';
  href?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className,
  variant = 'primary',
  as = 'button',
  href,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // Custom motion values for tracking cursor
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for resetting
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;

    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    // Max 10px offset
    const maxOffset = 10;
    const offsetX = Math.max(-maxOffset, Math.min(middleX * 0.1, maxOffset));
    const offsetY = Math.max(-maxOffset, Math.min(middleY * 0.1, maxOffset));

    x.set(offsetX);
    y.set(offsetY);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const Component = as as any;
  const commonClasses = cn(
    "relative inline-flex items-center justify-center rounded-sm font-medium transition-colors duration-150 ease-out z-10",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-periwinkle focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
    variant === 'primary'
      ? "bg-accent-amber text-ink hover:bg-white px-6 py-3"
      : "bg-transparent border border-border text-text-primary hover:text-white hover:border-text-primary px-6 py-3",
    className
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      <Component
        className={commonClasses}
        href={href}
        {...props}
      >
        {children}
      </Component>
    </motion.div>
  );
};
