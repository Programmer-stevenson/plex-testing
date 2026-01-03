'use client';

import React from 'react';

interface HeroCanvasProps {
  className?: string;
}

// ===========================================
// CSS 3D CUBE COMPONENT - MOBILE & DESKTOP
// Pure CSS transforms, no WebGL, 60fps guaranteed
// ===========================================
function CSSCube() {
  return (
    <div className="css-cube-container">
      <div className="css-cube-wrapper">
        <div className="css-cube">
          {/* 6 faces with logo */}
          <div className="css-cube-face front">
            <img src="/plexxx.png" alt="" className="css-cube-logo" />
          </div>
          <div className="css-cube-face back">
            <img src="/plexxx.png" alt="" className="css-cube-logo" />
          </div>
          <div className="css-cube-face right">
            <img src="/plexxx.png" alt="" className="css-cube-logo" />
          </div>
          <div className="css-cube-face left">
            <img src="/plexxx.png" alt="" className="css-cube-logo" />
          </div>
          <div className="css-cube-face top">
            <img src="/plexxx.png" alt="" className="css-cube-logo" />
          </div>
          <div className="css-cube-face bottom">
            <img src="/plexxx.png" alt="" className="css-cube-logo" />
          </div>
        </div>
      </div>

      <style jsx>{`
        .css-cube-container {
          width: 100%;
          height: 100%;
          min-height: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1000px;
        }

        .css-cube-wrapper {
          width: 150px;
          height: 150px;
          transform-style: preserve-3d;
          transform: rotateX(-35deg) rotateZ(45deg);
        }

        @media (min-width: 1024px) {
          .css-cube-wrapper {
            width: 200px;
            height: 200px;
          }
          .css-cube-face {
            width: 200px !important;
            height: 200px !important;
            background: 
              radial-gradient(circle at 15% 15%, rgba(234, 88, 12, 0.5) 0%, transparent 35%),
              radial-gradient(circle at 85% 80%, rgba(194, 65, 12, 0.4) 0%, transparent 30%),
              radial-gradient(circle at 50% 90%, rgba(251, 146, 60, 0.35) 0%, transparent 40%),
              linear-gradient(135deg, rgba(251, 146, 60, 0.4) 0%, rgba(14, 165, 233, 0.7) 35%, rgba(56, 189, 248, 0.85) 65%, rgba(186, 230, 253, 0.9) 100%) !important;
            border: 3px solid rgba(56, 189, 248, 0.9) !important;
            box-shadow: 
              0 0 30px rgba(14, 165, 233, 0.7),
              0 0 60px rgba(56, 189, 248, 0.5),
              0 0 15px rgba(234, 88, 12, 0.4),
              inset 0 0 40px rgba(186, 230, 253, 0.5),
              inset 0 0 20px rgba(56, 189, 248, 0.4) !important;
          }
          .front  { transform: translateZ(100px) !important; }
          .back   { transform: rotateY(180deg) translateZ(100px) !important; }
          .right  { transform: rotateY(90deg) translateZ(100px) !important; }
          .left   { transform: rotateY(-90deg) translateZ(100px) !important; }
          .top    { transform: rotateX(90deg) translateZ(100px) !important; }
          .bottom { transform: rotateX(-90deg) translateZ(100px) !important; }
        }

        .css-cube {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: css-cube-rotate 20s linear infinite;
        }

        @keyframes css-cube-rotate {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }

        @media (min-width: 1024px) {
          .css-cube {
            animation-duration: 15s;
          }
        }

        .css-cube-face {
          position: absolute;
          width: 150px;
          height: 150px;
          background: linear-gradient(135deg, rgba(251, 146, 60, 0.4) 0%, rgba(14, 165, 233, 0.7) 35%, rgba(56, 189, 248, 0.85) 65%, rgba(186, 230, 253, 0.9) 100%);
          border: 2px solid rgba(56, 189, 248, 0.8);
          box-shadow: 0 0 20px rgba(14, 165, 233, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          backface-visibility: visible;
          will-change: transform;
        }

        .css-cube-logo {
          width: 60%;
          height: 60%;
          object-fit: contain;
        }

        .front  { transform: translateZ(75px); }
        .back   { transform: rotateY(180deg) translateZ(75px); }
        .right  { transform: rotateY(90deg) translateZ(75px); }
        .left   { transform: rotateY(-90deg) translateZ(75px); }
        .top    { transform: rotateX(90deg) translateZ(75px); }
        .bottom { transform: rotateX(-90deg) translateZ(75px); }

        /* Respect reduced motion preference (iOS Low Power Mode, accessibility settings) */
        @media (prefers-reduced-motion: reduce) {
          .css-cube {
            animation: none;
            transform: rotateY(45deg);
          }
        }
      `}</style>
    </div>
  );
}

// ===========================================
// MAIN COMPONENT - CSS CUBE ONLY (NO THREE.JS)
// ===========================================
export default function HeroCanvas({ className = '' }: HeroCanvasProps) {
  return (
    <div className={`relative w-full h-full min-h-[250px] ${className}`}>
      <CSSCube />
    </div>
  );
}