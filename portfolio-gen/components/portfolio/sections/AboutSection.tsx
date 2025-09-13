"use client"

import { User, Code, Briefcase, GraduationCap } from "lucide-react"
import Card from "@/components/ui/Card"

interface AboutSectionProps {
  title?: string
  description?: string
  stats?: Array<{
    label: string
    value: string
    icon?: string
  }>
  skills?: string[]
  experience?: Array<{
    title: string
    company: string
    period: string
    description: string
  }>
  education?: Array<{
    degree: string
    institution: string
    period: string
  }>
  animations?: {
    entrance?: string
    hover?: string
    stagger?: boolean
  }
  theme?: 'default' | 'minimal' | 'creative' | 'professional'
  layout?: 'single-column' | 'two-column' | 'grid'
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
    container: "bg-gradient-to-b from-purple-50/50 to-pink-50/50 dark:from-purple-900/10 dark:to-pink-900/10",
    text: "text-foreground",
    accent: "text-purple-600 dark:text-purple-400",
    card: "bg-white/80 dark:bg-slate-800/80 border-purple-200/50 dark:border-purple-700/50"
  },
  professional: {
    container: "bg-slate-50 dark:bg-slate-900",
    text: "text-slate-900 dark:text-slate-100",
    accent: "text-blue-600 dark:text-blue-400",
    card: "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
  }
}

export function AboutSection({
  title = "About Me",
  description = "I'm a passionate developer with experience in modern web technologies. I love creating solutions that make a difference and constantly learning new technologies to improve my craft.",
  stats = [
    { label: "Years Experience", value: "3+", icon: "briefcase" },
    { label: "Projects Completed", value: "50+", icon: "code" },
    { label: "Technologies", value: "15+", icon: "cpu" }
  ],
  skills = ["React", "TypeScript", "Node.js", "Python", "PostgreSQL", "AWS"],
  experience = [
    {
      title: "Senior Frontend Developer",
      company: "Tech Corp",
      period: "2022 - Present",
      description: "Led development of scalable React applications serving 100k+ users."
    },
    {
      title: "Full Stack Developer",
      company: "StartupXYZ",
      period: "2020 - 2022",
      description: "Built end-to-end web applications using modern tech stack."
    }
  ],
  education = [
    {
      degree: "Bachelor of Computer Science",
      institution: "University of Technology",
      period: "2016 - 2020"
    }
  ],
  animations = { entrance: "fade-in", hover: "scale-up", stagger: true },
  theme = 'default',
  layout = 'two-column'
}: AboutSectionProps) {
  const styles = themeStyles[theme]

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

  const getIcon = (iconName: string) => {
    const icons: Record<string, any> = {
      briefcase: Briefcase,
      code: Code,
      cpu: Code,
      user: User,
      graduation: GraduationCap
    }
    
    const IconComponent = icons[iconName] || Code
    return <IconComponent className="h-6 w-6" />
  }

  return (
    <section className={`py-20 px-4 ${styles.container}`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 ${getAnimationClass(animations.entrance)}`}>
          <h2 className={`text-3xl lg:text-4xl font-bold ${styles.text} mb-4`}>
            {title}
          </h2>
          <p className={`text-lg ${styles.text} opacity-80 max-w-3xl mx-auto`}>
            {description}
          </p>
        </div>

        {layout === 'grid' ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Stats */}
            <div className="space-y-6">
              <h3 className={`text-xl font-semibold ${styles.text} mb-4`}>Statistics</h3>
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className={`p-4 ${styles.card} ${getHoverClass(animations.hover)} transition-all duration-300`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`${styles.accent}`}>
                      {getIcon(stat.icon || 'code')}
                    </div>
                    <div>
                      <div className={`text-2xl font-bold ${styles.text}`}>{stat.value}</div>
                      <div className={`text-sm ${styles.text} opacity-60`}>{stat.label}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Skills */}
            <div className="space-y-6">
              <h3 className={`text-xl font-semibold ${styles.text} mb-4`}>Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full ${styles.card} ${styles.text} text-sm ${getHoverClass(animations.hover)} transition-all duration-300`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience & Education */}
            <div className="space-y-6">
              <h3 className={`text-xl font-semibold ${styles.text} mb-4`}>Experience</h3>
              {experience.slice(0, 2).map((exp, index) => (
                <Card
                  key={index}
                  className={`p-4 ${styles.card} ${getHoverClass(animations.hover)} transition-all duration-300`}
                >
                  <h4 className={`font-semibold ${styles.text}`}>{exp.title}</h4>
                  <p className={`text-sm ${styles.accent} mb-2`}>{exp.company} • {exp.period}</p>
                  <p className={`text-sm ${styles.text} opacity-80`}>{exp.description}</p>
                </Card>
              ))}
            </div>
          </div>
        ) : layout === 'two-column' ? (
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Stats */}
              <div>
                <h3 className={`text-xl font-semibold ${styles.text} mb-6`}>At a Glance</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
                  {stats.map((stat, index) => (
                    <Card
                      key={index}
                      className={`p-4 ${styles.card} ${getHoverClass(animations.hover)} transition-all duration-300`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`${styles.accent}`}>
                          {getIcon(stat.icon || 'code')}
                        </div>
                        <div>
                          <div className={`text-2xl font-bold ${styles.text}`}>{stat.value}</div>
                          <div className={`text-sm ${styles.text} opacity-60`}>{stat.label}</div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className={`text-xl font-semibold ${styles.text} mb-6`}>Skills & Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className={`px-3 py-2 rounded-full ${styles.card} ${styles.text} text-sm ${getHoverClass(animations.hover)} transition-all duration-300 border`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Experience */}
              <div>
                <h3 className={`text-xl font-semibold ${styles.text} mb-6`}>Experience</h3>
                <div className="space-y-4">
                  {experience.map((exp, index) => (
                    <Card
                      key={index}
                      className={`p-6 ${styles.card} ${getHoverClass(animations.hover)} transition-all duration-300`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`${styles.accent} mt-1`}>
                          <Briefcase className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-semibold ${styles.text} mb-1`}>{exp.title}</h4>
                          <p className={`text-sm ${styles.accent} mb-2`}>{exp.company} • {exp.period}</p>
                          <p className={`text-sm ${styles.text} opacity-80`}>{exp.description}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Education */}
              {education.length > 0 && (
                <div>
                  <h3 className={`text-xl font-semibold ${styles.text} mb-6`}>Education</h3>
                  <div className="space-y-4">
                    {education.map((edu, index) => (
                      <Card
                        key={index}
                        className={`p-6 ${styles.card} ${getHoverClass(animations.hover)} transition-all duration-300`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`${styles.accent} mt-1`}>
                            <GraduationCap className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <h4 className={`font-semibold ${styles.text} mb-1`}>{edu.degree}</h4>
                            <p className={`text-sm ${styles.accent}`}>{edu.institution} • {edu.period}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className={`p-6 text-center ${styles.card} ${getHoverClass(animations.hover)} transition-all duration-300`}
                >
                  <div className={`${styles.accent} flex justify-center mb-3`}>
                    {getIcon(stat.icon || 'code')}
                  </div>
                  <div className={`text-3xl font-bold ${styles.text} mb-1`}>{stat.value}</div>
                  <div className={`text-sm ${styles.text} opacity-60`}>{stat.label}</div>
                </Card>
              ))}
            </div>

            {/* Skills */}
            <div className="text-center">
              <h3 className={`text-xl font-semibold ${styles.text} mb-6`}>Skills & Technologies</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className={`px-4 py-2 rounded-full ${styles.card} ${styles.text} ${getHoverClass(animations.hover)} transition-all duration-300 border`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience & Education */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className={`text-xl font-semibold ${styles.text} mb-6`}>Experience</h3>
                <div className="space-y-4">
                  {experience.map((exp, index) => (
                    <Card
                      key={index}
                      className={`p-6 ${styles.card} ${getHoverClass(animations.hover)} transition-all duration-300`}
                    >
                      <h4 className={`font-semibold ${styles.text} mb-1`}>{exp.title}</h4>
                      <p className={`text-sm ${styles.accent} mb-2`}>{exp.company} • {exp.period}</p>
                      <p className={`text-sm ${styles.text} opacity-80`}>{exp.description}</p>
                    </Card>
                  ))}
                </div>
              </div>

              {education.length > 0 && (
                <div>
                  <h3 className={`text-xl font-semibold ${styles.text} mb-6`}>Education</h3>
                  <div className="space-y-4">
                    {education.map((edu, index) => (
                      <Card
                        key={index}
                        className={`p-6 ${styles.card} ${getHoverClass(animations.hover)} transition-all duration-300`}
                      >
                        <h4 className={`font-semibold ${styles.text} mb-1`}>{edu.degree}</h4>
                        <p className={`text-sm ${styles.accent}`}>{edu.institution} • {edu.period}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}