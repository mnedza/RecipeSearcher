import React, { useState, useContext } from "react";
import { AuthContext } from "../../../shared/context/auth-context";
import { useHistory } from "react-router-dom";

const AdminNewRecipe = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    image: "",
    time: 0,
    category: "",
    cuisine: "",
    difficulty: "",
    seasonality: "",
    specialDiet: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe({ ...newRecipe, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/admin/recipes/add-recipe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          },
          body: JSON.stringify({
            name: newRecipe.name,
            ingredients: newRecipe.ingredients,
            instructions: newRecipe.instructions,
            image: newRecipe.image,
            time: newRecipe.time,
            category: newRecipe.category,
            cuisine: newRecipe.cuisine,
            difficulty: newRecipe.difficulty,
            seasonality: newRecipe.seasonality,
            specialDiet: newRecipe.specialDiet,
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to add new recipe.");
      }

      history.push("/admin/recipes");
    } catch (error) {
      console.error("Error adding new recipe:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={newRecipe.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="ingredients">Ingredients:</label>
        <input
          type="text"
          id="ingredients"
          name="ingredients"
          value={newRecipe.ingredients}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="instructions">Instructions:</label>
        <textarea
          id="instructions"
          name="instructions"
          value={newRecipe.instructions}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="image">Image URL:</label>
        <input
          type="text"
          id="image"
          name="image"
          value={newRecipe.image}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="time">Time</label>
        <input
          type="number"
          id="time"
          name="time"
          value={newRecipe.time}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={newRecipe.category}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="cuisine">Cuisine:</label>
        <input
          type="text"
          id="cuisine"
          name="cuisine"
          value={newRecipe.cuisine}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="difficulty">Difficulty</label>
        <input
          type="text"
          id="difficulty"
          name="difficulty"
          value={newRecipe.difficulty}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="seasonality">Seasonality</label>
        <input
          type="text"
          id="seasonality"
          name="seasonality"
          value={newRecipe.seasonality}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="specialDiet">SpecialDiet</label>
        <input
          type="text"
          id="specialDiet"
          name="specialDiet"
          value={newRecipe.specialDiet}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default AdminNewRecipe;
