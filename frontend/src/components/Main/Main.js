import React from "react";
import styles from "./Main.module.css";
import RecipeList from "./RecipeList";
import Filters from "../Filters/Filters";
import Search from "../Search/Search";

function Main(props) {
  return (
    <section className={styles.main}>
      <Search />
      <main className={`${styles["main-content"]} wrapper`}>
        <Filters filters={props.filters} />
        <RecipeList recipes={props.recipes} />
      </main>
    </section>
  );
}

export default Main;
