'use client';

import { useState, useEffect, useRef } from 'react';
import { PortfolioConfig } from '@/components/models/PortfolioConfig';

interface LivePreviewProps {
  config: PortfolioConfig;
  viewMode: 'visual' | 'code';
  deviceMode: 'desktop' | 'tablet' | 'mobile';
}

export const LivePreview = ({ config, viewMode, deviceMode }: LivePreviewProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Device viewport dimensions
  const getDeviceDimensions = () => {
    switch (deviceMode) {
      case 'mobile':
        return { width: '375px', height: '667px' };
      case 'tablet':
        return { width: '768px', height: '1024px' };
      default:
        return { width: '100%', height: '100%' };
    }
  };

  const dimensions = getDeviceDimensions();

  // Generate preview content based on config
  const generatePreviewHTML = () => {
    const themeColors: Record<string, any> = {
      minimal: {
        bg: '#ffffff',
        text: '#333333',
        accent: '#007bff',
        secondary: '#6c757d'
      },
      dark: {
        bg: '#1a1a1a',
        text: '#ffffff',
        accent: '#ffd700',
        secondary: '#888888'
      },
      professional: {
        bg: '#f8f9fa',
        text: '#2c3e50',
        accent: '#3498db',
        secondary: '#7f8c8d'
      },
      creative: {
        bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        text: '#ffffff',
        accent: '#ffffff',
        secondary: '#e0e0e0'
      },
      'modern-gradient': {
        bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        text: '#ffffff',
        accent: '#ffffff',
        secondary: '#e0e0e0'
      },
      retro: {
        bg: '#2c3e50',
        text: '#ecf0f1',
        accent: '#e74c3c',
        secondary: '#95a5a6'
      },
      playful: {
        bg: '#ff9ff3',
        text: '#2c3e50',
        accent: '#ff6b6b',
        secondary: '#4ecdc4'
      }
    };

    const theme = themeColors[config.theme] || themeColors.minimal;
    
    const components = config.components.map(component => {
      switch (component) {
        case 'navbar':
          return `
            <header style="padding: 1rem 2rem; background: ${theme.bg}; color: ${theme.text}; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <nav style="display: flex; justify-content: space-between; align-items: center; max-width: 1200px; margin: 0 auto;">
                <div style="font-size: 1.5rem; font-weight: bold; color: ${theme.accent};">Portfolio</div>
                <div style="display: flex; gap: 2rem;">
                  <a href="#" style="color: ${theme.text}; text-decoration: none; font-weight: 500; transition: color 0.2s;">Home</a>
                  <a href="#" style="color: ${theme.text}; text-decoration: none; font-weight: 500; transition: color 0.2s;">About</a>
                  <a href="#" style="color: ${theme.text}; text-decoration: none; font-weight: 500; transition: color 0.2s;">Work</a>
                  <a href="#" style="color: ${theme.text}; text-decoration: none; font-weight: 500; transition: color 0.2s;">Contact</a>
                </div>
              </nav>
            </header>
          `;
        case 'hero':
          return `
            <section style="padding: 6rem 2rem; text-align: center; background: ${theme.bg}; color: ${theme.text}; min-height: 500px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
              <h1 style="font-size: 4rem; margin: 0 0 1rem 0; color: ${theme.text}; font-weight: bold; line-height: 1.1;">John Doe</h1>
              <p style="font-size: 1.5rem; color: ${theme.secondary}; margin: 0 0 2rem 0; max-width: 600px;">Full Stack Developer & UI/UX Designer</p>
              <p style="font-size: 1.1rem; color: ${theme.secondary}; max-width: 800px; line-height: 1.6; margin-bottom: 2rem;">
                I create beautiful, functional web applications that solve real-world problems. 
                Passionate about clean code, great design, and exceptional user experiences.
              </p>
              <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
                <a href="#" style="padding: 0.75rem 2rem; background: ${theme.accent}; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; transition: transform 0.2s; display: inline-block;">View My Work</a>
                <a href="#" style="padding: 0.75rem 2rem; background: transparent; color: ${theme.accent}; text-decoration: none; border: 2px solid ${theme.accent}; border-radius: 6px; font-weight: 600; transition: all 0.2s; display: inline-block;">Download CV</a>
              </div>
            </section>
          `;
        case 'about':
          return `
            <section style="padding: 6rem 2rem; background: ${theme.bg}; color: ${theme.text};">
              <div style="max-width: 1000px; margin: 0 auto;">
                <h2 style="font-size: 3rem; margin-bottom: 3rem; color: ${theme.text}; text-align: center; font-weight: bold;">About Me</h2>
                <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 4rem; align-items: center;">
                  <div style="text-align: center;">
                    <div style="width: 200px; height: 200px; border-radius: 50%; background: linear-gradient(135deg, ${theme.accent}, ${theme.secondary}); margin: 0 auto 2rem; opacity: 0.8; display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem; font-weight: bold;">JD</div>
                  </div>
                  <div>
                    <p style="font-size: 1.2rem; line-height: 1.8; color: ${theme.text}; margin-bottom: 1.5rem;">
                      I'm a passionate full-stack developer with over 5 years of experience creating digital solutions that make a difference. 
                      I specialize in modern web technologies and love turning complex problems into simple, beautiful designs.
                    </p>
                    <p style="font-size: 1.1rem; line-height: 1.7; color: ${theme.secondary}; margin-bottom: 2rem;">
                      When I'm not coding, you can find me exploring new technologies, contributing to open source projects, 
                      or sharing knowledge with the developer community through blogs and talks.
                    </p>
                    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                      <span style="padding: 0.5rem 1rem; background: ${theme.accent}; color: white; border-radius: 20px; font-size: 0.9rem;">React</span>
                      <span style="padding: 0.5rem 1rem; background: ${theme.accent}; color: white; border-radius: 20px; font-size: 0.9rem;">Node.js</span>
                      <span style="padding: 0.5rem 1rem; background: ${theme.accent}; color: white; border-radius: 20px; font-size: 0.9rem;">TypeScript</span>
                      <span style="padding: 0.5rem 1rem; background: ${theme.accent}; color: white; border-radius: 20px; font-size: 0.9rem;">Python</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          `;
        case 'projects':
          return `
            <section style="padding: 6rem 2rem; background: ${theme.bg}; color: ${theme.text};">
              <div style="max-width: 1200px; margin: 0 auto;">
                <h2 style="text-align: center; font-size: 3rem; margin-bottom: 4rem; color: ${theme.text}; font-weight: bold;">Featured Projects</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem;">
                  ${[
                    { title: "E-Commerce Platform", desc: "Full-stack web application with React, Node.js, and MongoDB", tech: "React • Node.js • MongoDB" },
                    { title: "Mobile Task Manager", desc: "Cross-platform mobile app built with React Native", tech: "React Native • Firebase • Redux" },
                    { title: "Data Visualization Dashboard", desc: "Interactive dashboard for business analytics", tech: "D3.js • Python • PostgreSQL" }
                  ].map((project, i) => `
                    <div style="background: ${theme.bg === '#ffffff' ? '#f8f9fa' : '#2a2a2a'}; border-radius: 12px; padding: 2rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.2s; border: 1px solid ${theme.secondary};">
                      <div style="width: 100%; height: 200px; background: linear-gradient(135deg, ${theme.accent}, ${theme.secondary}); border-radius: 8px; margin-bottom: 1.5rem; opacity: 0.7; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; font-weight: bold;">
                        Project ${i + 1}
                      </div>
                      <h3 style="color: ${theme.text}; margin-bottom: 1rem; font-size: 1.5rem; font-weight: bold;">${project.title}</h3>
                      <p style="color: ${theme.secondary}; margin-bottom: 1rem; line-height: 1.6;">${project.desc}</p>
                      <p style="color: ${theme.accent}; font-size: 0.9rem; font-weight: 600; margin-bottom: 1.5rem;">${project.tech}</p>
                      <div style="display: flex; gap: 1rem;">
                        <a href="#" style="padding: 0.5rem 1rem; background: ${theme.accent}; color: white; text-decoration: none; border-radius: 6px; font-weight: 500; transition: all 0.2s;">View Project</a>
                        <a href="#" style="padding: 0.5rem 1rem; background: transparent; color: ${theme.accent}; text-decoration: none; border: 1px solid ${theme.accent}; border-radius: 6px; font-weight: 500; transition: all 0.2s;">Source Code</a>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </section>
          `;
        case 'contact':
          return `
            <section style="padding: 6rem 2rem; background: ${theme.bg}; color: ${theme.text};">
              <div style="max-width: 800px; margin: 0 auto; text-align: center;">
                <h2 style="font-size: 3rem; margin-bottom: 2rem; color: ${theme.text}; font-weight: bold;">Let's Work Together</h2>
                <p style="margin-bottom: 3rem; color: ${theme.secondary}; font-size: 1.2rem; line-height: 1.6;">
                  Have a project in mind? I'd love to hear about it. 
                  Let's discuss how we can bring your ideas to life.
                </p>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-bottom: 3rem;">
                  <div style="padding: 2rem; background: ${theme.bg === '#ffffff' ? '#f8f9fa' : '#2a2a2a'}; border-radius: 12px; border: 1px solid ${theme.secondary};">
                    <div style="width: 60px; height: 60px; background: ${theme.accent}; border-radius: 50%; margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem;">📧</div>
                    <h3 style="color: ${theme.text}; margin-bottom: 0.5rem;">Email</h3>
                    <p style="color: ${theme.secondary};">john@example.com</p>
                  </div>
                  <div style="padding: 2rem; background: ${theme.bg === '#ffffff' ? '#f8f9fa' : '#2a2a2a'}; border-radius: 12px; border: 1px solid ${theme.secondary};">
                    <div style="width: 60px; height: 60px; background: ${theme.accent}; border-radius: 50%; margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem;">💼</div>
                    <h3 style="color: ${theme.text}; margin-bottom: 0.5rem;">LinkedIn</h3>
                    <p style="color: ${theme.secondary};">/in/johndoe</p>
                  </div>
                  <div style="padding: 2rem; background: ${theme.bg === '#ffffff' ? '#f8f9fa' : '#2a2a2a'}; border-radius: 12px; border: 1px solid ${theme.secondary};">
                    <div style="width: 60px; height: 60px; background: ${theme.accent}; border-radius: 50%; margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem;">🐙</div>
                    <h3 style="color: ${theme.text}; margin-bottom: 0.5rem;">GitHub</h3>
                    <p style="color: ${theme.secondary};">github.com/johndoe</p>
                  </div>
                </div>
                <a href="#" style="padding: 1rem 2rem; background: ${theme.accent}; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 1.1rem; transition: all 0.2s; display: inline-block;">Get In Touch</a>
              </div>
            </section>
          `;
        default:
          return '';
      }
    }).join('');

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Portfolio Preview</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: ${config.typography?.replace('font-', '') || 'sans-serif'}, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            background: ${theme.bg};
            color: ${theme.text};
          }
          ${config.animations.includes('fade-in') ? `
          section { 
            animation: fadeIn 0.8s ease-in-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          ` : ''}
          ${config.animations.includes('slide-left') ? `
          section:nth-child(even) { 
            animation: slideInLeft 0.8s ease-in-out;
          }
          section:nth-child(odd) { 
            animation: slideInRight 0.8s ease-in-out;
          }
          @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-50px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes slideInRight {
            from { opacity: 0; transform: translateX(50px); }
            to { opacity: 1; transform: translateX(0); }
          }
          ` : ''}
        </style>
      </head>
      <body>
        ${components}
      </body>
      </html>
    `;
  };

  const generateCodeView = () => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Code View</title>
        <style>
          body { 
            font-family: 'Monaco', 'Consolas', monospace;
            background: #1e1e1e;
            color: #d4d4d4;
            padding: 1rem;
            font-size: 12px;
            line-height: 1.4;
          }
          .code { white-space: pre-wrap; }
          .keyword { color: #569cd6; }
          .string { color: #ce9178; }
          .comment { color: #6a9955; }
          .tag { color: #4ec9b0; }
          .attr { color: #9cdcfe; }
        </style>
      </head>
      <body>
        <div class="code">${generatePreviewHTML().replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
      </body>
      </html>
    `;
  };

  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const content = viewMode === 'visual' ? generatePreviewHTML() : generateCodeView();
      
      iframe.onload = () => setIsLoading(false);
      
      const blob = new Blob([content], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      iframe.src = url;
      
      return () => URL.revokeObjectURL(url);
    }
  }, [config, viewMode, deviceMode]);

  return (
    <div 
      className="h-full flex flex-col"
      style={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        backgroundColor: '#f3f4f6'
      }}
    >
      {/* Device Frame */}
      <div 
        className="flex-1 p-4 flex items-center justify-center"
        style={{
          flex: 1,
          padding: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f9fafb'
        }}
      >
        <div 
          className="relative bg-white border border-gray-300 shadow-lg overflow-hidden"
          style={{
            position: 'relative',
            backgroundColor: '#ffffff',
            border: '1px solid #d1d5db',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            overflow: 'hidden',
            width: dimensions.width,
            height: dimensions.height,
            borderRadius: deviceMode !== 'desktop' ? '12px' : '8px',
            maxWidth: '100%',
            maxHeight: '100%'
          }}
        >
          {/* Loading overlay */}
          {isLoading && (
            <div 
              className="absolute inset-0 bg-white flex items-center justify-center z-10"
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                backgroundColor: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10
              }}
            >
              <div 
                className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
                style={{
                  width: '2rem',
                  height: '2rem',
                  border: '2px solid #e5e7eb',
                  borderBottomColor: '#2563eb',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}
              ></div>
            </div>
          )}
          
          {/* Preview iframe */}
          <iframe
            ref={iframeRef}
            className="w-full h-full border-none"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              borderRadius: 'inherit'
            }}
            title="Portfolio Preview"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>
    </div>
  );
};