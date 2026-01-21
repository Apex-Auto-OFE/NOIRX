import React from 'react';
import Reveal from './Reveal';

const cases = [
  {
    code: "OP-492",
    client: "Sovereign Wealth Entity",
    sector: "Energy / Geopolitics",
    outcome: "Secured exclusive rights to [REDACTED] reserves in the Arctic circle, bypassing international sanctions through [REDACTED] proxy structures."
  },
  {
    code: "OP-881",
    client: "Fortune 10 Tech Conglomerate",
    sector: "Artificial Intelligence",
    outcome: "Neutralized hostile takeover attempt by [REDACTED] via strategic counter-acquisition of key IP assets in [REDACTED]."
  },
  {
    code: "OP-115",
    client: "Private Family Office",
    sector: "Legacy Preservation",
    outcome: "Restructured $50B portfolio to ensure tax neutrality across 12 jurisdictions, effectively erasing [REDACTED] liability for the next century."
  }
];

const DossierCard: React.FC<{ c: any }> = ({ c }) => {
    return (
        <div className="group relative border border-white/10 bg-black/30 backdrop-blur-sm p-8 md:p-12 hover:border-white/30 transition-colors duration-500 cursor-hover overflow-hidden">
            {/* Background Noise on Hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-500 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent h-[100px] w-full -translate-y-[100%] group-hover:animate-[scan_2s_linear_infinite] pointer-events-none z-0"></div>
            
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-8 border-b border-white/5 pb-8">
                    <span className="font-mono text-xs text-emerald-500/70 tracking-widest">[{c.code}]</span>
                    <span className="font-mono text-[9px] text-white/30 tracking-[0.2em] uppercase group-hover:text-emerald-500 transition-colors">Status: Closed</span>
                </div>

                <div className="space-y-6">
                    <div>
                        <p className="text-[9px] uppercase tracking-widest text-white/40 mb-1">Client</p>
                        <p className="text-lg font-serif text-white">{c.client}</p>
                    </div>
                    <div>
                        <p className="text-[9px] uppercase tracking-widest text-white/40 mb-1">Sector</p>
                        <p className="text-sm font-light text-white/70">{c.sector}</p>
                    </div>
                    <div className="pt-4">
                        <p className="text-[9px] uppercase tracking-widest text-white/40 mb-2">Outcome</p>
                        <p className="text-sm font-mono text-neutral-400 leading-relaxed relative">
                            {c.outcome.split('[REDACTED]').map((part, i, arr) => (
                                <React.Fragment key={i}>
                                    {part}
                                    {i < arr.length - 1 && (
                                        <span className="inline-block bg-white/10 text-transparent px-1 select-none group-hover:bg-transparent group-hover:text-emerald-500/50 transition-all duration-700 rounded-sm mx-1 border border-white/10 group-hover:border-emerald-500/20">
                                            XXX
                                        </span>
                                    )}
                                </React.Fragment>
                            ))}
                        </p>
                    </div>
                </div>

                {/* Stamp Effect */}
                <div className="absolute -bottom-6 -right-6 border-4 border-white/5 w-32 h-32 rounded-full flex items-center justify-center -rotate-12 opacity-50 group-hover:opacity-100 group-hover:border-white/10 transition-all duration-500">
                    <span className="text-[10px] font-black uppercase text-white/10 tracking-widest group-hover:text-white/20">Classified</span>
                </div>
            </div>
        </div>
    );
};

const Dossiers: React.FC = () => {
  return (
    <section className="py-32 bg-transparent text-white px-6 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="mb-20">
            <h2 className="text-4xl md:text-6xl font-serif tracking-tighter text-white mb-6">Archives</h2>
            <p className="text-neutral-500 text-sm font-mono max-w-xl">
                Select historical operations have been declassified for authorized viewing. <br/>
                SENSITIVE INFORMATION HAS BEEN REDACTED.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((c, i) => (
                <Reveal key={i} delay={i * 0.1}>
                    <DossierCard c={c} />
                </Reveal>
            ))}
        </div>
      </div>
      <style>{`
        @keyframes scan {
            0% { transform: translateY(-150%); }
            100% { transform: translateY(500%); }
        }
      `}</style>
    </section>
  );
};

export default Dossiers;