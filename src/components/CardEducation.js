import React from "react";

import "@css/home.css";

const ExperienceCard = ({ title, school, date, location }) => {
  return (
    <div className="experience-card">
      <h3>{title}</h3>
      <h4>{school}</h4>
      <p>{date}</p>
      <p>{location}</p>
    </div>
  );
};


const EducationSection = () => {
  const experiences = [
    {
      title: "B.S. in Integrated Engineering Studies",
      school: "Northwestern University",
      date: "Sep 2019 – Dec 2023",
      location: "Evanston, IL",
    },
    {
      title: "Ph.D. in Biological Sciences",
      school: "Rockefeller University",
      date: "Jul 2024 - est Jun 2029",
      location: "New York, NY",
    },
  ];

  return (
    <div className="experience-section">
      <h2>Education</h2>
      {experiences.map((exp, index) => (
        <ExperienceCard key={index} {...exp} />
      ))}
    </div>
  );
};

export default EducationSection;

