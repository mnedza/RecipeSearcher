const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const User = require("../models/user-model");
const Recipe = require("../models/recipe-model");

// create user = Sign up
exports.createUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }

  const { name, surname, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (existingUser) {
    return next(new HttpError("User with this email already exists.", 422));
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Could not create a user, please try again.",
      500
    );
    return next(error);
  }

  const isAdmin = false;

  const createdUser = new User({
    isAdmin,
    name,
    surname,
    email,
    password: hashedPassword,
    favorites: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    return next(
      new HttpError("Signing up failed, please try again later.", 500)
    );
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      "token_secret",
      { expiresIn: "1h" }
    );
  } catch (err) {
    return next(
      new HttpError("Signing up failed, please try again later.", 500)
    );
  }
  res.status(201).json({
    userId: createdUser.id,
    email: createdUser.email,
    token: token,
    isAdmin: createdUser.isAdmin,
  });
};

// sign in
exports.signIn = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing in failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError("Invalid credentials, could not sign in.", 401);
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Could not sign in, please check your credentials and try again.",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError("Invalid credentials, could not sign in.", 401);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
      },
      "token_secret",
      { expiresIn: "1h" }
    );
  } catch (err) {
    return next(
      new HttpError("Signing in failed, please try again later.", 500)
    );
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
    isAdmin: existingUser.isAdmin,
  });
};

// get user
exports.getUserById = async (req, res, next) => {
  const userId = req.params.userId;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a user.",
      500
    );
    return next(error);
  }

  if (!user) {
    return next(new HttpError("User not found.", 404));
  }

  if (!user) {
    const error = new HttpError(
      "Could not find a user for the provided id.",
      500
    );
    return next(error);
  }

  res.status(200).json({ user, user });
};

// edit user
exports.updateUserById = async (req, res, next) => {
  const userId = req.params.userId;
  const { name, surname, email, password } = req.body;

  let userToUpdate;
  try {
    userToUpdate = await User.findById(userId);
  } catch (err) {
    return next(new HttpError("Could not update user.", 500));
  }

  if (!userToUpdate) {
    return next(new HttpError("Could not find user for provided Id.", 404));
  }

  userToUpdate.name = name || userToUpdate.name;
  userToUpdate.surname = surname || userToUpdate.surname;
  userToUpdate.email = email || userToUpdate.email;
  userToUpdate.password = password || userToUpdate.password;

  try {
    await userToUpdate.save();
  } catch (err) {
    return next(new HttpError("Could not update user.", 500));
  }

  res.status(200).json({ user: userToUpdate.toObject({ getters: true }) });
};

// delete user
exports.deleteUser = async (req, res, next) => {
  const userId = req.params.userId;
  let user;
  try {
    user = await User.findByIdAndDelete(userId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, Could not delete a user.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("User not found.", 404);
    return next(error);
  }

  res.status(200).json({ message: "User deleted successfully" });
};

// add recipe to favorite
exports.addRecipeToFavorites = async (req, res, next) => {
  let userId = req.params.userId;
  if (!userId) {
    userId = req.body.userId;
  }
  const { recipeId } = req.params;

  let recipe;
  try {
    recipe = await Recipe.findById(recipeId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not find recipe.", 500)
    );
  }

  if (!recipe) {
    return next(new HttpError("Recipe not found.", 404));
  }

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not find user.", 500)
    );
  }

  if (!user) {
    return next(new HttpError("User not found.", 404));
  }

  if (user.favorites.includes(recipeId)) {
    return next(new HttpError("Recipe already in favorites.", 422));
  }

  user.favorites.push(recipeId);

  try {
    await user.save();
  } catch (err) {
    return next(new HttpError("Could not add recipe to favorites.", 500));
  }

  res.status(200).json({
    message: `Recipe ${recipeId} added to favorites for user ${userId}`,
  });
};

// get all favorites recipes
exports.getFavoritesRecipes = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId).populate("favorites");

    if (!user) {
      return next(new HttpError("User not found.", 404));
    }

    res.json({ favorites: user.favorites });
  } catch (err) {
    return next(new HttpError("Error getting user's favorite recipes.", 500));
  }
};

// get favorite recipe
exports.getFavoriteRecipe = async (req, res, next) => {
  const userId = req.params.userId;
  const recipeId = req.params.recipeId;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not find user.", 500)
    );
  }

  if (!user) {
    return next(new HttpError("User not found.", 404));
  }

  const favRecipeId = user.favorites.find(
    (fav) => fav.toString() === recipeId.toString()
  );

  if (!favRecipeId) {
    return next(new HttpError("Favorite recipe not found for this user.", 404));
  }

  let favRecipe;
  try {
    favRecipe = await Recipe.findById(favRecipeId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not find recipe.", 500)
    );
  }

  if (!favRecipe) {
    return next(new HttpError("Favorite recipe not found for this user.", 404));
  }

  res.json({ favorite: favRecipe.toObject({ getters: true }) });
};

// remove recipe from favorites
exports.removeRecipeFromFavorites = async (req, res, next) => {
  let userId = req.params.userId;
  if (!userId) {
    userId = req.body.userId;
  }
  const { recipeId } = req.params;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find user.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("User not found.", 404);
    return next(error);
  }

  // Remove recipeId from user's favorites
  user.favorites.pull(recipeId);

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError("Could not remove recipe from favorites.", 500);
    return next(error);
  }

  res.status(200).json({
    message: `Recipe ${recipeId} removed from favorites for user ${userId}`,
  });
};

// admin functions
// get all users
exports.getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find any users.",
      500
    );
    return next(error);
  }

  res.json({ users });
};
