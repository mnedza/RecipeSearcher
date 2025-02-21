import React, { useState, useContext } from "react";
import { AuthContext } from "../../../shared/context/auth-context";
import { useHistory } from "react-router-dom";

import ImageUpload from "../../../shared/components/ImageUpload/ImageUpload";

import styles from "./AdminNewRecipe.module.css";

const AdminNewRecipe = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    ingredients: [],
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
    const newValue =
      name === "ingredients"
        ? value.split(",").map((item) => item.trim())
        : value;

    setNewRecipe({ ...newRecipe, [name]: newValue });
  };


  const handleImageInputChange = (id, file, isValid) => {
    if (isValid) {

      setNewRecipe((prevRecipe) => ({
        ...prevRecipe,
        image: file,
      }));
    } else {
      console.error("Invalid file selected");
      setNewRecipe((prevRecipe) => ({
        ...prevRecipe,
        image: null,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", newRecipe.name);
      formData.append("ingredients", newRecipe.ingredients.join(","));
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
        `${apiUrl}/admin/recipes/add-recipe`,
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
    <div className={styles.contentContainer}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h2>Add New Recipe</h2>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="name">
            Name:
          </label>
          <input
            className={styles.inputField}
            type="text"
            id="name"
            name="name"
            value={newRecipe.name}
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
            value={
              Array.isArray(newRecipe.ingredients)
                ? newRecipe.ingredients.join(", ")
                : newRecipe.ingredients
            }
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
            value={newRecipe.instructions}
            onChange={handleInputChange}
          />
        </div>

        <ImageUpload
          id="image"
          mode="add"
          onInput={(file, isValid) =>
            handleImageInputChange("image", file, isValid)
          }
          image={newRecipe.image}
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
            value={newRecipe.time}
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
            value={newRecipe.category}
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
            value={newRecipe.cuisine}
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
            value={newRecipe.difficulty}
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
            value={newRecipe.seasonality}
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
            value={newRecipe.specialDiet}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className={styles.button}>
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AdminNewRecipe;
