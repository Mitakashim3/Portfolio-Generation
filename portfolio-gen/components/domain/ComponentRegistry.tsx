import React from 'react';
import { 
  LucideIcon, 
  Monitor, 
  Palette, 
  Briefcase, 
  GraduationCap, 
  Heart, 
  PenTool,
  User,
  Home,
  Phone,
  MessageSquare,
  Download,
  Settings,
  Rocket,
  Trophy,
  Unlock,
  FileText,
  Image,
  Drama,
  Handshake,
  Building,
  Paintbrush,
  DollarSign,
  BarChart,
  Target,
  Code,
  Camera,
  Bookmark,
  Award,
  FlaskConical,
  Stethoscope,
  Pill,
  FileEdit,
  TargetIcon,
  Pen,
  Hospital,
  ClipboardPlus,
  Scroll,
  BookOpen,
  Mic,
  Zap
} from 'lucide-react';

export interface ComponentInfo {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  fields: string[]; // Which portfolio fields can use this component
  isUniversal?: boolean; // Can be used across all fields
  icon: LucideIcon;
}

// Define all available portfolio fields
export const PORTFOLIO_FIELDS = {
  'tech-software': {
    name: 'Technology & Software',
    description: 'For developers, engineers, and tech professionals',
    color: '#3b82f6',
    icon: Monitor
  },
  'creative-design': {
    name: 'Creative & Design',
    description: 'For artists, designers, and creative professionals',
    color: '#8b5cf6',
    icon: Palette
  },
  'business-sales': {
    name: 'Business & Sales',
    description: 'For business professionals, marketers, and sales experts',
    color: '#059669',
    icon: Briefcase
  },
  'academic-research': {
    name: 'Academic & Research',
    description: 'For researchers, professors, and academic professionals',
    color: '#dc2626',
    icon: GraduationCap
  },
  'healthcare-medical': {
    name: 'Healthcare & Medical',
    description: 'For doctors, nurses, and healthcare professionals',
    color: '#0ea5e9',
    icon: Heart
  },
  'writing-journalism': {
    name: 'Writing & Journalism',
    description: 'For writers, journalists, and content creators',
    color: '#f59e0b',
    icon: PenTool
  },
  'general': {
    name: 'General Professional',
    description: 'For any professional portfolio',
    color: '#6b7280',
    icon: User
  }
} as const;

export type PortfolioField = keyof typeof PORTFOLIO_FIELDS;

// Universal components that all fields can use
export const UNIVERSAL_COMPONENTS: ComponentInfo[] = [
  {
    id: 'hero',
    name: 'Hero Section',
    description: 'Introduction with name, title, and call-to-action',
    category: 'Introduction',
    tags: ['header', 'intro', 'landing'],
    fields: Object.keys(PORTFOLIO_FIELDS),
    isUniversal: true,
    icon: Home
  },
  {
    id: 'about',
    name: 'About Me',
    description: 'Personal story, background, and personality',
    category: 'Personal',
    tags: ['personal', 'story', 'background'],
    fields: Object.keys(PORTFOLIO_FIELDS),
    isUniversal: true,
    icon: User
  },
  {
    id: 'contact',
    name: 'Contact',
    description: 'Contact information and social links',
    category: 'Contact',
    tags: ['contact', 'social', 'links'],
    fields: Object.keys(PORTFOLIO_FIELDS),
    isUniversal: true,
    icon: Phone
  },
  {
    id: 'testimonials',
    name: 'Testimonials',
    description: 'Client and colleague recommendations',
    category: 'Social Proof',
    tags: ['testimonials', 'reviews', 'social-proof'],
    fields: Object.keys(PORTFOLIO_FIELDS),
    isUniversal: true,
    icon: MessageSquare
  },
  {
    id: 'footer',
    name: 'Footer',
    description: 'Footer with copyright and additional links',
    category: 'Layout',
    tags: ['footer', 'copyright', 'links'],
    fields: Object.keys(PORTFOLIO_FIELDS),
    isUniversal: true,
    icon: Download
  }
];

// Field-specific components
export const FIELD_SPECIFIC_COMPONENTS: Record<PortfolioField, ComponentInfo[]> = {
  'tech-software': [
    {
      id: 'tech-skills',
      name: 'Technical Skills',
      description: 'Programming languages, frameworks, and tools',
      category: 'Skills',
      tags: ['skills', 'programming', 'frameworks', 'tools'],
      fields: ['tech-software'],
      icon: Settings
    },
    {
      id: 'projects',
      name: 'Projects',
      description: 'Code projects with GitHub links and live demos',
      category: 'Work',
      tags: ['projects', 'github', 'code', 'demos'],
      fields: ['tech-software'],
      icon: Rocket
    },
    {
      id: 'experience',
      name: 'Work Experience',
      description: 'Professional work history and achievements',
      category: 'Professional',
      tags: ['experience', 'work', 'career'],
      fields: ['tech-software', 'business-sales', 'healthcare-medical'],
      icon: Briefcase
    },
    {
      id: 'certifications',
      name: 'Certifications',
      description: 'Technical certifications and completed courses',
      category: 'Credentials',
      tags: ['certifications', 'courses', 'learning'],
      fields: ['tech-software', 'healthcare-medical'],
      icon: Trophy
    },
    {
      id: 'open-source',
      name: 'Open Source',
      description: 'Open source contributions and maintained projects',
      category: 'Contributions',
      tags: ['open-source', 'github', 'contributions'],
      fields: ['tech-software'],
      icon: Unlock
    },
    {
      id: 'tech-blog',
      name: 'Tech Blog',
      description: 'Technical articles and tutorials',
      category: 'Content',
      tags: ['blog', 'articles', 'tutorials'],
      fields: ['tech-software', 'writing-journalism'],
      icon: FileText
    }
  ],
  'creative-design': [
    {
      id: 'gallery',
      name: 'Portfolio Gallery',
      description: 'Showcase of creative work with categories',
      category: 'Showcase',
      tags: ['gallery', 'portfolio', 'visual', 'artwork'],
      fields: ['creative-design'],
      icon: Image
    },
    {
      id: 'creative-process',
      name: 'Creative Process',
      description: 'Behind-the-scenes workflow and methodology',
      category: 'Process',
      tags: ['process', 'workflow', 'methodology'],
      fields: ['creative-design'],
      icon: Drama
    },
    {
      id: 'client-work',
      name: 'Client Work',
      description: 'Commissioned pieces and case studies',
      category: 'Professional',
      tags: ['clients', 'commissioned', 'case-studies'],
      fields: ['creative-design', 'business-sales'],
      icon: Handshake
    },
    {
      id: 'exhibitions',
      name: 'Exhibitions',
      description: 'Shows, galleries, and publications',
      category: 'Recognition',
      tags: ['exhibitions', 'shows', 'galleries'],
      fields: ['creative-design', 'academic-research'],
      icon: Building
    },
    {
      id: 'creative-skills',
      name: 'Creative Skills',
      description: 'Software proficiency and artistic techniques',
      category: 'Skills',
      tags: ['skills', 'software', 'techniques'],
      fields: ['creative-design'],
      icon: Paintbrush
    },
    {
      id: 'services',
      name: 'Services',
      description: 'Services and offerings for potential clients',
      category: 'Business',
      tags: ['services', 'offerings', 'pricing'],
      fields: ['creative-design', 'business-sales'],
      icon: DollarSign
    }
  ],
  'business-sales': [
    {
      id: 'experience',
      name: 'Professional Experience',
      description: 'Career progression and key achievements',
      category: 'Professional',
      tags: ['experience', 'career', 'achievements'],
      fields: ['business-sales', 'tech-software', 'healthcare-medical'],
      icon: Briefcase
    },
    {
      id: 'case-studies',
      name: 'Case Studies',
      description: 'Successful campaigns and measurable results',
      category: 'Results',
      tags: ['case-studies', 'campaigns', 'results'],
      fields: ['business-sales', 'creative-design'],
      icon: BarChart
    },
    {
      id: 'clients-results',
      name: 'Clients & Results',
      description: 'Client logos, testimonials, and key metrics',
      category: 'Social Proof',
      tags: ['clients', 'results', 'metrics'],
      fields: ['business-sales'],
      icon: Target
    },
    {
      id: 'awards',
      name: 'Awards & Recognition',
      description: 'Industry awards and speaking engagements',
      category: 'Recognition',
      tags: ['awards', 'recognition', 'speaking'],
      fields: ['business-sales', 'academic-research', 'creative-design'],
      icon: Award
    },
    {
      id: 'education',
      name: 'Education',
      description: 'Degrees, business courses, and training',
      category: 'Education',
      tags: ['education', 'degrees', 'training'],
      fields: ['business-sales', 'academic-research', 'healthcare-medical'],
      icon: GraduationCap
    }
  ],
  'academic-research': [
    {
      id: 'research',
      name: 'Research Projects',
      description: 'Current and past research initiatives',
      category: 'Research',
      tags: ['research', 'projects', 'studies'],
      fields: ['academic-research'],
      icon: FlaskConical
    },
    {
      id: 'publications',
      name: 'Publications',
      description: 'Academic papers, journals, and citations',
      category: 'Publications',
      tags: ['publications', 'papers', 'journals'],
      fields: ['academic-research', 'healthcare-medical', 'writing-journalism'],
      icon: FileEdit
    },
    {
      id: 'education',
      name: 'Education',
      description: 'Degrees, institutions, and academic honors',
      category: 'Education',
      tags: ['education', 'degrees', 'honors'],
      fields: ['academic-research', 'business-sales', 'healthcare-medical'],
      icon: GraduationCap
    },
    {
      id: 'teaching',
      name: 'Teaching',
      description: 'Courses taught and student feedback',
      category: 'Teaching',
      tags: ['teaching', 'courses', 'students'],
      fields: ['academic-research'],
      icon: PenTool
    },
    {
      id: 'grants-funding',
      name: 'Grants & Funding',
      description: 'Research funding and grant awards',
      category: 'Funding',
      tags: ['grants', 'funding', 'awards'],
      fields: ['academic-research'],
      icon: DollarSign
    },
    {
      id: 'conferences',
      name: 'Conference Presentations',
      description: 'Speaking engagements and presentations',
      category: 'Speaking',
      tags: ['conferences', 'presentations', 'speaking'],
      fields: ['academic-research', 'business-sales'],
      icon: MessageSquare
    }
  ],
  'healthcare-medical': [
    {
      id: 'experience',
      name: 'Professional Experience',
      description: 'Hospital affiliations and medical positions',
      category: 'Professional',
      tags: ['experience', 'hospital', 'medical'],
      fields: ['healthcare-medical', 'business-sales'],
      icon: Hospital
    },
    {
      id: 'specializations',
      name: 'Medical Specializations',
      description: 'Areas of medical expertise and specialties',
      category: 'Expertise',
      tags: ['specializations', 'expertise', 'medical'],
      fields: ['healthcare-medical'],
      icon: ClipboardPlus
    },
    {
      id: 'education',
      name: 'Medical Education',
      description: 'Medical school, residency, and fellowships',
      category: 'Education',
      tags: ['education', 'medical-school', 'residency'],
      fields: ['healthcare-medical', 'academic-research'],
      icon: GraduationCap
    },
    {
      id: 'certifications',
      name: 'Certifications & Licenses',
      description: 'Board certifications and state licenses',
      category: 'Credentials',
      tags: ['certifications', 'licenses', 'board'],
      fields: ['healthcare-medical', 'tech-software'],
      icon: Scroll
    },
    {
      id: 'publications',
      name: 'Medical Publications',
      description: 'Medical journal articles and research papers',
      category: 'Publications',
      tags: ['publications', 'research', 'medical'],
      fields: ['healthcare-medical', 'academic-research'],
      icon: FileEdit
    },
    {
      id: 'patient-testimonials',
      name: 'Patient Success Stories',
      description: 'Anonymous patient success stories and outcomes',
      category: 'Results',
      tags: ['patients', 'success', 'outcomes'],
      fields: ['healthcare-medical'],
      icon: Heart
    }
  ],
  'writing-journalism': [
    {
      id: 'published-works',
      name: 'Published Works',
      description: 'Books, articles, and published stories',
      category: 'Portfolio',
      tags: ['published', 'books', 'articles'],
      fields: ['writing-journalism'],
      icon: BookOpen
    },
    {
      id: 'writing-samples',
      name: 'Writing Samples',
      description: 'Excerpts and full pieces of work',
      category: 'Samples',
      tags: ['samples', 'excerpts', 'writing'],
      fields: ['writing-journalism'],
      icon: Pen
    },
    {
      id: 'publications',
      name: 'Publication Credits',
      description: 'Magazines, newspapers, and websites published in',
      category: 'Credits',
      tags: ['publications', 'credits', 'media'],
      fields: ['writing-journalism', 'academic-research'],
      icon: FileEdit
    },
    {
      id: 'awards',
      name: 'Writing Awards',
      description: 'Writing competitions and literary honors',
      category: 'Recognition',
      tags: ['awards', 'competitions', 'honors'],
      fields: ['writing-journalism', 'creative-design'],
      icon: Award
    },
    {
      id: 'speaking-engagements',
      name: 'Speaking & Events',
      description: 'Readings, workshops, and literary events',
      category: 'Events',
      tags: ['speaking', 'readings', 'workshops'],
      fields: ['writing-journalism', 'academic-research'],
      icon: Mic
    },
    {
      id: 'blog',
      name: 'Blog & Articles',
      description: 'Personal blog and freelance articles',
      category: 'Content',
      tags: ['blog', 'articles', 'freelance'],
      fields: ['writing-journalism', 'tech-software'],
      icon: FileText
    }
  ],
  'general': [
    {
      id: 'experience',
      name: 'Work Experience',
      description: 'Professional work history and achievements',
      category: 'Professional',
      tags: ['experience', 'work', 'career'],
      fields: ['general'],
      icon: Briefcase
    },
    {
      id: 'skills',
      name: 'Skills',
      description: 'Professional skills and competencies',
      category: 'Skills',
      tags: ['skills', 'competencies', 'abilities'],
      fields: ['general'],
      icon: Zap
    },
    {
      id: 'education',
      name: 'Education',
      description: 'Educational background and qualifications',
      category: 'Education',
      tags: ['education', 'qualifications', 'degrees'],
      fields: ['general'],
      icon: GraduationCap
    },
    {
      id: 'portfolio',
      name: 'Portfolio',
      description: 'Showcase of work and achievements',
      category: 'Showcase',
      tags: ['portfolio', 'work', 'showcase'],
      fields: ['general'],
      icon: FileText
    }
  ]
};

// Get components for a specific field
export function getComponentsForField(field: PortfolioField): ComponentInfo[] {
  const universal = UNIVERSAL_COMPONENTS;
  const fieldSpecific = FIELD_SPECIFIC_COMPONENTS[field] || [];
  
  // Also include components from other fields that are marked as compatible
  const crossFieldComponents = Object.values(FIELD_SPECIFIC_COMPONENTS)
    .flat()
    .filter(component => 
      component.fields.includes(field) && 
      !fieldSpecific.some(fc => fc.id === component.id)
    );
  
  return [...universal, ...fieldSpecific, ...crossFieldComponents];
}

// Get all components
export function getAllComponents(): ComponentInfo[] {
  const universal = UNIVERSAL_COMPONENTS;
  const allFieldSpecific = Object.values(FIELD_SPECIFIC_COMPONENTS).flat();
  
  // Remove duplicates by id
  const seen = new Set();
  return [...universal, ...allFieldSpecific].filter(component => {
    if (seen.has(component.id)) {
      return false;
    }
    seen.add(component.id);
    return true;
  });
}

// Get components by category
export function getComponentsByCategory(field: PortfolioField): Record<string, ComponentInfo[]> {
  const components = getComponentsForField(field);
  const grouped: Record<string, ComponentInfo[]> = {};
  
  components.forEach(component => {
    if (!grouped[component.category]) {
      grouped[component.category] = [];
    }
    grouped[component.category].push(component);
  });
  
  return grouped;
}

// Search components
export function searchComponents(query: string, field?: PortfolioField): ComponentInfo[] {
  const components = field ? getComponentsForField(field) : getAllComponents();
  const lowercaseQuery = query.toLowerCase();
  
  return components.filter(component =>
    component.name.toLowerCase().includes(lowercaseQuery) ||
    component.description.toLowerCase().includes(lowercaseQuery) ||
    component.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}
