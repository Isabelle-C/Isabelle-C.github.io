import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
