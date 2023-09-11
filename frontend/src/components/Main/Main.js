import React from "react";
import styles from "./Main.module.css";
import RecipeList from "./RecipeList";
import Filters from "../Filters/Filters";

function Main(props) {
  return (
    <section className={styles.main}>
      <div className={`${styles["main-content"]} wrapper`}>
        <Filters />
        <RecipeList recipes={props.recipes}/>
      </div>
    </section>
  );
}

export default Main;
