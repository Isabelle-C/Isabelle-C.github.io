import React from "react";
import { Link } from "react-router-dom";
import MyMap from "./MyMap";
import "leaflet/dist/leaflet.css";
import "../css/map.css";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import StarIcon from "@mui/icons-material/Star";

import data from "../data.json"; // Path to your JSON file
import education_data from "../data/timeline/education.json";

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

    <VerticalTimeline>
      <VerticalTimelineElement
        className="vertical-timeline-element--education"
        contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
        contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
        date={education_data.high_school.date}
        iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
        icon={<SchoolIcon />}
      >
        <h3 className="vertical-timeline-element-title">
          {education_data.high_school.title}
        </h3>
        <h4 className="vertical-timeline-element-subtitle">
          {education_data.high_school.subtitle}
        </h4>
        <p>{education_data.high_school.date}</p>
      </VerticalTimelineElement>
    </VerticalTimeline>

    <div className="App">
      <MyMap />
    </div>
  </div>
);

export default Home;
