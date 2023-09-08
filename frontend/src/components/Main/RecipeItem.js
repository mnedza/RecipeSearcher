import React from "react";
import styles from "./RecipeItem.module.css";

function RecipeItem() {
  return (
    <div className={styles.recipe}>
      <h3 className={styles.recipeName}>Recipe Name</h3>
      <img className={styles.img} src="img-url" alt="recipe name" />
      <p>Ingredients:</p>
      <ul>
        <li>ingredient 1</li>
        <li>ingredient 2</li>
        <li>ingredient 3</li>
      </ul>
    </div>
  );
}

export default RecipeItem;
