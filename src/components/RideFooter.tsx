"use client";
import React, { useState } from "react";
import { Star } from "lucide-react";
import { BuyMeChaiButton } from "@/components/BuyMeChaiButton";

const RATING_MESSAGES: Record<number, string> = {
  1: "😡 इतनी कंजूसी? पैदल ही चले जाते सेठ जी!",
  2: "😒 खुले पैसे नहीं हैं, चुप-चाप बैठो।",
  3: "😐 ठीक-ठाक? ऑटो है भाई, हवाई जहाज़ नहीं!",
  4: "😎 सही है, अब जल्दी उतरो, दूसरी सवारी वेट कर रही है!",
  5: "🔥 बवाल रेटिंग! कल से तुम मेरे VIP पैसेंजर!",
};

export function RideFooter() {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [selectedStar, setSelectedStar] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [burstIndex, setBurstIndex] = useState<number | null>(null);

  const activeStar = hoveredStar ?? selectedStar;

  const handleStarClick = (star: number) => {
    setSelectedStar(star);
    setBurstIndex(star);
    setTimeout(() => setBurstIndex(null), 300);

    // Auto-submit after a brief moment
    setTimeout(() => setIsSubmitted(true), 800);
  };

  return (
    <footer className="w-full mt-16 py-16 sm:py-20 px-4 bg-back-panel text-white relative z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/75" />
      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rickshaw-yellow to-transparent" />

      <div className="relative max-w-2xl mx-auto flex flex-col items-center text-center space-y-10 sm:space-y-12">

        {/* Rating Widget */}
        <div className="glass-gold p-6 sm:p-8 rounded-3xl w-full max-w-md">
          {!isSubmitted ? (
            <>
              <h3
                className="text-2xl sm:text-3xl text-rickshaw-yellow mb-6"
                style={{ fontFamily: "var(--font-yatra-one)" }}
              >
                अपने ड्राइवर को रेट करो ⭐
              </h3>

              <div className="flex justify-center gap-2 sm:gap-3 mb-4 relative">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(null)}
                    onClick={() => handleStarClick(star)}
                    className={`transition-transform duration-200 focus:outline-none ${
                      burstIndex === star ? "animate-star-burst" : ""
                    } hover:scale-125`}
                  >
                    <Star
                      size={36}
                      fill={activeStar !== null && star <= activeStar ? "#FFD700" : "transparent"}
                      className={`transition-colors duration-200 ${
                        activeStar !== null && star <= activeStar
                          ? "text-rickshaw-yellow"
                          : "text-white/20"
                      }`}
                      strokeWidth={1.5}
                    />
                  </button>
                ))}
              </div>

              {/* Dynamic tooltip message */}
              <div
                className={`transition-all duration-300 ${
                  activeStar ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                }`}
              >
                <p
                  className="text-lg sm:text-xl text-white/80 mt-2"
                  style={{ fontFamily: "var(--font-baloo-2)" }}
                >
                  {activeStar ? RATING_MESSAGES[activeStar] : ""}
                </p>
              </div>
            </>
          ) : (
            <div className="py-4 animate-fade-in-up">
              <div className="text-5xl mb-4">🙏</div>
              <h3
                className="text-2xl sm:text-3xl text-rickshaw-yellow mb-2"
                style={{ fontFamily: "var(--font-yatra-one)" }}
              >
                धन्यवाद!
              </h3>
              <p
                className="text-base text-white/60"
                style={{ fontFamily: "var(--font-baloo-2)" }}
              >
                आपकी {selectedStar} स्टार रेटिंग दर्ज हो गई
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setSelectedStar(null);
                }}
                className="mt-4 text-sm text-rickshaw-yellow/50 hover:text-rickshaw-yellow/80 transition-colors underline"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                फिर से रेट करें
              </button>
            </div>
          )}
        </div>

        {/* Ride Receipt */}
        <div className="glass p-5 sm:p-6 rounded-2xl w-full max-w-lg space-y-2">
          <p className="text-xs text-white/30 uppercase tracking-[0.25em] border-b border-white/10 pb-3 mb-4 text-left"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            🧾 Ride Receipt
          </p>
          <ul className="text-left space-y-3 text-sm sm:text-base" style={{ fontFamily: "var(--font-baloo-2)" }}>
            <li className="flex justify-between items-center text-white/70">
              <span>AC Status:</span>
              <span className="text-red-400 font-bold">❌ No AC.</span>
            </li>
            <li className="flex justify-between items-center text-white/70">
              <span>Payment Mode:</span>
              <span className="text-green-400">✅ UPI चलता है</span>
            </li>
            <li className="flex justify-between items-center text-white/70">
              <span>Change (छुट्टा):</span>
              <span className="text-white/40">छुट्टा नहीं है 🤷</span>
            </li>
            <li className="border-t border-white/10 pt-3 flex justify-between items-center font-bold text-base sm:text-lg">
              <span className="text-white/80">Total Fare:</span>
              <span className="text-rickshaw-yellow text-xl">₹0</span>
            </li>
          </ul>
          <p className="text-xs text-white/25 mt-4 text-center italic" style={{ fontFamily: "var(--font-baloo-2)" }}>
            (भाई गाना सुन लिया, पैसा नहीं लगता)
          </p>
        </div>

        {/* Buy Me A Chai integration */}
        <div className="w-full flex justify-end">
          <BuyMeChaiButton />
        </div>

        {/* Footer credit */}
        <p className="text-xs text-white/15 mt-8" style={{ fontFamily: "var(--font-inter)" }}>
          Made with 🛺 and zero AC · ऑटो रिक्शा FM
        </p>
      </div>
    </footer>
  );
}
