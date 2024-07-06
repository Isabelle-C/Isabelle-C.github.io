import React from "react";
import { Link } from "react-router-dom";

import "@css/header.css";

const Header = () => (
  <header>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/projects">Projects</Link>
        </li>
        <li>
          <Link to="/blogs">Blogs</Link>
        </li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  </header>
);
export default Header;
