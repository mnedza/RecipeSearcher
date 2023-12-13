import React, { useEffect, useState } from "react";
import AllRecipes from "../components/Recipes/AllRecipes";

const RecipesList = (props) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:5000/recipes");
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const data = await response.json();
        setRecipes(data.recipes);
      } catch (error) {
        console.error("Error fetching recipes:", error.message);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <>
      <AllRecipes recipes={recipes}>{props.children}</AllRecipes>
    </>
  );
};

export default RecipesList;
