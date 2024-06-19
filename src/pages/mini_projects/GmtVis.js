import React, { useState } from "react";
import "@css/project_gmt.css";

function GMTvis() {
  const [files, setFiles] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  // Updated to use an array for handling multiple search terms
  const [searchTerms, setSearchTerms] = useState([]);
  const [results, setResults] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    const readers = [];
    const names = [];

    Array.from(selectedFiles).forEach((file) => {
      names.push(file.name);
      readers.push(
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve(reader.result);
          };
          reader.readAsText(file);
        }),
      );
    });

    setFileNames(names);

    Promise.all(readers).then((contents) => {
      const allFilesContent = contents.map((content) =>
        content.split("\n").map((line) => line.split("\t")),
      );
      setFiles(allFilesContent);
    });
  };

  const handleSearch = () => {
    const searchResults = [];
    // Loop through each file
    files.forEach((file, fileIndex) => {
      // Loop through each pathway in the file
      file.forEach((pathway) => {
        // Check if pathway matches any of the search terms
        const match = searchTerms.some((term) =>
          pathway[0].toLowerCase().includes(term.toLowerCase()),
        );
        if (match) {
          searchResults.push([fileNames[fileIndex], ...pathway]);
        }
      });
    });
    setResults(searchResults);
  };

  // Update to handle multiple search terms
  const handleSearchTermChange = (e) => {
    const terms = e.target.value.split(",").map((term) => term.trim()); // Split by comma and trim whitespace
    setSearchTerms(terms);
  };

  // Function to highlight search terms in pathway names
  const highlightSearchTerm = (text, terms) => {
    let parts = [{ text: text, highlight: false }];
    terms.forEach((term) => {
      if (term) {
        parts = parts.flatMap((part) =>
          part.highlight
            ? [part]
            : part.text
                .split(new RegExp(`(${term})`, "gi"))
                .map((textPart, index, array) =>
                  index % 2 === 1
                    ? { text: textPart, highlight: true }
                    : { text: textPart, highlight: false },
                ),
        );
      }
    });
    return parts;
  };

  return (
    <div className="App">
      <input type="file" multiple onChange={handleFileChange} />
      <div>
        <h4>Uploaded Files:</h4>
        <ul>
          {fileNames.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      </div>
      {/* Updated to allow for multiple search terms */}
      <input
        type="text"
        value={searchTerms.join(", ")} // Join terms with comma for display
        onChange={handleSearchTermChange}
        placeholder="Search for pathways, separate by commas"
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        <table>
          <thead>
            <tr>
              <th>File Name</th>
              <th>Pathway Name</th>
              <th>Genes in the Pathway</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td>{result[0]}</td>
                <td>
                  {highlightSearchTerm(result[1], searchTerms).map(
                    (part, index) => (
                      <span
                        key={index}
                        style={
                          part.highlight ? { backgroundColor: "yellow" } : {}
                        }
                      >
                        {part.text}
                      </span>
                    ),
                  )}
                </td>
                <td>{result.slice(2).join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GMTvis;
