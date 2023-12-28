import React, { useState, useContext } from "react";
import { AuthContext } from "../../../shared/context/auth-context";
import { useLocation, useHistory } from "react-router-dom";

const AdminEditRecipe = () => {
  const location = useLocation();
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [editedRecipe, setEditedRecipe] = useState(location.state.recipeData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRecipe({ ...editedRecipe, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/admin/recipes/edit-recipe/${editedRecipe._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          },
          body: JSON.stringify({
            name: editedRecipe.name,
            ingredients: editedRecipe.ingredients,
            instructions: editedRecipe.instructions,
          }),
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
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default AdminEditRecipe;
