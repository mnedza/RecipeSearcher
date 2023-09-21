import React, { useEffect, useState } from "react";
import classes from "./AddFilters.module.css";
import styles from "./Elements.module.css";

const FilterSection = (props) => {
  const [choosenElements, setChoosenElements] = useState(
    new Array(props.items.length).fill(false)
  );

  const handleElement = (index) => {
    const updatedChoosenElements = [...choosenElements];
    updatedChoosenElements[index] = !choosenElements[index];
    setChoosenElements(updatedChoosenElements);
  };

  // Cleaning all elements by clicking Reset button in AddFilters
  useEffect(() => {
    setChoosenElements(new Array(props.items.length).fill(false));
  }, [props.isReseted, props.items.length]);

  return (
    <section className={classes.section}>
      <h3 className={classes["section-title"]}>{props.title}</h3>
      <ul className={styles.ul}>
        {props.items.map((item, index) => (
          <li
            key={index}
            className={`${styles.li} ${
              choosenElements[index] && styles.choosen
            }`}
            onClick={() => handleElement(index)}
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FilterSection;
