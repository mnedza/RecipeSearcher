import React, { useState, useContext } from "react";
import { AuthContext } from "../../../shared/context/auth-context";
import { useLocation, useHistory } from "react-router-dom";
import ImageUpload from "../../../shared/components/ImageUpload/ImageUpload";

import styles from "./AdminEditRecipe.module.css";

const AdminEditRecipe = () => {
  const location = useLocation();
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [editedRecipe, setEditedRecipe] = useState(location.state.recipeData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "ingredients") {
      const ingredientsArray = value
        .split(",")
        .map((ingredient) => ingredient.trim());
      setEditedRecipe({ ...editedRecipe, [name]: ingredientsArray });
    } else {
      setEditedRecipe({ ...editedRecipe, [name]: value });
    }
  };

  const handleImageInputChange = (id, file, isValid) => {
    setEditedRecipe({ ...editedRecipe, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", editedRecipe.name);
      const formattedIngredients = editedRecipe.ingredients.join(", ");
      formData.append("ingredients", formattedIngredients);
      formData.append("instructions", editedRecipe.instructions);
      formData.append("time", editedRecipe.time);
      formData.append("category", editedRecipe.category);
      formData.append("cuisine", editedRecipe.cuisine);
      formData.append("difficulty", editedRecipe.difficulty);
      formData.append("seasonality", editedRecipe.seasonality);
      formData.append("specialDiet", editedRecipe.specialDiet);

      if (editedRecipe.image instanceof File) {
        formData.append("image", editedRecipe.image);
      }
      console.log([...formData]);

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
    <div className={styles.contentContainer}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <h2>Edit Recipe</h2>
          <label className={styles.label} htmlFor="name">
            Name:
          </label>
          <input
            className={styles.inputField}
            type="text"
            id="name"
            name="name"
            value={editedRecipe.name}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="ingredients">
            Ingredients:
          </label>
          <textarea
            className={styles.textareaField}
            type="text"
            id="ingredients"
            name="ingredients"
            value={editedRecipe.ingredients.join(", ")}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="instructions">
            Instructions:
          </label>
          <textarea
            className={styles.textareaField}
            id="instructions"
            name="instructions"
            value={editedRecipe.instructions}
            onChange={handleInputChange}
          />
        </div>

        <ImageUpload
          mode="edit"
          onInput={(file, isValid) =>
            handleImageInputChange("image", file, isValid)
          }
          image={`http://localhost:5000/${editedRecipe.image}`}
        />
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="time">
            Time (minutes)
          </label>
          <input
            className={styles.inputField}
            type="number"
            id="time"
            name="time"
            value={editedRecipe.time}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="category">
            Category:
          </label>
          <input
            className={styles.inputField}
            type="text"
            id="category"
            name="category"
            value={editedRecipe.category}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="cuisine">
            Cuisine:
          </label>
          <input
            className={styles.inputField}
            type="text"
            id="cuisine"
            name="cuisine"
            value={editedRecipe.cuisine}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="difficulty">
            Difficulty
          </label>
          <input
            className={styles.inputField}
            type="text"
            id="difficulty"
            name="difficulty"
            value={editedRecipe.difficulty}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="seasonality">
            Seasonality
          </label>
          <input
            className={styles.inputField}
            type="text"
            id="seasonality"
            name="seasonality"
            value={editedRecipe.seasonality}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="specialDiet">
            SpecialDiet
          </label>
          <input
            className={styles.inputField}
            type="text"
            id="specialDiet"
            name="specialDiet"
            value={editedRecipe.specialDiet}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className={styles.button}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default AdminEditRecipe;
