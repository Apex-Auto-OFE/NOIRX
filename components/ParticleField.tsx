import React, { useRef, useEffect } from 'react';

const ParticleField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = Math.floor((width * height) / 9000); 
    const connectionDistance = 140;
    const mouseDistance = 300;

    let mouse = { x: -1000, y: -1000 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5; 
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2.0 + 0.5; 
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseDistance) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouseDistance - distance) / mouseDistance;
            
            const directionX = forceDirectionX * force * 3; 
            const directionY = forceDirectionY * force * 3;
            
            this.vx -= directionX * 0.05;
            this.vy -= directionY * 0.05;
        }
        
        this.vx *= 0.99;
        this.vy *= 0.99;
        
        if (Math.abs(this.vx) < 0.2) this.vx += (Math.random() - 0.5) * 0.05;
        if (Math.abs(this.vy) < 0.2) this.vy += (Math.random() - 0.5) * 0.05;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      ctx.lineWidth = 0.5;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = 1 - (distance / connectionDistance);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        init();
    };

    const handleMouseMove = (e: MouseEvent) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Updated z-index to 30 to ensure it overlays background images (like in Hero) while staying below interactive elements if needed.
  // pointer-events-none ensures it doesn't block clicks.
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[30] mix-blend-screen opacity-80" />;
};

export default ParticleField;