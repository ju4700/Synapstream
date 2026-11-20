interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export function ShinyText({
  text,
  disabled = false,
  speed = 4,
  className = "",
}: ShinyTextProps) {
  return (
    <span
      className={`inline-block ${
        disabled ? "text-white" : "animate-shine"
      } bg-[linear-gradient(110deg,#ffffff_25%,rgba(255,255,255,0.25)_45%,#ffffff_55%,rgba(255,255,255,0.25)_65%,#ffffff_85%)] bg-[length:250%_100%] bg-clip-text text-transparent ${className}`}
      style={{
        ["--shine-speed" as string]: `${speed}s`,
      }}
    >
      {text}
    </span>
  );
}
