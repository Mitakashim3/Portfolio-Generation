// Portfolio template definitions and configurations

import type { AnimationType, HoverType, TransitionType, MicroInteractionType } from '../animations/utils'

// Base interfaces for all sections
export interface BaseSection {
  id: string
  type: string
  enabled: boolean
  order: number
  animations?: {
    entrance?: AnimationType
    hover?: HoverType
    transition?: TransitionType
    microInteraction?: MicroInteractionType
    stagger?: boolean
  }
  theme?: 'default' | 'minimal' | 'creative' | 'professional'
}

// Hero section configuration
export interface HeroTemplate extends BaseSection {
  type: 'hero'
  name: string
  tagline: string
  description: string
  profileImage?: string
  socialLinks: {
    github?: string
    linkedin?: string
    email?: string
    twitter?: string
    website?: string
    instagram?: string
    dribbble?: string
    behance?: string
  }
  resumeUrl?: string
  layout: 'centered' | 'split' | 'full-width'
  backgroundType: 'gradient' | 'image' | 'video' | 'particles'
  backgroundConfig?: {
    gradient?: {
      from: string
      to: string
      direction: string
    }
    image?: {
      url: string
      overlay: boolean
      overlayOpacity: number
    }
    particles?: {
      density: number
      color: string
      connectLines: boolean
    }
  }
}

// About section configuration  
export interface AboutTemplate extends BaseSection {
  type: 'about'
  title: string
  description: string
  stats: Array<{
    label: string
    value: string
    icon: string
  }>
  skills: string[]
  experience: Array<{
    title: string
    company: string
    period: string
    description: string
    logo?: string
  }>
  education: Array<{
    degree: string
    institution: string
    period: string
    description?: string
  }>
  layout: 'single-column' | 'two-column' | 'grid'
  showStats: boolean
  showSkills: boolean
  showExperience: boolean
  showEducation: boolean
}

// Projects section configuration
export interface ProjectsTemplate extends BaseSection {
  type: 'projects'
  title: string
  subtitle: string
  projects: Array<{
    id: string
    title: string
    description: string
    image?: string
    technologies: string[]
    liveUrl?: string
    githubUrl?: string
    category: string
    featured: boolean
    date: string
    status: 'completed' | 'in-progress' | 'planned'
  }>
  categories: string[]
  showFilters: boolean
  featuredOnly: boolean
  layout: 'grid' | 'masonry' | 'list'
  columns: 2 | 3 | 4
  showCategories: boolean
  showTechnologies: boolean
  showDates: boolean
}

// Skills section configuration
export interface SkillsTemplate extends BaseSection {
  type: 'skills'
  title: string
  subtitle: string
  skillCategories: Array<{
    name: string
    skills: Array<{
      name: string
      level: number
      icon?: string
      color?: string
    }>
  }>
  layout: 'bars' | 'circles' | 'cards' | 'icons'
  showLevels: boolean
  showIcons: boolean
  groupByCategory: boolean
}

// Contact section configuration
export interface ContactTemplate extends BaseSection {
  type: 'contact'
  title: string
  subtitle: string
  contactInfo: {
    email: string
    phone?: string
    location?: string
    availability?: string
  }
  socialLinks: {
    github?: string
    linkedin?: string
    twitter?: string
    instagram?: string
    dribbble?: string
    behance?: string
  }
  showContactForm: boolean
  showMap: boolean
  mapConfig?: {
    latitude: number
    longitude: number
    zoom: number
  }
  layout: 'split' | 'centered' | 'cards'
}

// Navigation configuration
export interface NavigationTemplate {
  type: 'navigation'
  logo?: {
    text?: string
    image?: string
  }
  style: 'fixed' | 'sticky' | 'static'
  position: 'top' | 'side'
  showSocialLinks: boolean
  showThemeToggle: boolean
  showLanguageSwitch: boolean
  mobileMenuStyle: 'drawer' | 'fullscreen' | 'dropdown'
}

// Footer configuration
export interface FooterTemplate {
  type: 'footer'
  showSocialLinks: boolean
  showCopyright: boolean
  showBackToTop: boolean
  customLinks: Array<{
    text: string
    url: string
  }>
  layout: 'simple' | 'detailed' | 'minimal'
}

// Complete portfolio template
export interface PortfolioTemplate {
  id: string
  name: string
  description: string
  version: string
  author: string
  thumbnail?: string
  
  // Global settings
  settings: {
    colorScheme: 'light' | 'dark' | 'system'
    primaryColor: string
    secondaryColor: string
    fontFamily: string
    fontSizes: {
      base: number
      scale: number
    }
    spacing: {
      base: number
      scale: number
    }
    borderRadius: number
    animations: {
      enabled: boolean
      duration: 'fast' | 'normal' | 'slow'
      easing: string
    }
  }
  
  // Layout configuration
  layout: {
    navigation: NavigationTemplate
    footer: FooterTemplate
    maxWidth: string
    padding: string
  }
  
  // Sections
  sections: Array<
    | HeroTemplate 
    | AboutTemplate 
    | ProjectsTemplate 
    | SkillsTemplate 
    | ContactTemplate
  >
}

// Predefined templates
export const portfolioTemplates: PortfolioTemplate[] = [
  {
    id: 'modern-developer',
    name: 'Modern Developer',
    description: 'A clean, modern portfolio perfect for developers and designers',
    version: '1.0.0',
    author: 'Portfolio Generator',
    thumbnail: '/templates/modern-developer.jpg',
    
    settings: {
      colorScheme: 'system',
      primaryColor: '#3b82f6',
      secondaryColor: '#8b5cf6',
      fontFamily: 'Inter',
      fontSizes: {
        base: 16,
        scale: 1.125
      },
      spacing: {
        base: 16,
        scale: 1.5
      },
      borderRadius: 8,
      animations: {
        enabled: true,
        duration: 'normal',
        easing: 'ease-out'
      }
    },
    
    layout: {
      navigation: {
        type: 'navigation',
        logo: { text: 'Portfolio' },
        style: 'fixed',
        position: 'top',
        showSocialLinks: true,
        showThemeToggle: true,
        showLanguageSwitch: false,
        mobileMenuStyle: 'drawer'
      },
      footer: {
        type: 'footer',
        showSocialLinks: true,
        showCopyright: true,
        showBackToTop: true,
        customLinks: [],
        layout: 'simple'
      },
      maxWidth: '1200px',
      padding: '20px'
    },
    
    sections: [
      {
        id: 'hero-1',
        type: 'hero',
        enabled: true,
        order: 1,
        name: 'Your Name',
        tagline: 'Full Stack Developer',
        description: 'I create digital experiences that matter. Passionate about building scalable web applications.',
        socialLinks: {
          github: 'https://github.com/username',
          linkedin: 'https://linkedin.com/in/username',
          email: 'contact@example.com'
        },
        layout: 'centered',
        backgroundType: 'gradient',
        backgroundConfig: {
          gradient: {
            from: '#3b82f6',
            to: '#8b5cf6',
            direction: 'to-br'
          }
        },
        animations: {
          entrance: 'fade-in',
          hover: 'scale-up',
          stagger: true
        },
        theme: 'default'
      },
      {
        id: 'about-1',
        type: 'about',
        enabled: true,
        order: 2,
        title: 'About Me',
        description: 'Passionate developer with 3+ years of experience in modern web technologies.',
        stats: [
          { label: 'Years Experience', value: '3+', icon: 'briefcase' },
          { label: 'Projects Completed', value: '50+', icon: 'code' },
          { label: 'Technologies', value: '15+', icon: 'cpu' }
        ],
        skills: ['React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'AWS'],
        experience: [
          {
            title: 'Senior Frontend Developer',
            company: 'Tech Corp',
            period: '2022 - Present',
            description: 'Led development of scalable React applications.'
          }
        ],
        education: [
          {
            degree: 'Bachelor of Computer Science',
            institution: 'University of Technology',
            period: '2016 - 2020'
          }
        ],
        layout: 'two-column',
        showStats: true,
        showSkills: true,
        showExperience: true,
        showEducation: true,
        animations: {
          entrance: 'slide-up',
          hover: 'shadow-pop',
          stagger: true
        },
        theme: 'default'
      },
      {
        id: 'projects-1',
        type: 'projects',
        enabled: true,
        order: 3,
        title: 'Featured Projects',
        subtitle: 'A collection of projects that showcase my skills and passion.',
        projects: [
          {
            id: 'project-1',
            title: 'E-Commerce Platform',
            description: 'Full-stack e-commerce solution with React and Node.js.',
            technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
            category: 'Web App',
            featured: true,
            date: '2024',
            status: 'completed'
          }
        ],
        categories: ['All', 'Web App', 'Mobile', 'API'],
        showFilters: true,
        featuredOnly: false,
        layout: 'grid',
        columns: 3,
        showCategories: true,
        showTechnologies: true,
        showDates: true,
        animations: {
          entrance: 'zoom-in',
          hover: 'scale-up',
          stagger: true
        },
        theme: 'default'
      }
    ]
  },
  
  {
    id: 'creative-portfolio',
    name: 'Creative Portfolio',
    description: 'A vibrant, creative portfolio for designers and artists',
    version: '1.0.0',
    author: 'Portfolio Generator',
    thumbnail: '/templates/creative-portfolio.jpg',
    
    settings: {
      colorScheme: 'light',
      primaryColor: '#8b5cf6',
      secondaryColor: '#ec4899',
      fontFamily: 'Poppins',
      fontSizes: {
        base: 16,
        scale: 1.2
      },
      spacing: {
        base: 20,
        scale: 1.6
      },
      borderRadius: 16,
      animations: {
        enabled: true,
        duration: 'slow',
        easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
      }
    },
    
    layout: {
      navigation: {
        type: 'navigation',
        logo: { text: '✨ Creative' },
        style: 'sticky',
        position: 'top',
        showSocialLinks: true,
        showThemeToggle: false,
        showLanguageSwitch: false,
        mobileMenuStyle: 'fullscreen'
      },
      footer: {
        type: 'footer',
        showSocialLinks: true,
        showCopyright: true,
        showBackToTop: true,
        customLinks: [
          { text: 'Blog', url: '/blog' },
          { text: 'Shop', url: '/shop' }
        ],
        layout: 'detailed'
      },
      maxWidth: '1400px',
      padding: '24px'
    },
    
    sections: [
      {
        id: 'hero-creative',
        type: 'hero',
        enabled: true,
        order: 1,
        name: 'Creative Artist',
        tagline: 'Visual Designer & Illustrator',
        description: 'Bringing ideas to life through stunning visuals and creative storytelling.',
        socialLinks: {
          instagram: 'https://instagram.com/username',
          dribbble: 'https://dribbble.com/username',
          behance: 'https://behance.net/username'
        },
        layout: 'split',
        backgroundType: 'particles',
        backgroundConfig: {
          particles: {
            density: 50,
            color: '#8b5cf6',
            connectLines: true
          }
        },
        animations: {
          entrance: 'bounce-in',
          hover: 'glow',
          stagger: true
        },
        theme: 'creative'
      }
    ]
  },
  
  {
    id: 'minimal-professional',
    name: 'Minimal Professional',
    description: 'Clean, minimal design perfect for business professionals',
    version: '1.0.0',
    author: 'Portfolio Generator',
    thumbnail: '/templates/minimal-professional.jpg',
    
    settings: {
      colorScheme: 'light',
      primaryColor: '#1f2937',
      secondaryColor: '#6b7280',
      fontFamily: 'Inter',
      fontSizes: {
        base: 16,
        scale: 1.1
      },
      spacing: {
        base: 16,
        scale: 1.4
      },
      borderRadius: 4,
      animations: {
        enabled: true,
        duration: 'fast',
        easing: 'ease-in-out'
      }
    },
    
    layout: {
      navigation: {
        type: 'navigation',
        logo: { text: 'Professional' },
        style: 'static',
        position: 'top',
        showSocialLinks: false,
        showThemeToggle: false,
        showLanguageSwitch: false,
        mobileMenuStyle: 'dropdown'
      },
      footer: {
        type: 'footer',
        showSocialLinks: false,
        showCopyright: true,
        showBackToTop: false,
        customLinks: [],
        layout: 'minimal'
      },
      maxWidth: '1000px',
      padding: '16px'
    },
    
    sections: [
      {
        id: 'hero-minimal',
        type: 'hero',
        enabled: true,
        order: 1,
        name: 'Professional Name',
        tagline: 'Business Consultant',
        description: 'Helping businesses grow through strategic planning and digital transformation.',
        socialLinks: {
          linkedin: 'https://linkedin.com/in/username',
          email: 'contact@professional.com'
        },
        layout: 'centered',
        backgroundType: 'gradient',
        backgroundConfig: {
          gradient: {
            from: '#f9fafb',
            to: '#f3f4f6',
            direction: 'to-b'
          }
        },
        animations: {
          entrance: 'fade-in',
          hover: 'parallax',
          stagger: false
        },
        theme: 'minimal'
      }
    ]
  }
]

// Template utilities
export const getTemplateById = (id: string): PortfolioTemplate | undefined => {
  return portfolioTemplates.find(template => template.id === id)
}

export const getTemplatesByCategory = (category: string): PortfolioTemplate[] => {
  // This could be extended to filter by categories when we add them
  return portfolioTemplates
}

export const createCustomTemplate = (baseTemplate: PortfolioTemplate, overrides: Partial<PortfolioTemplate>): PortfolioTemplate => {
  return {
    ...baseTemplate,
    ...overrides,
    id: overrides.id || `custom-${Date.now()}`,
    settings: {
      ...baseTemplate.settings,
      ...overrides.settings
    },
    layout: {
      ...baseTemplate.layout,
      ...overrides.layout
    },
    sections: overrides.sections || baseTemplate.sections
  }
}

export default {
  portfolioTemplates,
  getTemplateById,
  getTemplatesByCategory,
  createCustomTemplate
}