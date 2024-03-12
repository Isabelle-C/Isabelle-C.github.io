import React from "react";
import Dropdown from "../../components/dropdown_profile";

import Header from "../../components/Header";

const Projects = () => {
  return (
    <div>
      <div>
        <Header /> {/* Use Header */}
        {/* Rest of your Home component */}
      </div>
      <h1>My Projects</h1>
      <div className="App">
        <Dropdown />
      </div>
    </div>
    
  );
};

export default Projects;
