const express = require("express");
const router = express.Router();

const { check } = require("express-validator");

const usersController = require("../controllers/users-controller");

// common user functions

router.post(
  "/sign-up",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.createUser
);
// router.post("/sign-in", usersController.signIn);
router.get("/profile/:userId", usersController.getUserById);
router.patch("/profile/:userId", usersController.editUserById);
router.delete("/profile/:userId", usersController.deleteUser);

router.post("/recipes/:recipeId", usersController.addRecipeToFavorites);
router.post("/favorites/:userId/:recipeId", usersController.addRecipeToFavorites);
router.get("/favorites/:userId", usersController.getFavoritesRecipes);
router.get("/favorites/:userId/:recipeId", usersController.getFavoriteRecipe);
router.delete("/recipes/:recipeId", usersController.removeRecipeFromFavorites);
router.delete(
  "/favorites/:userId/:recipeId",
  usersController.removeRecipeFromFavorites
);

// admin functions only

router.get("/admin/users", usersController.getAllUsers);
router.get("/admin/users/:userId", usersController.getUserById);
router.post("/admin/users/add-user", usersController.createUser);
router.delete("/admin/users/:userId", usersController.deleteUser);

module.exports = router;
