import React from "react";
import styles from "./Search.module.css";

const Search = () => {
  const toggleAddFiltersVisibility = () => {
    console.log('toggleAddFiltersVisibility');
  };

  return (
    <>
      <section className={`${styles.container} section`}>
        <div className={`${styles["search-content"]} wrapper`}>
          <h1 className={styles.title}>Search for a recipe</h1>
          <input className={styles.input} placeholder="Search" />

          <button
            className={styles.button}
            onClick={toggleAddFiltersVisibility}
          >
            Add Filters
          </button>
        </div>
      </section>
      <h1>No filters found!</h1>
    </>
  );
};

export default Search;
