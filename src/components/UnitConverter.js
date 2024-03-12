import React, { useState } from "react";
import convert from "convert-units";

function UnitConverter() {
  const [inputValue, setInputValue] = useState("");
  const [convertedValue, setConvertedValue] = useState("");
  const [unitSystem, setUnitSystem] = useState("metric"); // 'metric' or 'imperial'

  // Handles the conversion logic based on the current unit system
  const handleConversion = () => {
    if (!inputValue) return; // Early return if no input value

    let result;
    if (unitSystem === "metric") {
      // Example: Convert cups (imperial) to milliliters (metric)
      result = convert(inputValue).from("cup").to("ml");
    } else {
      // Example: Convert milliliters (metric) to cups (imperial)
      result = convert(inputValue).from("ml").to("cup");
    }
    setConvertedValue(result.toFixed(2));
  };

  // Toggles the unit system between metric and imperial
  const toggleUnitSystem = () => {
    setUnitSystem((prevSystem) =>
      prevSystem === "metric" ? "imperial" : "metric",
    );
    setConvertedValue(""); // Reset converted value
  };

  return (
    <div>
      <input
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter value"
      />
      <button onClick={handleConversion}>Convert</button>
      <p>Converted Value: {convertedValue}</p>
      <label>
        <input
          type="checkbox"
          checked={unitSystem === "imperial"}
          onChange={toggleUnitSystem}
        />
        Switch to {unitSystem === "metric" ? "Imperial" : "Metric"}
      </label>
    </div>
  );
}

export default UnitConverter;
