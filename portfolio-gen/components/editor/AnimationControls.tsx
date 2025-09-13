/**
 * Enhanced Animation Controls with categorized selections
 * Inspired by the template's animation management interface
 */

"use client"

import Card from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { Zap, Eye, MousePointer, ArrowRight } from "lucide-react"
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

interface AnimationControlsProps {
  selectedAnimations: AnimationType[]
  onAnimationsChange: (animations: AnimationType[]) => void
  onFeedback?: (action: string, data: any) => void
}

export function AnimationControls({ selectedAnimations, onAnimationsChange, onFeedback }: AnimationControlsProps) {
  const toggleAnimation = (animation: AnimationType) => {
    if (selectedAnimations.includes(animation)) {
      onAnimationsChange(selectedAnimations.filter(a => a !== animation))
      onFeedback?.('remove_animation', { animation })
    } else {
      onAnimationsChange([...selectedAnimations, animation])
      onFeedback?.('add_animation', { animation })
    }
  }

  const getAnimationsByCategory = (category: Record<string, string>) => {
    return Object.entries(category).filter(([key]) => 
      selectedAnimations.includes(key as AnimationType)
    ).map(([key, label]) => ({ key: key as AnimationType, label }))
  }

  const getAvailableAnimations = (category: Record<string, string>) => {
    return Object.entries(category).filter(([key]) => 
      !selectedAnimations.includes(key as AnimationType)
    ).map(([key, label]) => ({ key: key as AnimationType, label }))
  }

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="h-4 w-4 text-blue-600" />
        <h3 className="font-medium text-sm">Animations & Effects</h3>
      </div>

      <div className="space-y-4">
        {/* Entrance Animations */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Eye className="h-3 w-3 text-gray-500" />
            <label className="text-xs font-medium text-gray-700">Section Entrance</label>
          </div>
          <div className="space-y-2">
            {getAnimationsByCategory(ENTRANCE_ANIMATIONS).map(({ key, label }) => (
              <Badge
                key={key}
                variant="default"
                className="text-xs cursor-pointer hover:bg-red-600 mr-1 mb-1"
                onClick={() => toggleAnimation(key)}
              >
                {label} ×
              </Badge>
            ))}
            <Select
              onValueChange={(value) => toggleAnimation(value as AnimationType)}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Add entrance animation..." />
              </SelectTrigger>
              <SelectContent>
                {getAvailableAnimations(ENTRANCE_ANIMATIONS).map(({ key, label }) => (
                  <SelectItem key={key} value={key} className="text-xs">
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Hover Effects */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MousePointer className="h-3 w-3 text-gray-500" />
            <label className="text-xs font-medium text-gray-700">Hover Effects</label>
          </div>
          <div className="space-y-2">
            {getAnimationsByCategory(HOVER_EFFECTS).map(({ key, label }) => (
              <Badge
                key={key}
                variant="default"
                className="text-xs cursor-pointer hover:bg-red-600 mr-1 mb-1"
                onClick={() => toggleAnimation(key)}
              >
                {label} ×
              </Badge>
            ))}
            <Select
              onValueChange={(value) => toggleAnimation(value as AnimationType)}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Add hover effect..." />
              </SelectTrigger>
              <SelectContent>
                {getAvailableAnimations(HOVER_EFFECTS).map(({ key, label }) => (
                  <SelectItem key={key} value={key} className="text-xs">
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Page Transitions */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <ArrowRight className="h-3 w-3 text-gray-500" />
            <label className="text-xs font-medium text-gray-700">Page Transitions</label>
          </div>
          <div className="space-y-2">
            {getAnimationsByCategory(TRANSITIONS).map(({ key, label }) => (
              <Badge
                key={key}
                variant="default"
                className="text-xs cursor-pointer hover:bg-red-600 mr-1 mb-1"
                onClick={() => toggleAnimation(key)}
              >
                {label} ×
              </Badge>
            ))}
            <Select
              onValueChange={(value) => toggleAnimation(value as AnimationType)}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Add transition..." />
              </SelectTrigger>
              <SelectContent>
                {getAvailableAnimations(TRANSITIONS).map(({ key, label }) => (
                  <SelectItem key={key} value={key} className="text-xs">
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Micro Interactions */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Zap className="h-3 w-3 text-gray-500" />
            <label className="text-xs font-medium text-gray-700">Micro Interactions</label>
          </div>
          <div className="space-y-2">
            {getAnimationsByCategory(MICRO_INTERACTIONS).map(({ key, label }) => (
              <Badge
                key={key}
                variant="default"
                className="text-xs cursor-pointer hover:bg-red-600 mr-1 mb-1"
                onClick={() => toggleAnimation(key)}
              >
                {label} ×
              </Badge>
            ))}
            <Select
              onValueChange={(value) => toggleAnimation(value as AnimationType)}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Add micro interaction..." />
              </SelectTrigger>
              <SelectContent>
                {getAvailableAnimations(MICRO_INTERACTIONS).map(({ key, label }) => (
                  <SelectItem key={key} value={key} className="text-xs">
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Summary */}
        {selectedAnimations.length > 0 && (
          <div className="pt-3 border-t border-gray-200">
            <div className="text-xs text-gray-600">
              {selectedAnimations.length} animation{selectedAnimations.length !== 1 ? 's' : ''} selected
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}