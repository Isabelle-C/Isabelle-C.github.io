import React from "react";
import { Link } from 'react-router-dom';
import MyMap from './MyMap';
import "leaflet/dist/leaflet.css";
import "../css/map.css";

const Home = () => (
  <div>
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
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/recipe">Recipe </Link>
          </li>
          
          {/* Add more links as needed */}
        </ul>
      </nav>
    </header>
    <h1>About Me</h1>
    <p> Personal page building still in progress...:)</p>
    {/* Add your bio here */}

    <div className="App">
      <MyMap />
    </div>
  </div>
);

export default Home;
