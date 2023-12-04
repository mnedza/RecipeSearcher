import React from "react";

import Recipe from "./Recipe";

import styles from "./RecipesToShow.module.css";

const RecipesToShow = (props) => {
  return (
    <>
      <section className={"section"}>
        <main className={`${styles["main-content"]} wrapper`}>
          <h2 className={styles["title"]}>Recipes({props.recipes.length})</h2>
          <div className={styles["recipes-list-container"]}>
            {props.recipes.map((recipe) => (
              <Recipe
                key={recipe.id}
                name={recipe.name}
                ingredients={recipe.ingredients}
                instructions={recipe.instructions}
                url={recipe.url}
              />
            ))}
          </div>
        </main>
      </section>
    </>
  );
};

export default RecipesToShow;
