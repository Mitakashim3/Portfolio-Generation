"use client"

import { useState } from "react"
import Card from "@/components/ui/Card"
import Button from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { 
  Zap, 
  Eye, 
  MousePointer, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp,
  GripHorizontal,
  Minimize2,
  Maximize2
} from "lucide-react"
import type { AnimationType } from "@/components/models/PortfolioConfig"

const ENTRANCE_ANIMATIONS = {
  "fade-in": "Fade In",
  "slide-up": "Slide Up", 
  "slide-left": "Slide Left",
  "slide-right": "Slide Right",
  "zoom-in": "Zoom In",
  "rotate-in": "Rotate In",
} as const

const HOVER_EFFECTS = {
  "scale-up": "Scale Up",
  "scale-down": "Scale Down",
  "glow": "Glow Effect",
  "shadow-pop": "Shadow Pop",
  "tilt": "Tilt Effect",
  "parallax": "Parallax",
} as const

const TRANSITIONS = {
  "smooth-fade": "Smooth Fade",
  "slide-transition": "Slide Transition",
  "card-flip": "Card Flip",
  "staggered-reveal": "Staggered Reveal",
} as const

const MICRO_INTERACTIONS = {
  "button-ripple": "Button Ripple",
  "icon-bounce": "Icon Bounce", 
  "typewriter": "Typewriter",
  "progress-bar": "Progress Bars",
} as const

interface CollapsibleAnimationControlsProps {
  selectedAnimations: AnimationType[]
  onAnimationsChange: (animations: AnimationType[]) => void
  onFeedback?: (action: string, data: any) => void
}

// Helper function to get animation label
const getAnimationLabel = (animation: AnimationType): string => {
  if (animation in ENTRANCE_ANIMATIONS) {
    return ENTRANCE_ANIMATIONS[animation as keyof typeof ENTRANCE_ANIMATIONS]
  }
  if (animation in HOVER_EFFECTS) {
    return HOVER_EFFECTS[animation as keyof typeof HOVER_EFFECTS]
  }
  if (animation in TRANSITIONS) {
    return TRANSITIONS[animation as keyof typeof TRANSITIONS]
  }
  if (animation in MICRO_INTERACTIONS) {
    return MICRO_INTERACTIONS[animation as keyof typeof MICRO_INTERACTIONS]
  }
  return animation
}

export function CollapsibleAnimationControls({ 
  selectedAnimations, 
  onAnimationsChange, 
  onFeedback 
}: CollapsibleAnimationControlsProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [height, setHeight] = useState(300)

  const toggleAnimation = (animation: AnimationType) => {
    if (selectedAnimations.includes(animation)) {
      onAnimationsChange(selectedAnimations.filter(a => a !== animation))
      onFeedback?.('remove_animation', { animation })
    } else {
      onAnimationsChange([...selectedAnimations, animation])
      onFeedback?.('add_animation', { animation })
    }
  }

  const addFromSelect = (animation: string) => {
    if (!selectedAnimations.includes(animation as AnimationType)) {
      onAnimationsChange([...selectedAnimations, animation as AnimationType])
      onFeedback?.('add_animation', { animation, method: 'dropdown' })
    }
  }

  if (isMinimized) {
    return (
      <div className="liquid-card p-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Animations</span>
            <Badge variant="outline" className="text-xs">
              {selectedAnimations.length}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(false)}
            className="h-6 w-6 p-0 rounded-full"
          >
            <Maximize2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="liquid-card mb-4" style={{ height: isExpanded ? `${height}px` : 'auto' }}>
      {/* Header with controls */}
      <div className="flex items-center justify-between p-4 border-b border-border/30">
        <div className="flex items-center gap-3">
          <Zap className="h-5 w-5 text-primary" />
          <div>
            <h3 className="text-sm font-semibold text-foreground">Animations & Effects</h3>
            <p className="text-xs text-muted-foreground">
              {selectedAnimations.length} animations selected
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-6 w-6 p-0 rounded-full"
          >
            {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(true)}
            className="h-6 w-6 p-0 rounded-full"
          >
            <Minimize2 className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Compact view when collapsed */}
      {!isExpanded && (
        <div className="p-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {selectedAnimations.map((animation) => (
              <Badge
                key={animation}
                variant="default"
                className="text-xs cursor-pointer hover:bg-destructive/80"
                onClick={() => toggleAnimation(animation)}
              >
                {getAnimationLabel(animation)}
                <span className="ml-1">×</span>
              </Badge>
            ))}
          </div>
          
          <Select onValueChange={addFromSelect}>
            <SelectTrigger className="liquid-input h-8">
              <SelectValue placeholder="Add animation..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fade-in">Fade In</SelectItem>
              <SelectItem value="slide-up">Slide Up</SelectItem>
              <SelectItem value="zoom-in">Zoom In</SelectItem>
              <SelectItem value="scale-up">Scale Up</SelectItem>
              <SelectItem value="glow">Glow Effect</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Expanded view with full controls */}
      {isExpanded && (
        <div className="overflow-y-auto" style={{ height: height - 80 }}>
          <div className="p-4 space-y-4">
            {/* Section Entrance */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Section Entrance</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(ENTRANCE_ANIMATIONS).map(([key, label]) => (
                  <Card
                    key={key}
                    className={`p-2 cursor-pointer transition-all duration-200 text-center ${
                      selectedAnimations.includes(key as AnimationType)
                        ? "bg-primary/20 border-primary/30"
                        : "hover:bg-primary/5"
                    }`}
                    onClick={() => toggleAnimation(key as AnimationType)}
                  >
                    <span className="text-xs font-medium text-foreground">{label}</span>
                  </Card>
                ))}
              </div>
            </div>

            {/* Hover Effects */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MousePointer className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Hover Effects</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(HOVER_EFFECTS).map(([key, label]) => (
                  <Card
                    key={key}
                    className={`p-2 cursor-pointer transition-all duration-200 text-center ${
                      selectedAnimations.includes(key as AnimationType)
                        ? "bg-primary/20 border-primary/30"
                        : "hover:bg-primary/5"
                    }`}
                    onClick={() => toggleAnimation(key as AnimationType)}
                  >
                    <span className="text-xs font-medium text-foreground">{label}</span>
                  </Card>
                ))}
              </div>
            </div>

            {/* Transitions */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Page Transitions</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(TRANSITIONS).map(([key, label]) => (
                  <Card
                    key={key}
                    className={`p-2 cursor-pointer transition-all duration-200 text-center ${
                      selectedAnimations.includes(key as AnimationType)
                        ? "bg-primary/20 border-primary/30"
                        : "hover:bg-primary/5"
                    }`}
                    onClick={() => toggleAnimation(key as AnimationType)}
                  >
                    <span className="text-xs font-medium text-foreground">{label}</span>
                  </Card>
                ))}
              </div>
            </div>

            {/* Micro-interactions */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Micro-interactions</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(MICRO_INTERACTIONS).map(([key, label]) => (
                  <Card
                    key={key}
                    className={`p-2 cursor-pointer transition-all duration-200 text-center ${
                      selectedAnimations.includes(key as AnimationType)
                        ? "bg-primary/20 border-primary/30"
                        : "hover:bg-primary/5"
                    }`}
                    onClick={() => toggleAnimation(key as AnimationType)}
                  >
                    <span className="text-xs font-medium text-foreground">{label}</span>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Resize handle when expanded */}
      {isExpanded && (
        <div 
          className="flex items-center justify-center p-2 border-t border-border/30 cursor-ns-resize hover:bg-primary/5 transition-colors"
          onMouseDown={(e) => {
            const startY = e.clientY
            const startHeight = height

            const handleMouseMove = (e: MouseEvent) => {
              const deltaY = e.clientY - startY
              const newHeight = Math.max(200, Math.min(600, startHeight + deltaY))
              setHeight(newHeight)
            }

            const handleMouseUp = () => {
              document.removeEventListener('mousemove', handleMouseMove)
              document.removeEventListener('mouseup', handleMouseUp)
            }

            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
          }}
        >
          <GripHorizontal className="h-4 w-4 text-muted-foreground" />
        </div>
      )}
    </div>
  )
}