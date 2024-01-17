import React, { useState, useContext } from "react";
import { AuthContext } from "../../../shared/context/auth-context";
import { useLocation, useHistory } from "react-router-dom";
import ImageUpload from "../../../shared/components/ImageUpload/ImageUpload";

const AdminEditRecipe = () => {
  const location = useLocation();
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [editedRecipe, setEditedRecipe] = useState(location.state.recipeData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRecipe({ ...editedRecipe, [name]: value });
  };

  const handleImageInputChange = (id, file, isValid) => {
    setEditedRecipe({ ...editedRecipe, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", editedRecipe.name);
      formData.append("ingredients", editedRecipe.ingredients);
      formData.append("instructions", editedRecipe.instructions);
      formData.append("time", editedRecipe.time);
      formData.append("category", editedRecipe.category);
      formData.append("cuisine", editedRecipe.cuisine);
      formData.append("difficulty", editedRecipe.difficulty);
      formData.append("seasonality", editedRecipe.seasonality);
      formData.append("specialDiet", editedRecipe.specialDiet);
      formData.append("image", editedRecipe.image);

      const response = await fetch(
        `http://localhost:5000/admin/recipes/edit-recipe/${editedRecipe._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + auth.token,
          },
          body: formData,
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || "Failed to update recipe.");
      }

      history.push(`/recipes/${editedRecipe._id}`);
    } catch (error) {
      console.error("Error updating recipe:", error.message);
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
          value={editedRecipe.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="ingredients">Ingredients:</label>
        <input
          type="text"
          id="ingredients"
          name="ingredients"
          value={editedRecipe.ingredients}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="instructions">Instructions:</label>
        <textarea
          id="instructions"
          name="instructions"
          value={editedRecipe.instructions}
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
          value={editedRecipe.time}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={editedRecipe.category}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="cuisine">Cuisine:</label>
        <input
          type="text"
          id="cuisine"
          name="cuisine"
          value={editedRecipe.cuisine}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="difficulty">Difficulty</label>
        <input
          type="text"
          id="difficulty"
          name="difficulty"
          value={editedRecipe.difficulty}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="seasonality">Seasonality</label>
        <input
          type="text"
          id="seasonality"
          name="seasonality"
          value={editedRecipe.seasonality}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="specialDiet">SpecialDiet</label>
        <input
          type="text"
          id="specialDiet"
          name="specialDiet"
          value={editedRecipe.specialDiet}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default AdminEditRecipe;
