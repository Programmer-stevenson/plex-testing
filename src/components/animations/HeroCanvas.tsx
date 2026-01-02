'use client';

import React from 'react';
import { useIsMobile } from '@/hooks';

interface HeroCanvasProps {
  className?: string;
}

/**
 * HeroCanvas - 3D Rotating Diamond Cube
 * ULTRA OPTIMIZED for all mobile devices
 * - Pure CSS animation (no JS animation library on mobile)
 * - Zero blur effects on mobile
 * - Zero shadows on mobile
 * - Hardware accelerated transforms only
 */
export default function HeroCanvas({ className = '' }: HeroCanvasProps) {
  const isMobile = useIsMobile();
  const cubeSize = isMobile ? 90 : 160;
  const halfSize = cubeSize / 2;

  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      {/* Simple static glow - mobile / Animated glow - desktop */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div 
          className={`rounded-full bg-gradient-to-br from-[#007BFF] to-[#00C2CB] ${
            isMobile 
              ? 'w-24 h-24 opacity-30' 
              : 'w-64 h-64 opacity-30 animate-pulse-slow'
          }`}
          style={{ filter: isMobile ? 'blur(30px)' : 'blur(60px)' }}
        />
      </div>

      {/* 3D Cube Container */}
      <div 
        className={`relative ${isMobile ? 'w-36 h-36' : 'w-72 h-72'} flex items-center justify-center`}
        style={{ perspective: '800px' }}
      >
        {/* Diamond tilt wrapper */}
        <div style={{ 
          transformStyle: 'preserve-3d',
          transform: 'rotateX(-35deg) rotateZ(45deg)',
        }}>
          {/* Rotating cube - Pure CSS animation */}
          <div
            className="cube-rotate"
            style={{ 
              width: `${cubeSize}px`,
              height: `${cubeSize}px`,
              transformStyle: 'preserve-3d',
              animation: `spin ${isMobile ? 25 : 15}s linear infinite`,
            }}
          >
            {/* 6 Faces */}
            {[
              { transform: `translateZ(${halfSize}px)`, color: 'from-[#007BFF]/25 to-[#00C2CB]/15', border: 'border-[#007BFF]/50' },
              { transform: `translateZ(-${halfSize}px) rotateY(180deg)`, color: 'from-[#00C2CB]/25 to-[#007BFF]/15', border: 'border-[#007BFF]/50' },
              { transform: `rotateY(90deg) translateZ(${halfSize}px)`, color: 'from-[#00C2CB]/25 to-[#3EE4A8]/15', border: 'border-[#00C2CB]/50' },
              { transform: `rotateY(-90deg) translateZ(${halfSize}px)`, color: 'from-[#3EE4A8]/25 to-[#00C2CB]/15', border: 'border-[#00C2CB]/50' },
              { transform: `rotateX(90deg) translateZ(${halfSize}px)`, color: 'from-[#007BFF]/25 to-[#3EE4A8]/15', border: 'border-[#3EE4A8]/50' },
              { transform: `rotateX(-90deg) translateZ(${halfSize}px)`, color: 'from-[#3EE4A8]/25 to-[#007BFF]/15', border: 'border-[#3EE4A8]/50' },
            ].map((face, i) => (
              <div
                key={i}
                className={`absolute inset-0 border ${face.border} bg-gradient-to-br ${face.color} flex items-center justify-center`}
                style={{ 
                  transform: face.transform,
                  backfaceVisibility: 'hidden',
                  ...(isMobile ? {} : { 
                    boxShadow: '0 0 20px rgba(0, 123, 255, 0.2), inset 0 0 30px rgba(0, 194, 203, 0.1)',
                    backdropFilter: 'blur(4px)',
                  })
                }}
              >
                <img 
                  src="/plexxx.png" 
                  alt="" 
                  className={`${isMobile ? 'w-8 h-8' : 'w-16 h-16'} object-contain opacity-70`}
                  loading="eager"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Particles & Ring - Desktop only */}
      {!isMobile && (
        <>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-[#00C2CB] rounded-full animate-pulse"
              style={{
                top: `${35 + 30 * Math.sin((i * Math.PI * 2) / 6)}%`,
                left: `${35 + 30 * Math.cos((i * Math.PI * 2) / 6)}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
            <circle
              cx="200"
              cy="200"
              r="150"
              fill="none"
              stroke="url(#ringGrad)"
              strokeWidth="1"
              strokeDasharray="8 16"
              className="animate-spin-slow"
              style={{ transformOrigin: 'center' }}
            />
            <defs>
              <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#007BFF" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#00C2CB" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </svg>
        </>
      )}

      {/* CSS Keyframes */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
        .animate-spin-slow {
          animation: spin 40s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse 4s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}