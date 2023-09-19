import React from "react";
import styles from "./Search.module.css";

const Search = (props) => {
  return (
    <section className={styles.search}>
      <div className={`${styles["search-content"]} wrapper`}>
        <h1 className={styles.title}>Search for a recipe</h1>
        <input className={styles.input} placeholder="Search" />
        <button className={styles.button} onClick={props.toggleAddFiltersVisibility}>Add Filters</button>
      </div>
    </section>
  );
};

export default Search;
