const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  name: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  instructions: { type: String, required: true },
  image: { type: String, required: true },
  users: [{ type: Schema.Types.ObjectId, ref: "User" }], 
});

module.exports = mongoose.model("Recipe", recipeSchema);
