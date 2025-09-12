'use client';

import { useState, useEffect, useRef } from 'react';
import { Badge } from "@/components/ui/Badge"
import Button from "@/components/ui/Button"
import { Monitor, Smartphone, Tablet, Eye, Code } from "lucide-react"
import { PortfolioConfig } from '@/components/models/PortfolioConfig';
import { DEFAULT_CONTENT } from '@/components/models/PortfolioContent';

// Import our template system
import { portfolioTemplates, getTemplateById } from '@/components/templates/templates';
import type { PortfolioTemplate, BaseSection } from '@/components/templates/templates';

interface LivePreviewProps {
  config: PortfolioConfig;
  viewMode: 'visual' | 'code';
  deviceMode: 'desktop' | 'tablet' | 'mobile';
}

// Component mapping for dynamic rendering
const COMPONENT_TEMPLATES = {
  navbar: {
    render: (theme: any, animationClass: string, animationDelay: string, content?: any) => `
      <header class="${animationClass}" style="padding: 1rem 2rem; background: ${theme.bg}; color: ${theme.text}; box-shadow: 0 2px 4px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 1000; backdrop-filter: blur(10px); ${animationDelay}">
        <nav style="display: flex; justify-content: space-between; align-items: center; max-width: 1200px; margin: 0 auto;">
          <div style="font-size: 1.5rem; font-weight: bold; color: ${theme.accent};">Portfolio</div>
          <div style="display: flex; gap: 2rem;">
            <a href="#hero" class="interactive-element nav-link" style="color: ${theme.text}; text-decoration: none; font-weight: 500; padding: 0.5rem 1rem; border-radius: 0.5rem;">Home</a>
            <a href="#about" class="interactive-element nav-link" style="color: ${theme.text}; text-decoration: none; font-weight: 500; padding: 0.5rem 1rem; border-radius: 0.5rem;">About</a>
            <a href="#projects" class="interactive-element nav-link" style="color: ${theme.text}; text-decoration: none; font-weight: 500; padding: 0.5rem 1rem; border-radius: 0.5rem;">Work</a>
            <a href="#contact" class="interactive-element nav-link" style="color: ${theme.text}; text-decoration: none; font-weight: 500; padding: 0.5rem 1rem; border-radius: 0.5rem;">Contact</a>
          </div>
        </nav>
      </header>
    `
  },
  hero: {
    render: (theme: any, animationClass: string, animationDelay: string, content: any) => {
      const personalInfo = content?.personalInfo || DEFAULT_CONTENT.personalInfo;
      return `
      <section id="hero" class="${animationClass}" style="padding: 8rem 2rem; text-align: center; background: ${theme.bg}; color: ${theme.text}; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; position: relative; ${animationDelay}">
        <div style="max-width: 800px; margin: 0 auto;">
          <div style="width: 120px; height: 120px; border-radius: 50%; margin: 0 auto 2rem; background: ${theme.accent}; background-image: url('${personalInfo.profileImage}'); background-size: cover; background-position: center; border: 4px solid ${theme.accent};"></div>
          <h1 style="font-size: 4rem; margin: 0 0 1rem 0; color: ${theme.text}; font-weight: bold; line-height: 1.1;">${personalInfo.name}</h1>
          <p style="font-size: 1.5rem; color: ${theme.secondary}; margin: 0 0 1rem 0; font-weight: 300;">${personalInfo.tagline}</p>
          <p style="font-size: 1.1rem; color: ${theme.secondary}; margin: 0 0 3rem 0; max-width: 600px; margin-left: auto; margin-right: auto;">${personalInfo.description}</p>
          <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-bottom: 4rem;">
            <a href="#projects" class="button-liquid interactive-element" style="padding: 1rem 2rem; background: ${theme.accent}; color: white; text-decoration: none; border-radius: 1rem; font-weight: 600; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">View My Work</a>
            <a href="#contact" class="button-liquid interactive-element" style="padding: 1rem 2rem; background: transparent; color: ${theme.accent}; text-decoration: none; border: 2px solid ${theme.accent}; border-radius: 1rem; font-weight: 600;">Get In Touch</a>
          </div>
          <div style="display: flex; gap: 1.5rem; justify-content: center;">
            ${content?.socialLinks?.github ? `<a href="${content.socialLinks.github}" class="social-link interactive-element" style="width: 50px; height: 50px; border-radius: 50%; background: ${theme.accent}20; display: flex; align-items: center; justify-content: center; color: ${theme.accent}; text-decoration: none; font-weight: bold;">GH</a>` : ''}
            ${content?.socialLinks?.linkedin ? `<a href="${content.socialLinks.linkedin}" class="social-link interactive-element" style="width: 50px; height: 50px; border-radius: 50%; background: ${theme.accent}20; display: flex; align-items: center; justify-content: center; color: ${theme.accent}; text-decoration: none; font-weight: bold;">LI</a>` : ''}
            ${content?.contact?.email ? `<a href="mailto:${content.contact.email}" class="social-link interactive-element" style="width: 50px; height: 50px; border-radius: 50%; background: ${theme.accent}20; display: flex; align-items: center; justify-content: center; color: ${theme.accent}; text-decoration: none; font-weight: bold;">@</a>` : ''}
          </div>
        </div>
      </section>
    `;
    }
  },
  about: {
    render: (theme: any, animationClass: string, animationDelay: string) => `
      <section id="about" class="${animationClass}" style="padding: 6rem 2rem; background: ${theme.bg}; color: ${theme.text}; ${animationDelay}">
        <div style="max-width: 1000px; margin: 0 auto;">
          <h2 style="font-size: 3rem; margin-bottom: 3rem; color: ${theme.text}; font-weight: bold; text-align: center;">About Me</h2>
          <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 4rem; align-items: center;">
            <div style="text-align: center;">
              <div class="interactive-element" style="width: 200px; height: 200px; border-radius: 50%; background: linear-gradient(135deg, ${theme.accent}, ${theme.secondary}); margin: 0 auto 2rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem; font-weight: bold; box-shadow: 0 8px 20px rgba(0,0,0,0.15);">JD</div>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 2rem;">
                <div class="stat-card interactive-element" style="text-align: center; padding: 1rem; background: ${theme.bg === '#ffffff' ? '#f8f9fa' : '#2a2a2a'}; border-radius: 1rem; border: 1px solid ${theme.secondary}40;">
                  <div style="font-size: 2rem; font-weight: bold; color: ${theme.accent};">5+</div>
                  <div style="font-size: 0.9rem; color: ${theme.secondary};">Years</div>
                </div>
                <div class="stat-card interactive-element" style="text-align: center; padding: 1rem; background: ${theme.bg === '#ffffff' ? '#f8f9fa' : '#2a2a2a'}; border-radius: 1rem; border: 1px solid ${theme.secondary}40;">
                  <div style="font-size: 2rem; font-weight: bold; color: ${theme.accent};">50+</div>
                  <div style="font-size: 0.9rem; color: ${theme.secondary};">Projects</div>
                </div>
                <div class="stat-card interactive-element" style="text-align: center; padding: 1rem; background: ${theme.bg === '#ffffff' ? '#f8f9fa' : '#2a2a2a'}; border-radius: 1rem; border: 1px solid ${theme.secondary}40;">
                  <div style="font-size: 2rem; font-weight: bold; color: ${theme.accent};">25+</div>
                  <div style="font-size: 0.9rem; color: ${theme.secondary};">Clients</div>
                </div>
              </div>
            </div>
            <div>
              <p style="font-size: 1.2rem; line-height: 1.8; color: ${theme.text}; margin-bottom: 2rem;">
                I'm a passionate full-stack developer with over 5 years of experience creating digital solutions that make a difference. I specialize in modern web technologies and love turning complex problems into simple, beautiful designs.
              </p>
              <div style="margin-bottom: 2rem;">
                <h3 style="color: ${theme.text}; margin-bottom: 1rem; font-size: 1.3rem; font-weight: 600;">Skills & Technologies</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                  ${['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'MongoDB', 'PostgreSQL', 'Docker'].map(skill => `
                    <span class="skill-tag interactive-element" style="padding: 0.5rem 1rem; background: ${theme.accent}20; color: ${theme.accent}; border-radius: 1rem; font-size: 0.9rem; font-weight: 500;">${skill}</span>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `
  },
  skills: {
    render: (theme: any, animationClass: string, animationDelay: string) => `
      <section id="skills" class="${animationClass}" style="padding: 6rem 2rem; background: ${theme.bg}; color: ${theme.text}; ${animationDelay}">
        <div style="max-width: 1000px; margin: 0 auto;">
          <h2 style="font-size: 3rem; margin-bottom: 3rem; color: ${theme.text}; font-weight: bold; text-align: center;">Technical Skills</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
            ${[
              { category: 'Frontend', skills: [
                { name: 'React/Next.js', level: 90 },
                { name: 'TypeScript', level: 85 },
                { name: 'CSS/Tailwind', level: 88 }
              ]},
              { category: 'Backend', skills: [
                { name: 'Node.js', level: 85 },
                { name: 'Python/Django', level: 80 },
                { name: 'PostgreSQL', level: 75 }
              ]},
              { category: 'DevOps', skills: [
                { name: 'AWS/Azure', level: 70 },
                { name: 'Docker', level: 75 },
                { name: 'CI/CD', level: 72 }
              ]}
            ].map(category => `
              <div class="skill-category interactive-element" style="background: ${theme.bg === '#ffffff' ? '#f8f9fa' : '#2a2a2a'}; border-radius: 1.5rem; padding: 2rem; border: 1px solid ${theme.secondary}40;">
                <h3 style="color: ${theme.text}; margin-bottom: 1.5rem; font-size: 1.3rem; font-weight: 600;">${category.category}</h3>
                ${category.skills.map(skill => `
                  <div style="margin-bottom: 1rem;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                      <span style="color: ${theme.text}; font-weight: 500;">${skill.name}</span>
                      <span style="color: ${theme.secondary};">${skill.level}%</span>
                    </div>
                    <div style="width: 100%; height: 8px; background: ${theme.secondary}30; border-radius: 4px; overflow: hidden;">
                      <div style="width: ${skill.level}%; height: 100%; background: linear-gradient(90deg, ${theme.accent}, ${theme.secondary}); transition: width 1s ease-in-out;"></div>
                    </div>
                  </div>
                `).join('')}
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `
  },
  projects: {
    render: (theme: any, animationClass: string, animationDelay: string) => `
      <section id="projects" class="${animationClass}" style="padding: 6rem 2rem; background: ${theme.bg}; color: ${theme.text}; ${animationDelay}">
        <div style="max-width: 1200px; margin: 0 auto;">
          <h2 style="text-align: center; font-size: 3rem; margin-bottom: 4rem; color: ${theme.text}; font-weight: bold;">Featured Projects</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem;">
            ${[
              { 
                title: "E-Commerce Platform", 
                desc: "Full-stack web application with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.",
                tech: ["React", "Node.js", "MongoDB", "Stripe"],
                featured: true
              },
              { 
                title: "Mobile Task Manager", 
                desc: "Cross-platform mobile app built with React Native. Real-time synchronization and offline capabilities.",
                tech: ["React Native", "Firebase", "Redux"],
                featured: true
              },
              { 
                title: "Data Dashboard", 
                desc: "Interactive dashboard for business analytics with real-time data visualization and reporting features.",
                tech: ["Vue.js", "D3.js", "Python", "PostgreSQL"],
                featured: false
              }
            ].map((project, i) => `
              <div class="card-liquid interactive-element project-card" style="background: ${theme.bg === '#ffffff' ? '#f8f9fa' : '#2a2a2a'}; border-radius: 1.5rem; padding: 0; box-shadow: 0 8px 20px rgba(0,0,0,0.1); border: 1px solid ${theme.secondary}40; overflow: hidden;">
                <div class="interactive-element project-image" style="width: 100%; height: 200px; background: linear-gradient(135deg, ${theme.accent}, ${theme.secondary}); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; font-weight: bold; position: relative;">
                  <div style="position: absolute; top: 1rem; right: 1rem;">
                    ${project.featured ? `<span style="background: rgba(255,255,255,0.2); padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.8rem; backdrop-filter: blur(10px);">Featured</span>` : ''}
                  </div>
                  Project ${i + 1}
                </div>
                <div style="padding: 2rem;">
                  <h3 style="color: ${theme.text}; margin-bottom: 1rem; font-size: 1.5rem; font-weight: bold;">${project.title}</h3>
                  <p style="color: ${theme.secondary}; margin-bottom: 1.5rem; line-height: 1.6;">${project.desc}</p>
                  <div style="margin-bottom: 1.5rem;">
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                      ${project.tech.map(tech => `
                        <span style="padding: 0.25rem 0.75rem; background: ${theme.accent}20; color: ${theme.accent}; border-radius: 1rem; font-size: 0.8rem; font-weight: 500;">${tech}</span>
                      `).join('')}
                    </div>
                  </div>
                  <div style="display: flex; gap: 1rem;">
                    <a href="#" class="button-liquid interactive-element" style="padding: 0.75rem 1.5rem; background: ${theme.accent}; color: white; text-decoration: none; border-radius: 0.75rem; font-weight: 500; flex: 1; text-align: center;">View Live</a>
                    <a href="#" class="button-liquid interactive-element" style="padding: 0.75rem 1.5rem; background: transparent; color: ${theme.accent}; text-decoration: none; border: 1px solid ${theme.accent}; border-radius: 0.75rem; font-weight: 500; flex: 1; text-align: center;">Source</a>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `
  },
  experience: {
    render: (theme: any, animationClass: string, animationDelay: string) => `
      <section id="experience" class="${animationClass}" style="padding: 6rem 2rem; background: ${theme.bg}; color: ${theme.text}; ${animationDelay}">
        <div style="max-width: 1000px; margin: 0 auto;">
          <h2 style="font-size: 3rem; margin-bottom: 4rem; color: ${theme.text}; font-weight: bold; text-align: center;">Work Experience</h2>
          <div style="position: relative;">
            <div style="position: absolute; left: 50%; top: 0; bottom: 0; width: 2px; background: ${theme.accent}; transform: translateX(-50%);"></div>
            ${[
              {
                title: "Senior Full Stack Developer",
                company: "Tech Innovations Inc.",
                period: "2022 - Present",
                desc: "Led development of scalable web applications, mentored junior developers, and implemented CI/CD pipelines."
              },
              {
                title: "Frontend Developer",
                company: "Digital Solutions Ltd.",
                period: "2020 - 2022",
                desc: "Built responsive user interfaces, collaborated with design teams, and optimized application performance."
              },
              {
                title: "Junior Developer",
                company: "StartupXYZ",
                period: "2019 - 2020",
                desc: "Developed features for MVP products, learned modern frameworks, and contributed to code reviews."
              }
            ].map((exp, i) => `
              <div class="timeline-item interactive-element" style="position: relative; margin-bottom: 3rem; display: flex; ${i % 2 === 0 ? 'justify-content: flex-start' : 'justify-content: flex-end'};">
                <div style="width: 45%; padding: 2rem; background: ${theme.bg === '#ffffff' ? '#f8f9fa' : '#2a2a2a'}; border-radius: 1.5rem; border: 1px solid ${theme.secondary}40; position: relative;">
                  <div style="position: absolute; top: 50%; ${i % 2 === 0 ? 'right: -15px' : 'left: -15px'}; width: 12px; height: 12px; background: ${theme.accent}; border-radius: 50%; transform: translateY(-50%);"></div>
                  <h3 style="color: ${theme.text}; font-size: 1.3rem; font-weight: bold; margin-bottom: 0.5rem;">${exp.title}</h3>
                  <h4 style="color: ${theme.accent}; font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem;">${exp.company}</h4>
                  <p style="color: ${theme.secondary}; font-size: 0.9rem; margin-bottom: 1rem;">${exp.period}</p>
                  <p style="color: ${theme.text}; line-height: 1.6;">${exp.desc}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `
  },
  education: {
    render: (theme: any, animationClass: string, animationDelay: string) => `
      <section id="education" class="${animationClass}" style="padding: 6rem 2rem; background: ${theme.bg}; color: ${theme.text}; ${animationDelay}">
        <div style="max-width: 800px; margin: 0 auto;">
          <h2 style="font-size: 3rem; margin-bottom: 4rem; color: ${theme.text}; font-weight: bold; text-align: center;">Education</h2>
          <div style="space-y: 2rem;">
            ${[
              {
                degree: "Bachelor of Computer Science",
                institution: "University of Technology",
                period: "2016 - 2020",
                desc: "Specialized in Software Engineering and Data Structures. Graduated Magna Cum Laude."
              },
              {
                degree: "Full Stack Web Development Bootcamp",
                institution: "Code Academy Pro",
                period: "2019",
                desc: "Intensive 6-month program covering modern web technologies and best practices."
              }
            ].map(edu => `
              <div class="education-item interactive-element" style="background: ${theme.bg === '#ffffff' ? '#f8f9fa' : '#2a2a2a'}; border-radius: 1.5rem; padding: 2rem; border: 1px solid ${theme.secondary}40; margin-bottom: 2rem;">
                <h3 style="color: ${theme.text}; font-size: 1.3rem; font-weight: bold; margin-bottom: 0.5rem;">${edu.degree}</h3>
                <h4 style="color: ${theme.accent}; font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem;">${edu.institution}</h4>
                <p style="color: ${theme.secondary}; font-size: 0.9rem; margin-bottom: 1rem;">${edu.period}</p>
                <p style="color: ${theme.text}; line-height: 1.6;">${edu.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `
  },
  testimonials: {
    render: (theme: any, animationClass: string, animationDelay: string) => `
      <section id="testimonials" class="${animationClass}" style="padding: 6rem 2rem; background: ${theme.bg}; color: ${theme.text}; ${animationDelay}">
        <div style="max-width: 1000px; margin: 0 auto;">
          <h2 style="font-size: 3rem; margin-bottom: 4rem; color: ${theme.text}; font-weight: bold; text-align: center;">What Clients Say</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
            ${[
              {
                text: "John delivered exceptional work on our e-commerce platform. His attention to detail and technical expertise made the project a huge success.",
                author: "Sarah Johnson",
                role: "CEO, TechCorp",
                rating: 5
              },
              {
                text: "Working with John was a pleasure. He understood our requirements perfectly and delivered beyond our expectations.",
                author: "Mike Chen",
                role: "Product Manager, InnovateLab",
                rating: 5
              },
              {
                text: "Professional, reliable, and skilled. John helped us transform our digital presence completely.",
                author: "Emily Davis",
                role: "Founder, StartupXYZ",
                rating: 5
              }
            ].map(testimonial => `
              <div class="testimonial-card interactive-element" style="background: ${theme.bg === '#ffffff' ? '#f8f9fa' : '#2a2a2a'}; border-radius: 1.5rem; padding: 2rem; border: 1px solid ${theme.secondary}40;">
                <div style="margin-bottom: 1rem;">
                  ${Array(testimonial.rating).fill('⭐').join('')}
                </div>
                <p style="color: ${theme.text}; line-height: 1.6; margin-bottom: 1.5rem; font-style: italic;">"${testimonial.text}"</p>
                <div>
                  <h4 style="color: ${theme.text}; font-weight: bold; margin-bottom: 0.25rem;">${testimonial.author}</h4>
                  <p style="color: ${theme.secondary}; font-size: 0.9rem;">${testimonial.role}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `
  },
  contact: {
    render: (theme: any, animationClass: string, animationDelay: string) => `
      <section id="contact" class="${animationClass}" style="padding: 6rem 2rem; background: ${theme.bg}; color: ${theme.text}; ${animationDelay}">
        <div style="max-width: 800px; margin: 0 auto; text-align: center;">
          <h2 style="font-size: 3rem; margin-bottom: 2rem; color: ${theme.text}; font-weight: bold;">Let's Work Together</h2>
          <p style="margin-bottom: 3rem; color: ${theme.secondary}; font-size: 1.2rem;">Have a project in mind? I'd love to hear about it. Let's discuss how we can bring your ideas to life.</p>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-bottom: 3rem;">
            <div class="contact-item interactive-element" style="background: ${theme.bg === '#ffffff' ? '#f8f9fa' : '#2a2a2a'}; border-radius: 1.5rem; padding: 2rem; border: 1px solid ${theme.secondary}40;">
              <div style="width: 60px; height: 60px; background: ${theme.accent}20; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: ${theme.accent}; font-size: 1.5rem;">📧</div>
              <h3 style="color: ${theme.text}; font-weight: bold; margin-bottom: 0.5rem;">Email</h3>
              <p style="color: ${theme.secondary};">john.doe@example.com</p>
            </div>
            <div class="contact-item interactive-element" style="background: ${theme.bg === '#ffffff' ? '#f8f9fa' : '#2a2a2a'}; border-radius: 1.5rem; padding: 2rem; border: 1px solid ${theme.secondary}40;">
              <div style="width: 60px; height: 60px; background: ${theme.accent}20; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: ${theme.accent}; font-size: 1.5rem;">📱</div>
              <h3 style="color: ${theme.text}; font-weight: bold; margin-bottom: 0.5rem;">Phone</h3>
              <p style="color: ${theme.secondary};">+1 (555) 123-4567</p>
            </div>
            <div class="contact-item interactive-element" style="background: ${theme.bg === '#ffffff' ? '#f8f9fa' : '#2a2a2a'}; border-radius: 1.5rem; padding: 2rem; border: 1px solid ${theme.secondary}40;">
              <div style="width: 60px; height: 60px; background: ${theme.accent}20; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: ${theme.accent}; font-size: 1.5rem;">📍</div>
              <h3 style="color: ${theme.text}; font-weight: bold; margin-bottom: 0.5rem;">Location</h3>
              <p style="color: ${theme.secondary};">San Francisco, CA</p>
            </div>
          </div>

          <a href="mailto:john.doe@example.com" class="button-liquid interactive-element" style="padding: 1rem 2rem; background: ${theme.accent}; color: white; text-decoration: none; border-radius: 1rem; font-weight: 600; font-size: 1.1rem; display: inline-block;">Get In Touch</a>
        </div>
      </section>
    `
  },
  awards: {
    render: (theme: any, animationClass: string, animationDelay: string) => `
      <section id="awards" class="${animationClass}" style="padding: 6rem 2rem; background: ${theme.bg}; color: ${theme.text}; ${animationDelay}">
        <div style="max-width: 1000px; margin: 0 auto;">
          <h2 style="font-size: 3rem; margin-bottom: 4rem; color: ${theme.text}; font-weight: bold; text-align: center;">Awards & Recognition</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
            ${[
              {
                title: "Best Web Application",
                organization: "Tech Awards 2023",
                description: "Recognized for innovative e-commerce platform design",
                year: "2023"
              },
              {
                title: "Developer of the Year",
                organization: "Local Tech Community",
                description: "Outstanding contribution to open source projects",
                year: "2022"
              },
              {
                title: "Innovation Award",
                organization: "Startup Pitch Competition",
                description: "First place for mobile app concept and execution",
                year: "2021"
              }
            ].map(award => `
              <div class="award-card interactive-element" style="background: ${theme.bg === '#ffffff' ? '#f8f9fa' : '#2a2a2a'}; border-radius: 1.5rem; padding: 2rem; border: 1px solid ${theme.secondary}40; text-align: center;">
                <div style="width: 80px; height: 80px; background: ${theme.accent}20; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; color: ${theme.accent}; font-size: 2rem;">🏆</div>
                <h3 style="color: ${theme.text}; font-size: 1.3rem; font-weight: bold; margin-bottom: 0.5rem;">${award.title}</h3>
                <h4 style="color: ${theme.accent}; font-size: 1rem; font-weight: 600; margin-bottom: 0.5rem;">${award.organization}</h4>
                <p style="color: ${theme.secondary}; font-size: 0.9rem; margin-bottom: 1rem;">${award.year}</p>
                <p style="color: ${theme.text}; line-height: 1.6;">${award.description}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `
  },
  blog: {
    render: (theme: any, animationClass: string, animationDelay: string) => `
      <section id="blog" class="${animationClass}" style="padding: 6rem 2rem; background: ${theme.bg}; color: ${theme.text}; ${animationDelay}">
        <div style="max-width: 1000px; margin: 0 auto;">
          <h2 style="font-size: 3rem; margin-bottom: 4rem; color: ${theme.text}; font-weight: bold; text-align: center;">Latest Blog Posts</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
            ${[
              {
                title: "Building Scalable React Applications",
                excerpt: "Learn best practices for structuring large React applications with proper state management and component architecture.",
                date: "Dec 15, 2024",
                readTime: "8 min read",
                category: "React"
              },
              {
                title: "The Future of Web Development",
                excerpt: "Exploring upcoming trends in web development including AI integration, serverless computing, and modern frameworks.",
                date: "Dec 10, 2024",
                readTime: "6 min read",
                category: "Technology"
              },
              {
                title: "Optimizing Database Performance",
                excerpt: "Practical tips and techniques for improving database query performance and scaling your data layer effectively.",
                date: "Dec 5, 2024",
                readTime: "10 min read",
                category: "Backend"
              }
            ].map(post => `
              <article class="blog-card interactive-element" style="background: ${theme.bg === '#ffffff' ? '#f8f9fa' : '#2a2a2a'}; border-radius: 1.5rem; padding: 0; border: 1px solid ${theme.secondary}40; overflow: hidden;">
                <div style="width: 100%; height: 200px; background: linear-gradient(135deg, ${theme.accent}, ${theme.secondary}); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; font-weight: bold; position: relative;">
                  <div style="position: absolute; top: 1rem; left: 1rem;">
                    <span style="background: rgba(255,255,255,0.2); padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.8rem; backdrop-filter: blur(10px);">${post.category}</span>
                  </div>
                  📝
                </div>
                <div style="padding: 2rem;">
                  <h3 style="color: ${theme.text}; font-size: 1.3rem; font-weight: bold; margin-bottom: 1rem; line-height: 1.3;">${post.title}</h3>
                  <p style="color: ${theme.secondary}; line-height: 1.6; margin-bottom: 1.5rem; font-size: 0.95rem;">${post.excerpt}</p>
                  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem;">
                    <span style="color: ${theme.secondary};">${post.date}</span>
                    <span style="color: ${theme.accent}; font-weight: 500;">${post.readTime}</span>
                  </div>
                </div>
              </article>
            `).join('')}
          </div>
        </div>
      </section>
    `
  },
  gallery: {
    render: (theme: any, animationClass: string, animationDelay: string) => `
      <section id="gallery" class="${animationClass}" style="padding: 6rem 2rem; background: ${theme.bg}; color: ${theme.text}; ${animationDelay}">
        <div style="max-width: 1200px; margin: 0 auto;">
          <h2 style="font-size: 3rem; margin-bottom: 4rem; color: ${theme.text}; font-weight: bold; text-align: center;">Project Gallery</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; grid-auto-rows: 200px;">
            ${Array.from({length: 9}, (_, i) => `
              <div class="gallery-item interactive-element" style="
                background: linear-gradient(135deg, ${theme.accent}, ${theme.secondary}); 
                border-radius: 1rem; 
                position: relative; 
                overflow: hidden;
                ${i === 0 || i === 4 || i === 8 ? 'grid-row: span 2;' : ''}
                ${i === 1 || i === 6 ? 'grid-column: span 2;' : ''}
              ">
                <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; font-weight: bold; opacity: 0; transition: opacity 0.3s;" class="gallery-overlay">
                  Project ${i + 1}
                </div>
                <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem;">
                  ${['🎨', '💻', '📱', '🖥️', '⚡', '🚀', '💡', '🔧', '📊'][i]}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `
  },
  footer: {
    render: (theme: any, animationClass: string, animationDelay: string) => `
      <footer class="${animationClass}" style="padding: 3rem 2rem 2rem; background: ${theme.bg === '#ffffff' ? '#f8f9fa' : '#1a1a1a'}; color: ${theme.text}; border-top: 1px solid ${theme.secondary}40; ${animationDelay}">
        <div style="max-width: 1200px; margin: 0 auto; text-align: center;">
          <div style="display: flex; justify-content: center; gap: 2rem; margin-bottom: 2rem;">
            <a href="#" class="social-link interactive-element" style="width: 50px; height: 50px; border-radius: 50%; background: ${theme.accent}20; display: flex; align-items: center; justify-content: center; color: ${theme.accent}; text-decoration: none; font-weight: bold;">GH</a>
            <a href="#" class="social-link interactive-element" style="width: 50px; height: 50px; border-radius: 50%; background: ${theme.accent}20; display: flex; align-items: center; justify-content: center; color: ${theme.accent}; text-decoration: none; font-weight: bold;">LI</a>
            <a href="#" class="social-link interactive-element" style="width: 50px; height: 50px; border-radius: 50%; background: ${theme.accent}20; display: flex; align-items: center; justify-content: center; color: ${theme.accent}; text-decoration: none; font-weight: bold;">TW</a>
            <a href="#" class="social-link interactive-element" style="width: 50px; height: 50px; border-radius: 50%; background: ${theme.accent}20; display: flex; align-items: center; justify-content: center; color: ${theme.accent}; text-decoration: none; font-weight: bold;">@</a>
          </div>
          <p style="color: ${theme.secondary}; margin-bottom: 1rem;">&copy; 2024 John Doe. All rights reserved.</p>
          <p style="color: ${theme.secondary}; font-size: 0.9rem;">Built with ❤️ using modern web technologies</p>
        </div>
      </footer>
    `
  }
};

interface LivePreviewProps {
  config: PortfolioConfig;
  viewMode: 'visual' | 'code';
  deviceMode: 'desktop' | 'tablet' | 'mobile';
}

export const LivePreview = ({ config, viewMode, deviceMode }: LivePreviewProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Device viewport dimensions
  const getPreviewWidth = () => {
    switch (deviceMode) {
      case "mobile":
        return "w-[375px]"
      case "tablet":
        return "w-[768px]"
      default:
        return "w-full"
    }
  }

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
    
    const getAnimationClass = (index: number = 0) => {
      const animationMap: Record<string, string> = {
        'fade-in': 'fade-in',
        'slide-up': 'slide-up',
        'slide-left': 'slide-left',
        'slide-right': 'slide-right',
        'zoom-in': 'zoom-in',
        'rotate-in': 'rotate-in',
        'bounce-in': 'bounce-in',
        'scale-up': 'zoom-in',
        'scale-down': 'fade-in',
        'glow': 'fade-in',
        'shadow-pop': 'zoom-in',
        'tilt': 'rotate-in',
        'parallax': 'slide-up'
      };
      
      // Get the first available animation from config
      const selectedAnimation = config.animations.find(anim => animationMap[anim]);
      return selectedAnimation ? animationMap[selectedAnimation] : '';
    };

    // Define component order for proper hierarchy
    const componentOrder = [
      'navbar',
      'hero', 
      'about',
      'skills',
      'experience',
      'education',
      'projects',
      'testimonials',
      'awards',
      'blog',
      'gallery',
      'contact',
      'footer'
    ];

    // Sort components according to proper hierarchy
    const sortedComponents = config.components.sort((a, b) => {
      const indexA = componentOrder.indexOf(a);
      const indexB = componentOrder.indexOf(b);
      
      // If component not in order array, put it at the end
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      
      return indexA - indexB;
    });

    // Generate components dynamically based on sorted components
    const components = sortedComponents.map((component, index) => {
      const animationClass = getAnimationClass(index);
      const hasStagger = config.animations.includes('staggered-reveal' as any);
      const animationDelay = hasStagger ? `animation-delay: ${index * 0.1}s;` : '';
      
      // Check if we have a template for this component
      const template = COMPONENT_TEMPLATES[component as keyof typeof COMPONENT_TEMPLATES];
      if (template) {
        return template.render(theme, animationClass, animationDelay, config.content);
      }
      
      // Fallback for unknown components
      return `
        <section class="${animationClass}" style="padding: 4rem 2rem; background: ${theme.bg}; color: ${theme.text}; text-align: center; ${animationDelay}">
          <div style="max-width: 800px; margin: 0 auto;">
            <h2 style="font-size: 2rem; color: ${theme.text}; margin-bottom: 1rem;">${component.charAt(0).toUpperCase() + component.slice(1)}</h2>
            <p style="color: ${theme.secondary};">This ${component} section will be implemented soon.</p>
          </div>
        </section>
      `;
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
          html {
            scroll-behavior: smooth;
          }
          body { 
            font-family: ${config.typography?.replace('font-', '') || 'sans-serif'}, system-ui, -apple-system, sans-serif;
            line-height: 1.6;
            background: ${theme.bg};
            color: ${theme.text};
            overflow-x: hidden;
            overflow-y: auto;
            min-height: 100vh;
          }
          
          /* Dynamic Animations based on config */
          ${config.animations.includes('fade-in') ? `
          .fade-in { 
            animation: fadeIn 0.8s ease-in-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          ` : ''}
          
          ${config.animations.includes('slide-up') ? `
          .slide-up {
            animation: slideUp 0.6s ease-out;
          }
          @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          ` : ''}
          
          ${config.animations.includes('slide-left') ? `
          .slide-left {
            animation: slideLeft 0.6s ease-out;
          }
          @keyframes slideLeft {
            from { transform: translateX(30px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          ` : ''}
          
          ${config.animations.includes('slide-right') ? `
          .slide-right {
            animation: slideRight 0.6s ease-out;
          }
          @keyframes slideRight {
            from { transform: translateX(-30px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          ` : ''}
          
          ${config.animations.includes('zoom-in') ? `
          .zoom-in {
            animation: zoomIn 0.6s ease-out;
          }
          @keyframes zoomIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          ` : ''}
          
          ${config.animations.includes('rotate-in') ? `
          .rotate-in {
            animation: rotateIn 0.8s ease-out;
          }
          @keyframes rotateIn {
            from { transform: rotate(-10deg) scale(0.8); opacity: 0; }
            to { transform: rotate(0deg) scale(1); opacity: 1; }
          }
          ` : ''}

          ${config.animations.includes('bounce-in' as any) ? `
          .bounce-in {
            animation: bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          }
          @keyframes bounceIn {
            from { transform: scale(0.3); opacity: 0; }
            50% { transform: scale(1.05); opacity: 0.8; }
            70% { transform: scale(0.9); opacity: 0.9; }
            to { transform: scale(1); opacity: 1; }
          }
          ` : ''}
          
          /* Enhanced Interactive Effects */
          .interactive-element {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .interactive-element:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          }
          
          .button-liquid {
            border-radius: 1rem;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }
          
          .button-liquid:hover {
            transform: scale(1.05);
            box-shadow: 0 8px 20px rgba(0,0,0,0.2);
          }
          
          .button-liquid:before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s;
          }
          
          .button-liquid:hover:before {
            left: 100%;
          }
          
          .card-liquid {
            border-radius: 1.5rem;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }
          
          .card-liquid:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0,0,0,0.1);
          }

          .project-card:hover .project-image {
            transform: scale(1.05);
          }

          .project-image {
            transition: transform 0.3s ease;
          }
          
          .social-link:hover {
            transform: scale(1.1) rotate(5deg);
          }
          
          .nav-link:hover {
            background: ${theme.accent}20;
            color: ${theme.accent};
          }

          .skill-tag:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          }

          .timeline-item:hover {
            transform: scale(1.02);
          }

          .stat-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 16px rgba(0,0,0,0.1);
          }

          .testimonial-card:hover {
            transform: translateY(-3px);
          }

          .contact-item:hover {
            transform: translateY(-3px);
          }

          .award-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 24px rgba(0,0,0,0.1);
          }

          .blog-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 24px rgba(0,0,0,0.1);
          }

          .gallery-item:hover .gallery-overlay {
            opacity: 1;
          }

          .gallery-item:hover {
            transform: scale(1.02);
          }

          /* Responsive Design */
          @media (max-width: 768px) {
            .grid {
              grid-template-columns: 1fr !important;
            }
            h1 { font-size: 2.5rem !important; }
            h2 { font-size: 2rem !important; }
            .timeline-item {
              justify-content: center !important;
            }
            .timeline-item > div {
              width: 90% !important;
            }
          }

          /* Smooth Scrolling */
          html {
            scroll-behavior: smooth;
          }

          /* Custom Scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: ${theme.secondary}20;
          }
          
          ::-webkit-scrollbar-thumb {
            background: ${theme.accent};
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: ${theme.secondary};
          }
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
    <div className="h-full flex flex-col bg-muted/30">
      {/* Preview Controls */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card/50">
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Live Preview</span>
          <Badge variant="outline" className="text-xs">
            {config.theme}
          </Badge>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 p-4 flex items-start justify-center overflow-auto">
        <div 
          className={`
            relative bg-white border border-border shadow-lg overflow-auto
            ${getPreviewWidth()}
            ${deviceMode !== 'desktop' ? 'rounded-xl' : 'rounded-lg'}
          `}
          style={{
            height: deviceMode === 'mobile' ? '667px' : deviceMode === 'tablet' ? '1024px' : 'calc(100vh - 200px)',
            maxHeight: '90vh',
            minHeight: '400px'
          }}
        >
          {/* Loading overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-background flex items-center justify-center z-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}
          
          {/* Preview iframe */}
          <iframe
            ref={iframeRef}
            className="w-full h-full border-none"
            title="Portfolio Preview"
            sandbox="allow-scripts allow-same-origin"
            scrolling="yes"
          />
        </div>
      </div>
    </div>
  );
};