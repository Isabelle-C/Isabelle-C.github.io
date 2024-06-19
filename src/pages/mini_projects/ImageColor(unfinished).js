import React, { useState } from "react";
import { ImageColorPicker } from "react-image-color-picker";
import image from "@data/img/image.png";

// Converts an RGB color string to HEX format.
const rgbToHex = (rgb) => {
  if (!rgb) return ''; // Return empty string if input is falsy
  const match = rgb.match(/\d+/g);
  if (!match) return ''; // Return empty string if no match found
  const [r, g, b] = match.map(Number);
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

const ColorApp = () => {
  const [selectedColor, setSelectedColor] = useState("");

  const handleColorPick = (color) => {
    console.log("Selected color:", color); // Selected color: rgb(101, 42, 65)
    setSelectedColor(color.rgb); // Assuming color object has a 'rgb' property
  };

  return (
    <div>
      <h1>Image Color Picker Demo</h1>
      <h2>Selected color: {selectedColor}</h2>
      <p>HEX: {selectedColor ? rgbToHex(selectedColor) : 'N/A'}</p>
      <ImageColorPicker onColorPick={handleColorPick} imgSrc={image} zoom={1} />
    </div>
  );
};

export default ColorApp;
