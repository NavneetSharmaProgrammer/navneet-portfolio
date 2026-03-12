import { motion, Variants } from "framer-motion";
import { FaPython, FaDatabase, FaBrain, FaChartBar, FaRobot, FaCode } from "react-icons/fa";
import { SiScikitlearn, SiTensorflow, SiFlask, SiPandas } from "react-icons/si";
import "./styles/About.css";

const About = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const skills = [
    { icon: <FaPython />, label: "Python Backend", color: "#3776AB" },
    { icon: <FaBrain />, label: "Machine Learning", color: "#FF6F00" },
    { icon: <FaRobot />, label: "Generative AI & RAG", color: "#00A67E" },
    { icon: <FaChartBar />, label: "Data Analytics (EDA)", color: "#F37626" },
    { icon: <SiFlask />, label: "Flask & REST APIs", color: "#000000" },
    { icon: <FaDatabase />, label: "SQL & Vector DBs", color: "#336791" },
  ];

  return (
    <section className="about-section" id="about">
      <motion.div 
        className="about-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="about-content-grid">
          {/* Left Column: Bio */}
          <motion.div className="about-bio" variants={itemVariants}>
            <div className="section-tag">About Me</div>
            <h2 className="about-title">
              Bridging Data & <span className="highlight">Architecture</span>
            </h2>
            <div className="bio-text">
              <p>
                I am a results-driven <strong>Python Backend & Data Science Engineer</strong> specializing in developing scalable Machine Learning pipelines and robust Flask architectures.
              </p>
              <p>
                My technical expertise spans the entire data lifecycle—from executing deep <strong>Exploratory Data Analysis (EDA)</strong> on massive datasets to architecting advanced <strong>Generative AI and RAG-based</strong> applications.
              </p>
              <p>
                Armed with a First Division Bachelor of Computer Applications (BCA) and specialized certifications in Data Science, I thrive in environments that demand analytical rigor and technical innovation.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Expertise Grid */}
          <motion.div className="about-expertise" variants={itemVariants}>
            <div className="expertise-grid">
              {skills.map((skill, index) => (
                <motion.div 
                  key={index} 
                  className="skill-card"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="skill-icon" style={{ color: skill.color }}>
                    {skill.icon}
                  </div>
                  <span className="skill-label">{skill.label}</span>
                </motion.div>
              ))}
            </div>
            
            <div className="tech-pills">
              <span className="pill"><SiPandas /> Pandas</span>
              <span className="pill"><SiScikitlearn /> Scikit-Learn</span>
              <span className="pill"><SiTensorflow /> TensorFlow</span>
              <span className="pill"><FaCode /> NumPy</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
