const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const uuid = require("uuid").v4;

const DUMMY_RECIPES = require("./recipes-controller").recipes;
const DUMMY_USERS = [
  {
    uId: "u1",
    name: "Jan Kowalski",
    email: "jan@example.com",
    password: "test",
    favorites: ["r1", "r2", "r3"],
  },
  {
    uId: "u2",
    name: "Anna Nowak",
    email: "anna@example.com",
    password: "test",
    favorites: ["r4", "r5"],
  },
];

// get user
exports.getUser = (req, res, next) => {
  const { userId } = req.params;

  const user = DUMMY_USERS.find((u) => u.uId === userId);

  if (!user) {
    return next(new HttpError("User not found.", 404));
  }

  res.status(200).json({ user, user });
};

// Sign up /
exports.signUp = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs passed, please check your data", 422));
  }

  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((u) => u.email === email);

  if (hasUser) {
    return next(new HttpError("User with this email already exists."), 422);
  }

  const createdUser = {
    uId: uuid(),
    name: name,
    email: email,
    password: password,
    favorites: [],
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

// sign in
exports.signIn = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    next(new HttpError("Could not identify user, bad credentials."));
  }

  res.json({ message: "Logged in!" });
};

// edit user
exports.editUser = (req, res, next) => {
  const { uId, email, password } = req.body;

  const updatedUser = { ...DUMMY_USERS.find((user) => user.uId === uId) };
  const userIndex = DUMMY_USERS.findIndex((user) => user.uId === uId);
  updatedUser.email = email;
  updatedUser.password = password;

  DUMMY_USERS[userIndex] = updatedUser;

  res.status(200).json({ user: updatedUser });
};

// delete user
exports.deleteUser = (req, res, next) => {
  const { uId } = req.body;

  if (!uId) {
    return res.status(400).json({ message: "Missing uId in the request body" });
  }

  const userIndex = DUMMY_USERS.findIndex((user) => user.uId === uId);
  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  DUMMY_USERS.splice(userIndex, 1);

  res.status(200).json({ message: "User deleted successfully" });
};

// get all favorites recipes for a specified user
exports.getFavoritesRecipes = (req, res, next) => {
  const userId = req.params.userId;

  const user = DUMMY_USERS.find((u) => u.uId === userId);

  if (!user) {
    return next(new HttpError("User not found.", 404));
  }

  const favoriteRecipes = user.favorites.map((recipeId) => {
    return DUMMY_RECIPES.find((recipe) => recipe.rId === recipeId);
  });

  res.json({ userRecipes: favoriteRecipes });
};

// get favorite recipe for a specified user
exports.getFavoriteRecipe = (req, res, next) => {
  const userId = req.params.userId;
  const recipeId = req.params.recipeId;

  const user = DUMMY_USERS.find((u) => u.uId === userId);

  if (!user) {
    return next(new HttpError("User not found.", 404));
  }

  const favRecipe = DUMMY_RECIPES.find(
    (recipe) => recipe.rId === recipeId && user.favorites.includes(recipeId)
  );

  if (!favRecipe) {
    return next(new HttpError("Favorite recipe not found for this user.", 404));
  }

  res.json({ favoriteRecipe: favRecipe });
};

// add recipe to favorite
exports.addRecipeToFavorites = (req, res, next) => {
  const { userId } = req.body;
  const { recipeId } = req.params;

  const recipe = DUMMY_RECIPES.find((r) => r.rId === recipeId);
  if (!recipe) {
    return next(new HttpError("Recipe not found.", 404));
  }

  const user = DUMMY_USERS.find((u) => u.uId === userId);
  if (!user) {
    return next(new HttpError("User not found.", 404));
  }

  if (user.favorites.includes(recipeId)) {
    return next(new HttpError("Recipe already in favorites.", 422));
  }

  user.favorites.push(recipeId);

  res.status(200).json({
    message: `Recipe ${recipeId} added to favorites for user ${userId}`,
  });
};

// remove recipe from favorites
exports.removeRecipeFromFavorites = (req, res, next) => {
  const { userId } = req.body;
  const { recipeId } = req.params;

  const recipeIndex = DUMMY_RECIPES.findIndex((r) => r.rId === recipeId);
  // -1 oznacza to że dane o tym id nie zostały znalezione w tablicy.
  if (recipeIndex === -1) {
    return next(new HttpError("Recipe not found.", 404));
  }

  const userIndex = DUMMY_USERS.findIndex((u) => u.uId === userId);
  if (userIndex === -1) {
    return next(new HttpError("User not found.", 404));
  }

  const user = DUMMY_USERS[userIndex];

  if (!user.favorites.includes(recipeId)) {
    return next(new HttpError("Recipe not found in favorites.", 422));
  }

  user.favorites = user.favorites.filter((fav) => fav !== recipeId);

  res.status(200).json({
    message: `Recipe ${recipeId} removed from favorites for user ${userId}`,
  });
};

exports.users = DUMMY_USERS;
