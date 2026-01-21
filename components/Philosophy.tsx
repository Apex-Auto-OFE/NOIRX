import React, { useRef, useState } from 'react';
import Reveal from './Reveal';

const Philosophy: React.FC = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5; // Max 5 degrees
    const rotateY = ((x - centerX) / centerX) * 5;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <section className="py-48 px-6 bg-transparent relative border-t border-white/5">
       {/* Background Grid */}
       <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-32 items-center relative z-10">
        
        <div className="space-y-20">
          <Reveal>
            <h3 className="text-white text-4xl md:text-7xl font-serif leading-[0.9] tracking-tight">
              "The loudest voice in the room is rarely the <br/> <span className="italic text-white/40 font-light">most powerful.</span>"
            </h3>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-white/10 pt-16">
            <Reveal delay={0.2}>
              <h4 className="text-white font-sans text-[10px] uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                <span className="w-2 h-[1px] bg-white/50"></span> Precision
              </h4>
              <p className="text-neutral-400 text-sm leading-8 font-light">
                We eliminate the noise. Every action is calculated. Every strategy is stripped to its most potent core to ensure maximum impact with minimal exposure.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <h4 className="text-white font-sans text-[10px] uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                <span className="w-2 h-[1px] bg-white/50"></span> Anonymity
              </h4>
              <p className="text-neutral-400 text-sm leading-8 font-light">
                Our clients' movements remain unseen until the impact is felt. We protect privacy not just as a policy, but as a strategic asset.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal animation="fade-in" delay={0.3} className="relative h-[800px] w-full border-l border-white/10 p-0 md:pl-12 perspective-[1000px]">
           <div 
             ref={imageRef}
             onMouseMove={handleMouseMove}
             onMouseLeave={handleMouseLeave}
             className="w-full h-full relative overflow-hidden transition-transform duration-100 ease-out preserve-3d cursor-hover group"
             style={{ transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)` }}
           >
             <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-transparent transition-colors duration-700"></div>
             
             <img 
               src="https://images.unsplash.com/photo-1449247709967-d4461a6a6103?q=80&w=1742&auto=format&fit=crop" 
               alt="Philosophy" 
               className="w-full h-full object-cover grayscale contrast-[1.1] brightness-[0.7] transform scale-100 group-hover:scale-105 transition-transform duration-1000"
             />
             
             {/* Gloss Sheen */}
             <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

             <div className="absolute bottom-0 right-0 bg-black p-6 border-l border-t border-white/10 z-20 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500">
                <p className="text-[9px] text-white/50 font-mono tracking-widest uppercase">
                  Fig. 01 — The Void
                </p>
             </div>
           </div>
        </Reveal>

      </div>
    </section>
  );
};

export default Philosophy;