import React from "react";
import RecipeBox from "./RecipeBox";

function RecipeListTab({ recipes }) {
  return (
    <div>
      <h2>Recipe List</h2>
      {recipes.map((recipe, index) => (
        <RecipeBox key={index} recipe={recipe} />
      ))}
    </div>
  );
}

export default RecipeListTab;
