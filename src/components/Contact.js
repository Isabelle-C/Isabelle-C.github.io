import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faMedium } from "@fortawesome/free-brands-svg-icons";

const Contact = () => (
  <div>
    <h1>Contact Me</h1>
    {/* Add your email or a contact form here */}
    <a
      href="https://www.linkedin.com/in/isabelle-chen-2023/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon icon={faLinkedin} size="2x" />
    </a>

    <p> isabelle-chen-2023 </p>

    <br />

    <a
      href="https://medium.com/@guo.isabelle.chen"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon icon={faMedium} size="2x" />
    </a>

    <p> guo.isabelle.chen </p>

    <br />

    <a
      href="https://github.com/Isabelle-C"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon icon="fa-brands fa-github" size="2x" />
    </a>

    <p> Isabelle-C </p>
    
  </div>
);

export default Contact;
