'use client';

import { motion } from 'framer-motion';
import { Code, Layers, Shield, TrendingUp } from 'lucide-react';
import { AnimatedSection, AnimatedCounter, GlowCard } from '@/components/ui';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const stats = [
  { value: 20, suffix: "+", label: "Web Apps Deployed", icon: Code },
  { value: 100, suffix: "%", label: "Custom Code", icon: Layers },
  { value: 99, suffix: "%", label: "Uptime Guarantee", icon: Shield },
  { value: 3, suffix: "x", label: "Avg. ROI Increase", icon: TrendingUp },
];

export default function StatsSection() {
  return (
    <AnimatedSection className="relative py-20 px-6 bg-gradient-to-b from-transparent via-[#142D4C]/20 to-transparent">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="relative group"
            >
              <GlowCard className="p-8 bg-[#142D4C]/30 backdrop-blur-sm rounded-2xl border border-[#007BFF]/20 text-center">
                <motion.div
                  className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-[#007BFF]/20 to-[#00C2CB]/20 rounded-xl flex items-center justify-center"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <stat.icon size={24} className="text-[#00C2CB]" />
                </motion.div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#007BFF] to-[#00C2CB] bg-clip-text text-transparent mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-[#A0A7B0]">{stat.label}</div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
