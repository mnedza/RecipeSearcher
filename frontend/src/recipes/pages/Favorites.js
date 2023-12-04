import React from "react";
import UserRecipes from "../components/Recipes/UserRecipes";

const Favorites = (props) => {
  return (
    <>
      <UserRecipes>{props.children}</UserRecipes>
    </>
  );
};

export default Favorites;
