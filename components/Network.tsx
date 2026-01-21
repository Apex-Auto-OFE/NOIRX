import React, { useEffect, useState, useRef } from 'react';
import Reveal from './Reveal';

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
  const [logs, setLogs] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Logger interval - separate from animation loop
    const logInterval = setInterval(() => {
        setLogs(prev => {
            const newLog = logEvents[Math.floor(Math.random() * logEvents.length)];
            const updated = [...prev, `> ${newLog}`];
            if (updated.length > 6) updated.shift();
            return updated;
        });
    }, 1500);

    return () => clearInterval(logInterval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    // Define Nodes
    const nodes = [
      { id: 1, x: width * 0.20, y: height * 0.30, baseX: width * 0.20, baseY: height * 0.30, name: "NY_HQ", phase: 0 },
      { id: 2, x: width * 0.25, y: height * 0.35, baseX: width * 0.25, baseY: height * 0.35, name: "DC_OP", phase: 1 },
      { id: 3, x: width * 0.48, y: height * 0.25, baseX: width * 0.48, baseY: height * 0.25, name: "LON_EX", phase: 2 },
      { id: 4, x: width * 0.52, y: height * 0.28, baseX: width * 0.52, baseY: height * 0.28, name: "ZRH_VLT", phase: 3 },
      { id: 5, x: width * 0.55, y: height * 0.40, baseX: width * 0.55, baseY: height * 0.40, name: "DBX_HUB", phase: 4 },
      { id: 6, x: width * 0.80, y: height * 0.35, baseX: width * 0.80, baseY: height * 0.35, name: "TKY_NOD", phase: 5 },
      { id: 7, x: width * 0.82, y: height * 0.45, baseX: width * 0.82, baseY: height * 0.45, name: "SIN_GW", phase: 6 },
      { id: 8, x: width * 0.85, y: height * 0.70, baseX: width * 0.85, baseY: height * 0.70, name: "SYD_LNK", phase: 0.5 },
      { id: 9, x: width * 0.30, y: height * 0.60, baseX: width * 0.30, baseY: height * 0.60, name: "SAO_RES", phase: 1.5 },
    ];

    let time = 0;
    let animationFrameId: number;

    const animate = () => {
        time += 0.02;
        ctx.clearRect(0, 0, width, height);
        
        // Update positions
        nodes.forEach(node => {
            node.x = node.baseX + Math.sin(time + node.phase) * 15;
            node.y = node.baseY + Math.cos(time * 0.8 + node.phase) * 15;
        });

        // Draw connections
        ctx.lineWidth = 0.5;
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                // Connect if close enough
                if (dist < width * 0.25) {
                    const opacity = 1 - (dist / (width * 0.25));
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }

        // Draw Nodes
        nodes.forEach((node, i) => {
             // Glow
             const pulse = (Math.sin(time * 2 + i) + 1) / 2; // 0 to 1
             ctx.fillStyle = `rgba(255, 255, 255, ${0.1 + pulse * 0.2})`;
             ctx.beginPath();
             ctx.arc(node.x, node.y, 10 + pulse * 5, 0, Math.PI * 2);
             ctx.fill();

             // Core
             ctx.fillStyle = '#FFFFFF';
             ctx.beginPath();
             ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
             ctx.fill();

             // Label
             ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
             ctx.font = '9px monospace';
             ctx.fillText(node.name, node.x + 10, node.y - 10);
        });

        animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
        // Recalculate base positions roughly based on ratio
        nodes.forEach((node, i) => {
             // Reset to initial relative positions if needed, or just let them drift
        });
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
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
            
            {/* Canvas Container */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

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