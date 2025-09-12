/**
 * Header component for portfolio navigation
 * Usage: <Header />
 */

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  return (
    <header className={`bg-gray-900 text-white py-4 px-6 ${className}`}>
      <nav className="flex justify-between items-center max-w-6xl mx-auto">
        <div className="text-xl font-bold">Portfolio</div>
        <div className="space-x-6">
          <a href="#hero" className="hover:text-blue-400 transition-colors">Home</a>
          <a href="#projects" className="hover:text-blue-400 transition-colors">Projects</a>
          <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
          <a href="/editor" className="hover:text-blue-400 transition-colors">Edit</a>
        </div>
      </nav>
    </header>
  );
};

export default Header;