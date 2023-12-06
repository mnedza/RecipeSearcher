import React from "react";
import UserRecipes from "../components/Recipes/UserRecipes";

const Favorites = (props) => {
  const recipes = [
    {
      id: "r1",
      name: "Scrambled Eggs",
      ingredients: ["eggs", "salt", "pepper"],
      instructions:
        "Whisk eggs, add salt and pepper, cook in a pan until scrambled.",
      url: "https://cdn.pixabay.com/photo/2011/04/06/09/24/scrambled-eggs-6128_1280.jpg",
      uId: "u1",
    },
    {
      id: "r2",
      name: "Spaghetti Bolognese",
      ingredients: ["spaghetti pasta", "ground beef", "onion", "tomato sauce"],
      instructions:
        "Cook spaghetti, sauté ground beef and onion, add tomato sauce, mix, and serve with spaghetti.",
      url: "https://cdn.pixabay.com/photo/2016/08/19/09/24/spaghetti-1604836_1280.jpg",
      uId: "u1",
    },
    {
      id: "r3",
      name: "Chicken Curry",
      ingredients: ["chicken breast", "curry powder", "onion", "coconut milk"],
      instructions:
        "Cut chicken and onion, sauté chicken with onion, add curry powder and coconut milk, simmer until cooked.",
      url: "https://hips.hearstapps.com/del.h-cdn.co/assets/17/31/1501791674-delish-chicken-curry-horizontal.jpg?crop=0.665xw:0.998xh;0.139xw,0.00240xh&resize=1200:*",
      uId: "u2",
    },
  ];

  return (
    <>
      <UserRecipes recipes={recipes}>{props.children}</UserRecipes>
    </>
  );
};

export default Favorites;
