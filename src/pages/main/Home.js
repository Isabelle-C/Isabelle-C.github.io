import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faMedium,
  faGithub,
  faGoogleScholar,
} from "@fortawesome/free-brands-svg-icons";

import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import Header from "@components/Header";
import ExperienceSection from "@components/CardExperience";
import EducationSection from "@components/CardEducation";

import useSystemTheme from "@components/useSystemTheme";

import "@css/styles.css";
import "@css/home.css";

import logo from "@data/img/m.svg";

const Home = () => {
  return (
    <div>
      <Header /> {/* Use Header */}
      <div class="container">
        <img src={logo} class="portrait" alt="logo" />

        <div class="text-block">
          <h1>Isabelle Chen</h1>
          <p>
            {" "}
            First-year PhD student at Rockefeller. I am interested in the
            intersection of AI and biology.
          </p>

          <div className="links-container">
            <a
              href="https://www.linkedin.com/in/isabelle-chen-2023/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--text-color)" }}
            >
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
            <a
              href="https://medium.com/@guo.isabelle.chen"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--text-color)" }}
            >
              <FontAwesomeIcon icon={faMedium} size="2x" />
            </a>
            <a
              href="https://github.com/Isabelle-C"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--text-color)" }}
            >
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
            <a
              href="https://scholar.google.com/citations?hl=en&view_op=list_works&authuser=2&gmla=AILGF5XqwjxPnFzWlGUEl8q08VArt8o8JgA5sGLegGru2QFDWittcKlel2JEUTtJkYyho3qd0gA7tRRiHG_mXA&user=aX7ctG8AAAAJ"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--text-color)" }}
            >
              <FontAwesomeIcon icon={faGoogleScholar} size="2x" />
            </a>

            <a
              href="mailto:guo.chen2023@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--text-color)" }}
            >
              <FontAwesomeIcon icon={faEnvelope} size="2x" />
            </a>
          </div>
        </div>
      </div>
      <br />
      <ExperienceSection />
      <br />
      <EducationSection />
    </div>
  );
};

export default Home;
