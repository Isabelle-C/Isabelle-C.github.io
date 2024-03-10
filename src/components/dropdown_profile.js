import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dropdown = () => {
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
      <button onClick={toggleOpen}>
        {isOpen ? "Hide Content" : "Show Content"}
      </button>
      {isOpen && (
        <div>
          <p>This is some content that can be shown or hidden.</p>
          <Link to="/gmtvis">GMT Vis</Link>
            <Link to="/compare">GitHub Commmits compare generator</Link>
        </div>
      )}
    </div>
  );
};

export default Dropdown;