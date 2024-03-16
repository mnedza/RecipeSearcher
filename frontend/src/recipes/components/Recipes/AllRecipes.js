import React from "react";
import RecipesToShow from "./RecipesToShow";
import Card from "../../../shared/components/UIElements/Card";

const AllRecipes = (props) => {
  const recipes = props.recipes;
  if (recipes.length === 0) {
    return (
      <Card>
        <h2>No recipes found.</h2>
      </Card>
    );
  }

  return (
    <>
      <RecipesToShow recipes={recipes} path={"recipes"} />
    </>
  );
};

export default AllRecipes;
