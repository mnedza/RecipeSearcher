import React from "react";
import styles from "./Filters.module.css";
import FiltersList from "./FiltersList";

const Filters = (props) => {
  return (
    <section className={styles.filters}>
      <h2 className={styles.title}>Filters:</h2>
      <FiltersList filters={props.filters} setFilters={props.setFilters} />
    </section>
  );
};

export default Filters;
