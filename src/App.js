import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "@pages/main/Home";
import Projects from "@pages/main/Projects";

import Compare from "@pages/mini_projects/Compare";
import GMTvis from "@pages/mini_projects/GmtVis";
import ImageCropper from "@pages/mini_projects/ImageCropper";
import ImageColor from "@pages/mini_projects/ImageColor(unfinished)";

import "@css/styles.css";

function App() {
  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const newTheme = mediaQuery.matches ? "dark-theme" : "light-theme";
      document.body.className = newTheme;
    };

    // Set initial theme
    handleChange();

    // Listen for changes
    mediaQuery.addListener(handleChange);

    // Cleanup function to remove the event listener
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/projects" element={<Projects />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/gmtvis" element={<GMTvis />} />
        <Route path="/imagecropper" element={<ImageCropper />} />
        <Route path="/imagecolor" element={<ImageColor />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
