'use client';

import { motion } from 'framer-motion';
import { Shield, Check } from 'lucide-react';
import { AnimatedSection, GlowCard } from '@/components/ui';
import { PRICING_PLANS } from '@/constants';
import { fadeInUp, fadeInDown, staggerContainer } from '@/lib/animations';

export default function PricingSection() {
  return (
    <AnimatedSection className="relative py-24 px-6 bg-gradient-to-b from-transparent via-[#142D4C]/20 to-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInDown} className="inline-block mb-6">
            <span className="px-6 py-2.5 bg-[#007BFF]/10 border border-[#007BFF]/30 rounded-full text-sm text-[#00C2CB] font-semibold inline-flex items-center gap-2">
              <Shield size={14} />
              MAINTENANCE PLANS
            </span>
          </motion.div>
          
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#EAEAEA]">Keep Your Site </span>
            <span className="bg-gradient-to-r from-[#007BFF] to-[#00C2CB] bg-clip-text text-transparent">
              Running Smoothly
            </span>
          </motion.h2>
          
          <motion.p variants={fadeInUp} className="text-[#A0A7B0] text-xl max-w-3xl mx-auto">
            Monthly maintenance subscriptions to keep your website secure, updated, and performing at its best. Starting at just $99.99/month.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8"
        >
          {PRICING_PLANS.map((plan, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -12, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative"
            >
              {/* Popular badge */}
              {plan.popular && (
                <motion.div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 z-10"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="px-4 py-1.5 bg-gradient-to-r from-[#007BFF] to-[#00C2CB] text-white text-xs font-bold rounded-full shadow-lg">
                    MOST POPULAR
                  </span>
                </motion.div>
              )}

              <GlowCard className={`h-full p-8 bg-[#142D4C]/40 backdrop-blur-sm rounded-2xl border ${plan.popular ? 'border-[#00C2CB]/50' : 'border-[#007BFF]/20'} relative overflow-hidden`}>
                {/* Animated background for popular plan */}
                {plan.popular && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#007BFF]/5 to-[#00C2CB]/5"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                )}

                <div className="relative">
                  {/* Plan name */}
                  <h3 className="text-xl font-bold text-[#EAEAEA] mb-2">{plan.name}</h3>
                  <p className="text-[#A0A7B0] text-sm mb-6">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold bg-gradient-to-r from-[#007BFF] to-[#00C2CB] bg-clip-text text-transparent">
                        ${plan.price}
                      </span>
                      <span className="text-[#A0A7B0] text-sm">/month</span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, fIndex) => (
                      <motion.li
                        key={fIndex}
                        className="flex items-start gap-3 text-sm text-[#A0A7B0]"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * fIndex }}
                      >
                        <motion.div
                          className="w-5 h-5 bg-gradient-to-br from-[#007BFF] to-[#00C2CB] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          whileHover={{ scale: 1.2 }}
                        >
                          <Check size={12} className="text-white" />
                        </motion.div>
                        {feature}
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <motion.a
                    href="#contact"
                    className={`block w-full py-3 text-center font-semibold rounded-xl transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-[#007BFF] to-[#00C2CB] text-white'
                        : 'border-2 border-[#007BFF]/50 text-[#EAEAEA] hover:border-[#00C2CB]'
                    }`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Started
                  </motion.a>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-[#A0A7B0]">
            Need a custom plan? <a href="#contact" className="text-[#00C2CB] hover:underline font-semibold">Contact us</a> for enterprise solutions.
          </p>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
