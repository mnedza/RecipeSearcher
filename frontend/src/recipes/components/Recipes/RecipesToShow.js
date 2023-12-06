import React from "react";

import RecipeItem from "./RecipeItem";

import styles from "./RecipesToShow.module.css";

const RecipesToShow = (props) => {
  return (
    <>
      <section className={"section"}>
        <main className={`${styles["main-content"]} wrapper`}>
          <h2 className={styles["title"]}>Recipes({props.recipes.length})</h2>
          <div className={styles["recipes-list-container"]}>
            {props.recipes.map((recipe) => (
              <RecipeItem
                key={recipe.id}
                id={recipe.id}
                path={props.path}
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
