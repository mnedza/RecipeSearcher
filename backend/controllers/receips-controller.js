const HttpError = require("../models/http-error");

const DUMMY_RECEIPS = [
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
    uId: "u1",
  },
  {
    id: "r4",
    name: "Chicken Curry",
    ingredients: ["chicken breast", "curry powder", "onion", "coconut milk"],
    instructions:
      "Cut chicken and onion, sauté chicken with onion, add curry powder and coconut milk, simmer until cooked.",
    url: "https://hips.hearstapps.com/del.h-cdn.co/assets/17/31/1501791674-delish-chicken-curry-horizontal.jpg?crop=0.665xw:0.998xh;0.139xw,0.00240xh&resize=1200:*",
    uId: "u1",
  },
  {
    id: "r5",
    name: "Pancakes",
    ingredients: ["flour", "milk", "eggs", "sugar", "baking powder"],
    instructions:
      "Mix flour, milk, eggs, sugar, and baking powder. Cook spoonfuls of batter on a hot griddle until golden brown.",
    url: "https://lilluna.com/wp-content/uploads/2022/09/easy-pancakes3-resize-10.jpg",
    uId: "u2",
  },
  {
    id: "r6",
    name: "Fruit Smoothie",
    ingredients: ["banana", "strawberries", "blueberries", "yogurt", "honey"],
    instructions:
      "Blend banana, strawberries, blueberries, yogurt, and honey until smooth. Serve chilled.",
    url: "https://food.unl.edu/recipes/strawberry-banana-smoothie.jpg",
    uId: "u2",
  },
];

exports.getRecipes = (req, res, next) => {
  const receips = DUMMY_RECEIPS;
  if (!receips || receips.length === 0) {
    return next(new HttpError("Recipes not found."));
  }

  res.json({ recipes: receips });
};

exports.getReceip = (req, res, next) => {
  const receipId = req.params.recipeId;
  const receip = DUMMY_RECEIPS.find((r) => {
    return r.id === receipId;
  });
  res.json({ receip: receip });
};

exports.getFavoritesReceips = (req, res, next) => {
  const userId = req.params.userId;

  const userRecipes = DUMMY_RECEIPS.filter((recipe) => {
    return recipe.uId === userId;
  });

  if (!userRecipes || userRecipes.length === 0) {
    return next(
      new HttpError("Could not find any recipes for the provided user.")
    );
  }

  res.json({ userRecipes: userRecipes });
};

exports.getFavoriteReceip = (req, res, next) => {
  const userId = req.params.userId;
  const receipId = req.params.recipeId;

  const receip = DUMMY_RECEIPS.find((r) => {
    return r.uId === userId && r.id === receipId;
  });

  if (!receip) {
    return next(new HttpError("Could not find a receip for provided user."));
  }

  res.json({ receip: receip });
};
