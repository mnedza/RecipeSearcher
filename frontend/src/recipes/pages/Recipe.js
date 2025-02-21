import React, {useState, useEffect} from "react";
import RecipeDetails from "../components/Recipes/RecipeDetails";

const Recipe = (props) => {
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
      <RecipeDetails recipes={recipes}>{props.children}</RecipeDetails>
    </>
  );
};

export default Recipe;
