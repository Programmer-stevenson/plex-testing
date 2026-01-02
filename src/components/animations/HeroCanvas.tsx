'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks';

interface HeroCanvasProps {
  className?: string;
}

/**
 * HeroCanvas - 3D Rotating Diamond Cube
 * Self-contained using CSS 3D transforms + Framer Motion
 * Mobile optimized with reduced size and fewer particles
 */
export default function HeroCanvas({ className = '' }: HeroCanvasProps) {
  const isMobile = useIsMobile();
  const cubeSize = isMobile ? 120 : 160;
  const halfSize = cubeSize / 2;
  
  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      {/* Ambient glow behind cube */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className={`${isMobile ? 'w-40 h-40 blur-[80px]' : 'w-64 h-64 blur-[100px]'} bg-gradient-to-br from-[#007BFF] to-[#00C2CB] rounded-full opacity-30`}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* 3D Rotating Diamond Cube */}
      <div 
        className={`relative ${isMobile ? 'w-48 h-48' : 'w-72 h-72'} flex items-center justify-center`}
        style={{ 
          perspective: '1000px',
          perspectiveOrigin: 'center center'
        }}
      >
        {/* Diamond orientation wrapper */}
        <div
          style={{ 
            transformStyle: 'preserve-3d',
            transform: 'rotateX(-35deg) rotateZ(45deg)',
          }}
        >
          {/* Rotating cube */}
          <motion.div
            className="relative"
            style={{ 
              width: `${cubeSize}px`,
              height: `${cubeSize}px`,
              transformStyle: 'preserve-3d',
            }}
            animate={{ rotateY: [0, 360] }}
            transition={{ 
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {/* Front face */}
            <div 
              className="absolute inset-0 border border-[#007BFF]/60 bg-gradient-to-br from-[#007BFF]/20 to-[#00C2CB]/10 backdrop-blur-sm flex items-center justify-center"
              style={{ 
                transform: `translateZ(${halfSize}px)`,
                boxShadow: '0 0 30px rgba(0, 123, 255, 0.3), inset 0 0 40px rgba(0, 194, 203, 0.15)'
              }}
            >
              <img src="/plexxx.png" alt="Plexura" className={`${isMobile ? 'w-12 h-12' : 'w-20 h-20'} object-contain opacity-80`} />
            </div>
            
            {/* Back face */}
            <div 
              className="absolute inset-0 border border-[#007BFF]/60 bg-gradient-to-br from-[#00C2CB]/20 to-[#007BFF]/10 backdrop-blur-sm flex items-center justify-center"
              style={{ 
                transform: `translateZ(-${halfSize}px) rotateY(180deg)`,
                boxShadow: '0 0 30px rgba(0, 123, 255, 0.3), inset 0 0 40px rgba(0, 194, 203, 0.15)'
              }}
            >
              <img src="/plexxx.png" alt="Plexura" className={`${isMobile ? 'w-12 h-12' : 'w-20 h-20'} object-contain opacity-80`} />
            </div>
            
            {/* Right face */}
            <div 
              className="absolute inset-0 border border-[#00C2CB]/60 bg-gradient-to-br from-[#00C2CB]/20 to-[#3EE4A8]/10 backdrop-blur-sm flex items-center justify-center"
              style={{ 
                transform: `rotateY(90deg) translateZ(${halfSize}px)`,
                boxShadow: '0 0 30px rgba(0, 194, 203, 0.3), inset 0 0 40px rgba(62, 228, 168, 0.15)'
              }}
            >
              <img src="/plexxx.png" alt="Plexura" className={`${isMobile ? 'w-12 h-12' : 'w-20 h-20'} object-contain opacity-80`} />
            </div>
            
            {/* Left face */}
            <div 
              className="absolute inset-0 border border-[#00C2CB]/60 bg-gradient-to-br from-[#3EE4A8]/20 to-[#00C2CB]/10 backdrop-blur-sm flex items-center justify-center"
              style={{ 
                transform: `rotateY(-90deg) translateZ(${halfSize}px)`,
                boxShadow: '0 0 30px rgba(0, 194, 203, 0.3), inset 0 0 40px rgba(62, 228, 168, 0.15)'
              }}
            >
              <img src="/plexxx.png" alt="Plexura" className={`${isMobile ? 'w-12 h-12' : 'w-20 h-20'} object-contain opacity-80`} />
            </div>
            
            {/* Top face */}
            <div 
              className="absolute inset-0 border border-[#3EE4A8]/60 bg-gradient-to-br from-[#007BFF]/20 to-[#3EE4A8]/10 backdrop-blur-sm flex items-center justify-center"
              style={{ 
                transform: `rotateX(90deg) translateZ(${halfSize}px)`,
                boxShadow: '0 0 30px rgba(62, 228, 168, 0.3), inset 0 0 40px rgba(0, 123, 255, 0.15)'
              }}
            >
              <img src="/plexxx.png" alt="Plexura" className={`${isMobile ? 'w-12 h-12' : 'w-20 h-20'} object-contain opacity-80`} />
            </div>
            
            {/* Bottom face */}
            <div 
              className="absolute inset-0 border border-[#3EE4A8]/60 bg-gradient-to-br from-[#3EE4A8]/20 to-[#007BFF]/10 backdrop-blur-sm flex items-center justify-center"
              style={{ 
                transform: `rotateX(-90deg) translateZ(${halfSize}px)`,
                boxShadow: '0 0 30px rgba(62, 228, 168, 0.3), inset 0 0 40px rgba(0, 123, 255, 0.15)'
              }}
            >
              <img src="/plexxx.png" alt="Plexura" className={`${isMobile ? 'w-12 h-12' : 'w-20 h-20'} object-contain opacity-80`} />
            </div>

            {/* Inner glow core */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.div
                className={`${isMobile ? 'w-6 h-6' : 'w-12 h-12'} bg-gradient-to-br from-[#007BFF] to-[#00C2CB] rounded-full blur-2xl opacity-60`}
                animate={{ 
                  scale: [1, 1.4, 1],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating particles - fewer on mobile */}
      {[...Array(isMobile ? 4 : 8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-[#00C2CB] rounded-full"
          style={{
            top: `${30 + 40 * Math.sin((i * Math.PI * 2) / (isMobile ? 4 : 8))}%`,
            left: `${30 + 40 * Math.cos((i * Math.PI * 2) / (isMobile ? 4 : 8))}%`,
          }}
          animate={{
            scale: [0.5, 1, 0.5],
            opacity: [0.3, 0.8, 0.3],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 3 + i * 0.5,
            delay: i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Orbital ring - desktop only */}
      {!isMobile && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
          <defs>
            <linearGradient id="edgeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#007BFF" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#00C2CB" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3EE4A8" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <motion.circle
            cx="200"
            cy="200"
            r="160"
            fill="none"
            stroke="url(#edgeGlow)"
            strokeWidth="1"
            strokeDasharray="10 20"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: 'center' }}
          />
        </svg>
      )}
    </div>
  );
}
