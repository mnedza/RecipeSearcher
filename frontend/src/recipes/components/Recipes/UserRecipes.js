import React from "react";
import RecipesToShow from "./RecipesToShow";

const UserRecipes = (props) => {
  return <RecipesToShow recipes={props.recipes} path={props.path} />;
};

export default UserRecipes;
