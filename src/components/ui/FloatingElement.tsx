'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { BaseComponentProps } from '@/types';

interface FloatingElementProps extends BaseComponentProps {
  offset?: number;
}

export default function FloatingElement({ 
  children, 
  offset = 50, 
  className = "" 
}: FloatingElementProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
