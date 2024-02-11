import React, { useState, useEffect } from "react";
import convertUnits from "convert-units";

import "../HighlightOnHover.css"; // Make sure the path matches where your CSS file is located

function RecipeBox({ onAddRecipe }) {
  // Add unit conversion logic here
  
  const [recipe, setRecipe] = useState(() => {
    // Get the recipe from localStorage when the component mounts
    const savedRecipe = localStorage.getItem("recipe");
    if (savedRecipe) {
      return JSON.parse(savedRecipe);
    } else {
      return { title: "", ingredients: [] };
    }
  });
  const [showForm, setShowForm] = useState(true); // New state variable for showing the form


  // Dummy function for demonstration
  // In a real scenario, you'd parse the text and dynamically generate these components
  const handleHover = (unit, quantity) => {
    const converted = convertUnits(quantity).from(unit.from).to(unit.to);
    setConversionValue(`${converted.toFixed(2)} ${unit.to}`);
    setHoveredUnit(`${quantity} ${unit.from}`);
    setShowConversion(true);
  };

  const handleRecipeChange = (event) => {
    // New function to handle changes to the recipe
    setRecipe({ ...recipe, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddRecipe(recipe);
    setRecipe({ title: "", ingredients: "" });
    setShowForm(false); // Hide the form after submitting
  };

  return (
    <div>
      {showForm && ( // Only render the form if showForm is true
        <>
          <h2>Add a New Recipe</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={recipe.title}
                onChange={handleRecipeChange}
              />
            </label>
            <label>
              Ingredients:
              <textarea
                name="ingredients"
                value={recipe.ingredients}
                onChange={handleRecipeChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </>
      )}

      {/* Simulated text with "clickable" units */}
      <p className="textHighlight">
        {" "}
        {/* Should change this to {recipe} once I got idea about how to do this lol */}
        Add{" "}
        <span onMouseOver={() => handleHover({ from: "cup", to: "ml" }, 1)}>
          1 cup
        </span>{" "}
        of milk...
      </p>
      {showConversion && (
        <div>
          <p>
            Convert "{hoveredUnit}" to {conversionValue}?
          </p>
          {/* Implement conversion logic on confirmation */}
        </div>
      )}
    </div>
  );
}

export default RecipeBox;