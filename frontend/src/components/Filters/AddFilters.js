import React, { useState, useEffect } from "react";
import classes from "./AddFilters.module.css";

const AddFilters = (props) => {
  const handleSomething = (params) => {
    console.log(props.isAddFiltersVisible);
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
      </div>
    </div>
  );
};

export default AddFilters;
