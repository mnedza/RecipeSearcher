import React, { useState } from "react";
import classes from "./AddFilters.module.css";
import FilterSection from "./FilterSection";

const filterData = [
  {
    title: "Difficulty",
    items: ["Easy", "Intermediate", "Hard"],
  },
  {
    title: "Time",
    items: [
      "15 minutes",
      "15 - 30 minutes",
      "45 minutes",
      "More than 45 minutes",
    ],
  },
  {
    title: "Dietary",
    items: [
      "Vegan",
      "Vegetarian",
      "Low-Carb",
      "Meatless",
      "Gluten-free",
      "Sugar-free",
    ],
  },
  {
    title: "Cuisine",
    items: [
      "Polish",
      "American",
      "Italian",
      "Chinese",
      "Indian",
      "Mexican",
      "Japanese",
      "Greek",
      "Thai",
    ],
  },
  {
    title: "Vegetables",
    items: [
      "Radish",
      "Tomato",
      "potato",
      "Garlic",
      "bell",
      "pepper",
      "corn",
      "onion",
      "peas",
      "lettuce",
      "beet",
      "carrot",
      "cucumber",
      "pumpkin",
      "paprika",
      "cabbage",
    ],
  },
  {
    title: "Fruits",
    items: [
      "pear",
      "apple",
      "banana",
      "kiwi",
      "lime",
      "orange",
      "nectarine",
      "watermelon",
      "mango",
      "lemon",
    ],
  },
  {
    title: "Meats",
    items: [
      "Chicken",
      "Beef",
      "Pork",
      "Lamb",
      "Turkey",
      "Duck",
      "Veal",
      "Rabbit",
    ],
  },
  {
    title: "Fish and Seafood",
    items: ["Salmon", "Tuna", "Shrimp", "Cod", "Crab", "Lobster", "Mussels"],
  },
  {
    title: "Berries",
    items: [
      "Strawberries",
      "Blueberries",
      "Raspberries",
      "Blackberries",
      "Cranberries",
      "Gooseberries",
      "Marionberries",
    ],
  },
];


const AddFilters = (props) => {
  const handleClose = () => {
    props.toggleAddFiltersVisibility();
  };

  const [isReseted, setIsReseted] = useState(false);

  const resetFilteredData = () => {
    setIsReseted(!isReseted);
  };

  const handleFiltersChange = (filtersFromSingleSection) => {
    const updatedFilters = [...props.filters];
    filtersFromSingleSection.forEach((filter) => {
      if (!updatedFilters.includes(filter)) {
        updatedFilters.push(filter);
      }
    });

    props.setFilters(updatedFilters);
    console.log(updatedFilters);
    console.log(props.filters);
  };

  return (
    <div
      className={`${classes["add-filters"]} ${
        props.isAddFiltersVisible && classes["show-filters"]
      }`}
    >
      <div className={classes["add-filters-content"]}>
        <header className={classes.header}>
          <h2 className={classes.title}>Search</h2>
          <button className={classes["close-button"]} onClick={handleClose}>
            &times;
          </button>
        </header>

        <section className={classes.section}>
          <h3 className={classes["section-title"]}>Search Filters:</h3>

          <div className={classes.options}>
            <div className={classes.select}>
              <input
                className={classes.input}
                type="text"
                placeholder="search"
              ></input>
            </div>
            <button
              className={classes["reset-button"]}
              onClick={resetFilteredData}
            >
              Reset
            </button>
          </div>
        </section>

        {filterData.map((filterSection) => (
          <FilterSection
            key={filterSection.title}
            title={filterSection.title}
            items={filterSection.items}
            isReseted={isReseted}
            // filters={props.filters}
            // setFilters={props.setFilters}
            // onFiltersChange={handleFilters}
            onFiltersChange={handleFiltersChange}
          />
        ))}
      </div>
    </div>
  );
};

export default AddFilters;
