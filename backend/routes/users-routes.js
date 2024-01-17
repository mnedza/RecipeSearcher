const express = require("express");
const router = express.Router();

const { check } = require("express-validator");

const usersController = require("../controllers/users-controller");
const recipesController = require("../controllers/recipes-controller");
const checkAuth = require("../middleware/check-auth");

const fileUpload = require("../middleware/file-upload");

router.post(
  "/sign-up",
  fileUpload.single("image"),
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.createUser
);

router.post("/sign-in", usersController.signIn);

// Authentication
router.use(checkAuth);

router.get("/profile/:userId", usersController.getUserById);
router.put(
  "/profile/:userId",
  fileUpload.single("image"),
  usersController.updateUserById
);
router.delete(
  "/profile/:userId",
  fileUpload.single("image"),
  usersController.deleteUser
);

router.post("/recipes/:recipeId", usersController.addRecipeToFavorites);
router.post(
  "/favorites/:userId/:recipeId",
  usersController.addRecipeToFavorites
);
router.get("/favorites/:userId", usersController.getFavoritesRecipes);
router.get("/favorites/:userId/:recipeId", usersController.getFavoriteRecipe);
router.delete("/recipes/:recipeId", usersController.removeRecipeFromFavorites);
router.delete(
  "/favorites/:userId/:recipeId",
  usersController.removeRecipeFromFavorites
);

// admin functions
router.post(
  "/admin/recipes/add-recipe",
  fileUpload.single("image"),
  recipesController.addRecipe
);
router.put(
  "/admin/recipes/edit-recipe/:recipeId",
  fileUpload.single("image"),
  usersController.updateRecipeById
);

router.delete(
  "/admin/recipes/:recipeId",
  fileUpload.single("image"),
  recipesController.removeRecipeById
);

router.get("/admin/users", usersController.getAllUsers);
router.get("/admin/users/:userId", usersController.getUserById);
router.post("/admin/users/add-user", usersController.createUser);
router.delete("/admin/users/:userId", usersController.deleteUser);

module.exports = router;
