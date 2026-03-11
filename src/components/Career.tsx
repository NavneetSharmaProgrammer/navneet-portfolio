import "./styles/Career.css";

const careerData = [
  {
    role: "Data Science Trainee",
    company: "Croma Campus Pvt. Ltd. (Noida, India)",
    date: "Sep 2025 – Present",
    description: "Engineered memory-efficient Python scripts to automate data preprocessing. Architected foundational data models using T-SQL/MySQL, and designed interactive Power BI dashboards for business intelligence."
  },
  {
    role: "Bachelor of Computer Applications",
    company: "Maa Shakumbhari University",
    date: "June 2025",
    description: "Achieved First Division Honors. Built a robust foundation in object-oriented programming, data structures, algorithms, and advanced database management principles."
  },
  {
    role: "Certifications & Training",
    company: "Specialized Upskilling",
    date: "2025 – 2026",
    description: "• Professional in Data Science (Croma Campus)\n• The Ultimate Job Ready Data Science Course (CodeWithHarry)\n• Complete 2025 Python Bootcamp (CodeWithHarry)"
  }
];

const Career = () => {
  return (
    <section id="career" className="career-section">
      
      {/* Section Heading */}
      <div className="career-heading">
        <h2>
          My career &<br />
          <span>experience</span>
        </h2>
      </div>

      {/* Timeline Container */}
      <div className="career-timeline-container">
        
        {/* Center Glowing Line */}
        <div className="career-line"></div>

        {careerData.map((item, index) => (
          <div key={index} className="career-item">
            
            {/* Left: Role & Company */}
            <div className="career-left">
              <h3>{item.role}</h3>
              <p>{item.company}</p>
            </div>

            {/* Center: Date (with subtle glowing dot) */}
            <div className="career-center">
              <div className="career-dot2"></div>
              <span className="career-date">
                {item.date}
              </span>
            </div>

            {/* Right: Description */}
            <div className="career-right">
              {item.description.includes('•') ? (
                <ul>
                  {item.description.split('\n').map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              ) : (
                <p>
                  {item.description}
                </p>
              )}
            </div>

          </div>
        ))}
        
      </div>
    </section>
  );
};

export default Career;
