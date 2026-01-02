'use client';

import { motion } from 'framer-motion';
import { Code, ArrowRight, Phone } from 'lucide-react';
import { AnimatedSection } from '@/components/ui';
import { fadeInUp, fadeInDown, staggerContainer } from '@/lib/animations';

export default function CTASection() {
  return (
    <AnimatedSection className="relative py-24 px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#007BFF]/10 via-[#00C2CB]/10 to-[#007BFF]/10" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center space-y-8"
        >
          <motion.div variants={fadeInDown} className="inline-block">
            <span className="px-6 py-2.5 bg-[#007BFF]/20 border border-[#007BFF]/30 rounded-full text-sm text-[#00C2CB] font-semibold inline-flex items-center gap-2">
              <Code size={14} />
              START YOUR PROJECT
            </span>
          </motion.div>

          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold">
            <span className="text-[#EAEAEA]">Ready to Build Something </span>
            <span className="bg-gradient-to-r from-[#007BFF] to-[#00C2CB] bg-clip-text text-transparent">
              That Actually Scales?
            </span>
          </motion.h2>

          <motion.p variants={fadeInUp} className="text-xl text-[#A0A7B0] max-w-2xl mx-auto">
            Let&apos;s talk about your project. Custom web development, enterprise applications, and digital marketing that drives real results.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <motion.a
              href="#contact"
              className="group px-10 py-5 bg-gradient-to-r from-[#007BFF] to-[#00C2CB] text-white text-lg font-semibold rounded-xl flex items-center justify-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Get a Quote
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight size={22} />
              </motion.span>
            </motion.a>
            
            <motion.a
              href="tel:+18013478072"
              className="group px-10 py-5 border-2 border-[#007BFF] hover:border-[#00C2CB] text-[#007BFF] hover:text-[#00C2CB] text-lg font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone size={22} />
              Schedule a Call
            </motion.a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto"
          >
            {[
              { value: "100%", label: "Custom Code" },
              { value: "Full", label: "Stack Expertise" },
              { value: "SEO", label: "Included" }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-[#00C2CB] mb-1">{item.value}</div>
                <div className="text-sm text-[#A0A7B0]">{item.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
