"use client";

import React, { useEffect, useRef } from "react";

interface RainCanvasProps {
  isRainMode: boolean;
}

interface Raindrop {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
}

interface Splash {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

export function RainCanvas({ isRainMode }: RainCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    // Setup Audio
    if (!audioRef.current) {
      audioRef.current = new Audio("/sounds/rain.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
    }

    if (isRainMode) {
      audioRef.current.play().catch((e) => console.log("Rain audio play failed:", e));
    } else {
      audioRef.current.pause();
    }

    // Setup Canvas
    const canvas = canvasRef.current;
    if (!canvas || !isRainMode) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    const raindrops: Raindrop[] = [];
    const splashes: Splash[] = [];

    // Initialize rain
    for (let i = 0; i < 200; i++) {
      raindrops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 25 + 15,
        speed: Math.random() * 12 + 18,
        opacity: Math.random() * 0.4 + 0.3,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Get Radio Bounding Box
      const radio = document.getElementById("radio-casing");
      let radioBounds: DOMRect | null = null;
      if (radio) {
        radioBounds = radio.getBoundingClientRect();
      }

      // Draw and update Raindrops
      ctx.strokeStyle = "rgba(220, 235, 255, 0.8)";
      ctx.lineWidth = 1.5;
      ctx.lineCap = "round";

      for (let i = 0; i < raindrops.length; i++) {
        const drop = raindrops[i];
        
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - drop.length * 0.15, drop.y + drop.length); // Slight angle
        ctx.globalAlpha = drop.opacity;
        ctx.stroke();

        // Update position
        drop.y += drop.speed;
        drop.x -= drop.speed * 0.15; // match angle

        // Collision Check with Radio Top Edge
        if (
          radioBounds &&
          drop.y + drop.length >= radioBounds.top && 
          drop.y <= radioBounds.top + 10 &&
          drop.x >= radioBounds.left &&
          drop.x <= radioBounds.right
        ) {
          // Spawn splashes (4-6 natural splashes)
          const numSplashes = Math.floor(Math.random() * 3) + 4;
          for (let s = 0; s < numSplashes; s++) {
            splashes.push({
              x: drop.x,
              y: radioBounds.top,
              vx: (Math.random() - 0.5) * 6,
              vy: (Math.random() * -4) - 2, // stronger upward bounce
              radius: Math.random() * 1.5 + 0.5,
              opacity: Math.random() * 0.5 + 0.5,
            });
          }
          // Reset raindrop to top
          drop.y = -50;
          drop.x = Math.random() * width + 100;
          continue;
        }

        // Reset if off screen
        if (drop.y > height) {
          drop.y = -50;
          drop.x = Math.random() * width + 100;
        }
      }

      // Draw and update Splashes
      ctx.strokeStyle = "rgba(200, 225, 255, 0.8)";
      ctx.lineWidth = 1;
      
      for (let i = splashes.length - 1; i >= 0; i--) {
        const splash = splashes[i];
        
        ctx.globalAlpha = splash.opacity;
        ctx.beginPath();
        
        // Draw splash as a motion-blurred line based on velocity
        ctx.moveTo(splash.x, splash.y);
        ctx.lineTo(splash.x - splash.vx * 1.5, splash.y - splash.vy * 1.5);
        ctx.stroke();

        // Physics
        splash.x += splash.vx;
        splash.y += splash.vy;
        splash.vy += 0.5; // Stronger gravity for natural arc
        splash.opacity -= 0.04; // Fade out

        // Remove dead splashes
        if (splash.opacity <= 0) {
          splashes.splice(i, 1);
        }
      }

      ctx.globalAlpha = 1.0;
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isRainMode]);

  if (!isRainMode) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-30 pointer-events-none"
    />
  );
}
