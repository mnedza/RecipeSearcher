import React, { useState } from "react";
import styles from "./RecipeItem.module.css";
import RecipeDetails from "../components/RecipeDetails";

const RecipeItem = (props) => {
  const { name, instructions, ingredients, url } = props;

  const updateDescription = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    const shortenedText = text.substring(0, maxLength - 5) + "...";
    return shortenedText;
  };

  const maxLength = 70;
  const instruction = updateDescription(instructions, maxLength);

  const [showDetails, setShowDetails] = useState(false);

  const detailsInfoHandler = () => {
    setShowDetails(!showDetails);
  };

  return (
    <>
      <div className={styles.recipe}>
        <h3 className={styles["recipe-name"]}>{name}</h3>
        <img className={styles.img} src={url} alt={name} />
        <p className={styles.description}>{instruction}</p>
        <button className={styles.button} onClick={detailsInfoHandler}>
          See more details
        </button>
      </div>

      {showDetails && (
        <RecipeDetails
          name={name}
          imageUrl={url}
          ingredients={ingredients}
          instructions={instructions}
          closeDetailsInfo={detailsInfoHandler}
        />
      )}
    </>
  );
};

export default RecipeItem;
