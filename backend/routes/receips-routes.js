const express = require("express");
const router = express.Router();

const receipsController = require("../controllers/receips-controller");

router.get("/recipes", receipsController.getRecipes);
router.get("/recipes/:recipeId", receipsController.getReceip);
router.get("/favorites/:userId", receipsController.getFavoritesReceips);
router.get("/favorites/:userId/:recipeId", receipsController.getFavoriteReceip);

module.exports = router;
