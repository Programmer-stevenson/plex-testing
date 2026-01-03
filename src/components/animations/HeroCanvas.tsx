'use client';

import React, { useRef, useEffect, useState } from 'react';

interface HeroCanvasProps {
  className?: string;
}

// MOBILE ONLY: Three.js cube (GPU accelerated)
function MobileCube() {
  const containerRef = useRef<HTMLDivElement>(null);
  const destroyRef = useRef<(() => void) | null>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    import('./cubeRenderer').then(({ initCube }) => {
      if (containerRef.current && !destroyRef.current) {
        destroyRef.current = initCube(containerRef.current, '/plexxx.png');
      }
    });
    
    return () => {
      if (destroyRef.current) {
        destroyRef.current();
        destroyRef.current = null;
      }
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="w-full h-full min-h-[250px] flex items-center justify-center"
    />
  );
}

// DESKTOP ONLY: CSS 3D Cube (your original)
function DesktopCube() {
  return (
    <>
      <style>{`
        .cube-container {
          width: 100%;
          height: 100%;
          min-height: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1000px;
        }
        .cube-wrapper {
          width: 200px;
          height: 200px;
          transform-style: preserve-3d;
          transform: rotateX(-35deg) rotateZ(45deg);
        }
        .cube {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: cube-rotate 20s linear infinite;
        }
        @keyframes cube-rotate {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
        .cube-face {
          position: absolute;
          width: 200px;
          height: 200px;
          background: 
            radial-gradient(circle at 15% 15%, rgba(234, 88, 12, 0.5) 0%, transparent 35%),
            radial-gradient(circle at 85% 80%, rgba(194, 65, 12, 0.4) 0%, transparent 30%),
            radial-gradient(circle at 50% 90%, rgba(251, 146, 60, 0.35) 0%, transparent 40%),
            linear-gradient(135deg, rgba(251, 146, 60, 0.4) 0%, rgba(14, 165, 233, 0.7) 35%, rgba(56, 189, 248, 0.85) 65%, rgba(186, 230, 253, 0.9) 100%);
          border: 3px solid rgba(56, 189, 248, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          backface-visibility: visible;
        }
        .cube-logo {
          width: 60%;
          height: 60%;
          object-fit: contain;
        }
        .cube-front  { transform: translateZ(100px); }
        .cube-back   { transform: rotateY(180deg) translateZ(100px); }
        .cube-right  { transform: rotateY(90deg) translateZ(100px); }
        .cube-left   { transform: rotateY(-90deg) translateZ(100px); }
        .cube-top    { transform: rotateX(90deg) translateZ(100px); }
        .cube-bottom { transform: rotateX(-90deg) translateZ(100px); }
        @media (prefers-reduced-motion: reduce) {
          .cube { animation: none; transform: rotateY(45deg); }
        }
      `}</style>
      
      <div className="cube-container">
        <div className="cube-wrapper">
          <div className="cube">
            <div className="cube-face cube-front">
              <img src="/plexxx.png" alt="" className="cube-logo" />
            </div>
            <div className="cube-face cube-back">
              <img src="/plexxx.png" alt="" className="cube-logo" />
            </div>
            <div className="cube-face cube-right">
              <img src="/plexxx.png" alt="" className="cube-logo" />
            </div>
            <div className="cube-face cube-left">
              <img src="/plexxx.png" alt="" className="cube-logo" />
            </div>
            <div className="cube-face cube-top">
              <img src="/plexxx.png" alt="" className="cube-logo" />
            </div>
            <div className="cube-face cube-bottom">
              <img src="/plexxx.png" alt="" className="cube-logo" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function HeroCanvas({ className = '' }: HeroCanvasProps) {
  const [deviceType, setDeviceType] = useState<'mobile' | 'desktop' | null>(null);

  useEffect(() => {
    // Check ONCE on mount
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth < 1024;
    
    if (isSmallScreen || isTouchDevice) {
      setDeviceType('mobile');
    } else {
      setDeviceType('desktop');
    }
    // NO resize listener - we pick one and stick with it
  }, []);

  // Show nothing until we know which device
  if (deviceType === null) {
    return <div className={`relative w-full h-full min-h-[250px] ${className}`} />;
  }

  return (
    <div className={`relative w-full h-full min-h-[250px] ${className}`}>
      {deviceType === 'mobile' && <MobileCube />}
      {deviceType === 'desktop' && <DesktopCube />}
    </div>
  );
}