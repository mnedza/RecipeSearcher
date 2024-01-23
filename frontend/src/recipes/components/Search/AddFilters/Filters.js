import React, { useState } from "react";
import Backdrop from "../../../../shared/components/UIElements/Backdrop";
import styles from "./Filters.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";

const Filters = ({
  filtersOpen,
  closeFiltersHandler,
  sendFilters,
  isSpeaking,
}) => {

  const initialFilters = {
    time: [
      { filterId: "id1", value: 10 },
      { filterId: "id2", value: 20 },
      { filterId: "id3", value: 30 },
      { filterId: "id4", value: 40 },
      { filterId: "id5", value: 50 },
      { filterId: "id6", value: 60 },
      { filterId: "id7", value: 90 },
      { filterId: "id8", value: 120 },
      { filterId: "id9", value: 150 },
      { filterId: "id10", value: 180 },
    ],
    category: [
      { filterId: "id11", value: "Breakfast" },
      { filterId: "id12", value: "Lunch" },
      { filterId: "id13", value: "Dinner" },
      { filterId: "id14", value: "Snack" },
      { filterId: "id15", value: "Dessert" },
    ],
    cuisine: [
      { filterId: "id16", value: "Italian" },
      { filterId: "id17", value: "French" },
      { filterId: "id18", value: "Polish" },
      { filterId: "id19", value: "Indian" },
      { filterId: "id20", value: "Mexican" },
      { filterId: "id21", value: "Asian" },
    ],
    difficulty: [
      { filterId: "id22", value: "Easy" },
      { filterId: "id23", value: "Medium" },
      { filterId: "id24", value: "Hard" },
    ],
    seasonality: [
      { filterId: "id25", value: "Summer" },
      { filterId: "id26", value: "Autumn" },
      { filterId: "id27", value: "Winter" },
      { filterId: "id28", value: "Spring" },
      { filterId: "id29", value: "Holiday" },
      { filterId: "id30", value: "Summer Desserts" },
      { filterId: "id31", value: "Winter Dishes" },
      { filterId: "id32", value: "All Seasons" },
    ],
    specialDiet: [
      { filterId: "id33", value: "Keto" },
      { filterId: "id34", value: "Gluten-Free" },
      { filterId: "id35", value: "Lactose-Free" },
      { filterId: "id36", value: "Low-Carb" },
      { filterId: "id37", value: "Vegan" },
      { filterId: "id38", value: "Vegetarian" },
      { filterId: "id39", value: "None" },
      
    ],
  };

  const [selectedFilters, setSelectedFilters] = useState({
    time: [],
    category: [],
    cuisine: [],
    difficulty: [],
    seasonality: [],
    specialDiet: [],
  });

  const handleFilterChange = (categoryName, filterValue) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      const index = updatedFilters[categoryName].findIndex(
        (filter) => filter.value === filterValue
      );

      if (index === -1) {
        updatedFilters[categoryName] = [
          ...updatedFilters[categoryName],
          { filterId: `id${Date.now()}`, value: filterValue },
        ];
      } else {
        updatedFilters[categoryName] = updatedFilters[categoryName].filter(
          (filter) => filter.value !== filterValue
        );
      }
      sendFilters(updatedFilters);
      return updatedFilters;
    });
  };

  return (
    <>
      {filtersOpen && <Backdrop onClick={closeFiltersHandler} />}
      {filtersOpen && (
        <div className={styles.content}>
          <h1 className={styles.h1}>Add Filters</h1>

          <FontAwesomeIcon
            icon={faX}
            onClick={closeFiltersHandler}
            className={styles["close-btn"]}
          />
          {Object.entries(initialFilters).map(
            ([categoryName, categoryFilters]) => (
              <div key={categoryName} className={styles.category}>
                <h2 className={styles["category-name"]}>
                  {categoryName === "time"
                    ? "time (minutes)"
                    : categoryName === "specialDiet"
                    ? "Special Diet"
                    : categoryName}
                </h2>

                <div className={styles["filters-container"]}>
                  {categoryFilters.map((filter) => (
                    <button
                      key={filter.filterId}
                      className={
                        selectedFilters[categoryName].find(
                          (selectedFilter) =>
                            selectedFilter.value === filter.value
                        )
                          ? styles.selectedFilter
                          : styles.filterButton
                      }
                      onClick={() =>
                        handleFilterChange(categoryName, filter.value)
                      }
                    >
                      {filter.value}
                    </button>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      )}
      {isSpeaking && <Backdrop />}
      {isSpeaking && (
        <div className={styles["microphone-content"]}>
          <FontAwesomeIcon
            icon={faMicrophone}
            onClick={closeFiltersHandler}
            className={`${styles["microphone"]} ${styles["microphone-speaking"]}`}
          />
        </div>
      )}
    </>
  );
};

export default Filters;
