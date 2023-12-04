import React, { useState } from "react";
import styles from "./Recipe.module.css";
import RecipeDetails from "./RecipeDetails";

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

  const showDetailsHandler = () => {
    setShowDetails(prevState => !prevState);
  };

  return (
    <>
      <div className={styles.recipe}>
        <h3 className={styles["recipe-name"]}>{name}</h3>
        <img className={styles.img} src={url} alt={name} />
        <p className={styles.description}>{instruction}</p>
        <button className={styles.button} onClick={showDetailsHandler}>
          See more details
        </button>
      </div>

      {showDetails && (
        <RecipeDetails
          name={name}
          imageUrl={url}
          ingredients={ingredients}
          instructions={instructions}
          closeDetailsInfo={showDetailsHandler}
        />
      )}
    </>
  );
};

export default RecipeItem;
