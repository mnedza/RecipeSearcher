import React from "react";

import SearchPanel from "./SearchPanel";
import FiltersPanel from "./FiltersPanel";

import styles from "./RecipesSearch.module.css";

const INITIAL_FILTERS = [
  { filterId: "id1", value: "Cheese" },
  { filterId: "id2", value: "Ham" },
  { filterId: "id3", value: "Fish" },
  { filterId: "id4", value: "Chicken" },
  { filterId: "id5", value: "Vegetables" },
  { filterId: "id6", value: "Pasta" },
  { filterId: "id7", value: "Pizza" },
  { filterId: "id8", value: "Salad" },
  { filterId: "id9", value: "Soup" },
  { filterId: "id10", value: "Sushi" },
  { filterId: "id11", value: "Burger" },
  { filterId: "id12", value: "Taco" },
  { filterId: "id13", value: "Fruit" },
  { filterId: "id14", value: "Steak" },
  { filterId: "id15", value: "Cakes" },
];

const RecipeSearch = () => {
  return (
    <>
      <section className={`${styles.container} section`}>
        <SearchPanel />
        <FiltersPanel filters={INITIAL_FILTERS} />
      </section>
    </>
  );
};

export default RecipeSearch;
