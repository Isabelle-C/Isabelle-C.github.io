import React from "react";
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/recipe">Recipe </Link></li>
          <li><Link to="/compare">Compare</Link></li>
          {/* Add more links as needed */}
        </ul>
      </nav>
    </header>
    <h1>About Me</h1>
    {/* Add your bio here */}
  </div>
);

export default Home;
