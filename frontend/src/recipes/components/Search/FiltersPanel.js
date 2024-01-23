import React from "react";
import styles from "./FiltersPanel.module.css";

const FiltersPanel = ({ categoryName, filters }) => {
  return (
    <div className={`${styles.content} wrapper`}>
      <h1 className={styles["header-title"]} >{categoryName}</h1>
      <div className={styles["filters-container"]}>
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
    </div>
  );
};

export default FiltersPanel;
