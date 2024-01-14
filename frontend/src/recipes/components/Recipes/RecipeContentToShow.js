import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../shared/context/auth-context";
import styles from "./RecipeContentToShow.module.css";
import { Link, useHistory } from "react-router-dom";
import Modal from "../../../shared/components/UIElements/Modal";

const RecipeContentToShow = ({ loadedRecipe }) => {
  const {
    _id,
    name,
    ingredients,
    instructions,
    image,
    time,
    category,
    cuisine,
    difficulty,
    seasonality,
    specialDiet,
  } = loadedRecipe;
  const auth = useContext(AuthContext);
  const userId = auth.userId;
  const isAdmin = auth.isAdmin;
  const history = useHistory();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isInFavorites, setIsInFavorites] = useState(false);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/favorites/${userId}`,
          {
            headers: {
              Authorization: "Bearer " + auth.token,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const responseData = await response.json();
        const isRecipeInFavorites = responseData.favorites.some(
          (recipe) => recipe._id === _id
        );
        setIsInFavorites(isRecipeInFavorites);
      } catch (error) {
        console.error("Error fetching recipes:", error.message);
      }
    };

    fetchFavoriteRecipes();
  }, [userId, _id, auth.token]);

  const showModalHandler = () => {
    setIsDeleting(true);
  };

  const closeModalHandler = () => {
    setIsDeleting(false);
  };

  const changeStatusHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/favorites/${userId}/${_id}`,
        {
          method: isInFavorites ? "DELETE" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          },
          body: JSON.stringify({ recipeId: _id }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to ${isInFavorites ? "remove from" : "add to"} favorites.`
        );
      }

      setIsInFavorites((prevState) => !prevState);
    } catch (error) {
      console.error("Error updating favorites:", error.message);
    }
  };

  const deletingRecipeHandler = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/admin/recipes/${_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete recipe.");
      }

      console.log("Recipe deleted successfully");
      setIsDeleting(false);
      history.push("/");
    } catch (error) {
      console.error("Error deleting recipe:", error.message);
    }
  };

  return (
    <>
      <h1 className={styles.title}>Recipe Details Page</h1>

      {auth.isSignedIn && (
        <>
          <div>
            <form onSubmit={changeStatusHandler}>
              <button type="submit">
                {!isInFavorites ? "Add to favorites" : "Remove from favorites"}
              </button>
            </form>
            {isAdmin && (
              <Link
                to={{
                  pathname: `/admin/edit-recipe/${_id}`,
                  state: { recipeData: loadedRecipe },
                }}
              >
                Edit Recipe
              </Link>
            )}
            {isAdmin && (
              <button onClick={showModalHandler}>Remove Recipe</button>
            )}
          </div>
        </>
      )}

      {auth.isSignedIn && isAdmin && <p>Recipe Id: {_id}</p>}
      <p>Name: {name}</p>
      <p>Ingredients: {ingredients}</p>
      <p>Instructions: {instructions}</p>
      <img src={`http://localhost:5000/${image}`} alt={name} />
      <p>time: {time} minutes</p>
      <p>category: {category}</p>
      <p>cuisine: {cuisine}</p>
      <p>difficulty: {difficulty}</p>
      <p>seasonality: {seasonality}</p>
      <p>specialDiet: {specialDiet}</p>

      {isDeleting && (
        <Modal
          message="Are you sure you want to delete this recipe?"
          onClear={closeModalHandler}
          onConfirm={deletingRecipeHandler}
        />
      )}
    </>
  );
};

export default RecipeContentToShow;
