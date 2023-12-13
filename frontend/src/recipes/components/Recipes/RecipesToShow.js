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
                key={recipe._id}
                _id={recipe._id}
                path={props.path}
                name={recipe.name}
                ingredients={recipe.ingredients}
                instructions={recipe.instructions}
                image={recipe.image}
              />
            ))}
          </div>
        </main>
      </section>
    </>
  );
};

export default RecipesToShow;
