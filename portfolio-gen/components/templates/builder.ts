// Template configuration utilities and builders

import type { 
  PortfolioTemplate, 
  HeroTemplate, 
  AboutTemplate, 
  ProjectsTemplate,
  SkillsTemplate,
  ContactTemplate,
  BaseSection
} from './index'

// Animation preset configurations
export const animationPresets = {
  minimal: {
    entrance: 'fade-in' as const,
    hover: 'scale-up' as const,
    transition: 'smooth-fade' as const,
    microInteraction: 'button-ripple' as const,
    stagger: false
  },
  modern: {
    entrance: 'slide-up' as const,
    hover: 'shadow-pop' as const,
    transition: 'slide-transition' as const,
    microInteraction: 'icon-bounce' as const,
    stagger: true
  },
  creative: {
    entrance: 'zoom-in' as const,
    hover: 'glow' as const,
    transition: 'card-flip' as const,
    microInteraction: 'typewriter' as const,
    stagger: true
  },
  professional: {
    entrance: 'fade-in' as const,
    hover: 'parallax' as const,
    transition: 'smooth-fade' as const,
    microInteraction: 'progress-bar' as const,
    stagger: false
  }
}

// Color scheme presets
export const colorSchemes = {
  blue: {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    accent: '#06b6d4',
    background: '#f8fafc',
    text: '#1e293b'
  },
  purple: {
    primary: '#8b5cf6',
    secondary: '#ec4899',
    accent: '#f59e0b',
    background: '#faf5ff',
    text: '#1f2937'
  },
  green: {
    primary: '#10b981',
    secondary: '#059669',
    accent: '#84cc16',
    background: '#f0fdf4',
    text: '#1f2937'
  },
  monochrome: {
    primary: '#1f2937',
    secondary: '#6b7280',
    accent: '#9ca3af',
    background: '#ffffff',
    text: '#111827'
  },
  sunset: {
    primary: '#f59e0b',
    secondary: '#ef4444',
    accent: '#ec4899',
    background: '#fffbeb',
    text: '#1f2937'
  }
}

// Typography presets
export const typographyPresets = {
  modern: {
    fontFamily: 'Inter',
    headingFamily: 'Inter',
    sizes: { base: 16, scale: 1.125 }
  },
  classic: {
    fontFamily: 'Georgia',
    headingFamily: 'Merriweather',
    sizes: { base: 16, scale: 1.2 }
  },
  creative: {
    fontFamily: 'Poppins',
    headingFamily: 'Playfair Display',
    sizes: { base: 16, scale: 1.15 }
  },
  minimal: {
    fontFamily: 'System UI',
    headingFamily: 'System UI',
    sizes: { base: 16, scale: 1.1 }
  }
}

// Section templates with default configurations
export const sectionTemplates = {
  hero: {
    developer: (): HeroTemplate => ({
      id: 'hero-developer',
      type: 'hero',
      enabled: true,
      order: 1,
      name: 'Your Name',
      tagline: 'Full Stack Developer',
      description: 'Building modern web applications with cutting-edge technologies.',
      socialLinks: {
        github: '',
        linkedin: '',
        email: ''
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
      animations: animationPresets.modern,
      theme: 'default'
    }),
    
    designer: (): HeroTemplate => ({
      id: 'hero-designer',
      type: 'hero',
      enabled: true,
      order: 1,
      name: 'Your Name',
      tagline: 'UI/UX Designer',
      description: 'Creating beautiful and intuitive user experiences.',
      socialLinks: {
        dribbble: '',
        behance: '',
        instagram: ''
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
      animations: animationPresets.creative,
      theme: 'creative'
    }),
    
    consultant: (): HeroTemplate => ({
      id: 'hero-consultant',
      type: 'hero',
      enabled: true,
      order: 1,
      name: 'Your Name',
      tagline: 'Business Consultant',
      description: 'Helping businesses achieve their goals through strategic planning.',
      socialLinks: {
        linkedin: '',
        email: '',
        website: ''
      },
      layout: 'centered',
      backgroundType: 'image',
      backgroundConfig: {
        image: {
          url: '/placeholder-bg.jpg',
          overlay: true,
          overlayOpacity: 0.3
        }
      },
      animations: animationPresets.professional,
      theme: 'professional'
    })
  },

  about: {
    detailed: (): AboutTemplate => ({
      id: 'about-detailed',
      type: 'about',
      enabled: true,
      order: 2,
      title: 'About Me',
      description: 'Passionate professional with expertise in modern technologies.',
      stats: [
        { label: 'Years Experience', value: '3+', icon: 'briefcase' },
        { label: 'Projects Completed', value: '50+', icon: 'code' },
        { label: 'Happy Clients', value: '25+', icon: 'heart' }
      ],
      skills: ['React', 'TypeScript', 'Node.js', 'Python'],
      experience: [],
      education: [],
      layout: 'two-column',
      showStats: true,
      showSkills: true,
      showExperience: true,
      showEducation: true,
      animations: animationPresets.modern,
      theme: 'default'
    }),
    
    simple: (): AboutTemplate => ({
      id: 'about-simple',
      type: 'about',
      enabled: true,
      order: 2,
      title: 'About',
      description: 'Brief introduction about yourself and your work.',
      stats: [],
      skills: [],
      experience: [],
      education: [],
      layout: 'single-column',
      showStats: false,
      showSkills: false,
      showExperience: false,
      showEducation: false,
      animations: animationPresets.minimal,
      theme: 'minimal'
    })
  },

  projects: {
    showcase: (): ProjectsTemplate => ({
      id: 'projects-showcase',
      type: 'projects',
      enabled: true,
      order: 3,
      title: 'Featured Work',
      subtitle: 'A selection of projects I\'m proud to share.',
      projects: [],
      categories: ['All', 'Web', 'Mobile', 'Design'],
      showFilters: true,
      featuredOnly: false,
      layout: 'grid',
      columns: 3,
      showCategories: true,
      showTechnologies: true,
      showDates: true,
      animations: animationPresets.modern,
      theme: 'default'
    }),
    
    portfolio: (): ProjectsTemplate => ({
      id: 'projects-portfolio',
      type: 'projects',
      enabled: true,
      order: 3,
      title: 'Portfolio',
      subtitle: 'Creative work and case studies.',
      projects: [],
      categories: ['All', 'Branding', 'Web Design', 'Print'],
      showFilters: true,
      featuredOnly: true,
      layout: 'masonry',
      columns: 2,
      showCategories: true,
      showTechnologies: false,
      showDates: false,
      animations: animationPresets.creative,
      theme: 'creative'
    })
  },

  skills: {
    technical: (): SkillsTemplate => ({
      id: 'skills-technical',
      type: 'skills',
      enabled: true,
      order: 4,
      title: 'Technical Skills',
      subtitle: 'Technologies and tools I work with.',
      skillCategories: [
        {
          name: 'Frontend',
          skills: [
            { name: 'React', level: 90, icon: 'react', color: '#61dafb' },
            { name: 'TypeScript', level: 85, icon: 'typescript', color: '#3178c6' },
            { name: 'CSS', level: 80, icon: 'css', color: '#1572b6' }
          ]
        },
        {
          name: 'Backend',
          skills: [
            { name: 'Node.js', level: 85, icon: 'nodejs', color: '#339933' },
            { name: 'Python', level: 75, icon: 'python', color: '#3776ab' },
            { name: 'PostgreSQL', level: 70, icon: 'postgresql', color: '#336791' }
          ]
        }
      ],
      layout: 'bars',
      showLevels: true,
      showIcons: true,
      groupByCategory: true,
      animations: animationPresets.modern,
      theme: 'default'
    })
  },

  contact: {
    professional: (): ContactTemplate => ({
      id: 'contact-professional',
      type: 'contact',
      enabled: true,
      order: 5,
      title: 'Get In Touch',
      subtitle: 'Let\'s discuss your next project.',
      contactInfo: {
        email: 'contact@example.com',
        phone: '+1 (555) 123-4567',
        location: 'New York, NY',
        availability: 'Available for new projects'
      },
      socialLinks: {
        linkedin: '',
        github: ''
      },
      showContactForm: true,
      showMap: false,
      layout: 'split',
      animations: animationPresets.modern,
      theme: 'default'
    })
  }
}

// Template builder functions
export class TemplateBuilder {
  private template: Partial<PortfolioTemplate>

  constructor(name: string) {
    this.template = {
      id: `custom-${name.toLowerCase().replace(/\s+/g, '-')}`,
      name,
      description: `Custom ${name} portfolio`,
      version: '1.0.0',
      author: 'Portfolio Generator',
      sections: []
    }
  }

  setColorScheme(scheme: keyof typeof colorSchemes) {
    if (!this.template.settings) {
      this.template.settings = {
        colorScheme: 'system',
        primaryColor: '#3b82f6',
        secondaryColor: '#8b5cf6',
        fontFamily: 'Inter',
        fontSizes: { base: 16, scale: 1.125 },
        spacing: { base: 16, scale: 1.5 },
        borderRadius: 8,
        animations: {
          enabled: true,
          duration: 'normal',
          easing: 'ease-out'
        }
      }
    }
    
    const colors = colorSchemes[scheme]
    this.template.settings.primaryColor = colors.primary
    this.template.settings.secondaryColor = colors.secondary
    return this
  }

  setTypography(preset: keyof typeof typographyPresets) {
    if (!this.template.settings) {
      this.template.settings = {
        colorScheme: 'system',
        primaryColor: '#3b82f6',
        secondaryColor: '#8b5cf6',
        fontFamily: 'Inter',
        fontSizes: { base: 16, scale: 1.125 },
        spacing: { base: 16, scale: 1.5 },
        borderRadius: 8,
        animations: {
          enabled: true,
          duration: 'normal',
          easing: 'ease-out'
        }
      }
    }
    
    const typography = typographyPresets[preset]
    this.template.settings.fontFamily = typography.fontFamily
    this.template.settings.fontSizes = typography.sizes
    return this
  }

  setAnimations(preset: keyof typeof animationPresets) {
    if (!this.template.settings) {
      this.template.settings = {
        colorScheme: 'system',
        primaryColor: '#3b82f6',
        secondaryColor: '#8b5cf6',
        fontFamily: 'Inter',
        fontSizes: { base: 16, scale: 1.125 },
        spacing: { base: 16, scale: 1.5 },
        borderRadius: 8,
        animations: {
          enabled: true,
          duration: 'normal',
          easing: 'ease-out'
        }
      }
    }
    
    this.template.settings.animations.enabled = true
    return this
  }

  addSection(section: BaseSection) {
    if (!this.template.sections) {
      this.template.sections = []
    }
    this.template.sections.push(section as any)
    return this
  }

  addHero(type: keyof typeof sectionTemplates.hero) {
    return this.addSection(sectionTemplates.hero[type]())
  }

  addAbout(type: keyof typeof sectionTemplates.about) {
    return this.addSection(sectionTemplates.about[type]())
  }

  addProjects(type: keyof typeof sectionTemplates.projects) {
    return this.addSection(sectionTemplates.projects[type]())
  }

  addSkills() {
    return this.addSection(sectionTemplates.skills.technical())
  }

  addContact() {
    return this.addSection(sectionTemplates.contact.professional())
  }

  build(): PortfolioTemplate {
    // Set defaults if not configured
    if (!this.template.settings) {
      this.setColorScheme('blue').setTypography('modern')
    }
    
    if (!this.template.layout) {
      this.template.layout = {
        navigation: {
          type: 'navigation',
          logo: { text: this.template.name || 'Portfolio' },
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
      }
    }

    return this.template as PortfolioTemplate
  }
}

// Quick template generators
export const quickTemplates = {
  developer: () => new TemplateBuilder('Developer Portfolio')
    .setColorScheme('blue')
    .setTypography('modern')
    .addHero('developer')
    .addAbout('detailed')
    .addProjects('showcase')
    .addSkills()
    .addContact()
    .build(),

  designer: () => new TemplateBuilder('Creative Portfolio')
    .setColorScheme('purple')
    .setTypography('creative')
    .addHero('designer')
    .addAbout('simple')
    .addProjects('portfolio')
    .addContact()
    .build(),

  consultant: () => new TemplateBuilder('Professional Portfolio')
    .setColorScheme('monochrome')
    .setTypography('minimal')
    .addHero('consultant')
    .addAbout('detailed')
    .addContact()
    .build()
}

export default {
  animationPresets,
  colorSchemes,
  typographyPresets,
  sectionTemplates,
  quickTemplates,
  TemplateBuilder
}