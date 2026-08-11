"use client";
import React from "react";
import { Coffee } from "lucide-react";

export function BuyMeChaiButton() {
  return (
    <div className="flex justify-end w-full animate-fade-in-up" style={{ animationDelay: "200ms" }}>
      <a
        href="https://razorpay.me/@mayankchaudhary7545"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center gap-3 px-6 py-3 bg-[#8c3d10] hover:bg-[#a64b18] text-white border-l border-t border-[#d48b59]/30 shadow-[-4px_-4px_20px_rgba(140,61,16,0.4)] transition-all duration-300 active:bg-[#6b2e0c] overflow-hidden rounded-tl-xl"
      >
        {/* Shine effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
        
        {/* Icon */}
        <div className="bg-[#5c270a] p-1.5 rounded-sm shadow-inner">
          <Coffee size={16} className="text-[#f5c6a5]" />
        </div>
        
        {/* Text */}
        <span 
          className="text-sm sm:text-base font-medium tracking-wide whitespace-nowrap"
          style={{ fontFamily: "var(--font-baloo-2)" }}
        >
          Buy me a Chai
        </span>
      </a>
    </div>
  );
}
