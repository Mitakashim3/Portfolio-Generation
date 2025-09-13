/**
 * Education section component
 * Usage: <Education />
 */

interface EducationProps {
  className?: string;
}

const Education: React.FC<EducationProps> = ({ className = '' }) => {
  const education = [
    {
      degree: "Master of Science in Computer Science",
      school: "University of Technology",
      period: "2018 - 2020",
      location: "Boston, MA",
      gpa: "3.8/4.0",
      description: "Specialized in Machine Learning and Software Engineering. Thesis on Reinforcement Learning applications in web optimization.",
      coursework: ["Machine Learning", "Data Structures", "Web Development", "Database Systems"],
      honors: ["Dean's List", "Graduate Research Assistant"]
    },
    {
      degree: "Bachelor of Science in Software Engineering", 
      school: "State University",
      period: "2014 - 2018",
      location: "Seattle, WA",
      gpa: "3.6/4.0", 
      description: "Foundation in computer science principles with focus on software development methodologies and team collaboration.",
      coursework: ["Object-Oriented Programming", "Software Architecture", "Algorithms", "Computer Networks"],
      honors: ["Summa Cum Laude", "Programming Competition Winner"]
    }
  ];

  const certifications = [
    {
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      date: "2023",
      credential: "AWS-12345"
    },
    {
      name: "React Developer Certification",
      issuer: "Meta",
      date: "2022", 
      credential: "META-67890"
    },
    {
      name: "Google Cloud Professional",
      issuer: "Google Cloud",
      date: "2021",
      credential: "GCP-11111"
    }
  ];

  return (
    <section id="education" className={`py-20 px-6 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Education & Certifications
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 flex items-center">
              🎓 Education
            </h3>
            <div className="space-y-8">
              {education.map((edu, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {edu.degree}
                      </h4>
                      <p className="text-blue-600 font-medium">{edu.school}</p>
                      <p className="text-sm text-gray-500">{edu.location}</p>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <p>{edu.period}</p>
                      <p className="font-medium">GPA: {edu.gpa}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {edu.description}
                  </p>
                  
                  {/* Coursework */}
                  <div className="mb-4">
                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                      Relevant Coursework:
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((course, courseIndex) => (
                        <span 
                          key={courseIndex}
                          className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Honors */}
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                      Honors & Awards:
                    </h5>
                    <ul className="text-sm text-gray-600 dark:text-gray-300">
                      {edu.honors.map((honor, honorIndex) => (
                        <li key={honorIndex} className="flex items-center">
                          <span className="text-yellow-500 mr-2">🏆</span>
                          {honor}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Certifications */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 flex items-center">
              📜 Certifications
            </h3>
            <div className="space-y-6">
              {certifications.map((cert, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border-l-4 border-blue-600">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {cert.name}
                      </h4>
                      <p className="text-blue-600 font-medium mb-2">{cert.issuer}</p>
                      <p className="text-sm text-gray-500">
                        Credential ID: {cert.credential}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded">
                        {cert.date}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Call to action for more certifications */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-6 text-center">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Continuously learning and earning new certifications
                </p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  View All Credentials
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;