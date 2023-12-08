import React from "react";
import RecipeDetails from "../components/Recipes/RecipeDetails";

const recipes = [
  {
    rId: "r1",
    name: "Scrambled Eggs",
    ingredients: ["eggs", "salt", "pepper"],
    instructions:
      "Whisk eggs, add salt and pepper, cook in a pan until scrambled.",
    url: "https://cdn.pixabay.com/photo/2011/04/06/09/24/scrambled-eggs-6128_1280.jpg",
    users: ["u1"],
  },
  {
    rId: "r2",
    name: "Spaghetti Bolognese",
    ingredients: ["spaghetti pasta", "ground beef", "onion", "tomato sauce"],
    instructions:
      "Cook spaghetti, sauté ground beef and onion, add tomato sauce, mix, and serve with spaghetti.",
    url: "https://cdn.pixabay.com/photo/2016/08/19/09/24/spaghetti-1604836_1280.jpg",
    users: ["u1"],
  },
  {
    rId: "r3",
    name: "Caesar Salad",
    ingredients: [
      "romaine lettuce",
      "croutons",
      "parmesan cheese",
      "Caesar dressing",
    ],
    instructions:
      "Chop lettuce, add croutons and parmesan cheese, drizzle with Caesar dressing, and toss to combine.",
    url: "https://natashaskitchen.com/wp-content/uploads/2019/01/Caesar-Salad-Recipe-3.jpg",
    users: ["u1"],
  },
  {
    rId: "r4",
    name: "Chicken Curry",
    ingredients: ["chicken breast", "curry powder", "onion", "coconut milk"],
    instructions:
      "Cut chicken and onion, sauté chicken with onion, add curry powder and coconut milk, simmer until cooked.",
    url: "https://hips.hearstapps.com/del.h-cdn.co/assets/17/31/1501791674-delish-chicken-curry-horizontal.jpg?crop=0.665xw:0.998xh;0.139xw,0.00240xh&resize=1200:*",
    users: ["u2"],
  },
  {
    rId: "r5",
    name: "Pancakes",
    ingredients: ["flour", "milk", "eggs", "sugar", "baking powder"],
    instructions:
      "Mix flour, milk, eggs, sugar, and baking powder. Cook spoonfuls of batter on a hot grrIddle until golden brown.",
    url: "https://lilluna.com/wp-content/uploads/2022/09/easy-pancakes3-resize-10.jpg",
    users: ["u2"],
  },
  {
    rId: "r6",
    name: "Fruit Smoothie",
    ingredients: ["banana", "strawberries", "blueberries", "yogurt", "honey"],
    instructions:
      "Blend banana, strawberries, blueberries, yogurt, and honey until smooth. Serve chilled.",
    url: "https://food.unl.edu/recipes/strawberry-banana-smoothie.jpg",
    users: [],
  },
];

const Recipe = (props) => {
  return (
    <>
      <RecipeDetails recipes={recipes}>{props.children}</RecipeDetails>
    </>
  );
};

export default Recipe;
