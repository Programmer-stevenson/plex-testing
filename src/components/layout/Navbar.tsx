'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useScrolled } from '@/hooks';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isScrolled = useScrolled();

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gradient-to-r from-[#0D3D3D]/80 via-[#1A2F5C]/80 via-[#2D5F8D]/80 to-[#3D2B5F]/80 backdrop-blur-md shadow-lg shadow-[#00C2CB]/20' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center group cursor-pointer">
              {/* Logo + lexura overlapping to spell "Plexura" */}
              <img 
                src="/plexxx.png"
                alt="P" 
                className="w-[2.4em] h-[2.4em] object-contain logo-tech-pulse"
                style={{ fontSize: '2.25rem' }}
              />
              <span className="text-4xl font-bold text-white" style={{ marginLeft: 'calc(-0.5em - 6px)' }}>lexura</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-[#A0A7B0] hover:text-[#00C2CB] transition-colors duration-200 relative group">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00C2CB] group-hover:w-full transition-all duration-300"></span>
              </a>
              <Link href="/services" className="text-[#A0A7B0] hover:text-[#00C2CB] transition-colors duration-200 relative group">
                Services
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00C2CB] group-hover:w-full transition-all duration-300"></span>
              </Link>
              <a href="#about" className="text-[#A0A7B0] hover:text-[#00C2CB] transition-colors duration-200 relative group">
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00C2CB] group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#contact" className="px-6 py-2 bg-gradient-to-r from-[#007BFF] to-[#00C2CB] text-white rounded-lg hover:shadow-lg hover:shadow-[#007BFF]/30 transition-all duration-200">
                Contact Us
              </a>
            </div>

            <button 
              className="md:hidden p-2 text-[#EAEAEA] hover:text-[#00C2CB] transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm z-50 md:hidden animate-slideInRight">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0D3D3D]/95 via-[#1A2F5C]/95 to-[#3D2B5F]/95 backdrop-blur-2xl"></div>
            <div className="absolute inset-0 opacity-10">
              <div className="grid-pattern"></div>
            </div>
            <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-[#00C2CB] via-[#007BFF] to-[#3D2B5F] shadow-lg shadow-[#00C2CB]/50"></div>

            <div className="relative h-full flex flex-col">
              <div className="px-8 pt-8 pb-6">
                <div className="flex items-center justify-between mb-6">
                  {/* Mobile logo + lexura overlapping */}
                  <div className="flex items-center">
                    <img 
                      src="/plexxx.png" 
                      alt="P" 
                      className="w-[2em] h-[2em] object-contain logo-tech-pulse"
                      style={{ fontSize: '1.875rem' }}
                    />
                    <span className="text-3xl font-bold text-white" style={{ marginLeft: 'calc(-0.45em - 6px)' }}>lexura</span>
                  </div>
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-[#00C2CB]/20 hover:border-[#00C2CB]/50 transition-all duration-300 group"
                  >
                    <X size={20} className="text-[#A0A7B0] group-hover:text-[#00C2CB] transition-colors" />
                  </button>
                </div>
                <p className="text-sm text-[#A0A7B0] font-light tracking-wide">Engineering Excellence</p>
              </div>

              <div className="flex-1 px-6 py-8 space-y-3 overflow-y-auto">
                <a href="#home" className="group block relative" onClick={() => setMobileMenuOpen(false)}>
                  <div className="relative px-6 py-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-[#00C2CB]/50 transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00C2CB]/0 via-[#00C2CB]/10 to-[#00C2CB]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative flex items-center justify-between">
                      <div>
                        <span className="block text-xl font-semibold text-[#EAEAEA] group-hover:text-[#00C2CB] transition-colors duration-300">Home</span>
                        <span className="block text-xs text-[#A0A7B0] mt-1">Welcome page</span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00C2CB]/20 to-[#007BFF]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="text-[#00C2CB] group-hover:translate-x-0.5 transition-transform duration-300">→</span>
                      </div>
                    </div>
                  </div>
                </a>
                
                <Link href="/services" className="group block relative" onClick={() => setMobileMenuOpen(false)}>
                  <div className="relative px-6 py-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-[#007BFF]/50 transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#007BFF]/0 via-[#007BFF]/10 to-[#007BFF]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative flex items-center justify-between">
                      <div>
                        <span className="block text-xl font-semibold text-[#EAEAEA] group-hover:text-[#007BFF] transition-colors duration-300">Services</span>
                        <span className="block text-xs text-[#A0A7B0] mt-1">What we offer</span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#007BFF]/20 to-[#3D2B5F]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="text-[#007BFF] group-hover:translate-x-0.5 transition-transform duration-300">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
                
                <a href="#about" className="group block relative" onClick={() => setMobileMenuOpen(false)}>
                  <div className="relative px-6 py-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-[#3D2B5F]/50 transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#3D2B5F]/0 via-[#3D2B5F]/10 to-[#3D2B5F]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative flex items-center justify-between">
                      <div>
                        <span className="block text-xl font-semibold text-[#EAEAEA] group-hover:text-[#9D7FDB] transition-colors duration-300">About</span>
                        <span className="block text-xs text-[#A0A7B0] mt-1">How we build</span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3D2B5F]/20 to-[#00C2CB]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="text-[#9D7FDB] group-hover:translate-x-0.5 transition-transform duration-300">→</span>
                      </div>
                    </div>
                  </div>
                </a>
                
                <a href="#contact" className="group block relative" onClick={() => setMobileMenuOpen(false)}>
                  <div className="relative px-6 py-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-[#00C2CB]/50 transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00C2CB]/0 via-[#00C2CB]/10 to-[#00C2CB]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative flex items-center justify-between">
                      <div>
                        <span className="block text-xl font-semibold text-[#EAEAEA] group-hover:text-[#00C2CB] transition-colors duration-300">Contact</span>
                        <span className="block text-xs text-[#A0A7B0] mt-1">Get in touch</span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00C2CB]/20 to-[#007BFF]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="text-[#00C2CB] group-hover:translate-x-0.5 transition-transform duration-300">→</span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>

              <div className="px-6 pb-8">
                <div className="relative rounded-2xl bg-gradient-to-br from-[#007BFF] via-[#00C2CB] to-[#007BFF] p-[2px] overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00C2CB] via-[#007BFF] to-[#00C2CB] animate-gradient-shift"></div>
                  <a 
                    href="#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="relative block w-full px-6 py-4 bg-[#0A1A2F] rounded-2xl text-white font-semibold text-lg hover:bg-transparent transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-[#00C2CB]/50"
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <span>Get Started</span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </span>
                  </a>
                </div>
                <div className="mt-6 flex items-center justify-center space-x-6 text-xs text-[#A0A7B0]">
                  <a href="#" className="hover:text-[#00C2CB] transition-colors">Privacy</a>
                  <span>•</span>
                  <a href="#" className="hover:text-[#00C2CB] transition-colors">Terms</a>
                  <span>•</span>
                  <a href="#" className="hover:text-[#00C2CB] transition-colors">Support</a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}