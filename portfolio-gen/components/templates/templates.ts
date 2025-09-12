// Main templates module - exports everything needed for portfolio generation

// Core template types and interfaces
export type {
  PortfolioTemplate,
  BaseSection,
  HeroTemplate,
  AboutTemplate,
  ProjectsTemplate,
  SkillsTemplate,
  ContactTemplate,
  NavigationTemplate,
  FooterTemplate
} from './index'

// Import types for use in this file
import type { PortfolioTemplate } from './index'

// Predefined templates
export { 
  portfolioTemplates, 
  getTemplateById, 
  getTemplatesByCategory, 
  createCustomTemplate 
} from './index'

// Template builder and utilities
export {
  animationPresets,
  colorSchemes,
  typographyPresets,
  sectionTemplates,
  quickTemplates,
  TemplateBuilder
} from './builder'

// Re-export animation types from utils
export type {
  AnimationType,
  HoverType,
  TransitionType,
  MicroInteractionType,
  AnimationConfig
} from '../animations/utils'

// Template categories for organization
export const templateCategories = {
  professional: ['minimal-professional', 'business-consultant'],
  creative: ['creative-portfolio', 'designer-showcase'],
  technical: ['modern-developer', 'full-stack-engineer'],
  academic: ['researcher-profile', 'student-portfolio']
}

// Template recommendations based on profession
export const getRecommendedTemplates = (profession: string): string[] => {
  const professionMap: Record<string, string[]> = {
    'developer': ['modern-developer'],
    'designer': ['creative-portfolio'],
    'consultant': ['minimal-professional'],
    'student': ['modern-developer', 'creative-portfolio'],
    'freelancer': ['creative-portfolio', 'modern-developer'],
    'entrepreneur': ['minimal-professional', 'modern-developer']
  }
  
  return professionMap[profession.toLowerCase()] || ['modern-developer']
}

// Template validation
export const validateTemplate = (template: PortfolioTemplate): { valid: boolean; errors: string[] } => {
  const errors: string[] = []
  
  if (!template.id) errors.push('Template ID is required')
  if (!template.name) errors.push('Template name is required')
  if (!template.sections || template.sections.length === 0) errors.push('At least one section is required')
  
  // Validate sections have unique IDs
  const sectionIds = template.sections?.map(s => s.id) || []
  const duplicateIds = sectionIds.filter((id, index) => sectionIds.indexOf(id) !== index)
  if (duplicateIds.length > 0) {
    errors.push(`Duplicate section IDs found: ${duplicateIds.join(', ')}`)
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}

// Template export/import utilities
export const exportTemplate = (template: PortfolioTemplate): string => {
  return JSON.stringify(template, null, 2)
}

export const importTemplate = (templateJson: string): PortfolioTemplate => {
  try {
    const template = JSON.parse(templateJson) as PortfolioTemplate
    const validation = validateTemplate(template)
    
    if (!validation.valid) {
      throw new Error(`Invalid template: ${validation.errors.join(', ')}`)
    }
    
    return template
  } catch (error) {
    throw new Error(`Failed to import template: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}