'use client';

import React from 'react';

interface HeroCanvasProps {
  className?: string;
}

// ===========================================
// CSS 3D CUBE - ULTRA LIGHTWEIGHT FOR MOBILE
// ===========================================
function CSSCube() {
  return (
    <div className="css-cube-container">
      <div className="css-cube-wrapper">
        <div className="css-cube">
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
          perspective: 500px;
          -webkit-perspective: 500px;
        }

        .css-cube-wrapper {
          width: 100px;
          height: 100px;
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d;
          transform: rotateX(-20deg) rotateZ(45deg);
        }

        .css-cube {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d;
          animation: css-cube-rotate 25s linear infinite;
        }

        @keyframes css-cube-rotate {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }

        .css-cube-face {
          position: absolute;
          width: 100px;
          height: 100px;
          background: rgba(56, 189, 248, 0.5);
          border: 1px solid rgba(186, 230, 253, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .css-cube-logo {
          width: 55%;
          height: 55%;
          object-fit: contain;
        }

        .front  { transform: translateZ(50px); }
        .back   { transform: rotateY(180deg) translateZ(50px); }
        .right  { transform: rotateY(90deg) translateZ(50px); }
        .left   { transform: rotateY(-90deg) translateZ(50px); }
        .top    { transform: rotateX(90deg) translateZ(50px); }
        .bottom { transform: rotateX(-90deg) translateZ(50px); }

        /* DESKTOP - Full effects */
        @media (min-width: 1024px) {
          .css-cube-container {
            perspective: 1000px !important;
            -webkit-perspective: 1000px !important;
          }
          .css-cube-wrapper {
            width: 200px !important;
            height: 200px !important;
            transform: rotateX(-35deg) rotateZ(45deg) !important;
          }
          .css-cube {
            animation-duration: 15s !important;
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
            backface-visibility: visible !important;
            -webkit-backface-visibility: visible !important;
          }
          .front  { transform: translateZ(100px) !important; }
          .back   { transform: rotateY(180deg) translateZ(100px) !important; }
          .right  { transform: rotateY(90deg) translateZ(100px) !important; }
          .left   { transform: rotateY(-90deg) translateZ(100px) !important; }
          .top    { transform: rotateX(90deg) translateZ(100px) !important; }
          .bottom { transform: rotateX(-90deg) translateZ(100px) !important; }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .css-cube {
            animation: none !important;
            transform: rotateY(45deg);
          }
        }
      `}</style>
    </div>
  );
}

export default function HeroCanvas({ className = '' }: HeroCanvasProps) {
  return (
    <div className={`relative w-full h-full min-h-[250px] ${className}`}>
      <CSSCube />
    </div>
  );
}