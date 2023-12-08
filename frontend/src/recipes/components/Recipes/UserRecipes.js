import React from "react";
import { useParams } from "react-router-dom";

import RecipesToShow from "./RecipesToShow";
import Card from "../../../shared/components/UIElements/Card";

const UserRecipes = (props) => {
  const recipes = props.recipes;
  const userId = useParams().userId;
  
  // Zmieniamy warunek na sprawdzenie, czy przepis znajduje się w ulubionych użytkownika (czy userId jest w tablicy users)
  const loadedRecipes = recipes.filter((recipe) => recipe.users.includes(userId));
  
  const path = `favorites/${userId}`;

  if (loadedRecipes.length === 0) {
    return (
      <Card>
        <h2>No favorite recipes found.</h2>
      </Card>
    );
  }

  return <RecipesToShow recipes={loadedRecipes} path={path} />;
};

export default UserRecipes;
