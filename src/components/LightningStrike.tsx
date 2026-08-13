import React, { useEffect, useState } from 'react';

interface LightningStrikeProps {
  triggerId: number; // Changes to trigger the animation
}

export function LightningStrike({ triggerId }: LightningStrikeProps) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (triggerId > 0) {
      setIsActive(true);
      // Play thunder sound if possible
      try {
        const thunder = new Audio('/sounds/thunder.mp3');
        thunder.volume = 0.6;
        thunder.play().catch(e => console.log('Thunder sound not available', e));
      } catch (e) {}

      // Reset after animation completes
      const timer = setTimeout(() => {
        setIsActive(false);
      }, 1500); // 1.5s total animation time
      
      return () => clearTimeout(timer);
    }
  }, [triggerId]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
      {/* Anime Screen Flash Effect */}
      <div className="absolute inset-0 bg-white opacity-0 animate-anime-flash mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-purple-500 opacity-0 animate-anime-flash-secondary mix-blend-screen"></div>
      <div className="absolute inset-0 bg-cyan-400 opacity-0 animate-anime-flash-secondary mix-blend-color-dodge" style={{ animationDelay: '0.1s' }}></div>

      {/* Main Lightning Bolt SVG */}
      <svg 
        className="absolute top-0 left-0 w-full h-full drop-shadow-[0_0_15px_rgba(0,255,255,0.8)] drop-shadow-[0_0_30px_rgba(168,85,247,0.6)]" 
        preserveAspectRatio="none"
        viewBox="0 0 1000 1000"
      >
        {/* Outer Purple Glow */}
        <path 
          d="M 500,0 L 470,120 L 560,150 L 420,320 L 540,360 L 380,550 L 600,600 L 320,800 L 650,850 L 450,1000" 
          fill="none" 
          stroke="#a855f7" 
          strokeWidth="30" 
          className="animate-lightning-strike opacity-40 blur-md"
        />

        {/* Cyan Inner Glow */}
        <path 
          d="M 500,0 L 470,120 L 560,150 L 420,320 L 540,360 L 380,550 L 600,600 L 320,800 L 650,850 L 450,1000" 
          fill="none" 
          stroke="#22d3ee" 
          strokeWidth="15" 
          className="animate-lightning-strike opacity-80 blur-sm"
        />

        {/* Core White Bolt */}
        <path 
          d="M 500,0 L 470,120 L 560,150 L 420,320 L 540,360 L 380,550 L 600,600 L 320,800 L 650,850 L 450,1000" 
          fill="none" 
          stroke="#ffffff" 
          strokeWidth="8" 
          className="animate-lightning-strike"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />

        {/* --- Branches --- */}

        {/* Branch 1 (Right) */}
        <path 
          d="M 560,150 L 700,200 L 650,300 L 850,280 L 950,400" 
          fill="none" 
          stroke="#ffffff" 
          strokeWidth="4" 
          className="animate-lightning-branch-1 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]"
        />
        
        {/* Branch 2 (Left) */}
        <path 
          d="M 380,550 L 200,500 L 280,680 L 50,750" 
          fill="none" 
          stroke="#ffffff" 
          strokeWidth="5" 
          className="animate-lightning-branch-2 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]"
        />

        {/* Branch 3 (Lower Right) */}
        <path 
          d="M 600,600 L 800,750 L 720,850 L 900,950" 
          fill="none" 
          stroke="#ffffff" 
          strokeWidth="3" 
          className="animate-lightning-branch-3 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]"
        />

        {/* Micro-Crackles (Small chaotic lines) */}
        <path 
          d="M 420,320 L 300,300 L 350,220" 
          fill="none" 
          stroke="#ffffff" 
          strokeWidth="2" 
          className="animate-lightning-branch-2 opacity-70"
        />
        <path 
          d="M 320,800 L 150,900 L 200,1000" 
          fill="none" 
          stroke="#ffffff" 
          strokeWidth="3" 
          className="animate-lightning-branch-1 opacity-80"
        />
      </svg>
    </div>
  );
}
