/**
 * Hero section component for portfolio landing
 * Usage: <Hero />
 */

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className = '' }) => {
  return (
    <section id="hero" className={`py-20 px-6 text-center ${className}`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
          John Doe
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 animate-slide-up">
          Full-Stack Developer & Designer
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-400 mb-8 max-w-2xl mx-auto animate-slide-up">
          I create beautiful, functional web applications with modern technologies.
          Passionate about clean code, great user experiences, and solving complex problems.
        </p>
        <div className="space-x-4 animate-slide-up">
          <a href="#projects" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            View Projects
          </a>
          <a href="#contact" className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;