// Portfolio content data model for editable components

export interface PersonalInfo {
  name: string
  tagline: string
  description: string
  email: string
  phone?: string
  location?: string
  website?: string
  profileImage?: string
  resumeUrl?: string
}

export interface SocialLinks {
  github?: string
  linkedin?: string
  twitter?: string
  instagram?: string
  dribbble?: string
  behance?: string
  email?: string
}

export interface Skill {
  name: string
  level: number
  category: string
  icon?: string
  color?: string
}

export interface Project {
  id: string
  title: string
  description: string
  image?: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  category: string
  featured: boolean
  date: string
  status: 'completed' | 'in-progress' | 'planned'
}

export interface Experience {
  id: string
  title: string
  company: string
  period: string
  description: string
  logo?: string
  current: boolean
}

export interface Education {
  id: string
  degree: string
  institution: string
  period: string
  description?: string
  gpa?: string
}

export interface Testimonial {
  id: string
  text: string
  author: string
  role: string
  company?: string
  rating: number
  image?: string
}

export interface Award {
  id: string
  title: string
  organization: string
  year: string
  description: string
  image?: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  image?: string
  url?: string
}

export interface GalleryItem {
  id: string
  title: string
  description?: string
  image: string
  category?: string
  tags?: string[]
}

export interface ContactInfo {
  email: string
  phone?: string
  location?: string
  availability?: string
  preferredContact?: 'email' | 'phone' | 'form'
}

// Main portfolio content interface
export interface PortfolioContent {
  personalInfo: PersonalInfo
  socialLinks: SocialLinks
  skills: Skill[]
  projects: Project[]
  experience: Experience[]
  education: Education[]
  testimonials: Testimonial[]
  awards: Award[]
  blog: BlogPost[]
  gallery: GalleryItem[]
  contact: ContactInfo
  customSections?: Record<string, any>
}

// Default content for initialization
export const DEFAULT_CONTENT: PortfolioContent = {
  personalInfo: {
    name: "John Doe",
    tagline: "Full Stack Developer & UI/UX Designer",
    description: "I'm a passionate full-stack developer with over 5 years of experience creating digital solutions that make a difference. I specialize in modern web technologies and love turning complex problems into simple, beautiful designs.",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "https://johndoe.dev",
    profileImage: "/placeholder-avatar.jpg",
    resumeUrl: "/resume.pdf"
  },
  socialLinks: {
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    twitter: "https://twitter.com/johndoe",
    email: "john.doe@example.com"
  },
  skills: [
    { name: "React/Next.js", level: 90, category: "Frontend", color: "#61dafb" },
    { name: "TypeScript", level: 85, category: "Frontend", color: "#3178c6" },
    { name: "CSS/Tailwind", level: 88, category: "Frontend", color: "#06b6d4" },
    { name: "Node.js", level: 85, category: "Backend", color: "#339933" },
    { name: "Python/Django", level: 80, category: "Backend", color: "#3776ab" },
    { name: "PostgreSQL", level: 75, category: "Backend", color: "#336791" },
    { name: "AWS/Azure", level: 70, category: "DevOps", color: "#ff9900" },
    { name: "Docker", level: 75, category: "DevOps", color: "#2496ed" },
    { name: "CI/CD", level: 72, category: "DevOps", color: "#4285f4" }
  ],
  projects: [
    {
      id: "1",
      title: "E-Commerce Platform",
      description: "Full-stack web application with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.",
      image: "/project1.jpg",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "https://ecommerce-demo.com",
      githubUrl: "https://github.com/johndoe/ecommerce",
      category: "Web App",
      featured: true,
      date: "2024",
      status: "completed"
    },
    {
      id: "2",
      title: "Mobile Task Manager",
      description: "Cross-platform mobile app built with React Native. Real-time synchronization and offline capabilities.",
      image: "/project2.jpg",
      technologies: ["React Native", "Firebase", "Redux"],
      liveUrl: "https://taskmanager-app.com",
      githubUrl: "https://github.com/johndoe/taskmanager",
      category: "Mobile",
      featured: true,
      date: "2024",
      status: "completed"
    },
    {
      id: "3",
      title: "Data Dashboard",
      description: "Interactive dashboard for business analytics with real-time data visualization and reporting features.",
      image: "/project3.jpg",
      technologies: ["Vue.js", "D3.js", "Python", "PostgreSQL"],
      liveUrl: "https://dashboard-demo.com",
      githubUrl: "https://github.com/johndoe/dashboard",
      category: "Web App",
      featured: false,
      date: "2023",
      status: "completed"
    }
  ],
  experience: [
    {
      id: "1",
      title: "Senior Full Stack Developer",
      company: "Tech Innovations Inc.",
      period: "2022 - Present",
      description: "Led development of scalable web applications, mentored junior developers, and implemented CI/CD pipelines.",
      current: true
    },
    {
      id: "2",
      title: "Frontend Developer",
      company: "Digital Solutions Ltd.",
      period: "2020 - 2022",
      description: "Built responsive user interfaces, collaborated with design teams, and optimized application performance.",
      current: false
    },
    {
      id: "3",
      title: "Junior Developer",
      company: "StartupXYZ",
      period: "2019 - 2020",
      description: "Developed features for MVP products, learned modern frameworks, and contributed to code reviews.",
      current: false
    }
  ],
  education: [
    {
      id: "1",
      degree: "Bachelor of Computer Science",
      institution: "University of Technology",
      period: "2016 - 2020",
      description: "Specialized in Software Engineering and Data Structures. Graduated Magna Cum Laude.",
      gpa: "3.8"
    },
    {
      id: "2",
      degree: "Full Stack Web Development Bootcamp",
      institution: "Code Academy Pro",
      period: "2019",
      description: "Intensive 6-month program covering modern web technologies and best practices."
    }
  ],
  testimonials: [
    {
      id: "1",
      text: "John delivered exceptional work on our e-commerce platform. His attention to detail and technical expertise made the project a huge success.",
      author: "Sarah Johnson",
      role: "CEO",
      company: "TechCorp",
      rating: 5
    },
    {
      id: "2",
      text: "Working with John was a pleasure. He understood our requirements perfectly and delivered beyond our expectations.",
      author: "Mike Chen",
      role: "Product Manager",
      company: "InnovateLab",
      rating: 5
    },
    {
      id: "3",
      text: "Professional, reliable, and skilled. John helped us transform our digital presence completely.",
      author: "Emily Davis",
      role: "Founder",
      company: "StartupXYZ",
      rating: 5
    }
  ],
  awards: [
    {
      id: "1",
      title: "Best Web Application",
      organization: "Tech Awards 2023",
      year: "2023",
      description: "Recognized for innovative e-commerce platform design"
    },
    {
      id: "2",
      title: "Developer of the Year",
      organization: "Local Tech Community",
      year: "2022",
      description: "Outstanding contribution to open source projects"
    },
    {
      id: "3",
      title: "Innovation Award",
      organization: "Startup Pitch Competition",
      year: "2021",
      description: "First place for mobile app concept and execution"
    }
  ],
  blog: [
    {
      id: "1",
      title: "Building Scalable React Applications",
      excerpt: "Learn best practices for structuring large React applications with proper state management and component architecture.",
      date: "Dec 15, 2024",
      readTime: "8 min read",
      category: "React",
      url: "/blog/scalable-react-apps"
    },
    {
      id: "2",
      title: "The Future of Web Development",
      excerpt: "Exploring upcoming trends in web development including AI integration, serverless computing, and modern frameworks.",
      date: "Dec 10, 2024",
      readTime: "6 min read",
      category: "Technology",
      url: "/blog/future-web-dev"
    },
    {
      id: "3",
      title: "Optimizing Database Performance",
      excerpt: "Practical tips and techniques for improving database query performance and scaling your data layer effectively.",
      date: "Dec 5, 2024",
      readTime: "10 min read",
      category: "Backend",
      url: "/blog/database-optimization"
    }
  ],
  gallery: [
    {
      id: "1",
      title: "Project Screenshot 1",
      description: "Dashboard interface design",
      image: "/gallery1.jpg",
      category: "UI Design",
      tags: ["dashboard", "interface", "design"]
    },
    {
      id: "2",
      title: "Mobile App Design",
      description: "Clean mobile interface",
      image: "/gallery2.jpg",
      category: "Mobile",
      tags: ["mobile", "app", "ui"]
    },
    {
      id: "3",
      title: "Website Mockup",
      description: "Modern website layout",
      image: "/gallery3.jpg",
      category: "Web Design",
      tags: ["website", "layout", "modern"]
    }
  ],
  contact: {
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    availability: "Available for new projects",
    preferredContact: "email"
  }
}