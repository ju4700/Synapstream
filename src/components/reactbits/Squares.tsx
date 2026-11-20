import { useRef, useEffect, useState } from "react";

interface SquaresProps {
  direction?: "diagonal" | "up" | "down" | "left" | "right";
  speed?: number;
  squareSize?: number;
  borderColor?: string;
  hoverFillColor?: string;
  backgroundColor?: string;
  className?: string;
}

export function Squares({
  direction = "diagonal",
  speed = 0.6,
  squareSize = 44,
  borderColor = "rgba(255, 255, 255, 0.07)",
  hoverFillColor = "rgba(255, 255, 255, 0.12)",
  backgroundColor = "transparent",
  className = "",
}: SquaresProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredSquare, setHoveredSquare] = useState<{ x: number; y: number } | null>(null);
  const gridOffsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const updateGridOffset = () => {
      gridOffsetRef.current.x = (gridOffsetRef.current.x + speed * 0.3) % squareSize;
      gridOffsetRef.current.y = (gridOffsetRef.current.y + speed * 0.3) % squareSize;
    };

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (backgroundColor !== "transparent") {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      const offsetX = gridOffsetRef.current.x;
      const offsetY = gridOffsetRef.current.y;

      const cols = Math.ceil(canvas.width / squareSize) + 2;
      const rows = Math.ceil(canvas.height / squareSize) + 2;

      for (let i = -1; i < cols; i++) {
        for (let j = -1; j < rows; j++) {
          let x = 0;
          let y = 0;

          switch (direction) {
            case "right":
              x = i * squareSize + offsetX;
              y = j * squareSize;
              break;
            case "left":
              x = i * squareSize - offsetX;
              y = j * squareSize;
              break;
            case "down":
              x = i * squareSize;
              y = j * squareSize + offsetY;
              break;
            case "up":
              x = i * squareSize;
              y = j * squareSize - offsetY;
              break;
            case "diagonal":
            default:
              x = i * squareSize + offsetX;
              y = j * squareSize + offsetY;
              break;
          }

          if (
            hoveredSquare &&
            Math.floor((x - offsetX) / squareSize) === hoveredSquare.x &&
            Math.floor((y - offsetY) / squareSize) === hoveredSquare.y
          ) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(x, y, squareSize, squareSize);
          }

          ctx.strokeStyle = borderColor;
          ctx.lineWidth = 1;
          ctx.strokeRect(x, y, squareSize, squareSize);
        }
      }
    };

    const animate = () => {
      updateGridOffset();
      drawGrid();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [direction, speed, squareSize, borderColor, hoverFillColor, backgroundColor, hoveredSquare]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xIndex = Math.floor(mouseX / squareSize);
    const yIndex = Math.floor(mouseY / squareSize);

    setHoveredSquare({ x: xIndex, y: yIndex });
  };

  const handleMouseLeave = () => {
    setHoveredSquare(null);
  };

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-auto absolute inset-0 block size-full ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    />
  );
}
