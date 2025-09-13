"use client"

import { ExternalLink, Github, Calendar, Tag } from "lucide-react"
import Card from "@/components/ui/Card"
import Button from "@/components/ui/Button"

interface Project {
  id: string
  title: string
  description: string
  image?: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  category: string
  featured?: boolean
  date?: string
}

interface ProjectsSectionProps {
  title?: string
  subtitle?: string
  projects?: Project[]
  categories?: string[]
  showFilters?: boolean
  featuredOnly?: boolean
  animations?: {
    entrance?: string
    hover?: string
    stagger?: boolean
  }
  theme?: 'default' | 'minimal' | 'creative' | 'professional'
  layout?: 'grid' | 'masonry' | 'list'
  columns?: 2 | 3 | 4
}

const themeStyles = {
  default: {
    container: "bg-background",
    text: "text-foreground",
    accent: "text-primary",
    card: "bg-card border-border"
  },
  minimal: {
    container: "bg-background",
    text: "text-foreground", 
    accent: "text-foreground",
    card: "bg-background border-border/30"
  },
  creative: {
    container: "bg-gradient-to-b from-blue-50/50 to-indigo-50/50 dark:from-blue-900/10 dark:to-indigo-900/10",
    text: "text-foreground",
    accent: "text-blue-600 dark:text-blue-400",
    card: "bg-white/80 dark:bg-slate-800/80 border-blue-200/50 dark:border-blue-700/50"
  },
  professional: {
    container: "bg-slate-50 dark:bg-slate-900",
    text: "text-slate-900 dark:text-slate-100",
    accent: "text-blue-600 dark:text-blue-400",
    card: "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
  }
}

const defaultProjects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.",
    image: "/api/placeholder/400/250",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/user/project",
    category: "Web App",
    featured: true,
    date: "2024"
  },
  {
    id: "2", 
    title: "Task Management App",
    description: "Modern task management application with real-time collaboration features built using Next.js and Firebase.",
    image: "/api/placeholder/400/250",
    technologies: ["Next.js", "Firebase", "TypeScript", "Framer Motion"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/user/project",
    category: "Web App",
    featured: false,
    date: "2024"
  },
  {
    id: "3",
    title: "Weather Dashboard",
    description: "Beautiful weather dashboard with interactive charts and forecasts using React and external APIs.",
    image: "/api/placeholder/400/250", 
    technologies: ["React", "Chart.js", "OpenWeather API", "CSS Grid"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/user/project",
    category: "Dashboard",
    featured: true,
    date: "2023"
  }
]

export function ProjectsSection({
  title = "Featured Projects",
  subtitle = "A collection of projects that showcase my skills and passion for development.",
  projects = defaultProjects,
  categories = ["All", "Web App", "Dashboard", "Mobile", "API"],
  showFilters = true,
  featuredOnly = false,
  animations = { entrance: "fade-in", hover: "scale-up", stagger: true },
  theme = 'default',
  layout = 'grid',
  columns = 3
}: ProjectsSectionProps) {
  const styles = themeStyles[theme]
  
  const filteredProjects = featuredOnly 
    ? projects.filter(p => p.featured)
    : projects

  const getAnimationClass = (animationType: string | undefined) => {
    if (!animationType) return ""
    
    const animationMap: Record<string, string> = {
      "fade-in": "animate-fadeIn",
      "slide-up": "animate-slideUp",
      "slide-left": "animate-slideLeft",
      "slide-right": "animate-slideRight",
      "zoom-in": "animate-zoomIn",
      "rotate-in": "animate-rotateIn"
    }
    
    return animationMap[animationType] || ""
  }

  const getHoverClass = (hoverType: string | undefined) => {
    if (!hoverType) return ""
    
    const hoverMap: Record<string, string> = {
      "scale-up": "hover:scale-105",
      "scale-down": "hover:scale-95",
      "glow": "hover:shadow-2xl hover:shadow-primary/25",
      "shadow-pop": "hover:shadow-xl",
      "tilt": "hover:rotate-1",
      "parallax": "hover:translate-y-[-2px]"
    }
    
    return hoverMap[hoverType] || ""
  }

  const getGridClass = () => {
    const columnMap = {
      2: "grid-cols-1 lg:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3", 
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
    }
    return columnMap[columns]
  }

  const ProjectCard = ({ project }: { project: Project }) => (
    <Card className={`overflow-hidden ${styles.card} ${getHoverClass(animations.hover)} transition-all duration-500 group`}>
      {/* Project Image */}
      {project.image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            {project.liveUrl && (
              <Button variant="outline" size="sm" className="bg-white/90 text-black hover:bg-white">
                <ExternalLink className="h-4 w-4 mr-2" />
                Live Demo
              </Button>
            )}
            {project.githubUrl && (
              <Button variant="outline" size="sm" className="bg-white/90 text-black hover:bg-white">
                <Github className="h-4 w-4 mr-2" />
                Code
              </Button>
            )}
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Category & Date */}
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${styles.accent} bg-primary/10`}>
            <Tag className="h-3 w-3 mr-1" />
            {project.category}
          </span>
          {project.date && (
            <span className={`text-xs ${styles.text} opacity-60 flex items-center`}>
              <Calendar className="h-3 w-3 mr-1" />
              {project.date}
            </span>
          )}
        </div>

        {/* Title & Description */}
        <h3 className={`text-xl font-semibold ${styles.text} mb-2 group-hover:${styles.accent} transition-colors`}>
          {project.title}
        </h3>
        <p className={`${styles.text} opacity-80 text-sm mb-4 line-clamp-3`}>
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className={`px-2 py-1 rounded text-xs ${styles.text} bg-primary/5 border border-primary/20`}
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className={`px-2 py-1 rounded text-xs ${styles.text} opacity-60`}>
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          {project.liveUrl && (
            <Button variant="outline" size="sm" className="flex-1">
              <ExternalLink className="h-4 w-4 mr-2" />
              Live Demo
            </Button>
          )}
          {project.githubUrl && (
            <Button variant="ghost" size="sm" className="flex-1">
              <Github className="h-4 w-4 mr-2" />
              Code
            </Button>
          )}
        </div>
      </div>

      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-4 right-4">
          <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
            Featured
          </span>
        </div>
      )}
    </Card>
  )

  return (
    <section className={`py-20 px-4 ${styles.container}`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 ${getAnimationClass(animations.entrance)}`}>
          <h2 className={`text-3xl lg:text-4xl font-bold ${styles.text} mb-4`}>
            {title}
          </h2>
          <p className={`text-lg ${styles.text} opacity-80 max-w-3xl mx-auto`}>
            {subtitle}
          </p>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                size="sm"
                className={`${getHoverClass(animations.hover)} transition-all duration-300`}
              >
                {category}
              </Button>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        {layout === 'grid' ? (
          <div className={`grid ${getGridClass()} gap-8`}>
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={animations.stagger ? `animate-delay-${index * 100}` : ""}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        ) : layout === 'list' ? (
          <div className="space-y-8">
            {filteredProjects.map((project, index) => (
              <Card
                key={project.id}
                className={`${styles.card} ${getHoverClass(animations.hover)} transition-all duration-500 overflow-hidden ${animations.stagger ? `animate-delay-${index * 100}` : ""}`}
              >
                <div className="grid lg:grid-cols-2 gap-6">
                  {project.image && (
                    <div className="h-64 lg:h-auto">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${styles.accent} bg-primary/10`}>
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    
                    <h3 className={`text-2xl font-bold ${styles.text} mb-3`}>
                      {project.title}
                    </h3>
                    
                    <p className={`${styles.text} opacity-80 mb-4`}>
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded text-sm ${styles.text} bg-primary/5 border border-primary/20`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-3">
                      {project.liveUrl && (
                        <Button variant="primary" size="sm">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live Demo
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button variant="outline" size="sm">
                          <Github className="h-4 w-4 mr-2" />
                          View Code
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`break-inside-avoid ${animations.stagger ? `animate-delay-${index * 100}` : ""}`}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className={`${styles.text} opacity-80 mb-6`}>
            Want to see more projects or discuss a collaboration?
          </p>
          <Button variant="primary" size="lg" className={getHoverClass(animations.hover)}>
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  )
}