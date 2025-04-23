import React from "react";

import "@css/Home.css";
import "@css/publication.css";

const PublicationCard = ({ title, company, date, location }) => {
  return (
    <div className="experience-card">
      <h3>{title}</h3>
      <h4 className="company-name">{company}</h4>
      <p className="experience-date">{date}</p>
      <p className="experience-location">{location}</p>
    </div>
  );
};

const PublicationSection = () => {
  const papers = [
    {
      title: "Bagheri Lab",
      company: "University of Washington",
      date: "Sep 2020 – Dec 2023",
      location: "Seattle, WA",
    },
    {
      title: "Mucida Lab",
      company: "Rockefeller University",
      date: "June 2022 – Aug 2022",
      location: "New York, NY",
    },
    {
      title: "Nurieva Lab",
      company: "MD Anderson Cancer Center",
      date: "Jun 2021 – Aug 2021",
      location: "Houston, TX",
    },
    {
      title: "Banchereau Lab",
      company: "Jackson Laboratory",
      date: "Jul 2020 – Aug 2021",
      location: "Farmington, CT",
    },
  ];

  return (
    <div className="experience-section">
      <h2>Undergrad Research Experience</h2>
      {papers.map((exp, index) => (
        <PublicationCard key={index} {...exp} />
      ))}
    </div>
  );
};

export default PublicationSection;
