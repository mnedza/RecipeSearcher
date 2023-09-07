import React from "react";
import styles from "./Search.module.css";

const Search = () => {
  return (
    <section className={styles.search}>
      <div className={`${styles['search-content']} wrapper`}>
        <h1 className={styles.title}>Search for a recipe</h1>
        <input className={styles.input} placeholder="Search"/>
      </div>
    </section>
  );
}

export default Search;
