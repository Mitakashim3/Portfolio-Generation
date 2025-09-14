"use client"

import { useState } from "react"
import { EnhancedSidebar } from "@/components/editor/EnhancedSidebar"
import { LivePreview } from "@/components/editor/LivePreview"
import { ThemeSelector } from "@/components/editor/ThemeSelector"
import { ColorPaletteSelector } from "@/components/editor/ColorPaletteSelector"
import { ActionButtons } from "@/components/editor/ActionButtons"
import { UndoRedoProvider } from "@/components/editor/UndoRedoProvider"
import { UndoRedoControls } from "@/components/editor/UndoRedoControls"
import Button from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Menu, X, Eye, Code, Monitor, Tablet, Smartphone } from "lucide-react"
import { 
  PortfolioConfig, 
  FeedbackEvent, 
  DEFAULT_CONFIG, 
  ThemeType, 
  ComponentType, 
  AnimationType,
  TypographyType,
} from "@/components/models/PortfolioConfig"

export default function EditorPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [config, setConfig] = useState<PortfolioConfig>(DEFAULT_CONFIG)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [viewMode, setViewMode] = useState<'visual' | 'code'>('visual')
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')

  // Enhanced feedback logging for RL training
  const logFeedback = async (action: string, data: any) => {
    const feedbackEvent: FeedbackEvent = {
      timestamp: new Date().toISOString(),
      sessionId: 'editor-session',
      event: action,
      details: { 
        ...data, 
        config,
        designSystem: 'liquid-green',
        hasAnimations: config.animations.length > 0,
        componentCount: config.components.length,
        themeType: config.theme,
        userAgent: navigator.userAgent,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      }
    }

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackEvent)
      })
      
      if (response.ok) {
        const result = await response.json()
        console.log(`Feedback logged: ${action}, Reward: ${result.reward}`)
      }
    } catch (error) {
      console.error('Failed to log feedback:', error)
    }
  }

  // Log design system usage
  const logDesignInteraction = (interactionType: string, details: any) => {
    logFeedback(`design_${interactionType}`, {
      ...details,
      timestamp: new Date().toISOString(),
      liquidDesign: true,
      greenPalette: true
    })
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      })

      if (response.ok) {
        setMessage('Configuration saved successfully!')
        logFeedback('save_success', { config })
      } else {
        setMessage('Failed to save configuration')
      }
    } catch (error) {
      setMessage('Error saving configuration')
      console.error('Save error:', error)
    } finally {
      setSaving(false)
    }
  }

  const handlePreview = () => {
    try {
      // Save current config to localStorage as fallback
      localStorage.setItem('portfolio-config', JSON.stringify(config))
      
      // Encode config as base64 for URL
      const encodedConfig = btoa(JSON.stringify(config))
      const previewUrl = `/preview?config=${encodeURIComponent(encodedConfig)}`
      
      // Open preview in new window
      window.open(previewUrl, '_blank')
    } catch (error) {
      console.error('Error opening preview:', error)
      // Fallback - just save to localStorage and open preview
      localStorage.setItem('portfolio-config', JSON.stringify(config))
      window.open('/preview', '_blank')
    }
  }

  const handleGenerate = async () => {
    setSaving(true)
    setMessage('')
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      })

      if (response.ok) {
        setMessage('Portfolio generated successfully!')
        logFeedback('generate_success', { config })
      } else {
        setMessage('Failed to generate portfolio')
      }
    } catch (error) {
      setMessage('Error generating portfolio')
      console.error('Generate error:', error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading editor...</p>
        </div>
      </div>
    )
  }

  return (
    <UndoRedoProvider initialConfig={config} onConfigChange={setConfig}>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/50">
        {/* Header */}
        <header className="liquid-header">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSidebarOpen(!sidebarOpen)} 
                className="lg:hidden rounded-xl hover:bg-primary/10"
              >
                {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Portfolio Generator
              </h1>
            </div>

            {/* Undo/Redo Controls */}
            <div className="flex items-center gap-4">
              <UndoRedoControls />
            </div>

            <div className="flex items-center gap-4">
            {/* View Mode Toggle */}
            <div className="flex items-center liquid-card p-1">
              <Button
                variant={viewMode === 'visual' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => {
                  setViewMode('visual')
                  logDesignInteraction('view_mode_change', { mode: 'visual', from: viewMode })
                }}
                className={`h-8 px-3 text-xs rounded-xl ${viewMode === 'visual' ? 'liquid-button' : 'hover:bg-primary/10'}`}
              >
                <Eye className="h-3 w-3 mr-1" />
                Visual
              </Button>
              <Button
                variant={viewMode === 'code' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => {
                  setViewMode('code')
                  logDesignInteraction('view_mode_change', { mode: 'code', from: viewMode })
                }}
                className={`h-8 px-3 text-xs rounded-xl ${viewMode === 'code' ? 'liquid-button' : 'hover:bg-primary/10'}`}
              >
                <Code className="h-3 w-3 mr-1" />
                Code
              </Button>
            </div>

            {/* Device Mode Toggle */}
            <div className="flex items-center liquid-card p-1">
              <Button
                variant={deviceMode === 'desktop' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => {
                  setDeviceMode('desktop')
                  logDesignInteraction('device_mode_change', { mode: 'desktop', from: deviceMode })
                }}
                className={`h-8 px-2 rounded-xl ${deviceMode === 'desktop' ? 'liquid-button' : 'hover:bg-primary/10'}`}
              >
                <Monitor className="h-3 w-3" />
              </Button>
              <Button
                variant={deviceMode === 'tablet' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => {
                  setDeviceMode('tablet')
                  logDesignInteraction('device_mode_change', { mode: 'tablet', from: deviceMode })
                }}
                className={`h-8 px-2 rounded-xl ${deviceMode === 'tablet' ? 'liquid-button' : 'hover:bg-primary/10'}`}
              >
                <Tablet className="h-3 w-3" />
              </Button>
              <Button
                variant={deviceMode === 'mobile' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => {
                  setDeviceMode('mobile')
                  logDesignInteraction('device_mode_change', { mode: 'mobile', from: deviceMode })
                }}
                className={`h-8 px-2 rounded-xl ${deviceMode === 'mobile' ? 'liquid-button' : 'hover:bg-primary/10'}`}
              >
                <Smartphone className="h-3 w-3" />
              </Button>
            </div>

            <ThemeSelector
              onFeedback={logFeedback}
            />
            
            {/* Quick Color Palette Selector */}
            <div className="liquid-card p-2">
              <ColorPaletteSelector
                onFeedback={logFeedback}
              />
            </div>
            
            <ActionButtons 
              config={config}
              onSave={handleSave}
              onPreview={handlePreview}
              onGenerate={handleGenerate}
              onFeedback={logFeedback}
            />
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div
          className={`
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          fixed inset-y-16 left-0 z-50 w-80 transform transition-transform duration-500 ease-out
          lg:relative lg:inset-y-0 lg:translate-x-0 lg:z-0
          liquid-sidebar
        `}
        >
          <div className="flex h-full flex-col">
            <EnhancedSidebar
              onFeedback={logFeedback}
            />
          </div>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden" 
            onClick={() => setSidebarOpen(false)} 
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-hidden bg-gradient-to-br from-background/50 to-muted/30">
          <LivePreview 
            viewMode={viewMode}
            deviceMode={deviceMode}
          />
          
          {/* Status Message */}
          {message && (
            <div className="absolute bottom-4 right-4 z-10">
              <div className={`p-4 liquid-card font-medium ${
                message.includes('success') 
                  ? 'bg-gradient-to-r from-green-500/95 to-emerald-500/95 text-white shadow-lg shadow-green-500/25' 
                  : 'bg-gradient-to-r from-destructive/95 to-destructive/85 text-destructive-foreground shadow-lg shadow-destructive/25'
              }`}>
                {message}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
    </UndoRedoProvider>
  )
}