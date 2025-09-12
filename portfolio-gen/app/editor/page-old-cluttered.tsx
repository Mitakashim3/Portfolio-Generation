/**
 * Enhanced Portfolio editor page with modern UI components and live preview
 * Inspired by the portfolio-generator-template design
 */

'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { ComponentSidebar } from '@/components/editor/ComponentSidebar';
import { ThemeSelector } from '@/components/editor/ThemeSelector';
import { AnimationControls } from '@/components/editor/AnimationControls';
import { ActionButtons } from '@/components/editor/ActionButtons';
import { LivePreview } from '@/components/editor/LivePreview';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Menu, X, Eye, Code, Monitor, Tablet, Smartphone } from 'lucide-react';
import { 
  PortfolioConfig, 
  FeedbackEvent, 
  DEFAULT_CONFIG, 
  ThemeType, 
  ComponentType, 
  AnimationType,
  TypographyType,
} from '@/components/models/PortfolioConfig';

export default function EditorPage() {
  const [config, setConfig] = useState<PortfolioConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState<'visual' | 'code'>('visual');
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Load current configuration
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const response = await fetch('/api/generate');
        if (response.ok) {
          const data = await response.json();
          setConfig(data);
        }
      } catch (error) {
        console.error('Failed to load configuration:', error);
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, []);

  // Log feedback events for training
  const logFeedback = async (action: string, data: any) => {
    const feedbackEvent: FeedbackEvent = {
      timestamp: new Date().toISOString(),
      sessionId: 'editor-session',
      event: action,
      details: { ...data, config }
    };

    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackEvent)
      });
    } catch (error) {
      console.error('Failed to log feedback:', error);
    }
  };

  // Save configuration
  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });

      if (response.ok) {
        setMessage('Configuration saved successfully!');
        logFeedback('save_success', { config });
      } else {
        setMessage('Failed to save configuration');
      }
    } catch (error) {
      setMessage('Error saving configuration');
      console.error('Save error:', error);
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = () => {
    window.open('/', '_blank');
  };

  const handleGenerate = async () => {
    setSaving(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });

      if (response.ok) {
        setMessage('Portfolio generated successfully!');
        logFeedback('generate_success', { config });
      } else {
        setMessage('Failed to generate portfolio');
      }
    } catch (error) {
      setMessage('Error generating portfolio');
      console.error('Generate error:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-gray-50"
      style={{
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}
    >
      {/* Header */}
      <header 
        className="border-b border-gray-200 bg-white shadow-sm"
        style={{
          borderBottom: '1px solid #e5e7eb',
          backgroundColor: '#ffffff',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          position: 'sticky',
          top: 0,
          zIndex: 50
        }}
      >
        <div 
          className="flex h-16 items-center justify-between px-4"
          style={{
            display: 'flex',
            height: '4rem',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 1rem'
          }}
        >
          <div 
            className="flex items-center gap-4"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSidebarOpen(!sidebarOpen)} 
              className="lg:hidden"
              style={{
                padding: '0.5rem',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer'
              }}
            >
              {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
            <h1 
              className="text-xl font-bold text-gray-900"
              style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#111827',
                margin: 0
              }}
            >
              Portfolio Generator
            </h1>
          </div>

          {/* Center - Preview Controls */}
          <div 
            className="flex items-center gap-2"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Eye 
              className="h-4 w-4 text-gray-500"
              style={{ width: '1rem', height: '1rem', color: '#6b7280' }}
            />
            <span 
              className="text-sm text-gray-600"
              style={{ fontSize: '0.875rem', color: '#4b5563' }}
            >
              Live Preview
            </span>
            <span 
              className="text-sm text-gray-400"
              style={{ fontSize: '0.875rem', color: '#9ca3af' }}
            >
              |
            </span>
            <span 
              className="text-sm text-gray-500 capitalize"
              style={{ 
                fontSize: '0.875rem', 
                color: '#6b7280',
                textTransform: 'capitalize'
              }}
            >
              {config.theme}
            </span>
          </div>

          <div 
            className="flex items-center gap-4"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            {/* View Mode Toggle */}
            <div 
              className="flex items-center bg-gray-100 rounded-lg p-1"
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#f3f4f6',
                borderRadius: '0.5rem',
                padding: '0.25rem'
              }}
            >
              <Button
                size="sm"
                variant={viewMode === 'visual' ? 'primary' : 'ghost'}
                onClick={() => setViewMode('visual')}
                className="h-8 px-3 text-xs"
                style={{
                  height: '2rem',
                  padding: '0 0.75rem',
                  fontSize: '0.75rem',
                  backgroundColor: viewMode === 'visual' ? '#3b82f6' : 'transparent',
                  color: viewMode === 'visual' ? 'white' : '#374151',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
              >
                <Eye className="h-3 w-3 mr-1" />
                Visual
              </Button>
              <Button
                size="sm"
                variant={viewMode === 'code' ? 'primary' : 'ghost'}
                onClick={() => setViewMode('code')}
                className="h-8 px-3 text-xs"
                style={{
                  height: '2rem',
                  padding: '0 0.75rem',
                  fontSize: '0.75rem',
                  backgroundColor: viewMode === 'code' ? '#3b82f6' : 'transparent',
                  color: viewMode === 'code' ? 'white' : '#374151',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
              >
                <Code className="h-3 w-3 mr-1" />
                Code
              </Button>
            </div>

            {/* Device Mode Toggle */}
            <div 
              className="flex items-center bg-gray-100 rounded-lg p-1"
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#f3f4f6',
                borderRadius: '0.5rem',
                padding: '0.25rem'
              }}
            >
              <Button
                size="sm"
                variant={deviceMode === 'desktop' ? 'primary' : 'ghost'}
                onClick={() => setDeviceMode('desktop')}
                className="h-8 px-2"
                style={{
                  height: '2rem',
                  padding: '0 0.5rem',
                  backgroundColor: deviceMode === 'desktop' ? '#3b82f6' : 'transparent',
                  color: deviceMode === 'desktop' ? 'white' : '#374151',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer'
                }}
              >
                <Monitor className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant={deviceMode === 'tablet' ? 'primary' : 'ghost'}
                onClick={() => setDeviceMode('tablet')}
                className="h-8 px-2"
                style={{
                  height: '2rem',
                  padding: '0 0.5rem',
                  backgroundColor: deviceMode === 'tablet' ? '#3b82f6' : 'transparent',
                  color: deviceMode === 'tablet' ? 'white' : '#374151',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer'
                }}
              >
                <Tablet className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant={deviceMode === 'mobile' ? 'primary' : 'ghost'}
                onClick={() => setDeviceMode('mobile')}
                className="h-8 px-2"
                style={{
                  height: '2rem',
                  padding: '0 0.5rem',
                  backgroundColor: deviceMode === 'mobile' ? '#3b82f6' : 'transparent',
                  color: deviceMode === 'mobile' ? 'white' : '#374151',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer'
                }}
              >
                <Smartphone className="h-3 w-3" />
              </Button>
            </div>

            <ThemeSelector
              selectedTheme={config.theme}
              onThemeChange={(theme) => setConfig({ ...config, theme })}
              onFeedback={logFeedback}
            />
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

      <div 
        className="flex h-[calc(100vh-4rem)]"
        style={{
          display: 'flex',
          height: 'calc(100vh - 4rem)'
        }}
      >
        {/* Sidebar */}
        <div
          className={`
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          fixed inset-y-16 left-0 z-50 w-80 transform transition-transform duration-300 ease-in-out
          lg:relative lg:inset-y-0 lg:translate-x-0 lg:z-0
          bg-white border-r border-gray-200 shadow-lg lg:shadow-none
        `}
          style={{
            position: sidebarOpen ? 'relative' : 'fixed',
            top: '4rem',
            left: 0,
            width: '20rem',
            height: 'calc(100vh - 4rem)',
            backgroundColor: '#ffffff',
            borderRight: '1px solid #e5e7eb',
            boxShadow: sidebarOpen ? 'none' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.3s ease-in-out',
            zIndex: 50
          }}
        >
          <div 
            className="flex h-full flex-col"
            style={{
              display: 'flex',
              height: '100%',
              flexDirection: 'column'
            }}
          >
            <ComponentSidebar
              selectedComponents={config.components}
              onComponentsChange={(components) => setConfig({ ...config, components })}
              onFeedback={logFeedback}
            />

            <div 
              className="border-t border-gray-200 p-4"
              style={{
                borderTop: '1px solid #e5e7eb',
                padding: '1rem'
              }}
            >
              <AnimationControls
                selectedAnimations={config.animations}
                onAnimationsChange={(animations) => setConfig({ ...config, animations })}
                onFeedback={logFeedback}
              />
            </div>

            {/* Configuration Summary in Sidebar */}
            <div 
              className="border-t border-gray-200 p-4"
              style={{
                borderTop: '1px solid #e5e7eb',
                padding: '1rem'
              }}
            >
              <h3 
                className="text-sm font-semibold mb-3"
                style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  marginBottom: '0.75rem',
                  color: '#111827'
                }}
              >
                Quick Settings
              </h3>
              
              {/* Layout Settings */}
              <div 
                className="mb-4"
                style={{ marginBottom: '1rem' }}
              >
                <label 
                  className="text-xs text-gray-600 mb-1 block"
                  style={{
                    fontSize: '0.75rem',
                    color: '#4b5563',
                    marginBottom: '0.25rem',
                    display: 'block'
                  }}
                >
                  Layout
                </label>
                <Select
                  value={config.layout}
                  onValueChange={(value: "single" | "grid" | "timeline") => {
                    setConfig({ ...config, layout: value });
                    logFeedback('change_layout', { layout: value });
                  }}
                >
                  <SelectTrigger 
                    className="h-8 text-xs"
                    style={{
                      height: '2rem',
                      fontSize: '0.75rem',
                      width: '100%',
                      padding: '0 0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      backgroundColor: '#ffffff'
                    }}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single Page</SelectItem>
                    <SelectItem value="grid">Grid Layout</SelectItem>
                    <SelectItem value="timeline">Timeline</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Typography Settings */}
              <div 
                className="mb-4"
                style={{ marginBottom: '1rem' }}
              >
                <label 
                  className="text-xs text-gray-600 mb-1 block"
                  style={{
                    fontSize: '0.75rem',
                    color: '#4b5563',
                    marginBottom: '0.25rem',
                    display: 'block'
                  }}
                >
                  Typography
                </label>
                <Select
                  value={config.typography}
                  onValueChange={(value: TypographyType) => {
                    setConfig({ ...config, typography: value });
                    logFeedback('change_typography', { typography: value });
                  }}
                >
                  <SelectTrigger 
                    className="h-8 text-xs"
                    style={{
                      height: '2rem',
                      fontSize: '0.75rem',
                      width: '100%',
                      padding: '0 0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      backgroundColor: '#ffffff'
                    }}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="font-sans">Sans Serif</SelectItem>
                    <SelectItem value="font-serif">Serif</SelectItem>
                    <SelectItem value="font-mono">Monospace</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black/20 lg:hidden" 
            onClick={() => setSidebarOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              zIndex: 40
            }}
          />
        )}

        {/* Main Content - Split Layout */}
        <main 
          className="flex-1 overflow-hidden bg-gray-100"
          style={{
            flex: 1,
            overflow: 'hidden',
            backgroundColor: '#f3f4f6'
          }}
        >
          <LivePreview 
            config={config}
            viewMode={viewMode}
            deviceMode={deviceMode}
          />
          
          {/* Status Message */}
          {message && (
            <div 
              className="absolute bottom-4 right-4 z-10"
              style={{
                position: 'absolute',
                bottom: '1rem',
                right: '1rem',
                zIndex: 10
              }}
            >
              <div 
                className={`p-3 rounded-md shadow-lg ${
                  message.includes('success') ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}
                style={{
                  padding: '0.75rem',
                  borderRadius: '0.375rem',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  backgroundColor: message.includes('success') ? '#10b981' : '#ef4444',
                  color: '#ffffff'
                }}
              >
                {message}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}