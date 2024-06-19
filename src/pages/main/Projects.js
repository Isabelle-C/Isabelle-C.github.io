import React from "react";
import MiniProject from "@components/MiniProject";

import Header from "../../components/Header";

const Projects = () => {
  return (
    <div>
      <div>
        <Header /> {/* Use Header */}
        {/* Rest of your Home component */}
      </div>
      <div className="App">
        <MiniProject />
      </div>
    </div>
  );
};

export default Projects;
