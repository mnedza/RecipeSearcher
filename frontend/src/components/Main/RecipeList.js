import React from "react";
import RecipeItem from "./RecipeItem";
import styles from "./RecipeList.module.css";

function RecipeList() {
  return (
    <section>
      <h2 className={styles['title']}>Recipes:</h2>
      <div className={styles["recipes-list-container"]}>
        <RecipeItem />
        <RecipeItem />
        <RecipeItem />
        <RecipeItem />
        <RecipeItem />
      </div>
    </section>
  );
}

export default RecipeList;
