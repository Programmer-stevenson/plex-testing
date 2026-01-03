'use client';

import { motion } from 'framer-motion';
import { Code, ChevronRight, ArrowRight, Layers, TrendingUp } from 'lucide-react';
import { HeroCanvas } from '@/components/animations';
import { fadeInUp, fadeInDown, staggerContainer, letterAnimation } from '@/lib/animations';

export default function HeroSection() {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center pt-24 pb-20 px-6 overflow-hidden"
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#007BFF]/30 to-transparent rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#00C2CB]/25 to-transparent rounded-full blur-[100px]"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8"
          >
            {/* Animated badge */}
            <motion.div variants={fadeInDown} className="!w-full !flex !justify-center md:!justify-start">
              <motion.div
                className="relative group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-[#007BFF] to-[#00C2CB] rounded-full opacity-30 blur group-hover:opacity-50 transition-all" />
                <span className="relative px-5 py-2.5 bg-[#0A1A2F]/80 backdrop-blur-sm border border-[#007BFF]/40 rounded-full text-sm text-[#00C2CB] font-medium flex items-center gap-2">
                  <Code size={14} />
                 Full Service Digital Agency
                </span>
              </motion.div>
            </motion.div>

            {/* Main headline with letter animation */}
            <motion.div variants={fadeInUp} className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-center md:text-left">
                <motion.span className="block text-[#EAEAEA]">
                  {"Design. Marketing. Growth.".split("").map((char, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      variants={letterAnimation}
                      initial="hidden"
                      animate="visible"
                      className={char === " " ? "inline-block w-4" : "inline-block"}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.span>
                <motion.span 
                  className="block bg-gradient-to-r from-[#007BFF] via-[#00C2CB] to-[#3EE4A8] bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  Real Results.
                </motion.span>
              </h1>
            </motion.div>

            {/* Mobile-only HeroCanvas */}
            <motion.div
              className="lg:hidden relative w-full h-64 my-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <HeroCanvas className="absolute inset-0" />
            </motion.div>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-[#A0A7B0] leading-relaxed max-w-xl"
            >
              Full stack web development agency building scalable, custom-coded applications that drive business growth. No templates. No shortcuts. Just enterprise-quality code.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
              <motion.a
                href="#contact"
                className="group relative px-8 py-4 bg-gradient-to-r from-[#007BFF] to-[#00C2CB] rounded-xl text-white font-semibold text-lg overflow-hidden"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-[#00C2CB] to-[#3EE4A8]"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative flex items-center gap-2">
                  Start Your Project
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight size={20} />
                  </motion.span>
                </span>
              </motion.a>

              <motion.a
                href="#services"
                className="group px-8 py-4 border-2 border-[#007BFF]/50 hover:border-[#00C2CB] rounded-xl text-[#EAEAEA] font-semibold text-lg transition-all duration-300"
                whileHover={{ scale: 1.03, borderColor: "#00C2CB" }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center gap-2">
                  View Services
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-8 pt-8 border-t border-[#142D4C]"
            >
              {[
                { icon: Code, label: "100% Custom Code" },
                { icon: Layers, label: "Full Stack Development" },
                { icon: TrendingUp, label: "SEO & Conversion" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#007BFF]/20 to-[#00C2CB]/20 flex items-center justify-center">
                    <item.icon size={18} className="text-[#00C2CB]" />
                  </div>
                  <span className="text-sm text-[#A0A7B0]">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Canvas Animation */}
          <motion.div
            className="hidden lg:block relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto flex items-center justify-center">
              <HeroCanvas className="absolute inset-0" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hidden lg:block absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs text-[#A0A7B0] uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 border-2 border-[#007BFF]/50 rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 bg-[#00C2CB] rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
