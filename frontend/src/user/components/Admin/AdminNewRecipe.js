import React, { useState, useContext } from "react";
import { AuthContext } from "../../../shared/context/auth-context";
import { useHistory } from "react-router-dom";

import ImageUpload from "../../../shared/components/ImageUpload/ImageUpload";

const AdminNewRecipe = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    image: null,
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

  const handleImageInputChange = (id, file, isValid) => {
    setNewRecipe({ ...newRecipe, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", newRecipe.name);
      formData.append("ingredients", newRecipe.ingredients);
      formData.append("instructions", newRecipe.instructions);
      formData.append("time", newRecipe.time);
      formData.append("category", newRecipe.category);
      formData.append("cuisine", newRecipe.cuisine);
      formData.append("difficulty", newRecipe.difficulty);
      formData.append("seasonality", newRecipe.seasonality);
      formData.append("specialDiet", newRecipe.specialDiet);
      formData.append("image", newRecipe.image);

      console.log([...formData]);

      const response = await fetch(
        "http://localhost:5000/admin/recipes/add-recipe",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + auth.token,
          },
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
      <ImageUpload id="image" onInput={handleImageInputChange} />
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
