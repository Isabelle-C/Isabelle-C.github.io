import React, { useState } from "react";
import { ImageColorPicker } from "react-image-color-picker";
import image from "@data/img/image.png";

// Converts an RGB color string to HEX format.
const rgbToHex = (rgb) => {
  // Extract integers for red, green, and blue components.
  const [r, g, b] = rgb.match(/\d+/g).map(Number);
  // Convert each component to HEX and concatenate.
  return (
    "#" +
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
  );
};

const ColorApp = () => {
  const[selectedColor, setSelectedColor] = useState("");

  const handleColorPick = (color) => {
    console.log("Selected color:", color); // Selected color: rgb(101, 42, 65)
    setSelectedColor(color);
  };

  return (
    <div>
      <h1>Image Color Picker Demo</h1>
      <h2>Selected color: {selectedColor}</h2>
      <p>HEX: {rgbToHex(selectedColor)}</p>
      <ImageColorPicker onColorPick={handleColorPick} imgSrc={image} zoom={1} />
    </div>
  );
};

export default ColorApp;
