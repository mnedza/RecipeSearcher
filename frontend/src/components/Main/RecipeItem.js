import React from "react";
import styles from "./RecipeItem.module.css";

const RecipeItem = (props) => {
  const { name, instructions, url } = props;

  const updateDescription = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    const shortenedText = text.substring(0, maxLength - 5) + "...";
    return shortenedText;
  };

  const maxLength = 70;
  const instruction = updateDescription(instructions, maxLength);

  return (
    <div className={styles.recipe}>
      <h3 className={styles["recipe-name"]}>{name}</h3>
      <img className={styles.img} src={url} alt={name} />
      <p className={styles.description}>{instruction}</p>
      <button className={styles.button}>See more</button>
    </div>
  );
};

export default RecipeItem;
