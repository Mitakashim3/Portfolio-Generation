/**
 * Enhanced Portfolio editor page with modern UI components
 * Inspired by the portfolio-generator-template design
 */

'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { ComponentSidebar } from '@/components/editor/ComponentSidebar';
import { ThemeSelector } from '@/components/editor/ThemeSelector';
import { AnimationControls } from '@/components/editor/AnimationControls';
import { ActionButtons } from '@/components/editor/ActionButtons';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Menu, X } from 'lucide-react';
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

  // Load current configuration
  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const response = await fetch('/api/generate');
      if (response.ok) {
        const data = await response.json();
        setConfig(data);
      } else {
        setConfig(DEFAULT_CONFIG);
      }
    } catch (error) {
      console.error('Error loading config:', error);
      setConfig(DEFAULT_CONFIG);
    } finally {
      setLoading(false);
    }
  };

  const saveConfig = async () => {
    setSaving(true);
    setMessage('');

    try {
      // Save configuration
      const saveResponse = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      if (saveResponse.ok) {
        // Log feedback event
        const feedbackEvent: FeedbackEvent = {
          timestamp: new Date().toISOString(),
          sessionId: 'editor-session',
          event: 'save_config',
          details: { config },
        };

        await fetch('/api/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(feedbackEvent),
        });

        setMessage('Configuration saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Error saving configuration');
      }
    } catch (error) {
      console.error('Error saving config:', error);
      setMessage('Error saving configuration');
    } finally {
      setSaving(false);
    }
  };

  const logFeedback = async (event: string, details?: Record<string, any>) => {
    const feedbackEvent: FeedbackEvent = {
      timestamp: new Date().toISOString(),
      sessionId: 'editor-session',
      event,
      details,
    };

    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackEvent),
      });
    } catch (error) {
      console.error('Error logging feedback:', error);
    }
  };

  const handleThemeChange = (newTheme: ThemeType) => {
    const oldTheme = config.theme;
    setConfig({ ...config, theme: newTheme });
    logFeedback('change_theme', { from: oldTheme, to: newTheme });
  };

  const handleLayoutChange = (newLayout: "single" | "grid" | "timeline") => {
    const oldLayout = config.layout;
    setConfig({ ...config, layout: newLayout });
    logFeedback('change_layout', { from: oldLayout, to: newLayout });
  };

  const handleComponentToggle = (component: ComponentType, enabled: boolean) => {
    if (enabled) {
      setConfig({ ...config, components: [...config.components, component] });
      logFeedback('add_component', { component });
    } else {
      setConfig({ 
        ...config, 
        components: config.components.filter(c => c !== component) 
      });
      logFeedback('remove_component', { component });
    }
  };

  const handleAnimationToggle = (animation: AnimationType, enabled: boolean) => {
    if (enabled) {
      setConfig({ ...config, animations: [...config.animations, animation] });
      logFeedback('add_animation', { animation });
    } else {
      setConfig({ 
        ...config, 
        animations: config.animations.filter(a => a !== animation) 
      });
      logFeedback('remove_animation', { animation });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Portfolio Editor</h1>
          <p className="text-gray-600">
            Customize your portfolio configuration. Changes are automatically logged for training.
          </p>
          <div className="mt-4">
            <a 
              href="/" 
              className="text-blue-600 hover:text-blue-800 underline mr-4"
            >
              ← View Portfolio
            </a>
          </div>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-md ${
            message.includes('Error') 
              ? 'bg-red-50 text-red-800 border border-red-200' 
              : 'bg-green-50 text-green-800 border border-green-200'
          }`}>
            {message}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Theme Settings */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Theme</h2>
            <div className="space-y-3">
              {(['minimal', 'dark', 'professional', 'creative', 'modern-gradient', 'retro', 'playful'] as const).map((theme) => (
                <label key={theme} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="theme"
                    checked={config.theme === theme}
                    onChange={() => handleThemeChange(theme)}
                    className="text-blue-600"
                  />
                  <span className="capitalize">{theme.replace('-', ' ')}</span>
                </label>
              ))}
            </div>
          </Card>

          {/* Layout Settings */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Layout</h2>
            <div className="space-y-3">
              {(['single', 'grid', 'timeline'] as const).map(layout => (
                <label key={layout} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    checked={config.layout === layout}
                    onChange={() => handleLayoutChange(layout)}
                    className="text-blue-600"
                  />
                  <span className="capitalize">{layout}</span>
                </label>
              ))}
            </div>
          </Card>

          {/* Components */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Components</h2>
            <div className="space-y-3">
              {(['navbar', 'hero', 'about', 'skills', 'projects', 'experience', 'education', 'testimonials', 'awards', 'blog', 'gallery', 'contact', 'footer'] as const).map(component => (
                <label key={component} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={config.components.includes(component)}
                    onChange={(e) => handleComponentToggle(component, e.target.checked)}
                    className="text-blue-600"
                  />
                  <span className="capitalize">{component}</span>
                </label>
              ))}
            </div>
          </Card>

          {/* Typography */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Typography</h2>
            <select
              value={config.typography}
              onChange={(e) => setConfig({ ...config, typography: e.target.value as TypographyType })}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="font-sans">Sans Serif</option>
              <option value="font-serif">Serif</option>
              <option value="font-mono">Monospace</option>
            </select>
          </Card>

          {/* Animations */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Animations</h2>
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {(['fade-in', 'slide-up', 'slide-left', 'slide-right', 'zoom-in', 'rotate-in', 'scale-up', 'scale-down', 'glow', 'shadow-pop', 'tilt', 'parallax', 'smooth-fade', 'slide-transition', 'card-flip', 'staggered-reveal', 'button-ripple', 'icon-bounce', 'typewriter', 'progress-bar'] as const).map(animation => (
                <label key={animation} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={config.animations.includes(animation)}
                    onChange={(e) => handleAnimationToggle(animation, e.target.checked)}
                    className="text-blue-600"
                  />
                  <span className="capitalize">{animation.replace('-', ' ')}</span>
                </label>
              ))}
            </div>
          </Card>
        </div>

        {/* Save Button */}
        <div className="mt-8 text-center">
          <Button
            onClick={saveConfig}
            disabled={saving}
            className="px-8 py-3 text-lg"
          >
            {saving ? 'Saving...' : 'Save Configuration'}
          </Button>
        </div>

        {/* Current Config Debug */}
        <Card className="mt-8 p-6">
          <h2 className="text-xl font-semibold mb-4">Current Configuration</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(config, null, 2)}
          </pre>
        </Card>
      </div>
    </div>
  );
}