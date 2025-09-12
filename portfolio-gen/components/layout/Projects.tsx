/**
 * Projects section component for portfolio
 * Usage: <Projects />
 */

import Card from '../ui/Card';

interface ProjectsProps {
  className?: string;
}

const Projects: React.FC<ProjectsProps> = ({ className = '' }) => {
  const projects = [
    {
      title: "E-commerce Platform",
      description: "A full-stack e-commerce solution built with Next.js and Stripe integration.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
      link: "#"
    },
    {
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates.",
      tech: ["React", "Node.js", "Socket.io", "MongoDB"],
      link: "#"
    },
    {
      title: "Weather Dashboard",
      description: "A responsive weather dashboard with location-based forecasting.",
      tech: ["React", "OpenWeather API", "Chart.js"],
      link: "#"
    }
  ];

  return (
    <section id="projects" className={`py-20 px-6 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Featured Projects
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a 
                href={project.link}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                View Project →
              </a>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;