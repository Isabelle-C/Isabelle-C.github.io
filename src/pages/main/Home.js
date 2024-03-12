import React from "react";
import { Link } from "react-router-dom";
import Header from '../../components/Header'; // Import Header

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import StarIcon from "@mui/icons-material/Star";

import work_data from "../../data/timeline/work.json"; // Path to your JSON file
import education_data from "../../data/timeline/education.json";

const Home = () => (
  <div>
    <div>
      <Header /> {/* Use Header */}
      {/* Rest of your Home component */}
    </div>
    <h1>About Me</h1>
    <p> Personal page building still in progress...:)</p>
    {/* Add your bio here */}

    <VerticalTimeline>
      <VerticalTimelineElement
        className="vertical-timeline-element--education"
        contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
        contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
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

      <VerticalTimelineElement
        className="vertical-timeline-element--education"
        contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
        contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
        iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
        icon={<SchoolIcon />}
      >
        <h3 className="vertical-timeline-element-title">
          {education_data.undergrad.title}
        </h3>
        <h4 className="vertical-timeline-element-subtitle">
          {education_data.undergrad.subtitle}
        </h4>
        <p>{education_data.undergrad.date}</p>
      </VerticalTimelineElement>

      <VerticalTimelineElement
        className="vertical-timeline-element--education"
        contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
        contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
        iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
        icon={<SchoolIcon />}
      >
        <h3 className="vertical-timeline-element-title">
          {education_data.phd.title}
        </h3>
        <h4 className="vertical-timeline-element-subtitle">
          {education_data.phd.subtitle}
        </h4>
        <p>{education_data.phd.date}</p>
      </VerticalTimelineElement>
    </VerticalTimeline>
  </div>
);

export default Home;
