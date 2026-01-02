'use client';

import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import type { BaseComponentProps } from '@/types';

export default function GlowCard({ children, className = "" }: BaseComponentProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const background = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(0, 194, 203, 0.1), transparent 80%)`;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className={`relative group ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background }}
      />
      {children}
    </motion.div>
  );
}
