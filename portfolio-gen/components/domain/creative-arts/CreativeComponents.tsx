import React from 'react';
import { BaseComponentProps, Section, ResponsiveContainer, Heading, Text, Button, AnimatedSection, Grid, Card } from '../shared/BaseComponents';

export const CreativeHero: React.FC<BaseComponentProps> = ({ config, componentConfig }) => {
  const { personalInfo } = config;

  return (
    <Section id="hero" spacing="xl" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-orange-500/20" />
      
      <ResponsiveContainer className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          <AnimatedSection animation="slide-left" className="space-y-8">
            <div>
              <Text variant="small" className="text-primary font-semibold uppercase tracking-wider mb-4">
                Creative Professional
              </Text>
              <Heading level={1} className="mb-6 leading-tight">
                {personalInfo.name}
              </Heading>
              <Heading level={2} className="text-muted-foreground font-light mb-8">
                {personalInfo.title}
              </Heading>
            </div>

            <Text variant="lead" className="mb-8">
              {personalInfo.bio}
            </Text>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg" href="#gallery">
                View Portfolio
              </Button>
              <Button variant="outline" size="lg" href="#contact">
                Work Together
              </Button>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-8 pt-8">
              <div>
                <Text variant="large" className="text-primary">
                  {config.projects?.length || 0}+
                </Text>
                <Text variant="small" className="text-muted-foreground">
                  Projects
                </Text>
              </div>
              <div>
                <Text variant="large" className="text-primary">
                  {config.testimonials?.length || 0}+
                </Text>
                <Text variant="small" className="text-muted-foreground">
                  Happy Clients
                </Text>
              </div>
              <div>
                <Text variant="large" className="text-primary">
                  {config.awards?.length || 0}+
                </Text>
                <Text variant="small" className="text-muted-foreground">
                  Awards
                </Text>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slide-right" delay={200}>
            <div className="relative">
              <div className="relative z-10">
                {personalInfo.avatar ? (
                  <img 
                    src={personalInfo.avatar} 
                    alt={personalInfo.name}
                    className="w-full h-auto rounded-2xl shadow-2xl"
                  />
                ) : (
                  <div className="aspect-[4/5] bg-gradient-to-br from-primary via-purple-500 to-accent rounded-2xl flex items-center justify-center">
                    <span className="text-6xl font-bold text-white">
                      {personalInfo.name.split(' ').map((n: string) => n[0]).join('')}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
            </div>
          </AnimatedSection>
        </div>
      </ResponsiveContainer>
    </Section>
  );
};

export const CreativeGallery: React.FC<BaseComponentProps> = ({ config, componentConfig }) => {
  const projects = config.projects || [];
  const categories = Array.from(new Set(projects.map((p: any) => p.category))) as string[];

  return (
    <Section id="gallery" spacing="lg">
      <ResponsiveContainer>
        <AnimatedSection animation="fade-in">
          <div className="text-center mb-16">
            <Heading level={2} className="mb-6">
              Creative Portfolio
            </Heading>
            <Text variant="lead" className="max-w-2xl mx-auto">
              Explore my creative journey through various projects and artistic endeavors
            </Text>
          </div>
        </AnimatedSection>

        {/* Category filters */}
        <AnimatedSection animation="slide-up" delay={200}>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button variant="primary" size="sm">
              All Work
            </Button>
            {categories.map((category: string) => (
              <Button key={category} variant="ghost" size="sm">
                {category}
              </Button>
            ))}
          </div>
        </AnimatedSection>

        {/* Masonry-style gallery */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {projects.map((project: any, index: number) => (
            <AnimatedSection 
              key={project.id} 
              animation="fade-in" 
              delay={index * 100}
              className="break-inside-avoid"
            >
              <Card 
                variant="elevated" 
                padding="sm" 
                hover 
                className="group cursor-pointer overflow-hidden"
              >
                <div className="relative overflow-hidden rounded-lg">
                  {project.images[0] ? (
                    <img 
                      src={project.images[0]} 
                      alt={project.title}
                      className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="aspect-[4/3] bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <span className="text-white font-bold text-xl">{project.title[0]}</span>
                    </div>
                  )}
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center text-white p-4">
                      <Heading level={3} className="text-white mb-2">
                        {project.title}
                      </Heading>
                      <Text className="text-white/80 text-sm mb-4">
                        {project.category}
                      </Text>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Heading level={3} className="mb-2 text-lg">
                    {project.title}
                  </Heading>
                  <Text variant="small" className="text-muted-foreground">
                    {project.category}
                  </Text>
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection animation="fade-in" delay={600}>
          <div className="text-center mt-16">
            <Button variant="outline" size="lg">
              Load More Projects
            </Button>
          </div>
        </AnimatedSection>
      </ResponsiveContainer>
    </Section>
  );
};

export const CreativeCaseStudies: React.FC<BaseComponentProps> = ({ config, componentConfig }) => {
  const featuredProjects = config.projects?.filter((p: any) => p.featured) || [];

  return (
    <Section id="case-studies" spacing="lg" background="secondary">
      <ResponsiveContainer>
        <AnimatedSection animation="fade-in">
          <div className="text-center mb-16">
            <Heading level={2} className="mb-6">
              Featured Case Studies
            </Heading>
            <Text variant="lead" className="max-w-2xl mx-auto">
              Deep dives into some of my most impactful creative projects
            </Text>
          </div>
        </AnimatedSection>

        <div className="space-y-20">
          {featuredProjects.map((project: any, index: number) => (
            <AnimatedSection 
              key={project.id} 
              animation="slide-up" 
              delay={index * 200}
            >
              <div className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <Card variant="glass" padding="lg">
                    <div className="space-y-6">
                      <div>
                        <Text variant="small" className="text-primary font-semibold uppercase tracking-wider mb-2">
                          {project.category}
                        </Text>
                        <Heading level={2} className="mb-4">
                          {project.title}
                        </Heading>
                      </div>

                      <Text className="text-lg leading-relaxed">
                        {project.description}
                      </Text>

                      <div>
                        <Text variant="large" className="mb-4">
                          Key Technologies
                        </Text>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech: string) => (
                            <span 
                              key={tech}
                              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4">
                        {project.demoUrl && (
                          <Button variant="primary" href={project.demoUrl}>
                            View Live Project
                          </Button>
                        )}
                        <Button variant="outline">
                          Read Full Case Study
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div className="relative">
                    {project.images[0] ? (
                      <img 
                        src={project.images[0]} 
                        alt={project.title}
                        className="w-full h-auto rounded-2xl shadow-2xl"
                      />
                    ) : (
                      <div className="aspect-[4/3] bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center">
                        <span className="text-white font-bold text-4xl">{project.title[0]}</span>
                      </div>
                    )}
                    
                    {/* Additional project images */}
                    {project.images.length > 1 && (
                      <div className="absolute -bottom-6 -right-6 grid grid-cols-2 gap-2">
                        {project.images.slice(1, 3).map((image: string, imgIndex: number) => (
                          <img 
                            key={imgIndex}
                            src={image} 
                            alt={`${project.title} ${imgIndex + 2}`}
                            className="w-20 h-20 object-cover rounded-lg shadow-lg"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </ResponsiveContainer>
    </Section>
  );
};

export const CreativeTestimonials: React.FC<BaseComponentProps> = ({ config, componentConfig }) => {
  const testimonials = config.testimonials || [];

  return (
    <Section id="testimonials" spacing="lg">
      <ResponsiveContainer>
        <AnimatedSection animation="fade-in">
          <div className="text-center mb-16">
            <Heading level={2} className="mb-6">
              What Clients Say
            </Heading>
            <Text variant="lead" className="max-w-2xl mx-auto">
              Hear from the amazing people I've had the pleasure to work with
            </Text>
          </div>
        </AnimatedSection>

        <Grid 
          cols={{ default: 1, md: 2, lg: 3 }} 
          gap="lg"
        >
          {testimonials.map((testimonial, index) => (
            <AnimatedSection 
              key={testimonial.id} 
              animation="slide-up" 
              delay={index * 150}
            >
              <Card 
                variant="elevated" 
                padding="lg" 
                hover
                className="h-full relative"
              >
                {/* Quote mark */}
                <div className="absolute top-4 right-4 text-4xl text-primary/20">
                  "
                </div>

                <div className="space-y-6">
                  {/* Rating */}
                  {testimonial.rating && (
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonial.rating! ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  )}

                  <Text className="italic text-lg leading-relaxed">
                    "{testimonial.content}"
                  </Text>

                  <div className="flex items-center gap-4">
                    {testimonial.avatar ? (
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                        {testimonial.name[0]}
                      </div>
                    )}
                    
                    <div>
                      <Text variant="large" className="font-semibold">
                        {testimonial.name}
                      </Text>
                      <Text variant="small" className="text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </Text>
                    </div>
                  </div>
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </Grid>
      </ResponsiveContainer>
    </Section>
  );
};
