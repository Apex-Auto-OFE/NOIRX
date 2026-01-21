import React from 'react';

const Ticker: React.FC = () => {
  const items = [
    "MARKET_VOLATILITY_INDEX: CRITICAL",
    "ASSET_ALLOCATION: OPTIMIZED",
    "GEOPOLITICAL_SHIFT: DETECTED",
    "CURRENCY_FLUX: STABLE",
    "NOIR_INDEX: +0.04%",
    "STRATEGY_DEPLOYMENT: ACTIVE",
    "SIGNAL_STRENGTH: 100%",
    "ENCRYPTION: AES-256",
    "TARGET_ACQUIRED",
    "SILENCE_PROTOCOL: ENGAGED"
  ];

  return (
    <div className="w-full bg-black/40 border-y border-white/5 py-3 overflow-hidden flex relative z-20 pointer-events-none select-none backdrop-blur-sm">
      <div className="animate-[scroll_20s_linear_infinite] whitespace-nowrap flex space-x-16">
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} className="text-[9px] font-mono text-white/30 tracking-[0.2em] uppercase">
            {item} <span className="mx-4 text-emerald-500/50">•</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </div>
  );
};

export default Ticker;