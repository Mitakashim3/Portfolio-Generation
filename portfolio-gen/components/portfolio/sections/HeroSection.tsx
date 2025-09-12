"use client"

import { ArrowDown, Github, Linkedin, Mail, Download } from "lucide-react"
import Button from "@/components/ui/Button"

interface HeroSectionProps {
  name?: string
  tagline?: string
  description?: string
  profileImage?: string
  socialLinks?: {
    github?: string
    linkedin?: string
    email?: string
  }
  resumeUrl?: string
  animations?: {
    entrance?: string
    hover?: string
    stagger?: boolean
  }
  theme?: 'default' | 'minimal' | 'creative' | 'professional'
  layout?: 'centered' | 'split' | 'full-width'
}

const themeStyles = {
  default: {
    container: "bg-gradient-to-br from-primary/5 via-background to-primary/10",
    text: "text-foreground",
    accent: "text-primary"
  },
  minimal: {
    container: "bg-background",
    text: "text-foreground",
    accent: "text-foreground"
  },
  creative: {
    container: "bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-red-500/10",
    text: "text-foreground",
    accent: "text-purple-600 dark:text-purple-400"
  },
  professional: {
    container: "bg-slate-50 dark:bg-slate-900",
    text: "text-slate-900 dark:text-slate-100",
    accent: "text-blue-600 dark:text-blue-400"
  }
}

const layoutStyles = {
  centered: "text-center items-center",
  split: "lg:text-left lg:items-start",
  'full-width': "text-left items-start"
}

export function HeroSection({
  name = "John Doe",
  tagline = "Full Stack Developer",
  description = "I create digital experiences that matter. Passionate about building scalable web applications and solving complex problems.",
  profileImage = "/api/placeholder/300/300",
  socialLinks = {},
  resumeUrl,
  animations = { entrance: "fade-in", hover: "scale-up", stagger: true },
  theme = 'default',
  layout = 'centered'
}: HeroSectionProps) {
  const styles = themeStyles[theme]
  const layoutClasses = layoutStyles[layout]

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

  return (
    <section className={`min-h-screen flex flex-col justify-center py-20 px-4 ${styles.container}`}>
      <div className="max-w-6xl mx-auto w-full">
        {layout === 'split' ? (
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className={`space-y-6 ${layoutClasses} ${getAnimationClass(animations.entrance)}`}>
              <div className="space-y-2">
                <h2 className={`text-lg font-medium ${styles.accent}`}>
                  Hello, I'm
                </h2>
                <h1 className={`text-4xl lg:text-6xl font-bold ${styles.text} ${getHoverClass(animations.hover)} transition-all duration-300`}>
                  {name}
                </h1>
                <h2 className={`text-2xl lg:text-3xl font-light ${styles.accent}`}>
                  {tagline}
                </h2>
              </div>

              <p className={`text-lg leading-relaxed max-w-lg ${styles.text} opacity-80`}>
                {description}
              </p>

              <div className="flex flex-wrap gap-4">
                {socialLinks.github && (
                  <Button variant="outline" size="sm" className={getHoverClass(animations.hover)}>
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </Button>
                )}
                {socialLinks.linkedin && (
                  <Button variant="outline" size="sm" className={getHoverClass(animations.hover)}>
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Button>
                )}
                {socialLinks.email && (
                  <Button variant="outline" size="sm" className={getHoverClass(animations.hover)}>
                    <Mail className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                )}
                {resumeUrl && (
                  <Button variant="primary" size="sm" className={getHoverClass(animations.hover)}>
                    <Download className="h-4 w-4 mr-2" />
                    Resume
                  </Button>
                )}
              </div>
            </div>

            {/* Image */}
            <div className="flex justify-center lg:justify-end">
              <div className={`relative ${getHoverClass(animations.hover)} transition-all duration-500`}>
                <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden bg-primary/10 border-4 border-primary/20">
                  <img
                    src={profileImage}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-xl -z-10 opacity-70" />
              </div>
            </div>
          </div>
        ) : (
          <div className={`text-center space-y-8 ${layoutClasses} ${getAnimationClass(animations.entrance)}`}>
            {/* Profile Image */}
            <div className="flex justify-center">
              <div className={`relative ${getHoverClass(animations.hover)} transition-all duration-500`}>
                <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden bg-primary/10 border-4 border-primary/20">
                  <img
                    src={profileImage}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-lg -z-10 opacity-70" />
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-4">
              <h2 className={`text-lg font-medium ${styles.accent}`}>
                Hello, I'm
              </h2>
              <h1 className={`text-4xl lg:text-6xl font-bold ${styles.text} ${getHoverClass(animations.hover)} transition-all duration-300`}>
                {name}
              </h1>
              <h2 className={`text-2xl lg:text-3xl font-light ${styles.accent}`}>
                {tagline}
              </h2>
            </div>

            <p className={`text-lg leading-relaxed max-w-2xl mx-auto ${styles.text} opacity-80`}>
              {description}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {socialLinks.github && (
                <Button variant="outline" size="sm" className={getHoverClass(animations.hover)}>
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </Button>
              )}
              {socialLinks.linkedin && (
                <Button variant="outline" size="sm" className={getHoverClass(animations.hover)}>
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </Button>
              )}
              {socialLinks.email && (
                <Button variant="outline" size="sm" className={getHoverClass(animations.hover)}>
                  <Mail className="h-4 w-4 mr-2" />
                  Contact
                </Button>
              )}
              {resumeUrl && (
                <Button variant="primary" size="sm" className={getHoverClass(animations.hover)}>
                  <Download className="h-4 w-4 mr-2" />
                  Resume
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className={`h-6 w-6 ${styles.accent}`} />
        </div>
      </div>
    </section>
  )
}