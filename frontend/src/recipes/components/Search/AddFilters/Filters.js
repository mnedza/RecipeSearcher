import React, { useState } from "react";
import Backdrop from "../../../../shared/components/UIElements/Backdrop";
import styles from "./Filters.module.css";

const Filters = ({ filtersOpen, closeFiltersHandler, sendFilters }) => {
  const initialFilters = {
    time: [
      { filterId: "id1", value: 10 },
      { filterId: "id2", value: 20 },
      { filterId: "id3", value: 30 },
    ],
    category: [
      { filterId: "id4", value: "Breakfast" },
      // ... pozostałe wartości
    ],
    cuisine: [
      { filterId: "id7", value: "Italian" },
      // ... pozostałe wartości
    ],
    difficulty: [
      { filterId: "id10", value: "Easy" },
      // ... pozostałe wartości
    ],
    seasonality: [
      { filterId: "id13", value: "Summer" },
      // ... pozostałe wartości
    ],
    specialDiet: [
      { filterId: "id17", value: "Keto" },
      // ... pozostałe wartości
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
          <h1>Add Filters</h1>
          {Object.entries(initialFilters).map(
            ([categoryName, categoryFilters]) => (
              <div key={categoryName}>
                <h2>{categoryName}</h2>
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
            )
          )}
        </div>
      )}
    </>
  );
};

export default Filters;
