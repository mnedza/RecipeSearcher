const express = require("express");
const router = express.Router();

const { check } = require("express-validator");

const usersController = require("../controllers/users-controller");

router.post(
  "/sign-up",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.signUp
);
router.post("/sign-in", usersController.signIn);
router.get("/profile/:userId", usersController.getUser);
router.patch("/profile/:userId", usersController.editUser);
router.delete("/profile/:userId", usersController.deleteUser);

router.get("/favorites/:userId", usersController.getFavoritesRecipes);
router.get("/favorites/:userId/:recipeId", usersController.getFavoriteRecipe);
router.post("/recipes/:recipeId", usersController.addRecipeToFavorites);
router.delete("/recipes/:recipeId", usersController.removeRecipeFromFavorites);
router.post(
  "/favorites/:userId/:recipeId",
  usersController.addRecipeToFavorites
);
router.delete(
  "/favorites/:userId/:recipeId",
  usersController.removeRecipeFromFavorites
);

module.exports = router;
