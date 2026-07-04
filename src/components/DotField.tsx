import React, { useEffect, useRef, useState } from "react";

interface DotFieldProps {
  className?: string;
  style?: React.CSSProperties;
  dotRadius?: number;
  dotSpacing?: number;
  bulgeStrength?: number;
  glowRadius?: number;
  sparkle?: boolean;
  waveAmplitude?: number;
  cursorRadius?: number;
  cursorForce?: number;
  bulgeOnly?: boolean;
  gradientFrom?: string;
  gradientTo?: string;
  glowColor?: string;
}

export default function DotField({
  className = "",
  style = {},
  dotRadius = 1.5,
  dotSpacing = 14,
  bulgeStrength = 67,
  glowRadius = 160,
  sparkle = false,
  waveAmplitude = 0,
  cursorRadius = 500,
  cursorForce = 0.1,
  bulgeOnly = true,
  gradientFrom = "#A855F7",
  gradientTo = "#B497CF",
  glowColor = "#120F17"
}: DotFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [coords, setCoords] = useState({ x: -1000, y: -1000 });
  const mouseSmoothRef = useRef({ x: -1000, y: -1000 });
  const requestRef = useRef<number | null>(null);

  // Parse hex to RGB colors for interpolation
  const parseHex = (hex: string) => {
    const h = hex.replace("#", "").trim();
    if (h.length === 3) {
      return {
        r: parseInt(h[0] + h[0], 16),
        g: parseInt(h[1] + h[1], 16),
        b: parseInt(h[2] + h[2], 16)
      };
    }
    return {
      r: parseInt(h.slice(0, 2), 16),
      g: parseInt(h.slice(2, 4), 16),
      b: parseInt(h.slice(4, 6), 16)
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width;
    let height = canvas.height;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = parent.clientWidth || 300;
        height = parent.clientHeight || 300;
        canvas.width = width * (window.devicePixelRatio || 1);
        canvas.height = height * (window.devicePixelRatio || 1);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
      }
    };

    handleResize();

    if ("ResizeObserver" in window && canvas.parentElement) {
      const ro = new ResizeObserver(handleResize);
      ro.observe(canvas.parentElement);
      return () => {
        ro.disconnect();
      };
    } else {
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  // Track Pointer Move inside the field
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      setCoords({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    const handlePointerLeave = () => {
      setCoords({ x: -1000, y: -1000 });
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  // Canvas loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastTime = 0;

    const hexFrom = parseHex(gradientFrom);
    const hexTo = parseHex(gradientTo);

    const lerpColor = (t: number) => {
      const r = Math.round(hexFrom.r + (hexTo.r - hexFrom.r) * t);
      const g = Math.round(hexFrom.g + (hexTo.g - hexFrom.g) * t);
      const b = Math.round(hexFrom.b + (hexTo.b - hexFrom.b) * t);
      return `rgb(${r}, ${g}, ${b})`;
    };

    const render = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse coordinates
      if (mouseSmoothRef.current.x === -1000) {
        mouseSmoothRef.current.x = coords.x;
        mouseSmoothRef.current.y = coords.y;
      } else {
        const speedFactor = 12; // mouse smoothing response speed
        mouseSmoothRef.current.x += (coords.x - mouseSmoothRef.current.x) * Math.min(1, speedFactor * delta);
        mouseSmoothRef.current.y += (coords.y - mouseSmoothRef.current.y) * Math.min(1, speedFactor * delta);
      }

      const mouseX = mouseSmoothRef.current.x;
      const mouseY = mouseSmoothRef.current.y;

      // Draw subtle background Glow at mouse position
      if (mouseX !== -1000 && mouseY !== -1000 && glowRadius > 0) {
        const glow = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, glowRadius);
        // Soft overlay glow
        glow.addColorStop(0, glowColor + "1a"); // 10% opacity
        glow.addColorStop(0.5, glowColor + "05"); // extremely faint opacity
        glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);
      }

      // Compute grid details
      const cols = Math.floor(width / dotSpacing) + 2;
      const rows = Math.floor(height / dotSpacing) + 2;

      // Draw dot grid with interactive bulge math
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const originX = c * dotSpacing;
          const originY = r * dotSpacing;

          let targetX = originX;
          let targetY = originY;

          // Wave modulation over time if positive amplitude
          if (waveAmplitude > 0) {
            targetY += Math.sin(originX * 0.05 + time * 0.003) * waveAmplitude;
          }

          // Bulge manipulation
          if (mouseX !== -1000 && mouseY !== -1000) {
            const dx = targetX - mouseX;
            const dy = targetY - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy) || 0.0001;

            if (dist < cursorRadius) {
              const ratio = dist / cursorRadius; // 0 to 1
              // Sigmoid or simple smooth ease-out push factor
              const force = (1.0 - ratio) * bulgeStrength * cursorForce;
              
              if (bulgeOnly) {
                // Push dots outwards radially from the cursor
                targetX += (dx / dist) * force;
                targetY += (dy / dist) * force;
              }
            }
          }

          // Draw the dot
          ctx.beginPath();
          ctx.arc(targetX, targetY, dotRadius, 0, Math.PI * 2);

          // Interpolated color based on horizontal coordinates relative to width
          const colorRatio = Math.max(0, Math.min(1, targetX / (width || 1)));
          ctx.fillStyle = lerpColor(colorRatio);

          // Sparkle modifier if designated
          if (sparkle) {
            const sparklesRandom = Math.sin(c * 17.5 + r * 31.2 + time * 0.012);
            if (sparklesRandom > 0.8) {
              ctx.globalAlpha = 0.35 + Math.random() * 0.65;
            } else {
              ctx.globalAlpha = 0.5;
            }
          } else {
            ctx.globalAlpha = 0.45; // Soft high contrast blend
          }

          ctx.fill();
        }
      }

      ctx.globalAlpha = 1.0;
      requestRef.current = requestAnimationFrame(render);
    };

    requestRef.current = requestAnimationFrame(render);

    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [
    coords,
    dotRadius,
    dotSpacing,
    bulgeStrength,
    glowRadius,
    sparkle,
    waveAmplitude,
    cursorRadius,
    cursorForce,
    bulgeOnly,
    gradientFrom,
    gradientTo,
    glowColor
  ]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden ${className}`}
      style={{ ...style, display: "block" }}
    >
      <canvas
        ref={canvasRef}
        className="block pointer-events-auto cursor-none w-full h-full"
      />
    </div>
  );
}
