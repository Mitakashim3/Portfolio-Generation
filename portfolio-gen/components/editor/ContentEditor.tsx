'use client'

import { useState } from 'react'
import { EditableText, EditableImage, EditableList, EditableSelect } from './EditableComponents'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Award, 
  MessageSquare, 
  Trophy,
  BookOpen,
  Mail,
  Plus,
  Trash2,
  Star,
  ImageIcon
} from 'lucide-react'
import type { PortfolioContent, Skill, Project, Experience, Education, Testimonial, Award as AwardType, BlogPost, GalleryItem } from '@/components/models/PortfolioContent'

interface ContentEditorProps {
  content: PortfolioContent
  onContentChange: (content: PortfolioContent) => void
}

export function ContentEditor({ content, onContentChange }: ContentEditorProps) {
  const [activeTab, setActiveTab] = useState('personal')

  const updateContent = (section: keyof PortfolioContent, data: any) => {
    onContentChange({
      ...content,
      [section]: data
    })
  }

  const tabs = [
    { id: 'personal', label: 'Personal', icon: User },
    { id: 'work', label: 'Work', icon: Briefcase },
    { id: 'content', label: 'Content', icon: BookOpen },
    { id: 'contact', label: 'Contact', icon: Mail }
  ]

  return (
    <div className="h-full flex flex-col">
      {/* Tab Navigation */}
      <div className="border-b border-border p-2 flex-shrink-0">
        <div className="grid grid-cols-4 gap-1">
          {tabs.map(tab => {
            const Icon = tab.icon
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className="flex flex-col items-center gap-1 h-auto py-2"
              >
                <Icon className="h-4 w-4" />
                <span className="text-xs">{tab.label}</span>
              </Button>
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === 'personal' && (
          <>
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <User className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-foreground">Personal Information</h3>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-foreground">Profile Image</label>
                  <div className="mt-1 w-24 h-24">
                    <EditableImage
                      src={content.personalInfo.profileImage}
                      alt="Profile"
                      onChange={(src) => updateContent('personalInfo', { ...content.personalInfo, profileImage: src })}
                      className="w-full h-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Name</label>
                  <EditableText
                    value={content.personalInfo.name}
                    onChange={(name) => updateContent('personalInfo', { ...content.personalInfo, name })}
                    className="mt-1 text-lg font-semibold text-foreground"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Tagline</label>
                  <EditableText
                    value={content.personalInfo.tagline}
                    onChange={(tagline) => updateContent('personalInfo', { ...content.personalInfo, tagline })}
                    className="mt-1 text-foreground"
                    placeholder="Your professional title"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Description</label>
                  <EditableText
                    value={content.personalInfo.description}
                    onChange={(description) => updateContent('personalInfo', { ...content.personalInfo, description })}
                    className="mt-1 text-foreground"
                    placeholder="Tell us about yourself"
                    multiline
                    maxLength={500}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Award className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-foreground">Skills</h3>
              </div>
              
              <EditableList
                items={content.skills}
                onChange={(skills) => updateContent('skills', skills)}
                onAdd={() => ({ 
                  name: 'New Skill', 
                  level: 80, 
                  category: 'Frontend',
                  color: '#3b82f6' 
                })}
                addButtonText="Add Skill"
                renderItem={(skill: Skill, index, onUpdate, onDelete) => (
                  <Card key={index} className="p-3 mb-2 border-l-4" style={{ borderLeftColor: skill.color }}>
                    <div className="flex justify-between items-start mb-2">
                      <EditableText
                        value={skill.name}
                        onChange={(name) => onUpdate({ ...skill, name })}
                        className="font-medium"
                      />
                      <Button size="sm" variant="ghost" onClick={onDelete} className="h-6 w-6 p-0">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <label className="text-xs text-muted-foreground">Category</label>
                        <EditableSelect
                          value={skill.category}
                          options={[
                            { value: 'Frontend', label: 'Frontend' },
                            { value: 'Backend', label: 'Backend' },
                            { value: 'DevOps', label: 'DevOps' },
                            { value: 'Design', label: 'Design' },
                            { value: 'Other', label: 'Other' }
                          ]}
                          onChange={(category) => onUpdate({ ...skill, category })}
                          className="text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">Level: {skill.level}%</label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={skill.level}
                          onChange={(e) => onUpdate({ ...skill, level: parseInt(e.target.value) })}
                          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                          style={{
                            background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${skill.level}%, hsl(var(--muted)) ${skill.level}%, hsl(var(--muted)) 100%)`
                          }}
                        />
                      </div>
                    </div>
                  </Card>
                )}
              />
            </Card>
          </>
        )}

        {activeTab === 'work' && (
          <>
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Briefcase className="h-4 w-4" />
                <h3 className="font-semibold">Projects</h3>
              </div>
              
              <EditableList
                items={content.projects}
                onChange={(projects) => updateContent('projects', projects)}
                onAdd={() => ({
                  id: Date.now().toString(),
                  title: 'New Project',
                  description: 'Project description',
                  technologies: [],
                  category: 'Web App',
                  featured: false,
                  date: new Date().getFullYear().toString(),
                  status: 'completed' as const
                })}
                addButtonText="Add Project"
                renderItem={(project: Project, index, onUpdate, onDelete) => (
                  <Card key={project.id} className="p-3 mb-3">
                    <div className="flex justify-between items-start mb-2">
                      <EditableText
                        value={project.title}
                        onChange={(title) => onUpdate({ ...project, title })}
                        className="font-medium"
                      />
                      <div className="flex gap-1">
                        {project.featured && <Badge variant="outline" className="text-xs">Featured</Badge>}
                        <Button size="sm" variant="ghost" onClick={onDelete} className="h-6 w-6 p-0">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <EditableText
                        value={project.description}
                        onChange={(description) => onUpdate({ ...project, description })}
                        multiline
                        placeholder="Project description"
                        className="text-sm"
                      />
                      
                      <div className="grid grid-cols-2 gap-2">
                        <EditableSelect
                          value={project.category}
                          options={[
                            { value: 'Web App', label: 'Web App' },
                            { value: 'Mobile', label: 'Mobile' },
                            { value: 'Desktop', label: 'Desktop' },
                            { value: 'API', label: 'API' },
                            { value: 'Other', label: 'Other' }
                          ]}
                          onChange={(category) => onUpdate({ ...project, category })}
                        />
                        
                        <EditableText
                          value={project.date}
                          onChange={(date) => onUpdate({ ...project, date })}
                          placeholder="Year"
                        />
                      </div>

                      <div className="flex gap-2">
                        <label className="flex items-center text-sm">
                          <input
                            type="checkbox"
                            checked={project.featured}
                            onChange={(e) => onUpdate({ ...project, featured: e.target.checked })}
                            className="mr-1"
                          />
                          Featured
                        </label>
                      </div>
                    </div>
                  </Card>
                )}
              />
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Briefcase className="h-4 w-4" />
                <h3 className="font-semibold">Work Experience</h3>
              </div>
              
              <EditableList
                items={content.experience}
                onChange={(experience) => updateContent('experience', experience)}
                onAdd={() => ({
                  id: Date.now().toString(),
                  title: 'New Position',
                  company: 'Company Name',
                  period: 'Start - End',
                  description: 'Role description and achievements',
                  current: false
                })}
                addButtonText="Add Experience"
                renderItem={(exp: Experience, index, onUpdate, onDelete) => (
                  <Card key={exp.id} className="p-3 mb-3">
                    <div className="flex justify-between items-start mb-2">
                      <EditableText
                        value={exp.title}
                        onChange={(title) => onUpdate({ ...exp, title })}
                        className="font-medium"
                      />
                      <div className="flex gap-1">
                        {exp.current && <Badge variant="outline" className="text-xs">Current</Badge>}
                        <Button size="sm" variant="ghost" onClick={onDelete} className="h-6 w-6 p-0">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <EditableText
                        value={exp.company}
                        onChange={(company) => onUpdate({ ...exp, company })}
                        className="text-sm font-medium text-muted-foreground"
                        placeholder="Company name"
                      />
                      
                      <EditableText
                        value={exp.period}
                        onChange={(period) => onUpdate({ ...exp, period })}
                        className="text-sm text-muted-foreground"
                        placeholder="e.g., Jan 2020 - Present"
                      />

                      <EditableText
                        value={exp.description}
                        onChange={(description) => onUpdate({ ...exp, description })}
                        multiline
                        placeholder="Describe your role and achievements"
                        className="text-sm"
                      />

                      <div className="flex gap-2">
                        <label className="flex items-center text-sm">
                          <input
                            type="checkbox"
                            checked={exp.current}
                            onChange={(e) => onUpdate({ ...exp, current: e.target.checked })}
                            className="mr-1"
                          />
                          Current Position
                        </label>
                      </div>
                    </div>
                  </Card>
                )}
              />
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="h-4 w-4" />
                <h3 className="font-semibold">Education</h3>
              </div>
              
              <EditableList
                items={content.education}
                onChange={(education) => updateContent('education', education)}
                onAdd={() => ({
                  id: Date.now().toString(),
                  degree: 'Degree Name',
                  institution: 'Institution Name',
                  period: 'Start - End',
                  description: 'Educational details',
                  gpa: ''
                })}
                addButtonText="Add Education"
                renderItem={(edu: Education, index, onUpdate, onDelete) => (
                  <Card key={edu.id} className="p-3 mb-3">
                    <div className="flex justify-between items-start mb-2">
                      <EditableText
                        value={edu.degree}
                        onChange={(degree) => onUpdate({ ...edu, degree })}
                        className="font-medium"
                      />
                      <Button size="sm" variant="ghost" onClick={onDelete} className="h-6 w-6 p-0">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <EditableText
                        value={edu.institution}
                        onChange={(institution) => onUpdate({ ...edu, institution })}
                        className="text-sm font-medium text-muted-foreground"
                        placeholder="Institution name"
                      />
                      
                      <EditableText
                        value={edu.period}
                        onChange={(period) => onUpdate({ ...edu, period })}
                        className="text-sm text-muted-foreground"
                        placeholder="e.g., 2016 - 2020"
                      />

                      {edu.description && (
                        <EditableText
                          value={edu.description}
                          onChange={(description) => onUpdate({ ...edu, description })}
                          multiline
                          placeholder="Additional details"
                          className="text-sm"
                        />
                      )}

                      {edu.gpa && (
                        <EditableText
                          value={edu.gpa}
                          onChange={(gpa) => onUpdate({ ...edu, gpa })}
                          className="text-sm"
                          placeholder="GPA (optional)"
                        />
                      )}
                    </div>
                  </Card>
                )}
              />
            </Card>
          </>
        )}

        {activeTab === 'content' && (
          <>
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="h-4 w-4" />
                <h3 className="font-semibold">Testimonials</h3>
              </div>
              
              <EditableList
                items={content.testimonials}
                onChange={(testimonials) => updateContent('testimonials', testimonials)}
                onAdd={() => ({
                  id: Date.now().toString(),
                  text: 'Great testimonial text',
                  author: 'Client Name',
                  role: 'Position',
                  company: 'Company',
                  rating: 5
                })}
                addButtonText="Add Testimonial"
                renderItem={(testimonial: Testimonial, index, onUpdate, onDelete) => (
                  <Card key={testimonial.id} className="p-3 mb-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 cursor-pointer transition-colors ${
                              i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-muted-foreground'
                            }`}
                            onClick={() => onUpdate({ ...testimonial, rating: i + 1 })}
                          />
                        ))}
                      </div>
                      <Button size="sm" variant="ghost" onClick={onDelete} className="h-6 w-6 p-0">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <EditableText
                        value={testimonial.text}
                        onChange={(text) => onUpdate({ ...testimonial, text })}
                        multiline
                        placeholder="Testimonial text"
                        className="text-sm italic"
                      />
                      <EditableText
                        value={testimonial.author}
                        onChange={(author) => onUpdate({ ...testimonial, author })}
                        className="font-medium"
                      />
                      <EditableText
                        value={testimonial.role}
                        onChange={(role) => onUpdate({ ...testimonial, role })}
                        className="text-sm text-muted-foreground"
                      />
                      {testimonial.company && (
                        <EditableText
                          value={testimonial.company}
                          onChange={(company) => onUpdate({ ...testimonial, company })}
                          className="text-sm text-muted-foreground"
                          placeholder="Company name"
                        />
                      )}
                    </div>
                  </Card>
                )}
              />
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Trophy className="h-4 w-4" />
                <h3 className="font-semibold">Awards & Recognition</h3>
              </div>
              
              <EditableList
                items={content.awards}
                onChange={(awards) => updateContent('awards', awards)}
                onAdd={() => ({
                  id: Date.now().toString(),
                  title: 'Award Title',
                  organization: 'Awarding Organization',
                  year: new Date().getFullYear().toString(),
                  description: 'Award description'
                })}
                addButtonText="Add Award"
                renderItem={(award: AwardType, index, onUpdate, onDelete) => (
                  <Card key={award.id} className="p-3 mb-3">
                    <div className="flex justify-between items-start mb-2">
                      <EditableText
                        value={award.title}
                        onChange={(title) => onUpdate({ ...award, title })}
                        className="font-medium"
                      />
                      <Button size="sm" variant="ghost" onClick={onDelete} className="h-6 w-6 p-0">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <EditableText
                        value={award.organization}
                        onChange={(organization) => onUpdate({ ...award, organization })}
                        className="text-sm font-medium text-muted-foreground"
                        placeholder="Awarding organization"
                      />
                      
                      <EditableText
                        value={award.year}
                        onChange={(year) => onUpdate({ ...award, year })}
                        className="text-sm text-muted-foreground"
                        placeholder="Year received"
                      />

                      <EditableText
                        value={award.description}
                        onChange={(description) => onUpdate({ ...award, description })}
                        multiline
                        placeholder="Award description"
                        className="text-sm"
                      />
                    </div>
                  </Card>
                )}
              />
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="h-4 w-4" />
                <h3 className="font-semibold">Blog Posts</h3>
              </div>
              
              <EditableList
                items={content.blog}
                onChange={(blog) => updateContent('blog', blog)}
                onAdd={() => ({
                  id: Date.now().toString(),
                  title: 'Blog Post Title',
                  excerpt: 'Brief description of the blog post',
                  date: new Date().toLocaleDateString(),
                  readTime: '5 min read',
                  category: 'Technology',
                  url: ''
                })}
                addButtonText="Add Blog Post"
                renderItem={(post: BlogPost, index, onUpdate, onDelete) => (
                  <Card key={post.id} className="p-3 mb-3">
                    <div className="flex justify-between items-start mb-2">
                      <EditableText
                        value={post.title}
                        onChange={(title) => onUpdate({ ...post, title })}
                        className="font-medium"
                      />
                      <Button size="sm" variant="ghost" onClick={onDelete} className="h-6 w-6 p-0">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <EditableText
                        value={post.excerpt}
                        onChange={(excerpt) => onUpdate({ ...post, excerpt })}
                        multiline
                        placeholder="Brief description"
                        className="text-sm"
                      />
                      
                      <div className="grid grid-cols-2 gap-2">
                        <EditableText
                          value={post.category}
                          onChange={(category) => onUpdate({ ...post, category })}
                          className="text-sm text-muted-foreground"
                          placeholder="Category"
                        />
                        
                        <EditableText
                          value={post.readTime}
                          onChange={(readTime) => onUpdate({ ...post, readTime })}
                          className="text-sm text-muted-foreground"
                          placeholder="5 min read"
                        />
                      </div>

                      <EditableText
                        value={post.date}
                        onChange={(date) => onUpdate({ ...post, date })}
                        className="text-sm text-muted-foreground"
                        placeholder="Publication date"
                      />

                      {post.url && (
                        <EditableText
                          value={post.url}
                          onChange={(url) => onUpdate({ ...post, url })}
                          type="url"
                          className="text-sm"
                          placeholder="Blog post URL"
                        />
                      )}
                    </div>
                  </Card>
                )}
              />
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <ImageIcon className="h-4 w-4" />
                <h3 className="font-semibold">Gallery</h3>
              </div>
              
              <EditableList
                items={content.gallery}
                onChange={(gallery) => updateContent('gallery', gallery)}
                onAdd={() => ({
                  id: Date.now().toString(),
                  title: 'Gallery Item',
                  description: 'Item description',
                  image: '/placeholder-image.jpg',
                  category: 'Design',
                  tags: ['tag1', 'tag2']
                })}
                addButtonText="Add Gallery Item"
                renderItem={(item: GalleryItem, index, onUpdate, onDelete) => (
                  <Card key={item.id} className="p-3 mb-3">
                    <div className="flex justify-between items-start mb-2">
                      <EditableText
                        value={item.title}
                        onChange={(title) => onUpdate({ ...item, title })}
                        className="font-medium"
                      />
                      <Button size="sm" variant="ghost" onClick={onDelete} className="h-6 w-6 p-0">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <div className="w-20 h-20">
                        <EditableImage
                          src={item.image}
                          alt={item.title}
                          onChange={(image) => onUpdate({ ...item, image })}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>

                      {item.description && (
                        <EditableText
                          value={item.description}
                          onChange={(description) => onUpdate({ ...item, description })}
                          multiline
                          placeholder="Item description"
                          className="text-sm"
                        />
                      )}
                      
                      {item.category && (
                        <EditableText
                          value={item.category}
                          onChange={(category) => onUpdate({ ...item, category })}
                          className="text-sm text-muted-foreground"
                          placeholder="Category"
                        />
                      )}

                      {item.tags && (
                        <div className="flex flex-wrap gap-1">
                          {item.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </Card>
                )}
              />
            </Card>
          </>
        )}

        {activeTab === 'contact' && (
          <>
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Mail className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-foreground">Contact Information</h3>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <EditableText
                    value={content.contact.email}
                    onChange={(email) => updateContent('contact', { ...content.contact, email })}
                    type="email"
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Phone</label>
                  <EditableText
                    value={content.contact.phone || ''}
                    onChange={(phone) => updateContent('contact', { ...content.contact, phone })}
                    className="mt-1"
                    placeholder="Phone number"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Location</label>
                  <EditableText
                    value={content.contact.location || ''}
                    onChange={(location) => updateContent('contact', { ...content.contact, location })}
                    className="mt-1"
                    placeholder="City, Country"
                  />
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-3 text-foreground">Social Links</h3>
              <div className="space-y-2">
                {Object.entries(content.socialLinks).map(([platform, url]) => (
                  <div key={platform}>
                    <label className="text-sm font-medium capitalize text-foreground">{platform}</label>
                    <EditableText
                      value={url || ''}
                      onChange={(newUrl) => updateContent('socialLinks', { 
                        ...content.socialLinks, 
                        [platform]: newUrl 
                      })}
                      type="url"
                      className="mt-1"
                      placeholder={`Your ${platform} URL`}
                    />
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}