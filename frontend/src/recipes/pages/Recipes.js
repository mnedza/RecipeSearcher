import React from "react";
import AllRecipes from "../components/Recipes/AllRecipes";

const RecipesList = (props) => {
  return (
    <>
      <AllRecipes>{props.children}</AllRecipes>
    </>
  );
};

export default RecipesList;
