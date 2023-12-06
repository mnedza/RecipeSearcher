import React from "react";
import { Link } from "react-router-dom";
import styles from "./RecipeItem.module.css";

const RecipeItem = (props) => {
  const { name, instructions, url, id, path } = props;

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
    <>
      <div className={styles.recipe}>
        <h3 className={styles["recipe-name"]}>{name}</h3>
        <img className={styles.img} src={url} alt={name} />
        <p className={styles.description}>{instruction}</p>
        <button className={styles.button}>
          <Link to={`/${path}/${id}`}>See more details</Link>
        </button>
      </div>
    </>
  );
};

export default RecipeItem;
