import React, { useEffect, useState } from "react";
import AllRecipes from "../components/Recipes/AllRecipes";

const RecipesList = (props) => {
  const [recipes, setRecipes] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`${apiUrl}/recipes`);
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
  }, [apiUrl]);

  return (
    <>
      <AllRecipes recipes={recipes}>{props.children}</AllRecipes>
    </>
  );
};

export default RecipesList;
