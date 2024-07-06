import React, { useState, useEffect } from "react";
import Header from "@components/Header";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import "@css/styles.css";
import "@css/Home.css";

const Image = ({ alt, src }) => {
  if (src.startsWith("/")) {
    return <img alt={alt} src={process.env.PUBLIC_URL + src} />;
  }
  return <img alt={alt} src={src} />;
};

const Blog = () => {
  const [markdownFiles, setMarkdownFiles] = useState([
    { name: "Markdown File 1", path: "/blogs/test.md" },
    // Add more files as needed
  ]);
  const [selectedMarkdown, setSelectedMarkdown] = useState("");
  const [isVisible, setIsVisible] = useState(false); // Step 1: Initialize visibility state

  useEffect(() => {
    // Initially, don't load any markdown file
  }, [markdownFiles]);

  const fetchMarkdownFile = (filePath) => {
    fetch(filePath)
      .then((response) => response.text())
      .then((text) => {
        setSelectedMarkdown(text);
        setIsVisible(true); // Step 2: Update visibility state on button click
      })
      .catch((error) => console.error("Error fetching markdown file:", error));
  };

  return (
    <div>
      <Header />
      <div>
        {markdownFiles.map((file, index) => (
          <button key={index} onClick={() => fetchMarkdownFile(file.path)}>
            {file.name}
          </button>
        ))}
      </div>
      {isVisible && ( // Step 3: Conditional rendering based on visibility state
        <ReactMarkdown components={{ img: Image }} remarkPlugins={[remarkGfm]}>
          {selectedMarkdown}
        </ReactMarkdown>
      )}
    </div>
  );
};

export default Blog;
