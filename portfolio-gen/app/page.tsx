/**
 * Main portfolio page that reads config.json and renders components dynamically
 * Usage: Navigate to / to view the portfolio
 * 
 * This page loads the current portfolio configuration from /training/config.json
 * and renders the appropriate components based on the configuration.
 */

import { promises as fs } from 'fs';
import path from 'path';
import Header from '@/components/layout/Header';
import Hero from '@/components/layout/Hero';
import About from '@/components/layout/About';
import Skills from '@/components/layout/Skills';
import Projects from '@/components/layout/Projects';
import Experience from '@/components/layout/Experience';
import Education from '@/components/layout/Education';
import Testimonials from '@/components/layout/Testimonials';
import Footer from '@/components/layout/Footer';
import { PortfolioConfig, DEFAULT_CONFIG, THEME_CONFIGS, ANIMATION_INFO } from '@/components/models/PortfolioConfig';
import './globals.css';

async function getPortfolioConfig(): Promise<PortfolioConfig> {
  try {
    const configPath = path.join(process.cwd(), 'training', 'config.json');
    const data = await fs.readFile(configPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading config.json, using default:', error);
    return DEFAULT_CONFIG;
  }
}

export default async function HomePage() {
  const config = await getPortfolioConfig();

  // Get theme configuration
  const themeConfig = THEME_CONFIGS[config.theme] || THEME_CONFIGS.dark;
  
  // Apply theme classes to the body
  const themeClasses = `${themeConfig.backgroundClass} ${themeConfig.textClass}`;
  const colorPaletteClasses = config.colorPalette.join(' ');

  // Component mapping - now includes all available components
  const componentMap = {
    navbar: Header,
    hero: Hero,
    about: About,
    skills: Skills,
    projects: Projects,
    experience: Experience,
    education: Education,
    testimonials: Testimonials,
    contact: Footer,
    footer: Footer,
    // Legacy mappings
    gallery: Projects, // Can be replaced with dedicated Gallery component
    blog: Projects,    // Can be replaced with dedicated Blog component
    awards: Education, // Awards shown in Education for now
  };

  return (
    <html lang="en">
      <body className={`${themeClasses} ${config.typography}`}>
        <div className={`min-h-screen ${colorPaletteClasses}`}>
          {config.components.map((componentName, index) => {
            const Component = componentMap[componentName as keyof typeof componentMap];
            if (!Component) return null;

            // Apply animations based on config
            const animationClasses = config.animations
              .map(anim => ANIMATION_INFO[anim]?.cssClass || '')
              .join(' ');
            
            return (
              <Component 
                key={`${componentName}-${index}`}
                className={`${animationClasses} transition-all duration-500`}
              />
            );
          })}
        </div>

        {/* Debug info in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white p-2 rounded text-xs z-50">
            <details>
              <summary className="cursor-pointer">Config Debug</summary>
              <div className="mt-2 max-w-xs overflow-auto max-h-64">
                <pre className="text-xs">
                  {JSON.stringify(config, null, 2)}
                </pre>
                <div className="mt-2 pt-2 border-t border-gray-600">
                  <p><strong>Theme:</strong> {config.theme}</p>
                  <p><strong>Components:</strong> {config.components.length}</p>
                  <p><strong>Animations:</strong> {config.animations.length}</p>
                </div>
              </div>
            </details>
          </div>
        )}
      </body>
    </html>
  );
}