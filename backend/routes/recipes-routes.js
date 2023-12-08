const express = require("express");
const router = express.Router();

const recipesController = require("../controllers/recipes-controller");

router.get("/recipes", recipesController.getRecipes);
router.get("/recipes/:recipeId", recipesController.getRecipe);

module.exports = router;
