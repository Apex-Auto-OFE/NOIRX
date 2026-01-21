import React, { useState, useEffect } from 'react';
import { Section } from '../types';
import Magnetic from './Magnetic';

interface NavigationProps {
  activeSection: Section;
  scrollTo: (section: Section) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, scrollTo }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled ? 'bg-black/80 backdrop-blur-lg border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        <Magnetic strength={50}>
            <div 
            onClick={() => scrollTo(Section.HERO)}
            className="cursor-pointer z-50 mix-blend-difference cursor-hover group"
            >
            <h1 className="text-3xl font-serif tracking-widest font-bold text-white group-hover:opacity-70 transition-opacity duration-500">
                NOIR
            </h1>
            </div>
        </Magnetic>
        
        <div className="hidden lg:flex space-x-8 items-center mix-blend-difference">
          {[Section.PHILOSOPHY, Section.PROTOCOL, Section.NETWORK, Section.SERVICES, Section.ALGORITHM, Section.DOSSIERS, Section.CONCIERGE].map((item, index) => (
            <Magnetic key={item} strength={20}>
                <button
                onClick={() => scrollTo(item)}
                style={{ transitionDelay: `${index * 50}ms` }}
                className={`text-[9px] uppercase tracking-[0.25em] transition-all duration-500 cursor-hover relative group py-2 px-2 ${
                    activeSection === item ? 'text-white font-medium' : 'text-white/50 hover:text-white'
                }`}
                >
                {item}
                <span className={`absolute bottom-0 left-1/2 w-0 h-[1px] bg-white transition-all duration-300 ease-out -translate-x-1/2 group-hover:w-full ${activeSection === item ? 'w-full' : ''}`}></span>
                </button>
            </Magnetic>
          ))}
        </div>

        <Magnetic strength={40}>
            <button 
            onClick={() => scrollTo(Section.CONTACT)}
            className={`cursor-hover border ${scrolled ? 'border-white/30 text-white' : 'border-white text-white'} px-8 py-3 text-[10px] uppercase tracking-[0.2em] transition-all duration-500 z-50 overflow-hidden relative group`}
            >
            <span className="relative z-10 group-hover:text-black transition-colors duration-500">Inquire</span>
            <div className="absolute inset-0 bg-white transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-0"></div>
            </button>
        </Magnetic>
      </div>
    </nav>
  );
};

export default Navigation;