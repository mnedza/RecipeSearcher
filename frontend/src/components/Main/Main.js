import React from "react";
import styles from "./Main.module.css";
import RecipeList from "./RecipeList";
import Filters from "../Filters/Filters";
import Search from "../Search/Search";

function Main(props) {
  const toggleAddFiltersVisibility = () => {
    props.toggleAddFiltersVisibility();
  };

  return (
    <section className={styles.main}>
      <Search toggleAddFiltersVisibility={toggleAddFiltersVisibility} />
      <main className={`${styles["main-content"]} wrapper`}>
        <Filters filters={props.filters} setFilters={props.setFilters} />
        <RecipeList recipes={props.recipes} />
      </main>
    </section>
  );
}

export default Main;
