import { useMemo } from "react";
import QRCode from "qrcode";
import { VCARD } from "./contactData";

/** Scannable vCard QR, with the brand's asymmetric finder tiles. */
export function QrCode({ className = "" }: { className?: string }) {
  const { size, cells } = useMemo(() => {
    const qr = QRCode.create(VCARD, { errorCorrectionLevel: "M" });
    const n = qr.modules.size;
    const out: [number, number][] = [];
    const inFinder = (r: number, c: number) =>
      (r < 7 && c < 7) || (r < 7 && c >= n - 7) || (r >= n - 7 && c < 7);
    for (let r = 0; r < n; r++)
      for (let c = 0; c < n; c++) if (qr.modules.get(r, c) && !inFinder(r, c)) out.push([r, c]);
    return { size: n, cells: out };
  }, []);

  const q = 2;
  const total = size + q * 2;
  const finder = (x: number, y: number) => (
    <g key={`${x}-${y}`} transform={`translate(${x + q} ${y + q})`}>
      <path d="M1.6 0H7V5.4A1.6 1.6 0 0 1 5.4 7H0V1.6A1.6 1.6 0 0 1 1.6 0Z" fill="#000" />
      <path d="M1.6 1H6V5.2A0.8 0.8 0 0 1 5.2 6H1V1.6A0.6 0.6 0 0 1 1.6 1Z" fill="#fff" />
      <path d="M2.7 2H5V4.3A0.7 0.7 0 0 1 4.3 5H2V2.7A0.7 0.7 0 0 1 2.7 2Z" fill="#000" />
    </g>
  );

  return (
    <svg
      viewBox={`0 0 ${total} ${total}`}
      className={`block ${className}`}
      shapeRendering="crispEdges"
      role="img"
      aria-label="QR code containing the SYNAPSTREAM corporate contact card"
    >
      <rect width={total} height={total} fill="#fff" />
      {cells.map(([r, c]) => (
        <rect
          key={`${r}-${c}`}
          x={c + q + 0.06}
          y={r + q + 0.06}
          width={0.88}
          height={0.88}
          fill="#000"
        />
      ))}
      {finder(0, 0)}
      {finder(size - 7, 0)}
      {finder(0, size - 7)}
    </svg>
  );
}
