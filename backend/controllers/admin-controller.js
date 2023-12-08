const HttpError = require("../models/http-error");
const uuid = require("uuid").v4;

const DUMMY_RECIPES = require("./recipes-controller").recipes;
const DUMMY_USERS = require("./users-controller").users;

// get all users
exports.getAllUsers = (req, res, next) => {
  const users = DUMMY_USERS;
  if (!users || users.length === 0) {
    return next(new HttpError("No users found.", 404));
  }
  res.status(200).json({ users, users });
};

exports.getUser = (req, res, next) => {
  const { userId } = req.params;

  const user = DUMMY_USERS.find((u) => u.uId === userId);

  if (!user) {
    return next(new HttpError("User not found.", 404));
  }

  res.status(200).json({ user, user });
};

exports.addUser = (req, res, next) => {
  const { name, email, password, favorites } = req.body;

  const createdUser = {
    uId: uuid(),
    name: name,
    password: password,
    email: email,
    favorites: favorites,
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

exports.removeUser = (req, res, next) => {};
