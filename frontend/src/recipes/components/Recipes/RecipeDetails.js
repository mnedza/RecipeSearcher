import React from "react";
import { useParams } from "react-router-dom";
import RecipeNotFound from "./RecipeNotFound";
import RecipeContentToShow from "./RecipeContentToShow";

// Należy pobierać przepisy w taki sam sposób jak w AllRecipes albo i nawet z tamtego komponentu


const RecipeDetails = (props) => {
  const recipes = props.recipes;
  
  const recipeId = useParams().recipeId;
  const loadedRecipe = recipes.find((recipe) => recipe.id === recipeId);

  return (
    <>
      {loadedRecipe && <RecipeContentToShow loadedRecipe={loadedRecipe} />}
      {!loadedRecipe && <RecipeNotFound />}
    </>
  );
};

export default RecipeDetails;
