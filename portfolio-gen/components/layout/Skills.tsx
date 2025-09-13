/**
 * Skills section component with icons and progress indicators
 * Usage: <Skills />
 */

interface SkillsProps {
  className?: string;
}

const Skills: React.FC<SkillsProps> = ({ className = '' }) => {
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "React", level: 90, icon: "⚛️" },
        { name: "TypeScript", level: 85, icon: "🔷" },
        { name: "Next.js", level: 80, icon: "▲" },
        { name: "Tailwind CSS", level: 95, icon: "🎨" },
      ]
    },
    {
      title: "Backend", 
      skills: [
        { name: "Node.js", level: 85, icon: "🟢" },
        { name: "Python", level: 80, icon: "🐍" },
        { name: "PostgreSQL", level: 75, icon: "🐘" },
        { name: "MongoDB", level: 70, icon: "🍃" },
      ]
    },
    {
      title: "Tools & Others",
      skills: [
        { name: "Git", level: 90, icon: "📚" },
        { name: "Docker", level: 75, icon: "🐳" },
        { name: "AWS", level: 70, icon: "☁️" },
        { name: "Figma", level: 80, icon: "🎯" },
      ]
    }
  ];

  return (
    <section id="skills" className={`py-20 px-6 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Skills & Technologies
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-6 text-center">
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{skill.icon}</span>
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <span className="text-sm text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;