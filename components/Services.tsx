import React, { useState, useRef } from 'react';
import Reveal from './Reveal';
import GlitchText from './GlitchText';

const services = [
  {
    id: "01",
    title: "Global Expansion",
    desc: "Navigating cross-border complexities with invisible precision and absolute legal immunity.",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "Legacy Architecture",
    desc: "Structuring multi-generational wealth and influence preservation beyond standard banking.",
    image: "https://images.unsplash.com/photo-1541535650810-10d26f5c2ab3?q=80&w=2076&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "Crisis Nullification",
    desc: "Preemptive identification and neutralization of reputational threats before they manifest.",
    image: "https://images.unsplash.com/photo-1504384308090-c54be3855085?q=80&w=2187&auto=format&fit=crop"
  },
  {
    id: "04",
    title: "Shadow Logistics",
    desc: "Secure movement of high-value assets and personnel through high-risk geopolitical zones.",
    image: "https://images.unsplash.com/photo-1494412651409-ae1c21065709?q=80&w=2070&auto=format&fit=crop"
  }
];

const ServiceCard: React.FC<{ s: any, index: number }> = ({ s, index }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div 
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="bg-black/30 backdrop-blur-sm p-10 h-[500px] flex flex-col justify-between transition-all duration-700 group relative overflow-hidden border-r border-white/5 last:border-r-0 cursor-hover"
    >
      {/* Background Image Reveal */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-1000 grayscale mix-blend-screen"
        style={{
            backgroundImage: `url(${s.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}
      ></div>

      {/* Active Border Animations */}
      <div className="absolute top-0 left-0 w-0 h-[1px] bg-white transition-all duration-700 group-hover:w-full z-20"></div>
      <div className="absolute bottom-0 right-0 w-0 h-[1px] bg-white transition-all duration-700 group-hover:w-full z-20"></div>
      <div className="absolute top-0 left-0 h-0 w-[1px] bg-white transition-all duration-700 group-hover:h-full z-20"></div>
      <div className="absolute bottom-0 right-0 h-0 w-[1px] bg-white transition-all duration-700 group-hover:h-full z-20"></div>

      {/* Spotlight Effect */}
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`
        }}
      />
      
      {/* Large Background Number */}
      <span className="absolute -right-4 -top-10 text-[180px] font-serif leading-none opacity-[0.02] group-hover:opacity-[0.08] transition-opacity duration-700 select-none z-0">
        {s.id}
      </span>

      <div className="relative z-10 flex flex-col h-full justify-between pointer-events-none">
        <span className="font-mono text-[9px] tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity duration-500 text-white border-b border-white/10 pb-4 inline-block w-full">
          SERVICE // {s.id}
        </span>
        
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
          <h3 className="text-3xl font-serif mb-8 text-white font-light">
             <span className="group-hover:hidden">{s.title}</span>
             <span className="hidden group-hover:inline-block">
                <GlitchText text={s.title} speed={20} />
             </span>
          </h3>
          <p className="text-xs font-sans font-light leading-relaxed text-neutral-500 group-hover:text-white/80 transition-colors duration-500">
            {s.desc}
          </p>
        </div>

        {/* Arrow Icon */}
        <div className="self-end opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 transform group-hover:translate-x-0 translate-x-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </div>
      </div>
    </div>
  );
}

const Services: React.FC = () => {
  return (
    <section className="py-48 bg-transparent text-white px-6 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-32 border-b border-white/10 pb-8">
            <h2 className="text-5xl md:text-8xl font-serif tracking-tighter text-white">Capabilities</h2>
            <p className="mt-8 md:mt-0 text-neutral-500 max-w-xs text-xs font-mono uppercase tracking-widest leading-relaxed text-right">
              / Beyond the open market <br/>
              <span className="text-white">Absolute Certainty</span>
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
          {services.map((s, index) => (
            <Reveal key={s.id} delay={index * 0.15} className="h-full bg-transparent">
                <ServiceCard s={s} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;