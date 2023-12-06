import React from "react";

import styles from "./RecipeContentToShow.module.css";

const RecipeContentToShow = ({ loadedRecipe }) => {
  const { id, name, instructions, ingredients } = loadedRecipe;
  return (
    <>
      <div>
        <h1 className={styles.title}>Recipe Details page !!!</h1>
        <p>ID --- {id}</p>
        <p>Name --- {name}</p>
        <p>ingredients --- {ingredients}</p>
        <p>Instructions --- {instructions}</p>
      </div>
    </>
  );
};

export default RecipeContentToShow;
