import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../hook/ThemeContext';

const MatrixBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { colors } = useTheme();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const setCanvasSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      setDimensions({ width, height });
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    const matrixChars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";
    const matrixArray = matrixChars.split("");
    const fontSize = window.innerWidth < 768 ? 12 : 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = [];
    const colors_array = [];
    const speeds = [];
    const chars = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * canvas.height;
      colors_array[x] = Math.random();
      speeds[x] = Math.random() * 0.5 + 0.5;
      chars[x] = matrixArray[Math.floor(Math.random() * matrixArray.length)];
    }


    const draw = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, `${colors.background}f8`);
      gradient.addColorStop(1, `${colors.background}f0`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px 'Courier New', monospace`;
      ctx.textAlign = 'center';

      for (let i = 0; i < drops.length; i++) {
        const mouseDistance = Math.sqrt(
          Math.pow(mouseRef.current.x - i * fontSize, 2) + 
          Math.pow(mouseRef.current.y - drops[i] * fontSize, 2)
        );
        
        const mouseEffect = Math.max(0, 1 - mouseDistance / 200);
        const baseOpacity = 0.3 + mouseEffect * 0.7;
        
        const colorVariation = colors_array[i];
        let fillColor;
        
        if (colorVariation < 0.3) {
          fillColor = colors.primary;
        } else if (colorVariation < 0.6) {
          fillColor = '#00ff41';
        } else if (colorVariation < 0.8) {
          fillColor = '#00ffff';
        } else {
          fillColor = '#ffffff';
        }
        
        const alpha = Math.floor(baseOpacity * 255).toString(16).padStart(2, '0');
        ctx.fillStyle = fillColor + alpha;
        
        if (mouseEffect > 0.5) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = fillColor;
        } else {
          ctx.shadowBlur = 0;
        }
        

        const x = i * fontSize + fontSize / 2;
        const y = drops[i] * fontSize;
        ctx.fillText(chars[i], x, y);
        

        if (drops[i] * fontSize > fontSize) {
          const trailAlpha = Math.floor(baseOpacity * 128).toString(16).padStart(2, '0');
          ctx.fillStyle = fillColor + trailAlpha;
          ctx.fillText(chars[i], x, y - fontSize);
        }
        
        if (Math.random() > 0.98) {
          chars[i] = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        }
        
        if (Math.random() > 0.99) {
          colors_array[i] = Math.random();
        }

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
          speeds[i] = Math.random() * 0.5 + 0.5;
        }
        
        drops[i] += speeds[i];
      }

      drawFloatingParticles(ctx, canvas);

      animationRef.current = requestAnimationFrame(draw);
    };

    const drawFloatingParticles = (ctx, canvas) => {
      const time = Date.now() * 0.001;
      
      for (let i = 0; i < 20; i++) {
        const x = (Math.sin(time + i * 0.5) * 0.5 + 0.5) * canvas.width;
        const y = (Math.cos(time + i * 0.3) * 0.5 + 0.5) * canvas.height;
        
        const alpha = Math.floor((Math.sin(time + i) * 0.5 + 0.5) * 100).toString(16).padStart(2, '0');
        ctx.fillStyle = colors.primary + alpha;
        
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, 2 * Math.PI);
        ctx.fill();
      }
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [colors]);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          pointerEvents: 'none',
          opacity: 0.6
        }}
      />
      
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `linear-gradient(45deg, ${colors.background}10, transparent, ${colors.background}20)`,
          zIndex: -1,
          pointerEvents: 'none'
        }}
      />
    </>
  );
};

export default MatrixBackground; 
