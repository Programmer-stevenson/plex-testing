'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Code, Check, ChevronRight, ArrowRight } from 'lucide-react';
import { AnimatedSection } from '@/components/ui';
import { SERVICES } from '@/constants';
import { fadeInUp, fadeInDown, staggerContainer } from '@/lib/animations';

export default function ServicesSection() {
  const [activeService, setActiveService] = useState<number | null>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => ((prev ?? 0) + 1) % 4);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatedSection id="services" className="relative py-24 px-6 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#0A1A2F] via-transparent to-[#0A1A2F] opacity-60"></div>
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#007BFF] rounded-full blur-[150px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[700px] h-[700px] bg-[#00C2CB] rounded-full blur-[140px] opacity-15 animate-pulse" style={{ animationDelay: '3s' }}></div>
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
            <motion.span
              className="px-6 py-2.5 bg-[#007BFF]/10 border border-[#007BFF]/30 rounded-full text-sm text-[#00C2CB] font-semibold tracking-wider inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <Code size={14} />
              DEVELOPMENT & MARKETING
            </motion.span>
          </motion.div>
          
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-[#EAEAEA]">Full Stack </span>
            <span className="bg-gradient-to-r from-[#007BFF] via-[#00C2CB] to-[#3EE4A8] bg-clip-text text-transparent">
              Web Solutions
            </span>
          </motion.h2>
          
          <motion.p variants={fadeInUp} className="text-[#A0A7B0] text-xl max-w-3xl mx-auto leading-relaxed">
            Custom-coded web applications, scalable architectures, and data-driven marketing strategies that deliver measurable ROI
          </motion.p>
        </motion.div>

        {/* Service Cards Grid - 3D Flip Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {SERVICES.map((service, index) => (
            <div
              key={index}
              className="relative h-[480px]"
              style={{ perspective: '1500px' }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-br from-[#007BFF] via-[#00C2CB] to-[#007BFF] rounded-2xl opacity-0 hover:opacity-50 blur-xl transition-all duration-700 pointer-events-none"></div>
              
              <div 
                className="relative w-full h-full transition-transform duration-700 cursor-pointer"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: activeService === index ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
                onClick={() => setActiveService(activeService === index ? null : index)}
              >
                {/* FRONT SIDE */}
                <div 
                  className="absolute inset-0 p-8 bg-gradient-to-br from-[#142D4C]/40 to-[#142D4C]/20 backdrop-blur-sm rounded-2xl border border-[#007BFF]/20 hover:border-[#00C2CB]/40 transition-all duration-700 group"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="absolute inset-0 opacity-[0.03] rounded-2xl overflow-hidden pointer-events-none">
                    <div className="h-full w-full" style={{
                      backgroundImage: 'radial-gradient(circle, #00C2CB 1px, transparent 1px)',
                      backgroundSize: '24px 24px'
                    }}></div>
                  </div>

                  <div className="relative mb-6">
                    <div className={`relative w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-700 shadow-lg shadow-[#007BFF]/30`}>
                      <service.icon size={32} className="text-white relative z-10 group-hover:rotate-12 transition-transform duration-700" />
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-xl blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500`}></div>
                    </div>
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-3 text-[#EAEAEA] group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#00C2CB] group-hover:to-[#3EE4A8] group-hover:bg-clip-text transition-all duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="text-[#A0A7B0] leading-relaxed mb-6 line-clamp-3">
                      {service.description}
                    </p>
                    
                    <div className="space-y-2.5">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start space-x-2.5 text-sm text-[#A0A7B0] opacity-70 group-hover:opacity-100 transition-all duration-500">
                          <Check size={16} className="text-[#3EE4A8] mt-0.5 flex-shrink-0" />
                          <span className="leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center text-[#00C2CB] opacity-60 group-hover:opacity-100 transition-all duration-300 font-semibold text-sm">
                      <span>Click for Details</span>
                      <ChevronRight size={18} className="ml-1" />
                    </div>
                  </div>
                </div>

                {/* BACK SIDE */}
                <div 
                  className="absolute inset-0 p-8 bg-gradient-to-br from-[#142D4C]/60 to-[#142D4C]/40 backdrop-blur-sm rounded-2xl border border-[#00C2CB]/60 shadow-2xl shadow-[#00C2CB]/20"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <div className="absolute inset-0 opacity-[0.03] rounded-2xl overflow-hidden pointer-events-none">
                    <div className="h-full w-full" style={{
                      backgroundImage: 'radial-gradient(circle, #00C2CB 1px, transparent 1px)',
                      backgroundSize: '24px 24px'
                    }}></div>
                  </div>

                  <div className="relative z-10 h-full flex flex-col">
                    <div className="mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center shadow-lg shadow-[#00C2CB]/30`}>
                        <service.icon size={32} className="text-white" />
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#00C2CB] to-[#3EE4A8] bg-clip-text text-transparent">
                      {service.title}
                    </h3>

                    <div className="flex-1 space-y-4 text-[#A0A7B0] text-sm leading-relaxed mb-6">
                      <p>{service.description}</p>
                      
                      <div className="space-y-2.5">
                        <div className="flex items-center space-x-2.5">
                          <div className="w-1.5 h-1.5 bg-[#3EE4A8] rounded-full"></div>
                          <span>100% Custom Development</span>
                        </div>
                        <div className="flex items-center space-x-2.5">
                          <div className="w-1.5 h-1.5 bg-[#3EE4A8] rounded-full"></div>
                          <span>Scalable Architecture</span>
                        </div>
                        <div className="flex items-center space-x-2.5">
                          <div className="w-1.5 h-1.5 bg-[#3EE4A8] rounded-full"></div>
                          <span>Ongoing Support Available</span>
                        </div>
                      </div>
                    </div>

                    <a 
                      href="#contact"
                      className={`block w-full py-3 bg-gradient-to-r ${service.color} text-white font-semibold rounded-xl text-center hover:opacity-90 transition-opacity`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Get Started
                    </a>

                    <button 
                      className="mt-4 text-[#00C2CB]/60 hover:text-[#00C2CB] text-xs transition-colors text-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveService(null);
                      }}
                    >
                      ← Click to flip back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Services CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-16"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/services"
              className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-[#007BFF]/50 hover:border-[#00C2CB] rounded-xl text-[#EAEAEA] font-semibold transition-all duration-300"
            >
              View All Services
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
