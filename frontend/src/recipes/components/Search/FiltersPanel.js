import React from "react";

import styles from "./FiltersPanel.module.css";

const FiltersPanel = (props) => {
  const filtersTitle =
    props.filters.length === 0 ? (
      <h2 className={styles["header-title"]}>No filters found</h2>
    ) : (
      <h2 className={styles["header-title"]}>Filters</h2>
    );

  return (
    <>
      <div className={`${styles.content} wrapper`}>
        {filtersTitle}
        <ul className={styles.filters}>
          {props.filters.map((filter) => {
            return (
              <li className={styles.filter} key={filter.filterId}>
                {filter.value}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default FiltersPanel;
