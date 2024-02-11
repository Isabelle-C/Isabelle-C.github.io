import React, { useEffect, useState } from "react";
import axios from "axios";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.github.com/users/Isabelle-C/repos")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>My Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
