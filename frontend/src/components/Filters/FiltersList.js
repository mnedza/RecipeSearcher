import React, { useEffect, useState } from "react";
import styles from "./FiltersList.module.css";

const FiltersList = (props) => {
  const maxItemsToShow = 6;
  const [items, setItems] = useState(props.filtersArray);
  const [showAllItems, setShowAllItems] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    setIsEmpty(items.length === 0);
  }, [items]);

  const itemsToShow = showAllItems ? items : items.slice(0, maxItemsToShow);
  const remainingItemsCount = items.length - maxItemsToShow;

  const handleMoreClick = () => {
    setShowAllItems(true);
  };

  const handleItemClick = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
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
