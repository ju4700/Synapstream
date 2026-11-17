import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { m } from "motion/react";
import { DrawLine, EASE_OUT, Item, MaskLine, Stagger, drawX, fadeIn, fadeUp } from "../motion";

type MarkProps = { className?: string; tone?: "black" | "white"; title?: string };

/** SYNAPSTREAM mark: asymmetric rounded square (TL + BR rounded) housing two stacked angled trapezoids. */
export function LogoMark({ className = "size-9", tone = "black", title }: MarkProps) {
  const body = tone === "black" ? "#000" : "#fff";
  const glyph = tone === "black" ? "#fff" : "#000";
  return (
    <svg
      viewBox="0 0 480 400"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <path d="M88 0H480V312A88 88 0 0 1 392 400H0V88A88 88 0 0 1 88 0Z" fill={body} />
      <path d="M118 68H215L358 143V187H118Z" fill={glyph} />
      <path d="M118 213H358V332H262L118 255Z" fill={glyph} />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display uppercase tracking-[0.3em] ${className}`}>Synapstream</span>
  );
}

/** 1440px frame with a 1280px 12-column content area. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1440px] px-6 md:px-12 xl:px-20 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  id,
  children,
  className = "",
  label,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <section id={id} aria-label={label} className={`relative py-24 lg:py-40 ${className}`}>
      {/* Structural hairline draws across the zone boundary as it enters view */}
      <DrawLine className="absolute inset-x-0 top-0 h-px bg-hairline" />
      {children}
    </section>
  );
}

export function Eyebrow({ children, dark = true }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={`flex items-center gap-3 text-sm font-medium ${dark ? "text-silver" : "text-neutral-500"}`}
    >
      <span className={`h-px w-6 ${dark ? "bg-step-2" : "bg-neutral-400"}`} aria-hidden />
      {children}
    </p>
  );
}

export function Heading({
  as: Tag = "h2",
  children,
  className = "",
}: {
  as?: "h2" | "h3";
  children: ReactNode;
  className?: string;
}) {
  return (
    <Tag className={`text-balance font-semibold leading-[1.15] tracking-[-0.02em] ${className}`}>
      {children}
    </Tag>
  );
}

/** Michroma architectural numeral (01, 02 …) */
export function Numeral({ n, className = "" }: { n: number | string; className?: string }) {
  return (
    <span className={`font-display tabular-nums ${className}`}>{String(n).padStart(2, "0")}</span>
  );
}

const base =
  "group inline-flex items-center justify-center gap-3 tile-sm font-semibold transition-all duration-300 ease-out active:scale-[0.98]";
const sizes = { md: "h-12 px-6 text-sm", lg: "h-14 px-7 text-[15px]" };
const variants = {
  solid:
    "bg-white text-black hover:bg-white hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#666666,12px_12px_0_0_#333333] active:translate-x-0 active:translate-y-0 active:shadow-none",
  outline:
    "border border-white/40 text-white bg-transparent hover:border-white hover:bg-white/10 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#333333,12px_12px_0_0_#1a1a1a] active:translate-x-0 active:translate-y-0 active:shadow-none",
  black:
    "bg-black text-white hover:bg-black hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#666666,12px_12px_0_0_#cccccc] active:translate-x-0 active:translate-y-0 active:shadow-none",
};
type Variant = keyof typeof variants;

export function ButtonLink({
  variant = "solid",
  size = "md",
  className = "",
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; size?: "md" | "lg" }) {
  return (
    <a className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </a>
  );
}

export function Button({
  variant = "solid",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: "md" | "lg" }) {
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function Arrow({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={`${className} transition-transform duration-300 group-hover:translate-x-1`}
      aria-hidden
    >
      <path
        d="M2 8h11M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
      />
    </svg>
  );
}

/** Shared H2 scale for every section title. */
export const H2_SIZE = "text-[clamp(26px,3.2vw,52px)] leading-[1.15]";

/**
 * Section header: eyebrow → title (one deliberate line per entry; lines after the first are muted)
 * → lead paragraph directly beneath, so the reading order is unambiguous.
 */
export function SectionHeader({
  eyebrow,
  lines,
  lead,
  className = "",
}: {
  eyebrow: string;
  lines: string[];
  lead?: ReactNode;
  className?: string;
}) {
  return (
    <Stagger as="header" stagger={0.1} amount={0.4} className={`max-w-[1080px] ${className}`}>
      <m.p variants={fadeIn} className="flex items-center gap-3 text-sm font-medium text-silver">
        <m.span variants={drawX} className="block h-px w-6 origin-left bg-step-2" aria-hidden />
        {eyebrow}
      </m.p>
      <Heading className={`mt-6 sm:mt-8 ${H2_SIZE}`}>
        {lines.map((l, i) => (
          <MaskLine key={l} className={i === 0 ? "text-white" : "text-silver"}>
            {l}
          </MaskLine>
        ))}
      </Heading>
      {lead && (
        <Item
          as="p"
          variants={{
            hidden: fadeUp.hidden,
            show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT, delay: 0.15 } },
          }}
          className="mt-6 sm:mt-8 max-w-[62ch] text-[15px] sm:text-lg leading-[1.65] text-mist"
        >
          {lead}
        </Item>
      )}
    </Stagger>
  );
}
