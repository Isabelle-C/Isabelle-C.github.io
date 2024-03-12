import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Header from "./Header";

import "../css/drop_down.css";

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
      <button onClick={toggleOpen} className="button">
        {isOpen ? "Hide" : "Mini React Projects"}
      </button>
      {isOpen && (
        <div>
          <Link to="/gmtvis">GMT Vis</Link>
          <br />
          <Link to="/compare">GitHub Commmits compare generator</Link>
        </div>
      )}
    </div>
  );
};

export default Dropdown;