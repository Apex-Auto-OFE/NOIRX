import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Protocol from './components/Protocol';
import Network from './components/Network';
import Services from './components/Services';
import Algorithm from './components/Algorithm';
import Dossiers from './components/Dossiers';
import Ticker from './components/Ticker';
import Concierge from './components/Concierge';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import SystemStatus from './components/SystemStatus';
import ScrollGauge from './components/ScrollGauge';
import Reveal from './components/Reveal';
import ParticleField from './components/ParticleField';
import TerminalModal from './components/TerminalModal';
import Magnetic from './components/Magnetic';
import { Section } from './types';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.HERO);
  const [loading, setLoading] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const scrollToSection = (section: Section) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <CustomCursor />
      <TerminalModal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      {!loading && (
        <div className="bg-black min-h-screen text-white font-sans selection:bg-white selection:text-black overflow-x-hidden animate-fade-in relative">
          {/* Global Background Layer */}
          <ParticleField />
          
          <SystemStatus />
          <ScrollGauge />
          <Navigation activeSection={activeSection} scrollTo={scrollToSection} />
          
          <main className="relative z-10">
            <div id={Section.HERO}>
              <Hero />
            </div>

            <Ticker />
            
            <div id={Section.PHILOSOPHY}>
              <Philosophy />
            </div>

            <div id={Section.PROTOCOL}>
              <Protocol />
            </div>

            <div id={Section.NETWORK}>
              <Network />
            </div>
            
            <div id={Section.SERVICES}>
              <Services />
            </div>

            <div id={Section.ALGORITHM}>
              <Algorithm />
            </div>

            <div id={Section.DOSSIERS}>
              <Dossiers />
            </div>
            
            <div id={Section.CONCIERGE}>
              <Concierge />
            </div>

            <div id={Section.CONTACT}>
              <section className="py-48 px-6 bg-transparent text-white text-center relative border-t border-white/5 backdrop-blur-sm">
                 {/* Minimalist Grid Background */}
                 <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none"></div>

                <Reveal>
                  <h2 className="text-4xl md:text-7xl font-serif mb-8 tracking-tighter text-white">Initiate Contact</h2>
                  <p className="text-neutral-500 mb-16 max-w-lg mx-auto font-light leading-loose text-sm">
                    We accept clients by referral only. <br/>
                    If you wish to submit a dossier for review, use the secure channel.
                  </p>
                  
                  <Magnetic strength={50}>
                    <button 
                        onClick={() => setIsTerminalOpen(true)}
                        className="cursor-hover group relative inline-flex items-center justify-center overflow-hidden bg-white px-20 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-black transition-all duration-500 hover:bg-neutral-200"
                    >
                        <span className="relative z-10">Request Access</span>
                        <div className="absolute inset-0 bg-white/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </button>
                  </Magnetic>
                </Reveal>
              </section>
            </div>
          </main>

          <Footer />
        </div>
      )}
    </>
  );
};

export default App;