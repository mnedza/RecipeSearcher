import React from "react";

import classes from "./SearchPanel.module.css";

const SearchPanel = () => {
  return (
    <>
      <div className={`${classes.content} wrapper`}>
        <h1 className={classes.title}>Search for a recipe</h1>
        <input className={classes.input} placeholder="Search" />

        <div className={classes.buttons}>
          <button className={classes.button}>Add Filters</button>
          <button className={classes.button}>Voice</button>
          <button className={`${classes.button} ${classes["search-btn"]}`}>
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchPanel;
