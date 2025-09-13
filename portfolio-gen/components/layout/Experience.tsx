/**
 * Experience/Work History section component
 * Usage: <Experience />
 */

interface ExperienceProps {
  className?: string;
}

const Experience: React.FC<ExperienceProps> = ({ className = '' }) => {
  const experiences = [
    {
      title: "Senior Full Stack Developer",
      company: "TechCorp Inc.",
      period: "2023 - Present",
      location: "San Francisco, CA",
      description: "Lead development of enterprise web applications using React, Node.js, and AWS. Mentored junior developers and improved deployment processes.",
      technologies: ["React", "Node.js", "AWS", "PostgreSQL"],
      achievements: [
        "Reduced application load time by 40%",
        "Led team of 5 developers",
        "Implemented CI/CD pipeline"
      ]
    },
    {
      title: "Full Stack Developer",
      company: "StartupXYZ",
      period: "2021 - 2023", 
      location: "Remote",
      description: "Built and maintained multiple client projects from concept to deployment. Worked directly with clients to understand requirements and deliver solutions.",
      technologies: ["Next.js", "Python", "MongoDB", "Docker"],
      achievements: [
        "Delivered 15+ projects on time",
        "99.9% uptime across all applications",
        "Increased client satisfaction by 25%"
      ]
    },
    {
      title: "Frontend Developer",
      company: "Design Agency Pro",
      period: "2020 - 2021",
      location: "New York, NY", 
      description: "Created responsive, pixel-perfect websites from designer mockups. Collaborated closely with UX/UI team to implement interactive features.",
      technologies: ["React", "TypeScript", "SCSS", "Figma"],
      achievements: [
        "Converted 50+ designs to code",
        "Improved development workflow",
        "Reduced cross-browser issues by 60%"
      ]
    }
  ];

  return (
    <section id="experience" className={`py-20 px-6 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Work Experience
        </h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-600"></div>
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative flex items-start space-x-8">
                {/* Timeline dot */}
                <div className="flex-shrink-0">
                  <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-gray-900"></div>
                </div>
                
                {/* Content */}
                <div className="flex-grow bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {exp.title}
                      </h3>
                      <p className="text-blue-600 font-medium">{exp.company}</p>
                    </div>
                    <div className="text-sm text-gray-500 mt-2 md:mt-0">
                      <p>{exp.period}</p>
                      <p>{exp.location}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {exp.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {exp.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Achievements */}
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      Key Achievements:
                    </h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;