import { useEffect, useRef } from "react";

type Props = {
  className?: string;
  /** Sphere radius as a fraction of canvas width */
  radius?: number;
  /** Max radius in CSS pixels to prevent oversized sphere on ultrawide viewports */
  maxRadius?: number;
  /** Min radius in CSS pixels to prevent undersized sphere on mobile viewports */
  minRadius?: number;
  /** Sphere center X/Y as fractions of canvas size (Y > 1 sinks the sphere below the bottom edge) */
  centerX?: number;
  centerY?: number;
  /**
   * Explicit Y coordinate (in CSS pixels, or fraction of canvas height if <= 1)
   * for the top crest of the sphere. When specified, overrides centerY to guarantee
   * the dome peaks at exactly this position and is never cut off at the canvas top.
   */
  crestY?: number;
  /** Number of latitude bands; controls dot density */
  rings?: number;
  /** Max dot radius in CSS pixels */
  maxDot?: number;
  /** Forward tilt (radians) so the north cap faces the viewer */
  tilt?: number;
  /** Rotation speed (radians / second) */
  speed?: number;
  /** Depth below the sphere's crest (fraction of radius) over which dots grow from nothing to full size */
  fadeTop?: number;
  /** React to pointer position with a subtle parallax tilt */
  interactive?: boolean;
  /** Seconds for an intro where dots grow outward from the crest in a wave (0 = none) */
  intro?: number;
  color?: string;
};

/**
 * Luminous halftone dot-matrix globe rendered on canvas.
 * Dots are pure white; the "fade into black" is achieved by dot size alone — a true halftone.
 */
export function HalftoneSphere({
  className = "",
  radius = 0.5,
  maxRadius,
  minRadius,
  centerX = 0.5,
  centerY = 1,
  crestY,
  rings = 64,
  maxDot = 4,
  tilt = 0.55,
  speed = 0.05,
  fadeTop = 0.35,
  interactive = false,
  intro = 0,
  color = "#ffffff",
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Precompute unit-sphere points (lat bands, arc-length spaced longitudes)
    const pts: { lat: number; lon: number }[] = [];
    for (let i = 0; i <= rings; i++) {
      const lat = -Math.PI / 2 + (i / rings) * Math.PI;
      const count = Math.max(1, Math.round(Math.cos(lat) * rings * 2));
      const offset = (i % 2) * 0.5;
      for (let j = 0; j < count; j++) pts.push({ lat, lon: ((j + offset) / count) * Math.PI * 2 });
    }
    const cosLat = pts.map((p) => Math.cos(p.lat));
    const sinLat = pts.map((p) => Math.sin(p.lat));

    let w = 0;
    let h = 0;
    let dpr = 1;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    };
    resize();
    const ro = new ResizeObserver(() => {
      resize();
      draw(angle);
    });
    ro.observe(canvas);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let angle = 0.6;
    let tiltOffset = 0;
    let tiltTarget = 0;
    let yawOffset = 0;
    let yawTarget = 0;

    // Intro wave: starts the first time the sphere is visible; skipped for reduced motion
    let introStart = -1;
    let introDone = intro <= 0;
    const introProgress = (now: number) => (introStart < 0 ? 0 : (now - introStart) / 1000 / intro);

    const draw = (a: number) => {
      const ip = introDone ? 1 : introProgress(performance.now());
      if (!introDone && ip >= 1.05) introDone = true;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color;

      let R = w * radius;
      if (minRadius !== undefined) R = Math.max(R, minRadius);
      if (maxRadius !== undefined) R = Math.min(R, maxRadius);
      const cx = w * centerX;

      let cy = h * centerY;
      if (crestY !== undefined) {
        const targetCrest = crestY <= 1 ? h * crestY : crestY;
        cy = targetCrest + R;
      } else if (centerY < 0.9 && cy - R < 24) {
        // Auto-safety clamp: on wide screens, prevent the sphere crest from extending above the canvas
        cy = R + 24;
      }

      const t = tilt + tiltOffset;
      const ct = Math.cos(t);
      const st = Math.sin(t);
      const crest = cy - R;
      const fadeH = R * fadeTop;
      ctx.beginPath();
      for (let k = 0; k < pts.length; k++) {
        const lon = pts[k].lon + a + yawOffset;
        const x = cosLat[k] * Math.sin(lon);
        const y = sinLat[k];
        const z = cosLat[k] * Math.cos(lon);
        const y2 = y * ct - z * st;
        const z2 = y * st + z * ct;
        if (z2 <= 0.02) continue;
        const sx = cx + x * R;
        const sy = cy - y2 * R;
        if (sy < -10 || sy > h + 10 || sx < -10 || sx > w + 10) continue;
        // Halftone shading: dots swell toward the front-facing center, shrink toward the limb and crest
        const light = 0.2 + 0.8 * z2;
        const fade = fadeH > 0 ? Math.min(1, Math.max(0, (sy - crest) / fadeH)) : 1;
        let r = maxDot * Math.pow(light, 1.25) * (0.15 + 0.85 * fade * fade * (3 - 2 * fade));
        if (!introDone) {
          // Each dot begins growing when the wave front (crest → base) reaches it
          const depth = Math.min(1, Math.max(0, (sy - crest) / (2 * R)));
          const k = Math.min(1, Math.max(0, (ip - depth * 0.6) / 0.4));
          r *= 1 - Math.pow(1 - k, 3);
        }
        if (r < 0.35) continue;
        ctx.moveTo(sx + r, sy);
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
      }
      ctx.fill();
    };

    let raf = 0;
    let last = performance.now();
    let visible = true;
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      angle += speed * dt;
      tiltOffset += (tiltTarget - tiltOffset) * 0.05;
      yawOffset += (yawTarget - yawOffset) * 0.05;
      draw(angle);
      raf = requestAnimationFrame(loop);
    };
    if (reduced) introDone = true;
    const start = () => {
      if (introStart < 0) introStart = performance.now();
      if (reduced || raf) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        draw(angle);
        start();
      } else stop();
    });
    io.observe(canvas);
    draw(angle);

    const onMove = (e: PointerEvent) => {
      if (!visible) return;
      tiltTarget = (e.clientY / window.innerHeight - 0.5) * 0.12;
      yawTarget = (e.clientX / window.innerWidth - 0.5) * 0.25;
    };
    if (interactive && !reduced) window.addEventListener("pointermove", onMove);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, [
    radius,
    maxRadius,
    minRadius,
    centerX,
    centerY,
    crestY,
    rings,
    maxDot,
    tilt,
    speed,
    fadeTop,
    interactive,
    color,
    intro,
  ]);

  return (
    <canvas
      ref={ref}
      className={`pointer-events-none block h-full w-full ${className}`}
      aria-hidden
    />
  );
}
