import { useEffect, useState, useRef } from "react";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: "left" | "right" | "center";
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  encryptedClassName?: string;
  animateOn?: "hover" | "view";
}

export function DecryptedText({
  text,
  speed = 40,
  maxIterations = 8,
  sequential = true,
  revealDirection = "left",
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+",
  className = "",
  encryptedClassName = "text-silver/50 font-mono",
  animateOn = "hover",
  ...props
}: DecryptedTextProps & React.HTMLAttributes<HTMLSpanElement>) {
  const [displayText, setDisplayText] = useState<string>(text);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [iterations, setIterations] = useState<number>(0);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const containerRef = useRef<HTMLSpanElement>(null);

  const availableChars = useOriginalCharsOnly
    ? Array.from(new Set(text.split(""))).join("")
    : characters;

  const getRandomChar = () => {
    return availableChars[Math.floor(Math.random() * availableChars.length)];
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isAnimating) {
      if (sequential) {
        let currentIndex = 0;

        interval = setInterval(() => {
          setRevealedIndices((prev) => {
            const next = new Set(prev);

            if (revealDirection === "left") {
              next.add(currentIndex);
              currentIndex++;
            } else if (revealDirection === "right") {
              const targetIndex = text.length - 1 - currentIndex;
              next.add(targetIndex);
              currentIndex++;
            } else if (revealDirection === "center") {
              const mid = Math.floor(text.length / 2);
              const offset = Math.floor(currentIndex / 2);
              const targetIndex = currentIndex % 2 === 0 ? mid + offset : mid - offset - 1;
              if (targetIndex >= 0 && targetIndex < text.length) {
                next.add(targetIndex);
              }
              currentIndex++;
            }

            if (next.size >= text.length) {
              clearInterval(interval);
              setIsAnimating(false);
              setIsRevealed(true);
            }
            return next;
          });

          setDisplayText(
            text
              .split("")
              .map((char, i) => {
                if (char === " ") return " ";
                if (revealedIndices.has(i) || isRevealed) return char;
                return getRandomChar();
              })
              .join(""),
          );
        }, speed);
      } else {
        interval = setInterval(() => {
          setIterations((prev) => {
            if (prev < maxIterations) {
              setDisplayText(
                text
                  .split("")
                  .map((char) => {
                    if (char === " ") return " ";
                    return Math.random() < 0.5 ? getRandomChar() : char;
                  })
                  .join(""),
              );
              return prev + 1;
            } else {
              clearInterval(interval);
              setIsAnimating(false);
              setIsRevealed(true);
              setDisplayText(text);
              return prev;
            }
          });
        }, speed);
      }
    }

    return () => clearInterval(interval);
  }, [isAnimating, iterations, text, speed, maxIterations, sequential, revealDirection, isRevealed]);

  useEffect(() => {
    if (animateOn !== "view") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isRevealed && !isAnimating) {
          setIsAnimating(true);
        }
      },
      { threshold: 0.1 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [animateOn, isRevealed, isAnimating]);

  const handleMouseEnter = () => {
    if (animateOn === "hover" && !isAnimating) {
      setRevealedIndices(new Set());
      setIsRevealed(false);
      setIterations(0);
      setIsAnimating(true);
    }
  };

  return (
    <span
      ref={containerRef}
      className={`inline-block cursor-default whitespace-pre-wrap ${className}`}
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      {displayText.split("").map((char, index) => {
        const isOriginal =
          isRevealed || revealedIndices.has(index) || displayText[index] === text[index];
        return (
          <span key={index} className={!isOriginal ? encryptedClassName : ""}>
            {char}
          </span>
        );
      })}
    </span>
  );
}
