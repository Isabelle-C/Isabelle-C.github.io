import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "@pages/main/Home";
import Projects from "@pages/main/Projects";
import Contact from "@pages/main/Contact";
import Recipe from "@pages/mini_projects/Recipe";
import Compare from "@pages/mini_projects/Compare";
import GMTvis from "@pages/mini_projects/GmtVis";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/recipe" element={<Recipe />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/gmtvis" element={<GMTvis />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
