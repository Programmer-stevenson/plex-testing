'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Zap, Globe, Clock, Sparkles, ArrowRight, Check, Send, ChevronDown } from 'lucide-react';

export default function ContactSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone') || '',
      service: formData.get('service'),
      message: formData.get('message'),
    };

    try {
      const isLocal = typeof window !== 'undefined' && 
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
      
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 
                      (isLocal ? 'http://localhost:5000' : 'https://plexura-backend.onrender.com');

      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      let result;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        result = await response.json();
      } else {
        throw new Error('Server returned invalid response');
      }

      if (!response.ok) {
        throw new Error(result?.message || `Server error: ${response.status}`);
      }

      setFormSubmitted(true);
      setTimeout(() => setFormSubmitted(false), 5000);
      (e.target as HTMLFormElement).reset();
      
    } catch (error) {
      let errorMessage = 'Failed to send message. ';
      if (error instanceof Error) {
        if (error.message.includes('fetch')) {
          errorMessage += 'Cannot connect to server. Please check your internet connection.';
        } else if (error.message.includes('CORS')) {
          errorMessage += 'Connection blocked. Please contact support.';
        } else if (error.message.includes('Server error')) {
          errorMessage += error.message;
        } else {
          errorMessage += 'Please try again or email us at contact@plexura.com';
        }
      }
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden bg-[#050D18]">
      {/* Grid Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 194, 203, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 194, 203, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(0, 123, 255, 0.15) 0%, transparent 50%)',
          }}
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      {/* Floating Orbs */}
      <motion.div
        className="absolute top-20 -left-48 w-[400px] h-[400px] rounded-full blur-3xl opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(0,123,255,0.4) 0%, transparent 70%)' }}
        animate={{ y: [0, -30, 0], x: [0, 20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-40 -right-32 w-[300px] h-[300px] rounded-full blur-3xl opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(0,194,203,0.4) 0%, transparent 70%)' }}
        animate={{ y: [0, -30, 0], x: [0, 20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, delay: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 bg-gradient-to-r from-[#007BFF]/20 to-[#00C2CB]/20 rounded-full border border-[#007BFF]/30"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
              <Sparkles size={18} className="text-[#00C2CB]" />
            </motion.div>
            <span className="text-sm font-semibold text-[#00C2CB] tracking-wider uppercase">
              Start Your Project
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="text-[#EAEAEA]">Let&apos;s Create</span>
            <br />
            <span className="bg-gradient-to-r from-[#007BFF] via-[#00C2CB] to-[#007BFF] bg-clip-text text-transparent bg-[length:200%_auto]">
              Something Amazing
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-[#A0A7B0] max-w-2xl mx-auto mb-8"
          >
            Transform your vision into a digital masterpiece. We craft experiences that captivate, convert, and scale.
          </motion.p>

          {/* Feature Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {[
              { icon: Zap, text: "24hr Response" },
              { icon: Globe, text: "Remote Worldwide" },
              { icon: Clock, text: "Flexible Timeline" }
            ].map((badge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1, type: "spring" }}
                className="flex items-center gap-2 px-4 py-2 bg-[#0A1A2F]/60 backdrop-blur-sm rounded-full border border-[#1E3A5F]/50"
              >
                <badge.icon size={16} className="text-[#00C2CB]" />
                <span className="text-sm text-[#A0A7B0]">{badge.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left Column - Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative p-8 bg-gradient-to-br from-[#007BFF]/10 via-[#0A1A2F]/80 to-[#00C2CB]/10 backdrop-blur-xl rounded-3xl border border-[#1E3A5F]/50 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#007BFF]/20 to-transparent rounded-bl-full" />
              <div className="relative">
                <motion.div
                  className="w-20 h-20 mb-6 bg-gradient-to-br from-[#007BFF] to-[#00C2CB] rounded-2xl flex items-center justify-center shadow-2xl shadow-[#007BFF]/30"
                  whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                >
                  <Mail size={36} className="text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-[#EAEAEA] mb-3">Ready to Elevate Your Brand?</h3>
                <p className="text-[#A0A7B0] leading-relaxed">
                  Fill out our form and we&apos;ll craft a custom strategy tailored to your goals. No templates, no shortcuts—just results.
                </p>
              </div>
            </motion.div>

            {/* Contact Cards */}
            <div className="space-y-4">
              {[
                { icon: Mail, title: "Email Us", value: "contact@plexura.com", href: "mailto:contact@plexura.com" },
                { icon: Phone, title: "Call Us", value: "(801) 347-8072", href: "tel:+18013478072" },
                { icon: MapPin, title: "Locations", value: "Las Vegas, NV • Salt Lake City, UT", href: "#" }
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group relative block"
                >
                  <motion.div
                    className="relative p-6 bg-gradient-to-br from-[#0A1A2F]/90 to-[#142D4C]/50 backdrop-blur-xl rounded-2xl border border-[#1E3A5F]/50 overflow-hidden"
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-[#007BFF]/10 to-[#00C2CB]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative flex items-center gap-5">
                      <motion.div
                        className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#007BFF] to-[#00C2CB] rounded-xl flex items-center justify-center shadow-lg shadow-[#007BFF]/25"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <item.icon size={26} className="text-white" />
                      </motion.div>
                      <div>
                        <p className="text-sm text-[#A0A7B0] mb-1">{item.title}</p>
                        <p className="text-[#EAEAEA] font-semibold group-hover:text-[#00C2CB] transition-colors duration-300">
                          {item.value}
                        </p>
                      </div>
                      <motion.div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="text-[#00C2CB]" size={20} />
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 relative"
          >
            <div className="relative p-10 bg-gradient-to-br from-[#0A1A2F]/95 to-[#142D4C]/80 backdrop-blur-2xl rounded-3xl border border-[#1E3A5F]/50 shadow-2xl shadow-[#007BFF]/10">
              <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-r from-[#007BFF]/50 via-[#00C2CB]/50 to-[#007BFF]/50 opacity-50">
                <div className="w-full h-full bg-[#0A1A2F] rounded-3xl" />
              </div>

              <AnimatePresence mode="wait">
                {formSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="relative text-center py-16"
                  >
                    <motion.div
                      className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-[#00C2CB] to-[#007BFF] rounded-full flex items-center justify-center shadow-2xl shadow-[#00C2CB]/40"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    >
                      <Check size={48} className="text-white" />
                    </motion.div>
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-3xl font-bold text-[#EAEAEA] mb-3"
                    >
                      Message Sent!
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-[#A0A7B0] text-lg"
                    >
                      We&apos;ll be in touch within 24 hours.
                    </motion.p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleFormSubmit}
                    className="relative space-y-6"
                  >
                    {submitError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400 text-sm flex items-center gap-3"
                      >
                        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                        {submitError}
                      </motion.div>
                    )}

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Name Input */}
                      <div className="relative group">
                        <label className="block text-sm font-medium text-[#00C2CB] mb-2 tracking-wide">
                          Full Name <span className="text-[#007BFF]">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="name"
                            required
                            disabled={isSubmitting}
                            className="relative w-full px-5 py-4 bg-[#0A1A2F]/80 border border-[#1E3A5F] rounded-xl text-[#EAEAEA] placeholder-[#4A5568] focus:border-[#00C2CB] focus:outline-none focus:ring-2 focus:ring-[#00C2CB]/20 transition-all duration-300 disabled:opacity-50"
                            placeholder="John Doe"
                          />
                          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00C2CB]/50 rounded-tl-lg" />
                          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#007BFF]/50 rounded-tr-lg" />
                          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#007BFF]/50 rounded-bl-lg" />
                          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00C2CB]/50 rounded-br-lg" />
                        </div>
                      </div>

                      {/* Email Input */}
                      <div className="relative group">
                        <label className="block text-sm font-medium text-[#00C2CB] mb-2 tracking-wide">
                          Email Address <span className="text-[#007BFF]">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            name="email"
                            required
                            disabled={isSubmitting}
                            className="relative w-full px-5 py-4 bg-[#0A1A2F]/80 border border-[#1E3A5F] rounded-xl text-[#EAEAEA] placeholder-[#4A5568] focus:border-[#00C2CB] focus:outline-none focus:ring-2 focus:ring-[#00C2CB]/20 transition-all duration-300 disabled:opacity-50"
                            placeholder="john@company.com"
                          />
                          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00C2CB]/50 rounded-tl-lg" />
                          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#007BFF]/50 rounded-tr-lg" />
                          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#007BFF]/50 rounded-bl-lg" />
                          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00C2CB]/50 rounded-br-lg" />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Phone Input */}
                      <div className="relative group">
                        <label className="block text-sm font-medium text-[#00C2CB] mb-2 tracking-wide">
                          Phone Number
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            name="phone"
                            disabled={isSubmitting}
                            className="relative w-full px-5 py-4 bg-[#0A1A2F]/80 border border-[#1E3A5F] rounded-xl text-[#EAEAEA] placeholder-[#4A5568] focus:border-[#00C2CB] focus:outline-none focus:ring-2 focus:ring-[#00C2CB]/20 transition-all duration-300 disabled:opacity-50"
                            placeholder="(702) 555-1234"
                          />
                          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00C2CB]/50 rounded-tl-lg" />
                          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#007BFF]/50 rounded-tr-lg" />
                          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#007BFF]/50 rounded-bl-lg" />
                          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00C2CB]/50 rounded-br-lg" />
                        </div>
                      </div>

                      {/* Service Select */}
                      <div className="relative group">
                        <label className="block text-sm font-medium text-[#00C2CB] mb-2 tracking-wide">
                          Service <span className="text-[#007BFF]">*</span>
                        </label>
                        <div className="relative">
                          <select
                            name="service"
                            required
                            disabled={isSubmitting}
                            className="relative w-full px-5 py-4 bg-[#0A1A2F]/80 border border-[#1E3A5F] rounded-xl text-[#EAEAEA] focus:border-[#00C2CB] focus:outline-none focus:ring-2 focus:ring-[#00C2CB]/20 transition-all duration-300 disabled:opacity-50 appearance-none cursor-pointer"
                          >
                            <option value="">Select a service</option>
                            <option value="custom-web-development">Custom Web Development</option>
                            <option value="wordpress">WordPress Website</option>
                            <option value="web-application">Web Application / SaaS</option>
                            <option value="ecommerce">E-Commerce Development</option>
                            <option value="seo-marketing">SEO & Digital Marketing</option>
                            <option value="maintenance">Maintenance Subscription</option>
                            <option value="consultation">Technical Consultation</option>
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <ChevronDown size={18} className="text-[#00C2CB]" />
                          </div>
                          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00C2CB]/50 rounded-tl-lg" />
                          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#007BFF]/50 rounded-tr-lg" />
                          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#007BFF]/50 rounded-bl-lg" />
                          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00C2CB]/50 rounded-br-lg" />
                        </div>
                      </div>
                    </div>

                    {/* Message Textarea */}
                    <div className="relative group">
                      <label className="block text-sm font-medium text-[#00C2CB] mb-2 tracking-wide">
                        Project Details <span className="text-[#007BFF]">*</span>
                      </label>
                      <div className="relative">
                        <textarea
                          name="message"
                          required
                          rows={5}
                          disabled={isSubmitting}
                          className="relative w-full px-5 py-4 bg-[#0A1A2F]/80 border border-[#1E3A5F] rounded-xl text-[#EAEAEA] placeholder-[#4A5568] focus:border-[#00C2CB] focus:outline-none focus:ring-2 focus:ring-[#00C2CB]/20 transition-all duration-300 resize-none disabled:opacity-50"
                          placeholder="Tell us about your vision, goals, and timeline..."
                        />
                        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00C2CB]/50 rounded-tl-lg" />
                        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#007BFF]/50 rounded-tr-lg" />
                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#007BFF]/50 rounded-bl-lg" />
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00C2CB]/50 rounded-br-lg" />
                      </div>
                    </div>

                    {/* Checkbox */}
                    <div className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        id="terms"
                        name="terms"
                        required
                        disabled={isSubmitting}
                        className="mt-1 w-5 h-5 bg-[#0A1A2F] border-2 border-[#1E3A5F] rounded text-[#00C2CB] focus:ring-2 focus:ring-[#00C2CB]/20 cursor-pointer accent-[#00C2CB]"
                      />
                      <label htmlFor="terms" className="text-sm text-[#A0A7B0] cursor-pointer">
                        I agree to the <a href="#" className="text-[#00C2CB] hover:underline">terms and conditions</a> and <a href="#" className="text-[#00C2CB] hover:underline">privacy policy</a>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative w-full group px-8 py-5 bg-gradient-to-r from-[#007BFF] to-[#00C2CB] text-white font-bold text-lg rounded-xl overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      />
                      <span className="relative flex items-center justify-center gap-3">
                        {isSubmitting ? (
                          <>
                            <motion.div
                              className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                              <Send size={22} />
                            </motion.div>
                          </>
                        )}
                      </span>
                    </motion.button>

                    {/* Trust indicators */}
                    <div className="flex items-center justify-center gap-6 pt-4">
                      <div className="flex items-center gap-2 text-sm text-[#A0A7B0]">
                        <div className="w-2 h-2 bg-[#00C2CB] rounded-full animate-pulse" />
                        24hr Response
                      </div>
                      <div className="w-1 h-1 bg-[#1E3A5F] rounded-full" />
                      <div className="flex items-center gap-2 text-sm text-[#A0A7B0]">
                        <div className="w-2 h-2 bg-[#007BFF] rounded-full animate-pulse" />
                        100% Secure
                      </div>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Decorative elements */}
            <motion.div
              className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-[#007BFF] to-[#00C2CB] rounded-2xl opacity-80 blur-sm"
              animate={{ rotate: 360, scale: [1, 1.1, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute -bottom-6 -left-6 w-12 h-12 border-2 border-[#00C2CB]/50 rounded-xl"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
