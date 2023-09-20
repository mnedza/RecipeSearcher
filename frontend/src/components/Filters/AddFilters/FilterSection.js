import React from "react";
import classes from "./AddFilters.module.css";
import styles from "./Elements.module.css";

const FilterSection = (props) => {
  return (
    <section className={classes.section}>
      <h3 className={classes["section-title"]}>{props.title}</h3>
      <ul className={styles.ul}>
        {props.items.map((item) => (
          <li className={styles.li}>{item}</li>
        ))}
      </ul>
    </section>
  );
};

export default FilterSection;
