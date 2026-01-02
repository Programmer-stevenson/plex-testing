'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#007BFF] via-[#00C2CB] to-[#3EE4A8] origin-left z-[100]"
      style={{ scaleX: smoothProgress }}
    />
  );
}
