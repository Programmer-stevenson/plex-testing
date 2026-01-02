import { Code, Globe, Layers, TrendingUp, Shield } from 'lucide-react';
import type { Service, PricingPlan, Stat } from '@/types';

// ============================================
// BRAND COLORS
// ============================================

export const COLORS = {
  deepBlue: '#0A1A2F',
  midnight: '#142D4C',
  azure: '#007BFF',
  teal: '#00C2CB',
  white: '#EAEAEA',
  gray: '#A0A7B0',
  mint: '#3EE4A8',
} as const;

// ============================================
// BREAKPOINTS
// ============================================

export const BREAKPOINTS = {
  mobile: 1024,
} as const;

// ============================================
// SERVICES DATA
// ============================================

export const SERVICES: Service[] = [
  {
    icon: Code,
    title: "Custom Web Development",
    description: "Enterprise-grade full stack applications built from the ground up. Hand-coded, scalable solutions using React, Node.js, and modern frameworks—no templates, no shortcuts.",
    features: ["Full Stack Development", "Custom Code & Architecture", "Scalable Infrastructure", "API Development & Integrations"],
    color: "from-[#007BFF] to-[#00C2CB]"
  },
  {
    icon: Globe,
    title: "WordPress Solutions",
    description: "Professional WordPress websites for businesses that need speed to market. Custom themes, plugins, and optimizations—with ongoing maintenance plans starting at $99.99/mo.",
    features: ["Custom Theme Development", "Plugin Customization", "Speed Optimization", "Maintenance Subscriptions"],
    color: "from-[#00C2CB] to-[#3EE4A8]"
  },
  {
    icon: Layers,
    title: "Web Applications",
    description: "Complex web applications that power your business operations. From SaaS platforms to custom dashboards, we build production-ready systems that scale with your growth.",
    features: ["SaaS Development", "Database Architecture", "Real-time Features", "Cloud Deployment"],
    color: "from-[#3EE4A8] to-[#007BFF]"
  },
  {
    icon: TrendingUp,
    title: "SEO & Digital Marketing",
    description: "Data-driven marketing strategies that complement your web presence. We optimize for search, drive qualified traffic, and convert visitors into customers.",
    features: ["Technical SEO", "Conversion Rate Optimization", "Analytics & Tracking", "Paid Advertising"],
    color: "from-[#007BFF] to-[#3EE4A8]"
  }
];

// ============================================
// PRICING PLANS DATA
// ============================================

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Starter",
    price: "99.99",
    description: "Perfect for small business websites",
    features: ["Monthly Updates & Security Patches", "Basic Performance Monitoring", "Email Support", "1 Hour Dev Time/Month", "Uptime Monitoring"],
    popular: false
  },
  {
    name: "Professional",
    price: "249.99",
    description: "For growing businesses with active sites",
    features: ["Everything in Starter", "Priority Support", "3 Hours Dev Time/Month", "SEO Monitoring", "Monthly Analytics Report", "Content Updates"],
    popular: true
  },
  {
    name: "Enterprise",
    price: "499.99",
    description: "Full-service for high-traffic applications",
    features: ["Everything in Professional", "8 Hours Dev Time/Month", "24/7 Emergency Support", "Performance Optimization", "A/B Testing", "Dedicated Account Manager"],
    popular: false
  }
];

// ============================================
// STATS DATA
// ============================================

export const STATS: Stat[] = [
  { value: 20, suffix: "+", label: "Web Apps Deployed", icon: Code },
  { value: 100, suffix: "%", label: "Custom Code", icon: Layers },
  { value: 99, suffix: "%", label: "Uptime Guarantee", icon: Shield },
  { value: 3, suffix: "x", label: "Avg. ROI Increase", icon: TrendingUp },
];

// ============================================
// NAVIGATION
// ============================================

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "/services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

// ============================================
// CONTACT INFO
// ============================================

export const CONTACT_INFO = {
  email: "contact@plexura.com",
  phone: "(801) 347-8072",
  location: "Las Vegas, Nevada",
};
