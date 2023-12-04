import React from "react";
import { useParams } from "react-router-dom";

import RecipesToShow from "./RecipesToShow";
import Card from "../../../shared/components/UIElements/Card";

const INITIAL_RECIPES = [
  {
    id: 1,
    name: "Scrambled Eggs",
    ingredients: ["eggs", "salt", "pepper"],
    instructions:
      "Whisk eggs, add salt and pepper, cook in a pan until scrambled.",
    url: "https://cdn.pixabay.com/photo/2011/04/06/09/24/scrambled-eggs-6128_1280.jpg",
    uId: "u1",
  },
  {
    id: 2,
    name: "Spaghetti Bolognese",
    ingredients: ["spaghetti pasta", "ground beef", "onion", "tomato sauce"],
    instructions:
      "Cook spaghetti, sauté ground beef and onion, add tomato sauce, mix, and serve with spaghetti.",
    url: "https://cdn.pixabay.com/photo/2016/08/19/09/24/spaghetti-1604836_1280.jpg",
    uId: "u1",
  },
  {
    id: 4,
    name: "Chicken Curry",
    ingredients: ["chicken breast", "curry powder", "onion", "coconut milk"],
    instructions:
      "Cut chicken and onion, sauté chicken with onion, add curry powder and coconut milk, simmer until cooked.",
    url: "https://hips.hearstapps.com/del.h-cdn.co/assets/17/31/1501791674-delish-chicken-curry-horizontal.jpg?crop=0.665xw:0.998xh;0.139xw,0.00240xh&resize=1200:*",
    uId: "u2",
  },
];

const UserRecipes = () => {
  const recipes = INITIAL_RECIPES;
  const userId = useParams().userId;
  const loadedPlaces = recipes.filter((recipe) => recipe.uId === userId);

  if (loadedPlaces.length === 0) {
    return (
      <Card>
        <h2>No favorite recipes found.</h2>
      </Card>
    );
  }

  return <RecipesToShow recipes={loadedPlaces} />;
};

export default UserRecipes;
