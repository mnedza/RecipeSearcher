import React, { useEffect, useState } from "react";
import styles from "./FiltersList.module.css";

const FiltersList = (props) => {
  const maxItemsToShow = 6;

  const [showAllItems, setShowAllItems] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);


  useEffect(() => {
    setIsEmpty(props.filters.length === 0);
  }, [props.filters]);

  const itemsToShow = showAllItems ? props.filters : props.filters.slice(0, maxItemsToShow);
  const remainingItemsCount = props.filters.length - maxItemsToShow;

  const handleMoreClick = () => {
    setShowAllItems(true);
  };

  const handleItemClick = (index) => {
    const updatedItems = [...props.filters];
    updatedItems.splice(index, 1);
    props.setFilters(updatedItems);
  };

  return (
    <ul className={`${styles.list} wrapper`}>
      {itemsToShow.map((item, index) => (
        <li key={index} onClick={() => handleItemClick(index)}>
          {item}
        </li>
      ))}
      {!showAllItems && remainingItemsCount > 0 && (
        <li onClick={handleMoreClick}>+{remainingItemsCount} More</li>
      )}
      {isEmpty && <p>No filters added.</p>}
    </ul>
  );
};

export default FiltersList;
