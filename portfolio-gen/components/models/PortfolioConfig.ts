/**
 * Portfolio configuration interface for the portfolio generator.
 * This interface defines the structure for the portfolio configuration
 * stored in /training/config.json and used throughout the application.
 */

import type { PortfolioContent } from './PortfolioContent'

export interface PortfolioConfig {
  theme: ThemeType;
  colorPalette: string[];      // tailwind classes or tokens
  layout: "single" | "grid" | "timeline";
  components: ComponentType[];        // names of components to render
  animations: AnimationType[];        // names of animation presets
  typography: TypographyType;
  published: boolean;
  content?: PortfolioContent; // Add content data
}

/**
 * Available theme types for portfolio design systems
 */
export type ThemeType = 
  | "minimal" 
  | "dark" 
  | "professional" 
  | "creative" 
  | "modern-gradient" 
  | "retro" 
  | "playful";

/**
 * Available component types for portfolio sections
 */
export type ComponentType = 
  | "navbar" 
  | "hero" 
  | "about" 
  | "skills" 
  | "projects" 
  | "experience" 
  | "education" 
  | "testimonials" 
  | "awards" 
  | "blog" 
  | "gallery" 
  | "contact" 
  | "footer";

/**
 * Available animation and transition types
 */
export type AnimationType = 
  // Section entrances
  | "fade-in" 
  | "slide-up" 
  | "slide-left" 
  | "slide-right" 
  | "zoom-in" 
  | "rotate-in"
  // Hover effects
  | "scale-up" 
  | "scale-down" 
  | "glow" 
  | "shadow-pop" 
  | "tilt" 
  | "parallax"
  // Transitions
  | "smooth-fade" 
  | "slide-transition" 
  | "card-flip" 
  | "staggered-reveal"
  // Micro-interactions
  | "button-ripple" 
  | "icon-bounce" 
  | "typewriter" 
  | "progress-bar";

/**
 * Typography options
 */
export type TypographyType = "font-sans" | "font-serif" | "font-mono";

/**
 * Feedback event interface for capturing user interactions and training data.
 * Events are logged to /training/feedback.json for reinforcement learning.
 */
export interface FeedbackEvent {
  timestamp: string;
  sessionId?: string;
  event: string;               // e.g., "keep_theme", "change_layout", "like", "publish"
  details?: Record<string, any>;
}

/**
 * Default portfolio configuration for initialization
 */
import { DEFAULT_CONTENT } from './PortfolioContent'

export const DEFAULT_CONFIG: PortfolioConfig = {
  theme: "minimal",
  colorPalette: ["bg-gray-900", "text-white", "accent-blue-500"],
  layout: "single",
  components: ["navbar", "hero", "about", "skills", "projects", "experience", "contact", "footer"],
  animations: ["fade-in", "slide-up"],
  typography: "font-sans",
  published: false,
  content: DEFAULT_CONTENT
};

/**
 * Theme configuration mapping
 */
export const THEME_CONFIGS: Record<ThemeType, {
  colorPalette: string[];
  backgroundClass: string;
  textClass: string;
  accentClass: string;
}> = {
  minimal: {
    colorPalette: ["bg-white", "text-gray-900", "accent-blue-500"],
    backgroundClass: "bg-white",
    textClass: "text-gray-900", 
    accentClass: "text-blue-500"
  },
  dark: {
    colorPalette: ["bg-gray-900", "text-white", "accent-blue-400"],
    backgroundClass: "bg-gray-900",
    textClass: "text-white",
    accentClass: "text-blue-400"
  },
  professional: {
    colorPalette: ["bg-slate-50", "text-slate-800", "accent-indigo-600"],
    backgroundClass: "bg-slate-50",
    textClass: "text-slate-800",
    accentClass: "text-indigo-600"
  },
  creative: {
    colorPalette: ["bg-purple-900", "text-yellow-100", "accent-pink-400"],
    backgroundClass: "bg-purple-900",
    textClass: "text-yellow-100",
    accentClass: "text-pink-400"
  },
  "modern-gradient": {
    colorPalette: ["bg-gradient-to-br", "from-blue-400", "to-purple-600", "text-white"],
    backgroundClass: "bg-gradient-to-br from-blue-400 to-purple-600",
    textClass: "text-white",
    accentClass: "text-yellow-300"
  },
  retro: {
    colorPalette: ["bg-amber-50", "text-amber-900", "accent-orange-600"],
    backgroundClass: "bg-amber-50",
    textClass: "text-amber-900", 
    accentClass: "text-orange-600"
  },
  playful: {
    colorPalette: ["bg-pink-100", "text-purple-900", "accent-green-500"],
    backgroundClass: "bg-pink-100",
    textClass: "text-purple-900",
    accentClass: "text-green-500"
  }
};

/**
 * Component display names and descriptions
 */
export const COMPONENT_INFO: Record<ComponentType, {
  displayName: string;
  description: string;
  category: "header" | "content" | "footer";
}> = {
  navbar: { displayName: "Navigation Bar", description: "Logo + navigation links", category: "header" },
  hero: { displayName: "Hero Section", description: "Big banner with name, tagline, CTA", category: "content" },
  about: { displayName: "About Me", description: "Profile image + bio", category: "content" },
  skills: { displayName: "Skills", description: "List or grid with icons/badges", category: "content" },
  projects: { displayName: "Projects", description: "Cards, carousel, or timeline", category: "content" },
  experience: { displayName: "Experience", description: "Work history timeline or cards", category: "content" },
  education: { displayName: "Education", description: "Timeline or simple list", category: "content" },
  testimonials: { displayName: "Testimonials", description: "Client quotes", category: "content" },
  awards: { displayName: "Awards & Certifications", description: "Badges or certificates list", category: "content" },
  blog: { displayName: "Blog/Articles", description: "Latest posts", category: "content" },
  gallery: { displayName: "Gallery", description: "Image grid or slider", category: "content" },
  contact: { displayName: "Contact", description: "Form, email, or links", category: "content" },
  footer: { displayName: "Footer", description: "Social icons, copyright", category: "footer" }
};

/**
 * Animation descriptions and CSS classes
 */
export const ANIMATION_INFO: Record<AnimationType, {
  displayName: string;
  description: string;
  cssClass: string;
  category: "entrance" | "hover" | "transition" | "micro";
}> = {
  // Section entrances
  "fade-in": { displayName: "Fade In", description: "Smooth opacity transition", cssClass: "animate-fade-in", category: "entrance" },
  "slide-up": { displayName: "Slide Up", description: "Enter from bottom", cssClass: "animate-slide-up", category: "entrance" },
  "slide-left": { displayName: "Slide Left", description: "Enter from right", cssClass: "animate-slide-left", category: "entrance" },
  "slide-right": { displayName: "Slide Right", description: "Enter from left", cssClass: "animate-slide-right", category: "entrance" },
  "zoom-in": { displayName: "Zoom In", description: "Scale up entrance", cssClass: "animate-zoom-in", category: "entrance" },
  "rotate-in": { displayName: "Rotate In", description: "Rotating entrance", cssClass: "animate-rotate-in", category: "entrance" },
  
  // Hover effects
  "scale-up": { displayName: "Scale Up", description: "Grow on hover", cssClass: "hover:scale-105 transition-transform", category: "hover" },
  "scale-down": { displayName: "Scale Down", description: "Shrink on hover", cssClass: "hover:scale-95 transition-transform", category: "hover" },
  "glow": { displayName: "Glow Effect", description: "Glowing border on hover", cssClass: "hover:shadow-lg hover:shadow-blue-500/50 transition-shadow", category: "hover" },
  "shadow-pop": { displayName: "Shadow Pop", description: "Shadow appears on hover", cssClass: "hover:shadow-xl transition-shadow", category: "hover" },
  "tilt": { displayName: "Tilt", description: "Slight rotation on hover", cssClass: "hover:rotate-1 transition-transform", category: "hover" },
  "parallax": { displayName: "Parallax", description: "Depth effect on scroll", cssClass: "transform-gpu", category: "hover" },
  
  // Transitions
  "smooth-fade": { displayName: "Smooth Fade", description: "Fade between sections", cssClass: "transition-opacity duration-500", category: "transition" },
  "slide-transition": { displayName: "Slide Transition", description: "Sliding between views", cssClass: "transition-transform duration-300", category: "transition" },
  "card-flip": { displayName: "Card Flip", description: "3D flip effect", cssClass: "transform-style-preserve-3d transition-transform duration-600", category: "transition" },
  "staggered-reveal": { displayName: "Staggered Reveal", description: "Items appear one by one", cssClass: "animate-stagger", category: "transition" },
  
  // Micro-interactions
  "button-ripple": { displayName: "Button Ripple", description: "Ripple effect on click", cssClass: "relative overflow-hidden", category: "micro" },
  "icon-bounce": { displayName: "Icon Bounce", description: "Bouncing icons", cssClass: "animate-bounce", category: "micro" },
  "typewriter": { displayName: "Typewriter", description: "Text types out", cssClass: "animate-typewriter", category: "micro" },
  "progress-bar": { displayName: "Progress Bars", description: "Animated progress indicators", cssClass: "animate-progress", category: "micro" }
};