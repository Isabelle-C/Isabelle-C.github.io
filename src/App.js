import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Recipe from "./components/Recipe";
import Compare from "./components/Compare";
import GMTvis from "./components/GmtVis";
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
