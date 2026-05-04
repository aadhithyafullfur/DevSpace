import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

export const Background = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 25 : 55;
    const maxDistance = 140;
    const mouseDistance = 150;

    const mouse = { x: -1000, y: -1000 };

    // ✅ Particle class with safe width/height access
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = 2;
      }

      update(width: number, height: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseDistance) {
          const pull = 0.002;
          this.x += dx * pull;
          this.y += dy * pull;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle =
          theme === "dark"
            ? "rgba(255,255,255,0.5)"
            : "rgba(0,0,0,0.5)";
        ctx.fill();
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // ✅ reinitialize particles AFTER size update
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      ctx.fillStyle = theme === "dark" ? "#050505" : "#f8fafc";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.update(canvas.width, canvas.height);
        p.draw(ctx);

        // connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const opacity = 1 - dist / maxDistance;

            ctx.beginPath();
            ctx.strokeStyle =
              theme === "dark"
                ? `rgba(255,255,255,${opacity * 0.1})`
                : `rgba(0,0,0,${opacity * 0.1})`;

            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // mouse interaction
        const dxm = p.x - mouse.x;
        const dym = p.y - mouse.y;
        const distMouse = Math.sqrt(dxm * dxm + dym * dym);

        if (distMouse < mouseDistance) {
          const opacity = 1 - distMouse / mouseDistance;

          ctx.beginPath();
          ctx.strokeStyle =
            theme === "dark"
              ? `rgba(255,255,255,${opacity * 0.2})`
              : `rgba(0,0,0,${opacity * 0.2})`;

          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div className="fixed inset-0 z-[-10] pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};