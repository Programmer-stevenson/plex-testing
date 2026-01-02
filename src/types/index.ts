import { LucideIcon } from 'lucide-react';

// ============================================
// COMPONENT PROPS
// ============================================

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface AnimatedSectionProps extends BaseComponentProps {
  id?: string;
  delay?: number;
}

// ============================================
// DATA TYPES
// ============================================

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  color: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular: boolean;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: LucideIcon;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface ContactInfo {
  icon: LucideIcon;
  title: string;
  value: string;
  href: string;
}

export interface TrustIndicator {
  icon: LucideIcon;
  label: string;
}

export interface Badge {
  icon: LucideIcon;
  text: string;
}

// ============================================
// FORM TYPES
// ============================================

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
}

// ============================================
// ANIMATION TYPES
// ============================================

export interface AnimationConfig {
  workerPath: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    glow: string;
  };
  cube: {
    size: number;
    rotationSpeed: number;
    tiltX: number;
    tiltZ: number;
  };
  particles: {
    count: number;
    radius: number;
    orbitRadius: number;
  };
}

export interface WorkerMessage {
  type: string;
  canvas?: OffscreenCanvas;
  width?: number;
  height?: number;
  pixelRatio?: number;
  config?: Partial<AnimationConfig>;
}
