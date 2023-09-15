import React from "react";
import styles from "./RecipeDetails.module.css";

const RecipeDetails = (props) => {
  return (
    <>
      <div className={styles.backdrop} onClick={props.closeDetailsInfo}></div>
      <div className={styles.modal}>
        <img className={styles.img} src={props.imageUrl} alt={props.name} />

        <div className={styles["modal-content"]}>
          <h2 className={styles.header}>{props.name}</h2>

          <div className={styles["ingredients-and-time"]}>
            <div className={styles.time}>
              <h3 className={styles.h3}>Time</h3>
              <p className={styles["time-content"]}>15 minutes</p>
            </div>
            <div className={styles.ingredients}>
              <h3 className={styles.h3}>Ingredients</h3>

              <ul className={styles["ingredients-content"]}>
                {props.ingredients.map((ingredient, index) => (
                  <li className={styles.li} key={ingredient}>
                    {index + 1}. {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles["instructions-content"]}>
            <h3 className={styles.h3}>Instructions</h3>
            <p>{props.instructions}</p>
          </div>
        </div>

        <div className={styles["modal-header"]}></div>

        <button
          className={styles["close-button"]}
          onClick={props.closeDetailsInfo}
        >
          &times;
        </button>
      </div>
    </>
  );
};

export default RecipeDetails;
