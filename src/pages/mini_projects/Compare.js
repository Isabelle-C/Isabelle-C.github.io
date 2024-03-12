import logo from "../../data/img/guo.svg";
import "../../App.css";
import React, { useState } from "react";

function Compare() {
  const [string1, setString1] = useState("");
  const [string2, setString2] = useState("");
  const [string3, setString3] = useState("Isabelle-C");
  const [string4, setString4] = useState("");
  const [githubURL, setGithubURL] = useState("");

  const handleButtonClick = () => {
    const shortString1 = string1.substring(0, 7);
    const shortString2 = string2.substring(0, 7);
    const newURL = `https://github.com/${string3}/${string4}/compare/${shortString1}..${shortString2}`;
    setGithubURL(newURL);
  };

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      <h1>Generate GitHub Compare URL</h1>

      <input
        type="text"
        placeholder="Enter the user name"
        value={string3}
        onChange={(e) => setString3(e.target.value)}
      />
      <br />
      <br />

      <input
        type="text"
        placeholder="Enter the repo name"
        value={string4}
        onChange={(e) => setString4(e.target.value)}
      />
      <br />
      <br />

      <input
        type="text"
        placeholder="Enter the older commit number"
        value={string1}
        onChange={(e) => setString1(e.target.value)}
      />
      <br />
      <br />

      <input
        type="text"
        placeholder="Enter the newer commit number"
        value={string2}
        onChange={(e) => setString2(e.target.value)}
      />
      <br />
      <br />

      <button onClick={handleButtonClick}>Generate URL</button>
      {githubURL && (
        <p>
          Generated URL: <a href={githubURL}>{githubURL}</a>
        </p>
      )}
    </div>
  );
}

export default Compare;
