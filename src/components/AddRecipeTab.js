import React, { useState } from "react";

function AddRecipeTab({ onAddRecipe }) {
  const [recipeText, setRecipeText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddRecipe(recipeText);
    setRecipeText("");
  };

  return (
    <div>
      <h2>Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={recipeText}
          onChange={(e) => setRecipeText(e.target.value)}
          placeholder="Enter recipe here"
        />
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
}

export default AddRecipeTab;
