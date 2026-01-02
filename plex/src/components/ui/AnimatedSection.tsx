'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { AnimatedSectionProps } from '@/types';

export default function AnimatedSection({ 
  children, 
  className = "", 
  id,
  delay = 0 
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
