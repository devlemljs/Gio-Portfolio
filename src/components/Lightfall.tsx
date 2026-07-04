import React, { useEffect, useRef, useState } from "react";

interface LightfallProps {
  className?: string;
  style?: React.CSSProperties;
  colors?: string[];
  backgroundColor?: string;
  speed?: number;
  streakCount?: number;
  streakWidth?: number;
  streakLength?: number;
  glow?: number;
  density?: number;
  twinkle?: number;
  zoom?: number;
  backgroundGlow?: number;
  opacity?: number;
  mouseInteraction?: boolean;
  mouseStrength?: number;
  mouseRadius?: number;
  color1?: string;
  color2?: string;
  color3?: string;
}

export default function Lightfall({
  className = "",
  style = {},
  colors = ["#A6C8FF", "#5227FF", "#FF9FFC"],
  backgroundColor = "#0A29FF",
  speed = 0.5,
  streakCount = 2,
  streakWidth = 1,
  streakLength = 1,
  glow = 1,
  density = 0.6,
  twinkle = 1.0,
  zoom = 3,
  backgroundGlow = 0.5,
  opacity = 1.0,
  mouseInteraction = true,
  mouseStrength = 0.5,
  mouseRadius = 1.0,
  color1,
  color2,
  color3
}: LightfallProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mouse, setMouse] = useState({ x: -1000, y: -1000 });
  const mouseSmoothRef = useRef({ x: -1000, y: -1000 });
  const requestRef = useRef<number | null>(null);

  // Combine arrays and singular color props safely
  const activeColors = Array.from(
    new Set([
      ...(colors || []),
      ...(color1 ? [color1] : []),
      ...(color2 ? [color2] : []),
      ...(color3 ? [color3] : [])
    ])
  ).filter(Boolean) as string[];

  const finalColors = activeColors.length > 0 ? activeColors : ["#A6C8FF", "#5227FF", "#FF9FFC"];

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

  // Track Pointer Move inside the canvas container
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      setMouse({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    const handlePointerLeave = () => {
      setMouse({ x: -1000, y: -1000 });
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  // Main Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastTime = 0;

    // Streaks and twinkling particles arrays
    interface Streak {
      x: number;
      y: number;
      vy: number;
      length: number;
      width: number;
      color: string;
      alpha: number;
    }

    interface Twinkler {
      x: number;
      y: number;
      size: number;
      phase: number;
      speed: number;
      color: string;
    }

    const streaks: Streak[] = [];
    const twinklers: Twinkler[] = [];

    // Initialize elements based on density and streakCount variables
    const initElements = (w: number, h: number) => {
      streaks.length = 0;
      twinklers.length = 0;

      const numStreaks = Math.floor(60 * streakCount * density);
      for (let i = 0; i < numStreaks; i++) {
        streaks.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vy: (200 + Math.random() * 300) * speed,
          length: (50 + Math.random() * 150) * streakLength,
          width: (0.8 + Math.random() * 1.5) * streakWidth,
          color: finalColors[Math.floor(Math.random() * finalColors.length)],
          alpha: 0.2 + Math.random() * 0.6
        });
      }

      const numTwinklers = Math.floor(100 * density);
      for (let i = 0; i < numTwinklers; i++) {
        twinklers.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: 0.5 + Math.random() * 1.5,
          phase: Math.random() * Math.PI * 2,
          speed: (0.5 + Math.random() * 1.5) * twinkle,
          color: finalColors[Math.floor(Math.random() * finalColors.length)]
        });
      }
    };

    let initializedSize = { w: 0, h: 0 };

    const render = (time: number) => {
      const delta = Math.min(0.1, (time - lastTime) / 1000);
      lastTime = time;

      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      // Re-initialize if container size changes
      if (width !== initializedSize.w || height !== initializedSize.h) {
        initElements(width, height);
        initializedSize = { w: width, h: height };
      }

      // Smooth mouse coordinates
      if (mouseSmoothRef.current.x === -1000) {
        mouseSmoothRef.current.x = mouse.x;
        mouseSmoothRef.current.y = mouse.y;
      } else {
        const speedFactor = 10;
        mouseSmoothRef.current.x += (mouse.x - mouseSmoothRef.current.x) * Math.min(1, speedFactor * delta);
        mouseSmoothRef.current.y += (mouse.y - mouseSmoothRef.current.y) * Math.min(1, speedFactor * delta);
      }

      const mX = mouseSmoothRef.current.x;
      const mY = mouseSmoothRef.current.y;

      // Draw beautiful background paint with deep fallback
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      // Add a subtle ambient overlay glow in the center and under mouse
      if (backgroundGlow > 0) {
        // Deep ambient glow
        const grad = ctx.createRadialGradient(
          width / 2,
          height / 2,
          0,
          width / 2,
          height / 2,
          Math.max(width, height) * 0.8
        );
        grad.addColorStop(0, finalColors[0] + "22"); // 13% opacity
        grad.addColorStop(0.5, finalColors[1] + "0a"); // 4% opacity
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // Mouse glow tracker
        if (mX !== -1000 && mY !== -1000) {
          const mouseGlow = ctx.createRadialGradient(mX, mY, 0, mX, mY, 180 * mouseRadius);
          mouseGlow.addColorStop(0, finalColors[2] + "33"); // 20% opacity
          mouseGlow.addColorStop(0.6, finalColors[0] + "08");
          mouseGlow.addColorStop(1, "transparent");
          ctx.fillStyle = mouseGlow;
          ctx.fillRect(0, 0, width, height);
        }
      }

      // 1. Render & Animate Twinkling Stars
      for (const t of twinklers) {
        t.phase += t.speed * delta;
        const currentAlpha = 0.1 + Math.abs(Math.sin(t.phase)) * 0.8;
        
        ctx.save();
        ctx.globalAlpha = currentAlpha * opacity;
        ctx.fillStyle = t.color;
        ctx.beginPath();
        // zoom scales elements slightly
        ctx.arc(t.x, t.y, t.size * (1 + (zoom - 3) * 0.15), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 2. Render & Animate Falling Streaks
      for (const s of streaks) {
        // Fall down
        s.y += s.vy * delta;
        if (s.y - s.length > height) {
          s.y = -s.length;
          s.x = Math.random() * width;
        }

        let currX = s.x;
        let currY = s.y;
        let currentLength = s.length;

        // Apply mouse distortion / push-away field
        if (mouseInteraction && mX !== -1000 && mY !== -1000) {
          const dx = currX - mX;
          const dy = currY - mY;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const safeRadius = 150 * mouseRadius;

          if (dist < safeRadius) {
            const pushFactor = (1.0 - dist / safeRadius) * 60 * mouseStrength;
            // Shift x coordinates slightly away from cursor
            currX += (dx / dist) * pushFactor;
            // Shorten the streak so it looks like it dissolves/bends
            currentLength *= (0.3 + 0.7 * (dist / safeRadius));
          }
        }

        // Draw streak line with optional glow shadows
        ctx.save();
        ctx.globalAlpha = s.alpha * opacity;
        
        if (glow > 0) {
          ctx.shadowBlur = 10 * glow;
          ctx.shadowColor = s.color;
        }

        ctx.strokeStyle = s.color;
        ctx.lineWidth = s.width * (1 + (zoom - 3) * 0.15);
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(currX, currY);
        ctx.lineTo(currX, currY + currentLength);
        ctx.stroke();

        ctx.restore();
      }

      requestRef.current = requestAnimationFrame(render);
    };

    requestRef.current = requestAnimationFrame(render);

    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [
    mouse,
    colors,
    backgroundColor,
    speed,
    streakCount,
    streakWidth,
    streakLength,
    glow,
    density,
    twinkle,
    zoom,
    backgroundGlow,
    opacity,
    mouseInteraction,
    mouseStrength,
    mouseRadius,
    finalColors
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
