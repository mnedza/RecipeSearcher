import React from "react";
import styles from "./FiltersPanel.module.css";

const FiltersPanel = ({ categoryName, filters }) => {
  return (
    <div className={`${styles.content} wrapper`}>
      <h1>{categoryName}</h1>
      <ul className={styles.filters}>
        {filters &&
          filters.map(
            (filter) =>
              filter && (
                <li className={styles.filter} key={filter.filterId}>
                  {filter.value}
                </li>
              )
          )}
      </ul>
    </div>
  );
};

export default FiltersPanel;
