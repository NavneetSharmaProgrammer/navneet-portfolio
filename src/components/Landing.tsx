import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Engineering. Data. Driven.</h2>
            <h1>
              NAVNEET
              <br />
              <span>SHARMA</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>Python Backend &</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Data Science</div>
              <div className="landing-h2-2">Machine Learning</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Engineer</div>
              <div className="landing-h2-info-1">Practitioner</div>
            </h2>
            <p style={{ marginTop: "1.5rem", fontSize: "1.1rem", color: "#ccc", maxWidth: "450px", lineHeight: "1.5" }}>
              Focusing on AI-powered analytics, Machine Learning pipelines, and Flask backend architecture.
            </p>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
