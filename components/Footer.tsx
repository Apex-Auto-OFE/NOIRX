import React from 'react';
import Reveal from './Reveal';

const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent text-white py-24 border-t border-white/10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="md:col-span-2">
          <Reveal>
            <h2 className="text-3xl font-serif tracking-[0.1em] mb-8">NOIR</h2>
            <p className="text-white/50 text-sm max-w-sm font-light leading-7">
              We are the architects of the invisible. 
              Providing strategic foresight for the world's most influential entities. 
              Operating in the shadows to illuminate the path forward.
            </p>
          </Reveal>
        </div>
        
        <div>
          <Reveal delay={0.2}>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8 text-white/40">Offices</h4>
            <ul className="space-y-4 text-sm text-white/70 font-light font-mono">
              <li className="hover:text-white transition-colors cursor-pointer">New York [HQ]</li>
              <li className="hover:text-white transition-colors cursor-pointer">London</li>
              <li className="hover:text-white transition-colors cursor-pointer">Tokyo</li>
              <li className="hover:text-white transition-colors cursor-pointer">Zurich</li>
            </ul>
          </Reveal>
        </div>

        <div>
          <Reveal delay={0.3}>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8 text-white/40">Legal</h4>
            <ul className="space-y-4 text-sm text-white/70 font-light font-mono">
              <li className="hover:text-white transition-colors cursor-pointer">Privacy Protocol</li>
              <li className="hover:text-white transition-colors cursor-pointer">Terms of Engagement</li>
              <li className="hover:text-white transition-colors cursor-pointer">Client Portal</li>
            </ul>
          </Reveal>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-white/30 uppercase tracking-widest">
        <p>&copy; 2026 NOIR Group. All rights reserved.</p>
        <p className="mt-4 md:mt-0 font-mono">DESIGNED BY VANGUARD</p>
      </div>
    </footer>
  );
};

export default Footer;