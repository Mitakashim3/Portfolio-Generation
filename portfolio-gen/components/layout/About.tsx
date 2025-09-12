/**
 * About Me section component
 * Usage: <About />
 */

interface AboutProps {
  className?: string;
}

const About: React.FC<AboutProps> = ({ className = '' }) => {
  return (
    <section id="about" className={`py-20 px-6 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div className="text-center">
            <div className="w-64 h-64 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 p-1">
              <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-6xl">👨‍💻</span>
              </div>
            </div>
          </div>
          
          {/* Bio Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              I'm a passionate full-stack developer with over 5 years of experience creating 
              digital experiences that make a difference. I love turning complex problems 
              into simple, beautiful, and intuitive solutions.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              When I'm not coding, you can find me exploring new technologies, contributing 
              to open source projects, or enjoying a good cup of coffee while sketching 
              out my next big idea.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Problem Solver
              </span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                Team Player
              </span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                Continuous Learner
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;