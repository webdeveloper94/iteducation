import React, { useEffect, useRef } from 'react';

const StarBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Canvas o'lchamlarini to'g'rilash
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Yulduz yaratish
    class Star {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 2;
        this.size = Math.random() * 2;
        this.speed = Math.random() * 3 + 1;
        this.opacity = Math.random();
      }

      update() {
        this.y -= this.speed;
        this.opacity += 0.01;
        
        if (this.y < 0) {
          this.reset();
          this.y = canvas.height;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Yulduzlar massivi
    const stars = Array(200).fill().map(() => new Star());

    // Animatsiya
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        star.update();
        star.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Event listener'larni qo'shish
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ background: 'linear-gradient(to bottom, #0f0f2d, #1a1a3a)' }}
    />
  );
};

export default StarBackground;
