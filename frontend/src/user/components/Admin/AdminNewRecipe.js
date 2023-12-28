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
    image: "", // Dodane pole dla URL obrazka
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
      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default AdminNewRecipe;
