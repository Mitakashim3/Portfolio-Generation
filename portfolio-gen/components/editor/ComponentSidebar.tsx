"use client"

import { useState } from "react"
import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import Input from "@/components/ui/Input"
import {
  Layout,
  User,
  Award,
  Briefcase,
  GraduationCap,
  MessageSquare,
  Trophy,
  BookOpen,
  ImageIcon,
  Mail,
  Navigation,
  Sparkles,
  Search,
  Plus,
  X,
} from "lucide-react"
import type { ComponentType } from "@/components/models/PortfolioConfig"

const COMPONENT_DEFINITIONS = {
  navbar: { icon: Navigation, label: "Navigation", description: "Logo + navigation links" },
  hero: { icon: Sparkles, label: "Hero Section", description: "Big banner with name, tagline, CTA" },
  about: { icon: User, label: "About Me", description: "Profile image + bio" },
  skills: { icon: Award, label: "Skills", description: "List or grid with icons/badges" },
  projects: { icon: Briefcase, label: "Projects", description: "Cards, carousel, or timeline" },
  experience: { icon: Briefcase, label: "Experience", description: "Timeline or company cards" },
  education: { icon: GraduationCap, label: "Education", description: "Timeline or simple list" },
  testimonials: { icon: MessageSquare, label: "Testimonials", description: "Client quotes" },
  awards: { icon: Trophy, label: "Awards", description: "Badges or certificates list" },
  blog: { icon: BookOpen, label: "Blog", description: "Latest posts" },
  gallery: { icon: ImageIcon, label: "Gallery", description: "Image grid or slider" },
  contact: { icon: Mail, label: "Contact", description: "Form, email, or links" },
  footer: { icon: Layout, label: "Footer", description: "Social icons, copyright" },
} as const

interface ComponentSidebarProps {
  selectedComponents: ComponentType[]
  onComponentsChange: (components: ComponentType[]) => void
  onFeedback: (action: string, data: any) => void
}

export function ComponentSidebar({ selectedComponents, onComponentsChange, onFeedback }: ComponentSidebarProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredComponents = Object.entries(COMPONENT_DEFINITIONS).filter(
    ([key, def]) =>
      def.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      def.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleComponent = (component: ComponentType) => {
    if (selectedComponents.includes(component)) {
      onComponentsChange(selectedComponents.filter((c) => c !== component))
      onFeedback('remove_component', { component })
    } else {
      onComponentsChange([...selectedComponents, component])
      onFeedback('add_component', { component })
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 p-4 pb-2">
        <h2 className="text-lg font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
          Portfolio Components
        </h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search components..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="liquid-input pl-9"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="space-y-3">
          {filteredComponents.map(([key, def]) => {
            const component = key as ComponentType
            const isSelected = selectedComponents.includes(component)
            const Icon = def.icon

            return (
              <Card
                key={component}
                className={`
                  p-4 cursor-pointer transition-all duration-300 hover:scale-105
                  ${
                    isSelected
                      ? "liquid-card bg-gradient-to-br from-primary/20 to-accent/10 border-primary/30 shadow-lg shadow-primary/10"
                      : "liquid-card hover:bg-gradient-to-br hover:from-primary/5 hover:to-accent/5 hover:shadow-md"
                  }
                `}
                onClick={() => toggleComponent(component)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <Icon
                      className={`h-5 w-5 mt-0.5 transition-colors duration-300 ${
                        isSelected ? "text-primary" : "text-foreground"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-medium text-sm ${isSelected ? "text-foreground font-semibold" : "text-foreground"}`}>
                          {def.label}
                        </h3>
                        {isSelected && (
                          <Badge variant="default" className="text-xs">
                            Added
                          </Badge>
                        )}
                      </div>
                      <p
                        className={`text-xs transition-colors duration-300 ${
                          isSelected ? "text-foreground/80" : "text-muted-foreground"
                        }`}
                      >
                        {def.description}
                      </p>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant={isSelected ? "secondary" : "ghost"}
                    className={`ml-2 h-6 w-6 p-0 rounded-full transition-all duration-300 ${
                      isSelected ? "bg-gradient-to-r from-primary/20 to-accent/20" : "hover:bg-primary/10"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleComponent(component)
                    }}
                  >
                    {isSelected ? <X className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>

        {selectedComponents.length > 0 && (
          <div className="pt-4 mt-4 border-t border-sidebar-border">
            <h3 className="text-sm font-medium text-sidebar-foreground mb-2">
              Selected Components ({selectedComponents.length})
            </h3>
            <div className="flex flex-wrap gap-1">
              {selectedComponents.map((component) => (
                <Badge
                  key={component}
                  variant="default"
                  className="text-xs cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => toggleComponent(component)}
                >
                  {COMPONENT_DEFINITIONS[component].label}
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}