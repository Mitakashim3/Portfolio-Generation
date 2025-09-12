/**
 * Testimonials section component
 * Usage: <Testimonials />
 */

interface TestimonialsProps {
  className?: string;
}

const Testimonials: React.FC<TestimonialsProps> = ({ className = '' }) => {
  const testimonials = [
    {
      text: "John is an exceptional developer who consistently delivers high-quality work. His attention to detail and problem-solving skills are outstanding. He transformed our entire user experience.",
      author: "Sarah Johnson",
      role: "Product Manager",
      company: "TechCorp Inc.",
      rating: 5,
      avatar: "👩‍💼"
    },
    {
      text: "Working with John was a game-changer for our startup. He not only built our platform but also provided valuable insights that shaped our product strategy. Highly recommended!",
      author: "Mike Chen",
      role: "CEO",
      company: "StartupXYZ", 
      rating: 5,
      avatar: "👨‍💻"
    },
    {
      text: "John's expertise in React and Node.js helped us scale our application to handle 10x more users. His code is clean, well-documented, and maintainable.",
      author: "Emily Rodriguez",
      role: "CTO",
      company: "GrowthCo",
      rating: 5,
      avatar: "👩‍🔬"
    },
    {
      text: "Fantastic communication skills and technical expertise. John delivered our project ahead of schedule and under budget. A true professional!",
      author: "David Kim",
      role: "Project Lead",
      company: "Enterprise Solutions",
      rating: 5,
      avatar: "👨‍💼"
    },
    {
      text: "John's ability to understand complex requirements and translate them into elegant solutions is remarkable. He's been instrumental in our digital transformation.",
      author: "Lisa Wang",
      role: "Director of Engineering",
      company: "InnovateNow",
      rating: 5,
      avatar: "👩‍💻"
    },
    {
      text: "The best freelancer we've ever worked with. John's proactive approach and technical skills exceeded our expectations. Will definitely hire again!",
      author: "Robert Taylor",
      role: "Founder",
      company: "CreativeHub",
      rating: 5,
      avatar: "👨‍🎨"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < rating ? "text-yellow-400" : "text-gray-300"}>
        ⭐
      </span>
    ));
  };

  return (
    <section id="testimonials" className={`py-20 px-6 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Clients Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Don't just take my word for it. Here's what some of my clients have to say about working with me.
          </p>
        </div>
        
        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Rating */}
              <div className="flex mb-4">
                {renderStars(testimonial.rating)}
              </div>
              
              {/* Quote */}
              <blockquote className="text-gray-600 dark:text-gray-300 mb-6 italic">
                "{testimonial.text}"
              </blockquote>
              
              {/* Author Info */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white text-xl mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.author}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {testimonial.role}
                  </p>
                  <p className="text-sm text-blue-600">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Ready to work together?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Join these satisfied clients and let's create something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Start a Project
              </button>
              <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
                View More Reviews
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;