'use client';

import { Navbar, Footer } from '@/components/layout';
import ScrollProgress from '@/components/layout/ScrollProgress';
import Background from '@/components/layout/Background';
import {
  HeroSection,
  StatsSection,
  ServicesSection,
  AboutSection,
  PricingSection,
  CTASection,
  ContactSection,
} from '@/components/sections';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A1A2F] text-[#EAEAEA] overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Animated Background */}
      <Background />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Services Section */}
      <ServicesSection />

      {/* About Section */}
      <AboutSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* CTA Section */}
      <CTASection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
