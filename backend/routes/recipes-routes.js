const express = require("express");
const router = express.Router();

const recipesController = require("../controllers/recipes-controller");

router.get("/recipes", recipesController.getRecipes);
router.get("/recipes/:recipeId", recipesController.getRecipeById);

// admin functions

router.post("/admin/recipes/add-recipe", recipesController.addRecipe);
router.delete("/admin/recipes/:recipeId", recipesController.removeRecipeById);


module.exports = router;
