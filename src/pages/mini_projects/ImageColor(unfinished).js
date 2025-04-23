import React, { useState, useEffect } from "react";
import { ImageColorPicker } from "react-image-color-picker";
// import image from "@data/img/image.png";

// Converts an RGB color string to HEX format.
const rgbToHex = (rgb) => {
  if (!rgb) return ""; // Return empty string if input is falsy
  const match = rgb.match(/\d+/g);
  if (!match) return ""; // Return empty string if no match found
  const [r, g, b] = match.map(Number);
  return (
    "#" +
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
  );
};

const ColorApp = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [imageSrc, setImageSrc] = useState("");

  const handleColorPick = (color) => {
    console.log("handleColorPick called with color:", color);
  
    // Check if color is a string (e.g., "rgb(255, 255, 255)")
    if (typeof color === "string") {
      setSelectedColor(color); // Directly set the color string
    } else if (color && color.rgb) {
      setSelectedColor(color.rgb); // Handle the case where color is an object
    } else {
      console.error("Invalid color object received:", color);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a temporary URL for the uploaded image
      console.log("Uploaded image URL:", imageUrl); // Debug log
      setImageSrc(imageUrl); // Update the image source
    }
  };

  useEffect(() => {
    console.log("useEffect triggered with selectedColor:", selectedColor);
    if (selectedColor) {
      console.log("Selected RGB:", selectedColor);
      console.log("HEX Conversion:", rgbToHex(selectedColor));
    }
  }, [selectedColor]);

  return (
    <div>
      <h1>Image Color Picker Demo</h1>
      <h2>Selected color: {selectedColor || "NA"}</h2>
      <p>HEX: {selectedColor ? rgbToHex(selectedColor) : "N/A"}</p>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ marginBottom: "10px" }}
      />
      <ImageColorPicker
        onColorPick={handleColorPick}
        imgSrc={imageSrc}
        zoom={1}
      />
    </div>
  );
};

export default ColorApp;