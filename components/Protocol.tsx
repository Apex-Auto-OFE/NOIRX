import React from 'react';
import Reveal from './Reveal';
import RedactedText from './RedactedText';

const steps = [
  {
    phase: "PHASE I",
    title: "Infiltration",
    desc: "We do not enter markets; we permeate them. Through deep-data reconnaissance and shadow analytics, we understand the landscape better than its architects."
  },
  {
    phase: "PHASE II",
    title: "Calibration",
    desc: "Strategy is not a document; it is a weapon. We forge bespoke pathways that leverage asymmetry, turning market volatility into structured advantage."
  },
  {
    phase: "PHASE III",
    title: "Dominion",
    desc: "Execution is silent. Results are deafening. We secure the high ground before the competition is aware the terrain has shifted."
  }
];

const Protocol: React.FC = () => {
  return (
    <section className="py-32 md:py-48 px-6 bg-transparent relative border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <Reveal>
            <div className="flex items-center gap-4 mb-24">
                <div className="h-[1px] w-12 bg-white"></div>
                <h2 className="text-sm font-mono tracking-[0.3em] uppercase text-white">The Protocol</h2>
            </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24 relative">
          {/* Animated Connecting Line */}
          <div className="absolute top-12 left-0 w-full h-[1px] bg-white/5 hidden lg:block overflow-hidden">
             <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_3s_infinite] translate-x-[-100%]"></div>
          </div>

          {steps.map((step, index) => (
            <Reveal key={index} delay={index * 0.2} animation="fade-up">
              <div className="relative pt-12 group">
                {/* Node Point */}
                <div className="absolute top-0 left-0 lg:left-0 -mt-1.5 w-3 h-3 bg-black border border-white z-10 transition-all duration-500 group-hover:bg-white"></div>
                
                {/* Vertical decorative line for mobile */}
                <div className="absolute top-0 left-1.5 w-[1px] h-full bg-white/10 lg:hidden"></div>

                <h3 className="text-xs font-mono text-white/50 mb-4 tracking-widest group-hover:text-emerald-500 transition-colors duration-300">{step.phase}</h3>
                <h4 className="text-3xl font-serif text-white mb-6 group-hover:translate-x-2 transition-transform duration-500">{step.title}</h4>
                <p className="text-sm text-neutral-500 font-light leading-relaxed max-w-xs transition-colors duration-500">
                  {/* Using RedactedText for effect */}
                  {step.desc.split(" ").map((word, i) => (
                    <React.Fragment key={i}>
                        {i % 4 === 0 ? (
                           <RedactedText text={word} />
                        ) : (
                           <span className="group-hover:text-white/70 transition-colors duration-500">{word}</span>
                        )}
                        {' '}
                    </React.Fragment>
                  ))}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};

export default Protocol;