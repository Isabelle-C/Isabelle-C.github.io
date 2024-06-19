import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "@css/mini_project.css";

const MiniProject = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  //--- Projects
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.github.com/users/Isabelle-C/repos")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  //--- End Projects
  return (
    <div>
      <button onClick={toggleOpen} className="button">
        {isOpen ? "Hide" : "Mini React Projects"}
      </button>
      {isOpen && (
        <div>
          <Link to="/gmtvis">GMT Vis</Link>
          <br />
          <br />
          <Link to="/compare">GitHub Commmits compare generator</Link>
          <br />
          <br />
          <Link to="/imagecropper">Image Cropper</Link>
          <br />
          <br />
          <Link to="/imagecolor">Image Color (in progress)</Link>
        </div>
      )}
    </div>
  );
};

export default MiniProject;
