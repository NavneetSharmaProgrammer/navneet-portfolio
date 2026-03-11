import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import "./styles/WhatIDo.css";

const services = [
  {
    title: "DATA ANALYTICS & ML",
    subtitle: "Actionable Intelligence",
    desc: "Transforming massive, unstructured datasets into predictive intelligence through deep EDA and rigorous Machine Learning models.",
    tech: ["Python", "Scikit-Learn", "Pandas", "NumPy", "TensorFlow"]
  },
  {
    title: "BACKEND & APIs",
    subtitle: "Scalable Infrastructure",
    desc: "Building seamless REST APIs and automated server-side architectures. Writing memory-efficient scripts that eliminate manual workflows.",
    tech: ["Flask", "REST APIs", "Web Scraping", "Python OOP"]
  },
  {
    title: "GENERATIVE AI",
    subtitle: "Intelligent Architectures",
    desc: "Architecting next-generation AI solutions. Designing RAG pipelines, integrating LLMs, and utilizing vector embeddings for context-aware search.",
    tech: ["LangChain", "ChromaDB", "Vector Embeddings", "OpenAI Whisper"]
  },
  {
    title: "DATABASES & BI",
    subtitle: "Architecture & Dashboards",
    desc: "Designing scalable ecosystems with complex T-SQL extraction. Connecting backends directly to business strategy via interactive Power BI dashboards.",
    tech: ["MS SQL Server", "MySQL", "Power BI", "Advanced Excel"]
  }
];

const HoverCard = ({ service }: { service: typeof services[0] }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="what-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="what-card-header">
        <div>
          <h3>{service.title}</h3>
          <p>{service.subtitle}</p>
        </div>
        
        <motion.div 
          animate={{ rotate: isHovered ? 45 : 0 }} 
          className="what-card-icon"
        >
          +
        </motion.div>
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="what-card-body"
          >
            <div className="what-card-body-in">
              <p>{service.desc}</p>
              <div className="what-tags-container">
                {service.tech.map((t, idx) => (
                  <span key={idx} className="what-card-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const WhatIDo = () => {
  return (
    <div className="whatIDO" id="what-i-do">
      
      {/* Left Text Column */}
      <div className="what-box z-10">
        <h2 className="title" style={{ whiteSpace: "nowrap" }}>
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
        <p style={{ marginTop: "2rem", fontSize: "1.1rem", color: "#ccc", maxWidth: "220px", lineHeight: "1.5", position: "relative", zIndex: 10 }} className="para">
          Delivering end-to-end data pipelines, intelligent architectures, and scalable backend solutions.
        </p>
      </div>

      {/* Center Spacer: Acts as a spring to push the right column away from the 3D model */}
      <div className="what-box-spacer"></div>

      {/* Right Accordion Panel */}
      <div className="what-box">
        <div className="what-card-container">
          {services.map((service, index) => (
            <HoverCard key={index} service={service} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default WhatIDo;
