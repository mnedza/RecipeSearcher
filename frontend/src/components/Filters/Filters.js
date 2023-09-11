// import React, { useState } from "react";
import styles from "./Filters.module.css";
import FiltersList from "./FiltersList";

const Filters = () => {
  // const [initialFilters, setInitialFilters] = useState([
  //   "Eggs",
  //   "Vege",
  //   "Apples",
  //   "Bananas",
  //   "Cheese",
  //   "Carrots",
  //   "Tomatoes",
  //   "Potatoes",
  //   "Onions",
  //   "Broccoli",
  //   "Spinach",
  //   "Milk",
  //   "Oranges",
  //   "Grapes",
  //   "Strawberries",
  //   "Chicken",
  //   "Salmon",
  // ]);

  const initialFilters = [
    "Eggs",
    "Vege",
    // "Apples",
    // "Bananas",
    // "Cheese",
    // "Carrots",
    // "Tomatoes",
    // "Potatoes",
    // "Onions",
    // "Broccoli",
    // "Spinach",
    // "Milk",
    // "Oranges",
    // "Grapes",
    // "Strawberries",
    // "Chicken",
    // "Salmon",
  ];

  return (
    <section className={styles.filters}>
      <h2 className={styles.title}>Filters:</h2>
      <FiltersList filtersArray={initialFilters} />
    </section>
  );
};

export default Filters;
