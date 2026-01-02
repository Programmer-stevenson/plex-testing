'use client';

import { motion } from 'framer-motion';

export default function Background() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="hidden md:block absolute top-0 left-0 w-full h-full opacity-20">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#007BFF] rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#00C2CB] rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-[#3EE4A8] rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="md:hidden absolute top-0 left-0 w-full h-full opacity-15">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-[#007BFF] rounded-full blur-2xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-[#00C2CB] rounded-full blur-2xl animate-pulse-slow delay-1000"></div>
      </div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="h-full w-full" style={{
          backgroundImage: 'linear-gradient(#007BFF 1px, transparent 1px), linear-gradient(90deg, #00C2CB 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}></div>
      </div>
    </div>
  );
}
