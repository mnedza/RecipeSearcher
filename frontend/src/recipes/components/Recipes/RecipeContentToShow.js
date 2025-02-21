import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../shared/context/auth-context";
import styles from "./RecipeContentToShow.module.css";
import { Link, useHistory } from "react-router-dom";
import Modal from "../../../shared/components/UIElements/Modal";

const apiUrl = process.env.REACT_APP_API_URL;

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
          `${apiUrl}/favorites/${userId}`,
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
        `${apiUrl}/favorites/${userId}/${_id}`,
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
        `${apiUrl}/admin/recipes/${_id}`,
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
    <div className={styles.recipeContent}>
      <div className={`${styles.recipeActions} ${styles.recipeDetailsCard}`}>
        <h1 className={styles.title}>{name}</h1>
        {auth.isSignedIn && isAdmin && (
          <p className={styles.recipeId}>Recipe Id: {_id}</p>
        )}
        {auth.isSignedIn && (
          <div className={styles.options}>
            <form onSubmit={changeStatusHandler}>
              <button type="submit" className={styles.button}>
                {!isInFavorites ? "Add to favorites" : "Remove from favorites"}
              </button>
            </form>
            {isAdmin && (
              <Link
                className={styles.button}
                to={{
                  pathname: `/admin/edit-recipe/${_id}`,
                  state: { recipeData: loadedRecipe },
                }}
              >
                Edit Recipe
              </Link>
            )}
            {isAdmin && (
              <button onClick={showModalHandler} className={styles.button}>
                Remove Recipe
              </button>
            )}
          </div>
        )}
      </div>

      <div className={styles.recipeDetails}>
        <div
          className={`${styles.recipeDetailsCard} ${styles.recipeDetailsCardImage}`}
        >
          <img src={`${apiUrl}/${image}`} alt={name} />
        </div>
        <div
          className={`${styles.recipeDetailsCard} ${styles.recipeDetailsCardContent} `}
        >
          <h3 className={styles.h3}>General:</h3>
          <p>Time: {time} minutes</p>
          <p>Category: {category}</p>
          <p>Cuisine: {cuisine}</p>
          <p>Difficulty: {difficulty}</p>
          <p>Seasonality: {seasonality}</p>
          <p>Special Diet: {specialDiet}</p>
        </div>
        <div
          className={`${styles.recipeDetailsCard} ${styles.recipeDetailsCardContent}`}
        >
          <h3 className={styles.h3}>Ingredients:</h3>
          <ul>
            {ingredients &&
              ingredients.map((ingredient, index) => (
                <li key={index} className={styles.ingredient} >{ingredient}</li>
              ))}
          </ul>
        </div>

        <div
          className={`${styles.recipeDetailsCard} ${styles.recipeDetailsCardContent}`}
        >
          <h3 className={styles.h3}>Instructions:</h3>
          <p>{instructions}</p>
        </div>
      </div>

      {isDeleting && (
        <Modal
          message="Are you sure you want to delete this recipe?"
          onClear={closeModalHandler}
          onConfirm={deletingRecipeHandler}
        />
      )}
    </div>
  );
};

export default RecipeContentToShow;
