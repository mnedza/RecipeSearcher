import React from "react";
import classes from "./AddFilters.module.css";
import styles from "./Elements.module.css";

const AddFilters = (props) => {
  const handleSomething = () => {
    props.toggleAddFiltersVisibility();
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
          <button className={classes["close-button"]} onClick={handleSomething}>
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

            <button className={classes["reset-button"]}>Reset</button>
          </div>
        </section>

        <section className={classes.section}>
          <h3 className={classes["section-title"]}>Difficulty</h3>
          <ul className={styles.ul}>
            <li className={styles.li}>Easy</li>
            <li className={`${styles.li} ${styles["choosen"]}`}>
              Intermediate
            </li>
            <li className={styles.li}>Hard</li>
          </ul>
        </section>

        <section className={classes.section}>
          <h3 className={classes["section-title"]}>Time</h3>
          <ul className={styles.ul}>
            <li className={styles.li}>15 minutes</li>
            <li className={styles.li}>15 - 30 minutes</li>
            <li className={styles.li}>45 minutes</li>
            <li className={styles.li}>More than 45 minutes</li>
          </ul>
        </section>

        <section className={classes.section}>
          <h3 className={classes["section-title"]}>Dietary</h3>
          <ul className={styles.ul}>
            <li className={styles.li}>Vegan</li>
            <li className={styles.li}>Vegetarian</li>
            <li className={styles.li}>Low-Carb</li>
            <li className={styles.li}>Meatless</li>
            <li className={styles.li}>Gluten-free</li>
            <li className={styles.li}>Sugar-free</li>
          </ul>
        </section>

        <section className={classes.section}>
          <h3 className={classes["section-title"]}>Cuisine</h3>
          <ul className={styles.ul}>
            <li className={styles.li}>Polish</li>
            <li className={styles.li}>American</li>
            <li className={styles.li}>Italian</li>
            <li className={styles.li}>Chinese</li>
            <li className={styles.li}>Indian</li>
            <li className={styles.li}>Mexican</li>
            <li className={styles.li}>Japanese</li>
            <li className={styles.li}>Greek</li>
            <li className={styles.li}>Thai</li>
          </ul>
        </section>

        <section className={classes.section}>
          <h3 className={classes["section-title"]}>Vegetables</h3>
          <ul className={styles.ul}>
            <li className={styles.li}>Radish</li>
            <li className={styles.li}>Tomato</li>
            <li className={styles.li}>potato</li>
            <li className={styles.li}>Garlic</li>
            <li className={styles.li}>bell</li>
            <li className={styles.li}>pepper</li>
            <li className={styles.li}>corn</li>
            <li className={styles.li}>onion</li>
            <li className={styles.li}>peas</li>
            <li className={styles.li}>lettuce</li>
            <li className={styles.li}>beet</li>
            <li className={styles.li}>carrot</li>
            <li className={styles.li}>cucumber</li>
            <li className={styles.li}>pumpkin</li>
            <li className={styles.li}>paprika</li>
            <li className={styles.li}>cabbage</li>
          </ul>
        </section>

        <section className={classes.section}>
          <h3 className={classes["section-title"]}>Fruits</h3>
          <ul className={styles.ul}>
            <li className={styles.li}>pear</li>
            <li className={styles.li}>apple</li>
            <li className={styles.li}>banana</li>
            <li className={styles.li}>kiwi</li>
            <li className={styles.li}>lime</li>
            <li className={styles.li}>orange</li>
            <li className={styles.li}>nectarine</li>
            <li className={styles.li}>watermelon</li>
            <li className={styles.li}>mango</li>
            <li className={styles.li}>lemon</li>
          </ul>
        </section>

        <section className={classes.section}>
          <h3 className={classes["section-title"]}>Meats:</h3>
          <ul className={styles.ul}>
            <li className={styles.li}>Chicken</li>
            <li className={styles.li}>Beef</li>
            <li className={styles.li}>Pork</li>
            <li className={styles.li}>Lamb</li>
            <li className={styles.li}>Turkey</li>
            <li className={styles.li}>Duck</li>
            <li className={styles.li}>Veal</li>
            <li className={styles.li}>Rabbit</li>
          </ul>
        </section>

        <section className={classes.section}>
          <h3 className={classes["section-title"]}>Fish and Seafood</h3>
          <ul className={styles.ul}>
            <li className={styles.li}>Salmon</li>
            <li className={styles.li}>Tuna</li>
            <li className={styles.li}>Shrimp</li>
            <li className={styles.li}>Cod</li>
            <li className={styles.li}>Crab</li>
            <li className={styles.li}>Lobster</li>
            <li className={styles.li}>Mussels</li>
          </ul>
        </section>
        <section className={classes.section}>
          <h3 className={classes["section-title"]}>Berries</h3>
          <ul className={styles.ul}>
            <li className={styles.li}>Strawberries</li>
            <li className={styles.li}>Blueberries</li>
            <li className={styles.li}>Raspberries</li>
            <li className={styles.li}>Blackberries</li>
            <li className={styles.li}>Cranberries</li>
            <li className={styles.li}>Gooseberries</li>
            <li className={styles.li}>Marionberries</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AddFilters;
