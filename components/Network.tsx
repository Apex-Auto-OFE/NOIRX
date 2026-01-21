import React, { useEffect, useState, useRef } from 'react';
import Reveal from './Reveal';

// Base coordinates
const initialNodes = [
  { id: 1, x: 20, y: 30, name: "NY_HQ" },
  { id: 2, x: 25, y: 35, name: "DC_OP" },
  { id: 3, x: 48, y: 25, name: "LON_EX" },
  { id: 4, x: 52, y: 28, name: "ZRH_VLT" },
  { id: 5, x: 55, y: 40, name: "DBX_HUB" },
  { id: 6, x: 80, y: 35, name: "TKY_NOD" },
  { id: 7, x: 82, y: 45, name: "SIN_GW" },
  { id: 8, x: 85, y: 70, name: "SYD_LNK" },
  { id: 9, x: 30, y: 60, name: "SAO_RES" },
];

const logEvents = [
    "UPLINK ESTABLISHED: NY_HQ",
    "PACKET INTERCEPTED [LAT: 45.2, LON: 12.1]",
    "ENCRYPTION KEY ROTATED",
    "ASSET MOVEMENT DETECTED: SWISS_ALPS",
    "SECURE CHANNEL OPENED: TKY_NOD",
    "FIREWALL: INTRUSION BLOCKED",
    "SYNCING DATABASE...",
    "PING: 14ms",
    "SATELLITE HANDSHAKE COMPLETE"
];

const Network: React.FC = () => {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  // Use state for animated positions
  const [currentNodes, setCurrentNodes] = useState(initialNodes.map(n => ({ ...n, ox: 0, oy: 0 })));
  
  useEffect(() => {
    // Animation loop for drifting nodes
    let frameId: number;
    let time = 0;

    const animate = () => {
        time += 0.005;
        setCurrentNodes(prevNodes => prevNodes.map((node, i) => ({
            ...node,
            // Create organic drift using sine waves with different phases
            ox: Math.sin(time + i * 1.5) * 2, 
            oy: Math.cos(time + i * 2.1) * 2 
        })));
        frameId = requestAnimationFrame(animate);
    };
    
    frameId = requestAnimationFrame(animate);

    // Node pulse interval
    const pulseInterval = setInterval(() => {
      setActiveNode(Math.floor(Math.random() * initialNodes.length));
    }, 2000);

    // Logger interval
    const logInterval = setInterval(() => {
        setLogs(prev => {
            const newLog = logEvents[Math.floor(Math.random() * logEvents.length)];
            const updated = [...prev, `> ${newLog}`];
            if (updated.length > 6) updated.shift();
            return updated;
        });
    }, 1500);

    return () => {
        cancelAnimationFrame(frameId);
        clearInterval(pulseInterval);
        clearInterval(logInterval);
    };
  }, []);

  return (
    <section className="py-48 bg-transparent relative border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-start mb-24">
            <div>
              <h2 className="text-4xl md:text-7xl font-serif text-white tracking-tighter mb-4">The Network</h2>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <p className="text-[10px] uppercase tracking-widest text-emerald-500/80 font-mono">Live Grid Status: Active</p>
              </div>
            </div>
            
            {/* Live Log Widget */}
            <div className="mt-8 md:mt-0 w-full md:w-64 border-l border-white/10 pl-6 h-32 overflow-hidden flex flex-col justify-end">
                {logs.map((log, i) => (
                    <p key={i} className="text-[9px] font-mono text-emerald-500/60 leading-tight mb-1 animate-fade-in truncate">
                        {log}
                    </p>
                ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="relative w-full aspect-[16/9] md:aspect-[2/1] bg-[#050505]/40 backdrop-blur-sm border border-white/10 mt-12 overflow-hidden group">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            
            {/* Dynamic Map Container */}
            <div className="absolute inset-0 w-full h-full">
                
                {/* SVG Layer for Connections */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                    {currentNodes.map((startNode, i) => 
                        currentNodes.map((endNode, j) => {
                            if (i >= j) return null; // Avoid duplicates
                            // Calculate distance approx (using % coordinates)
                            const dist = Math.sqrt(Math.pow(startNode.x - endNode.x, 2) + Math.pow(startNode.y - endNode.y, 2));
                            if (dist > 30) return null; // Only connect neighbors

                            return (
                                <line 
                                    key={`${i}-${j}`}
                                    x1={`${startNode.x + startNode.ox}%`} 
                                    y1={`${startNode.y + startNode.oy}%`}
                                    x2={`${endNode.x + endNode.ox}%`}
                                    y2={`${endNode.y + endNode.oy}%`}
                                    stroke="white"
                                    strokeWidth="0.5"
                                    strokeOpacity={1 - (dist / 30)}
                                />
                            );
                        })
                    )}
                </svg>

                {/* Nodes */}
                {currentNodes.map((node, i) => (
                    <div 
                        key={i}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-linear will-change-transform"
                        style={{ 
                            left: `${node.x + node.ox}%`, 
                            top: `${node.y + node.oy}%` 
                        }}
                    >
                        <div className="relative group cursor-hover">
                            {/* Pulse Ring */}
                            <div className={`absolute -inset-4 border border-white/20 rounded-full transition-all duration-1000 ${activeNode === i ? 'scale-150 opacity-0' : 'scale-0 opacity-100'}`}></div>
                            
                            {/* Center Dot */}
                            <div className="w-2 h-2 bg-white rounded-full relative z-10 shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                            
                            {/* Rotating Ring Decor */}
                            <div className="absolute -inset-2 border-t border-r border-white/30 rounded-full w-6 h-6 animate-spin duration-[3s] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            {/* Label */}
                            <div className="absolute top-4 left-4 bg-black border border-white/20 px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-20">
                                <span className="text-[9px] font-mono text-white tracking-widest">{node.name}</span>
                                <div className="text-[7px] text-emerald-500 font-mono mt-1">LAT: {node.x.toFixed(2)} / LON: {node.y.toFixed(2)}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Radar Sweep Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent w-[20%] -skew-x-12 animate-[pulse_4s_linear_infinite] translate-x-[-100%] group-hover:animate-none pointer-events-none"></div>
        </Reveal>
        
        {/* Network Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8 border-t border-white/5 pt-8">
            {[
                { label: "Latency", value: "< 0.4ms" },
                { label: "Encryption", value: "Quantum-Res" },
                { label: "Uptime", value: "99.999%" },
                { label: "Nodes", value: "42 Active" },
            ].map((stat, i) => (
                <Reveal key={i} delay={0.4 + (i * 0.1)}>
                    <div>
                        <p className="text-[9px] uppercase tracking-widest text-white/30 mb-1">{stat.label}</p>
                        <p className="text-lg font-mono text-white">{stat.value}</p>
                    </div>
                </Reveal>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Network;