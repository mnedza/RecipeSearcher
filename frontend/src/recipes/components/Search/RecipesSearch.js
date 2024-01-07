import React, { useState } from "react";
import FiltersPanel from "./FiltersPanel";
import styles from "./RecipesSearch.module.css";
import classes from "./SearchPanel.module.css";
import Filters from "./AddFilters/Filters";

const initialFilters = {
  time: [],
  category: [],
  cuisine: [],
  difficulty: [],
  seasonality: [],
  specialDiet: [],
};

const searchHandler = (allFilters, searchWords) => {
  console.log("All filters:", allFilters);
  console.log("Search Words:", searchWords);
};

const RecipeSearch = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  const [searchValue, setSearchValue] = useState("");

  const closeFiltersHandler = () => {
    setFiltersOpen(false);
  };

  const openFiltersHandler = () => {
    setFiltersOpen(true);
  };

  const sendFiltersToParent = (updatedFilters) => {
    setFilters(updatedFilters);
  };

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClick = () => {
    const searchWords = searchValue.split(" ");
    const allFilters = Object.entries(filters).reduce(
      (acc, [categoryName, categoryFilters]) => {
        const values = categoryFilters.map((filter) => filter.value);
        return [...acc, ...values];
      },
      []
    );
    searchHandler(allFilters, searchWords);
  };

  const handleVoiceButtonClick = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      setSearchValue(voiceText); 
    };
    recognition.start();
  };

  return (
    <>
      <Filters
        filtersOpen={filtersOpen}
        closeFiltersHandler={closeFiltersHandler}
        sendFilters={sendFiltersToParent}
      />

      <section className={`${styles.container} section`}>
        <div className={`${classes.content} wrapper`}>
          <h1 className={classes.title}>Search for a recipe</h1>
          <input
            className={classes.input}
            placeholder="Search"
            value={searchValue}
            onChange={handleSearchInputChange}
          />

          <div className={classes.buttons}>
            <button className={classes.button} onClick={openFiltersHandler}>
              Add Filters
            </button>
            <button className={classes.button} onClick={handleVoiceButtonClick}>
              Voice
            </button>
            <button
              className={`${classes.button} ${classes["search-btn"]}`}
              onClick={handleSearchClick}
            >
              Search
            </button>
          </div>

          {Object.entries(filters).map(([categoryName, categoryFilters]) => (
            <FiltersPanel
              key={categoryName}
              categoryName={categoryName}
              filters={categoryFilters}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default RecipeSearch;
