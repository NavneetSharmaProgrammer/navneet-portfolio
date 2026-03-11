import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import gsap from "gsap";
import HoverLinks from "./HoverLinks";

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;

    const cleanupFns: (() => void)[] = [];

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;

      const resetPosition = () => {
        const rect = elem.getBoundingClientRect();
        gsap.to(link, {
          "--siLeft": `${rect.width / 2}px`,
          "--siTop": `${rect.height / 2}px`,
          duration: 0.6,
          ease: "elastic.out(1, 0.3)"
        });
      };

      const onMouseMove = (e: MouseEvent) => {
        const rect = elem.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.to(link, {
          "--siLeft": `${x}px`,
          "--siTop": `${y}px`,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      elem.addEventListener("mousemove", onMouseMove);
      elem.addEventListener("mouseleave", resetPosition);
      
      // Initialize center
      resetPosition();

      cleanupFns.push(() => {
        elem.removeEventListener("mousemove", onMouseMove);
        elem.removeEventListener("mouseleave", resetPosition);
      });
    });

    return () => {
      cleanupFns.forEach(fn => fn());
    };
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a href="https://github.com/NavneetSharmaProgrammer" target="_blank">
            <FaGithub />
          </a>
        </span>
        <span>
          <a href="https://linkedin.com/in/navneet-sharma-590862241/" target="_blank">
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a href="https://youtube.com/@CodingWithNavneet" target="_blank">
            <FaYoutube />
          </a>
        </span>
        <span>
          <a href="https://instagram.com/navneet_py" target="_blank">
            <FaInstagram />
          </a>
        </span>
      </div>
      <a className="resume-button" href="https://drive.google.com/file/d/1jb1UN-Y1c4hDD33eX_ealJOcxEPt8msq/view?usp=drive_link" target="_blank">
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
