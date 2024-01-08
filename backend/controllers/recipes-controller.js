const HttpError = require("../models/http-error");
const User = require("../models/user-model");
const Recipe = require("../models/recipe-model");

// create recipe - admin only
exports.addRecipe = async (req, res, next) => {
  const {
    name,
    ingredients,
    instructions,
    image,
    users,
    time,
    category,
    cuisine,
    difficulty,
    seasonality,
    specialDiet,
  } = req.body;

  const createdRecipe = new Recipe({
    name: name,
    ingredients: ingredients,
    instructions: instructions,
    image: image,
    users: users,
    time: time,
    category: category,
    cuisine: cuisine,
    difficulty: difficulty,
    seasonality: seasonality,
    specialDiet: specialDiet,
  });

  try {
    await createdRecipe.save();
  } catch (err) {
    const error = new HttpError(
      "Creating recipe failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ recipe: createdRecipe });
};

// get all recipes
exports.getRecipes = async (req, res, next) => {
  let recipes;
  try {
    recipes = await Recipe.find();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find recipes.",
      500
    );
    return next(error);
  }

  res.json({ recipes });
};

// get recipe
exports.getRecipeById = async (req, res, next) => {
  const recipeId = req.params.recipeId;
  let recipe;
  try {
    recipe = await Recipe.findById(recipeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a recipe.",
      500
    );
    return next(error);
  }

  if (!recipe) {
    const error = new HttpError(
      "Could not find a recipe for the provided id.",
      500
    );
    return next(error);
  }

  res.json({ recipe: recipe.toObject({ getters: true }) });
};

// remove recipe
exports.removeRecipeById = async (req, res, next) => {
  const recipeId = req.params.recipeId;

  try {
    const result = await Recipe.findByIdAndDelete(recipeId);

    if (!result) {
      return next(new HttpError("Could not find recipe for provided id.", 404));
    }

    await User.updateMany(
      { favorites: recipeId },
      { $pull: { favorites: recipeId } }
    );

    res.status(200).json({ message: "Deleted recipe." });
  } catch (err) {
    return next(new HttpError("Could not delete recipe.", 500));
  }
};


// exports.searchRecipes = async (req, res, next) => {
//   const { searchWords, allFilters } = req.body;

//   try {
//     let recipes = [];
//     if (searchWords.length > 0) {
//       const keywordsQuery = searchWords.map(word => ({ name: { $regex: new RegExp(word, "i") } }));
//       const keywordRecipes = await Recipe.find({ $or: keywordsQuery });
//       recipes.push(...keywordRecipes);
//     }

//     if (allFilters) {
//       const filterKeys = Object.keys(allFilters);
//       if (filterKeys.length > 0) {
//         recipes = recipes.filter(recipe => {
//           return filterKeys.every(category => {
//             const filterValues = allFilters[category];
//             if (category === 'time') {
//               return filterValues.includes(recipe.time);
//             } else if (category === 'category') {
//               return filterValues.includes(recipe.category);
//             } else if (category === 'cuisine') {
//               return filterValues.includes(recipe.cuisine);
//             } else if (category === 'difficulty') {
//               return filterValues.includes(recipe.difficulty);
//             } else if (category === 'seasonality') {
//               return filterValues.includes(recipe.seasonality);
//             } else if (category === 'specialDiet') {
//               return filterValues.some(value => recipe.specialDiet.includes(value));
//             }
//           });
//         });
//       }
//     }

//     res.json({ recipes });
//   } catch (err) {
//     const error = new HttpError("Something went wrong, could not find recipes.", 500);
//     return next(error);
//   }
// };


exports.searchRecipes = async (req, res, next) => {
  const { searchWords, allFilters } = req.body;

  try {
    let recipes = [];

    if (searchWords.length > 0) {
      const keywordsQuery = searchWords.map(word => ({ name: { $regex: new RegExp(word, "i") } }));
      recipes = await Recipe.find({ $or: keywordsQuery, ...allFilters });
    } else {
      recipes = await Recipe.find(allFilters);
    }

    res.json({ recipes });
  } catch (err) {
    const error = new HttpError("Something went wrong, could not find recipes.", 500);
    return next(error);
  }
};
