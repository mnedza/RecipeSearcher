import React from "react";
import styles from "./Main.module.css";
import Filters from "./Filters";
import RecipeList from "./RecipeList";

function Main() {
  return (
    <section className={styles.main}>
      <div className={`${styles['main-content']} wrapper`}>
        <Filters />
        <RecipeList />
      </div>
    </section>
  );
}

export default Main;
