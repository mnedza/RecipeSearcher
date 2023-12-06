const express = require("express");
const bodyParser = require("body-parser");

const recipesRoutes = require("./routes/receips-routes");

const app = express();

app.use(recipesRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured." });
});

app.listen(5000);
