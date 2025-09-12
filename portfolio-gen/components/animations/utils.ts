import React from "react"

// Animation utilities for portfolio components

export type AnimationType = 
  | 'fade-in' 
  | 'slide-up' 
  | 'slide-left' 
  | 'slide-right' 
  | 'zoom-in' 
  | 'rotate-in'
  | 'bounce-in'
  | 'flip-in'

export type HoverType = 
  | 'scale-up' 
  | 'scale-down' 
  | 'glow' 
  | 'shadow-pop' 
  | 'tilt' 
  | 'parallax'
  | 'float'

export type TransitionType = 
  | 'smooth-fade' 
  | 'slide-transition' 
  | 'card-flip' 
  | 'staggered-reveal'

export type MicroInteractionType = 
  | 'button-ripple' 
  | 'icon-bounce' 
  | 'typewriter' 
  | 'progress-bar'

// Animation configuration interface
export interface AnimationConfig {
  entrance?: AnimationType
  hover?: HoverType
  transition?: TransitionType
  microInteraction?: MicroInteractionType
  stagger?: boolean
  delay?: number
  duration?: number
}

// Get CSS class for animation type
export const getAnimationClass = (animationType?: AnimationType): string => {
  if (!animationType) return ''
  
  const animationMap: Record<AnimationType, string> = {
    'fade-in': 'animate-fadeIn',
    'slide-up': 'animate-slideUp',
    'slide-left': 'animate-slideLeft', 
    'slide-right': 'animate-slideRight',
    'zoom-in': 'animate-zoomIn',
    'rotate-in': 'animate-rotateIn',
    'bounce-in': 'animate-bounceIn',
    'flip-in': 'animate-flipInX'
  }
  
  return animationMap[animationType] || ''
}

// Get CSS class for hover effect
export const getHoverClass = (hoverType?: HoverType): string => {
  if (!hoverType) return ''
  
  const hoverMap: Record<HoverType, string> = {
    'scale-up': 'hover:scale-105',
    'scale-down': 'hover:scale-95',
    'glow': 'hover:shadow-2xl hover:shadow-primary/25',
    'shadow-pop': 'hover:shadow-xl',
    'tilt': 'hover:rotate-1',
    'parallax': 'hover:translate-y-[-2px]',
    'float': 'hover-float'
  }
  
  return hoverMap[hoverType] || ''
}

// Get CSS class for transition effect
export const getTransitionClass = (transitionType?: TransitionType): string => {
  if (!transitionType) return ''
  
  const transitionMap: Record<TransitionType, string> = {
    'smooth-fade': 'smooth-fade',
    'slide-transition': 'slide-transition',
    'card-flip': 'card-flip',
    'staggered-reveal': 'stagger-children'
  }
  
  return transitionMap[transitionType] || ''
}

// Get CSS class for micro interaction
export const getMicroInteractionClass = (microType?: MicroInteractionType): string => {
  if (!microType) return ''
  
  const microMap: Record<MicroInteractionType, string> = {
    'button-ripple': 'button-ripple',
    'icon-bounce': 'icon-bounce', 
    'typewriter': 'typewriter',
    'progress-bar': 'progress-bar'
  }
  
  return microMap[microType] || ''
}

// Generate stagger delay class
export const getStaggerDelayClass = (index: number): string => {
  const delay = Math.min(index * 100, 800)
  return `animate-delay-${delay}`
}

// Combine animation classes
export const combineAnimationClasses = (config: AnimationConfig, index?: number): string => {
  const classes: string[] = []
  
  if (config.entrance) {
    classes.push(getAnimationClass(config.entrance))
  }
  
  if (config.hover) {
    classes.push(getHoverClass(config.hover))
  }
  
  if (config.transition) {
    classes.push(getTransitionClass(config.transition))
  }
  
  if (config.microInteraction) {
    classes.push(getMicroInteractionClass(config.microInteraction))
  }
  
  if (config.stagger && typeof index === 'number') {
    classes.push(getStaggerDelayClass(index))
  }
  
  // Add duration and timing if specified
  if (config.duration) {
    classes.push(`duration-${config.duration}`)
  }
  
  return classes.filter(Boolean).join(' ')
}

// Intersection Observer for scroll animations
export class ScrollAnimationObserver {
  private observer: IntersectionObserver
  private elements: Set<Element> = new Set()

  constructor(threshold = 0.1) {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            this.observer.unobserve(entry.target)
            this.elements.delete(entry.target)
          }
        })
      },
      { threshold, rootMargin: '50px 0px -50px 0px' }
    )
  }

  observe(element: Element) {
    if (!element || this.elements.has(element)) return
    
    this.elements.add(element)
    element.classList.add('animate-on-scroll')
    this.observer.observe(element)
  }

  unobserve(element: Element) {
    this.observer.unobserve(element)
    this.elements.delete(element)
  }

  disconnect() {
    this.observer.disconnect()
    this.elements.clear()
  }
}

// React hook for scroll animations
export const useScrollAnimation = (ref: React.RefObject<Element>, config?: AnimationConfig) => {
  React.useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new ScrollAnimationObserver()
    observer.observe(element)

    return () => observer.disconnect()
  }, [ref])
}

// Animation presets for common use cases
export const animationPresets = {
  // Hero section animations
  hero: {
    title: { entrance: 'fade-in' as AnimationType, hover: 'glow' as HoverType },
    subtitle: { entrance: 'slide-up' as AnimationType, stagger: true },
    cta: { entrance: 'zoom-in' as AnimationType, hover: 'scale-up' as HoverType, microInteraction: 'button-ripple' as MicroInteractionType }
  },
  
  // Card animations
  card: {
    default: { entrance: 'fade-in' as AnimationType, hover: 'shadow-pop' as HoverType },
    creative: { entrance: 'bounce-in' as AnimationType, hover: 'tilt' as HoverType },
    minimal: { entrance: 'slide-up' as AnimationType, hover: 'parallax' as HoverType }
  },
  
  // List animations
  list: {
    staggered: { entrance: 'slide-up' as AnimationType, stagger: true },
    cascade: { entrance: 'slide-left' as AnimationType, stagger: true, hover: 'scale-up' as HoverType }
  },
  
  // Button animations
  button: {
    primary: { hover: 'scale-up' as HoverType, microInteraction: 'button-ripple' as MicroInteractionType },
    secondary: { hover: 'glow' as HoverType },
    ghost: { hover: 'parallax' as HoverType }
  },
  
  // Image animations
  image: {
    gallery: { entrance: 'zoom-in' as AnimationType, hover: 'scale-up' as HoverType },
    profile: { entrance: 'fade-in' as AnimationType, hover: 'glow' as HoverType }
  }
}

// Performance utilities
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export const shouldAnimate = (): boolean => {
  return !prefersReducedMotion()
}

// Animation timing utilities
export const animationDurations = {
  fast: 200,
  normal: 300,
  slow: 500,
  slower: 700
}

export const animationEasings = {
  linear: 'linear',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)'
}

// Theme-aware animation utilities
export const getThemeAnimationClass = (theme: string, animationType: string): string => {
  const themeAnimations: Record<string, Record<string, string>> = {
    creative: {
      glow: 'theme-glow-primary',
      gradient: 'theme-gradient-slide'
    },
    professional: {
      glow: 'theme-glow-secondary'
    }
  }
  
  return themeAnimations[theme]?.[animationType] || ''
}

export default {
  getAnimationClass,
  getHoverClass,
  getTransitionClass,
  getMicroInteractionClass,
  getStaggerDelayClass,
  combineAnimationClasses,
  ScrollAnimationObserver,
  animationPresets,
  prefersReducedMotion,
  shouldAnimate,
  animationDurations,
  animationEasings,
  getThemeAnimationClass
}