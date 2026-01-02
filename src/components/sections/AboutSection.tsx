'use client';

import { motion } from 'framer-motion';
import { Code, TrendingUp, Target, Globe, Layers, Smartphone } from 'lucide-react';
import { AnimatedSection, FloatingElement, GlowCard } from '@/components/ui';
import { fadeInUp, fadeInDown, fadeInLeft, fadeInRight, staggerContainer } from '@/lib/animations';

export default function AboutSection() {
  return (
    <AnimatedSection id="about" className="relative py-24 px-6 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingElement offset={80} className="absolute top-20 left-10">
          <div className="w-20 h-20 border border-[#007BFF]/20 rounded-2xl rotate-12" />
        </FloatingElement>
        <FloatingElement offset={-60} className="absolute bottom-40 right-20">
          <div className="w-16 h-16 border border-[#00C2CB]/20 rounded-full" />
        </FloatingElement>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.div variants={fadeInDown} className="inline-block mb-6">
            <span className="px-6 py-2.5 bg-[#007BFF]/10 border border-[#007BFF]/30 rounded-full text-sm text-[#00C2CB] font-semibold inline-flex items-center gap-2">
              <Code size={14} />
              HOW WE BUILD
            </span>
          </motion.div>
          
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-[#EAEAEA]">Custom Code. </span>
            <span className="bg-gradient-to-r from-[#007BFF] to-[#00C2CB] bg-clip-text text-transparent">
              Real Results.
            </span>
          </motion.h2>
          
          <motion.p variants={fadeInUp} className="text-[#A0A7B0] text-xl max-w-3xl mx-auto">
            Full stack development with the MERN stack, custom designs, optional WordPress solutions, and digital marketing that drives conversions
          </motion.p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-8"
          >
            {/* Story Card */}
            <motion.div variants={fadeInLeft}>
              <GlowCard className="p-8 bg-[#142D4C]/40 backdrop-blur-sm rounded-2xl border border-[#007BFF]/30">
                <h3 className="text-2xl font-bold text-[#EAEAEA] mb-6">Custom MERN Stack Development</h3>
                <div className="space-y-4 text-[#A0A7B0] leading-relaxed">
                  <p>
                    Every website we build is <span className="text-[#00C2CB] font-semibold">100% custom coded</span> using the MERN stack—MongoDB, Express.js, React, and Node.js. No templates, no page builders, no cookie-cutter solutions.
                  </p>
                  <p>
                    Our <span className="text-[#00C2CB] font-semibold">custom designs</span> are crafted from scratch to match your brand identity. We create unique user experiences that set you apart from competitors using the same tired templates.
                  </p>
                  <p>
                    Need something simpler? We also offer <span className="text-[#3EE4A8] font-semibold">WordPress solutions</span> with custom themes and plugins—perfect for businesses that need speed to market with ongoing maintenance support.
                  </p>
                </div>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-3 mt-8">
                  {["MongoDB", "Express.js", "React", "Node.js", "WordPress"].map((tech, i) => (
                    <motion.div
                      key={i}
                      className="group relative"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="relative px-3 py-1.5 bg-[#0A1A2F] rounded-lg border border-[#007BFF]/30 flex items-center gap-2">
                        <span className="text-[#00C2CB] font-mono text-sm">{tech}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlowCard>
            </motion.div>

            {/* Values */}
            <motion.div variants={fadeInLeft}>
              <GlowCard className="p-8 bg-[#142D4C]/40 backdrop-blur-sm rounded-2xl border border-[#00C2CB]/30">
                <h3 className="text-2xl font-bold text-[#EAEAEA] mb-6">Digital Marketing & SEO</h3>
                <div className="space-y-4">
                  {[
                    { icon: TrendingUp, title: 'Search Engine Optimization', description: 'Rank higher, get found organically' },
                    { icon: Target, title: 'Conversion Optimization', description: 'Turn visitors into customers' },
                    { icon: Globe, title: 'Paid Advertising', description: 'Google Ads, social media campaigns' },
                    { icon: Layers, title: 'Analytics & Tracking', description: 'Data-driven decisions' }
                  ].map((value, index) => (
                    <motion.div
                      key={index}
                      className="group flex items-start gap-4 p-4 rounded-xl hover:bg-[#0A1A2F]/50 transition-all cursor-pointer"
                      whileHover={{ x: 8 }}
                    >
                      <motion.div
                        className="w-12 h-12 bg-gradient-to-br from-[#007BFF] to-[#00C2CB] rounded-xl flex items-center justify-center flex-shrink-0"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                      >
                        <value.icon size={22} className="text-white" />
                      </motion.div>
                      <div>
                        <h4 className="text-lg font-bold text-[#EAEAEA] mb-1">{value.title}</h4>
                        <p className="text-sm text-[#A0A7B0]">{value.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlowCard>
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <motion.div variants={fadeInRight} className="grid grid-cols-2 gap-6">
              {[
                { icon: Code, title: 'MERN Stack', description: 'MongoDB, Express, React, Node', color: 'from-[#007BFF] to-[#00C2CB]' },
                { icon: Smartphone, title: 'Custom Design', description: 'Unique, branded experiences', color: 'from-[#00C2CB] to-[#3EE4A8]' },
                { icon: Globe, title: 'WordPress Option', description: 'When you need speed to market', color: 'from-[#3EE4A8] to-[#007BFF]' },
                { icon: TrendingUp, title: 'SEO Included', description: 'Built for search engines', color: 'from-[#007BFF] to-[#00C2CB]' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <GlowCard className="p-6 bg-[#142D4C]/40 backdrop-blur-sm rounded-xl border border-[#007BFF]/30 h-full">
                    <motion.div
                      className={`w-12 h-12 mb-4 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center`}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <item.icon size={24} className="text-white" />
                    </motion.div>
                    <h4 className="text-lg font-bold text-[#EAEAEA] mb-2">{item.title}</h4>
                    <p className="text-sm text-[#A0A7B0]">{item.description}</p>
                  </GlowCard>
                </motion.div>
              ))}
            </motion.div>

            {/* Approach Card */}
            <motion.div variants={fadeInRight}>
              <GlowCard className="p-8 bg-[#142D4C]/40 backdrop-blur-sm rounded-2xl border border-[#007BFF]/30">
                <h3 className="text-2xl font-bold text-[#EAEAEA] mb-4">Our Process</h3>
                <p className="text-[#A0A7B0] mb-6">
                  We start with <span className="text-[#00C2CB] font-semibold">discovery and planning</span>—understanding your business, goals, and target audience. Then we design custom mockups before writing a single line of code. Development is iterative with <span className="text-[#3EE4A8] font-semibold">regular check-ins and revisions</span>. Launch includes SEO optimization and ongoing support.
                </p>
                
                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 p-4 bg-[#0A1A2F]/50 rounded-xl border border-[#007BFF]/20">
                  {[
                    { value: "100%", label: "Custom Code" },
                    { value: "SEO", label: "Optimized" },
                    { value: "24/7", label: "Support" }
                  ].map((metric, i) => (
                    <div key={i} className="text-center">
                      <div className="text-2xl font-bold text-[#00C2CB] mb-1">{metric.value}</div>
                      <div className="text-xs text-[#A0A7B0]">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </GlowCard>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
