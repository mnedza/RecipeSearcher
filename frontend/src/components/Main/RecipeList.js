import React from "react";
import RecipeItem from "./RecipeItem";
import styles from "./RecipeList.module.css";

function RecipeList(props) {
  return (
    <section>
      <h2 className={styles["title"]}>Recipes: ({props.recipes.length})</h2>
      <div className={styles["recipes-list-container"]}>

        {props.recipes.map((recipe) => (
          <RecipeItem 
            key={recipe.id}
            name={recipe.name}
            instructions={recipe.instructions}
            url={recipe.url}
          />
        ))}
      </div>
    </section>
  );
}

export default RecipeList;
