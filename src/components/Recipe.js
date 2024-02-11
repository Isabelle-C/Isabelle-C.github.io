import React from "react";
import { useState } from "react";

import AddRecipeTab from "./AddRecipeTab";
import RecipeListTab from "./RecipeListTab";
import ImageGallery from "./ImageGallery"; 

function Recipe() {
  const [recipes, setRecipes] = useState([]);

  const handleAddRecipe = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);
  };

  return (
    <div>
      <AddRecipeTab onAddRecipe={handleAddRecipe} />
      <ImageGallery /> {/* Add the ImageGallery component here */}
      <RecipeListTab recipes={recipes} />
    </div>
  );
}


export default Recipe; // always export component
