/**
 * Enhanced Action Buttons for Portfolio Editor
 * Provides save, export, and share functionality
 */

"use client"

import Button from "@/components/ui/Button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/DropdownMenu"
import { Download, Share, Save, MoreVertical, Code, Eye, PlayCircle } from "lucide-react"
import type { PortfolioConfig } from "@/components/models/PortfolioConfig"

interface ActionButtonsProps {
  config: PortfolioConfig
  onSave?: () => void
  onPreview?: () => void
  onGenerate?: () => void
  onFeedback?: (action: string, data: any) => void
}

export function ActionButtons({ config, onSave, onPreview, onGenerate, onFeedback }: ActionButtonsProps) {
  const handleSave = () => {
    // Save configuration to localStorage or backend
    localStorage.setItem("portfolioConfig", JSON.stringify(config))
    onSave?.()
    onFeedback?.('save_config', { config })
    console.log("Configuration saved:", config)
  }

  const handleExport = (format: "json" | "code") => {
    const data =
      format === "json"
        ? JSON.stringify(config, null, 2)
        : `// Portfolio Configuration\nexport const portfolioConfig = ${JSON.stringify(config, null, 2)}`

    const blob = new Blob([data], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `portfolio-config.${format === "json" ? "json" : "js"}`
    a.click()
    URL.revokeObjectURL(url)
    
    onFeedback?.('export_config', { format })
  }

  const handleShare = () => {
    const shareData = {
      title: "My Portfolio Configuration",
      text: `Check out my portfolio configuration with ${config.components.length} components and ${config.theme} theme!`,
      url: window.location.href,
    }

    if (navigator.share) {
      navigator.share(shareData)
    } else {
      navigator.clipboard.writeText(window.location.href)
      console.log("URL copied to clipboard")
    }
    
    onFeedback?.('share_config', shareData)
  }

  const handlePreview = () => {
    onPreview?.()
    onFeedback?.('preview_portfolio', { config })
  }

  const handleGenerate = () => {
    onGenerate?.()
    onFeedback?.('generate_portfolio', { config })
  }

  return (
    <div className="flex items-center gap-2">
      {/* Primary Actions */}
      <Button onClick={handleSave} size="sm" className="gap-2">
        <Save className="h-4 w-4" />
        <span className="hidden sm:inline">Save</span>
      </Button>

      <Button onClick={handlePreview} variant="outline" size="sm" className="gap-2">
        <Eye className="h-4 w-4" />
        <span className="hidden sm:inline">Preview</span>
      </Button>

      <Button onClick={handleGenerate} variant="secondary" size="sm" className="gap-2">
        <PlayCircle className="h-4 w-4" />
        <span className="hidden sm:inline">Generate</span>
      </Button>

      {/* More Actions */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleExport("json")} className="gap-2">
            <Download className="h-4 w-4" />
            Export JSON
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport("code")} className="gap-2">
            <Code className="h-4 w-4" />
            Export Code
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleShare} className="gap-2">
            <Share className="h-4 w-4" />
            Share Config
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}