'use client'

import { useState } from 'react'
import { ComponentSidebar } from './ComponentSidebar'
import { ContentEditor } from './ContentEditor'
import { CollapsibleAnimationControls } from './CollapsibleAnimationControls'
import Button from '@/components/ui/Button'
import { 
  Layers, 
  Edit3, 
  Sparkles
} from 'lucide-react'
import { 
  PortfolioConfig, 
  ComponentType, 
  AnimationType 
} from '@/components/models/PortfolioConfig'
import { PortfolioContent, DEFAULT_CONTENT } from '@/components/models/PortfolioContent'

interface EnhancedSidebarProps {
  config: PortfolioConfig
  onConfigChange: (config: PortfolioConfig) => void
  onFeedback: (action: string, data: any) => void
}

export function EnhancedSidebar({ config, onConfigChange, onFeedback }: EnhancedSidebarProps) {
  const [activeTab, setActiveTab] = useState<'components' | 'content' | 'animations'>('components')

  const tabs = [
    { id: 'components' as const, label: 'Components', icon: Layers },
    { id: 'content' as const, label: 'Content', icon: Edit3 },
    { id: 'animations' as const, label: 'Animations', icon: Sparkles }
  ]

  const handleComponentsChange = (components: ComponentType[]) => {
    onConfigChange({ ...config, components })
    onFeedback('components_updated', { components, count: components.length })
  }

  const handleContentChange = (content: PortfolioContent) => {
    onConfigChange({ ...config, content })
    onFeedback('content_updated', { content })
  }

  const handleAnimationsChange = (animations: AnimationType[]) => {
    onConfigChange({ ...config, animations })
    onFeedback('animations_updated', { animations, count: animations.length })
  }

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      {/* Tab Navigation */}
      <div className="border-b border-sidebar-border p-3">
        <div className="grid grid-cols-3 gap-1">
          {tabs.map(tab => {
            const Icon = tab.icon
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => {
                  setActiveTab(tab.id)
                  onFeedback('sidebar_tab_change', { tab: tab.id, from: activeTab })
                }}
                className="flex flex-col items-center gap-1 h-auto py-2 text-xs"
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </Button>
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 flex flex-col min-h-0">
        {activeTab === 'components' && (
          <ComponentSidebar
            selectedComponents={config.components}
            onComponentsChange={handleComponentsChange}
            onFeedback={onFeedback}
          />
        )}

        {activeTab === 'content' && (
          <div className="h-full overflow-hidden">
            <ContentEditor
              content={config.content || DEFAULT_CONTENT}
              onContentChange={handleContentChange}
            />
          </div>
        )}

        {activeTab === 'animations' && (
          <div className="h-full overflow-hidden">
            <CollapsibleAnimationControls
              selectedAnimations={config.animations}
              onAnimationsChange={handleAnimationsChange}
              onFeedback={onFeedback}
            />
          </div>
        )}
      </div>
    </div>
  )
}