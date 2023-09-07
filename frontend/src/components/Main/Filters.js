import React from "react";
import styles from "./Filters.module.css";

const Filters = () => {
  return (
    <div className={styles.filters}>
      <h2 className={styles.title}>Filters:</h2>
      <ul className={`${styles.list} wrapper`}>
        <li>Eggs</li>
        <li>Vege</li>
        <li>Apples</li>
        <li>Bananas</li>
        <li>Cheese</li>
        <li>Carrots</li>
        <li>Tomatoes</li>
        <li>Potatoes</li>
        <li>Onions</li>
        <li>Broccoli</li>
        <li>Spinach</li>
        <li>Milk</li>
        <li>Oranges</li>
        <li>Grapes</li>
        <li>Strawberries</li>
        <li>Chicken</li>
        <li>Salmon</li>
        <li>Beef</li>
      </ul>
    </div>
  );
};

export default Filters;
