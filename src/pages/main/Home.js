import React from "react";
import Header from '../../components/Header'; // Import Header

import Timeline from "../../components/Timeline";


const Home = () => (
  <div>
    <div>
      <Header /> {/* Use Header */}
      {/* Rest of your Home component */}
    </div>
    <h1>About Me</h1>
    <p> Personal page building still in progress...:)</p>
    {/* Add your bio here */}

    <h1>Timeline</h1>
    <Timeline />

  </div>
);

export default Home;
