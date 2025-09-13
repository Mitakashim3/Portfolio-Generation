/**
 * Footer component for portfolio
 * Usage: <Footer />
 */

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  return (
    <footer id="contact" className={`bg-gray-900 text-white py-12 px-6 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Get In Touch</h3>
            <p className="text-gray-300 mb-6">
              I'm always open to discussing new opportunities and interesting projects.
            </p>
            <div className="space-y-2">
              <p>📧 john.doe@example.com</p>
              <p>🌐 LinkedIn: /in/johndoe</p>
              <p>🐙 GitHub: /johndoe</p>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a href="#hero" className="block hover:text-blue-400 transition-colors">Home</a>
              <a href="#projects" className="block hover:text-blue-400 transition-colors">Projects</a>
              <a href="/editor" className="block hover:text-blue-400 transition-colors">Editor</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 mt-8 text-center text-gray-400">
          <p>&copy; 2025 John Doe. Built with Next.js and Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;