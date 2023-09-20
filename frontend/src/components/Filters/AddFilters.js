import React from "react";
import classes from "./AddFilters.module.css";

const AddFilters = (props) => {
  const handleSomething = () => {
    props.toggleAddFiltersVisibility();
  };

  return (
    <div
      className={`${classes["add-filters"]} ${
        props.isAddFiltersVisible && classes["show-filters"]
      }`}
    >
      <div className={classes["add-filters-content"]}>
        <header className={classes.header}>
          <h2 className={classes.title}>Filters</h2>
          <button className={classes["close-button"]} onClick={handleSomething}>
            &times;
          </button>
        </header>

        <section className={classes.section}>
          <h3 className={classes["section-title"]}>Search Filters:</h3>

          <div className={classes.options}>

            <div className={classes.select}>
              <label htmlFor="filter-select">Dietary</label>
              <input type="text"></input>
            </div>

            <button className={classes["reset-button"]}>Reset</button>
          </div>
        </section>

        <section className={classes.section}>
          <h3 className={classes["section-title"]}>Difficulty</h3>
        </section>

        <section className={classes.section}>
          <h3 className={classes["section-title"]}>Time</h3>
        </section>

        <section className={classes.section}>
          <h3 className={classes["section-title"]}>Dietary</h3>
        </section>

        <section className={classes.section}>
          <h3 className={classes["section-title"]}>Cuisine</h3>
        </section>

        <section className={classes.section}>
          <h3 className={classes["section-title"]}>Difficulty</h3>
        </section>

        <section className={classes.section}>
          <h3 className={classes["section-title"]}>Difficulty</h3>
        </section>

        <section className={classes.section}>
          <h3 className={classes["section-title"]}>Difficulty</h3>
        </section>

        <section className={classes.section}>
          <h3 className={classes["section-title"]}>Difficulty</h3>
        </section>
      </div>
    </div>
  );
};

export default AddFilters;
