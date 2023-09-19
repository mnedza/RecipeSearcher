import React, { useState } from "react";
import classes from "./AddFilters.module.css";

const AddFilters = () => {
  const [visible, setVisible] = useState(false);

  const toggleFiltersVisibility = (e) => {
    e.preventDefault();

    console.log(visible);

    setVisible(!visible);
  };

  return (
    <div
      className={`${classes["add-filters"]} ${
        visible && classes["show-filters"]
      }`}
    >
      <div className={classes["add-filters-content"]}>
        <header className={classes.header}>
          <h2 className={classes.title}>Filters</h2>
          <button
            className={classes["close-button"]}
            onClick={toggleFiltersVisibility}
          >
            &times;
          </button>
        </header>
      </div>
    </div>
  );
};

export default AddFilters;
