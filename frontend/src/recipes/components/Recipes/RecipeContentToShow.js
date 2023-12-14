import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../shared/context/auth-context";

import styles from "./RecipeContentToShow.module.css";

const RecipeContentToShow = ({ loadedRecipe }) => {
  const { _id, name, instructions, ingredients } = loadedRecipe;
  const auth = useContext(AuthContext);
  const userId = auth.userId;

  const [favRecipes, setFavRecipes] = useState([]);
  const [isInFavorites, setIsInFavorites] = useState(false);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/favorites/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const responseData = await response.json();
        setFavRecipes(responseData.favorites);
        const isRecipeInFavorites = responseData.favorites.some(
          (recipe) => recipe._id === _id
        );
        setIsInFavorites(isRecipeInFavorites);
      } catch (error) {
        console.error("Error fetching recipes:", error.message);
      }
    };

    fetchFavoriteRecipes();
  }, [userId, _id]);

  const changeStatusHandler = async (event) => {
    event.preventDefault();

    try {
      let response;
      if (isInFavorites) {
        response = await fetch(
          `http://localhost:5000/favorites/${userId}/${_id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        response = await fetch(
          `http://localhost:5000/favorites/${userId}/${_id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ recipeId: _id }),
          }
        );
      }

      if (!response.ok) {
        throw new Error(
          `Failed to ${isInFavorites ? "remove" : "add"} recipe to favorites`
        );
      }

      setIsInFavorites((prevState) => !prevState);
    } catch (error) {
      console.error("Error updating favorites:", error.message);
    }
  };

  return (
    <>
      <div>
        <h1 className={styles.title}>Recipe Details page !!!</h1>

        {auth.isSignedIn && (
          <form onSubmit={changeStatusHandler}>
            <button type="submit">
              {!isInFavorites ? "Add to favorites" : "Remove from favorites"}
            </button>
          </form>
        )}

        <p>Recipe Id --- {_id}</p>
        <p>Name --- {name}</p>
        <p>Ingredients --- {ingredients}</p>
        <p>Instructions --- {instructions}</p>
      </div>
    </>
  );
};

export default RecipeContentToShow;
