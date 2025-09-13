/**
 * Enhanced Theme Selector with visual previews
 * Inspired by the template's theme selection interface
 */

"use client"

import Button from "@/components/ui/Button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/DropdownMenu"
import { Badge } from "@/components/ui/Badge"
import { Palette, Check } from "lucide-react"
import type { ThemeType } from "@/components/models/PortfolioConfig"

const THEMES = {
  minimal: { 
    label: "Minimal", 
    description: "Clean and simple with lots of whitespace", 
    color: "bg-gray-100 border-gray-300",
    preview: "text-gray-900"
  },
  dark: { 
    label: "Dark", 
    description: "Dark background with bright accents", 
    color: "bg-gray-900 border-gray-700",
    preview: "text-white"
  },
  professional: { 
    label: "Professional", 
    description: "Muted colors with serif fonts", 
    color: "bg-blue-100 border-blue-300",
    preview: "text-blue-900"
  },
  creative: { 
    label: "Creative", 
    description: "Bold colors with custom shapes", 
    color: "bg-purple-100 border-purple-300",
    preview: "text-purple-900"
  },
  "modern-gradient": {
    label: "Modern Gradient",
    description: "Gradient backgrounds with glassmorphism",
    color: "bg-gradient-to-r from-blue-400 to-purple-500 border-purple-300",
    preview: "text-white"
  },
  retro: { 
    label: "Retro", 
    description: "Vintage palettes with retro typography", 
    color: "bg-amber-100 border-amber-300",
    preview: "text-amber-900"
  },
  playful: { 
    label: "Playful", 
    description: "Bright colors with rounded shapes", 
    color: "bg-pink-100 border-pink-300",
    preview: "text-pink-900"
  },
} as const

interface ThemeSelectorProps {
  selectedTheme: ThemeType
  onThemeChange: (theme: ThemeType) => void
  onFeedback?: (action: string, data: any) => void
}

export function ThemeSelector({ selectedTheme, onThemeChange, onFeedback }: ThemeSelectorProps) {
  const handleThemeChange = (theme: ThemeType) => {
    const oldTheme = selectedTheme
    onThemeChange(theme)
    onFeedback?.('change_theme', { from: oldTheme, to: theme })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-white">
          <Palette className="h-4 w-4" />
          <span className="hidden sm:inline">
            {THEMES[selectedTheme]?.label || selectedTheme}
          </span>
          <Badge variant="secondary" className="hidden md:inline-flex text-xs">
            Theme
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="p-2">
          <h3 className="font-medium text-sm mb-3">Choose Theme</h3>
          <div className="space-y-1">
            {Object.entries(THEMES).map(([key, theme]) => (
              <DropdownMenuItem
                key={key}
                onClick={() => handleThemeChange(key as ThemeType)}
                className="flex items-center gap-3 p-3 cursor-pointer rounded-md hover:bg-gray-50"
              >
                <div className={`w-8 h-8 rounded-md border-2 ${theme.color}`}>
                  <div className={`w-full h-full rounded-md flex items-center justify-center ${theme.preview}`}>
                    <div className="w-2 h-2 bg-current rounded-full"></div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{theme.label}</span>
                    {selectedTheme === key && <Check className="h-4 w-4 text-blue-600" />}
                  </div>
                  <p className="text-xs text-gray-500">{theme.description}</p>
                </div>
              </DropdownMenuItem>
            ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}