/**
 * Enhanced Component Sidebar for Portfolio Editor
 * Simplified version with fallback styling
 */

"use client"

import { useState } from "react"
import type { ComponentType } from "@/components/models/PortfolioConfig"

const COMPONENT_DEFINITIONS = {
  navbar: { label: "Navigation", description: "Logo + navigation links", category: "Layout" },
  hero: { label: "Hero Section", description: "Big banner with name, tagline, CTA", category: "Content" },
  about: { label: "About Me", description: "Profile image + bio", category: "Content" },
  skills: { label: "Skills", description: "List or grid with icons/badges", category: "Content" },
  projects: { label: "Projects", description: "Cards, carousel, or timeline", category: "Content" },
  experience: { label: "Experience", description: "Timeline or company cards", category: "Content" },
  education: { label: "Education", description: "Timeline or simple list", category: "Content" },
  testimonials: { label: "Testimonials", description: "Client quotes", category: "Social" },
  awards: { label: "Awards", description: "Badges or certificates list", category: "Content" },
  blog: { label: "Blog", description: "Latest posts", category: "Content" },
  gallery: { label: "Gallery", description: "Image grid or slider", category: "Media" },
  contact: { label: "Contact", description: "Form, email, or links", category: "Contact" },
  footer: { label: "Footer", description: "Social icons, copyright", category: "Layout" },
} as const

interface ComponentSidebarProps {
  selectedComponents: ComponentType[]
  onComponentsChange: (components: ComponentType[]) => void
  onFeedback?: (action: string, data: any) => void
}

export function ComponentSidebar({ selectedComponents, onComponentsChange, onFeedback }: ComponentSidebarProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = Array.from(new Set(Object.values(COMPONENT_DEFINITIONS).map(def => def.category)))

  const filteredComponents = Object.entries(COMPONENT_DEFINITIONS).filter(
    ([key, def]) => {
      const matchesSearch = def.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        def.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = !selectedCategory || def.category === selectedCategory
      return matchesSearch && matchesCategory
    }
  )

  const toggleComponent = (component: ComponentType) => {
    if (selectedComponents.includes(component)) {
      onComponentsChange(selectedComponents.filter((c) => c !== component))
      onFeedback?.('remove_component', { component })
    } else {
      onComponentsChange([...selectedComponents, component])
      onFeedback?.('add_component', { component })
    }
  }

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
      <div style={{ marginBottom: '16px' }}>
        {/* Header */}
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#111827' }}>
          Portfolio Components
        </h2>
        
        {/* Search */}
        <input
          type="text"
          placeholder="Search components..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="portfolio-input"
          style={{
            width: '100%',
            height: '40px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            padding: '0 12px',
            fontSize: '14px',
            marginBottom: '16px'
          }}
        />

        {/* Categories */}
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#374151' }}>
            Categories
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {categories.map((category) => (
              <span
                key={category}
                onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                className="portfolio-badge"
                style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  fontSize: '12px',
                  borderRadius: '16px',
                  border: '1px solid #d1d5db',
                  cursor: 'pointer',
                  backgroundColor: selectedCategory === category ? '#3b82f6' : '#f9fafb',
                  color: selectedCategory === category ? 'white' : '#374151',
                  transition: 'all 0.2s ease'
                }}
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        {/* Component List */}
        <div>
          {filteredComponents.map(([key, def]) => {
            const component = key as ComponentType
            const isSelected = selectedComponents.includes(component)

            return (
              <div
                key={component}
                onClick={() => toggleComponent(component)}
                className="portfolio-card"
                style={{
                  backgroundColor: isSelected ? '#eff6ff' : 'white',
                  border: `1px solid ${isSelected ? '#3b82f6' : '#e5e7eb'}`,
                  borderRadius: '8px',
                  padding: '16px',
                  marginBottom: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: '500', color: isSelected ? '#1d4ed8' : '#111827' }}>
                        {def.label}
                      </h3>
                      {isSelected && (
                        <span 
                          className="portfolio-badge default"
                          style={{
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            fontSize: '10px',
                            padding: '2px 6px',
                            borderRadius: '10px'
                          }}
                        >
                          Added
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '12px', color: isSelected ? '#1e40af' : '#6b7280', marginBottom: '4px' }}>
                      {def.description}
                    </p>
                    <span 
                      style={{
                        fontSize: '10px',
                        padding: '2px 6px',
                        backgroundColor: '#f3f4f6',
                        color: '#374151',
                        borderRadius: '10px',
                        border: '1px solid #d1d5db'
                      }}
                    >
                      {def.category}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleComponent(component)
                    }}
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '4px',
                      border: '1px solid #d1d5db',
                      backgroundColor: isSelected ? '#ef4444' : '#f9fafb',
                      color: isSelected ? 'white' : '#374151',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}
                  >
                    {isSelected ? '×' : '+'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Selected Components Summary */}
        {selectedComponents.length > 0 && (
          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#111827' }}>
              Selected Components ({selectedComponents.length})
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {selectedComponents.map((component) => (
                <span
                  key={component}
                  onClick={() => toggleComponent(component)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 8px',
                    fontSize: '12px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#ef4444'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#3b82f6'
                  }}
                >
                  {COMPONENT_DEFINITIONS[component].label}
                  <span style={{ fontSize: '10px' }}>×</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}