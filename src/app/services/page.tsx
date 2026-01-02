'use client';

import { Navbar, Footer } from '@/components/layout';
import ScrollProgress from '@/components/layout/ScrollProgress';
import Background from '@/components/layout/Background';
import { ServicesSection, PricingSection, CTASection } from '@/components/sections';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#0A1A2F] text-[#EAEAEA] overflow-x-hidden">
      <ScrollProgress />
      <Background />
      <Navbar />
      
      {/* Spacer for fixed navbar */}
      <div className="h-24" />
      
      {/* Services Content */}
      <ServicesSection />
      <PricingSection />
      <CTASection />
      
      <Footer />
    </div>
  );
}
