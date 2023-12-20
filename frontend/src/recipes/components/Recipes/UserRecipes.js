import React from "react";
import RecipesToShow from "./RecipesToShow";
import Card from "../../../shared/components/UIElements/Card";

const UserRecipes = (props) => {
  const recipes = props.recipes;
  if (recipes.length === 0) {
    return (
      <Card>
        <h2>No recipes found.</h2>
      </Card>
    );
  }

  return <RecipesToShow recipes={props.recipes} path={props.path} />;
};

export default UserRecipes;
