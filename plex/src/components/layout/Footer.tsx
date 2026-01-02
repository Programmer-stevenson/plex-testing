'use client';

import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, ChevronRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative py-16 px-6 border-t border-[#142D4C] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: 'linear-gradient(#00C2CB 1px, transparent 1px), linear-gradient(90deg, #00C2CB 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <div className="w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <img src="/plexxx.png" alt="Plexura" className="w-full h-full object-contain" />
                </div>
              </div>
              <span className="text-2xl font-bold text-[#EAEAEA] group-hover:text-[#00C2CB] transition-colors">Plexura</span>
            </div>
            <p className="text-[#A0A7B0] leading-relaxed">Full stack web development agency. Custom code, scalable architecture, and digital marketing that converts.</p>
            <div className="flex items-center space-x-2 pt-2">
              <div className="w-2 h-2 bg-[#3EE4A8] rounded-full animate-pulse"></div>
              <span className="text-sm text-[#A0A7B0]">Accepting new projects</span>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-5"
          >
            <h3 className="text-sm font-bold text-[#EAEAEA] uppercase tracking-wider flex items-center">
              <div className="w-8 h-0.5 bg-gradient-to-r from-[#007BFF] to-transparent mr-3"></div>
              Services
            </h3>
            <div className="space-y-3">
              {["Custom Web Development", "WordPress Solutions", "SEO & Digital Marketing", "Maintenance Plans"].map((item, i) => (
                <a key={i} href="#services" className="group flex items-center text-[#A0A7B0] hover:text-[#00C2CB] transition-all duration-200">
                  <div className="w-1.5 h-1.5 bg-[#007BFF] rounded-full mr-3 group-hover:w-6 transition-all"></div>
                  <span>{item}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-5"
          >
            <h3 className="text-sm font-bold text-[#EAEAEA] uppercase tracking-wider flex items-center">
              <div className="w-8 h-0.5 bg-gradient-to-r from-[#00C2CB] to-transparent mr-3"></div>
              Quick Links
            </h3>
            <div className="space-y-3">
              {[
                { label: "Home", href: "#home" },
                { label: "About Us", href: "#about" },
                { label: "Services", href: "#services" },
                { label: "Contact", href: "#contact" }
              ].map((item, i) => (
                <a key={i} href={item.href} className="group flex items-center text-[#A0A7B0] hover:text-[#00C2CB] transition-colors">
                  <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all duration-200" />
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-5"
          >
            <h3 className="text-sm font-bold text-[#EAEAEA] uppercase tracking-wider flex items-center">
              <div className="w-8 h-0.5 bg-gradient-to-r from-[#3EE4A8] to-transparent mr-3"></div>
              Contact
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-[#142D4C]/30 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-[#007BFF]/10 border border-[#007BFF]/30 flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-[#007BFF]" />
                </div>
                <div className="pt-1">
                  <div className="text-sm text-[#EAEAEA]">Las Vegas, Nevada</div>
                </div>
              </div>
              <a href="mailto:contact@plexura.com" className="flex items-start space-x-3 p-3 rounded-lg hover:bg-[#142D4C]/30 transition-colors group">
                <div className="w-9 h-9 rounded-lg bg-[#00C2CB]/10 border border-[#00C2CB]/30 flex items-center justify-center flex-shrink-0">
                  <Mail size={16} className="text-[#00C2CB]" />
                </div>
                <div className="pt-1">
                  <div className="text-sm text-[#EAEAEA] group-hover:text-[#00C2CB] transition-colors">contact@plexura.com</div>
                </div>
              </a>
              <a href="tel:+18013478072" className="flex items-start space-x-3 p-3 rounded-lg hover:bg-[#142D4C]/30 transition-colors group">
                <div className="w-9 h-9 rounded-lg bg-[#3EE4A8]/10 border border-[#3EE4A8]/30 flex items-center justify-center flex-shrink-0">
                  <Phone size={16} className="text-[#3EE4A8]" />
                </div>
                <div className="pt-1">
                  <div className="text-sm text-[#EAEAEA] group-hover:text-[#3EE4A8] transition-colors">(801) 347-8072</div>
                </div>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#142D4C]/50 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-[#A0A7B0] text-sm">
            <span>© 2025 Plexura</span>
            <span className="text-[#142D4C]">•</span>
            <span>All rights reserved</span>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <a href="#" className="text-[#A0A7B0] hover:text-[#00C2CB] transition-colors">Terms of Service</a>
            <span className="text-[#142D4C]">•</span>
            <a href="#" className="text-[#A0A7B0] hover:text-[#00C2CB] transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
