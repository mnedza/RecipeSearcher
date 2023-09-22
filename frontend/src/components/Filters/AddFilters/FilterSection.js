import React, { useEffect, useState } from "react";
import classes from "./AddFilters.module.css";
import styles from "./Elements.module.css";

const FilterSection = (props) => {
  const [choosenElements, setChoosenElements] = useState(
    new Array(props.itemsOfSection.length).fill(false)
  );

  const handleElement = (index) => {
    const updatedChoosenElements = [...choosenElements];
    updatedChoosenElements[index] = !choosenElements[index];
    setChoosenElements(updatedChoosenElements);

    const updatedFiltersSection = props.itemsOfSection
      .filter((item, idx) => updatedChoosenElements[idx])
      .map((item) => item);
    props.onFiltersChange(updatedFiltersSection);
  };

  useEffect(() => {
    setChoosenElements(new Array(props.itemsOfSection.length).fill(false));
  }, [props.isReseted, props.itemsOfSection.length, props.filters]);

  return (
    <section className={classes.section}>
      <h3 className={classes["section-title"]}>{props.title}</h3>
      <ul className={styles.ul}>
        {props.itemsOfSection.map((item, index) => (
          <li
            key={index}
            className={`${styles.li} ${
              (choosenElements[index] ||
                props.filters.includes(item)) &&
              styles.choosen
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
