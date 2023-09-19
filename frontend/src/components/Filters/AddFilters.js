import React from "react";
import classes from "./AddFilters.module.css";

const AddFilters = () => {
  return (
    <div className={classes["add-filters"]}>
      <div className={classes["add-filters-content"]}>
        <header className={classes.header}>
            Filters
            <button className={classes["close-button"]}> &times;</button>
            </header>
      </div>
    </div>
  );
};

export default AddFilters;

