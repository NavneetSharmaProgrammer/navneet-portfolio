import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdArrowOutward, MdCode, MdStorage, MdNetworkCheck } from "react-icons/md";
import "./styles/Projects.css";

const projectsData = [
  {
    id: 1,
    title: "Enterprise RAG Pipeline",
    category: "Generative AI",
    icon: <MdNetworkCheck className="text-emerald-400 text-3xl" />,
    description: "Architected a highly scalable Retrieval-Augmented Generation pipeline using LangChain and ChromaDB. Enabled semantic search over 100K+ enterprise documents with sub-second retrieval latency, drastically improving internal knowledge discovery.",
    tech: ["Python", "LangChain", "ChromaDB", "OpenAI APIs"],
    link: "https://github.com/NavneetSharmaProgrammer"
  },
  {
    id: 2,
    title: "Financial ETL Automation",
    category: "Data Engineering",
    icon: <MdStorage className="text-purple-400 text-3xl" />,
    description: "Designed memory-efficient Python scripts to automate the extraction, transformation, and loading (ETL) of massive financial datasets. Integrated with MS SQL Server to provide clean, structured data for downstream Power BI dashboards.",
    tech: ["Pandas", "NumPy", "T-SQL", "Power BI"],
    link: "https://github.com/NavneetSharmaProgrammer"
  },
  {
    id: 3,
    title: "E-Commerce REST API",
    category: "Backend Architecture",
    icon: <MdCode className="text-blue-400 text-3xl" />,
    description: "Built a robust, production-ready REST API using Flask. Implemented JWT authentication, rate limiting, and complex relational database queries in MySQL. Ensured 99.9% uptime and seamless frontend integration.",
    tech: ["Flask", "MySQL", "JWT", "RESTful Design"],
    link: "https://github.com/NavneetSharmaProgrammer"
  }
];

const Projects = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        
        <div className="projects-header z-10 pointer-events-auto">
          <h2>
            FEATURED <br />
            <span>PROJECTS</span>
          </h2>
          <p>
            A curated selection of my most demanding architectural implementations, spanning deep data engineering, scalable backend APIs, and cutting-edge Generative AI solutions.
          </p>
        </div>

        <div className="projects-grid z-10 pointer-events-auto">
          {projectsData.map((project) => (
            <motion.div
              key={project.id}
              className="project-card"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: project.id * 0.1 }}
            >
              <div className="project-card-inner">
                
                {/* Header: Icon & Category */}
                <div className="project-top">
                  <div className="project-icon-wrapper">
                    {project.icon}
                  </div>
                  <span className="project-category">{project.category}</span>
                </div>

                {/* Body: Title & Description */}
                <h3 className="project-title">{project.title}</h3>
                
                <AnimatePresence>
                  {hoveredId === project.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="project-description-container"
                    >
                      <p className="project-description">{project.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Footer: Tech Stack & Link */}
                <div className="project-bottom">
                  <div className="project-tech-list">
                    {project.tech.map((t, i) => (
                      <span key={i} className="project-tech-tag">{t}</span>
                    ))}
                  </div>
                  <a href={project.link} target="_blank" rel="noreferrer" className="project-link" data-cursor="hover">
                    View <MdArrowOutward />
                  </a>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;
