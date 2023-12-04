import React from "react";
import RecipesToShow from "./RecipesToShow";

const FAVORITES_RECIPES_OF_SPECIFIED_USER = [
  {
    id: 1,
    name: "Scrambled Eggs",
    ingredients: ["eggs", "salt", "pepper"],
    instructions:
      "Whisk eggs, add salt and pepper, cook in a pan until scrambled.",
    url: "https://cdn.pixabay.com/photo/2011/04/06/09/24/scrambled-eggs-6128_1280.jpg",
  },
  {
    id: 2,
    name: "Spaghetti Bolognese",
    ingredients: ["spaghetti pasta", "ground beef", "onion", "tomato sauce"],
    instructions:
      "Cook spaghetti, sauté ground beef and onion, add tomato sauce, mix, and serve with spaghetti.",
    url: "https://cdn.pixabay.com/photo/2016/08/19/09/24/spaghetti-1604836_1280.jpg",
  },
];

const UserRecipes = () => {
  return <RecipesToShow recipes={FAVORITES_RECIPES_OF_SPECIFIED_USER} />;
};

export default UserRecipes;
