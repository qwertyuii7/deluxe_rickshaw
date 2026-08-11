"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export function TasselDecoration() {
  const tasselRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (tasselRef.current) {
      // Simulate physics of a moving auto rickshaw
      gsap.to(tasselRef.current, {
        rotation: 12,
        duration: 1.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        transformOrigin: "top center",
      });
    }
  }, []);

  return (
    <div className="fixed top-0 left-[20%] md:left-[30%] z-40 pointer-events-none origin-top drop-shadow-2xl">
      <img
        ref={tasselRef}
        src="/images/tassel_latkan.png"
        alt="Decorative Tassel"
        className="w-16 md:w-24 object-contain"
        onError={(e) => {
          // Hide if the image isn't available to prevent broken image icon
          e.currentTarget.style.display = 'none';
        }}
      />
    </div>
  );
}
