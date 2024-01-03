const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  name: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  instructions: { type: String, required: true },
  image: { type: String, required: true },
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  time: {
    type: String,
    enum: [
      "10minutes",
      "20minutes",
      "30minutes",
      "40minutes",
      "50minutes",
      "1h",
      "1,5h",
      "2h",
    ],
  },
  category: {
    type: String,
    enum: ["breakfast", "lunch", "dinner", "snack", "dessert"],
  },
  cuisine: {
    type: String,
    enum: ["italian", "french", "polish", "indian", "mexican", "asian"],
  },
  difficulty: { type: String, enum: ["easy", "medium", "hard"] },
  seasonality: {
    type: String,
    enum: [
      "summer",
      "autumn",
      "winter",
      "spring",
      "holiday",
      "summer desserts",
      "winter dishes",
    ],
  },
  specialDiet: {
    type: String,
    enum: [
      "keto",
      "gluten-free",
      "lactose-free",
      "low-carb",
      "vegan",
      "vegetarian",
    ],
  },
});

module.exports = mongoose.model("Recipe", recipeSchema);
