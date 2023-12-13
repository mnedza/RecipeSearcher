import React from "react";
import { useParams } from "react-router-dom";
import RecipeNotFound from "./RecipeNotFound";
import RecipeContentToShow from "./RecipeContentToShow";
import LoadingAnimation from "../../../shared/components/UIElements/LoadingAnimation";

const RecipeDetails = (props) => {
  const recipes = props.recipes;
  const recipeId = useParams().recipeId;
  const loadedRecipe = recipes.find((recipe) => recipe._id === recipeId);
  return (
    <>
      {loadedRecipe ? <RecipeContentToShow loadedRecipe={loadedRecipe} /> : <LoadingAnimation />}
      {!loadedRecipe && <RecipeNotFound />}
    </>
  );
};

export default RecipeDetails;
