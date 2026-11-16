import { useRef, useState, type ReactNode, type Ref } from "react";
import { m, useInView, useReducedMotion, type HTMLMotionProps, type Variants } from "motion/react";

/* ---------- Tokens: one motion language for the whole site ---------- */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;
export const DUR = { fast: 0.2, base: 0.7, slow: 1.2 } as const;
export const RISE = 20;
export const STAGGER = 0.07;
export const VIEWPORT = { once: true, amount: 0.25 } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: RISE },
  show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE_OUT } },
};
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DUR.base, ease: EASE_OUT } },
};
/** A line of text rising out of its own clipping band. */
export const lineUp: Variants = {
  hidden: { y: "108%" },
  show: { y: "0%", transition: { duration: 0.95, ease: EASE_OUT } },
};
/** Horizontal hairline drawing from its transform origin. */
export const drawX: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: DUR.slow, ease: EASE_OUT } },
};

type Tag = "div" | "li" | "ul" | "ol" | "p" | "span" | "header" | "article" | "figure" | "section";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = Omit<HTMLMotionProps<"div">, "ref"> & {
  as?: Tag;
  children?: ReactNode;
  ref?: Ref<any>;
};

const tag = (as: Tag) => m[as] as typeof m.div;

/** Fade-and-rise a block once when it scrolls into view. */
export function Reveal({
  as = "div",
  delay = 0,
  y = RISE,
  amount = VIEWPORT.amount,
  children,
  ...rest
}: Props & { delay?: number; y?: number; amount?: number }) {
  const C = tag(as);
  return (
    <C
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: DUR.base, ease: EASE_OUT, delay }}
      {...rest}
    >
      {children}
    </C>
  );
}

/** Orchestrates its variant children in sequence once in view. */
export function Stagger({
  as = "div",
  delay = 0,
  stagger = STAGGER,
  amount = VIEWPORT.amount,
  children,
  ...rest
}: Props & { delay?: number; stagger?: number; amount?: number }) {
  const C = tag(as);
  return (
    <C
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      {...rest}
    >
      {children}
    </C>
  );
}

/** A child of <Stagger>; defaults to fade-and-rise. */
export function Item({ as = "div", variants = fadeUp, children, ...rest }: Props) {
  const C = tag(as);
  return (
    <C variants={variants} {...rest}>
      {children}
    </C>
  );
}

/** One line of display text revealed from a mask. Must sit inside a <Stagger>. */
export function MaskLine({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`block overflow-hidden pb-[0.12em] -mb-[0.12em] ${className}`}>
      <m.span className="block will-change-transform" variants={lineUp}>
        {children}
      </m.span>
    </span>
  );
}

/** Hairline that draws itself left → right when in view. */
export function DrawLine({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <m.span
      aria-hidden
      className={`pointer-events-none block origin-left ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 1 }}
      transition={{ duration: 1.4, ease: EASE_OUT, delay }}
    />
  );
}

/* ---------- Stepped grayscale tile: layers "unstack" on reveal ---------- */
const STEPS_HIDDEN = "0px 0px 0px 0px #333333, 0px 0px 0px 0px #666666";
const STEPS_SHOWN = "10px 10px 0px 0px #333333, 20px 20px 0px 0px #666666";
const STEPS_HOVER = "14px 14px 0px 0px #333333, 28px 28px 0px 0px #666666";

/**
 * A card with the brand's stepped offset layers. It rises in, then its #333 / #666 layers step
 * out from beneath it like stacked tiles. Optional hover lifts the card and spreads the steps.
 */
export function StepTile({
  as = "div",
  delay = 0,
  hover = false,
  children,
  ...rest
}: Props & { delay?: number; hover?: boolean }) {
  const C = tag(as);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [hovered, setHovered] = useState(false);

  const target = !inView
    ? { opacity: 0, y: 32, boxShadow: reduced ? STEPS_SHOWN : STEPS_HIDDEN }
    : hover && hovered && ready
      ? { opacity: 1, y: -4, boxShadow: STEPS_HOVER }
      : { opacity: 1, y: 0, boxShadow: STEPS_SHOWN };

  const transition = ready
    ? { duration: 0.45, ease: EASE_OUT }
    : {
        opacity: { duration: 0.8, ease: EASE_OUT, delay },
        y: { duration: 0.9, ease: EASE_OUT, delay },
        boxShadow: { duration: 0.9, ease: EASE_IN_OUT, delay: delay + 0.45 },
      };

  return (
    <C
      ref={ref}
      initial={false}
      animate={target}
      transition={transition}
      onAnimationComplete={() => inView && setReady(true)}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      {...rest}
    >
      {children}
    </C>
  );
}
