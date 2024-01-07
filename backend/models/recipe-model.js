const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  name: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  instructions: { type: String, required: true },
  image: { type: String, required: true },
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  time: { type: Number, required: true },
  category: { type: String, require: true },
  cuisine: { type: String, required: true },
  difficulty: { type: String, required: true },
  seasonality: { type: String, required: true },
  specialDiet: [{ type: String, required: true }],
});

module.exports = mongoose.model("Recipe", recipeSchema);
