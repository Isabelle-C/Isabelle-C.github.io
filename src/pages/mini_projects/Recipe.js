import React, { useState, useEffect } from "react";

const RecipePage = () => {
  const [recipes, setRecipes] = useState(() => {
    const savedRecipes = localStorage.getItem("recipes");
    if (savedRecipes) {
      return JSON.parse(savedRecipes);
    } else {
      return [];
    }
  });

  const [newRecipe, setNewRecipe] = useState({
    name: "",
    ingredients: "",
    instructions: "",
  });

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  // Set unit conversion logic here
  const [showConversion, setShowConversion] = useState(false);
  const [conversionValue, setConversionValue] = useState("");
  const [hoveredUnit, setHoveredUnit] = useState("");

  const handleInputChange = (e) => {
    setNewRecipe({ ...newRecipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRecipes([...recipes, newRecipe]);
    setNewRecipe({ name: "", ingredients: "", instructions: "" });
  };

  return (
    <div>
      <h1>Recipes</h1>
      {recipes.map((recipe, index) => (
        <div key={index}>
          <h2>{recipe.name}</h2>
          <p>{recipe.ingredients}</p>
          <p>{recipe.instructions}</p>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={newRecipe.name}
          onChange={handleInputChange}
          placeholder="Recipe name"
          required
        />
        <input
          name="ingredients"
          value={newRecipe.ingredients}
          onChange={handleInputChange}
          placeholder="Ingredients"
          required
        />
        <textarea
          name="instructions"
          value={newRecipe.instructions}
          onChange={handleInputChange}
          placeholder="Instructions"
          required
        />
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

export default RecipePage;
