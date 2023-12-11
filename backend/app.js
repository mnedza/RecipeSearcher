const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const usersRoutes = require("./routes/users-routes");
const recipesRoutes = require("./routes/recipes-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());
app.use(usersRoutes);
app.use(recipesRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  next(error);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured." });
});

mongoose
  .connect(
    "mongodb+srv://marcel:marcel123@cluster0.mrobyik.mongodb.net/recipe-search?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
